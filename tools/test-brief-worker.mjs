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
const env = { BRIEF_SUBMISSIONS: kv };

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
assert.match(await nativeResponse.text(), /Project brief received/);

const records = [...kv.values.entries()]
  .filter(([key]) => key.startsWith("brief:pddjf:"))
  .map(([, value]) => JSON.parse(value));
assert.equal(records.length, 2);
assert.equal(records.some((record) => record.qualification === "native_form"), true);

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
assert.match(await invalidNativeResponse.text(), /项目 Brief 未提交/);

console.log("PDDJF brief worker tests passed");
