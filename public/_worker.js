const PRIMARY_HOST = "pddjf.com";
const PAGES_PREVIEW_HOST = "promotion-mysite.pages.dev";
const PDDJF_CANONICAL_HOSTS = new Set(["www.pddjf.com"]);
const ASSET_RELEASE = "20260721-site-audit-fixes";
const BRIEF_API_PATH = "/api/brief";
const BRIEF_SITE = "pddjf";
const BRIEF_TTL_SECONDS = 60 * 60 * 24 * 180;
const BRIEF_RATE_LIMIT_SECONDS = 60;
const BRIEF_FIELD_LIMIT = 2000;

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
  "/terms",
  "/disclaimer",
  "/delivery-policy",
  "/contact/",
  "/broker-api/ibkr/",
  "/hyperliquid-api-trading-bot-development/",
  "/trading-system-consistency-audit/",
  "/trading-system-incident-diagnosis/",
  "/multi-account-trading-monitoring/",
  "/trading-system-consistency-audit-service/",
  "/trading-system-incident-diagnosis-service/",
  "/multi-account-trading-monitoring-service/",
  "/articles/alpaca-order-status-reconciliation/",
  "/articles/schwab-api-token-refresh-runbook/",
  "/articles/fix-api-certificate-network-allowlist-checklist/"
]);
const HTML_RELEASE_ASSETS = new Map([
  ["/contact/", "/__release/20260719-buyer-conversion/contact.html"],
  ["/tradingview-webhook-automation/", "/__release/20260720-tradingview-pain/tradingview-webhook-automation.html"],
  ["/exchange-api-trading-bot-development/", "/__release/20260719-buyer-conversion/exchange-api-trading-bot-development.html"],
  ["/risk-engine/", "/__release/20260719-buyer-conversion/risk-engine.html"],
  ["/tools/crypto-exchange-fee-calculator/", "/__release/20260715-p2-ux-assets/exchange-fee-tool-i18n.html"],
  ["/zh/tools/crypto-exchange-fee-calculator/", "/__release/20260715-p2-ux-assets/exchange-fee-tool-zh.html"]
]);

function jsonResponse(body, status = 200) {
  return withSecurityHeaders(new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  }), status, BRIEF_API_PATH);
}

function cleanString(value, maxLength = BRIEF_FIELD_LIMIT) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanRecord(value, allowedKeys) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return Object.fromEntries(allowedKeys
    .map((key) => [key, cleanString(source[key])])
    .filter(([, fieldValue]) => fieldValue));
}

async function briefRateKey(request) {
  const address = request.headers.get("CF-Connecting-IP") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${BRIEF_SITE}:${address}`));
  return `rate:${BRIEF_SITE}:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

async function handleBriefSubmission(request, env, url) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405);
  }

  if (!env.BRIEF_SUBMISSIONS) {
    return jsonResponse({ ok: false, error: "submission_service_unavailable" }, 503);
  }

  const origin = request.headers.get("Origin");
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if ((origin && origin !== url.origin) || (fetchSite && !["same-origin", "none"].includes(fetchSite))) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 24_000) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }
  if (rawBody.length > 24_000) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (!payload || payload.site !== BRIEF_SITE) {
    return jsonResponse({ ok: false, error: "invalid_site" }, 400);
  }

  if (cleanString(payload.website, 200)) {
    return jsonResponse({ ok: true, id: "accepted" }, 201);
  }

  const fields = cleanRecord(payload.fields, [
    "projectType",
    "signalSource",
    "apiPlatform",
    "permissionStatus",
    "budget",
    "deploymentTarget",
    "timeline",
    "contactMethod",
    "riskBoundary",
    "notes"
  ]);
  if (!fields.projectType || !fields.contactMethod || !fields.riskBoundary) {
    return jsonResponse({ ok: false, error: "required_fields_missing" }, 400);
  }

  const rateKey = await briefRateKey(request);
  if (await env.BRIEF_SUBMISSIONS.get(rateKey)) {
    return jsonResponse({ ok: false, error: "rate_limited" }, 429);
  }

  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const tracking = cleanRecord(payload.tracking, [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "project",
    "package",
    "landing_page",
    "referrer"
  ]);
  const record = {
    id,
    site: BRIEF_SITE,
    receivedAt,
    qualification: cleanString(payload.qualification, 40),
    fields,
    tracking,
    request: {
      country: cleanString(request.cf?.country, 8),
      userAgent: cleanString(request.headers.get("User-Agent"), 300)
    }
  };

  await env.BRIEF_SUBMISSIONS.put(rateKey, receivedAt, { expirationTtl: BRIEF_RATE_LIMIT_SECONDS });
  await env.BRIEF_SUBMISSIONS.put(`brief:${BRIEF_SITE}:${receivedAt}:${id}`, JSON.stringify(record), {
    expirationTtl: BRIEF_TTL_SECONDS
  });

  return jsonResponse({ ok: true, id, receivedAt }, 201);
}

function withSecurityHeaders(response, status = response.status, assetPath = "") {
  const withHeaders = new Response(response.body, response);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    withHeaders.headers.set(name, value);
  }

  if (STATIC_ASSET_PATTERN.test(assetPath) && status < 400) {
    withHeaders.headers.set("Cache-Control", STATIC_ASSET_CACHE_CONTROL);
  } else if (status >= 400) {
    withHeaders.headers.set("Cache-Control", "no-store");
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

    if (url.pathname === BRIEF_API_PATH) {
      return handleBriefSubmission(request, env, url);
    }

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
