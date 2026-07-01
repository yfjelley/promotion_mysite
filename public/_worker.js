const PRIMARY_HOST = "pddjf.com";
const SOFTWARE_HOST = "icojf.com";
const PAGES_PREVIEW_HOST = "promotion-mysite.pages.dev";
const PDDJF_CANONICAL_HOSTS = new Set(["www.pddjf.com"]);
const ICOJF_CANONICAL_HOSTS = new Set(["www.icojf.com"]);

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

const ICOJF_PATH_REDIRECTS = new Map([
  ["/index.html", "/"],
  ["/contact", "/contact/"],
  ["/api-integration-development", "/api-integration-development/"],
  ["/mvp-saas-development", "/mvp-saas-development/"],
  ["/business-process-automation", "/business-process-automation/"],
  ["/privacy.html", "/privacy"],
  ["/privacy/", "/privacy"],
  ["/terms.html", "/terms"],
  ["/terms/", "/terms"]
]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()"
};

function withSecurityHeaders(response, status = response.status) {
  const withHeaders = new Response(response.body, response);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    withHeaders.headers.set(name, value);
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

function icojfAssetPath(pathname) {
  if (pathname === "/" || pathname === "") return "/icojf/index.html";
  if (pathname === "/contact/") return "/icojf/contact/index.html";
  if (pathname === "/api-integration-development/") return "/icojf/api-integration-development/index.html";
  if (pathname === "/mvp-saas-development/") return "/icojf/mvp-saas-development/index.html";
  if (pathname === "/business-process-automation/") return "/icojf/business-process-automation/index.html";
  if (pathname === "/privacy") return "/icojf/privacy.html";
  if (pathname === "/terms") return "/icojf/terms.html";
  if (pathname === "/robots.txt") return "/icojf/robots.txt";
  if (pathname === "/sitemap.xml") return "/icojf/sitemap.xml";
  if (pathname === "/favicon.svg") return "/icojf/favicon.svg";
  if (pathname === "/styles.css") return "/icojf/styles.css";
  return null;
}

async function fetchAsset(env, request, pathname, statusOverride) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  let assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request));

  const assetRedirect = assetResponse.headers.get("Location");
  if ([301, 302, 307, 308].includes(assetResponse.status) && assetRedirect?.startsWith("/")) {
    assetUrl.pathname = assetRedirect;
    assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request));
  }

  const response = new Response(assetResponse.body, assetResponse);
  response.headers.delete("Location");
  return withSecurityHeaders(response, statusOverride ?? response.status);
}

async function fetchIcojfAsset(request, env, url) {
  const assetPath = icojfAssetPath(url.pathname);
  if (!assetPath) return fetchAsset(env, request, "/icojf/404.html", 404);

  const response = await fetchAsset(env, request, assetPath);
  if (response.status === 404) return fetchAsset(env, request, "/icojf/404.html", 404);
  return response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = new URL(url.href);
    let shouldRedirect = false;
    const isPagesPreviewHost =
      url.hostname === PAGES_PREVIEW_HOST || url.hostname.endsWith(`.${PAGES_PREVIEW_HOST}`);
    const isPddjfHost = url.hostname === PRIMARY_HOST || PDDJF_CANONICAL_HOSTS.has(url.hostname);
    const isIcojfHost = url.hostname === SOFTWARE_HOST || ICOJF_CANONICAL_HOSTS.has(url.hostname);
    const isKnownHost = isPddjfHost || isIcojfHost;

    if (PDDJF_CANONICAL_HOSTS.has(url.hostname) || isPagesPreviewHost) {
      target.hostname = PRIMARY_HOST;
      target.protocol = "https:";
      shouldRedirect = true;
    }

    if (ICOJF_CANONICAL_HOSTS.has(url.hostname)) {
      target.hostname = SOFTWARE_HOST;
      target.protocol = "https:";
      shouldRedirect = true;
    }

    if (isKnownHost && url.protocol !== "https:") {
      target.protocol = "https:";
      shouldRedirect = true;
    }

    const redirectedPath = isIcojfHost ? ICOJF_PATH_REDIRECTS.get(url.pathname) : PATH_REDIRECTS.get(url.pathname);
    if (redirectedPath) {
      target.pathname = redirectedPath;
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      return Response.redirect(target.toString(), 301);
    }

    if (url.hostname === SOFTWARE_HOST) {
      return fetchIcojfAsset(request, env, url);
    }

    if (url.hostname === PRIMARY_HOST && (url.pathname === "/icojf" || url.pathname.startsWith("/icojf/"))) {
      return fetchAsset(env, request, "/404.html", 404);
    }

    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  }
};
