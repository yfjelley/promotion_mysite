const ADS_ID = "AW-975458180";
const ADS_CONVERSION = "AW-975458180/i_t6CKjS6pwYEISfkdED";
const ADS_LEAD_VALUE = 100.0;
const ADS_LEAD_CURRENCY = "USD";
const GA_ID = "G-390F8PHDES";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", ADS_ID);
gtag("config", GA_ID);

function reportAdsLead(method) {
  gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    value: ADS_LEAD_VALUE,
    currency: ADS_LEAD_CURRENCY,
    lead_method: method,
  });
}

function reportContactClick(method, isLead = false) {
  gtag("event", "contact_click", {
    method,
    event_category: isLead ? "lead" : "engagement",
    lead_action: isLead ? "external_contact" : "internal_cta",
  });

  if (isLead) {
    reportAdsLead(method);
  }
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
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

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector(".copy-status");

  document.querySelectorAll("[data-contact]:not([data-copy])").forEach((element) => {
    element.addEventListener("click", () => {
      reportContactClick(element.dataset.contact, element.dataset.leadContact === "true");
    });
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
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
