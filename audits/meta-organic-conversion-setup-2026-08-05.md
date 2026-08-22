# Meta organic conversion setup — 2026-08-05

## Outcome

- The SignalCraft Labs introduction post is pinned in the Facebook Page `Featured` section.
- The first-message auto reply is enabled for both Messenger and Instagram.
- Three reusable qualification replies are saved and persist after closing and reopening the saved-replies panel.
- A Messenger FAQ entry is enabled for project-quote requests.
- No ad or Boost action was taken, and no spend was initiated.

## Facebook featured post

- Page: SignalCraft Labs (`61592466136599`; Page asset `1250646651461399`)
- Post: `https://www.facebook.com/61592466136599/posts/122105079129415537`
- Opening copy: `A trading strategy is only the starting point.`
- Readback: the post appears under the public Page `Featured` heading.

## Instagram pin limitation

- Account: `@quant.yang`
- Post: `https://www.instagram.com/quant.yang/p/Dbph87xga8Z/`
- The post is public and readable from the signed-in account.
- Instagram's current desktop-web post menu did not expose `Pin to your profile`; this remains a mobile-app-only handoff and was not claimed as completed.

## First-message auto reply

- Status readback: `On`
- Channels readback: Messenger `On`; Instagram `On`
- Message:

  > Thanks for contacting SignalCraft Labs. We build and audit broker/exchange API execution, reconciliation, risk controls, monitoring and private deployments.
  >
  > To assess fit, please send:
  > 1) platform/API
  > 2) problem or target outcome
  > 3) start date
  > 4) budget range
  >
  > Never send passwords, OTPs, API secrets or withdrawal permissions. Project brief: https://pddjf.com/contact/

## Saved replies

- `projectfit`: requests platform/API, issue or target outcome, start date, approved budget, and deployment preference; includes the credential-safety warning.
- `projectbrief`: sends the tracked project-brief URL and the one-business-day initial-fit expectation.
- `servicescope`: states the engineering/audit scope and excludes signals, investment advice, custody, account operation, and guaranteed returns.
- Persistent readback: all three shortcuts were present after closing and reopening the saved-replies panel.

## Messenger FAQ

- Status readback: `On`
- Question: `Request a project quote`
- Answer: requests the same qualification fields, includes the credential-safety warning, and links to `https://pddjf.com/contact/`.

## Continuation audit: requested items 1–3

### 1. High-intent keyword auto reply

- Intended channels: Messenger and Instagram.
- Intended keywords: `PROJECT`, `API INTEGRATION`, `QUOTE`, `RECONCILIATION`, and `PRIVATE DEPLOYMENT`.
- The `Custom keywords` template accepted the configuration and displayed a `Saved` toast twice, including a minimal Messenger-only retry using `PROJECT`.
- Persistent readback failed: filtering `Your automations` by `Qualified project inquiry` returned an empty result, so the automation is not counted as created.
- The fallback `Start from scratch` form exposed Messenger only and offered `Message is assigned`, `Label is added`, and `New message received` triggers; it did not offer a keyword trigger or Instagram channel.
- Result: blocked by the current Meta Business Suite save/feature state; no unverified automation was claimed as active.

### 2. Instagram FAQ sync

- Reopening `Frequently asked questions` showed the existing automation `On`, but its only available channel/tab was Messenger.
- The signed-in Instagram web account was verified as a business account. Its Professional dashboard, Professional account settings, and Business tools and controls pages did not expose FAQ management.
- Result: the Messenger FAQ remains active and unchanged; Instagram FAQ sync requires a Meta surface that exposes the Instagram channel or the Instagram mobile app.

### 3. Lead workflow labels

- Intended labels: `New lead`, `Qualified`, `Need details`, `Proposal`, and `Not fit`.
- Selecting `Manage labels` opened a `Page Contact Terms of Service` review gate.
- No terms were accepted on the user's behalf, and no existing conversation was labeled or otherwise changed.
- Result: label creation is pending the account owner's review and acceptance of the contact terms.

## Publication and spend verification

- Six launch posts were listed as Facebook + Instagram `Crossposted`.
- Each of the six rows showed `Not currently boosted`.
- The `Ad Posts` view showed `No activity during this date range` for the displayed last-90-days window.
- No ad-creation, Boost, payment, campaign, or policy-acceptance action was performed during this setup.

## Remaining handoff

1. In the Instagram mobile app, open the introduction post, use the three-dot menu, and select `Pin to your profile`.
2. In the Instagram mobile app, open business messaging settings and add/import the `Request a project quote` FAQ if the Instagram channel is offered there.
3. In Meta Business Suite Inbox, open `Manage labels`, review the Page Contact Terms of Service personally, and accept only if you agree; after that, create `New lead`, `Qualified`, `Need details`, `Proposal`, and `Not fit`.
4. Retry `Custom keywords` only after Meta's automation list can persist and read back the new record; a success toast alone is insufficient evidence.
5. Do not enter or share a password, one-time code, API secret, or withdrawal-enabled credential for any of these steps.
