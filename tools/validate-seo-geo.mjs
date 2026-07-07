import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const site = "https://pddjf.com";
const engineeringNotesUrl = "https://github.com/yfjelley/signalcraft-labs-engineering-notes";
const linkedinProfileUrl = "https://www.linkedin.com/in/%E9%94%8B-%E6%9D%A8-968956116/";
const errors = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFor(file) {
  const rel = relative(publicDir, file).replaceAll(sep, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  if (rel.endsWith(".html")) return `/${rel.replace(/\.html$/, "")}`;
  return `/${rel}`;
}

function fileForPath(pathname) {
  if (pathname === "/") return join(publicDir, "index.html");
  if (pathname.endsWith("/")) return join(publicDir, pathname, "index.html");

  const htmlFile = join(publicDir, `${pathname}.html`);
  if (existsSync(htmlFile)) return htmlFile;

  const indexFile = join(publicDir, pathname, "index.html");
  if (existsSync(indexFile)) return indexFile;

  return join(publicDir, pathname);
}

function requireText(label, value, needle) {
  if (!value.includes(needle)) errors.push(`${label}: missing ${needle.replaceAll("\n", " ")}`);
}

function readServiceManifest() {
  const manifestPath = join(publicDir, "service-pages.json");
  if (!existsSync(manifestPath)) {
    errors.push("service-pages.json: missing generated service manifest");
    return { generatedServiceRoutes: [], coreServiceUrls: [], externalTrustLinks: [], articleUrls: [] };
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const generatedServiceRoutes = Array.isArray(manifest.generatedServiceRoutes) ? manifest.generatedServiceRoutes : [];
    const coreServiceUrls = Array.isArray(manifest.coreServiceUrls) ? manifest.coreServiceUrls : [];
    const externalTrustLinks = Array.isArray(manifest.externalTrustLinks) ? manifest.externalTrustLinks : [];
    const articleUrls = Array.isArray(manifest.articleUrls) ? manifest.articleUrls : [];

    if (generatedServiceRoutes.length === 0) errors.push("service-pages.json: missing generatedServiceRoutes");
    if (coreServiceUrls.length === 0) errors.push("service-pages.json: missing coreServiceUrls");

    for (const route of generatedServiceRoutes) {
      if (typeof route !== "string" || !route.startsWith("/") || !route.endsWith("/")) {
        errors.push(`service-pages.json: invalid generated route ${String(route)}`);
      }
    }

    return { generatedServiceRoutes, coreServiceUrls, externalTrustLinks, articleUrls };
  } catch (error) {
    errors.push(`service-pages.json: invalid JSON: ${error.message}`);
    return { generatedServiceRoutes: [], coreServiceUrls: [], externalTrustLinks: [], articleUrls: [] };
  }
}

const htmlFiles = walk(publicDir).filter((file) => file.endsWith(".html"));
const pddjfHtmlFiles = htmlFiles.filter((file) => !relative(publicDir, file).replaceAll(sep, "/").startsWith("icojf/"));
const serviceManifest = readServiceManifest();
const generatedServiceRoutes = serviceManifest.generatedServiceRoutes;
const externalTrustLinks = serviceManifest.externalTrustLinks;
const articleUrls = serviceManifest.articleUrls;

for (const file of pddjfHtmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = relative(root, file);
  const is404 = rel === "public/404.html";

  if (html.includes("https://icojf.com")) errors.push(`${rel}: contains absolute icojf URL`);

  if (!is404) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];

    if (!canonical) errors.push(`${rel}: missing canonical`);
    if (canonical && !canonical.startsWith(site)) errors.push(`${rel}: canonical not pddjf: ${canonical}`);
    if (!ogUrl) errors.push(`${rel}: missing og:url`);
    if (ogUrl && !ogUrl.startsWith(site)) errors.push(`${rel}: og:url not pddjf: ${ogUrl}`);
  }

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!is404 && ldBlocks.length === 0) errors.push(`${rel}: missing JSON-LD`);
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw);
      const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [];
      const faqNode = graph.find((node) => node["@type"] === "FAQPage");
      if (generatedServiceRoutes.includes(routeFor(file)) && (!faqNode || !Array.isArray(faqNode.mainEntity) || faqNode.mainEntity.length < 5)) {
        errors.push(`${rel}: service page FAQPage should contain at least 5 questions`);
      }
    } catch (error) {
      errors.push(`${rel}: invalid JSON-LD: ${error.message}`);
    }
  }

  if (generatedServiceRoutes.includes(routeFor(file))) {
    const isEnglishPage = /<html lang="en">/.test(html);
    const requiredServiceNeedles = isEnglishPage
      ? [
          "Service Facts",
          "Service facts summary",
          "Pre-contact checklist",
          "API key minimum permission guidance",
          "Delivery package breakdown",
          "Launch acceptance checklist"
        ]
      : [
          "Service Facts",
          "服务事实摘要",
          "联系前资料清单",
          "API Key 最小权限建议",
          "交付包范围拆解",
          "上线验收清单"
        ];

    requiredServiceNeedles.forEach((needle) => requireText(rel, html, needle));
  }

  if (routeFor(file) === "/contact/") {
    [
      "结构化 Brief 表单",
      "生成邮件并提交 Brief",
      "data-mailto-brief",
      "data-brief-label=\"Project type\"",
      "data-brief-label=\"Permission status\"",
      "data-brief-label=\"Risk boundary\"",
      "data-brief-label=\"Deployment target\"",
      "data-contact=\"structured_brief_submit\"",
      "复制空白模板"
    ].forEach((needle) => requireText(rel, html, needle));
  }

  for (const [, attr, href] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const [pathOnly] = href.split("#");
    const [pathname] = pathOnly.split("?");
    if (!pathname || pathname === "/") continue;

    const target = fileForPath(pathname);
    if (!existsSync(target)) errors.push(`${rel}: ${attr} target missing: ${href}`);
  }
}

const sitemap = readFileSync(join(publicDir, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const loc of locs) {
  if (!loc.startsWith(site)) errors.push(`sitemap non-pddjf loc: ${loc}`);
  const target = fileForPath(new URL(loc).pathname);
  if (!existsSync(target)) errors.push(`sitemap loc has no file: ${loc}`);
}

const robots = readFileSync(join(publicDir, "robots.txt"), "utf8");
[
  "User-agent: *",
  "Content-Signal: search=yes,ai-input=yes,ai-train=no,use=reference",
  "User-agent: OAI-SearchBot\nAllow: /",
  "User-agent: ChatGPT-User\nAllow: /",
  "User-agent: OAI-AdsBot\nAllow: /",
  "User-agent: Cloudflare-AI-Search\nAllow: /",
  "User-agent: PerplexityBot\nAllow: /",
  "User-agent: Perplexity-User\nAllow: /",
  "User-agent: Claude-SearchBot\nAllow: /",
  "User-agent: Claude-User\nAllow: /",
  "User-agent: GPTBot\nDisallow: /",
  "User-agent: ClaudeBot\nDisallow: /",
  "User-agent: Google-Extended\nDisallow: /",
  "User-agent: Applebot-Extended\nDisallow: /",
  "User-agent: Amazonbot\nDisallow: /",
  "User-agent: Bytespider\nDisallow: /",
  "User-agent: CCBot\nDisallow: /",
  "User-agent: meta-externalagent\nDisallow: /",
  "Sitemap: https://pddjf.com/sitemap.xml"
].forEach((needle) => requireText("robots.txt", robots, needle));

const llms = readFileSync(join(publicDir, "llms.txt"), "utf8");
[
  "SignalCraft Labs",
  "Last updated: 2026-07-07",
  "TradingView Webhook automation",
  "IBKR API automation",
  "AI-citable factual summary",
  "Page summaries",
  "External trust links",
  "Technical articles",
  engineeringNotesUrl,
  linkedinProfileUrl,
  "2000 美金",
  "5000 美金",
  "10000 美金",
  "We do not provide investment advice"
].forEach((needle) => requireText("llms.txt", llms, needle));

const scripts = readFileSync(join(publicDir, "scripts.js"), "utf8");
[
  "function fieldRows(form)",
  "function qualificationFor(form)",
  "function mailtoFromBrief(form)",
  "form[data-mailto-brief]",
  "structured_brief_submit",
  "Tracking context:",
  "gclid"
].forEach((needle) => requireText("scripts.js", scripts, needle));

for (const entry of serviceManifest.coreServiceUrls) {
  if (!entry || typeof entry !== "object") {
    errors.push("service-pages.json: invalid coreServiceUrls entry");
    continue;
  }

  const { label, url, summary } = entry;
  if (typeof label !== "string" || label.trim() === "") errors.push("service-pages.json: coreServiceUrls entry missing label");
  if (typeof url !== "string" || !url.startsWith(site)) errors.push(`service-pages.json: invalid core service URL ${String(url)}`);
  if (typeof summary !== "string" || summary.trim().length < 24) {
    errors.push(`service-pages.json: core service URL missing useful summary for ${String(label || url)}`);
  }
  if (typeof url === "string") requireText("llms.txt", llms, url);
  if (typeof summary === "string" && summary.trim() !== "") requireText("llms.txt", llms, summary);
}

if (externalTrustLinks.length < 3) errors.push("service-pages.json: expected at least 3 external trust links");
if (articleUrls.length < 2) errors.push("service-pages.json: expected at least 2 article URLs");

for (const entry of externalTrustLinks) {
  if (!entry || typeof entry !== "object") {
    errors.push("service-pages.json: invalid externalTrustLinks entry");
    continue;
  }

  const { label, url, summary } = entry;
  if (typeof label !== "string" || label.trim() === "") errors.push("service-pages.json: external trust link missing label");
  if (typeof url !== "string" || !/^https:\/\/(github\.com|www\.linkedin\.com)\//.test(url)) {
    errors.push(`service-pages.json: invalid external trust URL ${String(url)}`);
  }
  if (typeof summary !== "string" || summary.trim().length < 24) {
    errors.push(`service-pages.json: external trust link missing useful summary for ${String(label || url)}`);
  }
  if (typeof url === "string") requireText("llms.txt", llms, url);
}

for (const entry of articleUrls) {
  if (!entry || typeof entry !== "object") {
    errors.push("service-pages.json: invalid articleUrls entry");
    continue;
  }

  const { label, url, summary } = entry;
  if (typeof label !== "string" || label.trim() === "") errors.push("service-pages.json: article URL missing label");
  if (typeof url !== "string" || !url.startsWith(`${site}/articles/`)) {
    errors.push(`service-pages.json: invalid article URL ${String(url)}`);
  }
  if (typeof summary !== "string" || summary.trim().length < 24) {
    errors.push(`service-pages.json: article URL missing useful summary for ${String(label || url)}`);
  }
  if (typeof url === "string") {
    requireText("llms.txt", llms, url);
    requireText("sitemap.xml", sitemap, url);
  }
}

const riskyTerms = [
  ["保证", "收益"],
  ["稳", "赚"],
  ["保", "本"],
  ["保证策略", "盈利"],
  ["盈利", "保证"],
  ["固定", "收益"],
  ["确定性", "收益"],
  ["保证", "不亏"],
  ["保证", "回撤"],
  ["保证", "盈利"],
  ["收益", "保证"],
  ["3", "Commas"]
].map((parts) => parts.join(""));

const scanFiles = [
  ...walk(publicDir).filter((file) => /\.(html|js|css|txt|xml|svg)$/.test(file)),
  ...walk(join(root, "promotion", "templates")).filter((file) => /\.(html|css|js)$/.test(file)),
  join(root, "README.md")
];

for (const file of scanFiles) {
  const text = readFileSync(file, "utf8");
  const rel = relative(root, file);
  for (const term of riskyTerms) {
    if (text.includes(term)) errors.push(`${rel}: risky wording match: ${term}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

process.stdout.write(`SEO/GEO validation ok: ${pddjfHtmlFiles.length} pddjf html files, ${locs.length} pddjf sitemap URLs\n`);
