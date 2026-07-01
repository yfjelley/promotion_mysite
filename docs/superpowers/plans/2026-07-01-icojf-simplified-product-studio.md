# ICOJF Simplified Product Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `icojf.com` into a simplified-Chinese software product studio site for Hong Kong, Singapore, Taiwan, Japan, and overseas Chinese customers.

**Architecture:** Keep the existing static Cloudflare Pages layout and host routing. Modify only `public/icojf/` content and shared ICOJF CSS unless a validation guard needs to be strengthened in `tools/validate-seo-geo.mjs`; leave `pddjf.com` trading automation pages and `public/_worker.js` unchanged unless verification exposes a routing bug.

**Tech Stack:** Static HTML, CSS, Cloudflare Pages `_worker.js`, Node-based validation script `tools/validate-seo-geo.mjs`, local static/Worker preview, browser screenshot QA.

---

## File Structure

Files to modify:

- `tools/validate-seo-geo.mjs`
  Add ICOJF-specific validation guards before changing content, so the current site fails for the right reasons: product-studio positioning, correct service regions, no `美国`/`中国大陆` service-region wording, page-level FAQ depth, and no `pddjf.com` leakage.

- `public/icojf/index.html`
  Replace the current generic software outsourcing homepage with the simplified-Chinese product studio homepage from the approved spec: hero, system visual, capability map, case notes, process, security boundary, region/service facts, and CTA.

- `public/icojf/api-integration-development/index.html`
  Deepen into an API Integration intent page with facts summary, OAuth/API Key/Webhook/rate-limit/retry/audit-log content, acceptance criteria, safety boundary, and FAQ JSON-LD.

- `public/icojf/mvp-saas-development/index.html`
  Deepen into a SaaS MVP intent page with scope, user roles, data model, admin console, deployment/handover, acceptance criteria, and FAQ JSON-LD.

- `public/icojf/business-process-automation/index.html`
  Deepen into a Workflow Automation intent page with manual-process mapping, approval/review paths, scheduled jobs, exception queues, rollback, acceptance criteria, and FAQ JSON-LD.

- `public/icojf/contact/index.html`
  Convert the contact page into a project-brief page that filters low-quality leads and asks for project background, existing systems, APIs, budget range, timeline, region, and acceptance owner.

- `public/icojf/privacy.html`, `public/icojf/terms.html`, `public/icojf/404.html`
  Light copy update only: brand footer and terms wording should say product studio / API integration / SaaS MVP / workflow automation, not generic low-cost outsourcing.

- `public/icojf/styles.css`
  Add product-studio visual components and responsive rules: studio hero, build system preview, capability cards, case-note cards, matrix tables, FAQ cards, region facts, and safer mobile footer/button layout.

- `public/icojf/sitemap.xml` and `public/icojf/robots.txt`
  Verify only. Do not add new URLs in this phase unless a route is already present in `public/icojf/`.

Files not to modify unless a verification failure proves it is required:

- `public/_worker.js`
- `public/index.html`
- `public/service-pages.json`
- Any `public/` page outside `public/icojf/`

## Task 1: Add ICOJF Validation Guards

**Files:**
- Modify: `tools/validate-seo-geo.mjs`

- [ ] **Step 1: Add ICOJF required and forbidden content checks**

In `tools/validate-seo-geo.mjs`, inside the `for (const file of softwareHtmlFiles)` loop, immediately after this existing block:

```js
  if (html.includes("https://pddjf.com") || html.includes("SignalCraft Labs")) {
    errors.push(`${rel}: must stay separate from pddjf.com brand/domain`);
  }
```

add:

```js
  const softwareRoute = `/${relative(softwareDir, file).replaceAll(sep, "/")}`;
  const isSoftware404 = rel === "public/icojf/404.html";
  const isCoreSoftwarePage =
    !isSoftware404 &&
    [
      "/index.html",
      "/api-integration-development/index.html",
      "/mvp-saas-development/index.html",
      "/business-process-automation/index.html",
      "/contact/index.html"
    ].includes(softwareRoute);

  if (isCoreSoftwarePage) {
    [
      "ICOJF Studio",
      "香港、新加坡、台湾、日本及海外中文客户",
      "Software Product Studio"
    ].forEach((needle) => requireText(rel, html, needle));
  }

  [
    "美国",
    "中国大陆",
    "低价开发",
    "快速仿站",
    "包满意",
    "保证增长",
    "保证融资",
    "保证转化"
  ].forEach((needle) => {
    if (isCoreSoftwarePage && html.includes(needle)) {
      errors.push(`${rel}: contains disallowed ICOJF positioning text: ${needle}`);
    }
  });

  if (isCoreSoftwarePage) {
    [
      "源码",
      "部署文档",
      "运行手册",
      "验收清单"
    ].forEach((needle) => requireText(rel, html, needle));
  }
```

- [ ] **Step 2: Add service-page FAQ depth check for ICOJF service pages**

Still inside the `for (const file of softwareHtmlFiles)` loop, replace the current JSON-LD parse body:

```js
  for (const [, raw] of ldBlocks) {
    try {
      JSON.parse(raw);
    } catch (error) {
      errors.push(`${rel}: invalid JSON-LD: ${error.message}`);
    }
  }
```

with:

```js
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw);
      const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [];
      const faqNode = graph.find((node) => node["@type"] === "FAQPage");
      const isIcojfServicePage = [
        "public/icojf/api-integration-development/index.html",
        "public/icojf/mvp-saas-development/index.html",
        "public/icojf/business-process-automation/index.html"
      ].includes(rel);

      if (isIcojfServicePage && (!faqNode || !Array.isArray(faqNode.mainEntity) || faqNode.mainEntity.length < 5)) {
        errors.push(`${rel}: ICOJF service page FAQPage should contain at least 5 questions`);
      }
    } catch (error) {
      errors.push(`${rel}: invalid JSON-LD: ${error.message}`);
    }
  }
```

- [ ] **Step 3: Run validation and confirm it fails before content changes**

Run:

```bash
node tools/validate-seo-geo.mjs
```

Expected result: `FAIL` with ICOJF-specific errors including missing `ICOJF Studio`, missing `Software Product Studio`, missing `香港、新加坡、台湾、日本及海外中文客户`, service FAQ depth failures, and current disallowed `美国` text.

- [ ] **Step 4: Commit the validation guard**

Run:

```bash
git add tools/validate-seo-geo.mjs
git commit -m "Add icojf product studio validation guards"
```

## Task 2: Rebuild the ICOJF Homepage

**Files:**
- Modify: `public/icojf/index.html`
- Modify: `public/icojf/styles.css`
- Test: `tools/validate-seo-geo.mjs`

- [ ] **Step 1: Update homepage metadata and JSON-LD**

In `public/icojf/index.html`, set:

```html
<title>软件产品工作室 | SaaS MVP、API 集成与业务自动化 | ICOJF Studio</title>
<meta name="description" content="ICOJF Studio 是面向香港、新加坡、台湾、日本及海外中文客户的软件产品工作室，提供 SaaS MVP、API Integration、Workflow Automation 和企业内部工具开发。">
<meta property="og:title" content="ICOJF Studio | 软件产品工作室">
<meta property="og:description" content="为中文团队设计、开发、交付可维护的软件产品，覆盖 SaaS MVP、API 集成、业务流程自动化和企业内部工具。">
```

In the JSON-LD graph:

- Change every organization/site display name from `ICOJF Software Studio` to `ICOJF Studio`.
- Change `ProfessionalService.name` to `软件产品工作室`.
- Change `areaServed` to:

```json
["香港", "新加坡", "台湾", "日本", "海外中文客户"]
```

- Change `serviceType` to:

```json
[
  "SaaS MVP 开发",
  "API Integration",
  "Workflow Automation",
  "企业内部工具开发",
  "软件产品开发"
]
```

- [ ] **Step 2: Replace header navigation labels**

Use this header structure in `public/icojf/index.html`:

```html
<header class="site-header">
  <a class="brand" href="/" aria-label="ICOJF Studio 首页">
    <span class="brand-mark" aria-hidden="true">I</span>
    <span>ICOJF Studio</span>
  </a>
  <nav class="nav" aria-label="主导航">
    <a href="#capabilities">服务能力</a>
    <a href="#case-notes">案例笔记</a>
    <a href="#process">交付流程</a>
    <a href="#trust">安全边界</a>
    <a class="nav-cta" href="/contact/">提交项目简述</a>
  </nav>
</header>
```

- [ ] **Step 3: Replace the homepage hero with product-studio positioning**

Replace the current `<section class="hero" ...>` with:

```html
<section class="hero studio-hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">Software Product Studio</p>
    <h1 id="hero-title">为中文团队设计、开发、交付可维护的软件产品。</h1>
    <p class="hero-lede">
      ICOJF Studio 面向香港、新加坡、台湾、日本及海外中文客户，提供 SaaS MVP、API Integration、Workflow Automation 与企业内部工具开发。重点不是堆功能，而是交付能运行、可验收、可维护的系统。
    </p>
    <div class="hero-actions">
      <a class="button primary" href="/contact/">提交项目简述</a>
      <a class="button secondary" href="#capabilities">查看服务能力</a>
    </div>
    <div class="hero-tags" aria-label="核心服务">
      <span>SaaS MVP</span>
      <span>API Integration</span>
      <span>Workflow Automation</span>
      <span>Internal Tools</span>
    </div>
  </div>

  <div class="build-system-panel" aria-label="项目交付模型示意">
    <div class="panel-head">
      <strong>项目交付模型</strong>
      <span class="status">Build brief first</span>
    </div>
    <div class="system-preview-grid">
      <div class="workflow-card">
        <span class="mini-label">Workflow</span>
        <div class="workflow-lane">需求拆解与原型</div>
        <div class="workflow-lane">API / 数据流程设计</div>
        <div class="workflow-lane">上线、文档、交接</div>
      </div>
      <div class="handover-card">
        <span class="mini-label">交付范围</span>
        <div class="progress-track"><span style="width:72%"></span></div>
        <p>MVP / 4-8 周</p>
        <div class="asset-tags">
          <span>Source Code</span>
          <span>Runbook</span>
          <span>Logs</span>
          <span>验收清单</span>
        </div>
      </div>
    </div>
    <div class="launch-steps">
      <span><strong>01</strong> Brief</span>
      <span><strong>02</strong> Prototype</span>
      <span><strong>03</strong> Build</span>
      <span><strong>04</strong> Launch</span>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Replace homepage body sections**

Use this section order after the hero:

```html
<section id="capabilities" class="section" aria-labelledby="capabilities-title">
  <div class="section-head">
    <p class="eyebrow">Capabilities</p>
    <h2 id="capabilities-title">服务能力</h2>
    <p>每个项目先确认业务目标、系统边界、客户需提供资料和验收方式，再进入原型或开发。</p>
  </div>
  <div class="service-grid">
    <article class="service-card accent-blue">
      <h3>API Integration</h3>
      <p>支付、CRM、ERP、邮件短信、物流、数据平台和内部系统串接，覆盖 OAuth、Webhook、Rate Limit、Retry Queue、Audit Log 和 Error Handling。</p>
      <a href="/api-integration-development/">查看 API 集成开发</a>
    </article>
    <article class="service-card accent-green">
      <h3>SaaS MVP</h3>
      <p>把早期产品做成可演示、可试用、可继续迭代的第一版，包含用户角色、核心流程、后台、数据模型、部署文档和运行手册。</p>
      <a href="/mvp-saas-development/">查看 SaaS MVP 开发</a>
    </article>
    <article class="service-card accent-amber">
      <h3>Workflow Automation</h3>
      <p>把重复性的表格、审批、通知、报表和跨系统同步做成可追踪的自动化工具，并保留人工确认、异常队列和回滚方式。</p>
      <a href="/business-process-automation/">查看业务自动化开发</a>
    </article>
  </div>
</section>

<section class="section soft" aria-labelledby="facts-title">
  <div class="section-head">
    <p class="eyebrow">Service Facts</p>
    <h2 id="facts-title">项目事实摘要</h2>
    <p>适合先快速判断范围、地区、交付物和合作边界。</p>
  </div>
  <table class="facts-table">
    <tbody>
      <tr><th>服务对象</th><td>香港、新加坡、台湾、日本及海外中文客户，包括创业团队、运营团队、中小企业和需要外部产品开发能力的业务负责人。</td></tr>
      <tr><th>主要交付物</th><td>源码、部署文档、运行手册、接口说明、环境变量清单、日志说明、验收清单和远程交付讲解。</td></tr>
      <tr><th>常见项目</th><td>SaaS MVP、API Integration、Workflow Automation、企业内部工具、数据看板和第三方系统串接。</td></tr>
      <tr><th>合作方式</th><td>以远程沟通、异步文档、阶段交付和明确验收为主；项目开始前确认负责人、测试账号、接口文档和上线窗口。</td></tr>
      <tr><th>不承诺事项</th><td>不承诺融资、拉新、广告 ROI、平台审核结果、第三方 API 永久可用或没有验收标准的纯想法落地。</td></tr>
    </tbody>
  </table>
</section>

<section id="case-notes" class="section" aria-labelledby="case-notes-title">
  <div class="section-head">
    <p class="eyebrow">Case Notes</p>
    <h2 id="case-notes-title">案例笔记展示方式</h2>
    <p>第一阶段使用脱敏案例笔记，不夸大商业结果，只展示问题、限制、架构、交付物和验收方式。</p>
  </div>
  <div class="proof-grid">
    <article class="proof-card"><h3>API 数据同步</h3><p>把第三方订单、客户资料和内部后台打通，重点处理鉴权、字段映射、失败重试和日志追踪。</p></article>
    <article class="proof-card"><h3>SaaS MVP 闭环</h3><p>从角色权限、核心表单、后台管理到部署交接，先做可试用版本，再按真实反馈扩展。</p></article>
    <article class="proof-card"><h3>人工流程自动化</h3><p>把表格汇总、审批提醒和周报生成流程系统化，同时保留人工确认和异常队列。</p></article>
  </div>
</section>

<section id="process" class="section dark" aria-labelledby="process-title">
  <div class="section-head">
    <p class="eyebrow">Delivery Model</p>
    <h2 id="process-title">交付流程</h2>
    <p>先定义范围和验收，再进入开发，避免软件外包项目最常见的范围失控。</p>
  </div>
  <div class="process">
    <article class="process-step"><span>1</span><h3>Brief</h3><p>整理项目背景、现有系统、目标用户、关键流程、接口文档和预算范围。</p></article>
    <article class="process-step"><span>2</span><h3>Prototype</h3><p>确认核心页面、数据对象、用户角色、系统边界和第一阶段验收清单。</p></article>
    <article class="process-step"><span>3</span><h3>Build</h3><p>按功能切片开发，保留演示环境、变更记录、日志说明和测试用例。</p></article>
    <article class="process-step"><span>4</span><h3>Launch</h3><p>完成部署、源码交付、运行手册、权限交接、上线检查和维护建议。</p></article>
  </div>
</section>

<section id="trust" class="section" aria-labelledby="trust-title">
  <div class="section-head">
    <p class="eyebrow">Trust & Boundary</p>
    <h2 id="trust-title">安全与交付边界</h2>
    <p>项目交付以可维护和可审计为目标，敏感权限、生产数据和第三方平台责任需要在开始前确认。</p>
  </div>
  <div class="check-grid">
    <article class="check-card"><h3>权限最小化</h3><p>API Key、OAuth、测试账号和生产权限应按最小权限配置，并区分测试与生产环境。</p></article>
    <article class="check-card"><h3>交接资产</h3><p>交付源码、部署文档、运行手册、环境变量说明、日志说明和验收清单。</p></article>
    <article class="check-card"><h3>不适合项目</h3><p>极低预算、没有明确负责人、只要求复制竞品、不接受阶段验收或文档交接的项目不适合进入开发。</p></article>
  </div>
</section>

<section id="contact" class="section soft" aria-labelledby="contact-title">
  <div class="contact-band">
    <div class="section-head">
      <p class="eyebrow">Start a Build Brief</p>
      <h2 id="contact-title">提交项目简述</h2>
      <p>发来项目背景、现有系统、目标用户、需要集成的平台、预算范围和期望上线时间。可以先做一页范围评估，再决定是否进入原型或开发。</p>
      <div class="cta-actions">
        <a class="button primary" href="/contact/">提交项目简述</a>
        <a class="button secondary" href="mailto:contact@icojf.com">发送邮件</a>
      </div>
    </div>
    <aside class="contact-card">
      <h3>首次联系建议包含</h3>
      <ul class="list">
        <li>项目目标和当前阻塞点。</li>
        <li>现有系统、表格或接口文档。</li>
        <li>第一阶段必须上线的核心功能。</li>
        <li>预算范围、上线时间和验收负责人。</li>
      </ul>
    </aside>
  </div>
</section>
```

- [ ] **Step 5: Add homepage product-studio CSS**

Append these rules to `public/icojf/styles.css` before the first `@media` block:

```css
.eyebrow {
  margin-bottom: 10px;
  color: var(--blue);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.studio-hero {
  grid-template-columns: minmax(0, 0.98fr) minmax(420px, 0.82fr);
}

.hero-tags,
.asset-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero-tags {
  margin-top: 22px;
}

.hero-tags span,
.asset-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  color: #344054;
  font-size: 13px;
  font-weight: 900;
}

.build-system-panel {
  overflow: hidden;
  border: 1px solid rgba(203, 213, 225, 0.75);
  border-radius: 10px;
  background: var(--navy);
  color: #e2e8f0;
  box-shadow: 0 24px 68px rgba(15, 23, 42, 0.22);
}

.build-system-panel .panel-head {
  border-bottom-color: rgba(226, 232, 240, 0.16);
  color: #e2e8f0;
}

.system-preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 14px;
  padding: 16px;
}

.workflow-card,
.handover-card {
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 10px;
  background: #111c2f;
  padding: 14px;
}

.handover-card {
  background: #fff;
  color: var(--ink);
}

.mini-label {
  display: block;
  margin-bottom: 10px;
  color: #93c5fd;
  font-size: 12px;
  font-weight: 900;
}

.workflow-lane {
  min-height: 34px;
  margin-top: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #1e40af;
  font-size: 13px;
  font-weight: 800;
}

.workflow-lane:nth-of-type(3) {
  background: #164e63;
}

.workflow-lane:nth-of-type(4) {
  background: #166534;
}

.progress-track {
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: #dbeafe;
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--blue);
}

.handover-card p {
  margin: 8px 0 12px;
  color: var(--muted);
  font-size: 13px;
}

.launch-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(226, 232, 240, 0.16);
}

.launch-steps span {
  padding: 12px;
  border-right: 1px solid rgba(226, 232, 240, 0.12);
  color: #94a3b8;
  font-size: 12px;
}

.launch-steps span:last-child {
  border-right: 0;
}

.launch-steps strong {
  display: block;
  color: #e2e8f0;
}

.accent-blue {
  border-top: 4px solid var(--blue);
}

.accent-green {
  border-top: 4px solid var(--green);
}

.accent-amber {
  border-top: 4px solid var(--amber);
}
```

Then add these responsive rules inside `@media (max-width: 980px)`:

```css
  .studio-hero,
  .system-preview-grid {
    grid-template-columns: 1fr;
  }
```

And inside `@media (max-width: 640px)`:

```css
  .launch-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-tags span,
  .asset-tags span {
    font-size: 12px;
  }
```

- [ ] **Step 6: Run validation and inspect homepage errors**

Run:

```bash
node tools/validate-seo-geo.mjs
```

Expected result after only homepage changes: validation still fails because the three service pages and contact page do not yet contain required product-studio/service-region/fact text and FAQ JSON-LD. There should be no `public/icojf/index.html` errors.

- [ ] **Step 7: Commit homepage changes**

Run:

```bash
git add public/icojf/index.html public/icojf/styles.css
git commit -m "Redesign icojf homepage as product studio"
```

## Task 3: Deepen ICOJF Service Pages

**Files:**
- Modify: `public/icojf/api-integration-development/index.html`
- Modify: `public/icojf/mvp-saas-development/index.html`
- Modify: `public/icojf/business-process-automation/index.html`
- Modify: `public/icojf/styles.css`
- Test: `tools/validate-seo-geo.mjs`

- [ ] **Step 1: Add shared service page section classes**

Append before the first `@media` block in `public/icojf/styles.css`:

```css
.fact-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--line);
}

.fact-strip > div {
  background: #fff;
  padding: 18px;
}

.fact-strip strong {
  display: block;
  margin-bottom: 6px;
  color: var(--navy);
}

.fact-strip span {
  color: var(--muted);
  font-size: 14px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.detail-card,
.faq-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  padding: 22px;
}

.detail-card p,
.faq-card p {
  color: var(--muted);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
```

Inside `@media (max-width: 980px)`, add:

```css
  .fact-strip,
  .detail-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 2: Update API page metadata, hero, facts, and JSON-LD FAQ**

In `public/icojf/api-integration-development/index.html`:

- Change brand text to `ICOJF Studio`.
- Change title to:

```html
<title>API 集成开发 | OAuth、Webhook、数据同步与自动化 | ICOJF Studio</title>
```

- Change description to:

```html
<meta name="description" content="ICOJF Studio 面向香港、新加坡、台湾、日本及海外中文客户提供 API Integration 开发，覆盖 OAuth、API Key、Webhook、Rate Limit、Retry Queue、Audit Log 和 Error Handling。">
```

- Add `FAQPage` into the JSON-LD `@graph` with exactly:

```json
{
  "@type": "FAQPage",
  "@id": "https://icojf.com/api-integration-development/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "API 集成开发前需要提供什么资料？",
      "acceptedAnswer": { "@type": "Answer", "text": "建议提供 API 文档、测试账号、字段样例、权限范围、业务规则、失败场景和上线负责人。" }
    },
    {
      "@type": "Question",
      "name": "可以处理 OAuth、API Key 和 Webhook 吗？",
      "acceptedAnswer": { "@type": "Answer", "text": "可以。项目会先确认认证方式、权限范围、回调地址、签名校验、限频规则和生产测试隔离。" }
    },
    {
      "@type": "Question",
      "name": "API 调用失败如何处理？",
      "acceptedAnswer": { "@type": "Answer", "text": "通常会设计超时、重试、幂等、错误分类、异常队列、日志记录和必要的人工复核流程。" }
    },
    {
      "@type": "Question",
      "name": "是否会交付源码和部署文档？",
      "acceptedAnswer": { "@type": "Answer", "text": "会交付源码、部署文档、运行手册、环境变量说明、接口字段说明、日志说明和验收清单。" }
    },
    {
      "@type": "Question",
      "name": "API 集成项目适合哪些地区客户？",
      "acceptedAnswer": { "@type": "Answer", "text": "服务面向香港、新加坡、台湾、日本及海外中文客户，以远程沟通、异步文档和阶段验收为主。" }
    }
  ]
}
```

- Replace `<main>...</main>` content with sections using these H1/H2 labels:
  - H1: `API 集成开发`
  - Hero paragraph includes: `香港、新加坡、台湾、日本及海外中文客户`
  - Facts strip labels: `适合项目`、`核心技术`、`交付资产`、`验收方式`
  - Technical table rows: `认证与权限`、`Webhook 接收`、`同步与限频`、`日志与告警`
  - Acceptance section: `上线验收清单`
  - FAQ section: `常见问题`

Use these exact facts table values:

```html
<table class="scope-table">
  <tbody>
    <tr><th>认证与权限</th><td>OAuth、API Key、签名校验、最小权限、测试/生产隔离、密钥轮换建议和访问范围说明。</td></tr>
    <tr><th>Webhook 接收</th><td>回调地址、签名验证、重复事件去重、事件顺序、失败重放和异常队列。</td></tr>
    <tr><th>同步与限频</th><td>分页、增量同步、Rate Limit、Retry Queue、超时处理、幂等键和补偿任务。</td></tr>
    <tr><th>日志与告警</th><td>请求 ID、状态码、错误分类、输入输出摘要、Audit Log、告警规则和验收样例。</td></tr>
  </tbody>
</table>
```

- [ ] **Step 3: Update SaaS MVP page metadata, sections, and JSON-LD FAQ**

In `public/icojf/mvp-saas-development/index.html`:

- Change brand text to `ICOJF Studio`.
- Change title to:

```html
<title>SaaS MVP 开发 | 产品原型、后台、权限与部署 | ICOJF Studio</title>
```

- Change description to:

```html
<meta name="description" content="ICOJF Studio 面向香港、新加坡、台湾、日本及海外中文客户提供 SaaS MVP 开发，覆盖产品范围、用户角色、数据模型、后台管理、部署文档、运行手册和验收清单。">
```

- Add FAQPage with five questions:
  1. `SaaS MVP 第一阶段应该做到多完整？`
  2. `MVP 开发前需要准备什么？`
  3. `是否包含后台和权限？`
  4. `是否交付源码和部署文档？`
  5. `SaaS MVP 项目适合哪些地区客户？`

Each answer must mention concrete handover or scope details and at least one page answer must include `香港、新加坡、台湾、日本及海外中文客户`.

- Replace the main sections so the page includes:
  - H1: `SaaS MVP 开发`
  - Hero paragraph includes: `不是一次性做完整大平台，而是先交付可演示、可试用、可继续迭代的第一版产品`
  - Facts strip labels: `适合项目`、`核心范围`、`交付资产`、`验收方式`
  - Scope table rows: `产品范围`、`工程范围`、`数据模型`、`部署交接`
  - Acceptance section: `MVP 验收清单`
  - FAQ section: `常见问题`

Use this exact scope table:

```html
<table class="scope-table">
  <tbody>
    <tr><th>产品范围</th><td>目标用户、核心流程、角色权限、关键页面、后台管理、通知规则和第一阶段上线边界。</td></tr>
    <tr><th>工程范围</th><td>前端、后端、数据库、文件存储、邮件通知、错误日志、部署配置和基础安全设置。</td></tr>
    <tr><th>数据模型</th><td>客户、账号、订单、任务、文件、消息、报表等核心对象的字段、状态和关系说明。</td></tr>
    <tr><th>部署交接</th><td>源码、部署文档、运行手册、环境变量清单、测试账号、验收清单和维护建议。</td></tr>
  </tbody>
</table>
```

- [ ] **Step 4: Update Workflow Automation page metadata, sections, and JSON-LD FAQ**

In `public/icojf/business-process-automation/index.html`:

- Change brand text to `ICOJF Studio`.
- Change title to:

```html
<title>业务流程自动化开发 | 审批、报表、提醒与内部工具 | ICOJF Studio</title>
```

- Change description to:

```html
<meta name="description" content="ICOJF Studio 面向香港、新加坡、台湾、日本及海外中文客户提供 Workflow Automation 开发，把表格、审批、报表、通知和跨系统同步做成可追踪的内部工具。">
```

- Add FAQPage with five questions:
  1. `哪些业务流程适合自动化？`
  2. `高风险步骤是否必须全自动？`
  3. `自动化失败如何处理？`
  4. `是否会交付源码、运行手册和验收清单？`
  5. `业务流程自动化适合哪些地区客户？`

Each answer must mention concrete controls and at least one page answer must include `香港、新加坡、台湾、日本及海外中文客户`.

- Replace the main sections so the page includes:
  - H1: `业务流程自动化开发`
  - Hero paragraph includes: `表格、审批、报表、提醒、跨系统同步和人工复核`
  - Facts strip labels: `适合项目`、`自动化边界`、`交付资产`、`验收方式`
  - Scope table rows: `流程拆解`、`自动任务`、`人工复核`、`异常处理`
  - Acceptance section: `自动化验收清单`
  - FAQ section: `常见问题`

Use this exact scope table:

```html
<table class="scope-table">
  <tbody>
    <tr><th>流程拆解</th><td>梳理输入、输出、负责人、审批节点、数据字段、触发条件和需要保留人工判断的步骤。</td></tr>
    <tr><th>自动任务</th><td>定时同步、表格清洗、报表生成、邮件/Telegram/Slack 提醒、状态更新和文件归档。</td></tr>
    <tr><th>人工复核</th><td>涉及付款、删除、批量发送、敏感数据或客户通知的步骤保留确认、撤销和权限控制。</td></tr>
    <tr><th>异常处理</th><td>失败重试、异常队列、日志视图、错误分类、回滚方式、重跑机制和验收样例。</td></tr>
  </tbody>
</table>
```

- [ ] **Step 5: Run validation and commit service pages**

Run:

```bash
node tools/validate-seo-geo.mjs
```

Expected result after service page changes: validation may still fail on `public/icojf/contact/index.html` if contact has not been updated; the three service pages should have no FAQ depth errors and no disallowed region/positioning errors.

Commit:

```bash
git add public/icojf/api-integration-development/index.html public/icojf/mvp-saas-development/index.html public/icojf/business-process-automation/index.html public/icojf/styles.css
git commit -m "Deepen icojf service pages"
```

## Task 4: Update Contact and Support Pages

**Files:**
- Modify: `public/icojf/contact/index.html`
- Modify: `public/icojf/privacy.html`
- Modify: `public/icojf/terms.html`
- Modify: `public/icojf/404.html`
- Test: `tools/validate-seo-geo.mjs`

- [ ] **Step 1: Convert contact page to project brief page**

In `public/icojf/contact/index.html`:

- Change title to:

```html
<title>提交项目简述 | ICOJF Studio 软件产品工作室</title>
```

- Change description to:

```html
<meta name="description" content="联系 ICOJF Studio，提交 SaaS MVP、API Integration、Workflow Automation 或企业内部工具开发项目简述。服务面向香港、新加坡、台湾、日本及海外中文客户。">
```

- Change H1 to:

```html
<h1>提交项目简述</h1>
```

- The opening paragraph must be:

```html
<p>首次联系建议提供项目背景、现有系统、目标用户、需要集成的平台、预算范围、期望上线时间和验收负责人。ICOJF Studio 服务面向香港、新加坡、台湾、日本及海外中文客户。</p>
```

- Add a section with this exact checklist:

```html
<section class="section" aria-labelledby="brief-title">
  <div class="section-head">
    <p class="eyebrow">Build Brief</p>
    <h2 id="brief-title">建议提供资料</h2>
    <p>资料越清楚，范围评估越接近真实开发成本。</p>
  </div>
  <div class="check-grid">
    <article class="check-card"><h3>项目背景</h3><p>业务目标、当前阻塞点、目标用户、第一阶段必须跑通的核心流程。</p></article>
    <article class="check-card"><h3>现有系统</h3><p>系统截图、表格样例、接口文档、测试账号、数据字段和权限说明。</p></article>
    <article class="check-card"><h3>上线约束</h3><p>预算范围、期望上线时间、负责人、验收方式、是否需要源码和部署文档交接。</p></article>
  </div>
</section>
```

- Add a section with this exact fit filter:

```html
<section class="section soft" aria-labelledby="fit-title">
  <div class="section-head">
    <p class="eyebrow">Project Fit</p>
    <h2 id="fit-title">适合与不适合的项目</h2>
  </div>
  <div class="detail-grid">
    <article class="detail-card">
      <h3>适合进入评估</h3>
      <ul class="list">
        <li>已有业务流程，需要系统化或自动化。</li>
        <li>已有产品方向，需要 SaaS MVP 验证。</li>
        <li>已有第三方平台或 API 文档，需要稳定集成。</li>
        <li>愿意按阶段交付，并接受验收清单。</li>
      </ul>
    </article>
    <article class="detail-card">
      <h3>不适合进入开发</h3>
      <ul class="list">
        <li>没有明确负责人或验收人。</li>
        <li>只要求复制竞品，没有业务流程和数据边界。</li>
        <li>不接受源码、部署文档、运行手册和验收清单交接。</li>
        <li>希望承诺融资、增长、广告 ROI 或第三方平台审核结果。</li>
      </ul>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Normalize support page branding**

In `public/icojf/privacy.html`, `public/icojf/terms.html`, and `public/icojf/404.html`:

- Replace visible `ICOJF Software Studio` with `ICOJF Studio`.
- Replace footer phrases `软件外包与 API 集成开发` with `软件产品工作室、API 集成与业务自动化开发`.
- Keep canonical URLs unchanged.
- Do not add new external links.

- [ ] **Step 3: Run validation and commit contact/support pages**

Run:

```bash
node tools/validate-seo-geo.mjs
```

Expected result: validation passes. If it fails, fix only the listed `public/icojf/` file or validation typo that caused the failure.

Commit:

```bash
git add public/icojf/contact/index.html public/icojf/privacy.html public/icojf/terms.html public/icojf/404.html
git commit -m "Update icojf contact and support pages"
```

## Task 5: Local Preview, Visual QA, and Deployment Readiness

**Files:**
- Modify only if verification finds defects:
  - `public/icojf/styles.css`
  - `tools/validate-seo-geo.mjs`
  - specific `public/icojf/*.html` file reported by validation

- [ ] **Step 1: Run static validation**

Run:

```bash
node tools/validate-seo-geo.mjs
```

Expected output:

```text
SEO/GEO validation passed
```

If the actual success string differs, read the script output and confirm there are no errors.

- [ ] **Step 2: Start local Cloudflare preview**

Use the current project preview command. If `wrangler` is available, run:

```bash
wrangler pages dev public --local --port 8787
```

Expected: local server starts on `http://127.0.0.1:8787/`.

If port `8787` is already in use, use:

```bash
wrangler pages dev public --local --port 8788
```

- [ ] **Step 3: Smoke-test host routing locally**

With the local preview running on `8787`, run:

```bash
curl -s -H 'Host: icojf.com' http://127.0.0.1:8787/ | rg 'ICOJF Studio|为中文团队设计、开发、交付可维护的软件产品'
curl -s -H 'Host: icojf.com' http://127.0.0.1:8787/api-integration-development/ | rg 'API 集成开发|香港、新加坡、台湾、日本及海外中文客户'
curl -s -H 'Host: icojf.com' http://127.0.0.1:8787/mvp-saas-development/ | rg 'SaaS MVP 开发|源码'
curl -s -H 'Host: icojf.com' http://127.0.0.1:8787/business-process-automation/ | rg '业务流程自动化开发|运行手册'
curl -s -H 'Host: icojf.com' http://127.0.0.1:8787/contact/ | rg '提交项目简述|验收负责人'
curl -s -H 'Host: pddjf.com' http://127.0.0.1:8787/ | rg 'SignalCraft|TradingView'
```

Expected: every command prints at least one matching line. The `pddjf.com` command must not print ICOJF content.

- [ ] **Step 4: Check production-safe final URL behavior locally**

Run:

```bash
curl -s -I -H 'Host: promotion-mysite.pages.dev' http://127.0.0.1:8787/ | rg '301|Location: https://pddjf.com/'
curl -s -I -H 'Host: www.icojf.com' http://127.0.0.1:8787/?gclid=test | rg '301|Location: https://icojf.com/\\?gclid=test'
curl -s -I -H 'Host: pddjf.com' http://127.0.0.1:8787/icojf/ | rg '404'
```

Expected: Pages preview redirects to `pddjf.com`, `www.icojf.com` redirects to `icojf.com` and preserves query parameters, and `pddjf.com/icojf/` remains a 404.

- [ ] **Step 5: Run browser visual checks**

Use Playwright or the available browser automation tool to inspect these pages at `1440x1000` and `390x844`:

- `https://icojf.com/` or local equivalent with `Host: icojf.com`
- `/api-integration-development/`
- `/mvp-saas-development/`
- `/business-process-automation/`
- `/contact/`

Check:

- No text overlap in hero, navigation, cards, tables, and footer.
- Mobile nav wraps cleanly.
- Buttons do not overflow.
- Build system panel is readable on desktop and stacks on mobile.
- Footer links wrap without collision.
- No page visually resembles `pddjf.com` trading automation content.

- [ ] **Step 6: Fix any visual defects and commit**

If visual QA finds CSS issues, fix the minimal relevant selector in `public/icojf/styles.css`, then run:

```bash
node tools/validate-seo-geo.mjs
```

Commit:

```bash
git add public/icojf/styles.css
git commit -m "Polish icojf responsive layout"
```

If no visual defects are found, do not create an empty commit.

- [ ] **Step 7: Final deploy handoff**

After validation and visual QA pass, the implementation branch is ready for the usual repository flow:

```bash
git status --short
git log --oneline -5
```

Expected:

- Working tree is clean.
- Recent commits include validation guard, homepage redesign, service pages, contact/support pages, and optional responsive polish.

Do not deploy until the user explicitly asks to deploy or the active execution request includes deployment.

## Self-Review

Spec coverage:

- Simplified Chinese product studio positioning is covered by Tasks 1 and 2.
- Region targeting for Hong Kong, Singapore, Taiwan, Japan, and overseas Chinese customers is covered by Tasks 1 through 4.
- Separation from `pddjf.com` and no `pddjf.com/icojf/` final URL is covered by Tasks 1 and 5.
- Homepage product-studio visual direction is covered by Task 2.
- Three service pages with deeper platform-specific content and FAQ are covered by Task 3.
- Contact page lead-quality filter is covered by Task 4.
- SEO/GEO validation and local smoke tests are covered by Tasks 1 and 5.
- Mobile/desktop visual checks are covered by Task 5.

Placeholder scan:

- This plan contains no placeholder tokens or unnamed implementation steps.
- Every file path is explicit.
- Every command has an expected result.

Scope check:

- The work is one bounded static-site redesign of `public/icojf/`.
- No new language version, blog system, backend form, or industry page is included.
