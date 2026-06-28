const ADS_ID = "AW-975458180";
const ADS_CONVERSION = "AW-975458180/i_t6CKjS6pwYEISfkdED";
const GA_ID = "G-390F8PHDES";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", ADS_ID);
gtag("config", GA_ID);

function reportContact(method) {
  gtag("event", "contact_click", {
    method,
    event_category: "lead",
  });
  gtag("event", "conversion", {
    send_to: ADS_CONVERSION,
    value: 1.0,
    currency: "CNY",
  });
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

  document.querySelectorAll("[data-contact]").forEach((element) => {
    element.addEventListener("click", () => {
      reportContact(element.dataset.contact);
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
      } catch (error) {
        if (status) {
          status.textContent = "复制失败，请手动复制页面上的联系方式。";
        }
      }
    });
  });
});
