# Custom Trading Software English Landing Page Audit

Date: 2026-07-11

Scope: pddjf.com / SignalCraft Labs English paid-search path, with emphasis on a dedicated `Custom Trading Software Development` landing page.

## Flow audit

1. Existing English service page — healthy
   - The TradingView page has a clear service-specific H1, engineering scope, delivery packages, risk boundaries and a prominent Project Brief CTA.
   - Its desktop and mobile structures are suitable as the visual and conversion pattern for the new page.

2. English ad intent to landing-page match — previous gap, now addressed locally
   - Generic terms such as `custom trading software development` previously had no dedicated English destination.
   - The new `/custom-trading-software-development/` page owns category-level intent; TradingView, IBKR and FIX queries remain mapped to their dedicated pages.

3. Landing page to Project Brief — needs follow-up
   - The English landing page CTA correctly reaches `/contact/` and the form now includes `Custom trading software development` as a project type.
   - The Brief form itself is still Chinese. This is the largest remaining conversion mismatch for US and English-language traffic.

4. Mobile and accessibility checks — healthy within tested scope
   - At 390 x 844, the page has no horizontal overflow, shows the mobile quick links and keeps the sticky Brief action visible.
   - English FAQ and delivery-boundary labels are now exposed in English, and the document uses one H1 plus semantic section headings.
   - Keyboard-only navigation and screen-reader behavior were not exhaustively tested.

## Page content and trust boundaries

- Covers architecture, API integration, order lifecycle, risk controls, reconciliation, logs, alerts, source delivery and private deployment.
- Defines good-fit and not-fit customers before pricing.
- Uses engineering behavior—not strategy returns—as the acceptance basis.
- Makes no signal, custody, account-management or performance promises.
- Includes Service, FAQPage, BreadcrumbList and Organization structured data; no fabricated rating or review markup was added.

## Visual evidence

### Existing English service pattern — desktop

![Existing TradingView service page, desktop](/Users/yfjelley/workspace/promotion_mysite/audits/custom-trading-software-page-2026-07-11/01-existing-service-desktop.png)

### Existing Project Brief handoff — desktop

![Existing Chinese Project Brief page, desktop](/Users/yfjelley/workspace/promotion_mysite/audits/custom-trading-software-page-2026-07-11/02-contact-brief-desktop.png)

### New Custom Trading Software page — desktop

![New Custom Trading Software page, desktop](/Users/yfjelley/workspace/promotion_mysite/audits/custom-trading-software-page-2026-07-11/04-custom-trading-software-desktop.png)

### New Custom Trading Software page — mobile

![New Custom Trading Software page, mobile](/Users/yfjelley/workspace/promotion_mysite/audits/custom-trading-software-page-2026-07-11/05-custom-trading-software-mobile-390.png)

## Verification

- SEO/GEO generator completed.
- SEO/GEO validator passed with 48 pddjf HTML files and 47 sitemap URLs.
- Local HTTP preview returned the page and all checked internal targets.
- Browser readback confirmed the title, canonical URL, English language, H1, one Service node, seven FAQ items, CTA target and no 390 px horizontal overflow.
- Browser console showed no warnings or errors on the landing page.

Deployment was intentionally not performed as part of this audit and implementation pass.
