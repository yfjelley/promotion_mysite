import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { hyperliquidFeeData } from "./hyperliquid-fee-data.mjs";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const errors = [];
const requireValue = (condition, message) => {
  if (!condition) errors.push(message);
};
const readRequired = (path, label) => {
  requireValue(existsSync(path), `${label}: missing file`);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

requireValue(hyperliquidFeeData.schemaVersion === 1, "data: unexpected schema version");
requireValue(hyperliquidFeeData.lastVerified === "2026-07-19", "data: stale verification date");
requireValue(hyperliquidFeeData.vipTiers.length === 7, "data: expected VIP 0 through VIP 6");
requireValue(hyperliquidFeeData.stakingTiers.length === 7, "data: expected no-discount plus six staking tiers");
requireValue(hyperliquidFeeData.makerRebateTiers.length === 4, "data: expected no-rebate plus three maker rebate tiers");
requireValue(hyperliquidFeeData.vipTiers.every((tier, index, tiers) => index === 0 || tier.minWeightedVolume > tiers[index - 1].minWeightedVolume), "data: VIP thresholds are not strictly increasing");
requireValue(hyperliquidFeeData.vipTiers[0]?.perpTaker === 0.045, "data: base perp taker regression");
requireValue(hyperliquidFeeData.vipTiers[3]?.perpMaker === 0.004, "data: VIP 3 perp maker regression");
requireValue(hyperliquidFeeData.vipTiers[6]?.spotTaker === 0.025, "data: VIP 6 spot taker regression");
requireValue(hyperliquidFeeData.makerRebateTiers[3]?.makerRate === -0.003, "data: maker rebate 3 regression");
requireValue(hyperliquidFeeData.stakingTiers.at(-1)?.discount === 40, "data: Diamond staking discount regression");
requireValue(hyperliquidFeeData.sources.every((source) => source.url.startsWith("https://hyperliquid.gitbook.io/")), "data: sources must be official Hyperliquid docs");

const modeledCost = ({ perpVolume, spotVolume, makerShare, stakingDiscount = 0, makerRate = null }) => {
  const weightedVolume = perpVolume + spotVolume * 2;
  const tier = hyperliquidFeeData.vipTiers.reduce((selected, candidate) => (
    weightedVolume >= candidate.minWeightedVolume ? candidate : selected
  ), hyperliquidFeeData.vipTiers[0]);
  const discount = (rate) => rate > 0 ? rate * (1 - stakingDiscount / 100) : rate;
  const rate = (product, side) => side === "maker" && makerRate !== null ? makerRate : discount(tier[`${product}${side === "maker" ? "Maker" : "Taker"}`]);
  const productCost = (product, volume) => volume * (rate(product, "maker") * makerShare / 100 + rate(product, "taker") * (1 - makerShare / 100)) / 100;
  return { tier: tier.name, weightedVolume, total: productCost("perp", perpVolume) + productCost("spot", spotVolume) };
};
const baseScenario = modeledCost({ perpVolume: 10000000, spotVolume: 0, makerShare: 70 });
requireValue(baseScenario.tier === "VIP 1" && baseScenario.weightedVolume === 10000000 && Math.abs(baseScenario.total - 2040) < 0.001, "calculator: base scenario regression");
const mixedScenario = modeledCost({ perpVolume: 10000000, spotVolume: 10000000, makerShare: 70 });
requireValue(mixedScenario.tier === "VIP 2" && mixedScenario.weightedVolume === 30000000 && Math.abs(mixedScenario.total - 4510) < 0.001, "calculator: weighted spot-volume scenario regression");

const generatedDataPath = join(publicDir, "data", "hyperliquid-fees.json");
const generatedData = readRequired(generatedDataPath, "generated fee data");
if (generatedData) requireValue(JSON.stringify(JSON.parse(generatedData)) === JSON.stringify(hyperliquidFeeData), "generated fee data does not match source module");

for (const [label, path, language, counterpart] of [
  ["English calculator", join(publicDir, "tools", "hyperliquid-fee-calculator", "index.html"), "en", "https://pddjf.com/zh/tools/hyperliquid-fee-calculator/"],
  ["Chinese calculator", join(publicDir, "zh", "tools", "hyperliquid-fee-calculator", "index.html"), "zh-CN", "https://pddjf.com/tools/hyperliquid-fee-calculator/"]
]) {
  const html = readRequired(path, label);
  [
    `<html lang="${language}">`,
    "data-hyperliquid-fee-tool",
    "data-hl-controls",
    "data-hl-total",
    "data-hl-next",
    "data-hl-maker-output",
    "/data/hyperliquid-fees.json",
    "WebApplication",
    "FAQPage",
    "BreadcrumbList",
    "2026-07-19",
    "14D",
    "2×",
    "Maker Rebate",
    "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees",
    `href="${counterpart}"`,
    "scope=hyperliquid-buyers-20260719",
    "fix=20260721-mobile-overflow",
    "buyer-tool-grid",
    "/tradingview-to-hyperliquid-automation/",
    "/hyperliquid-trading-system-for-teams/"
  ].forEach((needle) => requireValue(html.includes(needle), `${label}: missing ${needle}`));
  requireValue(!html.includes('"@type": "Dataset"'), `${label}: must not claim a licensed Dataset`);
}

for (const [label, slug, needles] of [
  ["custom bot service", "hyperliquid-api-trading-bot-development", [
    "When Your Hyperliquid Bot Reconnects, Are Orders and Positions Still in Sync?",
    "USD 5,000-10,000+",
    "About 4-8 weeks",
    "How much does custom Hyperliquid bot development cost?",
    "project=hyperliquid-api-trading-bot-development",
    "You bring",
    "We build",
    "You keep",
    "#project-paths",
    "/tradingview-to-hyperliquid-automation/",
    "/hyperliquid-trading-system-for-teams/"
  ]],
  ["TradingView service", "tradingview-to-hyperliquid-automation", [
    "Connect Your TradingView Alerts to Hyperliquid",
    "USD 2,000-5,000+",
    "About 2-4 weeks",
    "How much does TradingView to Hyperliquid automation cost?",
    "project=tradingview-to-hyperliquid-automation",
    "Pine Script alerts",
    "Get an alert-integration estimate",
    "duplicate protection",
    "/hyperliquid-api-trading-bot-development/"
  ]],
  ["team service", "hyperliquid-trading-system-for-teams", [
    "Build a Hyperliquid Execution System Your Team Can Operate",
    "Trading firms, treasuries or fintech teams",
    "USD 10,000+",
    "How much does a Hyperliquid trading system for a team cost?",
    "project=hyperliquid-trading-system-for-teams",
    "Team workflow",
    "operator controls",
    "Request a team-system assessment",
    "/tradingview-to-hyperliquid-automation/"
  ]]
]) {
  const html = readRequired(join(publicDir, slug, "index.html"), label);
  [
    '<html lang="en">',
    "Project Planning Snapshot",
    "Can this project fit your budget and timeline?",
    "Your Project, In Plain Language",
    "scope=hyperliquid-buyers-20260719",
    "https://pddjf.com/hyperliquid-bot-social.jpg",
    "twitter:card",
    "API/agent wallet",
    "Official References",
    "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint",
    "Service",
    "FAQPage",
    ...needles
  ].forEach((needle) => requireValue(html.includes(needle), `${label}: missing ${needle}`));
}

const socialImagePath = join(publicDir, "hyperliquid-bot-social.jpg");
requireValue(existsSync(socialImagePath), "social card: missing image");
if (existsSync(socialImagePath)) requireValue(statSync(socialImagePath).size > 50000, "social card: image is unexpectedly small");

const articleHtml = readRequired(join(publicDir, "articles", "hyperliquid-api-order-reconciliation-websocket-checklist", "index.html"), "article page");
[
  '<html lang="en">',
  "Hyperliquid API Order Reconciliation and WebSocket Checklist",
  "deterministic cloid",
  "snapshot",
  "nonce owner",
  "TechArticle",
  '"datePublished": "2026-07-19"',
  '"dateModified": "2026-07-19"',
  "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint",
  "/hyperliquid-api-trading-bot-development/"
].forEach((needle) => requireValue(articleHtml.includes(needle), `article page: missing ${needle}`));

const script = readRequired(join(publicDir, "scripts.js"), "tool script");
const styles = readRequired(join(publicDir, "styles.css"), "site styles");
[
  "function initHyperliquidFeeTool()",
  "hyperliquid_fee_tool_first_use",
  "hyperliquid_fee_tool_share",
  "weightedVolume = inputs.perpVolume + inputs.spotVolume * 2",
  "initHyperliquidFeeTool();"
].forEach((needle) => requireValue(script.includes(needle), `tool script: missing ${needle}`));
[".buyer-snapshot-grid", ".buyer-outcome-grid", ".buyer-path-grid", ".buyer-tool-grid"].forEach((needle) => requireValue(styles.includes(needle), `site styles: missing ${needle}`));
requireValue(/\.hl-controls,\s*\.hl-results\s*{[^}]*min-width:\s*0;/s.test(styles), "site styles: Hyperliquid grid children must allow shrinking");
requireValue(/\.hl-input-grid input,\s*\.hl-input-grid select\s*{[^}]*min-width:\s*0;[^}]*max-width:\s*100%;/s.test(styles), "site styles: Hyperliquid form controls must not impose intrinsic width");
requireValue(/@media \(max-width: 1000px\)\s*{[^}]*\.hyperliquid-tool-shell\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/s.test(styles), "site styles: mobile Hyperliquid grid track must be shrinkable");

const sitemap = readRequired(join(publicDir, "sitemap.xml"), "sitemap");
const llms = readRequired(join(publicDir, "llms.txt"), "llms.txt");
const manifest = readRequired(join(publicDir, "service-pages.json"), "service manifest");
for (const url of [
  "https://pddjf.com/tools/hyperliquid-fee-calculator/",
  "https://pddjf.com/zh/tools/hyperliquid-fee-calculator/",
  "https://pddjf.com/hyperliquid-api-trading-bot-development/",
  "https://pddjf.com/tradingview-to-hyperliquid-automation/",
  "https://pddjf.com/hyperliquid-trading-system-for-teams/",
  "https://pddjf.com/articles/hyperliquid-api-order-reconciliation-websocket-checklist/"
]) {
  requireValue(sitemap.includes(url), `sitemap: missing ${url}`);
  requireValue(llms.includes(url), `llms.txt: missing ${url}`);
}
requireValue(manifest.includes("/hyperliquid-api-trading-bot-development/"), "service manifest: missing Hyperliquid service route");
requireValue(manifest.includes("/tradingview-to-hyperliquid-automation/"), "service manifest: missing TradingView to Hyperliquid route");
requireValue(manifest.includes("/hyperliquid-trading-system-for-teams/"), "service manifest: missing team system route");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Hyperliquid page validation passed: 2 calculator languages, 3 buyer service pages, 1 technical article, 7 VIP tiers.");
