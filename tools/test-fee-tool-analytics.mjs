import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const script = readFileSync(new URL("../public/scripts.js", import.meta.url), "utf8");

assert.match(script, /let hasTrackedFirstUse = false;/);
assert.match(script, /if \(hasTrackedFirstUse\) return;\s*hasTrackedFirstUse = true;\s*gtag\("event", "fee_tool_first_use"/s);
assert.match(script, /form\.addEventListener\("input", handleFeeControl\);/);
assert.match(script, /form\.addEventListener\("change", handleFeeControl\);/);
assert.match(script, /gtag\("event", "fee_tool_exchange_select", \{\s*event_category: "engagement",\s*exchange: ladderSelect\.value/s);
assert.match(script, /\.fee-source-grid a\[href\^="http"\]/);
assert.match(script, /gtag\("event", "fee_tool_source_click", \{\s*event_category: "engagement",\s*source_host: new URL\(link\.href\)\.hostname/s);

for (const eventName of ["fee_tool_first_use", "fee_tool_exchange_select", "fee_tool_source_click"]) {
  const eventBlock = script.slice(script.indexOf(`gtag("event", "${eventName}"`), script.indexOf(`gtag("event", "${eventName}"`) + 300);
  assert.doesNotMatch(eventBlock, /reportAdsLead|"conversion"/, `${eventName} must remain an engagement event, not an Ads conversion`);
}

console.log("Fee tool analytics contract ok: first use, exchange selection and source clicks stay engagement-only");
