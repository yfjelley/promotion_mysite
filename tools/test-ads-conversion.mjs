import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(new URL("../public/scripts.js", import.meta.url), "utf8");
const listeners = new Map();
const timers = [];
const requests = [];
const status = { textContent: "" };
const submitButton = { textContent: "安全提交项目 Brief", disabled: false };
const controls = [
  ["projectType", "Project type", "Broker API automation"],
  ["budget", "Budget range", "还在评估"],
  ["permissionStatus", "Permission status", "Read and trade access available"],
  ["riskBoundary", "Business or execution problem", "TradingView alerts still require manual order entry"],
  ["deploymentTarget", "Deployment target", "Customer cloud"],
  ["contactMethod", "Preferred contact method", "buyer@example.com"]
].map(([name, label, value]) => ({
  name,
  value,
  getAttribute(attribute) {
    return attribute === "data-brief-label" ? label : null;
  }
}));

const form = {
  dataset: { contact: "structured_brief_submit", briefEndpoint: "/api/brief" },
  elements: {
    projectType: controls[0],
    budget: controls[1],
    permissionStatus: controls[2],
    riskBoundary: controls[3],
    deploymentTarget: controls[4],
    website: { value: "" }
  },
  addEventListener(type, callback) {
    listeners.set(`form:${type}`, callback);
  },
  closest() {
    return { querySelector: () => status };
  },
  querySelector(selector) {
    return selector === 'button[type="submit"]' ? submitButton : null;
  },
  querySelectorAll(selector) {
    if (selector === "[data-brief-label]") return controls;
    return [];
  },
  reportValidity() {
    return true;
  },
  setAttribute(name, value) {
    this[name] = value;
  },
  removeAttribute(name) {
    delete this[name];
  }
};

const window = {
  dataLayer: [],
  isSecureContext: true,
  location: {
    href: "https://pddjf.com/contact/?gclid=test-click-id&project=hyperliquid-api-trading-bot-development&package=Execution%20System%20Package",
    search: "?gclid=test-click-id&project=hyperliquid-api-trading-bot-development&package=Execution%20System%20Package"
  },
  setTimeout(callback, delay) {
    timers.push({ callback, delay });
    return timers.length;
  },
  addEventListener(type, callback) {
    listeners.set(`window:${type}`, callback);
  }
};

const document = {
  referrer: "https://www.google.com/",
  addEventListener(type, callback) {
    listeners.set(type, callback);
  },
  querySelector() {
    return null;
  },
  querySelectorAll(selector) {
    return selector === "form[data-mailto-brief]" ? [form] : [];
  }
};

async function fetch(url, options) {
  requests.push({ url, options });
  return {
    ok: true,
    status: 201,
    async json() {
      return { ok: true, id: "test-brief-id", receivedAt: "2026-07-19T00:00:00.000Z" };
    }
  };
}

runInNewContext(script, {
  URLSearchParams,
  document,
  fetch,
  navigator: {},
  window
});

listeners.get("DOMContentLoaded")();
let prevented = false;
await listeners.get("form:submit")({ preventDefault: () => { prevented = true; } });

assert.equal(prevented, true);
assert.equal(window.location.href, "https://pddjf.com/contact/?gclid=test-click-id&project=hyperliquid-api-trading-bot-development&package=Execution%20System%20Package");
assert.equal(requests.length, 1);
assert.equal(requests[0].url, "/api/brief");
assert.equal(requests[0].options.method, "POST");
const payload = JSON.parse(requests[0].options.body);
assert.equal(payload.site, "pddjf");
assert.equal(payload.fields.projectType, "Hyperliquid custom bot development");
assert.equal(payload.fields.budget, "Execution System Package - 5000 美金起");
assert.equal(payload.fields.contactMethod, "buyer@example.com");
assert.equal(payload.tracking.gclid, "test-click-id");
assert.equal(payload.tracking.project, "hyperliquid-api-trading-bot-development");
assert.equal(payload.tracking.package, "Execution System Package");
assert.equal(form.dataset.submitted, "true");
assert.equal(submitButton.disabled, true);
assert.equal(submitButton.textContent, "已安全提交");
assert.match(status.textContent, /项目 Brief 已收到，编号 test-bri/);

const gaSubmit = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "contact_submit");
assert.ok(gaSubmit, "stored Brief submission should emit the GA4 contact_submit event");
assert.equal(gaSubmit[2].method, "structured_brief_submit");

const adsConversion = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "conversion");
assert.ok(adsConversion, "stored Brief submission should emit a Google Ads conversion event");
assert.equal(adsConversion[2].send_to, "AW-975458180/i_t6CKjS6pwYEISfkdED");
assert.equal(adsConversion[2].value, 100);
assert.equal(adsConversion[2].currency, "USD");
assert.equal(adsConversion[2].event_callback, undefined);
assert.equal(adsConversion[2].event_timeout, undefined);

console.log("Ads conversion test ok: site storage confirmed before GA4 + Ads lead events");
