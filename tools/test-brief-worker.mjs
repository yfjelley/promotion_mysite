import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const workerSource = readFileSync(join(root, "public", "_worker.js"), "utf8");
const workerModule = await import(`data:text/javascript;base64,${Buffer.from(workerSource).toString("base64")}`);

function mockKv() {
  const values = new Map();
  return {
    values,
    async get(key) {
      return values.get(key) ?? null;
    },
    async put(key, value) {
      values.set(key, value);
    }
  };
}

const kv = mockKv();
const sentEmails = [];
const env = {
  BRIEF_SUBMISSIONS: kv,
  BRIEF_NOTIFIER: {
    async fetch(request) {
      const message = await request.json();
      sentEmails.push(message);
      return Response.json({ ok: true, messageId: `test-message-${sentEmails.length}` });
    }
  }
};

const jsonResponse = await workerModule.default.fetch(new Request("https://pddjf.com/api/brief", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Origin": "https://pddjf.com",
    "CF-Connecting-IP": "192.0.2.10"
  },
  body: JSON.stringify({
    site: "pddjf",
    qualification: "structured_brief_v1",
    fields: {
      projectType: "TradingView webhook automation",
      contactMethod: "buyer@example.com",
      riskBoundary: "Prevent duplicate orders and preserve an audit trail."
    }
  })
}), env);

assert.equal(jsonResponse.status, 201);
assert.match(jsonResponse.headers.get("content-type") || "", /^application\/json/);
assert.equal((await jsonResponse.json()).ok, true);

const nativeResponse = await workerModule.default.fetch(new Request("https://pddjf.com/api/brief", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://pddjf.com",
    "Referer": "https://pddjf.com/en/contact/",
    "CF-Connecting-IP": "192.0.2.11"
  },
  body: new URLSearchParams({
    lang: "en",
    projectType: "Broker API integration",
    contactMethod: "buyer@example.com",
    riskBoundary: "Keep withdrawal permissions disabled."
  })
}), env);

assert.equal(nativeResponse.status, 201);
assert.match(nativeResponse.headers.get("content-type") || "", /^text\/html/);
assert.match(nativeResponse.headers.get("content-security-policy") || "", /default-src 'none'/);
assert.match(nativeResponse.headers.get("content-security-policy") || "", /script-src 'nonce-[a-f0-9]+'/);
assert.match(nativeResponse.headers.get("content-security-policy") || "", /https:\/\/www\.googletagmanager\.com/);
const nativeHtml = await nativeResponse.text();
assert.match(nativeHtml, /Project brief received/);
assert.match(nativeHtml, /AW-975458180\/nb0cCNOI5-sYEISfkdED/);
assert.match(nativeHtml, /transaction_id/);

const honeypotNativeResponse = await workerModule.default.fetch(new Request("https://pddjf.com/api/brief", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://pddjf.com",
    "Referer": "https://pddjf.com/contact/",
    "CF-Connecting-IP": "192.0.2.14"
  },
  body: new URLSearchParams({
    lang: "zh-CN",
    website: "https://spam.example",
    projectType: "TradingView webhook automation",
    contactMethod: "spam@example.com",
    riskBoundary: "Automated honeypot submission"
  })
}), env);

assert.equal(honeypotNativeResponse.status, 201);
const honeypotNativeHtml = await honeypotNativeResponse.text();
assert.doesNotMatch(honeypotNativeHtml, /AW-975458180\/nb0cCNOI5-sYEISfkdED/);

const records = [...kv.values.entries()]
  .filter(([key]) => key.startsWith("brief:pddjf:"))
  .map(([, value]) => JSON.parse(value));
assert.equal(records.length, 2);
assert.equal(records.some((record) => record.qualification === "native_form"), true);
assert.equal(records.every((record) => record.notification?.status === "sent"), true);
assert.equal(sentEmails.length, 2);
assert.equal(sentEmails.every((message) => message.to === "yfjelley@gmail.com"), true);
assert.equal(sentEmails.every((message) => message.from.email === "brief@pddjf.com"), true);
assert.equal(sentEmails[0].replyTo, "buyer@example.com");
assert.match(sentEmails[0].subject, /^\[PDDJF Brief\] [a-f0-9]{8} · TradingView webhook automation$/);
assert.match(sentEmails[0].text, /Prevent duplicate orders and preserve an audit trail\./);

const invalidNativeResponse = await workerModule.default.fetch(new Request("https://pddjf.com/api/brief", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://pddjf.com",
    "CF-Connecting-IP": "192.0.2.12"
  },
  body: new URLSearchParams({ lang: "zh-CN", projectType: "Risk dashboard" })
}), env);

assert.equal(invalidNativeResponse.status, 400);
assert.match(invalidNativeResponse.headers.get("content-type") || "", /^text\/html/);
const invalidNativeHtml = await invalidNativeResponse.text();
assert.match(invalidNativeHtml, /项目 Brief 未提交/);
assert.doesNotMatch(invalidNativeHtml, /AW-975458180\/nb0cCNOI5-sYEISfkdED/);

const failureKv = mockKv();
const failureResponse = await workerModule.default.fetch(new Request("https://pddjf.com/api/brief", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Origin": "https://pddjf.com",
    "CF-Connecting-IP": "192.0.2.13"
  },
  body: JSON.stringify({
    site: "pddjf",
    qualification: "structured_brief_v1",
    fields: {
      projectType: "Risk dashboard",
      contactMethod: "WeChat test-only",
      riskBoundary: "Verify that a temporary notification outage does not reject the stored brief."
    }
  })
}), {
  BRIEF_SUBMISSIONS: failureKv,
  BRIEF_NOTIFIER: {
    async fetch() {
      return Response.json({ ok: false, code: "E_TEMPORARY", error: "temporary email outage" }, { status: 503 });
    }
  }
});

assert.equal(failureResponse.status, 201);
assert.equal((await failureResponse.json()).ok, true);
const failureRecord = [...failureKv.values.entries()]
  .filter(([key]) => key.startsWith("brief:pddjf:"))
  .map(([, value]) => JSON.parse(value))[0];
assert.equal(failureRecord.notification.status, "failed");
assert.equal(failureRecord.notification.code, "E_TEMPORARY");

console.log("PDDJF brief worker tests passed");
