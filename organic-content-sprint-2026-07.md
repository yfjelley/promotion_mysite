# Organic Content Sprint - PDDJF / SignalCraft Labs

## Publishing cadence

- Sprint window: 4 weeks from 2026-07-07.
- Cadence: 3 high-intent articles per week.
- Publishing days: Monday, Wednesday, Friday.
- Review checkpoint: every Friday after Search Console and GA4 readback.
- Expansion rule: continue only when new pages earn impressions, qualified clicks, or brief/contact events.

## Scoring rule

Publish only topics scoring 75 or higher.

| Factor | Points | Requirement |
| --- | ---: | --- |
| Commercial intent | 30 | Query implies implementation, hiring, checklist, API setup, handover, or production support. |
| Site fit | 20 | Fits trading automation engineering, API execution, risk logs, or private deployment. |
| Delivery proof | 20 | Can include real inputs, deliverables, acceptance checks, failure paths, and runbook notes. |
| Search opportunity | 20 | Maps to Search Console, Ads query, Keyword Planner, or a clear long-tail API/platform need. |
| Risk control | 10 | Avoids investment advice, return claims, custody framing, and thin duplicated content. |

## Week 1 published

| Day | URL | Target intent | Score | CTA |
| --- | --- | --- | ---: | --- |
| Mon | `/articles/tradingview-webhook-to-ibkr-order-workflow/` | TradingView webhook to IBKR order automation | 88 | Submit project brief |
| Wed | `/articles/binance-api-trading-bot-risk-checklist/` | Binance API trading bot risk and key checklist | 84 | Submit project brief |
| Fri | `/articles/broker-api-order-reconciliation-checklist/` | Broker API order/fill reconciliation checklist | 86 | Submit project brief |

## Week 2 published

| Day | URL | Target intent | Score | CTA |
| --- | --- | --- | ---: | --- |
| Mon | `/articles/alpaca-order-status-reconciliation/` | Alpaca API order status logs and replay | 82 | Submit project brief |
| Wed | `/articles/schwab-api-token-refresh-runbook/` | Schwab Trader API OAuth token operations | 81 | Submit project brief |
| Fri | `/articles/fix-api-certificate-network-allowlist-checklist/` | FIX API onboarding and UAT readiness | 83 | Submit project brief |

## Remaining queue

| Week | Topic | Target intent | Score |
| --- | --- | --- | ---: |
| 3 | TradingView webhook secret rotation checklist | Webhook security and handover | 80 |
| 3 | Exchange API rate limit and retry design | Crypto exchange API retry safety | 81 |
| 3 | Portfolio rebalancing order plan with human approval | Broker API order preview and approval | 79 |
| 4 | Trading bot monitoring and alerting runbook | Private deployment operations | 82 |
| 4 | Broker API paper trading acceptance checklist | Paper-to-live broker API validation | 80 |
| 4 | Automated trading audit log export checklist | Logs, exports, and customer handover | 81 |

## Weekly review

- Search Console: impressions, queries, URL coverage, average position.
- GA4: Organic Search sessions by landing page.
- Conversion events: `contact_click` and `structured_brief_submit`.
- Cloudflare: 200 status for Googlebot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, and PerplexityBot.

## Stop or adjust conditions

- New articles stay unindexed or earn no impressions after 3-4 weeks.
- Topics become duplicated with only platform names changed.
- Pages attract irrelevant traffic or policy-risk queries.
- Brief/contact events do not improve after the first 12-18 pages.

## Review log - 2026-07-14

- Search Console coverage snapshot (report updated 2026-06-30): 4 indexed and 21 not indexed.
- Not indexed split: 17 discovered but not indexed; 4 crawled but not indexed. The latter includes `/broker/api/` plus three legacy HTTP/www host variants that redirect to the canonical HTTPS host.
- Week 2 pages passed live URL tests and were added to Google's priority crawl queue on 2026-07-14.
- Added three contextual implementation links to each Week 2 page and deployed commit `8bd199c`.
- Hold the Week 3 queue until the next review on 2026-07-17. Do not expand unless indexing, impressions, qualified clicks, or brief/contact evidence supports continuing.

## Review and measurement closure - 2026-07-17

- Search Console's three-month performance snapshot shows 123 impressions, 0 clicks, and an average position of 16.8. `/tradingview-webhook-automation/` is the only clear CTR candidate, with 42 impressions and an average position of 7.9; the homepage and lower-ranking IBKR pages were left unchanged.
- Rewrote only the TradingView Webhook Automation title and description around implementation intent, duplicate-order protection, risk controls, source delivery, and private deployment. Deployed commit `2fc3790`, verified the production title, description, scripts, bot responses, and sitemap, then received Search Console's priority crawl queue confirmation for the updated indexed URL.
- Added engagement-only fee-tool events: `fee_tool_first_use`, `fee_tool_exchange_select`, and `fee_tool_source_click`. These do not count as leads and preserve the existing contact/conversion boundary.
- Keep Week 3 on hold. Recheck qualified clicks, contact activity, and the new fee-tool engagement signals before publishing more URLs.
