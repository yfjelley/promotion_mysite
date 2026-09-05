# pddjf.com organic growth plan — September 2026

Baseline from Search Console, 2026-06-01 to 2026-08-31: 8 clicks, 2,420 impressions, 0.3% CTR, average position 33.4, 29 indexed pages, 7 external links (all from our own GitHub). Impressions are concentrated on the English `custom trading software development` cluster (988 impressions on the service page, zero clicks at position ~30) and on the fee calculator and compare pages (~800 impressions). The only clicks came from two practitioner articles (IBKR TWS vs Client Portal, Schwab token refresh runbook). Demand is English-first: US 1,199 impressions, China 43.

## Operating rules

- English articles are the product. Chinese pages stay for paid traffic and referrals; do not invest in Google zh-CN organic.
- Every article targets one concrete practitioner problem from the query list below, cites official documentation, and ends with a Brief CTA.
- Cadence: 2 articles per week, reviewed against Search Console every Monday.
- Never write venue-specific numbers (rate limits, fee percentages) from memory; link the official page and describe how to verify.

## Published 2026-09-03 (batch 1)

- /articles/custom-trading-platform-development-scope-checklist/ — queries: custom trading platform development company / services
- /articles/custom-trading-engine-development-order-state-machine/ — query: custom trading engine development
- /articles/okx-vs-bybit-api-automated-trading-checklist/ — query: okx vs bybit
- /articles/crypto-exchange-vip-fee-tiers-explained/ — queries: vip fees, exchange fee tiers
- /articles/alpaca-vs-ibkr-api-automated-trading/ — broker comparison long tail
- /articles/tradingview-webhook-to-binance-futures-order-workflow/ — tradingview webhook binance futures

## Published 2026-09-03 (batch 2, IBKR cluster)

The IBKR queries already sit at positions 11-20, the closest cluster to page one. These four articles interlink with each other and with the existing IBKR pages so the cluster has internal depth rather than four isolated pages.

- /articles/ibkr-api-order-status-reconciliation-after-disconnect/ — query: ibkr api order status
- /articles/ib-gateway-auto-restart-daily-reauthentication-runbook/ — query: ib gateway restart
- /articles/ibkr-api-pacing-violations-market-data-limits/ — queries: ibkr pacing violation, market data lines
- /articles/ibkr-paper-trading-vs-live-account-api-differences/ — query: ibkr paper trading vs live

## Internal linking (2026-09-03)

The 30 comparison pages and both calculators had no path from the homepage; only the sitemap and the calculator page linked them. Fixed by adding a comparison hub and linking it from the highest-authority pages.

- New hub: /compare/ and /zh/compare/, listing every comparison for that language plus both calculators, with ItemList structured data.
- Homepage: new "公开费率工具与交易所手续费对比" section linking the hub, both calculators and three comparisons, plus two footer entries.
- Sitewide footer on generated pages: hub added to both the Chinese and English footer link sets.
- Header nav left unchanged; it is a non-wrapping flex row and a ninth item would overflow on desktop.

## Indexing status (2026-09-03)

Sitemap resubmitted and re-read the same day; Google now reports 109 discovered URLs, up from 73. Manual indexing requests hit the daily quota after /compare/ on 2026-09-03. The quota is a rolling window, not a Pacific-midnight reset: still exhausted at 01:18 PDT on 2026-09-04, free again by about 20:00 CST that evening.

Requested on 2026-09-04: /zh/compare/ (already "discovered, not yet indexed" via the sitemap and the /compare/ link, so the new hub links work) and /articles/ibkr-api-order-status-reconciliation-after-disconnect/. Still not requested, in the sitemap and pushed to IndexNow, will be crawled without a request:

- https://pddjf.com/articles/ib-gateway-auto-restart-daily-reauthentication-runbook/
- https://pddjf.com/articles/ibkr-api-pacing-violations-market-data-limits/
- https://pddjf.com/articles/ibkr-paper-trading-vs-live-account-api-differences/

IndexNow (2026-09-04): key file hosted on both sites; all 109 pddjf URLs and 57 icojf URLs pushed, both 202 Accepted. Covers Bing, Yandex, Naver and the engines that read Bing's index (DuckDuckGo, Copilot, ChatGPT search).

## Fee data expansion and linkable assets (2026-09-05)

- Added Kraken (17 futures tiers), KuCoin (VIP 0-12) and HTX (Prime 0-11) to `tools/exchange-fee-data.mjs`, each read from the official fee page on 2026-09-05 with the checked date recorded. XT was skipped: its site refuses the current region, so the schedule could not be verified. The calculator now lists nine venues.
- Generic comparison pages now cover each new exchange against Binance, OKX and Bybit, plus Kraken vs KuCoin: ten new pairs, twenty pages, 25 comparisons in total. Pairs among the minor venues are deliberately not generated to avoid thin pages.
- New linkable asset: /exchange-fee-changes/ and /zh/exchange-fee-changes/, a dated log of additions, changes and re-verifications with an official source per entry, plus /exchange-fee-changes/feed.xml (RSS). Add an entry whenever a schedule is added, changed or re-checked; the data lives in the `changelog` array of the fee data file. Monthly cadence: re-verify the nine schedules, log the result, push the sitemap to IndexNow.
- Articles carry a byline (Feng Yang, LinkedIn and GitHub links) and a Person author in the TechArticle schema.
- Sitemap is 131 URLs; all pushed to IndexNow on 2026-09-05 (202 Accepted). Google manual indexing not requested for these; the sitemap and hub links will surface them.

## Topic queue (next 18, in priority order)

1. Schwab Trader API rate limits and order placement checklist (schwab api trading)
2. Alpaca streaming reconnect and missed trade update recovery
3. Binance futures API position mode and reduce-only mistakes
4. OKX API client order ID rules and partial fill reporting
5. Bybit unified account API: position and margin mode checks for bots
6. Hyperliquid API wallet permissions and subaccount routing checklist
7. TradingView alert JSON payload template with versioning (tradingview webhook json)
8. TradingView webhook to OKX futures order workflow
9. TradingView webhook to Bybit order workflow
10. FIX 4.4 session logon, heartbeat and sequence reset runbook
11. Trading bot VPS deployment: Docker, secrets and log rotation
12. How to read exchange fee tiers when most volume is API-driven
13. Binance vs Bybit API for automated trading checklist
14. Broker API paper trading vs live: what paper does not simulate
15. Multi-account trading monitoring: reconciliation cadence and alerts
16. Trading system incident review template
17. Crypto exchange API key rotation runbook
18. Custom trading platform development cost: what drives the quote

## Compare and tool expansion

The three compare pages and the fee calculator earn impressions with no writing. Next step is a generic pair renderer in `tools/generate-seo-geo-pages.mjs` so the remaining exchange pairs (Bitget, MEXC, Gate combinations, 12 pairs, EN + zh) can be generated from `exchange-fee-data.mjs`. Keep the source-bounded language of the existing pages.

## Backlink targets (goal: 30 external links in 90 days)

| Target | What to submit | Notes |
|---|---|---|
| GitHub: open-source a TradingView webhook receiver template | Repo README links to /tradingview-webhook-developer/ and the duplicate-orders article | Submit to awesome-algorithmic-trading style lists |
| GitHub: open-source a broker order reconciliation script (IBKR/Alpaca) | README links to the reconciliation checklist article | |
| Reddit r/algotrading | Post the fee calculator and the VIP tier explainer as a resource; answer questions with the runbooks | Follow subreddit self-promotion rules; contribute first |
| Hacker News (Show HN) | Fee calculator | One shot; time it with a data refresh |
| Quant StackExchange / Stack Overflow | Answer IBKR, Alpaca, Binance API questions; link the specific runbook when it answers the question | No link-only answers |
| IBKR and Alpaca community forums | Same as above | |
| Clutch, GoodFirms, DesignRush | Company profile for "custom trading software development" | These directories rank for the head terms we cannot rank for yet |
| TradingView profile and published scripts | Profile link to pddjf.com | |
| Fintech and quant newsletters | Pitch the VIP tier explainer and the OKX vs Bybit API checklist | |
| LinkedIn articles | Republish summaries with canonical link | |

## Weekly review checklist

- Search Console: indexed count, new queries at positions 8–20, pages with impressions and zero clicks.
- Promote any article that reaches position 8–20: refresh title, add internal links from the service page, request indexing.
- Log new backlinks and directory listings in this file.
- Stop or rewrite any article with zero impressions after 8 weeks.
