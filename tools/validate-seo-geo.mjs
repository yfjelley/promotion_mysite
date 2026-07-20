import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const site = "https://pddjf.com";
const engineeringNotesUrl = "https://github.com/yfjelley/signalcraft-labs-engineering-notes";
const linkedinProfileUrl = "https://www.linkedin.com/in/%E9%94%8B-%E6%9D%A8-968956116/";
const currentStylesheetHref = "/styles.css?v=20260719-hyperliquid-buyer-intent";
const currentScriptHref = "/scripts.js?v=20260720-risk-audit";
const contentDate = "2026-07-20";
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
    return { generatedServiceRoutes: [], buyerIntentServiceRoutes: [], coreServiceUrls: [], externalTrustLinks: [], articleUrls: [] };
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const generatedServiceRoutes = Array.isArray(manifest.generatedServiceRoutes) ? manifest.generatedServiceRoutes : [];
    const buyerIntentServiceRoutes = Array.isArray(manifest.buyerIntentServiceRoutes) ? manifest.buyerIntentServiceRoutes : [];
    const coreServiceUrls = Array.isArray(manifest.coreServiceUrls) ? manifest.coreServiceUrls : [];
    const externalTrustLinks = Array.isArray(manifest.externalTrustLinks) ? manifest.externalTrustLinks : [];
    const articleUrls = Array.isArray(manifest.articleUrls) ? manifest.articleUrls : [];

    if (generatedServiceRoutes.length === 0) errors.push("service-pages.json: missing generatedServiceRoutes");
    if (buyerIntentServiceRoutes.length === 0) errors.push("service-pages.json: missing buyerIntentServiceRoutes");
    if (coreServiceUrls.length === 0) errors.push("service-pages.json: missing coreServiceUrls");

    for (const route of generatedServiceRoutes) {
      if (typeof route !== "string" || !route.startsWith("/") || !route.endsWith("/")) {
        errors.push(`service-pages.json: invalid generated route ${String(route)}`);
      }
    }

    return { generatedServiceRoutes, buyerIntentServiceRoutes, coreServiceUrls, externalTrustLinks, articleUrls };
  } catch (error) {
    errors.push(`service-pages.json: invalid JSON: ${error.message}`);
    return { generatedServiceRoutes: [], buyerIntentServiceRoutes: [], coreServiceUrls: [], externalTrustLinks: [], articleUrls: [] };
  }
}

const htmlFiles = walk(publicDir).filter((file) => file.endsWith(".html"));
const pddjfHtmlFiles = htmlFiles.filter((file) => {
  const rel = relative(publicDir, file).replaceAll(sep, "/");
  return !rel.startsWith("icojf/") && !rel.startsWith("__release/");
});
const serviceManifest = readServiceManifest();
const generatedServiceRoutes = serviceManifest.generatedServiceRoutes;
const buyerIntentServiceRoutes = serviceManifest.buyerIntentServiceRoutes;
const externalTrustLinks = serviceManifest.externalTrustLinks;
const articleUrls = serviceManifest.articleUrls;
const requiredIconLinks = [
  '<link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png">',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png">',
  '<link rel="manifest" href="/site.webmanifest">'
];
const requiredIconTextAssets = new Map([
  ["favicon.svg", "<svg"],
  ["site.webmanifest", '"icons"']
]);
const requiredIconBinaryAssets = ["favicon.ico", "favicon-48.png", "favicon-192.png", "apple-touch-icon.png", "apple-touch-icon-180.png"];
const customTradingSoftwareFile = join(publicDir, "custom-trading-software-development", "index.html");
const buyerPositioningExpectations = new Map([
  ["/tradingview-webhook-automation/", "把 TradingView Alert 变成可控的自动下单流程"],
  ["/exchange-api-trading-bot-development/", "把已有交易规则接入交易所自动执行"],
  ["/risk-engine/", "为现有自动交易流程补上可执行的风控边界"],
  ["/custom-trading-software-development/", "Custom Trading Software and Platform Development for Teams"],
  ["/tradingview-webhook-developer/", "Turn TradingView Alerts Into Controlled Order Execution"],
  ["/ibkr-api-automation-developer/", "Automate Your IBKR Trading Workflow"],
  ["/fix-api-order-routing-developer/", "Build a FIX Order Routing System Your Team Can Operate"]
]);

if (!generatedServiceRoutes.includes("/custom-trading-software-development/")) {
  errors.push("service-pages.json: missing custom trading software development route");
}

const legacyBuyerIntentServiceRoutes = new Set([
  "/broker-api/ibkr/",
  "/broker-api/schwab/",
  "/broker-api/alpaca/",
  "/fix-api-order-routing/",
  "/private-deployment/"
]);

for (const route of generatedServiceRoutes) {
  if (!legacyBuyerIntentServiceRoutes.has(route) && !buyerIntentServiceRoutes.includes(route)) {
    errors.push(`service-pages.json: new service route must pass buyer-intent contract: ${route}`);
  }
}

if (existsSync(customTradingSoftwareFile)) {
  const customTradingSoftwareHtml = readFileSync(customTradingSoftwareFile, "utf8");
  if (/\p{Script=Han}/u.test(customTradingSoftwareHtml)) {
    errors.push("custom trading software development page: contains Chinese copy");
  }
}

for (const [asset, needle] of requiredIconTextAssets) {
  const assetPath = join(publicDir, asset);
  if (!existsSync(assetPath)) {
    errors.push(`${asset}: missing site icon asset`);
  } else {
    requireText(asset, readFileSync(assetPath, "utf8"), needle);
  }
}

for (const asset of requiredIconBinaryAssets) {
  const assetPath = join(publicDir, asset);
  if (!existsSync(assetPath)) {
    errors.push(`${asset}: missing site icon asset`);
  } else if (statSync(assetPath).size < 100) {
    errors.push(`${asset}: site icon asset is unexpectedly small`);
  }
}

for (const file of pddjfHtmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = relative(root, file);
  const is404 = rel === "public/404.html";

  if (html.includes("https://icojf.com")) errors.push(`${rel}: contains absolute icojf URL`);

  if (!is404) {
    requireText(rel, html, 'class="skip-link"');
    requireText(rel, html, 'id="main-content"');
    if (!html.includes(currentStylesheetHref)) {
      errors.push(`${rel}: missing current stylesheet asset URL`);
    }
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];

    if (!canonical) errors.push(`${rel}: missing canonical`);
    if (canonical && !canonical.startsWith(site)) errors.push(`${rel}: canonical not pddjf: ${canonical}`);
    if (!ogUrl) errors.push(`${rel}: missing og:url`);
    if (ogUrl && !ogUrl.startsWith(site)) errors.push(`${rel}: og:url not pddjf: ${ogUrl}`);
    for (const iconLink of requiredIconLinks) {
      requireText(rel, html, iconLink);
    }
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

    if (buyerIntentServiceRoutes.includes(routeFor(file))) {
      requireText(rel, html, 'data-buyer-intent="v1"');
      if (!html.includes("buyer-intent-summary") && !html.includes("buyer-snapshot-grid")) {
        errors.push(`${rel}: missing precise buyer presentation`);
      }
      if (!html.includes("buyer-intent-summary") && !html.includes("buyer-outcome-grid")) {
        errors.push(`${rel}: missing business-problem presentation`);
      }
    }

    const expectedBuyerHeading = buyerPositioningExpectations.get(routeFor(file));
    if (expectedBuyerHeading) {
      const heroHtml = html.match(/<section class="content-hero[^"]*"[\s\S]*?<\/section>/i)?.[0] ?? "";
      requireText(rel, heroHtml, `<h1>${expectedBuyerHeading}</h1>`);
      if (/\bdeveloper\b/i.test(heroHtml)) {
        errors.push(`${rel}: buyer-facing hero still uses developer positioning`);
      }
    }
  }

  if (routeFor(file) === "/contact/") {
    [
      "结构化 Brief 表单",
      "安全提交项目 Brief",
      "data-mailto-brief",
      "data-brief-endpoint=\"/api/brief\"",
      "data-brief-label=\"Project type\"",
      "Custom trading software development",
      "data-brief-label=\"Permission status\"",
      "data-brief-label=\"Business or execution problem\"",
      "data-brief-label=\"Deployment target\"",
      "autocomplete=\"email\"",
      "data-contact=\"structured_brief_submit\"",
      currentScriptHref,
      "复制空白模板"
    ].forEach((needle) => requireText(rel, html, needle));

    const briefFormHtml = html.match(/<form class="brief-form"[\s\S]*?<\/form>/i)?.[0] ?? "";
    const requiredFieldCount = (briefFormHtml.match(/\srequired(?:\s|>)/g) ?? []).length;
    if (requiredFieldCount !== 3) {
      errors.push(`${rel}: first-contact form must have exactly 3 required fields, found ${requiredFieldCount}`);
    }
    ["projectType", "riskBoundary", "contactMethod"].forEach((name) => {
      if (!new RegExp(`name="${name}"[^>]*\\srequired(?:\\s|>)`).test(briefFormHtml)) {
        errors.push(`${rel}: ${name} must remain required`);
      }
    });
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

const publicScript = readFileSync(join(publicDir, "scripts.js"), "utf8");
[
  "field-error",
  'aria-invalid',
  'firstSubmitError',
  'brief-form-active',
  'form.addEventListener("invalid"',
  'fetch(form.dataset.briefEndpoint || "/api/brief"',
  '项目 Brief 已收到',
  '提交暂时失败，表单内容仍保留',
  'reportBriefSubmit(form.dataset.contact || "structured_brief_submit")'
].forEach((needle) => requireText("public/scripts.js", publicScript, needle));

const worker = readFileSync(join(publicDir, "_worker.js"), "utf8");
[
  'const ASSET_RELEASE = "20260720-risk-audit"',
  '["/contact/", "/__release/20260719-buyer-conversion/contact.html"]',
  '["/tradingview-webhook-automation/", "/__release/20260719-buyer-conversion/tradingview-webhook-automation.html"]',
  '["/exchange-api-trading-bot-development/", "/__release/20260719-buyer-conversion/exchange-api-trading-bot-development.html"]',
  '["/risk-engine/", "/__release/20260719-buyer-conversion/risk-engine.html"]',
  'const BRIEF_API_PATH = "/api/brief"',
  'return handleBriefSubmission(request, env, url)',
  'BRIEF_SUBMISSIONS.put(`brief:${BRIEF_SITE}:${receivedAt}:${id}`',
  'const HTML_CACHE_BUST_PATHS = new Set([\n  "/",\n  "/contact/",\n  "/trading-system-consistency-audit/",\n  "/trading-system-incident-diagnosis/",\n  "/multi-account-trading-monitoring/",\n  "/trading-system-consistency-audit-service/",\n  "/trading-system-incident-diagnosis-service/",\n  "/multi-account-trading-monitoring-service/"',
  'assetUrl.searchParams.set("__release", ASSET_RELEASE)'
].forEach((needle) => requireText("public/_worker.js", worker, needle));

for (const [canonicalFile, releaseFile] of [
  [join(publicDir, "index.html"), join(publicDir, "__release", "20260715-p2-ux-assets", "home.html")],
  [join(publicDir, "contact", "index.html"), join(publicDir, "__release", "20260719-buyer-conversion", "contact.html")],
  [join(publicDir, "tradingview-webhook-automation", "index.html"), join(publicDir, "__release", "20260719-buyer-conversion", "tradingview-webhook-automation.html")],
  [join(publicDir, "exchange-api-trading-bot-development", "index.html"), join(publicDir, "__release", "20260719-buyer-conversion", "exchange-api-trading-bot-development.html")],
  [join(publicDir, "risk-engine", "index.html"), join(publicDir, "__release", "20260719-buyer-conversion", "risk-engine.html")],
  [join(publicDir, "tools", "crypto-exchange-fee-calculator", "index.html"), join(publicDir, "__release", "20260715-p2-ux-assets", "exchange-fee-tool-i18n.html")],
  [join(publicDir, "zh", "tools", "crypto-exchange-fee-calculator", "index.html"), join(publicDir, "__release", "20260715-p2-ux-assets", "exchange-fee-tool-zh.html")]
]) {
  if (!existsSync(releaseFile)) {
    errors.push(`${relative(publicDir, releaseFile)}: missing release asset`);
  } else if (readFileSync(canonicalFile, "utf8") !== readFileSync(releaseFile, "utf8")) {
    errors.push(`${relative(publicDir, releaseFile)}: release asset differs from canonical output`);
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
  `Last updated: ${contentDate}`,
  "TradingView Alert 自动执行服务",
  "Custom Trading Software & Platform Development",
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
  "const ADS_ID = \"AW-975458180\"",
  "const ADS_CONVERSION = \"AW-975458180/i_t6CKjS6pwYEISfkdED\"",
  "function reportAdsLead(method, eventCallback)",
  "event.event_callback = eventCallback",
  "event.event_timeout = 1200",
  "function reportBriefSubmit(method, eventCallback)",
  "gtag(\"event\", \"contact_submit\"",
  "function briefFields(form)",
  "function qualificationFor(form)",
  "function briefPayload(form)",
  "form[data-mailto-brief]",
  "structured_brief_submit",
  'fetch(form.dataset.briefEndpoint || "/api/brief"',
  "项目 Brief 已收到",
  "fee_tool_first_use",
  "fee_tool_exchange_select",
  "fee_tool_source_click",
  "source_host: new URL(link.href).hostname",
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
