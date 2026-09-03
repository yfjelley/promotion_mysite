# Outreach drafts — September 2026

Ready-to-use copy for the backlink targets in `organic-growth-plan-2026-09.md`. Each item names the account that must post it and the rule to respect. Do not post the same text twice; adapt the first line to the thread.

## 1. Reddit r/algotrading — resource post (calculator + VIP explainer)

Account: the owner's Reddit account. Rule: read the subreddit's self-promotion rule first and contribute answers for a week before posting.

Title: I built a source-bounded futures fee calculator for Binance/OKX/Bybit/Bitget/MEXC/Gate and wrote up how VIP tiers actually get assigned

Body:

> I got tired of fee tables that hide the footnotes, so I modeled the public USDT perpetual ladders for six exchanges with the conditions that change your tier: trailing 30-day volume, asset floors, and the API-share rules some venues use to route bots into a separate track.
>
> Calculator (no wallet, no login, runs in the browser): https://pddjf.com/tools/crypto-exchange-fee-calculator/
> How tiers are assigned and why your maker/taker mix matters more than the tier label: https://pddjf.com/articles/crypto-exchange-vip-fee-tiers-explained/
>
> Two honest limits: Binance, MEXC and Gate did not expose complete ladders to a logged-out visitor when I checked, so they are modeled at base rate only, and the page says so instead of backfilling from third-party tables. Funding, slippage and promos are excluded.
>
> Happy to add exchanges if someone can point me at an official ladder page that is public.

## 2. Hacker News — Show HN

Account: the owner's HN account. Post once, mid-week morning US time, and stay in the thread for two hours to answer.

Title: Show HN: Source-bounded crypto futures fee calculator (six exchanges, public ladders only)

Text:

> Static page, no backend, no wallet. It models USDT perpetual maker/taker cost across volume scenarios using only fee schedules that are visible on the exchanges' public pages, and it separates "complete ladder" from "base rate only" instead of guessing. Data file and methodology are in the page source. Feedback on the methodology is more useful to me than feature requests.
>
> https://pddjf.com/tools/crypto-exchange-fee-calculator/

## 3. Quant StackExchange / Stack Overflow / IBKR & Alpaca forums — answer pattern

Account: the owner's accounts. Rule: answer the question fully in the post; link a runbook only when it adds something the answer does not already say. Never link-only.

Template:

> [Direct answer to the question in 3–6 sentences, with the specific API behavior.]
>
> The part people miss is what happens after a disconnect or restart: you have to pull open orders, fills and positions and compare them with local state before routing again, otherwise a retry creates a second position. I wrote the reconciliation steps up here if it helps: [link to the matching pddjf.com article].

Best matching articles:

- IBKR session questions → https://pddjf.com/articles/ibkr-tws-gateway-vs-client-portal-automated-trading/
- Schwab OAuth questions → https://pddjf.com/articles/schwab-api-token-refresh-runbook/
- Alpaca vs IBKR choice → https://pddjf.com/articles/alpaca-vs-ibkr-api-automated-trading/
- Duplicate orders from TradingView → https://pddjf.com/articles/tradingview-webhook-duplicate-orders/
- OKX/Bybit bot setup → https://pddjf.com/articles/okx-vs-bybit-api-automated-trading-checklist/

## 4. Clutch / GoodFirms / DesignRush — company profile

Account: a company profile created by the owner (these directories require a business email, address and a verified contact). Fill the same text on each.

- Company name: SignalCraft Labs
- Tagline: Custom trading software development for teams that already have a strategy
- Description (≤ 600 chars):

> SignalCraft Labs builds custom trading platforms and execution systems for teams that already have trading rules, signals or scripts. We deliver TradingView webhook automation, broker and exchange API routing (IBKR, Schwab, Alpaca, Binance, OKX, Bybit, Hyperliquid), risk engines, order-state reconciliation and multi-account monitoring, with source code, runbooks and private deployment. We do not provide investment advice, signals or managed accounts.

- Services: Custom Software Development; Fintech Software Development; API Integration; Trading Platform Development
- Minimum project size: USD 5,000 (adjust to the current service page)
- Website: https://pddjf.com/ · Case notes: https://pddjf.com/case-studies/ · Contact: contact@pddjf.com

## 5. TradingView profile

Account: the owner's TradingView account.

Bio: Execution engineering for teams with existing TradingView strategies: webhook automation, broker/exchange API routing, risk controls, reconciliation. Not investment advice. https://pddjf.com/tradingview-webhook-developer/

## 6. Newsletter and blog pitch (email)

Send from contact@pddjf.com to fintech/quant newsletters that publish reader submissions.

Subject: A source-bounded look at exchange VIP fee tiers (no affiliate links)

> Hi [name], I run a small trading-systems engineering shop and wrote two pieces your readers might use: an explainer on how exchange VIP tiers are actually assigned (volume windows, asset floors, API-share rules) and an OKX vs Bybit API checklist for bots. Both cite official pages only and carry no affiliate links. If either fits a links roundup, here they are:
> https://pddjf.com/articles/crypto-exchange-vip-fee-tiers-explained/
> https://pddjf.com/articles/okx-vs-bybit-api-automated-trading-checklist/
> Thanks for reading — [name]

## 7. LinkedIn article summaries (canonical link at the end)

Post 1 — "The order state machine comes first" (300 words summarising https://pddjf.com/articles/custom-trading-engine-development-order-state-machine/). Close with: Full write-up with the acceptance checklist: [link].

Post 2 — "Alpaca vs IBKR: choose by operating model" (300 words summarising https://pddjf.com/articles/alpaca-vs-ibkr-api-automated-trading/).

## 8. GitHub awesome-list pull requests

Repo to submit: https://github.com/yfjelley/signalcraft-labs-engineering-notes (runnable demos: TradingView webhook dedupe and risk gate, IBKR session refresher, Hyperliquid order reconciliation, broker order reconciliation).

PR line: `- [signalcraft-labs-engineering-notes](https://github.com/yfjelley/signalcraft-labs-engineering-notes) - Dependency-free demos for webhook deduplication, broker session handling and order reconciliation in automated trading systems.`

Targets: awesome-quant, awesome-algorithmic-trading, awesome-crypto-trading-bots (check each list's contribution rules; one PR per list).

## Log

| Date | Target | Status | URL |
|---|---|---|---|
| 2026-09-03 | GitHub demo repo updated with broker reconciliation demo and article links | done | https://github.com/yfjelley/signalcraft-labs-engineering-notes |
