import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public", "icojf");
const site = "https://icojf.com";
const today = "2026-07-02";
const stylesheetHref = "/styles.css?v=20260702-geo";
const contactEmail = "contact@icojf.com";

const sameAs = [
  "https://github.com/yfjelley",
  "https://www.linkedin.com/in/%E9%94%8B-%E6%9D%A8-968956116/"
];

const services = [
  {
    slug: "api-integration-development",
    enSlug: "api-integration-development",
    zhTitle: "API 集成开发",
    enTitle: "API Integration Development",
    title: "API 集成开发 | OAuth、Webhook、数据同步与自动化 | ICOJF Studio",
    description: "ICOJF Studio 提供 API Integration 开发，覆盖 OAuth、API Key、Webhook、Rate Limit、Retry Queue、Audit Log 和 Error Handling；支持中文/英文远程协作。",
    summary: "API integration projects connect third-party systems without hiding permission boundaries, rate limits, retries or handover work.",
    zhIntro: "把支付、CRM、ERP、邮件短信、物流、数据平台和内部系统串接成可追踪、可交接、可维护的业务流程。项目会先确认接口权限、数据字段、失败路径和验收方式，再进入开发。",
    enIntro: "API integration development for teams that need third-party systems connected with clear permissions, retries, audit logs, handover notes and acceptance tests.",
    topics: ["OAuth scopes and redirect URIs", "API key permissions", "Webhook ingestion", "Rate limit handling", "Retry queues", "Audit logs", "Error classification"],
    deliverables: ["接口权限和范围评估", "字段映射和数据同步流程", "Webhook 接收与重试机制", "错误日志、运行手册和验收清单"],
    faqs: [
      ["API 集成开发前最需要什么资料？", "需要目标系统、接口文档、测试账号、字段样例、权限范围、失败处理方式和验收负责人。"],
      ["OAuth 和 API Key 怎么选？", "按第三方平台能力决定。OAuth 更适合用户授权流程，API Key 更适合服务端系统串接，但都要控制权限范围。"],
      ["Webhook 重复推送怎么办？", "用事件 ID、时间窗口、幂等写入、重试队列和审计日志处理，不能假设第三方只推送一次。"],
      ["可以只做一个接口验证吗？", "可以。单接口验证适合先确认权限、字段、限频和失败路径，再决定是否扩展。"],
      ["交付后客户能维护吗？", "交付会包含源码、环境变量说明、接口备注、日志说明、运行手册和验收示例。"]
    ],
    enFaqs: [
      ["What makes an API integration ready to build?", "The API documentation, test credentials, permission scope, sample payloads, field mapping, rate limits and acceptance owner should be known before development."],
      ["Do you handle OAuth and token refresh?", "Yes. OAuth work should include redirect URI review, scope minimization, token storage, refresh behavior, expiry alerts and production/test separation."],
      ["How are webhook duplicates handled?", "The receiver should use event IDs, idempotent writes, replay-safe processing, retry queues and audit logs instead of assuming every event is unique."],
      ["Can this start as a small validation?", "Yes. A single API or single workflow validation is often the best way to prove permissions, field mapping and failure handling before a larger build."],
      ["What is included in handover?", "Source code, environment variable notes, deployment instructions, interface notes, log fields, runbook steps and acceptance examples are included in scope."]
    ]
  },
  {
    slug: "mvp-saas-development",
    enSlug: "saas-mvp-development",
    zhTitle: "SaaS MVP 开发",
    enTitle: "SaaS MVP Development",
    title: "SaaS MVP 开发 | 产品原型、后台、权限与部署 | ICOJF Studio",
    description: "ICOJF Studio 提供 SaaS MVP 开发，覆盖产品范围、用户角色、数据模型、后台管理、部署文档、运行手册和验收清单；支持中文/英文远程协作。",
    summary: "SaaS MVP development should make the first release small enough to launch, test and hand over without losing the core workflow.",
    zhIntro: "把早期产品做成可演示、可试用、可继续迭代的第一版。重点不是一次做完所有功能，而是确认核心用户、核心流程、数据模型、后台权限和第一阶段验收。",
    enIntro: "SaaS MVP development for founders and operators who need a first release that can be tested, deployed, documented and handed over without uncontrolled scope growth.",
    topics: ["Product scope", "User roles", "Data model", "Admin console", "Deployment notes", "Runbook", "Acceptance checklist"],
    deliverables: ["第一阶段产品范围和原型", "用户角色、数据模型和后台流程", "核心页面、后台管理和部署说明", "源码、运行手册和验收清单"],
    faqs: [
      ["SaaS MVP 第一版应该做多大？", "第一版应围绕一个核心用户、一个主流程和可验证的数据对象展开，避免把后续想法都放进同一轮。"],
      ["是否包含后台管理？", "多数 MVP 需要基础后台或管理员视图，用于处理用户、订单、内容、配置或审核流程。"],
      ["能不能先做原型再开发？", "可以。复杂项目建议先做页面流程、数据对象和验收清单，再确认开发范围。"],
      ["交付包含部署吗？", "可以包含部署文档、环境变量说明、上线检查和远程交付讲解，具体按项目范围确认。"],
      ["后续扩展怎么处理？", "第一版会保留清晰数据结构和交接文档，后续按真实使用反馈分阶段扩展。"]
    ],
    enFaqs: [
      ["How small should the first SaaS MVP be?", "The first release should focus on one core user, one primary workflow, explicit data objects and a testable acceptance path."],
      ["Do you include an admin console?", "Most MVPs need a small admin surface for users, records, content, approvals, configuration or support workflows."],
      ["Can the project start with a prototype?", "Yes. A prototype and scope brief can clarify screens, roles, data objects, risks and acceptance criteria before implementation."],
      ["What is included in deployment handover?", "Deployment notes, environment variables, runbook steps, basic operational checks and a walkthrough can be included."],
      ["How do later features get added?", "The first release should leave enough structure and documentation for later iterations based on actual user feedback."]
    ]
  },
  {
    slug: "business-process-automation",
    enSlug: "workflow-automation-development",
    zhTitle: "业务流程自动化开发",
    enTitle: "Workflow Automation Development",
    title: "业务流程自动化开发 | 审批、报表、提醒与内部工具 | ICOJF Studio",
    description: "ICOJF Studio 提供 Workflow Automation 开发，把表格、审批、报表、通知和跨系统同步做成可追踪的内部工具；支持中文/英文远程协作。",
    summary: "Workflow automation should remove repeated manual work while keeping human approval, exception queues and rollback paths where risk remains.",
    zhIntro: "把重复性的表格、审批、提醒、报表和跨系统同步做成可追踪的内部工具。适合已经有稳定流程，但人工复制、催办、汇总或检查成本过高的团队。",
    enIntro: "Workflow automation development for teams that need spreadsheets, approvals, reminders, reports and system sync turned into controlled internal tools.",
    topics: ["Spreadsheet cleanup", "Approval workflows", "Reporting", "Notifications", "Exception queues", "Human review", "Rollback boundaries"],
    deliverables: ["流程拆解和自动化边界", "审批、提醒、报表或数据同步工具", "异常队列、人工复核和日志", "源码、运行手册和交付说明"],
    faqs: [
      ["什么流程适合自动化？", "规则稳定、重复频繁、输入输出清晰、人工检查成本高的流程适合自动化。"],
      ["哪些步骤不应该自动化？", "高风险审批、需要主观判断、缺少数据依据或出错成本很高的步骤应保留人工确认。"],
      ["可以从表格开始吗？", "可以。很多项目先从表格清理、字段规范、导入导出和提醒报表开始。"],
      ["如何处理异常？", "异常应进入人工可见队列，并记录原因、处理人、处理时间和回滚方式。"],
      ["验收看什么？", "验收看输入、处理规则、输出、异常处理、日志、通知和人工确认路径是否按清单工作。"]
    ],
    enFaqs: [
      ["What workflows are good automation candidates?", "Stable, repeated workflows with clear inputs, clear outputs and high manual handling cost are good candidates."],
      ["What should stay manual?", "High-risk approvals, subjective decisions, missing-data cases and irreversible actions should usually keep human review."],
      ["Can we start from spreadsheets?", "Yes. Many projects begin with spreadsheet cleanup, structured fields, imports, exports, reminders and recurring reports."],
      ["How are exceptions handled?", "Exceptions should enter a visible queue with reason, owner, timestamp, resolution state and rollback guidance."],
      ["What does acceptance test?", "Acceptance tests inputs, rule execution, outputs, exception handling, logs, notifications and human approval paths."]
    ]
  }
];

const caseNotes = [
  {
    slug: "case-notes/api-data-sync",
    title: "API 数据同步案例笔记 | 鉴权、字段映射与失败重试 | ICOJF Studio",
    description: "ICOJF Studio 脱敏 API 数据同步案例笔记，说明第三方系统串接中的鉴权、字段映射、限频、失败重试、日志和验收方式。",
    h1: "API 数据同步案例笔记",
    summary: "一个典型 API 数据同步项目不是简单调用接口，而是把鉴权、字段映射、限频、失败重试、日志和交接边界做成可验收流程。",
    sections: [
      ["背景", "客户已经有第三方订单系统和内部后台，但订单、客户资料和状态变更需要人工导出、清洗和导入。人工流程可以运行，但容易出现字段遗漏、重复处理、状态不同步和问题难追踪。项目目标不是替换所有系统，而是把一个稳定的数据同步路径先做成可监控、可回放、可交接的工具。"],
      ["限制", "第三方 API 有权限范围、限频、分页、字段命名差异和失败返回格式。内部后台也有必填字段、枚举值和历史脏数据。开发前必须先确认测试账号、接口文档、样本数据、字段解释和负责人。没有这些资料时，项目只能停留在方案评估。"],
      ["方案", "第一步建立字段映射表，明确每个字段来自哪里、如何转换、缺失时如何处理。第二步实现增量拉取或 webhook 接收，并用外部 ID 做幂等写入。第三步加入重试队列、错误分类、人工复核队列和审计日志。所有失败都要能看到原因，而不是只返回一个同步失败。"],
      ["交付物", "交付包括源码、环境变量样例、接口说明、字段映射表、失败重试说明、日志字段说明、部署文档和验收脚本。客户可以看到哪些记录已同步、哪些记录被跳过、哪些记录等待人工处理。"],
      ["验收方式", "验收不看业务增长结果，而看样本数据能否稳定完成新增、更新、重复事件、缺失字段、接口超时、限频和人工复核路径。只有这些路径都能复现，系统才具备继续扩展到更多字段或更多接口的基础。"]
    ]
  },
  {
    slug: "case-notes/saas-mvp-handover",
    title: "SaaS MVP 交接案例笔记 | 后台、权限、部署与运行手册 | ICOJF Studio",
    description: "ICOJF Studio SaaS MVP 脱敏案例笔记，展示用户角色、后台管理、核心流程、部署文档、运行手册和验收清单。",
    h1: "SaaS MVP 交接案例笔记",
    summary: "SaaS MVP 的关键不是第一版功能越多越好，而是把核心用户、核心流程、后台操作、部署和交接做成可继续迭代的基础。",
    sections: [
      ["背景", "客户希望把一个内部服务流程做成可演示、可试用的 SaaS 第一版。早期需求包含很多想法，但真实阻塞是没有一个能让用户提交资料、团队处理记录、管理员查看状态并完成交接的最小闭环。"],
      ["范围收敛", "项目先把用户分成普通用户、运营人员和管理员三类，只保留注册/登录、资料提交、状态流转、后台审核、通知记录和基础报表。暂缓复杂权限、自动计费、多语言后台和高级分析，避免第一版因为范围过大而无法验收。"],
      ["系统组成", "第一版包含前台表单、用户记录、后台列表、详情页、状态更新、文件/备注字段、基础通知和管理员配置。数据模型优先清晰而不是复杂，字段命名、枚举值和状态迁移写入运行手册。"],
      ["交付物", "交付包括源码、部署文档、环境变量清单、管理员操作说明、数据库字段说明、运行手册和验收清单。客户能按文档启动服务、创建测试账号、走完整流程、查看日志并判断是否需要扩展。"],
      ["验收方式", "验收围绕一个真实样本从提交到处理完成的路径展开，同时验证权限、必填字段、异常输入、后台状态更新、通知记录、部署重启和备份说明。后续需求进入独立迭代清单，而不是继续塞进第一版。"]
    ]
  },
  {
    slug: "case-notes/workflow-automation-review",
    title: "流程自动化案例笔记 | 人工复核、异常队列与回滚 | ICOJF Studio",
    description: "ICOJF Studio 业务流程自动化脱敏案例笔记，说明审批、提醒、报表、人工复核、异常队列、日志和回滚设计。",
    h1: "流程自动化案例笔记",
    summary: "流程自动化不是把所有步骤都变成无人值守，而是把重复步骤系统化，同时保留人工复核、异常队列和回滚方式。",
    sections: [
      ["背景", "客户团队每天从多个表格和系统汇总数据，再人工发送提醒、生成周报和跟进异常。流程长期存在，说明业务规则相对稳定；但人工复制、检查和催办占用时间，也难以追踪哪个环节出错。"],
      ["自动化边界", "项目没有直接取消所有人工判断，而是先区分可自动处理、需要人工确认和必须暂停的步骤。规则明确的数据清洗、提醒和报表可以自动化；金额异常、状态冲突、缺少负责人或可能影响客户体验的动作进入人工队列。"],
      ["方案", "系统按固定时间或人工触发读取数据源，进行字段规范、规则检查、状态更新和报表生成。每条记录都会写入处理状态、异常原因和操作时间。异常队列提供人工复核入口，处理完成后可以继续流程或回滚到上一步。"],
      ["交付物", "交付包括自动化脚本或内部工具、配置文件、字段说明、异常队列、日志说明、运行方式、提醒模板和回滚步骤。客户不需要阅读源码也能判断系统运行到哪一步，失败原因是什么。"],
      ["验收方式", "验收用一批脱敏样本覆盖正常、缺字段、重复、状态冲突、需要人工确认和回滚场景。系统通过这些测试后，再进入小范围真实流程，而不是一次性替换全部人工操作。"]
    ]
  }
];

const notes = [
  {
    slug: "engineering-notes/oauth-integration-checklist",
    title: "OAuth Integration Checklist | Permissions, Tokens and Handover | ICOJF Studio",
    description: "A practical OAuth integration checklist covering scopes, redirect URIs, token refresh, permission boundaries, production separation, logging, and handover.",
    h1: "OAuth Integration Checklist",
    summary: "OAuth integration work should be scoped around permissions, token lifecycle, environment separation, error handling and operational handover, not only the first successful authorization.",
    sections: [
      ["Before development", "Start by listing the product surface that truly needs OAuth access. The integration should identify the provider, application type, redirect URI, requested scopes, account owner, test account, production owner and revocation path. If the scope list is broad because the team is unsure what the workflow needs, pause and reduce the requested access. A maintainable OAuth integration asks for the minimum practical permission set and records why each scope exists."],
      ["Token handling", "Token storage and refresh behavior should be designed before the first production authorization. The system needs to know where access tokens are stored, how refresh tokens are rotated, how expiry is detected, what happens when refresh fails and who receives the reauthorization alert. Do not treat a successful callback as completion. The accepted workflow should include initial authorization, refresh, revoked access, expired tokens, invalid scopes and provider downtime."],
      ["Security boundary", "OAuth secrets should stay in server-side environment variables or a managed secret store. Redirect URIs should be exact, production and test applications should be separated when the provider supports it and logs should avoid writing tokens or authorization codes. The handover notes should state who owns the provider application, who can rotate credentials and how to disable access if the integration is no longer used."],
      ["Acceptance examples", "Useful acceptance tests include authorizing a test account, calling the minimum required endpoint, refreshing an expired token, handling a revoked token, rejecting an unexpected callback state, logging provider errors and showing the reauthorization message. These tests prove the lifecycle around OAuth, not only the first happy path."],
      ["Handover", "A clean handover includes source code, environment variable names, provider dashboard notes, redirect URI list, requested scopes, token storage notes, refresh behavior, log fields, reauthorization steps and an owner checklist. If a future operator can rotate credentials and restore access without guessing, the OAuth work is maintainable."]
    ]
  },
  {
    slug: "engineering-notes/webhook-retry-idempotency",
    title: "Webhook Retry and Idempotency | Duplicate Events and Audit Logs | ICOJF Studio",
    description: "Webhook retry and idempotency design notes for duplicate events, replay, event ordering, failure queues, audit logs, and acceptance testing.",
    h1: "Webhook Retry and Idempotency",
    summary: "A webhook receiver should expect duplicate, delayed, reordered and retried events, then make every accepted, rejected and replayed event visible in logs.",
    sections: [
      ["Core design", "A webhook endpoint should validate the sender, parse the payload, create or read a stable event identifier and store the event before side effects are attempted. The event identifier may come from the provider or from a deterministic combination of provider, object ID, event type and timestamp. Without that identifier, duplicate prevention becomes guesswork and operational support becomes difficult."],
      ["Failure handling", "Providers retry webhooks for good reasons: network failures, server errors and timeout responses. The receiver should respond quickly after durable acceptance, then process longer work asynchronously when possible. If downstream work fails, the event should enter a retry or exception queue with a visible status. Silent failures are more dangerous than explicit rejects because the business owner cannot tell whether the event was ignored or lost."],
      ["Ordering and state", "Webhook event order is not always reliable. The application should avoid assuming that events arrive in business order unless the provider explicitly guarantees it. In many systems, each event should trigger a fresh read of the source object or update a versioned state machine. This reduces problems where an older event overwrites a newer status."],
      ["Audit logs", "Logs should include provider, event ID, received time, payload type, validation result, duplicate status, processing status, downstream request ID and error class. Sensitive secrets should never be logged. The log is part of the product, because support teams need to answer what happened to a specific event without reading raw server traces."],
      ["Acceptance tests", "Acceptance should replay the same event twice, send malformed payloads, send valid events out of order, simulate downstream API failure, run a retry and show the operator where each event status appears. If these paths work, the webhook receiver can survive normal provider behavior."]
    ]
  },
  {
    slug: "engineering-notes/saas-mvp-scope-control",
    title: "SaaS MVP Scope Control | First Release Acceptance | ICOJF Studio",
    description: "A SaaS MVP scope control note covering first-release boundaries, user roles, data objects, admin workflows, deployment, runbooks, and acceptance criteria.",
    h1: "SaaS MVP Scope Control",
    summary: "A useful SaaS MVP ships a small complete workflow with clear users, data objects, admin actions and handover notes instead of a broad unfinished feature list.",
    sections: [
      ["Start with one workflow", "The first release should prove one core workflow end to end. That usually means one primary user, one reason to submit or change data, one internal review path and one visible completion state. If the team cannot describe the first workflow in a short paragraph, design work should continue before development starts."],
      ["Define the data model", "MVP scope becomes easier when the first data objects are named clearly. Define the user, account, project, request, order, file, message or approval objects that matter to the first workflow. For each object, record required fields, optional fields, states and who can change them. This prevents page design from drifting away from operational reality."],
      ["Admin workflow", "Most early SaaS products need an internal surface before they need advanced public features. Admin users need to view records, change status, correct mistakes, export data and handle support cases. A small admin workflow often creates more value than another marketing-facing screen because it makes the product usable after launch."],
      ["Acceptance criteria", "Acceptance should be written as paths: create account, submit record, update state, handle missing field, view admin list, export or inspect logs and restart the application. The criteria should not depend on future user growth, investor interest or revenue outcomes. Software acceptance checks whether the agreed system behavior exists."],
      ["Handover boundary", "A scoped MVP should include source code, deployment notes, environment variables, account ownership, seed data, runbook steps and a backlog of deferred items. The backlog matters because it makes later ideas visible without allowing them to destabilize the first release."]
    ]
  },
  {
    slug: "engineering-notes/workflow-automation-human-approval",
    title: "Workflow Automation With Human Approval | Controls and Rollback | ICOJF Studio",
    description: "Workflow automation guidance for deciding which steps should remain manual, how approval is recorded, and how exception queues and rollback work.",
    h1: "Workflow Automation With Human Approval",
    summary: "Workflow automation is strongest when repetitive steps are automated while irreversible, ambiguous or high-risk decisions keep human approval and audit trails.",
    sections: [
      ["What can be automatic", "Stable transformations, scheduled reminders, recurring reports, field normalization, duplicate checks and low-risk status updates are usually good automation candidates. These steps have clear inputs and predictable outputs. They should be made visible through logs and summaries so operators can trust the process."],
      ["What should stay reviewed", "Ambiguous records, high-value approvals, customer-visible decisions, irreversible actions and data conflicts should usually remain manual or require explicit confirmation. Automation should make the review easier by preparing context, highlighting differences and recording the decision, not by hiding uncertainty."],
      ["Approval design", "A useful approval step records who approved, what they saw, what changed, when it happened and whether the action can be reversed. Approval screens should show enough context to make the decision credible. If an operator has to open three external systems to understand the record, the automation has not reduced enough work."],
      ["Exception queue", "Every automation needs a place for records that do not fit the normal path. The exception queue should include reason, source record, suggested action, owner, status and deadline. This turns failures into work items instead of invisible errors."],
      ["Rollback boundary", "Some actions can be reversed automatically, some need manual correction and some cannot be reversed. The runbook should state which category each action belongs to. Acceptance should test at least one rollback or correction path so the team understands what happens after a mistake."]
    ]
  },
  {
    slug: "engineering-notes/api-integration-handover-checklist",
    title: "API Integration Handover Checklist | Source, Runbook and Acceptance | ICOJF Studio",
    description: "API integration handover checklist covering source code, deployment docs, environment variables, logs, runbook, acceptance examples, and maintenance ownership.",
    h1: "API Integration Handover Checklist",
    summary: "API integration handover should leave the client with code, configuration notes, operational logs, known limits and acceptance examples they can actually use.",
    sections: [
      ["Delivery assets", "The handover package should include source code, dependency notes, environment variable examples, deployment instructions, provider application notes, API permission summary and sample payloads. If the integration depends on a third-party dashboard, the owner and access path should be documented."],
      ["Operational notes", "A maintainable integration explains how to start, stop, restart and verify the service. It should note scheduled jobs, webhook endpoints, queues, database tables, log files, alert destinations and common provider failures. These notes prevent the integration from becoming developer-only knowledge."],
      ["Logs and audit fields", "Logs should answer which event or request was processed, which external system was called, what result was returned, whether a retry is pending and what the operator should do. Secrets, tokens and private customer data should not be written into public logs or screenshots."],
      ["Acceptance examples", "The handover should include sample acceptance cases: successful sync, duplicate event, missing required field, provider rate limit, invalid credentials, revoked authorization and manual retry. These examples are more useful than a vague statement that the integration was tested."],
      ["Maintenance ownership", "Every integration has an owner after delivery. The client should know who can rotate credentials, who receives alerts, who controls provider access and what changes require a new development scope. Clear ownership reduces emergency work when a provider changes an API or permission model."]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${content.trim()}\n`, "utf8");
}

function urlFor(slug = "") {
  return slug ? `${site}/${slug.replace(/^\/|\/$/g, "")}/` : `${site}/`;
}

function nav(language = "zh-CN") {
  const en = language === "en";
  const links = en
    ? [["/en/api-integration-development/", "API"], ["/en/saas-mvp-development/", "SaaS MVP"], ["/en/workflow-automation-development/", "Automation"], ["/engineering-notes/", "Notes"], ["/about/", "About"]]
    : [["/api-integration-development/", "API 集成"], ["/mvp-saas-development/", "SaaS MVP"], ["/business-process-automation/", "业务自动化"], ["/case-notes/", "案例笔记"], ["/engineering-notes/", "工程笔记"], ["/about/", "关于"]];
  return `<header class="site-header">
    <a class="brand" href="${en ? "/en/" : "/"}" aria-label="ICOJF Studio home">
      <span class="brand-mark" aria-hidden="true">I</span><span>ICOJF Studio</span>
    </a>
    <nav class="nav" aria-label="${en ? "Main navigation" : "主导航"}">
      ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
      <a class="nav-cta" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a>
    </nav>
  </header>`;
}

function footer(language = "zh-CN") {
  const en = language === "en";
  return `<footer class="footer">
    <p><strong>ICOJF Studio</strong> ${en ? "software product studio for SaaS MVPs, API integrations, workflow automation and internal tools" : "软件产品工作室、API 集成与业务自动化开发"}</p>
    <nav class="footer-links" aria-label="${en ? "Footer navigation" : "页脚导航"}">
      <a href="/api-integration-development/">API 集成</a>
      <a href="/mvp-saas-development/">SaaS MVP</a>
      <a href="/business-process-automation/">业务自动化</a>
      <a href="/en/">English</a>
      <a href="/case-notes/">案例笔记</a>
      <a href="/engineering-notes/">工程笔记</a>
      <a href="/about/">关于</a>
      <a href="/terms">服务条款</a>
      <a href="/privacy">隐私政策</a>
      <a href="/contact/">联系</a>
    </nav>
  </footer>`;
}

function orgGraph() {
  return {
    "@type": "Organization",
    "@id": `${site}/#organization`,
    "name": "ICOJF Studio",
    "url": `${site}/`,
    "logo": `${site}/favicon.svg`,
    "email": contactEmail,
    "sameAs": sameAs,
    "knowsAbout": ["SaaS MVP development", "API integration", "workflow automation", "internal tools", "data dashboards", "software product handover"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": contactEmail,
      "availableLanguage": ["zh-CN", "en"]
    }
  };
}

function layout({ title, description, canonical, language = "zh-CN", body, graph, extraHead = "" }) {
  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="zh-CN" href="${canonical.replace(`${site}/en/`, `${site}/`).replace(`${site}/saas-mvp-development/`, `${site}/mvp-saas-development/`).replace(`${site}/workflow-automation-development/`, `${site}/business-process-automation/`)}">
  <link rel="alternate" hreflang="en" href="${canonical.includes("/en/") ? canonical : `${site}/en/`}">
  <link rel="alternate" hreflang="x-default" href="${site}/">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${stylesheetHref}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta name="theme-color" content="#0f172a">
${extraHead ? `  ${extraHead}\n` : ""}  <script type="application/ld+json">
${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}
  </script>
</head>
<body>
  ${nav(language)}
  <main>${body}</main>
  ${footer(language)}
</body>
</html>`;
}

function factsTable(rows) {
  return `<table class="facts-table"><tbody>${rows.map(([a, b]) => `<tr><th>${escapeHtml(a)}</th><td>${escapeHtml(b)}</td></tr>`).join("")}</tbody></table>`;
}

function home(language = "zh-CN") {
  const en = language === "en";
  const canonical = en ? `${site}/en/` : `${site}/`;
  const title = en ? "Software Product Studio | SaaS MVP, API Integration and Workflow Automation | ICOJF Studio" : "软件产品工作室 | SaaS MVP、API 集成与业务自动化 | ICOJF Studio";
  const description = en ? "ICOJF Studio builds SaaS MVPs, API integrations, workflow automation and internal tools with source code, runbooks, deployment notes and acceptance checklists." : "ICOJF Studio 是软件产品工作室，提供 SaaS MVP、API Integration、Workflow Automation 和企业内部工具开发；支持中文/英文远程协作。";
  const graph = [
    orgGraph(),
    { "@type": "WebSite", "@id": `${site}/#website`, "url": `${site}/`, "name": "ICOJF Studio", "publisher": { "@id": `${site}/#organization` }, "inLanguage": language },
    {
      "@type": "ProfessionalService",
      "@id": `${site}/#service`,
      "name": "Software Product Studio",
      "url": `${site}/`,
      "provider": { "@id": `${site}/#organization` },
      "areaServed": ["Remote", "Hong Kong", "Singapore", "Taiwan", "United States"],
      "serviceType": services.map((service) => service.enTitle),
      "priceRange": "USD 2,000 - 20,000",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ICOJF Studio service catalog",
        "itemListElement": services.map((service) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.enTitle,
            "url": urlFor(en ? `en/${service.enSlug}` : service.slug),
            "description": service.summary
          }
        }))
      }
    }
  ];
  const body = `<section class="hero studio-hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Software Product Studio</p>
        <h1 id="hero-title">${en ? "Build software that can launch, be accepted, and be maintained." : "交付可上线、可验收、可维护的软件产品。"}</h1>
        <p class="hero-lede">${en ? "ICOJF Studio builds SaaS MVPs, API integrations, workflow automation and internal tools for remote Chinese and English collaboration. The work focuses on scoped delivery, operational handover and acceptance evidence." : "ICOJF Studio 提供 SaaS MVP、API Integration、Workflow Automation 与企业内部工具开发，支持中文/英文远程协作。重点不是堆功能，而是交付能运行、可验收、可维护的系统。"}</p>
        <div class="hero-actions"><a class="button primary" href="/contact/">${en ? "Start a build brief" : "提交项目简述"}</a><a class="button secondary" href="${en ? "/en/api-integration-development/" : "#capabilities"}">${en ? "View services" : "查看服务能力"}</a></div>
        <div class="hero-tags" aria-label="Core services"><span>SaaS MVP</span><span>API Integration</span><span>Workflow Automation</span><span>Internal Tools</span></div>
      </div>
      <div class="build-system-panel premium-panel" aria-label="Delivery model">
        <div class="panel-head"><strong>${en ? "Delivery model" : "项目交付模型"}</strong><span class="status">Scoped handover</span></div>
        <div class="system-preview-grid"><div class="workflow-card signal-card"><span class="mini-label">Workflow</span><div class="workflow-lane"><span>01</span>${en ? "Scope and prototype" : "需求拆解与原型"}</div><div class="workflow-lane"><span>02</span>${en ? "API / data flow" : "API / 数据流程设计"}</div><div class="workflow-lane"><span>03</span>${en ? "Launch and handover" : "上线、文档、交接"}</div></div><div class="handover-card deliverable-card"><span class="mini-label">${en ? "Assets" : "交付范围"}</span><div class="progress-track"><span style="width:72%"></span></div><p>MVP / 4-8 weeks</p><div class="artifact-list"><span><strong>Source Code</strong>${en ? "Code" : "源码"}</span><span><strong>Deploy Docs</strong>${en ? "Docs" : "部署文档"}</span><span><strong>Runbook</strong>${en ? "Runbook" : "运行手册"}</span><span><strong>Acceptance</strong>${en ? "Checklist" : "验收清单"}</span></div></div></div>
      </div>
    </section>
    <section id="capabilities" class="section" aria-labelledby="capabilities-title">
      <div class="section-head"><p class="eyebrow">Capabilities</p><h2 id="capabilities-title">${en ? "Services" : "服务能力"}</h2><p>${en ? "Each project starts with business context, system boundaries, customer inputs and acceptance criteria." : "每个项目先确认业务目标、系统边界、客户需提供资料和验收方式，再进入原型或开发。"}</p></div>
      <div class="service-grid">${services.map((service, i) => `<article class="service-card accent-${["blue", "green", "amber"][i]}"><span class="card-index">0${i + 1}</span><h3>${en ? service.enTitle : service.zhTitle}</h3><p>${escapeHtml(en ? service.summary : service.zhIntro)}</p><a href="${en ? `/en/${service.enSlug}/` : `/${service.slug}/`}">${en ? "View service" : "查看服务"}</a></article>`).join("")}</div>
    </section>
    <section class="section soft" aria-labelledby="facts-title"><div class="section-head"><p class="eyebrow">Service Facts</p><h2 id="facts-title">${en ? "Project facts summary" : "项目事实摘要"}</h2></div>${factsTable(en ? [["Service model", "Remote software product studio for SaaS MVPs, API integrations, workflow automation and internal tools."], ["Deliverables", "Source code, deployment documentation, runbook, interface notes, log notes, acceptance checklist and handover walkthrough."], ["Boundaries", "No financing promises, advertising ROI promises, platform approval promises, custody or ownerless projects."], ["Languages", "Chinese and English remote collaboration."]] : [["服务对象", "支持中文/英文远程协作；适合创业团队、运营团队、中小企业和需要外部产品开发能力的业务负责人。"], ["主要交付物", "源码、部署文档、运行手册、接口说明、环境变量清单、日志说明、验收清单和远程交付讲解。"], ["常见项目", "SaaS MVP、API Integration、Workflow Automation、企业内部工具、数据看板和第三方系统串接。"], ["不承诺事项", "不承诺融资、拉新、广告 ROI、平台审核结果、第三方 API 永久可用或没有验收标准的纯想法落地。"]])}</section>
    <section class="section" aria-labelledby="entity-title"><div class="section-head"><p class="eyebrow">Trust & Entity</p><h2 id="entity-title">${en ? "Public entity and delivery boundary" : "公开实体与交付边界"}</h2><p>${en ? "ICOJF keeps its own brand, canonical URLs, sitemap, robots policy and page copy for software product services." : "ICOJF 在品牌、canonical、sitemap、robots 和页面内容上保持独立的软件产品服务定位。"}</p></div><div class="check-grid"><article class="check-card"><h3>GitHub</h3><p>${en ? "Public engineering profile signal for software delivery and source handover expectations." : "公开工程资料信号，用于支撑软件交付和源码交接能力。"}</p><a href="https://github.com/yfjelley" rel="me noopener" target="_blank">GitHub profile</a></article><article class="check-card"><h3>LinkedIn</h3><p>${en ? "External identity reference for remote collaboration and service boundary consistency." : "站外身份资料，用于保持远程协作和服务边界口径一致。"}</p><a href="${sameAs[1]}" rel="me noopener" target="_blank">LinkedIn profile</a></article><article class="check-card"><h3>${en ? "About ICOJF" : "关于 ICOJF"}</h3><p>${en ? "Service scope, handover assets, project fit and what the studio does not accept." : "服务范围、交付资产、适合项目和不适合项目的明确说明。"}</p><a href="/about/">${en ? "Read about page" : "查看关于页"}</a></article></div></section>
    <section class="section soft" aria-labelledby="notes-title"><div class="section-head"><p class="eyebrow">Engineering Notes</p><h2 id="notes-title">${en ? "Engineering notes for AI and search extraction" : "工程笔记"}</h2><p>${en ? "Long-form notes explain how the studio handles integration boundaries, handover and acceptance." : "用英文工程文章解释 API 集成、Webhook、SaaS MVP 和业务自动化里的真实边界。"}</p></div><div class="article-grid">${notes.slice(0, 3).map((note) => `<article class="article-card"><h3>${note.h1}</h3><p>${note.summary}</p><a href="/${note.slug}/">Read note</a></article>`).join("")}</div></section>
    <section class="section soft" aria-labelledby="contact-title"><div class="contact-band"><div class="section-head"><p class="eyebrow">Start a Build Brief</p><h2 id="contact-title">${en ? "Send the project context first." : "提交项目简述"}</h2><p>${en ? "Share existing systems, users, integrations, budget range, timeline and acceptance owner." : "发来项目背景、现有系统、目标用户、需要集成的平台、预算范围和期望上线时间。"}</p><div class="cta-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="mailto:${contactEmail}">Email</a></div></div></div></section>`;
  return layout({ title, description, canonical, language, body, graph });
}

function servicePage(service, language = "zh-CN") {
  const en = language === "en";
  const slug = en ? `en/${service.enSlug}` : service.slug;
  const canonical = urlFor(slug);
  const title = en ? `${service.enTitle} | Scoped Build, Handover and Acceptance | ICOJF Studio` : service.title;
  const description = en ? `${service.enTitle} by ICOJF Studio, covering scope, inputs, delivery assets, acceptance checks, runbooks and remote handover.` : service.description;
  const graph = [
    orgGraph(),
    { "@type": "WebPage", "@id": `${canonical}#webpage`, "url": canonical, "name": en ? service.enTitle : service.zhTitle, "description": description, "inLanguage": language, "isPartOf": { "@id": `${site}/#website` } },
    { "@type": "Service", "@id": `${canonical}#service`, "name": service.enTitle, "description": service.summary, "serviceType": service.enTitle, "provider": { "@id": `${site}/#organization` }, "areaServed": ["Remote", "Hong Kong", "Singapore", "Taiwan", "United States"] },
    { "@type": "FAQPage", "@id": `${canonical}#faq`, "mainEntity": (en ? service.enFaqs : service.faqs).map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": en ? "Home" : "首页", "item": en ? `${site}/en/` : `${site}/` }, { "@type": "ListItem", "position": 2, "name": en ? service.enTitle : service.zhTitle, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${en ? "/en/" : "/"}">${en ? "Home" : "首页"}</a><span>/</span><span>${escapeHtml(en ? service.enTitle : service.zhTitle)}</span></nav><p class="eyebrow">Service</p><h1>${escapeHtml(en ? service.enTitle : service.zhTitle)}</h1><p class="hero-lede">${escapeHtml(en ? service.enIntro : service.zhIntro)}</p><div class="hero-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="#faq">FAQ</a></div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Service Facts</p><h2>${en ? "Inputs, deliverables and acceptance" : "资料、交付物和验收"}</h2></div>${factsTable(en ? [["Positioning", "Software Product Studio"], ["Typical inputs", service.topics.join(", ")], ["Delivery assets", "Source code, deployment documentation, runbook, environment variables, logs and acceptance checklist."], ["Acceptance", "Acceptance is based on agreed workflow behavior, not financing, growth or third-party approval outcomes."], ["Handover", "Remote walkthrough, owner checklist and maintenance notes."]] : [["定位", "Software Product Studio"], ["常见输入", service.topics.join("、")], ["交付资产", `${service.deliverables.join("；")}；验收清单`], ["验收方式", "按约定功能、接口路径、日志、异常处理、部署文档和交接清单验收。"], ["合作边界", "不承诺融资、广告 ROI、平台审核结果或第三方 API 永久可用。"]])}</section>
  <section class="section"><div class="section-head"><p class="eyebrow">Scope</p><h2>${en ? "What the build usually covers" : "常见开发范围"}</h2></div><div class="check-grid">${service.topics.map((topic) => `<article class="check-card"><h3>${escapeHtml(topic)}</h3><p>${escapeHtml(en ? `The project defines how ${topic.toLowerCase()} affects implementation, operations and acceptance.` : `项目会确认 ${topic} 对实现、运行和验收的影响。`)}</p></article>`).join("")}</div></section>
  <section id="faq" class="section faq-section"><div class="section-head centered"><p class="eyebrow">FAQ</p><h2>FAQ</h2></div><div class="faq-list">${(en ? service.enFaqs : service.faqs).map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>
  <section class="section soft"><div class="contact-band"><div class="section-head"><p class="eyebrow">Contact</p><h2>${en ? "Send the project brief." : "发送项目简述"}</h2><p>${en ? "Include context, existing systems, required integrations, budget range, timeline and acceptance owner." : "请附上项目背景、现有系统、接口资料、预算范围、上线时间和验收负责人。"}</p><div class="cta-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="mailto:${contactEmail}">${contactEmail}</a></div></div></div></section>`;
  return layout({ title, description, canonical, language, body, graph });
}

function notePage(note) {
  const canonical = urlFor(note.slug);
  const graph = [
    orgGraph(),
    { "@type": "TechArticle", "@id": `${canonical}#article`, "headline": note.h1, "description": note.description, "url": canonical, "author": { "@id": `${site}/#organization` }, "publisher": { "@id": `${site}/#organization` }, "datePublished": today, "dateModified": today, "inLanguage": "en", "about": ["API integration", "SaaS MVP", "workflow automation", "software handover"] },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": `${site}/` }, { "@type": "ListItem", "position": 2, "name": "Engineering Notes", "item": `${site}/engineering-notes/` }, { "@type": "ListItem", "position": 3, "name": note.h1, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/engineering-notes/">Engineering Notes</a></nav><p class="eyebrow">Engineering Note</p><h1>${escapeHtml(note.h1)}</h1><p class="hero-lede">${escapeHtml(note.summary)}</p></section><section class="section content-band"><article class="technical-article"><p class="article-summary">${escapeHtml(note.summary)}</p>${note.sections.map(([h, p]) => `<section><h2>${escapeHtml(h)}</h2><p>${escapeHtml(p)}</p></section>`).join("")}<section><h2>Related service</h2><p>These notes support ICOJF Studio service pages for API integration, SaaS MVP development and workflow automation.</p><div class="policy-links">${services.map((service) => `<a href="/en/${service.enSlug}/">${service.enTitle}</a>`).join("")}</div></section></article></section>`;
  return layout({ title: note.title, description: note.description, canonical, language: "en", body, graph });
}

function casePage(note) {
  const canonical = urlFor(note.slug);
  const graph = [
    orgGraph(),
    { "@type": "Article", "@id": `${canonical}#article`, "headline": note.h1, "description": note.description, "url": canonical, "author": { "@id": `${site}/#organization` }, "publisher": { "@id": `${site}/#organization` }, "datePublished": today, "dateModified": today, "inLanguage": "zh-CN" },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": `${site}/` }, { "@type": "ListItem", "position": 2, "name": "案例笔记", "item": `${site}/case-notes/` }, { "@type": "ListItem", "position": 3, "name": note.h1, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><a href="/case-notes/">案例笔记</a></nav><p class="eyebrow">Case Note</p><h1>${escapeHtml(note.h1)}</h1><p class="hero-lede">${escapeHtml(note.summary)}</p></section><section class="section content-band"><article class="technical-article"><p class="article-summary">${escapeHtml(note.summary)}</p>${note.sections.map(([h, p]) => `<section><h2>${escapeHtml(h)}</h2><p>${escapeHtml(p)}</p></section>`).join("")}<section><h2>适合参考</h2><p>这类笔记适合用于判断项目范围、验收方式和交付边界，不展示客户身份、商业结果或不可验证承诺。</p></section></article></section>`;
  return layout({ title: note.title, description: note.description, canonical, language: "zh-CN", body, graph });
}

function indexPage({ slug, title, description, h1, intro, items, language = "zh-CN" }) {
  const canonical = urlFor(slug);
  const graph = [orgGraph(), { "@type": "CollectionPage", "@id": `${canonical}#webpage`, "url": canonical, "name": h1, "description": description, "inLanguage": language }];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${language === "en" ? "/en/" : "/"}">${language === "en" ? "Home" : "首页"}</a><span>/</span><span>${escapeHtml(h1)}</span></nav><p class="eyebrow">Index</p><h1>${escapeHtml(h1)}</h1><p class="hero-lede">${escapeHtml(intro)}</p></section><section class="section content-band"><div class="article-grid">${items.map((item) => `<article class="article-card"><h3>${escapeHtml(item.h1 || item.enTitle || item.zhTitle)}</h3><p>${escapeHtml(item.summary || item.description)}</p><a href="/${item.slug || `en/${item.enSlug}`}/">${language === "en" ? "Read" : "查看"}</a></article>`).join("")}</div></section>`;
  return layout({ title, description, canonical, language, body, graph });
}

function aboutPage() {
  const canonical = urlFor("about");
  const title = "关于 ICOJF Studio | 软件产品工作室、API 集成与业务自动化";
  const description = "关于 ICOJF Studio：远程软件产品工作室，提供 SaaS MVP、API Integration、Workflow Automation、内部工具、源码交付、部署文档和运行手册。";
  const graph = [
    orgGraph(),
    { "@type": "AboutPage", "@id": `${canonical}#webpage`, "url": canonical, "name": "关于 ICOJF Studio", "description": description, "inLanguage": "zh-CN", "about": { "@id": `${site}/#organization` } }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><span>关于</span></nav><p class="eyebrow">About</p><h1>关于 ICOJF Studio</h1><p class="hero-lede">ICOJF Studio 是远程软件产品工作室，专注 SaaS MVP、API Integration、Workflow Automation、企业内部工具和数据看板。项目以源码、部署文档、运行手册、验收清单和远程交付讲解为核心资产。</p></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Entity Facts</p><h2>公开实体资料</h2></div>${factsTable([["品牌", "ICOJF Studio"], ["网站", "https://icojf.com/"], ["联系邮箱", contactEmail], ["服务语言", "中文/英文远程协作"], ["服务范围", "SaaS MVP、API Integration、Workflow Automation、内部工具、数据看板和第三方系统集成"], ["交付物", "源码、部署文档、运行手册、接口说明、日志说明、验收清单和远程交付讲解"], ["边界", "不承诺融资、广告 ROI、平台审核结果、资金托管或没有验收负责人的项目"]])}</section>
  <section class="section"><div class="section-head"><p class="eyebrow">Trust</p><h2>站外资料和交付边界</h2></div><div class="check-grid"><article class="check-card"><h3>GitHub</h3><p>用于连接公开工程资料、源码交付能力和技术背景。</p><a href="${sameAs[0]}" rel="me noopener" target="_blank">GitHub profile</a></article><article class="check-card"><h3>LinkedIn</h3><p>用于保持站外身份、服务边界和远程协作信息一致。</p><a href="${sameAs[1]}" rel="me noopener" target="_blank">LinkedIn profile</a></article><article class="check-card"><h3>项目筛选</h3><p>适合有明确负责人、验收标准、资料来源和预算边界的软件产品项目。</p><a href="/contact/">提交项目简述</a></article></div></section>`;
  return layout({ title, description, canonical, language: "zh-CN", body, graph });
}

function contactPage() {
  const canonical = urlFor("contact");
  const title = "提交项目简述 | ICOJF Studio 软件产品工作室";
  const description = "联系 ICOJF Studio，提交 SaaS MVP、API Integration、Workflow Automation 或企业内部工具开发项目简述；支持中文/英文远程协作。";
  const graph = [orgGraph(), { "@type": "ContactPage", "@id": `${canonical}#webpage`, "url": canonical, "name": "提交项目简述", "description": description, "inLanguage": "zh-CN" }];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><span>联系</span></nav><p class="eyebrow">Contact</p><h1>提交项目简述</h1><p class="hero-lede">ICOJF Studio 是 Software Product Studio。请发来项目背景、现有系统、目标用户、需要集成的平台、预算范围、期望上线时间和验收负责人。</p></section><section class="section content-band"><div class="answer-grid"><article><h3>联系方式</h3><p><a href="mailto:${contactEmail}">${contactEmail}</a></p><p>项目交付通常围绕源码、部署文档、运行手册、验收清单和远程讲解展开。</p></article><article><h3>请尽量附上</h3><ul class="check-list"><li>项目目标和当前阻塞点。</li><li>现有系统、表格或接口文档。</li><li>第一阶段必须上线的核心功能。</li><li>预算范围、上线时间和验收负责人。</li></ul></article></div></section>`;
  return layout({ title, description, canonical, language: "zh-CN", body, graph });
}

function policyPage(kind) {
  const isTerms = kind === "terms";
  const canonical = `${site}/${kind}`;
  const title = isTerms ? "服务条款 | ICOJF Studio" : "隐私政策 | ICOJF Studio";
  const description = isTerms ? "ICOJF Studio 软件产品开发服务条款，说明合作范围、付款、验收、变更、源码交付和第三方平台责任边界。" : "ICOJF Studio 隐私政策，说明软件产品开发项目沟通、需求资料、联系信息和网站统计数据的使用方式。";
  const h1 = isTerms ? "服务条款" : "隐私政策";
  const sections = isTerms
    ? [["服务范围", "每个项目以双方确认的需求、交付物、验收清单和时间安排为准。"], ["客户责任", "客户需提供必要资料、接口权限、测试账号、负责人和验收反馈。"], ["第三方平台", "第三方 API、SaaS 平台、云服务和审核结果由对应平台决定。"], ["交付", "交付可包含源码、部署文档、运行手册、环境变量说明、日志说明和远程讲解。"]]
    : [["资料使用", "项目沟通资料仅用于需求评估、报价、开发、交付和后续支持。"], ["联系信息", "邮箱和项目联系方式用于回复咨询、推进项目和发送必要交付信息。"], ["数据保留与删除", "可通过联系邮箱请求删除不再需要的项目沟通资料。"], ["第三方服务", "网站可能使用托管、DNS、安全或基础统计服务。"]];
  const graph = [orgGraph(), { "@type": "WebPage", "@id": `${canonical}#webpage`, "url": canonical, "name": h1, "description": description, "inLanguage": "zh-CN" }];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><span>${h1}</span></nav><p class="eyebrow">Policy</p><h1>${h1}</h1><p class="hero-lede">${description}</p></section><section class="section content-band"><div class="detail-grid">${sections.map(([head, text]) => `<article><h3>${head}</h3><p>${text}</p></article>`).join("")}</div></section>`;
  return layout({ title, description, canonical, language: "zh-CN", body, graph });
}

const allUrls = [
  ["", "weekly", "1.0"],
  ["en", "weekly", "0.95"],
  ...services.map((service) => [service.slug, "monthly", "0.9"]),
  ...services.map((service) => [`en/${service.enSlug}`, "monthly", "0.85"]),
  ["about", "monthly", "0.75"],
  ["contact", "monthly", "0.7"],
  ["case-notes", "monthly", "0.8"],
  ...caseNotes.map((note) => [note.slug, "monthly", "0.8"]),
  ["engineering-notes", "monthly", "0.8"],
  ...notes.map((note) => [note.slug, "monthly", "0.78"]),
  ["terms", "yearly", "0.4"],
  ["privacy", "yearly", "0.4"]
];

write(join(publicDir, "index.html"), home());
write(join(publicDir, "en", "index.html"), home("en"));
for (const service of services) {
  write(join(publicDir, service.slug, "index.html"), servicePage(service));
  write(join(publicDir, "en", service.enSlug, "index.html"), servicePage(service, "en"));
}
write(join(publicDir, "case-notes", "index.html"), indexPage({ slug: "case-notes", title: "脱敏案例笔记 | API 集成、SaaS MVP 与流程自动化 | ICOJF Studio", description: "ICOJF Studio 脱敏案例笔记，展示 API 数据同步、SaaS MVP 交付和业务流程自动化项目的背景、限制、方案、交付物和验收方式。", h1: "脱敏案例笔记", intro: "第一阶段使用脱敏案例笔记，不夸大商业结果，只展示问题、限制、架构、交付物和验收方式。", items: caseNotes }));
for (const note of caseNotes) write(join(publicDir, note.slug, "index.html"), casePage(note));
write(join(publicDir, "engineering-notes", "index.html"), indexPage({ slug: "engineering-notes", title: "Engineering Notes | API Integration and SaaS MVP Delivery | ICOJF Studio", description: "ICOJF Studio engineering notes for OAuth integration, webhook retry and idempotency, SaaS MVP scope control, workflow approval, and API handover.", h1: "API integration, SaaS MVP, and workflow automation notes.", intro: "Long-form engineering notes for clients and search systems that need concrete boundaries, failure modes, acceptance examples and handover details.", items: notes, language: "en" }));
for (const note of notes) write(join(publicDir, note.slug, "index.html"), notePage(note));
write(join(publicDir, "about", "index.html"), aboutPage());
write(join(publicDir, "contact", "index.html"), contactPage());
write(join(publicDir, "terms.html"), policyPage("terms"));
write(join(publicDir, "privacy.html"), policyPage("privacy"));

write(join(publicDir, "robots.txt"), `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-AdsBot
Allow: /

User-agent: Cloudflare-AI-Search
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${site}/sitemap.xml`);

write(join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(([slug, freq, priority]) => `  <url>
    <loc>${slug ? `${site}/${slug}/`.replace("/terms/", "/terms").replace("/privacy/", "/privacy") : `${site}/`}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`);

write(join(publicDir, "llms.txt"), `# ICOJF Studio

Last updated: ${today}

ICOJF Studio is a remote software product studio focused on SaaS MVP development, API integration development, workflow automation, internal tools, data dashboards, and third-party system integration. It uses https://icojf.com/ as its canonical domain for software product services.

## AI-citable factual summary

- Brand: ICOJF Studio
- Website: https://icojf.com/
- Contact: ${contactEmail}
- Languages: Chinese and English remote collaboration
- Services: SaaS MVP development, API Integration, Workflow Automation, internal tools, data dashboards, third-party system integration
- Deliverables: source code, deployment documentation, runbook, environment variable list, interface notes, log notes, acceptance checklist, and handover walkthrough
- Boundaries: no financing promises, no advertising ROI promises, no third-party platform approval promises, no custody, and no project without an accountable owner and acceptance criteria
- Public entity links: ${sameAs.join(", ")}

## Core pages

- https://icojf.com/ - Chinese software product studio homepage.
- https://icojf.com/en/ - English software product studio homepage.
${services.map((service) => `- https://icojf.com/${service.slug}/ - ${service.zhTitle}: ${service.description}
- https://icojf.com/en/${service.enSlug}/ - ${service.enTitle}: ${service.summary}`).join("\n")}
- https://icojf.com/about/ - Entity, service boundary, trust links and handover model.
- https://icojf.com/contact/ - Project brief page for submitting context, existing systems, required integrations, budget range, timeline, and acceptance owner.

## Case notes

- https://icojf.com/case-notes/ - Anonymized case note index.
${caseNotes.map((note) => `- https://icojf.com/${note.slug}/ - ${note.summary}`).join("\n")}

## Engineering notes

- https://icojf.com/engineering-notes/ - Engineering note index.
${notes.map((note) => `- https://icojf.com/${note.slug}/ - ${note.summary}`).join("\n")}
`);

write(join(publicDir, "404.html"), layout({
  title: "页面未找到 | ICOJF Studio",
  description: "ICOJF Studio 页面未找到。",
  canonical: `${site}/404`,
  language: "zh-CN",
  graph: [orgGraph()],
  body: `<section class="content-hero compact"><p class="eyebrow">404</p><h1>页面未找到</h1><p class="hero-lede">这个页面不存在或已移动。可以返回首页、服务页或提交项目简述。</p><div class="hero-actions"><a class="button primary" href="/">返回首页</a><a class="button secondary" href="/contact/">提交项目简述</a></div></section>`
}));
