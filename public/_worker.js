const PRIMARY_HOST = "pddjf.com";
const PAGES_PREVIEW_HOST = "promotion-mysite.pages.dev";
const PDDJF_CANONICAL_HOSTS = new Set(["www.pddjf.com"]);
const ASSET_RELEASE = "20260813-organic-ctr";
const BRIEF_API_PATH = "/api/brief";
const BRIEF_SITE = "pddjf";
const BRIEF_TTL_SECONDS = 60 * 60 * 24 * 180;
const BRIEF_RATE_LIMIT_SECONDS = 60;
const BRIEF_FIELD_LIMIT = 2000;
const BRIEF_NOTIFICATION_TO = "yfjelley@gmail.com";
const BRIEF_NOTIFICATION_FROM = "brief@pddjf.com";

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
  ["/quant/systems", "/custom-trading-software-development/"],
  ["/quant/systems/", "/custom-trading-software-development/"],
  ["/fintech/development", "/fintech-software-development/"],
  ["/fintech/development/", "/fintech-software-development/"],
  ["/fintech-software-development", "/fintech-software-development/"],
  ["/custom-trading-software-development", "/custom-trading-software-development/"],
  ["/ai-agent/trading", "/zh/custom-trading-software-development/"],
  ["/ai-agent/trading/", "/zh/custom-trading-software-development/"],
  ["/lianghua/software", "/zh/custom-trading-software-development/"],
  ["/lianghua/software/", "/zh/custom-trading-software-development/"],
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
  ["/en/contact", "/en/contact/"],
  ["/zh/custom-trading-software-development", "/zh/custom-trading-software-development/"],
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
const CONTACT_INDEX_CONTROL_PATHS = new Set(["/contact/", "/en/contact/"]);
const HTML_CACHE_BUST_PATHS = new Set([
  "/",
  "/terms",
  "/disclaimer",
  "/delivery-policy",
  "/contact/",
  "/en/contact/",
  "/custom-trading-software-development/",
  "/zh/custom-trading-software-development/",
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
  ["/fintech-software-development/", "/__release/20260721-fintech-development/fintech-software-development.html"],
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

function briefHtmlResponse(body, status = 200, language = "zh-CN") {
  const english = language === "en";
  const success = body.ok === true;
  const title = success
    ? english ? "Project brief received" : "项目 Brief 已收到"
    : english ? "Project brief was not submitted" : "项目 Brief 未提交";
  const message = success
    ? english
      ? "Thank you. SignalCraft Labs has stored this brief securely and will review the project boundary before replying."
      : "感谢提交。SignalCraft Labs 已安全保存这份 Brief，并会先核对项目边界再回复。"
    : english
      ? "The submission could not be accepted. Please return to the form and check the required fields, or contact us by email."
      : "本次提交未被接受。请返回表单检查必填项，或直接通过邮箱联系。";
  const homeHref = english ? "/en/contact/" : "/contact/";
  const backLabel = english ? "Return to the project brief" : "返回项目 Brief";
  const emailLabel = english ? "Email SignalCraft Labs" : "邮件联系 SignalCraft Labs";
  const reference = success && body.id && body.id !== "accepted"
    ? `<p class="reference">${english ? "Reference" : "提交编号"}: <code>${String(body.id).replace(/[^a-zA-Z0-9-]/g, "")}</code></p>`
    : "";
  const html = `<!doctype html>
<html lang="${english ? "en" : "zh-CN"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>body{margin:0;background:#07111f;color:#e9f4f1;font:16px/1.6 system-ui,sans-serif}main{max-width:680px;margin:12vh auto;padding:40px;border:1px solid #245b53;border-radius:20px;background:#0d1d2a}h1{font-size:clamp(2rem,6vw,3.5rem);line-height:1.1}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}a{display:inline-block;padding:12px 18px;border-radius:999px;background:#078b7b;color:white;text-decoration:none}a+ a{background:transparent;border:1px solid #3e746b}.reference{color:#9fc4bd}code{color:#c8f7ec}</style>
</head>
<body><main><p>SignalCraft Labs</p><h1>${title}</h1><p>${message}</p>${reference}<div class="actions"><a href="${homeHref}">${backLabel}</a><a href="mailto:contact@pddjf.com">${emailLabel}</a></div></main></body>
</html>`;
  return withSecurityHeaders(new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"
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

function briefNotificationText(record) {
  const fieldLabels = {
    projectType: "项目类型",
    contactMethod: "联系方式",
    riskBoundary: "业务或执行问题",
    signalSource: "信号来源",
    apiPlatform: "API 平台",
    permissionStatus: "权限状态",
    budget: "预算档位",
    deploymentTarget: "部署环境",
    timeline: "期望时间线",
    notes: "补充说明"
  };
  const fieldLines = Object.entries(fieldLabels)
    .filter(([key]) => record.fields[key])
    .map(([key, label]) => `${label}: ${record.fields[key]}`);
  const trackingLines = Object.entries(record.tracking || {})
    .map(([key, value]) => `${key}: ${value}`);

  return [
    "SignalCraft Labs 收到一份新的项目 Brief。",
    "",
    `编号: ${record.id}`,
    `接收时间: ${record.receivedAt}`,
    `适配分类: ${record.qualification || "未分类"}`,
    "",
    ...fieldLines,
    ...(trackingLines.length ? ["", "来源信息:", ...trackingLines] : []),
    "",
    "此邮件由 pddjf.com 的生产 Brief 表单自动发送。"
  ].join("\n");
}

function replyAddressFor(record) {
  const candidate = cleanString(record.fields?.contactMethod, 320);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : "contact@pddjf.com";
}

async function sendBriefNotification(env, record) {
  if (!env.BRIEF_NOTIFIER?.fetch) {
    return { status: "not_configured" };
  }

  const shortId = record.id.slice(0, 8);
  const response = await env.BRIEF_NOTIFIER.fetch(new Request("https://brief-notifier.internal/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: BRIEF_NOTIFICATION_TO,
      from: { email: BRIEF_NOTIFICATION_FROM, name: "SignalCraft Labs Briefs" },
      replyTo: replyAddressFor(record),
      subject: `[PDDJF Brief] ${shortId} · ${cleanString(record.fields.projectType, 120)}`,
      text: briefNotificationText(record)
    })
  }));
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    const error = new Error(cleanString(result.error, 300) || `HTTP ${response.status}`);
    error.code = cleanString(result.code, 100) || "BRIEF_NOTIFICATION_FAILED";
    throw error;
  }

  return {
    status: "sent",
    messageId: cleanString(result?.messageId, 200),
    sentAt: new Date().toISOString()
  };
}

async function briefRateKey(request) {
  const address = request.headers.get("CF-Connecting-IP") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${BRIEF_SITE}:${address}`));
  return `rate:${BRIEF_SITE}:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

async function handleBriefSubmission(request, env, url) {
  const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
  const nativeForm = contentType.startsWith("application/x-www-form-urlencoded");
  let responseLanguage = "zh-CN";
  const respond = (body, status) => nativeForm
    ? briefHtmlResponse(body, status, responseLanguage)
    : jsonResponse(body, status);

  if (request.method !== "POST") {
    return respond({ ok: false, error: "method_not_allowed" }, 405);
  }

  if (!env.BRIEF_SUBMISSIONS) {
    return respond({ ok: false, error: "submission_service_unavailable" }, 503);
  }

  const origin = request.headers.get("Origin");
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if ((origin && origin !== url.origin) || (fetchSite && !["same-origin", "none"].includes(fetchSite))) {
    return respond({ ok: false, error: "origin_not_allowed" }, 403);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 24_000) {
    return respond({ ok: false, error: "payload_too_large" }, 413);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return respond({ ok: false, error: "invalid_payload" }, 400);
  }
  if (rawBody.length > 24_000) {
    return respond({ ok: false, error: "payload_too_large" }, 413);
  }

  let payload;
  try {
    if (nativeForm) {
      const form = new URLSearchParams(rawBody);
      responseLanguage = form.get("lang") === "en" ? "en" : "zh-CN";
      payload = {
        site: BRIEF_SITE,
        website: form.get("website") || "",
        qualification: "native_form",
        fields: Object.fromEntries(form.entries()),
        tracking: {
          landing_page: request.headers.get("Referer") || ""
        }
      };
    } else {
      payload = JSON.parse(rawBody);
    }
  } catch {
    return respond({ ok: false, error: "invalid_payload" }, 400);
  }

  if (!payload || payload.site !== BRIEF_SITE) {
    return respond({ ok: false, error: "invalid_site" }, 400);
  }

  if (cleanString(payload.website, 200)) {
    return respond({ ok: true, id: "accepted" }, 201);
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
    return respond({ ok: false, error: "required_fields_missing" }, 400);
  }

  const rateKey = await briefRateKey(request);
  if (await env.BRIEF_SUBMISSIONS.get(rateKey)) {
    return respond({ ok: false, error: "rate_limited" }, 429);
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
    "fbclid",
    "twclid",
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

  const briefKey = `brief:${BRIEF_SITE}:${receivedAt}:${id}`;
  await env.BRIEF_SUBMISSIONS.put(rateKey, receivedAt, { expirationTtl: BRIEF_RATE_LIMIT_SECONDS });
  await env.BRIEF_SUBMISSIONS.put(briefKey, JSON.stringify(record), {
    expirationTtl: BRIEF_TTL_SECONDS
  });

  try {
    record.notification = await sendBriefNotification(env, record);
  } catch (error) {
    record.notification = {
      status: "failed",
      code: cleanString(error?.code, 100),
      message: cleanString(error?.message, 300),
      failedAt: new Date().toISOString()
    };
    console.error("brief_notification_failed", id, record.notification.code, record.notification.message);
  }

  try {
    await env.BRIEF_SUBMISSIONS.put(briefKey, JSON.stringify(record), {
      expirationTtl: BRIEF_TTL_SECONDS
    });
  } catch (error) {
    console.error("brief_notification_status_persist_failed", id, cleanString(error?.message, 300));
  }

  return respond({ ok: true, id, receivedAt }, 201);
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

function withContactQueryIndexControl(response, url) {
  if (!CONTACT_INDEX_CONTROL_PATHS.has(url.pathname) || !url.search) return response;

  const controlledResponse = new Response(response.body, response);
  controlledResponse.headers.set("X-Robots-Tag", "noindex, follow");
  controlledResponse.headers.set("Cache-Control", "private, no-store");
  return controlledResponse;
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
      const response = await fetchAsset(env, request, releaseAssetPath);
      return withContactQueryIndexControl(response, url);
    }

    const assetUrl = new URL(request.url);
    if (HTML_CACHE_BUST_PATHS.has(url.pathname)) {
      assetUrl.searchParams.set("__release", ASSET_RELEASE);
    }
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    return withContactQueryIndexControl(withSecurityHeaders(response, response.status, url.pathname), url);
  }
};
