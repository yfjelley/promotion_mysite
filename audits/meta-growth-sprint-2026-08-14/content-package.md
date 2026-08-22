# SignalCraft Labs Instagram growth sprint — 2026-08-14 to 2026-08-20

Scope: three English-language Instagram posts, spaced across seven days. Organic only; no Boost, paid campaign, bought followers, DMs or return claims.

## Post A — Anonymous case: state mismatch

Format: five-image carousel (`case-01-cover.png` through `case-05-evidence-cta.png`).

Caption:

> An internal order state said CANCELLED. The broker account still showed the order as OPEN.
>
> That mismatch changed the safe response. A timeout or missing execution report was treated as UNKNOWN—not as permission to send the instruction again.
>
> The recovery path was:
> 1. pause new routing
> 2. preserve event, client-order and broker-order identifiers
> 3. fetch open orders, recent fills and positions
> 4. resolve the state or keep the exception assigned to a human owner
> 5. replay-test restart behavior and prove that no second order is submitted
>
> This anonymous engineering case describes controls and acceptance evidence only. It does not disclose a client, strategy or trading result.
>
> Case notes: https://pddjf.com/case-studies/
>
> Follow for practical broker API, execution and reconciliation engineering.
>
> #BrokerAPI #OrderReconciliation #FintechEngineering #TradingInfrastructure #OperationalRisk

## Post B — 30-second Reel: duplicate-order paths

Format: 30-second vertical H.264 video (`broker-api-duplicate-orders-30s.mp4`).

Caption:

> One signal should create one order—not two.
>
> Three duplicate paths in broker API systems:
> 1. A client retries after a timeout even though the broker accepted the first request.
> 2. Two consumers process the same event.
> 3. A restart replays an intent before orders, fills and positions are reconciled.
>
> Useful controls include a stable event_id, deterministic idempotency keys, a stable client order ID, bounded retry rules, decision logs and reconciliation before new routing.
>
> Engineering note: https://pddjf.com/articles/how-we-prevent-duplicate-tradingview-webhook-orders/
>
> No signals, custody or return promises.
>
> Follow for practical broker API, execution and reconciliation engineering.
>
> #BrokerAPI #OrderExecution #Idempotency #FintechEngineering #TradingInfrastructure

## Post C — Broker API pre-launch checklist

Format: six-image carousel (`checklist-01-cover.png` through `checklist-06-cta.png`).

Caption:

> A successful paper order is not a production launch gate.
>
> Before a broker API integration goes live, verify four control layers:
>
> 1. Identity and retries — stable event IDs, deterministic idempotency and a retry matrix that distinguishes timeout from rejection.
> 2. Order lifecycle — accepted, partial-fill, cancel, reject and terminal reconciliation paths remain observable.
> 3. Executable risk — per-order and position limits, price-deviation guards, rate limits, reduce-only behavior and a manual pause.
> 4. Recovery — after a stream gap or restart, reconcile orders, fills and positions before routing anything new.
>
> Acceptance should replay duplicates, API timeouts, partial fills, cancels, rejects, stream gaps and restarts.
>
> Checklist: https://pddjf.com/articles/broker-api-order-reconciliation-checklist/
>
> Follow for practical broker API, execution and reconciliation engineering.
>
> #BrokerIntegration #APIEngineering #OrderLifecycle #RiskControls #FintechInfrastructure

## Recommended sequence

To enable the requested three-post profile pin set without publishing all three at once:

1. Publish Post A first; pin it as the anonymous case.
2. Schedule Post B for the middle of the seven-day window.
3. Schedule Post C for the end of the seven-day window.
4. Keep the existing SignalCraft Labs introduction post as “who we are” and the existing duplicate-order prevention post as “the problem.”

All three new posts end with exactly one follow reason:

> Follow for practical broker API, execution and reconciliation engineering.
