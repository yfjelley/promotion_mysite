const PRIMARY_HOST = "pddjf.com";
const PAGES_PREVIEW_HOST = "promotion-mysite.pages.dev";
const CANONICAL_HOSTS = new Set(["www.pddjf.com", "icojf.com", "www.icojf.com"]);

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const target = new URL(url.href);
    let shouldRedirect = false;
    const isPagesPreviewHost =
      url.hostname === PAGES_PREVIEW_HOST || url.hostname.endsWith(`.${PAGES_PREVIEW_HOST}`);
    const isKnownHost = url.hostname === PRIMARY_HOST || CANONICAL_HOSTS.has(url.hostname);

    if (CANONICAL_HOSTS.has(url.hostname) || isPagesPreviewHost) {
      target.hostname = PRIMARY_HOST;
      target.protocol = "https:";
      shouldRedirect = true;
    }

    if (isKnownHost && url.protocol !== "https:") {
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

    const response = await env.ASSETS.fetch(request);
    const withHeaders = new Response(response.body, response);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      withHeaders.headers.set(name, value);
    }

    return withHeaders;
  }
};
