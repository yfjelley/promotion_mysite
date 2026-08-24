import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const source = readFileSync(join(root, "workers", "brief-notifier", "src", "index.js"), "utf8");
const notifier = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

const sent = [];
const env = {
  EMAIL: {
    async send(message) {
      sent.push(message);
      return { messageId: "notifier-test-message" };
    }
  }
};

const validResponse = await notifier.default.fetch(new Request("https://brief-notifier.internal/notify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: "yfjelley@gmail.com",
    from: { email: "brief@pddjf.com", name: "SignalCraft Labs Briefs" },
    replyTo: "buyer@example.com",
    subject: "[PDDJF Brief] 12345678 · Broker API integration",
    text: "Test notification"
  })
}), env);

assert.equal(validResponse.status, 200);
assert.deepEqual(await validResponse.json(), { ok: true, messageId: "notifier-test-message" });
assert.equal(sent.length, 1);
assert.equal(sent[0].replyTo, "buyer@example.com");

const invalidDestination = await notifier.default.fetch(new Request("https://brief-notifier.internal/notify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: "other@example.com",
    from: { email: "brief@pddjf.com" },
    subject: "Unexpected destination",
    text: "This must not be sent."
  })
}), env);

assert.equal(invalidDestination.status, 400);
assert.equal(sent.length, 1);

console.log("PDDJF brief notifier tests passed");
