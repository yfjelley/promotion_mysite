const PRIMARY_HOST = "pddjf.com";
const PAGES_PREVIEW_HOST = "promotion-mysite.pages.dev";
const PDDJF_CANONICAL_HOSTS = new Set(["www.pddjf.com"]);
const ASSET_RELEASE = "20260715-p2-ux-assets";

const PATH_REDIRECTS = new Map([
  ["/index.html", "/"],
  ["/privacy.html", "/privacy"],
  ["/terms.html", "/terms"],
  ["/service-terms", "/terms"],
  ["/disclaimer.html", "/disclaimer"],
  ["/delivery-policy.html", "/delivery-policy"],
  ["/refund-policy", "/delivery-policy"],
  ["/risk-disclaimer.html", "/risk-disclaimer/"],
  ["/investment-risk-disclaimer", "/risk-disclaimer/"],
  ["/home", "/"],
  ["/tradingview/webhook", "/tradingview-webhook-automation/"],
  ["/bot/api", "/tradingview-webhook-automation/"],
  ["/exchange/api", "/exchange-api-trading-bot-development/"],
  ["/trading/bot", "/exchange-api-trading-bot-development/"],
  ["/api/execution", "/exchange-api-trading-bot-development/"],
  ["/broker-api", "/broker/api/"],
  ["/broker/api", "/broker/api/"],
  ["/tradingview-webhook-automation", "/tradingview-webhook-automation/"],
  ["/exchange-api-trading-bot-development", "/exchange-api-trading-bot-development/"],
  ["/broker-api/ibkr", "/broker-api/ibkr/"],
  ["/interactive-brokers-api", "/broker-api/ibkr/"],
  ["/ibkr-api", "/broker-api/ibkr/"],
  ["/broker-api/schwab", "/broker-api/schwab/"],
  ["/schwab-api", "/broker-api/schwab/"],
  ["/broker-api/alpaca", "/broker-api/alpaca/"],
  ["/alpaca-api", "/broker-api/alpaca/"],
  ["/fix-api-order-routing", "/fix-api-order-routing/"],
  ["/fix-api", "/fix-api-order-routing/"],
  ["/risk-engine", "/risk-engine/"],
  ["/private-deployment", "/private-deployment/"],
  ["/faq", "/faq/"],
  ["/case-studies", "/case-studies/"],
  ["/about", "/about/"],
  ["/contact", "/contact/"],
  ["/risk-disclaimer", "/risk-disclaimer/"]
]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()"
};

const STATIC_ASSET_PATTERN = /\.(?:css|js|svg|png|jpe?g|webp|ico|woff2?)$/i;
const STATIC_ASSET_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800";
const HTML_CACHE_BUST_PATHS = new Set([
  "/",
  "/contact/",
  "/articles/alpaca-order-status-reconciliation/",
  "/articles/schwab-api-token-refresh-runbook/",
  "/articles/fix-api-certificate-network-allowlist-checklist/"
]);
const HTML_RELEASE_ASSETS = new Map([
  ["/", "/__release/20260715-p2-ux-assets/home.html"],
  ["/contact/", "/__release/20260715-p2-ux-assets/contact.html"]
]);

function withSecurityHeaders(response, status = response.status, assetPath = "") {
  const withHeaders = new Response(response.body, response);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    withHeaders.headers.set(name, value);
  }

  if (STATIC_ASSET_PATTERN.test(assetPath)) {
    withHeaders.headers.set("Cache-Control", STATIC_ASSET_CACHE_CONTROL);
  }

  if (status !== response.status) {
    return new Response(withHeaders.body, {
      status,
      statusText: status === 404 ? "Not Found" : withHeaders.statusText,
      headers: withHeaders.headers
    });
  }

  return withHeaders;
}

async function fetchAsset(env, request, pathname, statusOverride) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  assetUrl.search = "";
  let assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request));

  const assetRedirect = assetResponse.headers.get("Location");
  if ([301, 302, 307, 308].includes(assetResponse.status) && assetRedirect?.startsWith("/")) {
    const redirectUrl = new URL(assetRedirect, assetUrl);
    assetUrl.pathname = redirectUrl.pathname;
    assetUrl.search = "";
    assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request));
  }

  const response = new Response(assetResponse.body, assetResponse);
  response.headers.delete("Location");
  return withSecurityHeaders(response, statusOverride ?? response.status, pathname);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = new URL(url.href);
    let shouldRedirect = false;
    const isPagesPreviewHost =
      url.hostname === PAGES_PREVIEW_HOST || url.hostname.endsWith(`.${PAGES_PREVIEW_HOST}`);
    const isPddjfHost = url.hostname === PRIMARY_HOST || PDDJF_CANONICAL_HOSTS.has(url.hostname);

    if (PDDJF_CANONICAL_HOSTS.has(url.hostname) || isPagesPreviewHost) {
      target.hostname = PRIMARY_HOST;
      target.protocol = "https:";
      shouldRedirect = true;
    }

    if (isPddjfHost && url.protocol !== "https:") {
      target.protocol = "https:";
      shouldRedirect = true;
    }

    const redirectedPath = PATH_REDIRECTS.get(url.pathname);
    if (redirectedPath) {
      target.pathname = redirectedPath;
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      return Response.redirect(target.toString(), 301);
    }

    if (!isPddjfHost && !isPagesPreviewHost) {
      return fetchAsset(env, request, "/404.html", 404);
    }

    if (url.pathname === "/icojf" || url.pathname.startsWith("/icojf/")) {
      return fetchAsset(env, request, "/404.html", 404);
    }

    if (url.pathname.startsWith("/__release/")) {
      return fetchAsset(env, request, "/404.html", 404);
    }

    const releaseAssetPath = HTML_RELEASE_ASSETS.get(url.pathname);
    if (releaseAssetPath) {
      return fetchAsset(env, request, releaseAssetPath);
    }

    const assetUrl = new URL(request.url);
    if (HTML_CACHE_BUST_PATHS.has(url.pathname)) {
      assetUrl.searchParams.set("__release", ASSET_RELEASE);
    }
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    return withSecurityHeaders(response, response.status, url.pathname);
  }
};
