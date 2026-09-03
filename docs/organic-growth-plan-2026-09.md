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

## Topic queue (next 20, in priority order)

1. IBKR API order status reconciliation after disconnect (ibkr api order status)
2. IB Gateway auto-restart and daily reauthentication runbook (ib gateway restart)
3. Schwab Trader API rate limits and order placement checklist (schwab api trading)
4. Alpaca streaming reconnect and missed trade update recovery
5. Binance futures API position mode and reduce-only mistakes
6. OKX API client order ID rules and partial fill reporting
7. Bybit unified account API: position and margin mode checks for bots
8. Hyperliquid API wallet permissions and subaccount routing checklist
9. TradingView alert JSON payload template with versioning (tradingview webhook json)
10. TradingView webhook to OKX futures order workflow
11. TradingView webhook to Bybit order workflow
12. FIX 4.4 session logon, heartbeat and sequence reset runbook
13. Trading bot VPS deployment: Docker, secrets and log rotation
14. How to read exchange fee tiers when most volume is API-driven
15. Binance vs Bybit API for automated trading checklist
16. Broker API paper trading vs live: what paper does not simulate
17. Multi-account trading monitoring: reconciliation cadence and alerts
18. Trading system incident review template
19. Crypto exchange API key rotation runbook
20. Custom trading platform development cost: what drives the quote

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
