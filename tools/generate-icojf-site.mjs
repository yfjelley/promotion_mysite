import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public", "icojf");
const site = "https://icojf.com";
const today = "2026-07-02";
const stylesheetHref = "/styles.css?v=20260702-ui2";
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

const servicePackages = [
  {
    service: "API Integration Development",
    zhName: "API Integration Sprint",
    enName: "API Integration Sprint",
    zhFit: "适合已经有接口文档、测试账号和明确同步对象的 API、Webhook、CRM、ERP 或支付集成。",
    enFit: "For teams that already have API documentation, test access and one clear sync or webhook workflow.",
    timeline: "2-3 weeks",
    zhPrice: "$2,000 起",
    enPrice: "From $2,000",
    hrefZh: "/api-integration-development/",
    hrefEn: "/en/api-integration-development/",
    zhInputs: ["接口文档", "测试账号", "字段样本", "权限范围", "验收负责人"],
    enInputs: ["API docs", "test account", "sample payloads", "permission scope", "acceptance owner"],
    zhDeliverables: ["字段映射", "接口或 webhook 流程", "重试和异常处理", "日志说明", "交接运行手册"],
    enDeliverables: ["field mapping", "API or webhook flow", "retry and exception handling", "log notes", "handover runbook"],
    zhAcceptance: ["样本数据同步成功", "重复事件不重复写入", "失败原因可见", "凭证轮换有说明"],
    enAcceptance: ["sample sync works", "duplicates are safe", "failure reasons are visible", "credential rotation is documented"]
  },
  {
    service: "SaaS MVP Development",
    zhName: "SaaS MVP Build",
    enName: "SaaS MVP Build",
    zhFit: "适合需要第一版可上线产品、后台管理、权限边界、部署和交接文档的创业团队或业务负责人。",
    enFit: "For founders and operators who need a first release with admin workflows, deployment and handover notes.",
    timeline: "4-8 weeks",
    zhPrice: "$5,000 起",
    enPrice: "From $5,000",
    hrefZh: "/mvp-saas-development/",
    hrefEn: "/en/saas-mvp-development/",
    zhInputs: ["目标用户", "核心流程", "数据对象", "角色权限", "上线窗口"],
    enInputs: ["target user", "core workflow", "data objects", "roles", "launch window"],
    zhDeliverables: ["核心页面", "后台管理", "数据模型", "部署文档", "运行手册和验收清单"],
    enDeliverables: ["core screens", "admin console", "data model", "deployment docs", "runbook and acceptance checklist"],
    zhAcceptance: ["主流程端到端可跑", "后台能处理记录", "权限可验证", "部署重启后可恢复"],
    enAcceptance: ["core flow runs end to end", "admin can process records", "roles are testable", "restart and deploy checks pass"]
  },
  {
    service: "Workflow Automation Development",
    zhName: "Workflow Automation Tool",
    enName: "Workflow Automation Tool",
    zhFit: "适合已经有稳定人工流程，但表格整理、提醒、审批、报表或跨系统同步占用大量时间的团队。",
    enFit: "For teams with stable manual workflows that need structured automation, approvals, reports or internal tools.",
    timeline: "2-6 weeks",
    zhPrice: "$3,000 起",
    enPrice: "From $3,000",
    hrefZh: "/business-process-automation/",
    hrefEn: "/en/workflow-automation-development/",
    zhInputs: ["当前表格或系统", "流程规则", "审批人", "异常样本", "报表格式"],
    enInputs: ["current sheet or system", "workflow rules", "approver", "exception examples", "report format"],
    zhDeliverables: ["自动化工具", "审批或异常队列", "提醒和报表", "日志", "暂停和回滚说明"],
    enDeliverables: ["automation tool", "approval or exception queue", "reminders and reports", "logs", "pause and rollback notes"],
    zhAcceptance: ["正常样本自动处理", "异常进入人工队列", "报表可复核", "高风险动作保留确认"],
    enAcceptance: ["normal samples process", "exceptions enter a review queue", "reports are reviewable", "high-risk actions keep approval"]
  }
];

const deliverySamples = [
  {
    zhTitle: "内部后台样例",
    enTitle: "Internal dashboard sample",
    zhDescription: "展示列表、状态、负责人、异常队列和导出入口，说明交付不是只有前台页面。",
    enDescription: "Shows records, statuses, owners, exception queues and export paths so the handover is operational.",
    zhType: "Admin table",
    enType: "Admin table",
    zhColumns: ["记录", "状态", "负责人", "下一步"],
    enColumns: ["Record", "Status", "Owner", "Next"],
    zhRows: [["订单同步", "待验收", "Ops", "复核样本"], ["异常记录", "处理中", "Admin", "补字段"], ["客户导出", "可用", "Owner", "下载"]],
    enRows: [["Order sync", "Review", "Ops", "Sample"], ["Exception", "Open", "Admin", "Fix field"], ["Export", "Ready", "Owner", "Download"]]
  },
  {
    zhTitle: "API 字段映射样例",
    enTitle: "API mapping sample",
    zhDescription: "把来源字段、目标字段、转换规则、必填项和失败处理写清楚，减少后续维护猜测。",
    enDescription: "Makes source fields, destination fields, transforms, required values and failure handling explicit.",
    zhType: "Mapping table",
    enType: "Mapping table",
    zhColumns: ["来源字段", "目标字段", "规则", "失败处理"],
    enColumns: ["Source", "Target", "Rule", "Failure"],
    zhRows: [["source_id", "external_id", "原样写入", "拒绝空值"], ["amount", "amount_cents", "乘以 100", "进入队列"], ["status", "lifecycle", "枚举映射", "人工复核"]],
    enRows: [["source_id", "external_id", "copy", "reject null"], ["amount", "amount_cents", "x100", "queue"], ["status", "lifecycle", "enum map", "review"]]
  },
  {
    zhTitle: "Webhook / Retry 样例",
    enTitle: "Webhook and retry sample",
    zhDescription: "展示事件状态、重复事件、重试次数、错误分类和人工复核入口。",
    enDescription: "Shows event states, duplicate handling, retry count, error classes and manual review paths.",
    zhType: "Retry log",
    enType: "Retry log",
    zhColumns: ["事件", "结果", "重试", "说明"],
    enColumns: ["Event", "Result", "Retry", "Note"],
    zhRows: [["evt_1432", "accepted", "0", "写入成功"], ["evt_1432", "duplicate", "0", "已忽略"], ["evt_1439", "retrying", "2", "限频中"]],
    enRows: [["evt_1432", "accepted", "0", "stored"], ["evt_1432", "duplicate", "0", "ignored"], ["evt_1439", "retrying", "2", "rate limit"]]
  },
  {
    zhTitle: "交接运行手册样例",
    enTitle: "Runbook sample",
    zhDescription: "记录部署、环境变量、日志字段、第三方账号归属、暂停和恢复步骤。",
    enDescription: "Documents deploy steps, environment variables, log fields, account ownership and recovery steps.",
    zhType: "Runbook",
    enType: "Runbook",
    zhColumns: ["步骤", "负责人", "证据", "状态"],
    enColumns: ["Step", "Owner", "Evidence", "State"],
    zhRows: [["部署", "Dev", "Release log", "完成"], ["环境变量", "Owner", "Secret list", "已交接"], ["回滚", "Dev", "Runbook", "可执行"]],
    enRows: [["Deploy", "Dev", "Release log", "Done"], ["Env vars", "Owner", "Secret list", "Handover"], ["Rollback", "Dev", "Runbook", "Ready"]]
  },
  {
    zhTitle: "验收清单样例",
    enTitle: "Acceptance checklist sample",
    zhDescription: "用可复现路径验收：正常样本、缺字段、重复事件、权限错误和重启恢复。",
    enDescription: "Uses repeatable paths: happy path, missing fields, duplicate events, permission errors and restart checks.",
    zhType: "Acceptance",
    enType: "Acceptance",
    zhColumns: ["用例", "输入", "预期", "结果"],
    enColumns: ["Case", "Input", "Expected", "Result"],
    zhRows: [["正常样本", "完整字段", "写入成功", "通过"], ["缺字段", "无 email", "提示错误", "通过"], ["重复事件", "同 ID", "不重复写", "通过"]],
    enRows: [["Happy path", "full fields", "stored", "pass"], ["Missing field", "no email", "error", "pass"], ["Duplicate", "same ID", "no duplicate", "pass"]]
  }
];

const workSteps = [
  {
    zhTitle: "1. 范围评估",
    enTitle: "1. Scope review",
    zhText: "确认业务目标、现有系统、负责人、预算范围、上线窗口和第一阶段验收标准。",
    enText: "Confirm business goal, existing systems, owner, budget range, launch window and first-release acceptance."
  },
  {
    zhTitle: "2. 原型或接口验证",
    enTitle: "2. Prototype or API validation",
    zhText: "把页面流程、数据对象、字段映射、权限、异常路径和客户需提供资料固定下来。",
    enText: "Fix screens, data objects, field mapping, permissions, exception paths and client-side inputs."
  },
  {
    zhTitle: "3. 分阶段开发",
    enTitle: "3. Staged build",
    zhText: "按可验收切片交付，保留演示环境、变更记录、日志说明和样本验收路径。",
    enText: "Deliver in accepted slices with demo environment, change notes, log notes and sample acceptance paths."
  },
  {
    zhTitle: "4. 上线和交接",
    enTitle: "4. Launch and handover",
    zhText: "交付源码、部署文档、环境变量、运行手册、验收清单和远程讲解。",
    enText: "Hand over source code, deployment docs, environment variables, runbook, acceptance checklist and walkthrough."
  }
];

const briefTemplateZh = `项目类型：
现有系统或网站：
要解决的问题：
目标用户或内部使用者：
需要集成的平台/API：
已有资料：接口文档 / 测试账号 / 样本数据 / 字段说明
第一阶段必须上线的功能：
预算范围：$2,000 起，请写可接受区间
期望上线时间：
验收负责人：
补充说明：`;

const briefTemplateEn = `Project type:
Existing system or website:
Problem to solve:
Target user or internal user:
Required platforms or APIs:
Available materials: docs / test account / sample data / field notes
First-release must-haves:
Budget range: from $2,000, please share your acceptable range
Target launch window:
Acceptance owner:
Notes:`;

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

const longTailPages = [
  {
    slug: "en/crm-api-integration-development",
    title: "CRM API Integration Development | Data Sync and Handover | ICOJF Studio",
    description: "CRM API integration development for lead, customer, order and support workflows with field mapping, retry handling, audit logs and handover notes.",
    h1: "CRM API Integration Development",
    summary: "CRM API integration work connects lead, customer, order and support data without hiding field mapping, ownership, retry behavior or acceptance checks.",
    service: "API Integration Development",
    inputs: ["CRM API documentation", "sample lead or customer records", "field ownership", "permission scope", "sync direction", "acceptance owner"],
    deliverables: ["field mapping table", "sync worker or webhook receiver", "retry and exception queue", "audit log notes", "handover runbook"],
    acceptance: ["create or update sample records", "handle missing required fields", "avoid duplicate contacts", "show failed sync reasons", "document credential rotation"],
    sections: [
      ["When this page fits", "This page fits teams that already use a CRM or sales system but still copy lead, customer or support data between tools by hand. The first scope should name one source system, one destination system, one record type and one owner for acceptance."],
      ["Integration boundary", "CRM work usually fails when field ownership is unclear. The project should decide which system owns email, phone, lifecycle stage, account status, notes, tags and opt-in state before implementation. That decision becomes part of the field mapping and support runbook."],
      ["Reliability design", "The integration should expect duplicate webhooks, rate limits, validation errors and temporarily unavailable APIs. Stable external IDs, idempotent writes, retry queues and visible error states are more important than a one-time successful demo."],
      ["Handover package", "A maintainable handover includes source code, environment variable names, provider app notes, field mapping, retry behavior, log fields, known limits and acceptance examples that the operator can rerun after delivery."]
    ],
    faqs: [
      ["What CRM systems can be integrated?", "The pattern applies to CRMs and sales tools that expose APIs, webhooks, exports or automation endpoints. The exact scope depends on available documentation and account permissions."],
      ["Can the first scope be small?", "Yes. A useful first scope can be a single lead sync or customer update path with clear acceptance cases before expanding to more record types."],
      ["How are duplicate contacts handled?", "Duplicate handling should use provider IDs, email normalization, merge rules and visible exception states instead of silently overwriting records."],
      ["What does the client need to provide?", "API documentation, test credentials, sample records, field definitions, permission scope and a person who can approve acceptance cases are needed."]
    ]
  },
  {
    slug: "en/webhook-integration-service",
    title: "Webhook Integration Service | Retry, Idempotency and Logs | ICOJF Studio",
    description: "Webhook integration service for SaaS products and internal tools that need validation, idempotency, retries, exception queues and operational logs.",
    h1: "Webhook Integration Service",
    summary: "Webhook integration should make incoming events durable, replay-safe and visible before downstream side effects are triggered.",
    service: "API Integration Development",
    inputs: ["provider webhook documentation", "sample payloads", "signature rules", "event types", "downstream actions", "failure policy"],
    deliverables: ["webhook endpoint", "signature validation", "event storage", "idempotent processing", "retry and exception queue", "audit log view"],
    acceptance: ["accept valid event", "reject invalid signature", "process duplicate safely", "replay failed event", "show event status"],
    sections: [
      ["The real scope", "A webhook endpoint is not finished when it returns 200 once. It should validate the sender, store the event, identify duplicates, handle provider retries and make failed downstream work visible to an operator."],
      ["Event lifecycle", "Each event should move through accepted, ignored, processing, failed, retried and completed states when the workflow needs operational support. This gives the business owner a way to answer what happened to a specific event without reading raw server logs."],
      ["Security boundary", "Signature verification, secret rotation notes and log redaction are part of the delivery. The integration should not log signing secrets, authorization headers or sensitive customer payloads in public traces."],
      ["Acceptance evidence", "Acceptance should include malformed payloads, invalid signatures, duplicate events, provider timeout simulation and downstream API failure. These cases prove the integration can survive normal provider behavior."]
    ],
    faqs: [
      ["Do webhooks need a queue?", "Not every webhook needs a complex queue, but any workflow with downstream API calls or business side effects should have a visible retry or exception path."],
      ["What is idempotency?", "Idempotency means repeated delivery of the same event does not create duplicate side effects such as duplicate records, messages or payments."],
      ["Can this be added to an existing app?", "Yes, if the existing app can expose an endpoint, store event state and run the downstream work with enough logging."],
      ["What is included in handover?", "Endpoint URL notes, secret names, validation behavior, event states, retry rules, log fields and replay instructions should be included."]
    ]
  },
  {
    slug: "en/internal-dashboard-development",
    title: "Internal Dashboard Development | Operations Panels and Runbooks | ICOJF Studio",
    description: "Internal dashboard development for operations teams that need searchable records, status views, exception queues, exports, permissions and runbooks.",
    h1: "Internal Dashboard Development",
    summary: "Internal dashboard development turns operational records, exceptions and status changes into a tool that teams can use repeatedly without guessing.",
    service: "SaaS MVP Development",
    inputs: ["current spreadsheet or system", "record types", "user roles", "status workflow", "filters and exports", "admin actions"],
    deliverables: ["dashboard screens", "role-aware views", "record detail pages", "status actions", "exports", "runbook and acceptance checklist"],
    acceptance: ["search records", "filter by status", "update a sample record", "export a reviewed list", "verify role permissions"],
    sections: [
      ["What makes it useful", "An internal dashboard should reduce repeated operational work. The first version should focus on records the team checks every day, status changes they make repeatedly and exceptions that currently live in chat or spreadsheets."],
      ["Data and roles", "Before building screens, the project should name the record objects, required fields, status values, user roles and admin actions. A dashboard without role boundaries often becomes risky as soon as more people use it."],
      ["Operational detail", "Useful dashboards show timestamps, owners, notes, source links, export paths and error states. They should make the next action obvious rather than simply displaying a table."],
      ["Handover", "The handover should include source code, deployment notes, environment variables, seed data, role setup, common support actions and a checklist for confirming the dashboard after deploy."]
    ],
    faqs: [
      ["Is this different from a BI dashboard?", "Yes. This page focuses on operational dashboards where users review, update and resolve records, not only read metrics."],
      ["Can it start from Google Sheets?", "Yes. A spreadsheet can be the intake source or first data model if fields, owners and update rules are clear."],
      ["Do you include permissions?", "Basic roles and admin boundaries can be included when they are part of the first workflow."],
      ["What is the best first release?", "A small release with list, detail, status update, exception view and export is usually more useful than a broad dashboard with no actions."]
    ]
  },
  {
    slug: "en/google-sheets-workflow-automation",
    title: "Google Sheets Workflow Automation | Cleanup, Reports and Approval | ICOJF Studio",
    description: "Google Sheets workflow automation for teams that need structured fields, imports, exports, reminders, reports, approvals and exception handling.",
    h1: "Google Sheets Workflow Automation",
    summary: "Google Sheets workflow automation is strongest when the sheet becomes a controlled input or review surface rather than a hidden manual process.",
    service: "Workflow Automation Development",
    inputs: ["current sheet", "column definitions", "owners", "approval rules", "report format", "exception examples"],
    deliverables: ["field cleanup", "automation script or internal tool", "scheduled report", "approval path", "exception queue", "runbook"],
    acceptance: ["process sample rows", "detect missing fields", "send or generate report", "preserve manual approval", "log errors"],
    sections: [
      ["When to automate", "A sheet is worth automating when the workflow is repeated, fields are stable enough to name and the team can explain what happens after each row changes. Automation cannot fix a process that nobody owns."],
      ["Structure first", "Before adding scripts, the project should define columns, required fields, valid values, owner fields and exception states. This cleanup often creates more value than the first automation step."],
      ["Human review", "Approvals, unusual values and high-risk actions should remain visible. Automation should prepare the record, notify the owner and record the decision rather than hiding every judgment inside code."],
      ["Operational handover", "The handover should state where the script or tool runs, which account owns it, how schedules are configured, what errors look like and how to pause the automation."]
    ],
    faqs: [
      ["Can the sheet remain the source of truth?", "Yes, for small workflows. For larger workflows, the sheet can become an intake or review surface while a database stores operational state."],
      ["What if the columns keep changing?", "The project should pause until the core fields are stable enough for acceptance. Constant column changes make automation fragile."],
      ["Can reports be generated automatically?", "Yes, if the report rules, timing, recipients and exception handling are clear."],
      ["How do we avoid risky automation?", "Keep approval for high-risk decisions and make every automated action visible in logs or status columns."]
    ]
  },
  {
    slug: "en/stripe-integration-handover",
    title: "Stripe Integration Handover | Billing Webhooks and Runbooks | ICOJF Studio",
    description: "Stripe integration handover for SaaS MVPs covering billing scope, checkout, customer records, webhooks, environment variables, logs and acceptance tests.",
    h1: "Stripe Integration Handover",
    summary: "Stripe integration handover should document billing scope, webhook behavior, environment separation and operator checks before payments become business-critical.",
    service: "API Integration Development",
    inputs: ["billing model", "Stripe account owner", "products and prices", "test mode access", "webhook events", "fulfillment rules"],
    deliverables: ["checkout or billing flow", "customer and subscription mapping", "webhook handling", "test mode checklist", "runbook", "handover notes"],
    acceptance: ["complete test checkout", "handle failed payment event", "sync subscription status", "verify webhook signature", "document key rotation"],
    sections: [
      ["Scope before code", "Stripe work should start with the billing model, products, prices, tax assumptions, account owner and fulfillment rules. The integration should not invent business policy while implementing checkout."],
      ["Webhook and status", "Payment and subscription state should be updated from trusted Stripe events, not only from browser redirects. The application needs a safe path for duplicate events, delayed events and failed downstream updates."],
      ["Environment separation", "Test mode and production credentials should be separated. The handover should explain which keys exist, where webhook secrets live, who owns the Stripe account and how to rotate credentials."],
      ["Acceptance tests", "Acceptance should include test checkout, canceled checkout, failed payment, subscription update, duplicate webhook and operator verification in logs or admin screens."]
    ],
    faqs: [
      ["Do you define the pricing model?", "The client should define pricing and billing policy. The implementation can reflect the agreed products, prices and workflow."],
      ["Are webhooks required?", "For most SaaS billing workflows, webhooks are required because browser redirects alone do not reliably represent payment state."],
      ["What is included in handover?", "Environment variables, Stripe dashboard notes, webhook event list, test card examples, log fields and common support actions should be included."],
      ["Can this be part of an MVP?", "Yes, if billing is essential to the first release and the scope is kept small enough to test."]
    ]
  },
  {
    slug: "en/erp-data-sync-integration",
    title: "ERP Data Sync Integration | Orders, Inventory and Audit Logs | ICOJF Studio",
    description: "ERP data sync integration for orders, inventory, customer records and internal tools with field mapping, retries, conflict handling and audit logs.",
    h1: "ERP Data Sync Integration",
    summary: "ERP data sync integration should define record ownership, conflict handling, retries and audit logs before connecting operational systems.",
    service: "API Integration Development",
    inputs: ["ERP API or export access", "record ownership", "sample orders or inventory rows", "sync frequency", "conflict rules", "operator owner"],
    deliverables: ["mapping document", "sync job or webhook flow", "conflict queue", "audit logs", "deployment notes", "acceptance examples"],
    acceptance: ["sync sample order", "handle inventory conflict", "recover from rate limit", "show skipped records", "document rollback path"],
    sections: [
      ["Why ERP sync needs boundaries", "ERP integrations touch operational data that teams rely on every day. The scope should define whether the ERP, store, warehouse, CRM or internal tool owns each field before any write path is automated."],
      ["Conflict handling", "Inventory, order status and customer records can conflict across systems. The project should define when to overwrite, when to skip, when to queue for review and who resolves conflicts."],
      ["Sync operations", "Scheduled jobs, webhook flows and manual retry actions should all leave audit logs. Operators need to know when a sync ran, what changed, what failed and whether a retry is pending."],
      ["Handover and maintenance", "The handover should include source code, schedule notes, credentials, field mapping, rate limit behavior, common failures and acceptance examples so the integration is maintainable after delivery."]
    ],
    faqs: [
      ["Can ERP sync be one-way only?", "Yes. One-way sync is often safer for a first release when ownership and conflict rules are not yet mature."],
      ["How are conflicts handled?", "Conflicts should be classified and made visible through queues or logs instead of silently overwriting important operational data."],
      ["Do you need production ERP access?", "Development should begin with documentation, test access or exports. Production access should use minimum permissions and be handled only when the scope is ready."],
      ["What makes the sync acceptable?", "Acceptance should prove normal records, duplicates, missing fields, conflicts, rate limits and recovery paths."]
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
    ? [["/en/api-integration-development/", "API"], ["/en/saas-mvp-development/", "SaaS MVP"], ["/en/workflow-automation-development/", "Automation"], ["/en/solutions/", "Solutions"], ["/en/how-we-work/", "How"], ["/about/", "About"]]
    : [["/api-integration-development/", "API 集成"], ["/mvp-saas-development/", "SaaS MVP"], ["/business-process-automation/", "业务自动化"], ["/case-notes/", "案例笔记"], ["/how-we-work/", "工作方式"], ["/about/", "关于"]];
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
      <a href="/how-we-work/">工作方式</a>
      <a href="/en/">English</a>
      <a href="/en/how-we-work/">How we work</a>
      <a href="/en/solutions/">Solution pages</a>
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
  ${alternateLinks(canonical)}
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

function mailtoBrief(language = "zh-CN") {
  const en = language === "en";
  const subject = en ? "ICOJF Studio project brief" : "ICOJF Studio 项目简述";
  const body = en ? briefTemplateEn : briefTemplateZh;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function compactList(items) {
  return `<ul class="compact-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function packageForService(service) {
  return servicePackages.find((item) => item.service === service.enTitle);
}

function renderPackageCards(language = "zh-CN") {
  const en = language === "en";
  return `<div class="package-grid">${servicePackages.map((item) => `<article class="package-card">
    <div class="package-top"><span class="mini-label">${en ? "Service package" : "服务包"}</span><strong class="price-anchor">${en ? item.enPrice : item.zhPrice}</strong></div>
    <h3>${escapeHtml(en ? item.enName : item.zhName)}</h3>
    <p>${escapeHtml(en ? item.enFit : item.zhFit)}</p>
    <div class="package-meta"><span>${en ? "Timeline" : "周期"}: ${item.timeline}</span><span>${en ? "Budget" : "预算"}: ${en ? item.enPrice : item.zhPrice}</span></div>
    <div class="package-columns"><div><strong>${en ? "Inputs" : "客户需提供"}</strong>${compactList(en ? item.enInputs : item.zhInputs)}</div><div><strong>${en ? "Deliverables" : "交付物"}</strong>${compactList(en ? item.enDeliverables : item.zhDeliverables)}</div></div>
    <div class="acceptance-line"><strong>${en ? "Acceptance" : "验收"}:</strong> ${(en ? item.enAcceptance : item.zhAcceptance).map((value) => escapeHtml(value)).join(en ? ", " : "、")}</div>
    <a href="${en ? item.hrefEn : item.hrefZh}">${en ? "View package details" : "查看服务细节"}</a>
  </article>`).join("")}</div>`;
}

function renderPackageDetail(item, language = "zh-CN") {
  const en = language === "en";
  return `<div class="package-detail">
    <div>
      <span class="mini-label">${en ? "Recommended package" : "推荐服务包"}</span>
      <h3>${escapeHtml(en ? item.enName : item.zhName)}</h3>
      <p>${escapeHtml(en ? item.enFit : item.zhFit)}</p>
      <div class="package-meta"><span>${en ? "Timeline" : "周期"}: ${item.timeline}</span><span>${en ? "Starting budget" : "起步预算"}: ${en ? item.enPrice : item.zhPrice}</span></div>
    </div>
    <div class="package-columns"><div><strong>${en ? "Inputs" : "客户需提供"}</strong>${compactList(en ? item.enInputs : item.zhInputs)}</div><div><strong>${en ? "Deliverables" : "交付物"}</strong>${compactList(en ? item.enDeliverables : item.zhDeliverables)}</div><div><strong>${en ? "Acceptance checks" : "验收方式"}</strong>${compactList(en ? item.enAcceptance : item.zhAcceptance)}</div></div>
  </div>`;
}

function renderDeliverySamples(language = "zh-CN") {
  const en = language === "en";
  return `<div class="sample-grid">${deliverySamples.map((sample) => `<article class="sample-card">
    <div class="sample-window" aria-hidden="true">
      <div class="sample-window-head"><strong>${escapeHtml(en ? sample.enType : sample.zhType)}</strong><span>${en ? "Sanitized" : "脱敏样例"}</span></div>
      <div class="sample-window-body"><table class="sample-table">
        <thead><tr>${(en ? sample.enColumns : sample.zhColumns).map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>${(en ? sample.enRows : sample.zhRows).map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>
    </div>
    <h3>${escapeHtml(en ? sample.enTitle : sample.zhTitle)}</h3>
    <p>${escapeHtml(en ? sample.enDescription : sample.zhDescription)}</p>
  </article>`).join("")}</div>`;
}

function renderWorkbench(language = "zh-CN") {
  const en = language === "en";
  const records = en
    ? [["Order sync", "Mapped", "Ops", "Review"], ["Webhook", "Retry safe", "Dev", "Replay"], ["Admin", "Ready", "Owner", "Roles"], ["Acceptance", "Open", "Client", "Cases"]]
    : [["订单", "已映射", "Ops", "复核"], ["Webhook", "可重试", "Dev", "回放"], ["后台", "就绪", "Owner", "权限"], ["验收", "待确认", "Client", "用例"]];
  const logs = en
    ? [["evt_1432", "duplicate", "200"], ["evt_1439", "rate limit", "retry"], ["crm_882", "missing", "review"]]
    : [["evt_1432", "重复", "200"], ["evt_1439", "限频", "重试"], ["crm_882", "缺字段", "复核"]];
  const checks = en
    ? ["Sample sync passes", "Duplicate event is safe", "Runbook owner confirmed"]
    : ["样本同步通过", "重复事件不重复写入", "运行手册负责人已确认"];
  return `<div class="build-system-panel workbench-panel" aria-label="${en ? "Delivery workbench preview" : "交付工作台预览"}">
    <div class="panel-head"><div><strong>${en ? "Delivery workspace" : "交付工作台"}</strong><small>${en ? "Admin dashboard + API logs + acceptance checklist" : "后台 + API 日志 + 验收清单"}</small></div><span class="status">${en ? "Client-ready" : "可交接"}</span></div>
    <div class="workbench-body">
      <div class="workbench-main">
        <div class="workbench-toolbar"><span class="active">${en ? "Admin dashboard" : "后台管理"}</span><span>${en ? "API logs" : "API 日志"}</span><span>${en ? "Acceptance" : "验收"}</span></div>
        <div class="workbench-table">
          <div class="workbench-table-head"><span>${en ? "Record" : "记录"}</span><span>${en ? "Status" : "状态"}</span><span>${en ? "Owner" : "负责人"}</span><span>${en ? "Next action" : "下一步"}</span></div>
          ${records.map((row) => `<div class="workbench-table-row">${row.map((cell, index) => index === 0 ? `<strong>${escapeHtml(cell)}</strong>` : `<span>${escapeHtml(cell)}</span>`).join("")}</div>`).join("")}
        </div>
      </div>
      <div class="workbench-side">
        <div class="workbench-side-block">
          <span class="mini-label">${en ? "API retry log" : "API 重试日志"}</span>
          ${logs.map(([id, message, state]) => `<div class="api-log-row"><strong>${escapeHtml(id)}</strong><span>${escapeHtml(message)}</span><em>${escapeHtml(state)}</em></div>`).join("")}
        </div>
        <div class="workbench-side-block">
          <span class="mini-label">${en ? "Acceptance checks" : "验收清单"}</span>
          ${checks.map((item) => `<div class="checkline"><i></i><span>${escapeHtml(item)}</span></div>`).join("")}
        </div>
      </div>
    </div>
    <div class="launch-steps">${workSteps.map((step) => `<span><strong>${escapeHtml((en ? step.enTitle : step.zhTitle).replace(/^\d+\.\s*/, ""))}</strong></span>`).join("")}</div>
  </div>`;
}

function alternateLinks(canonical) {
  const pairedAlternates = new Map([
    [`${site}/`, { zh: `${site}/`, en: `${site}/en/` }],
    [`${site}/en/`, { zh: `${site}/`, en: `${site}/en/` }],
    [`${site}/how-we-work/`, { zh: `${site}/how-we-work/`, en: `${site}/en/how-we-work/` }],
    [`${site}/en/how-we-work/`, { zh: `${site}/how-we-work/`, en: `${site}/en/how-we-work/` }],
    ...services.flatMap((service) => {
      const zh = urlFor(service.slug);
      const en = urlFor(`en/${service.enSlug}`);
      return [[zh, { zh, en }], [en, { zh, en }]];
    })
  ]);
  const pair = pairedAlternates.get(canonical);
  if (!pair) return `<link rel="alternate" hreflang="x-default" href="${site}/">`;
  return `<link rel="alternate" hreflang="zh-CN" href="${pair.zh}">
  <link rel="alternate" hreflang="en" href="${pair.en}">
  <link rel="alternate" hreflang="x-default" href="${site}/">`;
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
      "priceRange": "From USD 2,000",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ICOJF Studio service catalog",
        "itemListElement": servicePackages.map((item) => ({
          "@type": "Offer",
          "name": item.enName,
          "priceCurrency": "USD",
          "price": item.enPrice.replace("From $", "").replace(",", ""),
          "itemOffered": {
            "@type": "Service",
            "name": item.enName,
            "url": en ? `${site}${item.hrefEn}` : `${site}${item.hrefZh}`,
            "description": item.enFit
          }
        }))
      }
    }
  ];
  const body = `<section class="hero studio-hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title">${en ? "Software delivery with clear launch, acceptance, and handover." : "软件交付，先做到上线、验收和维护都清楚。"}</h1>
        <p class="hero-lede">${en ? "ICOJF Studio builds SaaS MVPs, API integrations, workflow automation and internal tools for remote Chinese and English collaboration. The work focuses on scoped delivery, operational handover and acceptance evidence." : "ICOJF Studio 提供 SaaS MVP、API Integration、Workflow Automation 与企业内部工具开发，支持中文/英文远程协作。重点不是堆功能，而是交付能运行、可验收、可维护的系统。"}</p>
        <div class="hero-actions"><a class="button primary" href="/contact/">${en ? "Start a build brief" : "提交项目简述"}</a><a class="button secondary" href="${en ? "/en/api-integration-development/" : "#capabilities"}">${en ? "View services" : "查看服务能力"}</a></div>
        <div class="hero-facts" aria-label="${en ? "Project facts" : "项目事实"}">
          <span><strong>${en ? "From $2,000" : "$2,000 起"}</strong><em>${en ? "API sprint entry point" : "API 集成起步服务"}</em></span>
          <span><strong>${en ? "2-8 weeks" : "2-8 周"}</strong><em>${en ? "Scoped delivery slices" : "按可验收切片交付"}</em></span>
          <span><strong>${en ? "Source + runbook" : "源码 + 运行手册"}</strong><em>${en ? "Handover assets included" : "包含交接资产"}</em></span>
        </div>
        <div class="hero-tags" aria-label="Core services"><span>SaaS MVP</span><span>API Integration</span><span>Workflow Automation</span><span>Internal Tools</span></div>
      </div>
      ${renderWorkbench(language)}
    </section>
    <section id="capabilities" class="section" aria-labelledby="capabilities-title">
      <div class="section-head"><p class="eyebrow">Service Packages</p><h2 id="capabilities-title">${en ? "Productized packages from $2,000." : "从 $2,000 起的产品化服务包"}</h2><p>${en ? "Each package states fit, inputs, deliverables, timeline, starting budget and acceptance checks before development starts." : "每个服务包都提前说明适合对象、客户需提供资料、交付物、周期、起步预算和验收方式。"}</p></div>
      ${renderPackageCards(language)}
    </section>
    <section class="section soft" aria-labelledby="samples-title"><div class="section-head"><p class="eyebrow">Delivery Samples</p><h2 id="samples-title">${en ? "Concrete assets make the studio feel inspectable." : "用可检查的交付样例建立专业感"}</h2><p>${en ? "Sanitized samples show the kind of operational artifacts clients should expect, without exposing client data." : "样例不展示客户隐私，但让访客看到后台、字段映射、Webhook 队列、运行手册和验收清单这些真实交付资产。"}</p></div>${renderDeliverySamples(language)}</section>
    <section class="section" aria-labelledby="how-title"><div class="section-head"><p class="eyebrow">How We Work</p><h2 id="how-title">${en ? "A scoped workflow before implementation." : "先定范围，再做开发"}</h2><p>${en ? "The process keeps projects small enough to launch, accept and maintain." : "流程目标是让项目小到可上线、可验收、可维护，而不是一次性堆满功能。"}</p></div><div class="timeline-grid">${workSteps.map((step) => `<article><span>${escapeHtml((en ? step.enTitle : step.zhTitle).slice(0, 1))}</span><h3>${escapeHtml(en ? step.enTitle : step.zhTitle)}</h3><p>${escapeHtml(en ? step.enText : step.zhText)}</p></article>`).join("")}</div><div class="section-link"><a href="${en ? "/en/how-we-work/" : "/how-we-work/"}">${en ? "Read the full workflow" : "查看完整工作方式"}</a></div></section>
    <section class="section" aria-labelledby="solution-title"><div class="section-head"><p class="eyebrow">Long-tail Pages</p><h2 id="solution-title">${en ? "Specific integration and automation pages" : "英文长尾服务入口"}</h2><p>${en ? "These pages map common search and AI-answer queries to concrete delivery boundaries." : "这些英文页面把常见搜索和 AI 问答意图对应到更具体的交付边界。"}</p></div><div class="article-grid">${longTailPages.slice(0, 6).map((page) => `<article class="article-card"><h3>${escapeHtml(page.h1)}</h3><p>${escapeHtml(page.summary)}</p><a href="/${page.slug}/">${en ? "Read page" : "查看英文页"}</a></article>`).join("")}</div></section>
    <section class="section soft" aria-labelledby="facts-title"><div class="section-head"><p class="eyebrow">Service Facts</p><h2 id="facts-title">${en ? "Project facts summary" : "项目事实摘要"}</h2></div>${factsTable(en ? [["Service model", "Remote software product studio for SaaS MVPs, API integrations, workflow automation and internal tools."], ["Starting budget", "Productized service packages start from USD 2,000."], ["Deliverables", "Source code, deployment documentation, runbook, interface notes, log notes, acceptance checklist and handover walkthrough."], ["Boundaries", "No financing promises, advertising ROI promises, platform approval promises, custody or ownerless projects."], ["Languages", "Chinese and English remote collaboration."]] : [["服务对象", "支持中文/英文远程协作；适合创业团队、运营团队、中小企业和需要外部产品开发能力的业务负责人。"], ["起步预算", "产品化服务包从 USD $2,000 起。"], ["主要交付物", "源码、部署文档、运行手册、接口说明、环境变量清单、日志说明、验收清单和远程交付讲解。"], ["常见项目", "SaaS MVP、API Integration、Workflow Automation、企业内部工具、数据看板和第三方系统串接。"], ["不承诺事项", "不承诺融资、拉新、广告 ROI、平台审核结果、第三方 API 永久可用或没有验收标准的纯想法落地。"]])}</section>
    <section class="section" aria-labelledby="entity-title"><div class="section-head"><p class="eyebrow">Trust & Entity</p><h2 id="entity-title">${en ? "Public entity and delivery boundary" : "公开实体与交付边界"}</h2><p>${en ? "ICOJF keeps its own brand, canonical URLs, sitemap, robots policy and page copy for software product services." : "ICOJF 在品牌、canonical、sitemap、robots 和页面内容上保持独立的软件产品服务定位。"}</p></div><div class="check-grid"><article class="check-card"><h3>GitHub</h3><p>${en ? "Public engineering profile signal for software delivery and source handover expectations." : "公开工程资料信号，用于支撑软件交付和源码交接能力。"}</p><a href="https://github.com/yfjelley" rel="me noopener" target="_blank">GitHub profile</a></article><article class="check-card"><h3>LinkedIn</h3><p>${en ? "External identity reference for remote collaboration and service boundary consistency." : "站外身份资料，用于保持远程协作和服务边界口径一致。"}</p><a href="${sameAs[1]}" rel="me noopener" target="_blank">LinkedIn profile</a></article><article class="check-card"><h3>${en ? "About ICOJF" : "关于 ICOJF"}</h3><p>${en ? "Service scope, handover assets, project fit and what the studio does not accept." : "服务范围、交付资产、适合项目和不适合项目的明确说明。"}</p><a href="/about/">${en ? "Read about page" : "查看关于页"}</a></article></div></section>
    <section class="section soft" aria-labelledby="notes-title"><div class="section-head"><p class="eyebrow">Engineering Notes</p><h2 id="notes-title">${en ? "Engineering notes for AI and search extraction" : "工程笔记"}</h2><p>${en ? "Long-form notes explain how the studio handles integration boundaries, handover and acceptance." : "用英文工程文章解释 API 集成、Webhook、SaaS MVP 和业务自动化里的真实边界。"}</p></div><div class="article-grid">${notes.slice(0, 3).map((note) => `<article class="article-card"><h3>${note.h1}</h3><p>${note.summary}</p><a href="/${note.slug}/">Read note</a></article>`).join("")}</div></section>
    <section class="section soft" aria-labelledby="contact-title"><div class="contact-band"><div class="section-head"><p class="eyebrow">Start a Build Brief</p><h2 id="contact-title">${en ? "Send the project context first." : "提交项目简述"}</h2><p>${en ? "Share existing systems, users, integrations, budget range from $2,000, timeline and acceptance owner." : "发来项目背景、现有系统、目标用户、需要集成的平台、$2,000 起的预算范围和期望上线时间。"}</p><div class="cta-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="${mailtoBrief(language)}">Email template</a></div></div></div></section>`;
  return layout({ title, description, canonical, language, body, graph });
}

function servicePage(service, language = "zh-CN") {
  const en = language === "en";
  const slug = en ? `en/${service.enSlug}` : service.slug;
  const canonical = urlFor(slug);
  const title = en ? `${service.enTitle} | Scoped Build, Handover and Acceptance | ICOJF Studio` : service.title;
  const description = en ? `${service.enTitle} by ICOJF Studio, covering scope, inputs, delivery assets, acceptance checks, runbooks and remote handover.` : service.description;
  const servicePackage = packageForService(service);
  const serviceNode = { "@type": "Service", "@id": `${canonical}#service`, "name": service.enTitle, "description": service.summary, "serviceType": service.enTitle, "provider": { "@id": `${site}/#organization` }, "areaServed": ["Remote", "Hong Kong", "Singapore", "Taiwan", "United States"] };
  if (servicePackage) {
    serviceNode.offers = {
      "@type": "Offer",
      "name": servicePackage.enName,
      "priceCurrency": "USD",
      "price": servicePackage.enPrice.replace("From $", "").replace(",", ""),
      "description": servicePackage.enFit,
      "url": en ? `${site}${servicePackage.hrefEn}` : `${site}${servicePackage.hrefZh}`
    };
  }
  const graph = [
    orgGraph(),
    { "@type": "WebPage", "@id": `${canonical}#webpage`, "url": canonical, "name": en ? service.enTitle : service.zhTitle, "description": description, "inLanguage": language, "isPartOf": { "@id": `${site}/#website` } },
    serviceNode,
    { "@type": "FAQPage", "@id": `${canonical}#faq`, "mainEntity": (en ? service.enFaqs : service.faqs).map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": en ? "Home" : "首页", "item": en ? `${site}/en/` : `${site}/` }, { "@type": "ListItem", "position": 2, "name": en ? service.enTitle : service.zhTitle, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${en ? "/en/" : "/"}">${en ? "Home" : "首页"}</a><span>/</span><span>${escapeHtml(en ? service.enTitle : service.zhTitle)}</span></nav><p class="eyebrow">Service</p><h1>${escapeHtml(en ? service.enTitle : service.zhTitle)}</h1><p class="hero-lede">${escapeHtml(en ? service.enIntro : service.zhIntro)}</p><div class="hero-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="#faq">FAQ</a></div></section>
  ${servicePackage ? `<section class="section soft"><div class="section-head"><p class="eyebrow">Service Package</p><h2>${en ? "Package, price and acceptance" : "服务包、价格和验收"}</h2><p>${en ? "The package anchors scope before implementation, with pricing from $2,000 across ICOJF services." : "先用服务包固定范围，再进入开发。ICOJF 服务从 $2,000 起，不做没有验收负责人的项目。"}</p></div>${renderPackageDetail(servicePackage, language)}</section>` : ""}
  <section class="section soft"><div class="section-head"><p class="eyebrow">Service Facts</p><h2>${en ? "Inputs, deliverables and acceptance" : "资料、交付物和验收"}</h2></div>${factsTable(en ? [["Positioning", "Software Product Studio"], ["Typical inputs", service.topics.join(", ")], ["Delivery assets", "Source code, deployment documentation, runbook, environment variables, logs and acceptance checklist."], ["Acceptance", "Acceptance is based on agreed workflow behavior, not financing, growth or third-party approval outcomes."], ["Handover", "Remote walkthrough, owner checklist and maintenance notes."]] : [["定位", "Software Product Studio"], ["常见输入", service.topics.join("、")], ["交付资产", `${service.deliverables.join("；")}；验收清单`], ["验收方式", "按约定功能、接口路径、日志、异常处理、部署文档和交接清单验收。"], ["合作边界", "不承诺融资、广告 ROI、平台审核结果或第三方 API 永久可用。"]])}</section>
  <section class="section"><div class="section-head"><p class="eyebrow">Scope</p><h2>${en ? "What the build usually covers" : "常见开发范围"}</h2></div><div class="check-grid">${service.topics.map((topic) => `<article class="check-card"><h3>${escapeHtml(topic)}</h3><p>${escapeHtml(en ? `The project defines how ${topic.toLowerCase()} affects implementation, operations and acceptance.` : `项目会确认 ${topic} 对实现、运行和验收的影响。`)}</p></article>`).join("")}</div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Delivery Samples</p><h2>${en ? "Sample assets included in the handover model" : "交付模型中的样例资产"}</h2><p>${en ? "These examples make the expected handover concrete before the project starts." : "这些样例让交付预期更具体，避免只用口头描述讨论专业性。"}</p></div>${renderDeliverySamples(language)}</section>
  <section id="faq" class="section faq-section"><div class="section-head centered"><p class="eyebrow">FAQ</p><h2>FAQ</h2></div><div class="faq-list">${(en ? service.enFaqs : service.faqs).map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>
  <section class="section soft"><div class="contact-band"><div class="section-head"><p class="eyebrow">Contact</p><h2>${en ? "Send the project brief." : "发送项目简述"}</h2><p>${en ? "Include context, existing systems, required integrations, budget range from $2,000, timeline and acceptance owner." : "请附上项目背景、现有系统、接口资料、$2,000 起的预算范围、上线时间和验收负责人。"}</p><div class="cta-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="${mailtoBrief(language)}">${contactEmail}</a></div></div></div></section>`;
  return layout({ title, description, canonical, language, body, graph });
}

function longTailPage(page) {
  const canonical = urlFor(page.slug);
  const relatedService = services.find((service) => service.enTitle === page.service);
  const graph = [
    orgGraph(),
    { "@type": "WebPage", "@id": `${canonical}#webpage`, "url": canonical, "name": page.h1, "description": page.description, "inLanguage": "en", "isPartOf": { "@id": `${site}/#website` } },
    { "@type": "Service", "@id": `${canonical}#service`, "name": page.h1, "description": page.summary, "serviceType": page.service, "provider": { "@id": `${site}/#organization` }, "areaServed": ["Remote", "Hong Kong", "Singapore", "Taiwan", "United States"] },
    { "@type": "FAQPage", "@id": `${canonical}#faq`, "mainEntity": page.faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": `${site}/en/` }, { "@type": "ListItem", "position": 2, "name": "Solution Pages", "item": `${site}/en/solutions/` }, { "@type": "ListItem", "position": 3, "name": page.h1, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/en/">Home</a><span>/</span><a href="/en/solutions/">Solution Pages</a></nav><p class="eyebrow">Solution Page</p><h1>${escapeHtml(page.h1)}</h1><p class="hero-lede">${escapeHtml(page.summary)}</p><div class="hero-actions"><a class="button primary" href="/contact/">Start a brief</a>${relatedService ? `<a class="button secondary" href="/en/${relatedService.enSlug}/">Related service</a>` : ""}</div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Delivery Facts</p><h2>Inputs, deliverables and acceptance</h2></div>${factsTable([["Related service", page.service], ["Typical inputs", page.inputs.join(", ")], ["Delivery assets", page.deliverables.join(", ")], ["Acceptance checks", page.acceptance.join(", ")], ["Boundary", "The work covers software delivery and handover, not growth guarantees, platform approvals or third-party API availability."]])}</section>
  <section class="section content-band"><article class="technical-article"><p class="article-summary">${escapeHtml(page.summary)}</p>${page.sections.map(([h, p]) => `<section><h2>${escapeHtml(h)}</h2><p>${escapeHtml(p)}</p></section>`).join("")}<section><h2>Related pages</h2><div class="policy-links">${relatedService ? `<a href="/en/${relatedService.enSlug}/">${relatedService.enTitle}</a>` : ""}<a href="/engineering-notes/">Engineering notes</a><a href="/contact/">Project brief</a></div></section></article></section>
  <section id="faq" class="section faq-section"><div class="section-head centered"><p class="eyebrow">FAQ</p><h2>Common questions</h2></div><div class="faq-list">${page.faqs.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>`;
  return layout({ title: page.title, description: page.description, canonical, language: "en", body, graph });
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
  const replay =
    note.slug.includes("api-data-sync")
      ? {
          type: "第三方 API 数据同步",
          risk: "鉴权范围、字段映射、重复事件、限频和失败重试。",
          assets: "字段映射表、同步流程、异常队列、审计日志、部署文档和验收脚本。",
          checks: ["新增记录同步", "重复事件幂等", "缺失字段进入人工队列", "接口超时后可重试", "日志能定位失败原因"],
          lesson: "先把一个记录类型做成可回放、可观测、可交接的闭环，再扩展到更多字段或系统。"
        }
      : note.slug.includes("saas-mvp")
        ? {
            type: "SaaS MVP 第一版交接",
            risk: "范围膨胀、角色权限不清、后台缺失、部署资料不足和验收口径漂移。",
            assets: "核心页面、后台管理、数据模型、权限说明、部署文档、运行手册和验收清单。",
            checks: ["普通用户提交资料", "管理员处理记录", "状态流转可追踪", "权限边界可验证", "部署重启后流程正常"],
            lesson: "第一版应围绕一个主流程交付完整闭环，后续想法进入独立迭代清单。"
          }
        : {
            type: "人工流程自动化",
            risk: "规则不稳定、异常不可见、误自动化高风险步骤、没有回滚路径。",
            assets: "自动化脚本或内部工具、字段规范、异常队列、提醒模板、日志说明和回滚步骤。",
            checks: ["正常样本自动处理", "缺字段样本进入异常队列", "高风险动作保留人工确认", "报表输出可复核", "错误记录可回滚"],
            lesson: "自动化应先减少重复劳动，再逐步扩大范围；高风险判断要保留人工确认。"
          };
  const graph = [
    orgGraph(),
    { "@type": "Article", "@id": `${canonical}#article`, "headline": note.h1, "description": note.description, "url": canonical, "author": { "@id": `${site}/#organization` }, "publisher": { "@id": `${site}/#organization` }, "datePublished": today, "dateModified": today, "inLanguage": "zh-CN" },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": `${site}/` }, { "@type": "ListItem", "position": 2, "name": "案例笔记", "item": `${site}/case-notes/` }, { "@type": "ListItem", "position": 3, "name": note.h1, "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><a href="/case-notes/">案例笔记</a></nav><p class="eyebrow">Case Note</p><h1>${escapeHtml(note.h1)}</h1><p class="hero-lede">${escapeHtml(note.summary)}</p></section><section class="section content-band"><article class="technical-article"><p class="article-summary">${escapeHtml(note.summary)}</p><section><h2>复盘摘要</h2>${factsTable([["项目类型", replay.type], ["主要风险", replay.risk], ["交付资产", replay.assets], ["可复用经验", replay.lesson]])}</section>${note.sections.map(([h, p]) => `<section><h2>${escapeHtml(h)}</h2><p>${escapeHtml(p)}</p></section>`).join("")}<section><h2>验收清单</h2><ul class="check-list">${replay.checks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section><section><h2>适合参考</h2><p>这类笔记适合用于判断项目范围、验收方式和交付边界，不展示客户身份、商业结果或不可验证承诺。</p></section></article></section>`;
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
  const description = "关于 ICOJF Studio：远程软件产品工作室，提供 SaaS MVP、API Integration、Workflow Automation、内部工具、源码交付、部署文档、运行手册和验收清单。";
  const graph = [
    orgGraph(),
    { "@type": "AboutPage", "@id": `${canonical}#webpage`, "url": canonical, "name": "关于 ICOJF Studio", "description": description, "inLanguage": "zh-CN", "about": { "@id": `${site}/#organization` } }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><span>关于</span></nav><p class="eyebrow">About</p><h1>关于 ICOJF Studio</h1><p class="hero-lede">ICOJF Studio 是远程软件产品工作室，专注 SaaS MVP、API Integration、Workflow Automation、企业内部工具和数据看板。项目以源码、部署文档、运行手册、验收清单和远程交付讲解为核心资产。</p></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Entity Facts</p><h2>公开实体资料</h2><p>这一页用于给客户、搜索系统和 AI 引用系统确认 ICOJF Studio 的服务身份、规范域名和交付边界。</p></div>${factsTable([["品牌", "ICOJF Studio"], ["规范域名", "https://icojf.com/"], ["联系邮箱", contactEmail], ["服务语言", "中文/英文远程协作"], ["服务范围", "SaaS MVP、API Integration、Workflow Automation、内部工具、数据看板和第三方系统集成"], ["交付物", "源码、部署文档、运行手册、接口说明、日志说明、验收清单和远程交付讲解"], ["站外资料", sameAs.join(" | ")], ["边界", "不承诺融资、广告 ROI、平台审核结果、资金托管或没有验收负责人的项目"]])}</section>
  <section class="section"><div class="founder-panel"><div><p class="eyebrow">Founder / Builder</p><h2>由独立软件产品开发者直接负责范围和交付</h2><p>ICOJF Studio 的专业感不靠泛泛的营销承诺，而靠项目范围、技术边界、源码交付、运行手册和验收证据。合作前会先确认项目是否适合进入开发，避免没有负责人、没有资料或没有验收方式的需求直接开工。</p><div class="policy-links"><a href="${sameAs[0]}" rel="me noopener" target="_blank">GitHub profile</a><a href="${sameAs[1]}" rel="me noopener" target="_blank">LinkedIn profile</a><a href="/how-we-work/">How We Work</a></div></div><div class="founder-facts"><span>Full-stack product delivery</span><span>API integration and automation</span><span>Source code handover</span><span>Runbook and acceptance checks</span></div></div></section>
  <section class="section"><div class="section-head"><p class="eyebrow">How ICOJF Works</p><h2>工作方式</h2><p>项目先判断目标、输入资料、系统边界和验收方式，再决定是否进入原型或开发。</p></div><div class="detail-grid"><article><h3>1. 范围评估</h3><p>先确认现有系统、目标用户、必须上线的第一阶段功能、第三方接口、预算范围和上线时间。无法确认验收口径的需求会先拆解为更小的验证范围。</p></article><article><h3>2. 原型和数据边界</h3><p>对 SaaS MVP、API 集成和自动化项目，先确认页面流程、数据对象、权限、字段映射、异常路径和客户需提供的账号或文档。</p></article><article><h3>3. 开发和验收</h3><p>按功能切片交付，保留演示环境、变更记录、日志说明和验收样本。验收看约定系统行为，不看融资、增长或第三方平台审核结果。</p></article><article><h3>4. 交接和维护建议</h3><p>交付源码、部署文档、运行手册、环境变量说明、日志说明和后续维护建议，避免系统只能由开发者本人理解。</p></article></div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Delivery Samples</p><h2>可检查的交付样例</h2><p>站点会用脱敏样例解释交付物，而不是只写“专业开发”。真实项目会按范围提供对应源码、部署说明、字段映射、日志说明、运行手册和验收清单。</p></div>${renderDeliverySamples()}</section>
  <section class="section"><div class="section-head"><p class="eyebrow">Price Anchor</p><h2>起步预算</h2><p>ICOJF Studio 采用产品化服务包筛选项目，最小服务包从 $2,000 起。低于这个范围的需求通常不适合保留足够的文档、验收和交接质量。</p></div>${renderPackageCards()}</section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Project Fit</p><h2>适合与不适合的项目</h2></div><div class="answer-grid"><article><h3>适合</h3><ul class="check-list"><li>已经有业务负责人和第一阶段验收标准。</li><li>需要 SaaS MVP、API 集成、内部工具、数据看板或流程自动化。</li><li>愿意提供接口文档、测试账号、样本数据和及时反馈。</li><li>接受范围收敛、阶段交付、源码交接和运行手册。</li></ul></article><article><h3>不适合</h3><ul class="check-list"><li>只要求复制竞品，但没有目标用户和验收方式。</li><li>要求承诺融资、拉新、广告 ROI 或第三方平台审核结果。</li><li>没有明确负责人，或无法提供测试资料、接口权限和反馈窗口。</li><li>只追求极低预算，不接受文档、验收和后续维护边界。</li></ul></article></div></section>
  <section class="section"><div class="section-head"><p class="eyebrow">Trust</p><h2>站外资料和交付边界</h2></div><div class="check-grid"><article class="check-card"><h3>GitHub</h3><p>用于连接公开工程资料、源码交付能力和技术背景。</p><a href="${sameAs[0]}" rel="me noopener" target="_blank">GitHub profile</a></article><article class="check-card"><h3>LinkedIn</h3><p>用于保持站外身份、服务边界和远程协作信息一致。</p><a href="${sameAs[1]}" rel="me noopener" target="_blank">LinkedIn profile</a></article><article class="check-card"><h3>项目筛选</h3><p>适合有明确负责人、验收标准、资料来源和预算边界的软件产品项目。</p><a href="/contact/">提交项目简述</a></article></div></section>
  <section class="section faq-section"><div class="section-head centered"><p class="eyebrow">FAQ</p><h2>常见问题</h2></div><div class="faq-list"><article><h3>ICOJF Studio 做什么？</h3><p>主要做 SaaS MVP、API Integration、Workflow Automation、企业内部工具、数据看板和第三方系统串接。</p></article><article><h3>是否支持英文项目？</h3><p>支持中文和英文远程协作，英文服务页和工程笔记用于让搜索系统、客户和 AI 引用系统理解交付范围。</p></article><article><h3>项目开始前需要什么？</h3><p>需要项目背景、现有系统、目标用户、接口文档或样本数据、预算范围、期望上线时间和验收负责人。</p></article><article><h3>交付后客户能接手吗？</h3><p>交付目标是可维护和可验收，通常包含源码、部署文档、运行手册、环境变量说明、日志说明和远程交付讲解。</p></article></div></section>`;
  return layout({ title, description, canonical, language: "zh-CN", body, graph });
}

function contactPage() {
  const canonical = urlFor("contact");
  const title = "提交项目简述 | ICOJF Studio 软件产品工作室";
  const description = "联系 ICOJF Studio，提交 SaaS MVP、API Integration、Workflow Automation 或企业内部工具开发项目简述；支持中文/英文远程协作。";
  const faqs = [
    ["第一次联系需要写多详细？", "建议先写项目目标、当前阻塞点、现有系统、第一阶段必须上线的功能、预算范围、上线时间和验收负责人。"],
    ["没有完整需求文档可以联系吗？", "可以，但需要至少能说明业务目标、目标用户、现有资料和最小验收方式。复杂项目可以先做一页范围评估。"],
    ["能否只做 API 或自动化的一小段？", "可以。单接口验证、单流程自动化或一个内部工具切片通常更适合先确认权限、字段、异常路径和交付方式。"],
    ["多久能得到回复？", "通常先按资料完整度判断是否适合进入范围评估。如果缺少接口文档、测试账号或负责人，会先列出需要补齐的资料。"]
  ];
  const graph = [
    orgGraph(),
    { "@type": "ContactPage", "@id": `${canonical}#webpage`, "url": canonical, "name": "提交项目简述", "description": description, "inLanguage": "zh-CN" },
    { "@type": "FAQPage", "@id": `${canonical}#faq`, "mainEntity": faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">首页</a><span>/</span><span>联系</span></nav><p class="eyebrow">Contact</p><h1>提交项目简述</h1><p class="hero-lede">ICOJF Studio 是 Software Product Studio。请发来项目类型、现有系统、目标用户、需要集成的平台、$2,000 起的预算范围、期望上线时间和验收负责人。</p><div class="hero-actions"><a class="button primary" href="${mailtoBrief()}">使用邮件模板</a><a class="button secondary" href="#brief">查看 Brief 清单</a></div></section>
  <section id="brief" class="section content-band"><div class="section-head"><p class="eyebrow">Project Brief</p><h2>建议按这个结构发送</h2><p>信息越清楚，越容易判断是否适合进入范围评估或第一阶段开发。首次联系不需要生产密钥，不要发送不可撤销的高权限账号。</p></div><div class="brief-grid"><article><span>01</span><h3>项目类型</h3><p>选择 SaaS MVP、API Integration、Workflow Automation、内部后台、数据看板或其他软件产品交付。</p></article><article><span>02</span><h3>当前系统和平台</h3><p>列出现有网站、后台、表格、CRM、ERP、支付、邮件短信、数据平台、第三方 API 或 webhook。</p></article><article><span>03</span><h3>资料和权限</h3><p>说明是否已有接口文档、测试账号、样本数据、字段说明、OAuth 应用、API Key 或 webhook 配置权限。</p></article><article><span>04</span><h3>预算、时间和验收</h3><p>预算从 $2,000 起，请写可接受区间、期望上线时间、验收负责人、必须上线功能和可后置功能。</p></article></div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Price Anchor</p><h2>可选择的服务包</h2><p>如果不确定范围，可以先按最接近的服务包发送 Brief。实际报价按接口数量、页面数量、数据复杂度、交接要求和上线窗口确认。</p></div>${renderPackageCards()}</section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Handover Model</p><h2>交付流程</h2></div><div class="check-grid"><article class="check-card"><h3>范围评估</h3><p>确认项目是否适合进入开发，拆出第一阶段目标、客户需提供资料和验收方式。</p></article><article class="check-card"><h3>原型或接口验证</h3><p>复杂项目先确认页面流程、数据对象、字段映射、第三方权限和异常路径。</p></article><article class="check-card"><h3>开发和验收</h3><p>按功能切片交付，配合样本数据、日志、异常处理和验收清单检查。</p></article><article class="check-card"><h3>源码和运行手册</h3><p>交付源码、部署文档、环境变量说明、运行手册、日志说明和远程讲解。</p></article></div></section>
  <section class="section"><div class="section-head"><p class="eyebrow">Contact Details</p><h2>联系方式和项目资料</h2></div><div class="answer-grid"><article><h3>邮箱</h3><p><a href="${mailtoBrief()}">${contactEmail}</a></p><p>邮件模板会自动带上项目类型、系统平台、预算、时间和验收负责人字段。也可以直接发送到邮箱。</p></article><article><h3>请尽量附上</h3><ul class="check-list"><li>项目目标和当前阻塞点。</li><li>现有系统、表格或接口文档。</li><li>第一阶段必须上线的核心功能。</li><li>$2,000 起的预算范围、上线时间和验收负责人。</li><li>第三方平台权限、测试账号或样本数据是否已经准备好。</li></ul></article></div></section>
  <section class="section faq-section"><div class="section-head centered"><p class="eyebrow">FAQ</p><h2>联系前常见问题</h2></div><div class="faq-list">${faqs.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>`;
  return layout({ title, description, canonical, language: "zh-CN", body, graph });
}

function howWeWorkPage(language = "zh-CN") {
  const en = language === "en";
  const canonical = urlFor(en ? "en/how-we-work" : "how-we-work");
  const title = en ? "How We Work | Scoped Software Delivery | ICOJF Studio" : "工作方式 | 软件产品交付流程 | ICOJF Studio";
  const description = en ? "How ICOJF Studio scopes, builds, accepts and hands over SaaS MVPs, API integrations, workflow automation and internal tools." : "ICOJF Studio 工作方式：范围评估、原型或接口验证、分阶段开发、上线交接、源码、部署文档、运行手册和验收清单。";
  const graph = [
    orgGraph(),
    { "@type": "WebPage", "@id": `${canonical}#webpage`, "url": canonical, "name": en ? "How We Work" : "工作方式", "description": description, "inLanguage": language, "isPartOf": { "@id": `${site}/#website` } },
    { "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`, "itemListElement": [{ "@type": "ListItem", "position": 1, "name": en ? "Home" : "首页", "item": en ? `${site}/en/` : `${site}/` }, { "@type": "ListItem", "position": 2, "name": en ? "How We Work" : "工作方式", "item": canonical }] }
  ];
  const body = `<section class="content-hero compact"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="${en ? "/en/" : "/"}">${en ? "Home" : "首页"}</a><span>/</span><span>${en ? "How We Work" : "工作方式"}</span></nav><p class="eyebrow">How We Work</p><h1>${en ? "A scoped delivery process before implementation." : "先把范围、资料、验收和交接讲清楚。"}</h1><p class="hero-lede">${en ? "ICOJF Studio is a Software Product Studio. It keeps builds small enough to launch, accept and maintain, starting with inputs and acceptance criteria instead of a broad feature wish list." : "ICOJF Studio 是 Software Product Studio，支持中文/英文远程协作。工作方式是先确认业务目标、现有系统、客户需提供资料、预算、上线窗口和验收负责人，再决定进入原型、接口验证或开发。"}</p><div class="hero-actions"><a class="button primary" href="/contact/">${en ? "Start a brief" : "提交项目简述"}</a><a class="button secondary" href="${mailtoBrief(language)}">${en ? "Email template" : "邮件模板"}</a></div></section>
  <section class="section"><div class="section-head"><p class="eyebrow">Workflow</p><h2>${en ? "The operating sequence" : "合作顺序"}</h2><p>${en ? "Every step creates a concrete artifact that can be reviewed before the next step." : "每一步都产生可检查的交付资产，避免项目只靠口头理解推进。"}</p></div><div class="timeline-grid">${workSteps.map((step) => `<article><span>${escapeHtml((en ? step.enTitle : step.zhTitle).slice(0, 1))}</span><h3>${escapeHtml(en ? step.enTitle : step.zhTitle)}</h3><p>${escapeHtml(en ? step.enText : step.zhText)}</p></article>`).join("")}</div></section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Service Packages</p><h2>${en ? "Packages start from $2,000." : "服务包从 $2,000 起"}</h2><p>${en ? "The starting budget is visible before contact so unfit projects can self-filter." : "价格锚点提前公开，方便项目先判断是否适合保留足够的文档、验收和交接质量。"}</p></div>${renderPackageCards(language)}</section>
  <section class="section"><div class="section-head"><p class="eyebrow">Delivery Assets</p><h2>${en ? "What professional handover looks like" : "专业交付应该能被检查"}</h2><p>${en ? "The expected handover is source code plus operational artifacts, not only a deployed demo." : "预期交付不是只有一个演示站点，而是源码加上能让客户继续维护的运行资产。"}</p></div>${renderDeliverySamples(language)}</section>
  <section class="section soft"><div class="section-head"><p class="eyebrow">Acceptance Boundary</p><h2>${en ? "What acceptance proves" : "验收证明什么"}</h2></div>${factsTable(en ? [["Acceptance proves", "The agreed system behavior works on repeatable samples, including normal paths and common failure paths."], ["Acceptance does not prove", "Financing, user growth, advertising ROI, third-party platform approval or permanent API availability."], ["Client responsibility", "Provide docs, test accounts, sample data, timely feedback, budget range and an accountable acceptance owner."], ["Handover assets", "Source code / Source Code, deployment documentation, runbook, environment variable notes, log fields and maintenance notes."]] : [["验收证明", "约定系统行为能在可复现样本上运行，包括正常路径和常见失败路径。"], ["验收不证明", "融资、用户增长、广告 ROI、第三方平台审核结果或第三方 API 永久可用。"], ["客户责任", "提供接口文档、测试账号、样本数据、及时反馈、预算范围和明确验收负责人。"], ["交付资产", "Source Code（源码）、Deployment Docs（部署文档）、Runbook / runbook（运行手册）、环境变量说明、日志字段和维护建议。"]])}</section>`;
  return layout({ title, description, canonical, language, body, graph });
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
  ["how-we-work", "monthly", "0.82"],
  ["en/how-we-work", "monthly", "0.82"],
  ["about", "monthly", "0.75"],
  ["contact", "monthly", "0.7"],
  ["case-notes", "monthly", "0.8"],
  ...caseNotes.map((note) => [note.slug, "monthly", "0.8"]),
  ["engineering-notes", "monthly", "0.8"],
  ...notes.map((note) => [note.slug, "monthly", "0.78"]),
  ["en/solutions", "monthly", "0.82"],
  ...longTailPages.map((page) => [page.slug, "monthly", "0.8"]),
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
write(join(publicDir, "en", "solutions", "index.html"), indexPage({ slug: "en/solutions", title: "Solution Pages | API Integration, Dashboards and Workflow Automation | ICOJF Studio", description: "ICOJF Studio solution pages for CRM API integration, webhook integration, internal dashboards, Google Sheets automation, Stripe handover and ERP data sync.", h1: "Specific integration and automation solution pages.", intro: "These English pages map common search and AI-answer queries to concrete software delivery boundaries, inputs, deliverables and acceptance checks.", items: longTailPages, language: "en" }));
for (const page of longTailPages) write(join(publicDir, page.slug, "index.html"), longTailPage(page));
write(join(publicDir, "about", "index.html"), aboutPage());
write(join(publicDir, "contact", "index.html"), contactPage());
write(join(publicDir, "how-we-work", "index.html"), howWeWorkPage());
write(join(publicDir, "en", "how-we-work", "index.html"), howWeWorkPage("en"));
write(join(publicDir, "terms.html"), policyPage("terms"));
write(join(publicDir, "privacy.html"), policyPage("privacy"));

write(join(publicDir, "robots.txt"), `User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no,use=reference
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

User-agent: Claude-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

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
- Starting budget: productized service packages start from USD 2,000
- Public entity links: ${sameAs.join(", ")}
- AI access policy: AI search and user-triggered AI retrieval may reference public pages; AI model training crawlers are not granted permission.

## Productized service packages

${servicePackages.map((item) => `- ${item.enName}: ${item.enPrice}; timeline ${item.timeline}; fit: ${item.enFit}; deliverables include ${item.enDeliverables.join(", ")}.`).join("\n")}

## Core pages

- https://icojf.com/ - Chinese software product studio homepage.
- https://icojf.com/en/ - English software product studio homepage.
${services.map((service) => `- https://icojf.com/${service.slug}/ - ${service.zhTitle}: ${service.description}
- https://icojf.com/en/${service.enSlug}/ - ${service.enTitle}: ${service.summary}`).join("\n")}
- https://icojf.com/how-we-work/ - Chinese page describing scope review, staged build, launch handover, acceptance and source-code delivery.
- https://icojf.com/en/how-we-work/ - English page describing scoped software delivery, package pricing from USD 2,000 and handover assets.
- https://icojf.com/about/ - Entity, service boundary, trust links and handover model.
- https://icojf.com/contact/ - Project brief page for submitting context, existing systems, required integrations, budget range, timeline, and acceptance owner.

## Solution pages

- https://icojf.com/en/solutions/ - Index of specific English service and integration pages.
${longTailPages.map((page) => `- https://icojf.com/${page.slug}/ - ${page.summary}`).join("\n")}

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
