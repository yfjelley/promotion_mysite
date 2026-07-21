# SignalCraft Labs landing page

Public website and entity reference assets for SignalCraft Labs:

- Brand: SignalCraft Labs
- Website: https://pddjf.com/
- Contact: contact@pddjf.com
- Service boundary: technical software development only; no investment advice,
  no signals, no managed accounts, no custody, no withdrawal permissions, and no
  profit promises.

Static Google Ads landing page for Cloudflare Pages. No VPS is required for the
current site because the production artifact is static HTML, CSS, and JS.

This repository now serves only `https://pddjf.com/`, the SignalCraft Labs
execution-engineering site for customers who already have trading rules,
signals, or scripts and need TradingView Webhook, broker/exchange API, risk
control, and private deployment work. The
independent ICOJF software product studio site lives in
`/Users/yfjelley/workspace/icojf_site` and deploys to the separate Cloudflare
Pages project `icojf-site`.

The primary conversion pages are:

- `/` for the existing-strategy execution-engineering offer.
- `/broker/api` for the broker API automation ad group.

SEO and GEO content pages:

- `/custom-trading-software-development/` for category-level English custom trading software search and Ads intent.
- `/fintech-software-development/` for high-intent English fintech and financial software development search and Ads intent.
- `/tradingview-webhook-automation/` for TradingView Webhook automation.
- `/exchange-api-trading-bot-development/` for exchange API automation.
- `/broker-api/ibkr/`, `/broker-api/schwab/`, and `/broker-api/alpaca/` for platform-specific broker API pages.
- `/fix-api-order-routing/` for FIX API execution workflows.
- `/tradingview-webhook-developer/`, `/ibkr-api-automation-developer/`, and
  `/fix-api-order-routing-developer/` for high-intent English search and Ads
  landing pages.
- `/risk-engine/` for pre-trade risk controls.
- `/trading-system-consistency-audit/` and `/trading-system-consistency-audit-service/` for the seven-day read-only audit offer in Chinese and English.
- `/trading-system-incident-diagnosis/` and `/trading-system-incident-diagnosis-service/` for evidence-backed production incident diagnosis.
- `/multi-account-trading-monitoring/` and `/multi-account-trading-monitoring-service/` for audit-first reconciliation and ongoing monitoring.
- `/private-deployment/` for private deployment, source delivery, and operational handoff.
- `/articles/` and `/articles/.../` for problem-focused technical articles and official/API reference links, including English strategy automation, IBKR execution, FIX routing, risk checklist, and failure-mode pages.
- `/faq/` for answer-style FAQ content.
- `/case-studies/` for anonymous engineering case studies.
- `/about/` and `/contact/` for entity trust and independent contact pages.

Trust and policy pages:

- `/terms` for service terms.
- `/risk-disclaimer/` for investment risk and non-advisory boundaries.
- `/disclaimer` for investment and platform disclaimers.
- `/delivery-policy` for delivery, refund, and scope boundaries.
- `/privacy` for privacy policy.

AI-search support:

- `/llms.txt` summarizes the brand, service URLs, exclusions, pricing ranges, and contact paths for AI search/agent readers.
- `robots.txt` keeps site-specific allow rules for search-answer/user-triggered AI crawlers.
- External trust links are kept consistent across `llms.txt`, JSON-LD `sameAs`, `/about/`, service pages, and the public GitHub engineering notes repo at `https://github.com/yfjelley/signalcraft-labs-engineering-notes`.
- `docs/external-entity/` contains the canonical external profile, GitHub
  profile copy, LinkedIn copy, and technical blog draft used to keep public
  entity references consistent across platforms.

This repo's `public/robots.txt` is the source of truth for the site-specific
robots policy: search and user-triggered AI retrieval are allowed, AI training
is not, and training-oriented crawlers are explicitly disallowed. If
Cloudflare Managed Robots.txt remains enabled, Cloudflare may prepend its
managed Content-Signal block in production; keep the dashboard setting aligned
with the same policy.

## Generate and validate content

The SEO/GEO service pages, `sitemap.xml`, and `llms.txt` are generated from a
single data file:

```bash
node tools/generate-seo-geo-pages.mjs
node tools/validate-seo-geo.mjs
```

Run both commands after changing page slugs, service copy, delivery packages,
structured data, robots policy, or contact details. The validator checks pddjf
canonical URLs, JSON-LD parsing, sitemap file coverage, internal links,
`robots.txt`, `llms.txt`, and risky positioning terms.

### New service-page buyer-intent contract

New service pages must be written for prospective buyers before technical peers.
Each new entry in `servicePages` must declare `buyerIntentVersion: 1` and include:

- `buyerAudience`: the precise target customer;
- `buyerProblem`: the business problem the service solves.

The generator fails closed when a new page omits this contract, and
`validate-seo-geo.mjs` checks that both ideas are presented on the generated page.
Budgets, timelines, starting inputs, detailed outcomes, FAQs and tracked inquiry
links remain optional conversion enhancements rather than publishing blockers.
Traffic and lead quality are measured after publishing; they are not guaranteed
by the content contract. Do not add new routes to the legacy buyer-intent allowlist.

## Deploy

```bash
node tools/generate-seo-geo-pages.mjs
node tools/validate-seo-geo.mjs
npx wrangler pages deploy public --project-name promotion-mysite --branch master
```

The publish directory is `public/`. The legacy Django files are not part of the
Cloudflare Pages deployment.

`public/_worker.js` is part of the Pages deployment and is the runtime source of
truth for canonical host redirects and path aliases. It keeps `pddjf.com` as the
canonical host, redirects `www.pddjf.com` and the `promotion-mysite.pages.dev`
preview hosts to `pddjf.com`, and returns the PDDJF 404 for stale `/icojf`
paths.

If old immutable Pages deployment hashes must also be closed after they were
created with an earlier Worker bundle, configure a Cloudflare account-level Bulk
Redirect from `*.promotion-mysite.pages.dev` to `https://pddjf.com/`.

## Google Ads tracking

The site loads the existing Google Ads and GA4 tags, but it only reports the Ads
conversion when a visitor clicks or copies a contact method, or successfully
submits the validated project Brief. The Brief handler emits the GA4
`contact_submit` event and waits for the Google Ads conversion callback (with a
short timeout fallback) before opening the visitor's email client. Page views
are not counted as leads.

Run the focused conversion regression test with:

```bash
node tools/test-ads-conversion.mjs
```
