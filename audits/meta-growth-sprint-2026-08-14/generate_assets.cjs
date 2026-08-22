const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = __dirname;
const cyan = '#20E0D6';
const cyanSoft = '#8EF7F1';
const amber = '#FFAE4A';
const ink = '#04101F';
const panel = '#0A1B2D';
const white = '#F4FAFF';
const muted = '#A8B8C8';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lines = (items, x, y, size, color = white, lineGap = Math.round(size * 1.28), weight = 500) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${items.map((t, i) => `<tspan x="${x}" dy="${i ? lineGap : 0}">${esc(t)}</tspan>`).join('')}</text>`;
const smallCaps = (text, x, y, color = cyan) =>
  `<text x="${x}" y="${y}" font-size="25" letter-spacing="5" fill="${color}" font-weight="700">${esc(text.toUpperCase())}</text>`;
const logo = (height) => `
  <g transform="translate(76 ${height - 72})">
    <rect x="0" y="-19" width="26" height="26" rx="5" transform="rotate(45 13 -6)" fill="none" stroke="${cyan}" stroke-width="4"/>
    <text x="48" y="0" font-size="25" letter-spacing="3" fill="${white}" font-weight="700">SIGNALCRAFT LABS</text>
  </g>`;
const grid = (width, height) => {
  let s = '<g opacity="0.16" stroke="#1C5A70" stroke-width="1">';
  for (let x = 0; x <= width; x += 90) s += `<line x1="${x}" y1="0" x2="${x}" y2="${height}"/>`;
  for (let y = 0; y <= height; y += 90) s += `<line x1="0" y1="${y}" x2="${width}" y2="${y}"/>`;
  return s + '</g>';
};
const base = (width, height, content) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#020713"/><stop offset="0.55" stop-color="${ink}"/><stop offset="1" stop-color="#071B2A"/>
    </linearGradient>
    <linearGradient id="teal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#0D7F87"/><stop offset="1" stop-color="${cyan}"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <style>text{font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif}</style>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  ${grid(width, height)}
  <circle cx="${width * 0.88}" cy="${height * 0.08}" r="270" fill="#0DB5B5" opacity="0.06"/>
  ${content}
  ${logo(height)}
</svg>`;

const card = (x, y, w, h, accent = cyan, title = '', body = []) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="${panel}" stroke="#21435A" stroke-width="2"/>
  <rect x="${x}" y="${y}" width="10" height="${h}" rx="5" fill="${accent}"/>
  ${title ? lines([title], x + 38, y + 58, 32, accent, 38, 700) : ''}
  ${body.length ? lines(body, x + 38, y + 112, 29, white, 42, 500) : ''}`;

async function writePng(name, width, height, content) {
  const svg = Buffer.from(base(width, height, content));
  await sharp(svg).png({ compressionLevel: 9 }).toFile(path.join(outDir, name));
}

async function buildCarousel() {
  await writePng('checklist-01-cover.png', 1080, 1350, `
    ${smallCaps('Pre-launch controls', 76, 116)}
    ${lines(['Broker API integration', 'pre-launch checklist'], 76, 238, 76, white, 92, 750)}
    ${lines(['The happy-path demo is not the launch gate.', 'Prove identity, state, risk and recovery first.'], 76, 475, 34, muted, 51, 450)}
    <g transform="translate(120 710)">
      <path d="M0 85 H210" stroke="${cyan}" stroke-width="8"/><circle cx="0" cy="85" r="18" fill="${cyan}"/><circle cx="210" cy="85" r="18" fill="${cyan}"/>
      <path d="M290 85 H500" stroke="${amber}" stroke-width="8"/><circle cx="290" cy="85" r="18" fill="${amber}"/><circle cx="500" cy="85" r="18" fill="${amber}"/>
      <path d="M580 85 H790" stroke="${cyan}" stroke-width="8"/><circle cx="580" cy="85" r="18" fill="${cyan}"/><circle cx="790" cy="85" r="18" fill="${cyan}"/>
      <text x="0" y="150" font-size="27" fill="${muted}">IDENTITY</text><text x="290" y="150" font-size="27" fill="${muted}">STATE</text><text x="580" y="150" font-size="27" fill="${muted}">RECOVERY</text>
    </g>`);

  await writePng('checklist-02-identity-retries.png', 1080, 1350, `
    ${smallCaps('01 / Identity and retries', 76, 112)}
    ${lines(['Can the same intent', 'create a second order?'], 76, 212, 65, white, 79, 750)}
    ${card(76, 435, 928, 170, cyan, 'Stable event identity', ['Persist event_id before routing.', 'Reject replayed or stale instructions.'])}
    ${card(76, 630, 928, 170, cyan, 'Deterministic idempotency', ['Derive one key per execution intent.', 'Reuse a stable client order ID.'])}
    ${card(76, 825, 928, 170, amber, 'Bounded retry matrix', ['Timeout ≠ rejection.', 'Query account truth before resubmission.'])}
    ${lines(['GATE: replay the same payload twice and prove one outcome.'], 76, 1070, 29, cyanSoft, 40, 650)}`);

  await writePng('checklist-03-order-lifecycle.png', 1080, 1350, `
    ${smallCaps('02 / Order lifecycle', 76, 112)}
    ${lines(['“Accepted” is not', 'a terminal state.'], 76, 212, 68, white, 82, 750)}
    ${card(76, 438, 928, 195, cyan, 'Preserve every transition', ['intent → submitted → accepted → partial fill', '→ filled / cancelled / rejected'])}
    ${card(76, 657, 928, 195, cyan, 'Map every identifier', ['event_id + client order ID + broker order ID', 'with timestamps and source records'])}
    ${card(76, 876, 928, 150, amber, 'Never overwrite uncertainty', ['Unresolved states enter an exception queue.'])}
    ${lines(['GATE: partial fill, cancel and reject paths are observable.'], 76, 1095, 29, cyanSoft, 40, 650)}`);

  await writePng('checklist-04-risk-controls.png', 1080, 1350, `
    ${smallCaps('03 / Executable risk', 76, 112)}
    ${lines(['Controls must stop', 'the wrong order.'], 76, 212, 68, white, 82, 750)}
    <g transform="translate(76 440)">
      ${card(0, 0, 444, 170, cyan, 'Order limits', ['size • price deviation', 'symbol • order type'])}
      ${card(484, 0, 444, 170, cyan, 'Position limits', ['gross / net exposure', 'reduce-only rules'])}
      ${card(0, 205, 444, 170, amber, 'Operational limits', ['rate limits • cooldowns', 'manual pause / kill switch'])}
      ${card(484, 205, 444, 170, cyan, 'Evidence', ['structured reject reasons', 'replayable decision logs'])}
    </g>
    ${lines(['GATE: every reject explains what failed and why.'], 76, 935, 29, cyanSoft, 40, 650)}`);

  await writePng('checklist-05-recovery.png', 1080, 1350, `
    ${smallCaps('04 / Restart and recovery', 76, 112)}
    ${lines(['Reconcile first.', 'Route second.'], 76, 212, 72, white, 86, 750)}
    <path d="M150 500 H890" stroke="#21435A" stroke-width="16" stroke-linecap="round"/>
    <circle cx="170" cy="500" r="34" fill="${cyan}"/><circle cx="410" cy="500" r="34" fill="${cyan}"/><circle cx="650" cy="500" r="34" fill="${amber}"/><circle cx="890" cy="500" r="34" fill="${cyan}"/>
    ${lines(['load persisted', 'intent'], 115, 570, 27, muted, 36, 550)}
    ${lines(['fetch orders,', 'fills, positions'], 338, 570, 27, muted, 36, 550)}
    ${lines(['resolve', 'mismatches'], 598, 570, 27, muted, 36, 550)}
    ${lines(['resume', 'routing'], 838, 570, 27, muted, 36, 550)}
    ${card(76, 735, 928, 195, amber, 'Fail closed on ambiguity', ['Pause new routing when state disagrees.', 'Assign one human owner and preserve evidence.'])}
    ${lines(['GATE: forced restart produces no duplicate submission.'], 76, 1020, 29, cyanSoft, 40, 650)}`);

  await writePng('checklist-06-cta.png', 1080, 1350, `
    ${smallCaps('Launch gate', 76, 112)}
    ${lines(['Prove failure paths', 'before production.'], 76, 220, 74, white, 90, 750)}
    ${lines(['□ duplicate event', '□ API timeout', '□ partial fill', '□ cancel / reject', '□ stream gap', '□ process restart'], 92, 470, 41, white, 70, 600)}
    <rect x="76" y="925" width="928" height="150" rx="32" fill="#0D2D3D" stroke="${cyan}" stroke-width="3"/>
    ${lines(['Follow for practical broker API, execution', 'and reconciliation engineering.'], 116, 985, 33, cyanSoft, 47, 700)}`);
}

async function buildCase() {
  await writePng('case-01-cover.png', 1080, 1350, `
    ${smallCaps('Anonymous engineering case', 76, 112, amber)}
    ${lines(['Internal state:', 'CANCELLED'], 76, 240, 70, white, 84, 750)}
    ${lines(['Broker truth:', 'ORDER STILL LIVE'], 76, 480, 70, amber, 84, 750)}
    <path d="M90 755 H990" stroke="#263D51" stroke-width="18" stroke-linecap="round"/>
    <path d="M90 755 H520" stroke="${cyan}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="520" cy="755" r="30" fill="${amber}" filter="url(#glow)"/>
    ${lines(['How reconciliation prevented a second order after restart.'], 76, 880, 36, muted, 50, 500)}`);

  await writePng('case-02-mismatch.png', 1080, 1350, `
    ${smallCaps('01 / The mismatch', 76, 112, amber)}
    ${lines(['Two systems told', 'different stories.'], 76, 212, 68, white, 82, 750)}
    ${card(76, 460, 928, 190, cyan, 'Internal service', ['cancel request recorded', 'local state marked CANCELLED'])}
    ${card(76, 685, 928, 190, amber, 'Broker account truth', ['order remained OPEN', 'no terminal execution report received'])}
    ${lines(['Risk: a restart could replay the old intent and create another order.'], 76, 965, 31, amber, 44, 650)}`);

  await writePng('case-03-stop.png', 1080, 1350, `
    ${smallCaps('02 / First response', 76, 112, amber)}
    ${lines(['Pause routing.', 'Preserve evidence.'], 76, 212, 72, white, 86, 750)}
    ${card(76, 470, 928, 150, amber, 'No blind retry', ['Timeout and silence were treated as UNKNOWN.'])}
    ${card(76, 650, 928, 150, cyan, 'Freeze the timeline', ['event_id • client ID • broker ID • timestamps'])}
    ${card(76, 830, 928, 150, cyan, 'Assign ownership', ['The mismatch entered a human exception queue.'])}
    ${lines(['Unknown state is a control condition—not permission to resend.'], 76, 1060, 29, cyanSoft, 40, 650)}`);

  await writePng('case-04-fix.png', 1080, 1350, `
    ${smallCaps('03 / Control change', 76, 112, amber)}
    ${lines(['Reconcile account truth', 'before new routing.'], 76, 212, 65, white, 79, 750)}
    <g transform="translate(76 455)">
      ${card(0, 0, 928, 150, cyan, '1. Query', ['open orders + recent fills + positions'])}
      ${card(0, 180, 928, 150, cyan, '2. Match', ['stable client order ID + broker order ID'])}
      ${card(0, 360, 928, 150, cyan, '3. Resolve', ['confirm terminal state or keep routing paused'])}
    </g>
    ${lines(['Restart acceptance test: no duplicate order submission.'], 76, 1050, 30, amber, 42, 700)}`);

  await writePng('case-05-evidence-cta.png', 1080, 1350, `
    ${smallCaps('Outcome / evidence', 76, 112, amber)}
    ${lines(['One intent.', 'One recorded outcome.'], 76, 222, 72, white, 86, 750)}
    ${lines(['✓ state discrepancy preserved', '✓ routing paused while unresolved', '✓ account truth reconciled', '✓ restart path replay-tested'], 86, 500, 39, white, 72, 600)}
    ${lines(['No client identity, strategy or trading result disclosed.'], 76, 860, 28, muted, 40, 500)}
    <rect x="76" y="940" width="928" height="150" rx="32" fill="#0D2D3D" stroke="${cyan}" stroke-width="3"/>
    ${lines(['Follow for practical broker API, execution', 'and reconciliation engineering.'], 116, 1000, 33, cyanSoft, 47, 700)}`);
}

async function buildVideoScenes() {
  await writePng('reel-scene-01.png', 1080, 1920, `
    ${smallCaps('Broker API failure mode', 78, 150, amber)}
    ${lines(['One signal.', 'Two orders.'], 78, 300, 105, white, 124, 800)}
    ${lines(['3 ways broker APIs create duplicate orders'], 78, 610, 47, muted, 62, 550)}
    <g transform="translate(110 900)"><path d="M0 80 H300" stroke="${cyan}" stroke-width="12"/><path d="M300 80 L640 0" stroke="${cyan}" stroke-width="12"/><path d="M300 80 L640 160" stroke="${amber}" stroke-width="12"/><circle cx="0" cy="80" r="28" fill="${cyan}"/><circle cx="300" cy="80" r="34" fill="${white}"/><circle cx="640" cy="0" r="28" fill="${cyan}"/><circle cx="640" cy="160" r="28" fill="${amber}"/></g>`);
  await writePng('reel-scene-02.png', 1080, 1920, `
    ${smallCaps('01 / Timeout retry', 78, 150, amber)}
    ${lines(['The broker accepted it.', 'Your client saw a timeout.'], 78, 300, 67, white, 83, 750)}
    ${card(78, 650, 924, 235, cyan, 'REQUEST #1', ['accepted upstream', 'response lost in transit'])}
    ${card(78, 930, 924, 235, amber, 'REQUEST #2', ['blind retry', 'second order risk'])}
    ${lines(['Timeout ≠ rejection. Query account truth first.'], 78, 1290, 34, cyanSoft, 48, 650)}`);
  await writePng('reel-scene-03.png', 1080, 1920, `
    ${smallCaps('02 / Two consumers', 78, 150, amber)}
    ${lines(['Two workers process', 'the same event.'], 78, 300, 72, white, 88, 750)}
    <g transform="translate(130 720)"><rect x="0" y="0" width="300" height="160" rx="30" fill="${panel}" stroke="${cyan}" stroke-width="4"/><text x="75" y="95" font-size="41" fill="${white}" font-weight="700">WORKER A</text><rect x="520" y="0" width="300" height="160" rx="30" fill="${panel}" stroke="${amber}" stroke-width="4"/><text x="595" y="95" font-size="41" fill="${white}" font-weight="700">WORKER B</text><path d="M410 -170 V0 M410 0 H300 M410 0 H520" stroke="${muted}" stroke-width="10"/><circle cx="410" cy="-170" r="42" fill="${cyan}"/></g>
    ${lines(['Persist one deterministic idempotency key', 'before either worker can route.'], 78, 1230, 36, cyanSoft, 52, 650)}`);
  await writePng('reel-scene-04.png', 1080, 1920, `
    ${smallCaps('03 / Restart replay', 78, 150, amber)}
    ${lines(['The process restarts', 'before state is reconciled.'], 78, 300, 70, white, 86, 750)}
    <g transform="translate(110 760)"><path d="M80 160 C80 10 270 -70 405 35" fill="none" stroke="${cyan}" stroke-width="18"/><path d="M405 35 L330 20 M405 35 L385 110" stroke="${cyan}" stroke-width="18"/><path d="M730 160 C730 315 540 390 405 285" fill="none" stroke="${amber}" stroke-width="18"/><path d="M405 285 L480 300 M405 285 L430 210" stroke="${amber}" stroke-width="18"/><text x="225" y="190" font-size="52" fill="${white}" font-weight="750">OLD INTENT</text></g>
    ${lines(['Restore orders, fills and positions', 'before routing anything new.'], 78, 1250, 36, cyanSoft, 52, 650)}`);
  await writePng('reel-scene-05.png', 1080, 1920, `
    ${smallCaps('Control chain', 78, 150, cyan)}
    ${lines(['Make duplicate execution', 'structurally difficult.'], 78, 300, 69, white, 85, 750)}
    ${card(78, 625, 924, 150, cyan, '1', ['stable event_id'])}
    ${card(78, 805, 924, 150, cyan, '2', ['deterministic idempotency key'])}
    ${card(78, 985, 924, 150, cyan, '3', ['stable client order ID'])}
    ${card(78, 1165, 924, 150, cyan, '4', ['decision log + reconciliation'])}`);
  await writePng('reel-scene-06.png', 1080, 1920, `
    ${smallCaps('SignalCraft Labs', 78, 150, cyan)}
    ${lines(['Engineering systems,', 'not trading signals.'], 78, 300, 73, white, 88, 750)}
    ${lines(['Broker / exchange API integration', 'Execution • risk • reconciliation'], 78, 610, 39, muted, 57, 550)}
    <rect x="78" y="930" width="924" height="230" rx="38" fill="#0D2D3D" stroke="${cyan}" stroke-width="4"/>
    ${lines(['Follow for practical broker API,', 'execution and reconciliation', 'engineering.'], 124, 1010, 42, cyanSoft, 58, 700)}
    ${lines(['No signals • No custody • No return promises'], 78, 1320, 29, muted, 42, 550)}`);
}

async function main() {
  await buildCarousel();
  await buildCase();
  await buildVideoScenes();
  console.log('Generated 17 PNG assets in', outDir);
}

main().catch((error) => { console.error(error); process.exit(1); });
