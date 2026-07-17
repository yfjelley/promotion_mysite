import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(new URL("../public/scripts.js", import.meta.url), "utf8");
const listeners = new Map();
const timers = [];
const status = { textContent: "" };
const controls = [
  ["Project type", "Broker API automation"],
  ["Permission status", "Read and trade access available"],
  ["Risk boundary", "Manual pause and maximum order size are required"],
  ["Deployment target", "Customer cloud"]
].map(([label, value]) => ({
  value,
  getAttribute(name) {
    return name === "data-brief-label" ? label : null;
  }
}));

const form = {
  dataset: { contact: "structured_brief_submit" },
  elements: {
    budget: { value: "USD 5,000" },
    permissionStatus: { value: "Read and trade access available" },
    riskBoundary: { value: "Manual pause and maximum order size are required" },
    deploymentTarget: { value: "Customer cloud" }
  },
  addEventListener(type, callback) {
    listeners.set(`form:${type}`, callback);
  },
  closest() {
    return { querySelector: () => status };
  },
  getAttribute(name) {
    if (name === "data-mailto-recipient") return "contact@pddjf.com";
    if (name === "data-mailto-subject") return "SignalCraft Labs project brief";
    return null;
  },
  querySelectorAll(selector) {
    return selector === "[data-brief-label]" ? controls : [];
  },
  reportValidity() {
    return true;
  }
};

const window = {
  dataLayer: [],
  isSecureContext: true,
  location: {
    href: "https://pddjf.com/contact/?gclid=test-click-id",
    search: "?gclid=test-click-id"
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

runInNewContext(script, {
  URLSearchParams,
  document,
  navigator: {},
  window
});

listeners.get("DOMContentLoaded")();
let prevented = false;
listeners.get("form:submit")({ preventDefault: () => { prevented = true; } });

assert.equal(prevented, true);
assert.equal(window.location.href, "https://pddjf.com/contact/?gclid=test-click-id");
assert.match(status.textContent, /有效提交会计入咨询转化/);

const gaSubmit = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "contact_submit");
assert.ok(gaSubmit, "validated Brief submission should emit the GA4 contact_submit event");
assert.equal(gaSubmit[2].method, "structured_brief_submit");

const adsConversion = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "conversion");
assert.ok(adsConversion, "validated Brief submission should emit a Google Ads conversion event");
assert.equal(adsConversion[2].send_to, "AW-975458180/i_t6CKjS6pwYEISfkdED");
assert.equal(adsConversion[2].value, 100);
assert.equal(adsConversion[2].currency, "USD");
assert.equal(adsConversion[2].event_timeout, 1200);
assert.equal(typeof adsConversion[2].event_callback, "function");

assert.equal(timers.length, 1);
assert.equal(timers[0].delay, 1300);
adsConversion[2].event_callback();
assert.match(window.location.href, /^mailto:contact@pddjf\.com\?/);
assert.match(window.location.href, /gclid%3A%20test-click-id/);
const destination = window.location.href;
timers[0].callback();
assert.equal(window.location.href, destination, "timeout fallback must not navigate twice");

console.log("Ads conversion test ok: GA4 contact_submit + AW conversion callback before mailto navigation");
