const ADS_ID = "AW-975458180";
const ADS_CONVERSION = "AW-975458180/i_t6CKjS6pwYEISfkdED";
const ADS_LEAD_VALUE = 100.0;
const ADS_LEAD_CURRENCY = "USD";
const GA_ID = "G-390F8PHDES";
const LINKEDIN_PARTNER_ID = "";
const LINKEDIN_LEAD_CONVERSION_ID = "";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", ADS_ID);
gtag("config", GA_ID);

let googleTagLoaded = false;
function loadGoogleTag() {
  if (googleTagLoaded || document.querySelector('script[data-google-tag-loader]')) return;
  googleTagLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  script.dataset.googleTagLoader = "true";
  document.head.appendChild(script);
}

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, loadGoogleTag, { once: true, passive: true });
});
window.addEventListener("load", () => {
  window.setTimeout(loadGoogleTag, 6500);
}, { once: true });

function installLinkedInInsightTag() {
  if (!LINKEDIN_PARTNER_ID) return;

  window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  if (!window._linkedin_data_partner_ids.includes(LINKEDIN_PARTNER_ID)) {
    window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
  }

  window.lintrk = window.lintrk || function lintrk() {
    window.lintrk.q.push(arguments);
  };
  window.lintrk.q = window.lintrk.q || [];

  if (!document.querySelector('script[src="https://snap.licdn.com/li.lms-analytics/insight.min.js"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(script);
  }
}

function reportAdsLead(method, eventCallback) {
  const event = {
    send_to: ADS_CONVERSION,
    value: ADS_LEAD_VALUE,
    currency: ADS_LEAD_CURRENCY,
    lead_method: method,
  };

  if (typeof eventCallback === "function") {
    event.event_callback = eventCallback;
    event.event_timeout = 1200;
  }

  gtag("event", "conversion", event);
}

function reportLinkedInLead() {
  if (!LINKEDIN_LEAD_CONVERSION_ID || typeof window.lintrk !== "function") return;
  window.lintrk("track", { conversion_id: Number(LINKEDIN_LEAD_CONVERSION_ID) });
}

function reportContactClick(method, isLead = false, eventCallback) {
  gtag("event", "contact_click", {
    method,
    event_category: isLead ? "lead" : "engagement",
    lead_action: isLead ? "external_contact" : "internal_cta",
  });

  if (isLead) {
    reportAdsLead(method, eventCallback);
    reportLinkedInLead();
  }
}

function reportBriefSubmit(method, eventCallback) {
  gtag("event", "contact_submit", {
    method,
    event_category: "lead",
    lead_action: "structured_brief",
  });
  reportAdsLead(method, eventCallback);
  reportLinkedInLead();
}

function fieldRows(form) {
  return Array.from(form.querySelectorAll("[data-brief-label]"))
    .map((control) => {
      const label = control.getAttribute("data-brief-label");
      const value = (control.value || "").trim();
      return label && value ? `${label}: ${value}` : "";
    })
    .filter(Boolean);
}

function trackingRows() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  const rows = keys
    .filter((key) => params.get(key))
    .map((key) => `${key}: ${params.get(key)}`);
  rows.push(`landing_page: ${window.location.href}`);
  if (document.referrer) rows.push(`referrer: ${document.referrer}`);
  return rows;
}

function qualificationFor(form) {
  let score = 0;
  const budget = form.elements.budget?.value || "";
  const permission = form.elements.permissionStatus?.value || "";
  const risk = form.elements.riskBoundary?.value || "";
  const deployment = form.elements.deploymentTarget?.value || "";
  if (budget && budget !== "还在评估") score += 1;
  if (permission && permission !== "还没有 API 权限") score += 1;
  if (risk.trim().length >= 12) score += 1;
  if (deployment && deployment !== "还不确定") score += 1;
  if (score >= 3) return "ready";
  if (score >= 2) return "needs-docs";
  return "not-fit";
}

function mailtoFromBrief(form) {
  const rows = fieldRows(form);
  rows.push(`qualification: ${qualificationFor(form)}`);
  rows.push("");
  rows.push("Tracking context:");
  rows.push(...trackingRows());

  const recipient = form.getAttribute("data-mailto-recipient") || "contact@pddjf.com";
  const subject = form.getAttribute("data-mailto-subject") || "SignalCraft Labs project brief";
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rows.join("\n"))}`;
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch (error) {
      // Fall back to the legacy copy path when browser permissions block Clipboard API.
    }
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function escapeToolHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function initExchangeFeeTool() {
  const root = document.querySelector("[data-exchange-fee-tool]");
  if (!root) return;

  const form = root.querySelector("[data-fee-controls]");
  const results = root.querySelector("[data-fee-results]");
  const resultsSummary = root.querySelector("[data-fee-summary]");
  const makerOutput = root.querySelector("[data-maker-output]");
  const ladderSelect = root.querySelector("[data-ladder-exchange]");
  const ladderBody = root.querySelector("[data-fee-ladder]");
  const ladderNote = root.querySelector("[data-ladder-note]");
  const canvas = root.querySelector("[data-fee-chart]");
  const chartSummary = root.querySelector("[data-chart-summary]");
  const chartTable = root.querySelector("[data-chart-table]");
  const chartModeControls = [...root.querySelectorAll("[data-chart-mode]")];
  const shareButton = root.querySelector("[data-share-fee-tool]");
  const shareStatus = root.querySelector("[data-share-status]");
  const sourceLinks = [...root.querySelectorAll('.fee-source-grid a[href^="http"]')];
  const isZh = root.dataset.lang === "zh-CN";
  const locale = isZh ? "zh-CN" : "en-US";
  const copy = isZh ? {
    noNext: "没有可确定的公开下一等级", highest: "已达到模型中的最高公开等级", volumeMet: "成交量路径已满足", moreVolume: (value) => `还差 ${value} 成交量`, assetMet: "资产路径已满足", moreAssets: (value) => `还差 ${value} 资产`, or: " 或 ",
    estimated: "完整等级排名", reference: "基础费率参考", full: "完整公开等级", base: "仅基础费率", fees30d: "预计 30 天手续费", blended: "混合费率", nextTier: "下一等级", saving: (value) => `若下一等级费率直接应用于当前成交量，理论可节省 ${value}/30 天`,
    comparableTitle: "完整等级可比排名", comparableNote: "仅在拥有完整公开费率等级的交易所之间排名。", referenceTitle: "基础费率参考", referenceNote: "以下交易所缺少可稳定核验的完整公开等级，不参与上方排名。",
    updatedSummary: (name, cost) => `完整等级排名已更新，当前最低估算为 ${name}，30 天手续费 ${cost}。`,
    chart: (share, mode) => `仅按成交量比较，Maker 占比为 ${share}%。当前显示${mode === "rate" ? "有效混合费率" : "预计手续费"}；成交量横轴采用对数刻度，线型用于辅助区分交易所，基础费率仅供参考。资产余额晋级路径未计入曲线。`,
    chartAria: (mode) => mode === "rate" ? "不同成交量下的有效混合费率（基点）" : "不同成交量下的预计手续费（美元）",
    chartValue: (value, mode) => mode === "rate" ? `${value.toFixed(2)} bps` : fullUsd.format(value),
    unavailable: "不可用", volumeApi: (tier) => Number.isFinite(tier.minApiShareForVolume) ? `成交量路径：API 占比 ≥ ${tier.minApiShareForVolume}%` : Number.isFinite(tier.maxApiShareForVolume) ? `成交量路径：API 占比 ≤ ${tier.maxApiShareForVolume}%` : "标准条件", standard: "标准条件", separator: "。",
    shareCopied: "分享链接已复制。", shareFailed: "无法自动复制，请从浏览器地址栏复制当前链接。", loadFailed: "费率数据加载失败，请先使用下方官方来源链接，稍后重试。",
    scope: {
      okx: "合约分组 1 / 主流交易对",
      bybit: "标准 VIP；Pro 3 以上采用主流 72 个 USDT 永续合约费率",
      bitget: "合约标准 VIP",
      binance: "USDⓈ-M 合约公开基础费率",
      mexc: "公开标准永续合约费率",
      gate: "USDT 合约基础费率"
    },
    notes: {
      okx: "分组 2 合约的 VIP 7 至 VIP 9 费率不同。",
      bybit: "API 交易占比不超过 20% 时采用标准 VIP，超过 20% 时采用 Pro；Pro 3 以上按官方主流 72 个 USDT 永续合约分组建模。",
      bitget: "Bitget PRO 做市商分组采用独立费率表，未计入本模型。",
      binance: "官方完整等级表由客户端动态渲染，且可能受账户折扣设置影响；在完整数据可稳定核验前，仅建模公开基础费率。",
      mexc: "公开标准永续费率为 Maker 0%、Taker 0.02%；地区、交易对和动态 M-Score VVIP 可能改变账户实际费率。",
      gate: "Gate 在多个页面发布交易对分组和 VIP 调整；为避免混合不兼容表格，本模型仅采用基础费率。"
    }
  } : {
    noNext: "No deterministic public next tier", highest: "Highest modeled public tier", volumeMet: "volume route met", moreVolume: (value) => `${value} more volume`, assetMet: "asset route met", moreAssets: (value) => `${value} more assets`, or: " or ",
    estimated: "full-ladder rank", reference: "base-rate reference", full: "Full public ladder", base: "Base rate only", fees30d: "Estimated 30d fees", blended: "Blended", nextTier: "Next tier", saving: (value) => `If next-tier rates applied to current volume, theoretical saving: ${value}/30d`,
    comparableTitle: "Comparable full-ladder ranking", comparableNote: "Ranked only among exchanges with a complete modeled public ladder.", referenceTitle: "Base-rate references", referenceNote: "These exchanges lack a stable, fully modeled public ladder and are excluded from the ranking above.",
    updatedSummary: (name, cost) => `Full-ladder ranking updated. The lowest current estimate is ${name} at ${cost} over 30 days.`,
    chart: (share, mode) => `Volume-only comparison at ${share}% maker share. Showing ${mode === "rate" ? "effective blended rates" : "estimated fees"}; the volume axis uses a log scale, line patterns also distinguish exchanges, and base-rate series are reference-only. Asset qualification is excluded.`,
    chartAria: (mode) => mode === "rate" ? "Effective blended fee rate in basis points by trading volume" : "Estimated execution fees in USD by trading volume",
    chartValue: (value, mode) => mode === "rate" ? `${value.toFixed(2)} bps` : fullUsd.format(value),
    unavailable: "Not available", volumeApi: (tier) => Number.isFinite(tier.minApiShareForVolume) ? `Volume route: API share ≥ ${tier.minApiShareForVolume}%` : Number.isFinite(tier.maxApiShareForVolume) ? `Volume route: API share ≤ ${tier.maxApiShareForVolume}%` : "Standard", standard: "Standard", separator: ". ",
    shareCopied: "Share link copied.", shareFailed: "Could not copy automatically. Copy the current URL from your browser.", loadFailed: "The fee dataset could not be loaded. Please use the official source links below and try again later.",
    scope: {}, notes: {}
  };
  const compactUsd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 });
  const fullUsd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  let dataset;

  const numberValue = (name) => Math.max(0, Number(form.elements[name]?.value) || 0);
  const percent = (value) => `${Number(value).toFixed(4).replace(/\.?0+$/, "") || "0"}%`;
  const bps = (value) => `${(Number(value) * 100).toFixed(2)} bps`;
  const volumeApiEligible = (tier, apiShare) => (
    (!Number.isFinite(tier.minApiShareForVolume) || apiShare >= tier.minApiShareForVolume)
    && (!Number.isFinite(tier.maxApiShareForVolume) || apiShare <= tier.maxApiShareForVolume)
  );
  const qualifies = (tier, volume, assets, apiShare) => {
    const byVolume = volume >= tier.minVolume && volumeApiEligible(tier, apiShare);
    const byAssets = tier.minAssets !== null && assets >= tier.minAssets;
    return byVolume || byAssets;
  };
  const tierFor = (exchange, volume, assets, apiShare) => exchange.tiers.reduce((selected, tier) => (
    qualifies(tier, volume, assets, apiShare) ? tier : selected
  ), exchange.tiers[0]);
  const costFor = (tier, volume, makerShare) => {
    const makerWeight = makerShare / 100;
    const blendedPercent = (tier.maker * makerWeight) + (tier.taker * (1 - makerWeight));
    return { blendedPercent, cost: volume * blendedPercent / 100 };
  };
  const nextTierFor = (exchange, currentTier, apiShare) => {
    const currentIndex = exchange.tiers.indexOf(currentTier);
    return exchange.tiers.slice(currentIndex + 1).find((tier) => (
      (tier.minAssets !== null || volumeApiEligible(tier, apiShare))
      && (tier.maker < currentTier.maker || tier.taker < currentTier.taker)
    )) || null;
  };

  function renderResults() {
    const volume = numberValue("volume");
    const assets = numberValue("assets");
    const makerShare = numberValue("makerShare");
    const apiShare = numberValue("apiShare");
    makerOutput.value = `${makerShare}%`;
    makerOutput.textContent = `${makerShare}%`;

    const ranked = dataset.exchanges.map((exchange) => {
      const tier = tierFor(exchange, volume, assets, apiShare);
      const estimate = costFor(tier, volume, makerShare);
      const nextTier = exchange.coverage === "full" ? nextTierFor(exchange, tier, apiShare) : null;
      const nextEstimate = nextTier ? costFor(nextTier, volume, makerShare) : null;
      const volumeGap = nextTier ? Math.max(0, nextTier.minVolume - volume) : null;
      const assetGap = nextTier?.minAssets === null || !nextTier ? null : Math.max(0, nextTier.minAssets - assets);
      return { exchange, tier, nextTier, nextEstimate, volumeGap, assetGap, ...estimate };
    }).sort((a, b) => a.cost - b.cost);

    const renderCards = (items, rankedGroup) => items.map((item, index) => {
      const { exchange, tier, nextTier, nextEstimate, volumeGap, assetGap } = item;
      const saving = nextEstimate ? Math.max(0, item.cost - nextEstimate.cost) : null;
      let nextCopy = copy.noNext;
      if (exchange.coverage === "full" && !nextTier) nextCopy = copy.highest;
      if (nextTier) {
        const routes = [];
        const volumeRouteAvailable = volumeApiEligible(nextTier, apiShare);
        if (volumeRouteAvailable) {
          if (volumeGap === 0) routes.push(copy.volumeMet);
          else routes.push(copy.moreVolume(compactUsd.format(volumeGap)));
        }
        if (assetGap !== null) routes.push(assetGap === 0 ? copy.assetMet : copy.moreAssets(compactUsd.format(assetGap)));
        nextCopy = `${escapeToolHtml(nextTier.name)}: ${routes.join(copy.or)}`;
      }
      return `<article class="fee-result-card${rankedGroup && index === 0 ? " best" : ""}">
        <div class="fee-card-head"><div><span class="exchange-dot" style="--exchange-color:${escapeToolHtml(exchange.color)}"></span><h3>${escapeToolHtml(exchange.name)}</h3></div><span class="coverage-badge ${escapeToolHtml(exchange.coverage)}">${escapeToolHtml(exchange.coverage === "full" ? copy.full : copy.base)}</span></div>
        <div class="fee-rank-row"><span>${rankedGroup ? `#${index + 1} ${copy.estimated}` : copy.reference}</span><strong>${escapeToolHtml(tier.name)}</strong></div>
        <div class="fee-primary-cost"><span>${copy.fees30d}</span><strong>${fullUsd.format(item.cost)}</strong></div>
        <dl class="fee-metrics"><div><dt>${copy.blended}</dt><dd>${bps(item.blendedPercent)}</dd></div><div><dt>Maker</dt><dd>${percent(tier.maker)}</dd></div><div><dt>Taker</dt><dd>${percent(tier.taker)}</dd></div></dl>
        <div class="fee-next-tier"><span>${copy.nextTier}</span><strong>${nextCopy}</strong>${saving !== null ? `<small>${copy.saving(fullUsd.format(saving))}</small>` : ""}</div>
        <p>${escapeToolHtml(tier.rateScope || copy.scope[exchange.id] || exchange.pairScope)}</p>
      </article>`;
    }).join("");
    const comparable = ranked.filter((item) => item.exchange.coverage === "full");
    const references = ranked.filter((item) => item.exchange.coverage !== "full");
    results.innerHTML = `<section class="fee-result-group" aria-labelledby="full-ladder-ranking-title">
      <div class="fee-group-heading"><h3 id="full-ladder-ranking-title">${copy.comparableTitle}</h3><p>${copy.comparableNote}</p></div>
      <div class="fee-result-cards">${renderCards(comparable, true)}</div>
    </section>
    <section class="fee-result-group reference" aria-labelledby="base-rate-reference-title">
      <div class="fee-group-heading"><h3 id="base-rate-reference-title">${copy.referenceTitle}</h3><p>${copy.referenceNote}</p></div>
      <div class="fee-result-cards">${renderCards(references, false)}</div>
    </section>`;
    if (resultsSummary && comparable[0]) resultsSummary.textContent = copy.updatedSummary(comparable[0].exchange.name, fullUsd.format(comparable[0].cost));
    renderChart(makerShare, apiShare);
  }

  function renderChart(makerShare, apiShare) {
    if (!canvas.getContext) return;
    const chartMode = chartModeControls.find((control) => control.checked)?.value || "rate";
    const volumes = [100000, 500000, 1000000, 5000000, 10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 750000000, 1000000000, 1500000000, 2000000000, 3000000000, 5000000000, 20000000000];
    const displayWidth = Math.max(620, canvas.parentElement.clientWidth || 900);
    const displayHeight = displayWidth < 760 ? 390 : 460;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = displayWidth * ratio;
    canvas.height = displayHeight * ratio;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const pad = { top: 34, right: 24, bottom: 54, left: 78 };
    const width = displayWidth - pad.left - pad.right;
    const height = displayHeight - pad.top - pad.bottom;
    const linePatterns = [[], [10, 5], [2, 5], [12, 4, 2, 4], [6, 4], [14, 4, 3, 4]];
    const series = dataset.exchanges.map((exchange, index) => ({
      exchange,
      pattern: linePatterns[index % linePatterns.length],
      values: volumes.map((volume) => {
        const estimate = costFor(tierFor(exchange, volume, 0, apiShare), volume, makerShare);
        return chartMode === "rate" ? estimate.blendedPercent * 100 : estimate.cost;
      })
    }));
    const maxValue = Math.max(...series.flatMap((item) => item.values), 1);
    const logMinVolume = Math.log10(volumes[0]);
    const logVolumeRange = Math.log10(volumes.at(-1)) - logMinVolume;
    const xFor = (volume) => pad.left + ((Math.log10(volume) - logMinVolume) / logVolumeRange) * width;
    const yFor = (value) => pad.top + height - (value / maxValue) * height;
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#607086";
    ctx.strokeStyle = "#dbe4ee";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
      const value = maxValue * i / 4;
      const y = yFor(value);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(displayWidth - pad.right, y); ctx.stroke();
      ctx.fillText(chartMode === "rate" ? `${value.toFixed(2)} bps` : compactUsd.format(value), 8, y + 4);
    }
    const tickVolumes = displayWidth < 760 ? [100000, 10000000, 1000000000, 20000000000] : [100000, 1000000, 10000000, 100000000, 1000000000, 20000000000];
    tickVolumes.forEach((volume) => {
      ctx.fillText(compactUsd.format(volume).replace(".0", ""), xFor(volume) - 18, displayHeight - 26);
    });
    series.forEach(({ exchange, pattern, values }) => {
      ctx.strokeStyle = exchange.color;
      ctx.lineWidth = exchange.coverage === "full" ? 3 : 2;
      ctx.setLineDash(pattern);
      ctx.beginPath();
      values.forEach((value, index) => index ? ctx.lineTo(xFor(volumes[index]), yFor(value)) : ctx.moveTo(xFor(volumes[index]), yFor(value)));
      ctx.stroke();
    });
    ctx.setLineDash([]);
    let legendX = pad.left;
    series.forEach(({ exchange, pattern }) => {
      ctx.strokeStyle = exchange.color;
      ctx.lineWidth = exchange.coverage === "full" ? 3 : 2;
      ctx.setLineDash(pattern);
      ctx.beginPath(); ctx.moveTo(legendX, 12); ctx.lineTo(legendX + 15, 12); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#07111f";
      ctx.fillText(exchange.name, legendX + 19, 16);
      legendX += ctx.measureText(exchange.name).width + 48;
    });
    canvas.setAttribute("aria-label", copy.chartAria(chartMode));
    chartSummary.textContent = copy.chart(makerShare, chartMode);
    if (chartTable) {
      chartTable.innerHTML = `<table class="fee-chart-table"><thead><tr><th>${isZh ? "交易所" : "Exchange"}</th>${volumes.map((volume) => `<th>${compactUsd.format(volume).replace(".0", "")}</th>`).join("")}</tr></thead><tbody>${series.map(({ exchange, values }) => `<tr><th scope="row">${escapeToolHtml(exchange.name)} · ${escapeToolHtml(exchange.coverage === "full" ? copy.full : copy.base)}</th>${values.map((value) => `<td>${escapeToolHtml(copy.chartValue(value, chartMode))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    }
  }

  function renderLadder() {
    const exchange = dataset.exchanges.find((item) => item.id === ladderSelect.value) || dataset.exchanges[0];
    ladderBody.innerHTML = exchange.tiers.map((tier) => `<tr><th scope="row">${escapeToolHtml(tier.name)}</th><td>${tier.minVolume ? `${compactUsd.format(tier.minVolume)}+` : "—"}</td><td>${tier.minAssets === null ? copy.unavailable : tier.minAssets ? `${compactUsd.format(tier.minAssets)}+` : "—"}</td><td>${percent(tier.maker)}</td><td>${percent(tier.taker)}</td><td>${copy.volumeApi(tier)}</td></tr>`).join("");
    ladderNote.textContent = [exchange.coverage === "full" ? copy.full : copy.base, copy.scope[exchange.id] || exchange.pairScope, copy.notes[exchange.id] || exchange.note].join(copy.separator);
  }

  function applyQueryState() {
    const params = new URLSearchParams(window.location.search);
    const mappings = { v: "volume", m: "makerShare", a: "assets", api: "apiShare" };
    Object.entries(mappings).forEach(([param, field]) => {
      if (params.has(param) && form.elements[field]) form.elements[field].value = params.get(param);
    });
  }

  async function shareState() {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("v", String(numberValue("volume")));
    url.searchParams.set("m", String(numberValue("makerShare")));
    url.searchParams.set("a", String(numberValue("assets")));
    url.searchParams.set("api", String(numberValue("apiShare")));
    try {
      await copyText(url.toString());
      shareStatus.textContent = copy.shareCopied;
      gtag("event", "fee_tool_share", { event_category: "engagement" });
    } catch (error) {
      shareStatus.textContent = copy.shareFailed;
    }
  }

  fetch(root.dataset.dataUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Fee data request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      dataset = data;
      applyQueryState();
      renderResults();
      renderLadder();
      let hasTrackedFirstUse = false;
      const handleFeeControl = (event) => {
        renderResults();
        if (hasTrackedFirstUse) return;
        hasTrackedFirstUse = true;
        gtag("event", "fee_tool_first_use", {
          event_category: "engagement",
          interaction_type: event.type,
        });
      };
      form.addEventListener("input", handleFeeControl);
      form.addEventListener("change", handleFeeControl);
      ladderSelect.addEventListener("change", () => {
        renderLadder();
        gtag("event", "fee_tool_exchange_select", {
          event_category: "engagement",
          exchange: ladderSelect.value,
        });
      });
      sourceLinks.forEach((link) => {
        link.addEventListener("click", () => {
          gtag("event", "fee_tool_source_click", {
            event_category: "engagement",
            source_host: new URL(link.href).hostname,
          });
        });
      });
      chartModeControls.forEach((control) => control.addEventListener("change", () => renderChart(numberValue("makerShare"), numberValue("apiShare"))));
      shareButton.addEventListener("click", shareState);
      let resizeTimer;
      window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(renderResults, 120);
      });
    })
    .catch((error) => {
      results.innerHTML = `<p class="tool-notice error">${copy.loadFailed}</p>`;
      console.error(error);
    });
}

function initHyperliquidFeeTool() {
  const root = document.querySelector("[data-hyperliquid-fee-tool]");
  if (!root) return;

  const form = root.querySelector("[data-hl-controls]");
  const makerOutput = root.querySelector("[data-hl-maker-output]");
  const shareButton = root.querySelector("[data-hl-share]");
  const shareStatus = root.querySelector("[data-hl-share-status]");
  const isZh = root.dataset.lang === "zh-CN";
  const locale = isZh ? "zh-CN" : "en-US";
  const usd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const compactUsd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 });
  const copy = isZh ? {
    highest: "已达到最高公开 VIP 等级",
    gap: (name, value) => `${name} · 还差 ${value}`,
    saving: (value) => `按当前成交量与执行结构，下一等级理论可少付 ${value}`,
    noSaving: "当前 Maker Rebate 或成交结构下，下一等级没有可显示的正向节省。",
    summary: (tier, cost) => `Hyperliquid 手续费估算已更新：${tier}，14 天预计执行手续费 ${cost}。`,
    copied: "场景链接已复制。",
    copyFailed: "无法自动复制，请从浏览器地址栏复制当前链接。",
    loadFailed: "Hyperliquid 费率数据加载失败，请先查看下方官方来源。"
  } : {
    highest: "Highest published VIP tier reached",
    gap: (name, value) => `${name} · ${value} to go`,
    saving: (value) => `At this volume and execution mix, the next tier models ${value} lower cost`,
    noSaving: "The selected maker rebate or execution mix leaves no positive next-tier saving to display.",
    summary: (tier, cost) => `Hyperliquid fee estimate updated: ${tier}, estimated 14-day execution fees ${cost}.`,
    copied: "Scenario link copied.",
    copyFailed: "Could not copy automatically. Copy the current URL from the browser address bar.",
    loadFailed: "The Hyperliquid fee schedule could not be loaded. Use the official sources below and try again."
  };
  let dataset;

  const output = (name) => root.querySelector(`[data-hl-${name}]`);
  const numberValue = (name) => Math.max(0, Number(form.elements[name]?.value) || 0);
  const rateText = (value) => `${Number(value).toFixed(4).replace(/0+$/, "").replace(/\.$/, "") || "0"}%`;
  const tierFor = (weightedVolume) => dataset.vipTiers.reduce((selected, tier) => (
    weightedVolume >= tier.minWeightedVolume ? tier : selected
  ), dataset.vipTiers[0]);
  const discountedRate = (rate, discount) => rate > 0 ? rate * (1 - discount / 100) : rate;
  const productEstimate = (volume, makerRate, takerRate, makerShare) => {
    const makerWeight = makerShare / 100;
    const blendedRate = makerRate * makerWeight + takerRate * (1 - makerWeight);
    return { blendedRate, cost: volume * blendedRate / 100 };
  };
  const ratesFor = (tier, discount, rebate) => ({
    perpMaker: rebate?.makerRate ?? discountedRate(tier.perpMaker, discount),
    perpTaker: discountedRate(tier.perpTaker, discount),
    spotMaker: rebate?.makerRate ?? discountedRate(tier.spotMaker, discount),
    spotTaker: discountedRate(tier.spotTaker, discount)
  });

  function estimateFor(tier, inputs) {
    const rates = ratesFor(tier, inputs.stakingDiscount, inputs.rebate);
    const perp = productEstimate(inputs.perpVolume, rates.perpMaker, rates.perpTaker, inputs.makerShare);
    const spot = productEstimate(inputs.spotVolume, rates.spotMaker, rates.spotTaker, inputs.makerShare);
    return { rates, perp, spot, total: perp.cost + spot.cost };
  }

  function renderHyperliquidFees() {
    const inputs = {
      perpVolume: numberValue("perpVolume"),
      spotVolume: numberValue("spotVolume"),
      makerShare: Math.min(100, numberValue("makerShare")),
      stakingDiscount: Math.min(100, numberValue("stakingDiscount")),
      rebate: dataset.makerRebateTiers[Number(form.elements.makerRebate?.value) || 0]
    };
    if (inputs.rebate?.makerRate === null) inputs.rebate = null;
    const weightedVolume = inputs.perpVolume + inputs.spotVolume * 2;
    const tier = tierFor(weightedVolume);
    const tierIndex = dataset.vipTiers.indexOf(tier);
    const nextTier = dataset.vipTiers[tierIndex + 1] || null;
    const estimate = estimateFor(tier, inputs);

    makerOutput.value = `${inputs.makerShare}%`;
    makerOutput.textContent = `${inputs.makerShare}%`;
    output("tier").textContent = tier.name;
    output("total").textContent = usd.format(estimate.total);
    output("weighted").textContent = compactUsd.format(weightedVolume);
    output("staking").textContent = `${inputs.stakingDiscount}%`;
    output("perp-maker").textContent = rateText(estimate.rates.perpMaker);
    output("perp-taker").textContent = rateText(estimate.rates.perpTaker);
    output("spot-maker").textContent = rateText(estimate.rates.spotMaker);
    output("spot-taker").textContent = rateText(estimate.rates.spotTaker);
    output("perp-cost").textContent = usd.format(estimate.perp.cost);
    output("spot-cost").textContent = usd.format(estimate.spot.cost);

    if (!nextTier) {
      output("next").textContent = copy.highest;
      output("next-saving").textContent = "";
    } else {
      const gap = Math.max(0, nextTier.minWeightedVolume - weightedVolume);
      const nextEstimate = estimateFor(nextTier, inputs);
      const saving = estimate.total - nextEstimate.total;
      output("next").textContent = copy.gap(nextTier.name, compactUsd.format(gap));
      output("next-saving").textContent = saving > 0.005 ? copy.saving(usd.format(saving)) : copy.noSaving;
    }
    output("summary").textContent = copy.summary(tier.name, usd.format(estimate.total));
  }

  function applyHyperliquidQueryState() {
    const params = new URLSearchParams(window.location.search);
    const mappings = { pv: "perpVolume", sv: "spotVolume", m: "makerShare", s: "stakingDiscount", r: "makerRebate" };
    Object.entries(mappings).forEach(([param, field]) => {
      if (params.has(param) && form.elements[field]) form.elements[field].value = params.get(param);
    });
  }

  async function shareHyperliquidState() {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("pv", String(numberValue("perpVolume")));
    url.searchParams.set("sv", String(numberValue("spotVolume")));
    url.searchParams.set("m", String(numberValue("makerShare")));
    url.searchParams.set("s", String(numberValue("stakingDiscount")));
    url.searchParams.set("r", String(numberValue("makerRebate")));
    try {
      await copyText(url.toString());
      shareStatus.textContent = copy.copied;
      gtag("event", "hyperliquid_fee_tool_share", { event_category: "engagement" });
    } catch (error) {
      shareStatus.textContent = copy.copyFailed;
    }
  }

  fetch(root.dataset.url)
    .then((response) => {
      if (!response.ok) throw new Error(`Hyperliquid fee data request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      dataset = data;
      applyHyperliquidQueryState();
      renderHyperliquidFees();
      let hasTrackedFirstUse = false;
      const update = (event) => {
        renderHyperliquidFees();
        if (hasTrackedFirstUse) return;
        hasTrackedFirstUse = true;
        gtag("event", "hyperliquid_fee_tool_first_use", { event_category: "engagement", interaction_type: event.type });
      };
      form.addEventListener("input", update);
      form.addEventListener("change", update);
      shareButton.addEventListener("click", shareHyperliquidState);
    })
    .catch((error) => {
      output("summary").textContent = copy.loadFailed;
      root.querySelector(".hl-results").insertAdjacentHTML("afterbegin", `<p class="tool-notice error">${escapeToolHtml(copy.loadFailed)}</p>`);
      console.error(error);
    });
}

installLinkedInInsightTag();

document.addEventListener("DOMContentLoaded", () => {
  const mobileContactBar = document.querySelector(".mobile-contact-bar");
  const hero = document.querySelector(".hero, .content-hero");
  if (mobileContactBar && hero) {
    const syncMobileContactBar = () => {
      const revealAfter = Math.min(Math.max(hero.offsetHeight * 0.55, 320), 520);
      document.body.classList.toggle("mobile-contact-ready", window.scrollY > revealAfter);
    };
    syncMobileContactBar();
    window.addEventListener("scroll", syncMobileContactBar, { passive: true });
    window.addEventListener("resize", syncMobileContactBar, { passive: true });
  }

  initExchangeFeeTool();
  initHyperliquidFeeTool();
  function statusFor(element) {
    const scope = element.closest("article, .contact-copy, .contact-card, section");
    return scope?.querySelector(".copy-status") || document.querySelector(".copy-status");
  }

  document.querySelectorAll("[data-contact]:not([data-copy]):not([data-copy-target])").forEach((element) => {
    element.addEventListener("click", () => {
      reportContactClick(element.dataset.contact, element.dataset.leadContact === "true");
    });
  });

  document.querySelectorAll("[data-copy], [data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = button.dataset.copyTarget ? document.getElementById(button.dataset.copyTarget) : null;
      const value = target ? target.textContent.trim() : button.dataset.copy;
      const status = statusFor(button);
      try {
        await copyText(value);
        if (status) {
          status.textContent = `已复制：${value}`;
        }
        reportContactClick(button.dataset.contact || "copy", true);
      } catch (error) {
        if (status) {
          status.textContent = "复制失败，请手动复制页面上的联系方式。";
        }
      }
    });
  });

  document.querySelectorAll("form[data-mailto-brief]").forEach((form) => {
    let firstSubmitError = null;
    let validatingSubmit = false;

    const clearFieldError = (control) => {
      control.removeAttribute("aria-invalid");
      const errorId = control.dataset.errorId;
      if (!errorId) return;
      document.getElementById(errorId)?.remove();
      delete control.dataset.errorId;
      control.removeAttribute("aria-describedby");
    };

    const showFieldError = (control) => {
      clearFieldError(control);
      const errorId = `brief-${control.name}-error`;
      const error = document.createElement("span");
      error.id = errorId;
      error.className = "field-error";
      error.textContent = control.validationMessage || "请完成此项。";
      control.setAttribute("aria-invalid", "true");
      control.setAttribute("aria-describedby", errorId);
      control.dataset.errorId = errorId;
      control.insertAdjacentElement("afterend", error);
    };

    form.addEventListener("invalid", (event) => {
      const control = event.target;
      if (!control?.name) return;
      event.preventDefault();
      if (!validatingSubmit) {
        form.querySelectorAll('[aria-invalid="true"]').forEach(clearFieldError);
        firstSubmitError = null;
        validatingSubmit = true;
        window.setTimeout(() => {
          validatingSubmit = false;
          firstSubmitError = null;
        }, 0);
      }
      if (validatingSubmit && firstSubmitError) return;
      showFieldError(control);
      firstSubmitError = control;
      control.focus();
    }, true);

    ["input", "change"].forEach((eventName) => {
      form.addEventListener(eventName, (event) => {
        const control = event.target;
        if (control?.validity?.valid) clearFieldError(control);
      });
    });

    form.addEventListener("focusout", (event) => {
      const control = event.target;
      if (control?.name && control.validity && !control.validity.valid) showFieldError(control);
    });

    form.addEventListener("focusin", () => {
      document.body.classList.add("brief-form-active");
    });

    form.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!form.contains(document.activeElement)) document.body.classList.remove("brief-form-active");
      }, 0);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelectorAll('[aria-invalid="true"]').forEach(clearFieldError);
      firstSubmitError = null;
      validatingSubmit = true;
      const isValid = form.reportValidity();
      validatingSubmit = false;
      if (!isValid) {
        firstSubmitError?.focus();
        return;
      }
      const status = statusFor(form);
      const destination = mailtoFromBrief(form);
      let didNavigate = false;
      const openMailClient = () => {
        if (didNavigate) return;
        didNavigate = true;
        window.location.href = destination;
      };
      if (status) {
        status.textContent = "已生成结构化 Brief，并打开邮件客户端。这个有效提交会计入咨询转化。";
      }
      reportBriefSubmit(form.dataset.contact || "structured_brief_submit", openMailClient);
      window.setTimeout(openMailClient, 1300);
    });
  });

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", () => {
      reportContactClick(form.dataset.contact || "form_submit", true);
    });
  });
});
