# SignalCraft Labs Product Design Audit

Date: 2026-07-05
Surface: local preview at http://127.0.0.1:8788/
Mode: UX + visual + accessibility risk audit from current screenshots

## Evidence

Figma was requested as the destination, but this Codex session does not currently expose a Figma connector or upload/create-file tool. I saved a Figma-ready local audit package instead.

Accepted screenshots:

- 01-home-hero-desktop.png
- 02-products-desktop.png
- 07-home-long-desktop.png
- 08-contact-long-desktop.png
- 09-service-long-desktop.png
- 10-home-mobile-long.png
- 11-home-full-desktop.png

Rejected screenshot:

- 03-packages-desktop.png was removed because the capture was blank.

## Step List

1. Desktop homepage hero: healthy
   The new positioning is clear, the primary CTA is visible, and the engineering-console visual makes the offer feel concrete. The downside is density: the headline, long lede, and detailed console compete for attention. This is acceptable on desktop, but it becomes a problem on mobile.

2. Digital products section: mixed
   The productized direction is strong. The four products make the business easier to understand than a generic development-service pitch. However, the section is still mostly descriptive. Cards need stronger next actions such as "view sample deliverable", "use this if...", or "start with this package".

3. Section anchor behavior: needs attention
   The `#products` capture landed with a large blank area before the product section. A user clicking "查看数字产品" may see a confusing jump where the section title appears low in the viewport and the cards are not immediately visible. This should be fixed with scroll target spacing or a dedicated anchor placed closer to the visible card area.

4. Service entry page: healthy
   The TradingView service page is useful for high-intent SEO traffic. It clearly says who the service is for, who it is not for, what gets delivered, and what the package ranges are. The page still uses older "自动交易系统开发" and "免费评估需求" language, which is okay for SEO but should be more visibly connected to the new "数字产品 + 定制工程 + 交付包" architecture.

5. Delivery packages on homepage: healthy with opportunity
   The three package cards are understandable and give visitors a pricing anchor. The missing piece is self-selection. Each package should say "best for", "not for", and one concrete example deliverable so a buyer can quickly identify the right tier without reading the whole page.

6. Contact page: needs attention
   The contact page is clear and low-risk, especially the "不需要提供" card. But it still says "自动交易系统需求" in the hero and uses a different nav model from the homepage. It should become the natural endpoint of the new productized flow: "提交项目 Brief / 评估交付包", not a generic contact page.

7. Mobile homepage: critical issue
   The mobile screenshot shows horizontal overflow. The H1, secondary CTA, dashboard card, and content columns are cut off to the right. `overflow-x: hidden` hides the problem rather than solving it. This is the highest-priority UX issue because most ad, social, and referral traffic will likely open on mobile.

## Strengths

- The new positioning is more credible than a generic "development quote" page.
- The trust boundary is strong: no custody, no profit promise, no investment advice.
- The homepage now has a logical funnel: positioning -> digital products -> service directions -> architecture -> trust -> packages -> brief.
- The generated service pages are strong for high-intent SEO because they answer fit, deliverables, packages, evidence, and boundaries.

## UX Risks

1. Mobile layout breaks the first impression.
   The current mobile screenshot cuts off key content, which can make the site feel unfinished even if the desktop version is polished.

2. Navigation is inconsistent across page types.
   Homepage nav uses "数字产品 / 定制工程 / 交付包"; generated pages and contact use labels such as "Crypto Reporting / TradingView / 技术资料 / FAQ". This makes the site feel like two architectures stitched together.

3. Digital products are not yet actionable enough.
   They read like concepts, not entry products. Visitors need to know what they receive, how long it takes, what input is required, and which product to start with.

4. Contact is too manual for a productized funnel.
   Email, WeChat, and Telegram are fine, but the page should also provide a structured Brief template so the visitor knows exactly what to send.

5. Package selection is visible but not guided.
   Price anchors are useful, but buyers still need help mapping their project to API Starter, Execution System, or Private Infrastructure.

## Accessibility Risks

- Screenshots alone cannot confirm keyboard order, screen-reader labels, or dynamic focus behavior.
- Mobile horizontal overflow is an accessibility risk because zoomed or small-screen users may lose access to content and controls.
- The bottom mobile CTA bar may cover lower content unless the page consistently reserves enough bottom padding.
- The green-on-white buttons likely read well visually, but contrast should still be checked with a real contrast tool before claiming WCAG compliance.
- The contact methods should have clear accessible labels and visible success feedback when copy actions occur.

## Recommendations

P0: Fix mobile overflow first.
Use a one-column mobile hero, remove fixed second-column minimums from hero/dashboard areas, constrain the engineering console to `max-width: 100%`, and test at 390px and 360px widths. Do not rely on `overflow-x: hidden` as the main fix.

P1: Align navigation across homepage, service pages, and contact.
Use one main architecture everywhere: Digital Products, Custom Engineering, Broker/API, Delivery Packages, Trust/Case, Contact. Keep SEO service links in secondary/footer areas.

P1: Convert digital product cards into real starter offers.
For each product card add: best for, input required, output delivered, expected time, and CTA. Example: "API Integration Feasibility Audit: send API docs + target workflow, receive feasibility notes + risk checklist."

P1: Make the contact page a project Brief endpoint.
Rename the hero around "提交项目 Brief / 评估交付包". Add a copyable Brief template and one short checklist for "do not send passwords or withdrawal permissions".

P2: Add package self-selection.
Under each package, add "choose this when..." and "do not choose this when..." This will reduce unqualified leads and improve buyer confidence.

P2: Fix section anchors.
Test `#products`, `#services`, `#packages`, and `#contact` on desktop and mobile. The target content should appear near the top with the first actionable card or CTA visible.

P3: Reduce first-screen visual density on mobile.
Consider hiding part of the dashboard console on mobile or turning it into 3 compact proof cards. The message matters more than showing the whole console on a narrow screen.

## Suggested Next Pass

Fix order:

1. Mobile overflow and sticky CTA spacing.
2. Nav and contact-page positioning consistency.
3. Product cards and package cards with clearer buyer self-selection.
4. Anchor jump behavior.
