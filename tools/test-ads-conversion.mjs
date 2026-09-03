import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(new URL("../public/scripts.js", import.meta.url), "utf8");
assert.match(script, /"fintech-software-development": "Fintech software development"/, "fintech landing page should preselect its dedicated Brief project type");
const listeners = new Map();
const timers = [];
const requests = [];
const loadedScripts = [];
const sessionValues = new Map();
const status = { textContent: "" };
const submitButton = { textContent: "Send project brief securely", disabled: false };
let contactClick;
const contactLink = {
  dataset: { contact: "email", leadContact: "true" },
  addEventListener(type, callback) {
    if (type === "click") contactClick = callback;
  }
};
const briefLink = {
  href: "/en/contact/?project=custom-trading-software-development",
  getAttribute(name) {
    return name === "href" ? this.href : null;
  },
  setAttribute(name, value) {
    if (name === "href") this.href = value;
  }
};
const controls = [
  ["projectType", "Project type", "Custom trading software development"],
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
  dataset: { contact: "structured_brief_submit", briefEndpoint: "/api/brief", lang: "en" },
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
    href: "https://pddjf.com/custom-trading-software-development/?gclid=test-click-id&fbclid=test-meta-click-id&twclid=test-x-click-id&utm_source=google&utm_medium=cpc&utm_campaign=quant-trading-development&project=custom-trading-software-development&package=Execution%20System%20Package",
    origin: "https://pddjf.com",
    search: "?gclid=test-click-id&fbclid=test-meta-click-id&twclid=test-x-click-id&utm_source=google&utm_medium=cpc&utm_campaign=quant-trading-development&project=custom-trading-software-development&package=Execution%20System%20Package"
  },
  sessionStorage: {
    getItem(key) {
      return sessionValues.get(key) || null;
    },
    setItem(key, value) {
      sessionValues.set(key, value);
    }
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
  documentElement: { lang: "en" },
  head: {
    appendChild(element) {
      loadedScripts.push(element);
    }
  },
  createElement() {
    return { dataset: {} };
  },
  addEventListener(type, callback) {
    listeners.set(type, callback);
  },
  querySelector() {
    return null;
  },
  querySelectorAll(selector) {
    if (selector === "form[data-mailto-brief]") return [form];
    if (selector === "[data-contact]:not([data-copy]):not([data-copy-target])") return [contactLink];
    if (selector === "a[href]") return [briefLink];
    return [];
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
  URL,
  URLSearchParams,
  document,
  fetch,
  navigator: {},
  window
});

listeners.get("DOMContentLoaded")();
assert.equal(
  loadedScripts.some((element) => element.src === "https://static.ads-twitter.com/uwt.js" && element.dataset.xPixelLoader === "true"),
  true,
  "X Pixel base script should load"
);
assert.equal(
  window.twq.queue.some((entry) => Array.from(entry)[0] === "config" && Array.from(entry)[1] === "qt4nt"),
  true,
  "X Pixel should configure the account pixel"
);
contactClick();
const contactConversions = window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "conversion");
assert.equal(contactConversions.length, 1, "a lead contact click should emit exactly one contact-click Ads conversion");
assert.equal(contactConversions[0][2].send_to, "AW-975458180/JwqyCN_Cqe0cEISfkdED", "contact clicks must use the contact-click label, not the stored-inquiry one");
contactClick();
assert.equal(
  window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "conversion").length,
  1,
  "repeated clicks on the same contact method must not emit duplicate contact conversions"
);
assert.match(briefLink.href, /^\/en\/contact\/\?project=custom-trading-software-development&/);
assert.match(briefLink.href, /gclid=test-click-id/);
assert.match(briefLink.href, /fbclid=test-meta-click-id/);
assert.match(briefLink.href, /twclid=test-x-click-id/);
assert.match(briefLink.href, /utm_source=google/);
assert.match(briefLink.href, /utm_medium=cpc/);
assert.match(briefLink.href, /utm_campaign=quant-trading-development/);

window.location.href = "https://pddjf.com/en/contact/?project=custom-trading-software-development";
window.location.search = "?project=custom-trading-software-development";
let prevented = false;
await listeners.get("form:submit")({ preventDefault: () => { prevented = true; } });

assert.equal(prevented, true);
assert.equal(window.location.href, "https://pddjf.com/en/contact/?project=custom-trading-software-development");
assert.equal(requests.length, 1);
assert.equal(requests[0].url, "/api/brief");
assert.equal(requests[0].options.method, "POST");
const payload = JSON.parse(requests[0].options.body);
assert.equal(payload.site, "pddjf");
assert.equal(payload.fields.projectType, "Custom trading software development");
assert.equal(payload.fields.budget, "Execution System Package - 10000 美金起");
assert.equal(payload.fields.contactMethod, "buyer@example.com");
assert.equal(payload.tracking.gclid, "test-click-id");
assert.equal(payload.tracking.fbclid, "test-meta-click-id");
assert.equal(payload.tracking.twclid, "test-x-click-id");
assert.equal(payload.tracking.utm_source, "google");
assert.equal(payload.tracking.utm_medium, "cpc");
assert.equal(payload.tracking.utm_campaign, "quant-trading-development");
assert.equal(payload.tracking.project, "custom-trading-software-development");
assert.equal(payload.tracking.package, "Execution System Package");
assert.match(payload.tracking.landing_page, /\/custom-trading-software-development\/\?gclid=test-click-id/);
assert.equal(form.dataset.submitted, "true");
assert.equal(submitButton.disabled, true);
assert.equal(submitButton.textContent, "Submitted securely");
assert.match(status.textContent, /Project brief received\. Reference test-bri/);

const gaSubmit = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "contact_submit");
assert.ok(gaSubmit, "stored Brief submission should emit the GA4 contact_submit event");
assert.equal(gaSubmit[2].method, "structured_brief_submit");

const adsConversion = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "conversion" && entry[2]?.send_to === "AW-975458180/nb0cCNOI5-sYEISfkdED");
assert.ok(adsConversion, "stored Brief submission should emit a Google Ads conversion event");
assert.equal(adsConversion[2].send_to, "AW-975458180/nb0cCNOI5-sYEISfkdED");
assert.equal(adsConversion[2].value, 100);
assert.equal(adsConversion[2].currency, "USD");
assert.equal(adsConversion[2].event_callback, undefined);
assert.equal(adsConversion[2].event_timeout, undefined);

const xLead = window.twq.queue.find((entry) => Array.from(entry)[0] === "event");
assert.ok(xLead, "stored Brief submission should emit the X Lead event");
assert.equal(Array.from(xLead)[1], "tw-qt4nt-qt4nv");

console.log("Ads conversion test ok: Google, Meta and X attribution survives the Brief hop and stored inquiry emits Google + X lead events");
