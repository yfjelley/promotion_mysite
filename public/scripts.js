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

function reportAdsLead(method) {
  gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    value: ADS_LEAD_VALUE,
    currency: ADS_LEAD_CURRENCY,
    lead_method: method,
  });
}

function reportLinkedInLead() {
  if (!LINKEDIN_LEAD_CONVERSION_ID || typeof window.lintrk !== "function") return;
  window.lintrk("track", { conversion_id: Number(LINKEDIN_LEAD_CONVERSION_ID) });
}

function reportContactClick(method, isLead = false) {
  gtag("event", "contact_click", {
    method,
    event_category: isLead ? "lead" : "engagement",
    lead_action: isLead ? "external_contact" : "internal_cta",
  });

  if (isLead) {
    reportAdsLead(method);
    reportLinkedInLead();
  }
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

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", () => {
      reportContactClick(form.dataset.contact || "form_submit", true);
    });
  });
});
