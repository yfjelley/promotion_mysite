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

installLinkedInInsightTag();

document.addEventListener("DOMContentLoaded", () => {
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
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
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
