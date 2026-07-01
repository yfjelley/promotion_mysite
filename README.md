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

The primary conversion pages are:

- `/` for the broader automated trading system offer.
- `/broker/api` for the broker API automation ad group.

SEO and GEO content pages:

- `/tradingview-webhook-automation/` for TradingView Webhook automation.
- `/exchange-api-trading-bot-development/` for exchange API automation.
- `/broker-api/ibkr/`, `/broker-api/schwab/`, and `/broker-api/alpaca/` for platform-specific broker API pages.
- `/fix-api-order-routing/` for FIX API execution workflows.
- `/tradingview-webhook-developer/`, `/ibkr-api-automation-developer/`, and
  `/fix-api-order-routing-developer/` for high-intent English search and Ads
  landing pages.
- `/risk-engine/` for pre-trade risk controls.
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

Production robots policy assumes Cloudflare Managed Robots.txt remains enabled.
Cloudflare prepends the general search/training policy in production, while
this repo's `public/robots.txt` avoids repeating those managed blocks. If this
site is served outside Cloudflare Pages or Managed Robots.txt is disabled,
re-add explicit training-bot blocks before deployment.

## Generate and validate content

The SEO/GEO service pages, `sitemap.xml`, and `llms.txt` are generated from a
single data file:

```bash
node tools/generate-seo-geo-pages.mjs
node tools/validate-seo-geo.mjs
```

Run both commands after changing page slugs, service copy, prices, structured
data, robots policy, or contact details. The validator checks pddjf canonical
URLs, JSON-LD parsing, sitemap file coverage, internal links, `robots.txt`,
`llms.txt`, and risky positioning terms.

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
canonical host, redirects `icojf.com`, `www.icojf.com`, and `www.pddjf.com` to
the canonical host, redirects the `promotion-mysite.pages.dev` preview host and
its preview subdomains to `pddjf.com`, and mirrors the legacy path redirects
listed in `public/_redirects` for compatibility/documentation.

If old immutable Pages deployment hashes must also be closed after they were
created with an earlier Worker bundle, configure a Cloudflare account-level Bulk
Redirect from `*.promotion-mysite.pages.dev` to `https://pddjf.com/`.

## Google Ads tracking

The site loads the existing Google Ads and GA4 tags, but it only reports the Ads
conversion when a visitor clicks or copies a contact method. Page views are not
counted as leads.
