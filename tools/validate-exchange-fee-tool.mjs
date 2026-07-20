import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { exchangeFeeData } from "./exchange-fee-data.mjs";

const root = new URL("..", import.meta.url).pathname;
const pagePath = join(root, "public", "tools", "crypto-exchange-fee-calculator", "index.html");
const zhPagePath = join(root, "public", "zh", "tools", "crypto-exchange-fee-calculator", "index.html");
const jsonPath = join(root, "public", "data", "exchange-fees.json");
const sitemapPath = join(root, "public", "sitemap.xml");
const scriptPath = join(root, "public", "scripts.js");
const comparisonPath = join(root, "public", "compare", "binance-vs-okx-futures-fees", "index.html");
const comparisonZhPath = join(root, "public", "zh", "compare", "binance-vs-okx-futures-fees", "index.html");
const bybitComparisonPath = join(root, "public", "compare", "binance-vs-bybit-perpetual-fees", "index.html");
const bybitComparisonZhPath = join(root, "public", "zh", "compare", "binance-vs-bybit-perpetual-fees", "index.html");
const errors = [];

const requireValue = (condition, message) => {
  if (!condition) errors.push(message);
};

requireValue(exchangeFeeData.schemaVersion === 1, "dataset: unexpected schema version");
requireValue(exchangeFeeData.lastVerified === "2026-07-15", "dataset: stale verification date");
requireValue(exchangeFeeData.exchanges.length === 6, "dataset: expected six exchanges");
requireValue(new Set(exchangeFeeData.exchanges.map((exchange) => exchange.id)).size === 6, "dataset: duplicate exchange ids");

for (const exchange of exchangeFeeData.exchanges) {
  requireValue(exchange.tiers.length > 0, `${exchange.id}: missing tiers`);
  requireValue(["full", "base-only"].includes(exchange.coverage), `${exchange.id}: invalid coverage`);
  requireValue(exchange.tiers.every((tier, index, tiers) => index === 0 || tier.minVolume >= tiers[index - 1].minVolume), `${exchange.id}: tiers are not volume-sorted`);
  requireValue((exchange.sources || [exchange.source]).every((source) => source?.url?.startsWith("https://")), `${exchange.id}: invalid official source URL`);
  for (const tier of exchange.tiers) {
    requireValue(Number.isFinite(tier.maker) && Number.isFinite(tier.taker), `${exchange.id}/${tier.name}: invalid fee rate`);
    requireValue(Number.isFinite(tier.minVolume), `${exchange.id}/${tier.name}: invalid volume threshold`);
  }
}

const okx = exchangeFeeData.exchanges.find((exchange) => exchange.id === "okx");
const bybit = exchangeFeeData.exchanges.find((exchange) => exchange.id === "bybit");
const bitget = exchangeFeeData.exchanges.find((exchange) => exchange.id === "bitget");
const mexc = exchangeFeeData.exchanges.find((exchange) => exchange.id === "mexc");
requireValue(okx.tiers.find((tier) => tier.name === "VIP 2")?.taker === 0.036, "OKX VIP 2 taker regression");
requireValue(bybit.tiers.find((tier) => tier.name === "Supreme VIP")?.maker === 0, "Bybit Supreme maker regression");
requireValue(bybit.tiers.find((tier) => tier.name === "Pro 1")?.minApiShareForVolume === 21, "Bybit Pro 1 API route regression");
requireValue(bybit.tiers.find((tier) => tier.name === "Pro 1")?.taker === 0.032, "Bybit Pro 1 taker regression");
requireValue(bybit.tiers.find((tier) => tier.name === "Pro 6")?.taker === 0.018, "Bybit Pro 6 taker regression");
requireValue(bybit.sources.every((source) => source.checkedDate === "2026-07-20"), "Bybit source check date regression");
requireValue(bitget.tiers.find((tier) => tier.name === "VIP 7")?.taker === 0.020, "Bitget VIP 7 taker regression");
requireValue(mexc.tiers[0]?.maker === 0 && mexc.tiers[0]?.taker === 0.020, "MEXC standard futures rate regression");

requireValue(existsSync(pagePath), "generated tool page is missing");
requireValue(existsSync(zhPagePath), "generated Chinese tool page is missing");
requireValue(existsSync(jsonPath), "generated JSON dataset is missing");
if (existsSync(pagePath)) {
  const html = readFileSync(pagePath, "utf8");
  [
    "data-exchange-fee-tool",
    "data-fee-results",
    "data-fee-chart",
    "data-fee-ladder",
    "WebApplication",
    "FAQPage",
    "/data/exchange-fees.json",
    "Full public ladder",
    "Base rate verified"
  ].forEach((needle) => requireValue(html.includes(needle), `generated page: missing ${needle}`));
  [
    "Effective rate (bps)",
    "View chart data table",
    "global public schedules only"
  ].forEach((needle) => requireValue(html.includes(needle), `generated page: missing ${needle}`));
  requireValue(!html.includes('name="region"'), "English page: obsolete region selector remains");
  requireValue(html.includes(`hreflang="zh-CN" href="https://pddjf.com/zh/tools/crypto-exchange-fee-calculator/"`), "English page: missing Chinese hreflang");
  requireValue(html.includes(`href="https://pddjf.com/zh/tools/crypto-exchange-fee-calculator/" lang="zh-CN"`), "English page: missing Chinese language switch");
}
if (existsSync(zhPagePath)) {
  const html = readFileSync(zhPagePath, "utf8");
  [
    '<html lang="zh-CN">',
    'data-lang="zh-CN"',
    "主流交易所 VIP 手续费计算器",
    "30 天手续费对比",
    "来源与计算方法",
    "如何正确理解对比结果",
    "有效费率（bps）",
    "查看图表数据表",
    `hreflang="en" href="https://pddjf.com/tools/crypto-exchange-fee-calculator/"`,
    `href="https://pddjf.com/tools/crypto-exchange-fee-calculator/" lang="en"`
  ].forEach((needle) => requireValue(html.includes(needle), `Chinese page: missing ${needle}`));
}
if (existsSync(scriptPath)) {
  const script = readFileSync(scriptPath, "utf8");
  [
    "Comparable full-ladder ranking",
    "Base-rate references",
    "minApiShareForVolume",
    "data-chart-table"
  ].forEach((needle) => requireValue(script.includes(needle), `tool script: missing ${needle}`));
}
if (existsSync(jsonPath)) {
  const generated = JSON.parse(readFileSync(jsonPath, "utf8"));
  requireValue(JSON.stringify(generated) === JSON.stringify(exchangeFeeData), "generated JSON does not match source data");
}

for (const [label, path, language, counterpart] of [
  ["English comparison", comparisonPath, "en", "https://pddjf.com/zh/compare/binance-vs-okx-futures-fees/"],
  ["Chinese comparison", comparisonZhPath, "zh-CN", "https://pddjf.com/compare/binance-vs-okx-futures-fees/"]
]) {
  requireValue(existsSync(path), `${label}: generated page is missing`);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  [
    `<html lang="${language}">`,
    "$1M",
    "$10M",
    "$100M",
    "$1.5B+",
    "Maker / Taker",
    "FAQPage",
    "BreadcrumbList",
    "https://www.binance.com/en/fee/futureFee",
    "https://www.okx.com/help/advance-notice-adjustment-to-vip-tier-and-future-fees",
    `href="${counterpart}"`,
    "?v=10000000&amp;m=70&amp;a=0&amp;api=0"
  ].forEach((needle) => requireValue(html.includes(needle), `${label}: missing ${needle}`));
  requireValue(!html.includes('"@type": "Dataset"'), `${label}: comparison page must not claim to distribute a Dataset without a defined data license`);
  requireValue(html.includes("2026-07-17"), `${label}: missing current recheck date`);
  requireValue(html.includes("2026-07-15"), `${label}: missing Binance base-rate check date`);
}

for (const [label, path, language, counterpart] of [
  ["English Binance/Bybit comparison", bybitComparisonPath, "en", "https://pddjf.com/zh/compare/binance-vs-bybit-perpetual-fees/"],
  ["Chinese Binance/Bybit comparison", bybitComparisonZhPath, "zh-CN", "https://pddjf.com/compare/binance-vs-bybit-perpetual-fees/"]
]) {
  requireValue(existsSync(path), `${label}: generated page is missing`);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  [
    `<html lang="${language}">`,
    "$1M",
    "$10M",
    "$100M",
    "Maker / Taker",
    "VIP 4",
    "Pro 1",
    "Pro 6",
    "FAQPage",
    "BreadcrumbList",
    "https://www.binance.com/en/fee/futureFee",
    "https://www.bybit.com/en/help-center/article/Benefits-of-the-VIP-Program",
    "https://www.bybit.com/en/help-center/article/Introduction-to-Bybit-VIP-Program",
    `href="${counterpart}"`,
    "?v=10000000&amp;m=70&amp;a=0&amp;api=0",
    "?v=100000000&amp;m=70&amp;a=0&amp;api=21"
  ].forEach((needle) => requireValue(html.includes(needle), `${label}: missing ${needle}`));
  requireValue(!html.includes('"@type": "Dataset"'), `${label}: comparison page must not claim to distribute a Dataset without a defined data license`);
  requireValue(html.includes("2026-07-20"), `${label}: missing current official-source recheck date`);
  requireValue(html.includes("2026-07-15"), `${label}: missing Binance base-rate check date`);
  requireValue(html.includes("top 72 USDT") || html.includes("top 72 USDT Perpetual"), `${label}: missing Bybit Pro product-scope limit`);
}

if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  for (const slug of ["compare/binance-vs-bybit-perpetual-fees", "zh/compare/binance-vs-bybit-perpetual-fees"]) {
    const entry = sitemap.match(new RegExp(`<url>\\s*<loc>https://pddjf\\.com/${slug}/</loc>\\s*<lastmod>([^<]+)</lastmod>`));
    requireValue(entry?.[1] === "2026-07-20", `sitemap: ${slug} missing current lastmod`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Exchange fee tool validation passed: ${exchangeFeeData.exchanges.length} exchanges, ${exchangeFeeData.exchanges.reduce((sum, exchange) => sum + exchange.tiers.length, 0)} modeled tiers.`);
