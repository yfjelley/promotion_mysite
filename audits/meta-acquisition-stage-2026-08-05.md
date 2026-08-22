# Meta acquisition stage audit — 2026-08-05

## Outcome

- The production contact path preserves `fbclid` together with UTM attribution through the project-brief flow.
- A higher-intent Meta Instant Form draft was created for the SignalCraft Labs Page.
- No ad was published, no campaign was enabled, no payment method was added, and no spend was authorized.

## Live Meta account readback

- Business portfolio: SignalCraft Labs (`27032564459751924`)
- Facebook Page asset: `1250646651461399`
- Ad accounts: none added
- Datasets and pixels: none added
- Custom conversions: none added
- Domains: none added
- Lead access: default Page access; one person with full access, no partners observed
- Audience creation and campaign drafting are blocked until an ad account exists
- Meta's non-discrimination policy was presented but was not accepted on the user's behalf

## Instant Form draft

- Name: `SignalCraft | Qualified Project Brief | 2026-08-05`
- Locale: `en_US`
- Form type: Higher intent
- Flexible form delivery: off
- Status: saved in Draft forms; not created or published
- Contact fields: email and full name
- Qualification fields:
  - project type
  - intended start time
  - approved budget range
  - platform or API involved
  - main execution or business problem
- Privacy policy: `https://pddjf.com/privacy`
- Completion destination: `https://pddjf.com/contact/?utm_source=meta&utm_medium=instant_form&utm_campaign=signalcraft_qualified_leads`
- Security copy tells prospects not to submit passwords, one-time codes, withdrawal permissions, or API secrets

## Production website evidence

- Deployment: `https://837fb9c7.promotion-mysite.pages.dev`
- Canonical contact page: `https://pddjf.com/contact/`
- Release marker: `20260805-meta-attribution`
- Script version: `20260805-meta-attribution-v2`
- Verified tagged route preserved `utm_source`, `utm_medium`, `utm_campaign`, and `fbclid` on the detailed-brief link
- The detailed brief posts to `/api/brief` and retains the existing qualification gates

## Fresh validation

- `node tools/validate-seo-geo.mjs`: passed
- `node tools/test-ads-conversion.mjs`: passed
- `node tools/test-brief-worker.mjs`: passed
- `git diff --check`: passed

## Remaining user-gated steps

1. Review and personally accept or decline Meta's non-discrimination policy.
2. Create or add the intended ad account and confirm its permanent currency and time zone.
3. Only after those choices: add a dataset/Pixel, verify the domain, create audiences, and build a paused campaign draft.
