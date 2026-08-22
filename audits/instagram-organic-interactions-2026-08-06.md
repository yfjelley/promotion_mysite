# Instagram organic interaction audit — 2026-08-06

Account: `@quant.yang` (SignalCraft Labs | API Systems)

Readback time: 2026-08-06 10:56 CST

## Guardrails

- Checked the prior-day ledger and confirmed this file did not already exist before starting.
- Scope was limited to brokers, market infrastructure, fintech, and quantitative-development accounts.
- Read each selected account's public profile and recent post before interacting.
- No DMs, sales links, copied comments, bulk tags, or promotional replies were used.
- Daily limits were respected: 3 new follows and 2 tailored English comments.
- No prior-day post was reused and no post received a duplicate interaction today.
- No CAPTCHA, password prompt, identity check, login anomaly, rate limit, `Try again later`, or account restriction appeared.

## Completed interactions

| # | Account | Public-profile relevance | Post read and liked | Follow action | Comment | Readback evidence |
|---|---|---|---|---|---|---|
| 1 | `@newyorkfed` | Central-bank research and labor-market analysis | [AI effects on hiring behavior](https://www.instagram.com/newyorkfed/p/DbqngPhlYIn/) | Already following; no change | Published; exact text below | Post showed `Unlike`; exact comment text was visible |
| 2 | `@interactivebrokers` | Broker and portfolio-integration infrastructure | [IBKR connectivity to AI tools via MCP](https://www.instagram.com/interactivebrokers/p/DbqdeDaHZLO/) | Already following; no change | Published; exact text below | Post showed `Unlike`; exact comment text was visible |
| 3 | `@fintechinsider` | Fintech industry analysis | [Wise charter, Western Union digital bank, and Pix/BNPL](https://www.instagram.com/fintechinsider/reel/DbknkAUiIe5/) | Already following; no change | — | Post showed `Unlike` |
| 4 | `@nyse` | Exchange and listed-company market infrastructure | [Blend digital-banking infrastructure](https://www.instagram.com/nyse/p/DbrBy8jiV0L/) | Already following; no change | — | Post showed `Unlike` |
| 5 | `@blendlabs` | Digital banking and loan-origination infrastructure | [Automated underwriting review and document verification](https://www.instagram.com/blendlabs/reel/Dbbf1yalOCH/) | New follow | — | Profile showed `Following`; post showed `Unlike` |
| 6 | `@adyen` | Payment infrastructure and fintech | [Merchant partnership and fintech account management](https://www.instagram.com/adyen/reel/DavBHKHSEUo/) | Already following; no change | — | Post showed `Unlike` |
| 7 | `@coinbase` | Exchange, derivatives, prediction-market, and agentic-finance infrastructure | [Q2 Everything Exchange product update](https://www.instagram.com/coinbase/p/DbbihHDFKGx/) | New follow | — | Profile showed `Following`; post showed `Unlike` |
| 8 | `@cboeglobalmarkets` | Derivatives and securities exchange network | [Cloud-delivered implied volatility and options Greeks](https://www.instagram.com/cboeglobalmarkets/p/DbqkocLm3xu/) | New follow | — | Profile showed `Following`; post showed `Unlike` |
| 9 | `@robinhoodapp` | Brokerage and investment-product infrastructure | [Early-stage versus public-company investing](https://www.instagram.com/robinhoodapp/reel/DbqN8XGH_wS/) | Not followed; daily limit already reached | — | Post showed `Unlike` |
| 10 | `@tradestation` | Brokerage and advanced trading technology | [Current derivatives landscape at CME Group](https://www.instagram.com/tradestation/p/DbnulheEh2v/) | Not followed; daily limit already reached | — | Post showed `Unlike` |

All ten selected posts showed the post-level `Unlike` state after interaction.

## Published comments

On `@newyorkfed`:

> The hiring-behavior angle is especially useful: measuring where AI changes screening, task design, and vacancy creation can separate workflow adoption from real labor-demand shifts.

On `@interactivebrokers`:

> MCP account connectivity becomes much more useful when permissions are explicit, read-only by default, and every portfolio action is auditable.

Both exact comment strings were visible in the public post DOM after submission. No further comments were attempted after the daily limit of two was reached.

## Account readback

- Posts: 6
- Followers: 0
- Following: 77
- Profile category: Software company
- Bio remained focused on exchange/API engineering, reconciliation, risk controls, monitoring, and private deployment.
- The following count increased from the prior audit's 74 to 77, matching the three verified new follows.

## Skipped candidates

- `@quantconnect`: its only recent post matched the exact post interacted with on 2026-08-05; skipped to prevent duplication.
- `@tradingview`: the only current non-pinned post matched the exact 2026-08-05 interaction; older visible posts were from 2023–2024.
- `@nasdaq`: the current visible posts were about combat sports, football, and fencing rather than exchange or market infrastructure.
- `@cmegroup`: the current visible posts were White Sox sponsorship content; the next inspected post was also an old sports partnership.
- `@krakenfx`: the current visible post was lifestyle/brand creative rather than exchange or trading infrastructure.
- `@alpaca.markets`: Instagram search resolved to a stale 2017 social-trading game account, not the current brokerage API company; no action was taken.

## Operational notes and stop condition

- On posts with comment-level `Like` buttons, the main post control was identified from the fresh DOM order and only the final post-level control was clicked. An initial ambiguous selector check on the IBKR page stopped before any click; the action was resumed only after the DOM showed the main post control unambiguously.
- Blend's follow button read back as `Following` with a dropdown icon rather than the shorter exact label; the full visible state was checked before counting the follow.
- No Instagram safety or account-status anomaly occurred.
- Work stopped after 10 distinct relevant accounts, 10 verified likes, 3 verified new follows, and 2 verified comments were completed.

## Totals

- Distinct accounts completed: **10**
- Likes completed and verified: **10**
- New follows completed and verified: **3**
- Tailored comments completed and verified: **2**
- DMs sent: **0**
- Platform/security anomalies: **0**
