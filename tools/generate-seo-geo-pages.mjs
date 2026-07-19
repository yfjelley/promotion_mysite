import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { exchangeFeeData } from "./exchange-fee-data.mjs";
import { hyperliquidFeeData } from "./hyperliquid-fee-data.mjs";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const today = "2026-07-17";
const hyperliquidCheckedDate = "2026-07-19";
const hyperliquidSocialImage = "/hyperliquid-bot-social.jpg";
const llmsUpdatedAt = hyperliquidCheckedDate;
const articleCatalogPublishedDate = "2026-07-07";
const site = "https://pddjf.com";
const stylesheetHref = "/styles.css?v=20260719-hyperliquid-buyer-intent";
const scriptHref = "/scripts.js?v=20260719-hyperliquid-buyer-intent";
const contactScriptHref = scriptHref;
const releaseAssetDir = join(publicDir, "__release", "20260715-p2-ux-assets");
const githubProfileUrl = "https://github.com/yfjelley";
const engineeringNotesUrl = "https://github.com/yfjelley/signalcraft-labs-engineering-notes";
const linkedinProfileUrl = "https://www.linkedin.com/in/%E9%94%8B-%E6%9D%A8-968956116/";

const contact = {
  email: "contact@pddjf.com",
  wechat: "btc1688",
  telegram: "@yf16881",
  telegramUrl: "https://t.me/yf16881"
};

const externalTrustLinks = [
  ["GitHub profile", githubProfileUrl, "公开 GitHub 资料，用于连接站点品牌、工程资料和源码交付能力。"],
  ["Engineering notes", engineeringNotesUrl, "脱敏工程资料仓库，包含 Webhook 去重/风控 dry-run demo、权限安全建议、平台接入笔记和验收清单。"],
  ["LinkedIn profile", linkedinProfileUrl, "LinkedIn 公开资料，用于保持站外实体信息、服务边界和联系方式一致。"]
];

const externalTrustLinksEn = [
  ["GitHub profile", githubProfileUrl, "Public GitHub profile connecting the SignalCraft Labs brand with engineering work and source-delivery capability."],
  ["Engineering notes", engineeringNotesUrl, "Sanitized engineering notes covering webhook idempotency, risk dry-runs, API permissions, integration constraints and acceptance checklists."],
  ["LinkedIn profile", linkedinProfileUrl, "Public LinkedIn profile used to keep the business identity, service boundaries and contact path consistent across the web."]
];

const officialReferenceLinks = [
  ["TradingView Webhook alerts", "https://www.tradingview.com/support/solutions/43000529348-how-to-configure-webhook-alerts/", "TradingView 官方 Webhook alert 说明。"],
  ["IBKR API documentation", "https://www.interactivebrokers.com/campus/ibkr-api-page/ibkr-api-home/", "Interactive Brokers 官方 API 文档入口，覆盖 TWS API、Web API、Excel API 和 FIX。"],
  ["Schwab Trader API", "https://developer.schwab.com/products/trader-api--individual", "Charles Schwab 官方 Trader API 产品入口。"],
  ["Alpaca Docs", "https://docs.alpaca.markets/us/", "Alpaca 官方 API 文档入口。"],
  ["FIX Trading Community", "https://fixtrading.org/standards/fix-protocol/", "FIX Trading Community 的 FIX Protocol 标准介绍。"],
  ["Binance Developer Docs", "https://developers.binance.com/docs/binance-spot-api-docs/rest-api/general-api-information", "Binance 官方开发者文档入口，覆盖 REST API 基础信息、限制和接口行为。"]
];

const hyperliquidReferenceLinks = [
  ["Hyperliquid fees", "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees", "Official 14-day weighted-volume tiers, staking discounts, maker rebates and developer fee formula."],
  ["Hyperliquid exchange endpoint", "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint", "Official order, cancel, TWAP, API wallet, subaccount and vault action reference."],
  ["Hyperliquid WebSocket", "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket", "Official mainnet and testnet real-time connection guidance, including reconnect expectations."],
  ["Hyperliquid info endpoint", "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint", "Official account, order, fill, fee, subaccount and vault query reference."]
];

const offers = [
  { name: "API Starter Package", price: "2000", label: "2000 美金起", description: "单一信号源、单一 API、基础风控、日志和测试环境执行链路。" },
  { name: "Execution System Package", price: "5000", label: "5000 美金起", description: "多规则、多品种、订单路由、风控引擎、监控日志和异常告警。" },
  { name: "Private Infrastructure Package", price: "10000", label: "10000 美金起", description: "多接口、多账户、后台、权限、审计日志、私有化部署和运维交接。" }
];

const packageDescriptionsEn = {
  "API Starter Package": "Single signal source, single API, basic risk checks, logs and test execution path.",
  "Execution System Package": "Multiple rules and instruments, order routing, risk engine, monitoring logs and exception alerts.",
  "Private Infrastructure Package": "Multiple APIs and accounts, dashboard, permissions, audit logs, private deployment and operations handoff."
};

const baseInputRows = [
  ["信号来源", "TradingView Alert、研究脚本、人工确认、组合规则或外部事件。"],
  ["接口权限", "券商、交易所、FIX、REST/WebSocket 或内部系统的 API 权限状态。"],
  ["交易规则", "入场、出场、仓位、止损止盈、撤单、冷却和异常处理。"],
  ["风控边界", "最大仓位、单笔风险、只减仓、暂停开关、价格偏离和告警。"],
  ["部署环境", "客户服务器、VPS、Docker、日志、告警、备份和权限要求。"]
];

const baseInputRowsEn = [
  ["Signal source", "TradingView alert, research script, manual approval, portfolio rule or external event."],
  ["API access", "Broker API, exchange API, FIX, REST/WebSocket or internal system permission status."],
  ["Trading rules", "Entry, exit, sizing, stops, take-profit, cancel flow, cooldowns and exception handling."],
  ["Risk limits", "Max position, per-order risk, reduce-only mode, pause switch, price protection and alerts."],
  ["Deployment", "Customer server, VPS, Docker, logs, alerts, backups and permission requirements."]
];

const permissionRows = [
  ["读取权限", "需要", "用于查询余额、持仓、订单状态、成交回报和日志对账。"],
  ["交易权限", "按项目需要", "只在自动执行项目中启用，并建议限制 IP、品种和订单范围。"],
  ["提现权限", "不需要", "不建议提供提现、划转或资金托管权限。"],
  ["管理员权限", "默认不需要", "除非客户明确要求部署协助，否则由客户自行保管账户和服务器主权限。"]
];

const permissionRowsEn = [
  ["Read access", "Required", "Used for balances, positions, order status, execution reports and log reconciliation."],
  ["Trading access", "Scope-based", "Enabled only when automatic execution is in scope, with IP, symbol and order limits where possible."],
  ["Withdrawal access", "Not needed", "Withdrawal, transfer or custody permissions should not be provided."],
  ["Admin access", "Usually not needed", "Server or account admin access stays under customer control unless deployment support is explicitly scoped."]
];

const acceptanceRows = [
  ["源码和配置", "源码、环境变量样例、配置说明和版本记录已交付。"],
  ["日志和告警", "每次信号、拒绝原因、订单请求、执行结果和异常都有可追踪记录。"],
  ["风控验证", "最大仓位、限频、只减仓、暂停开关、价格保护等规则通过测试。"],
  ["灰度上线", "先用测试环境、模拟盘或小资金范围验证，不以盈利结果作为验收条件。"],
  ["交付文档", "部署、重启、回滚、密钥轮换和常见故障处理说明已交付。"]
];

const acceptanceRowsEn = [
  ["Source and config", "Source code, environment examples, configuration notes and version notes are delivered."],
  ["Logs and alerts", "Signals, reject reasons, order requests, execution results and exceptions are traceable."],
  ["Risk validation", "Max position, rate limits, reduce-only rules, pause switch and price protection are tested."],
  ["Staged rollout", "Validation starts in a test, paper or limited live scope; returns are not the acceptance criterion."],
  ["Handoff docs", "Deployment, restart, rollback, key rotation and common incident notes are delivered."]
];

const brokerComparisonRows = [
  ["IBKR / TWS Gateway", "多资产账户、组合执行、持仓同步和审计日志。", "TWS Gateway / Client Portal 连接、订单类型、交易时段和账户权限。", "连接稳定性、数据权限、地区限制和账户风控以客户账户为准。"],
  ["Schwab API", "美股账户授权、组合数据、订单监控和规则执行。", "OAuth 授权、Token 续期、账户范围、订单请求和组合数据同步。", "API 权限、审核流程、地区可用性和平台政策可能变化。"],
  ["Alpaca API", "REST/WebSocket 执行、paper trading 验证和研究信号落地。", "API Key 权限、paper/live 环境切换、订单状态流和市场数据权限。", "资产类别、行情延迟、交易时段和订单能力以账户权限为准。"],
  ["FIX API", "专业订单路由、执行回报、UAT 测试和原始消息审计。", "FIX 版本、会话心跳、序号恢复、证书网络和消息字段映射。", "通常依赖接入方测试环境、证书、专线或审批流程。"]
];

const brokerComparisonRowsEn = [
  ["IBKR / TWS Gateway", "Multi-asset accounts, portfolio execution, position sync and audit logs.", "TWS Gateway / Client Portal connection, order types, trading hours and account permissions.", "Connection stability, data access, region limits and account controls depend on the customer account."],
  ["Schwab API", "US brokerage account authorization, portfolio data, order monitoring and rule execution.", "OAuth, token refresh, account scope, order requests and portfolio data sync.", "API access, approval flow, region availability and platform policy can change."],
  ["Alpaca API", "REST/WebSocket execution, paper-trading validation and research signal deployment.", "API key permissions, paper/live environments, order status streams and market data access.", "Asset support, data latency, trading hours and order capability depend on account permissions."],
  ["FIX API", "Professional order routing, execution reports, UAT and raw message audit trails.", "FIX version, heartbeat, sequence recovery, certificates, network setup and tag mapping.", "Usually depends on counterparty test environment, certificates, network and approval workflow."]
];

const platformDetailRows = {
  "broker-api/ibkr": [
    ["连接方式", "优先评估 TWS Gateway / Client Portal 的运行环境、断线重连、会话保持和账户登录流程。", "能稳定连接、断线告警、重连后不重复下单。"],
    ["订单与持仓", "确认股票、ETF、期权或组合订单类型、交易时段、撤单流程和成交回报字段。", "订单请求、拒单、撤单、成交回报和持仓同步都有日志。"],
    ["常见错误", "重点处理连接断开、权限不足、数据订阅缺失、订单类型不支持和交易时段限制。", "错误码归类、人工告警、暂停开关和回滚流程可演示。"]
  ],
  "broker-api/schwab": [
    ["授权流程", "围绕 OAuth 授权、Token 保存、续期、失效告警和重新授权流程设计。", "授权过期时系统停止自动请求并提示人工处理。"],
    ["账户范围", "先确认账户、应用审核、可用接口、订单类型、组合数据和地区限制。", "只对客户已授权账户和已确认接口范围开发。"],
    ["常见错误", "重点处理授权失效、权限不足、账户不可见、订单拒绝和接口返回变化。", "日志能定位授权、请求、响应、拒单和人工处理节点。"]
  ],
  "broker-api/alpaca": [
    ["环境切换", "区分 paper trading 与 live trading，明确 API Key、Base URL、数据权限和订单权限。", "测试环境验证通过后再决定是否进入小资金灰度。"],
    ["REST 与 WebSocket", "REST 负责下单、查询和账户状态，WebSocket 用于订单状态、行情事件或执行回报监听。", "订单状态流、断线重连和漏报补偿逻辑可测试。"],
    ["常见错误", "重点处理限频、数据权限不足、市场关闭、资产不可交易和订单状态不同步。", "错误原因、重试策略和人工告警写入审计日志。"]
  ],
  "fix-api-order-routing": [
    ["会话管理", "确认 FIX 版本、SenderCompID/TargetCompID、心跳、序号、重置规则和断线恢复。", "UAT 中验证登录、心跳、重连、序号恢复和登出流程。"],
    ["消息字段", "映射 NewOrderSingle、Cancel、ExecutionReport、Reject 等核心消息和接入方自定义字段。", "保留原始 FIX 消息、标准化状态和字段级错误。"],
    ["上线约束", "提前确认测试环境、证书、网络、白名单、审批周期和接入方验收脚本。", "上线前完成灰度、回滚、监控和人工暂停开关。"]
  ]
};

const platformDetailRowsEn = {
  "custom-trading-software-development": [
    ["Architecture and interfaces", "Document signal sources, API contracts, state ownership, order lifecycle and security boundaries before implementation.", "Architecture diagram, interface contract and failure paths are reviewed against the agreed workflow."],
    ["Execution and risk controls", "Implement validation, idempotency, submit/cancel/reject handling, position sync, exposure limits, price protection and manual pause.", "Replay covers duplicate events, rejects, partial fills, disconnects, position reconciliation and operator controls."],
    ["Operations and handoff", "Provide structured logs, alerts, configuration, deployment files, restart and rollback procedures, and source delivery.", "The customer can deploy, observe, pause, restart and roll back the system without sharing withdrawal credentials."]
  ],
  "broker-api/ibkr": [
    ["Connection model", "Evaluate TWS Gateway / Client Portal runtime, reconnect behavior, session lifecycle and account login flow.", "Stable connection, disconnect alerts and no duplicate routing after reconnect."],
    ["Orders and positions", "Confirm stocks, ETFs, options or portfolio order types, trading hours, cancel flow and execution report fields.", "Order requests, rejects, cancels, fills and position sync are logged."],
    ["Common errors", "Handle disconnects, missing permissions, missing data subscriptions, unsupported order types and trading-hour restrictions.", "Errors are classified with alerts, pause controls and rollback steps."]
  ],
  "fix-api-order-routing": [
    ["Session management", "Confirm FIX version, SenderCompID/TargetCompID, heartbeat, sequence numbers, reset rules and recovery behavior.", "UAT validates login, heartbeat, reconnect, sequence recovery and logout."],
    ["Message fields", "Map NewOrderSingle, Cancel, ExecutionReport, Reject and counterparty-specific tags.", "Raw FIX messages, normalized status and field-level errors are preserved."],
    ["Go-live constraints", "Confirm test environment, certificates, network, allowlists, approval timeline and UAT scripts early.", "Staged rollout, rollback, monitoring and manual pause are verified before production use."]
  ],
  "hyperliquid-api-trading-bot-development": [
    ["Signing and wallet model", "Separate the main wallet, API/agent wallet, subaccount or vault role; document every signed action and nonce owner.", "Testnet proves approval, order, cancel and permission-revocation paths without exposing a main-wallet private key to the runtime."],
    ["Order lifecycle", "Use cloid-based idempotency, normalize resting and filled responses, and reconcile open orders, historical orders and fills.", "Replay covers duplicate intent, partial fill, reject, cancel, stale nonce, process restart and position reconciliation."],
    ["Streaming and recovery", "Subscribe to the required WebSocket channels, detect disconnects, restore snapshots and backfill missed state through the info endpoint.", "A forced disconnect demonstrates reconnect, snapshot handling, missed-event recovery, alerting and no duplicate order submission."]
  ]
};

const servicePages = [
  {
    slug: "tradingview-webhook-automation",
    breadcrumb: "TradingView Webhook 自动化",
    eyebrow: "TradingView Webhook Automation",
    title: "TradingView Webhook 自动交易开发 | 防重复下单、风控与私有部署",
    description: "已有 TradingView Alert 或 Pine Script？将 Webhook 接入交易所或券商 API，包含签名校验、防重复下单、仓位风控、日志告警、源码与私有部署。不卖策略，不承诺收益。",
    h1: "TradingView Webhook 自动交易开发",
    intro: "把 TradingView Alert / Pine Script 信号变成可测试、可追踪、可灰度上线的自动执行系统。重点不是卖策略，而是把你已经定义好的信号、仓位、风控和异常处理工程化。",
    serviceType: "TradingView Webhook automation development",
    llmsLabel: "TradingView Webhook automation",
    fit: [
      "已经有 Pine Script、Alert 条件或明确的信号文案。",
      "需要把信号接入交易所 API、券商 API 或内部订单系统。",
      "希望处理重复信号、冷却时间、仓位限制、失败告警和审计日志。"
    ],
    notFit: [
      "只想购买收益承诺型策略或让系统替你判断行情。",
      "没有明确入场、出场、仓位或风险边界。",
      "不愿意先做模拟盘、小资金或测试环境验证。"
    ],
    deliverables: [
      "Webhook 接收服务、签名或密钥校验、信号格式解析。",
      "去重、限频、冷却时间、最大仓位、只减仓等风控规则。",
      "订单路由、失败重试、日志审计、Telegram / Email 告警。",
      "源码、配置样例、部署文档和远程交付讲解。"
    ],
    process: [
      "确认 TradingView Alert 文案、变量、品种、周期和触发条件。",
      "拆解仓位、止损、止盈、撤单、冷却和异常处理规则。",
      "开发 Webhook、风控、订单路由和告警模块。",
      "先在测试环境或小资金灰度验证执行链路。"
    ],
    limits: [
      "TradingView 只负责发出信号，成交质量取决于交易接口、网络、流动性和规则。",
      "Webhook 可能重复、延迟或丢失，系统需要去重、重试和人工告警。",
      "不承诺策略盈利、胜率、回撤或滑点结果。"
    ],
    faq: [
      ["TradingView Webhook 能防重复下单吗？", "可以设计信号 ID、时间窗口、品种方向和冷却规则来降低重复执行风险，但仍建议保留日志和人工告警。"],
      ["需要提供 TradingView 账号吗？", "通常不需要。你只需提供 Alert 文案、触发规则和 Webhook 配置方式。"],
      ["能同时接交易所和券商 API 吗？", "可以，但建议先完成一个接口的稳定执行，再逐步扩展到多接口路由。"],
      ["Alert 文案应该怎么设计？", "建议包含策略名、品种、方向、数量、时间戳、动作类型和可校验的 secret，方便系统解析和去重。"],
      ["Webhook 失败时会怎样处理？", "可以配置重试、失败告警、人工确认和熔断规则，避免静默失败或重复下单。"]
    ],
    related: [
      ["/risk-engine/", "风控引擎开发"],
      ["/exchange-api-trading-bot-development/", "交易所 API 自动化"],
      ["/private-deployment/", "私有化部署"]
    ]
  },
  {
    slug: "exchange-api-trading-bot-development",
    breadcrumb: "交易所 API 自动化",
    eyebrow: "Exchange API Automation",
    title: "交易所 API 自动交易系统开发 | 订单路由、风控与私有化部署",
    description: "交易所 API 自动交易系统开发，覆盖订单路由、DCA/Grid 执行、仓位控制、异常重试、日志告警和源码交付。",
    h1: "交易所 API 自动交易系统开发",
    intro: "围绕你已有的交易规则，构建可监控、可审计、可私有部署的交易所 API 执行系统。适合需要把 Webhook、策略信号或组合规则接入自动下单流程的客户。",
    serviceType: "Exchange API trading automation development",
    llmsLabel: "Exchange API trading bot development",
    fit: [
      "已经有明确的 DCA、Grid、趋势、套利或组合执行规则。",
      "需要处理订单状态、失败重试、仓位上限和多品种配置。",
      "希望源码、配置和服务器环境掌握在自己手里。"
    ],
    notFit: [
      "希望购买现成收益承诺型策略或让开发方代管资金。",
      "无法提供 API 权限、交易品种、规则参数和验收方式。",
      "不接受交易所限制、滑点、手续费、网络和市场波动风险。"
    ],
    deliverables: [
      "API 接入、订单路由、持仓查询、成交回报和日志审计。",
      "最大仓位、单笔风险、只减仓、限频、异常价格保护。",
      "DCA/Grid/分批止盈止损等规则执行模块。",
      "私有化部署、配置样例、运行手册和远程讲解。"
    ],
    process: [
      "确认平台 API 能力、账户权限、品种、订单类型和地区限制。",
      "整理策略参数、仓位规则、风控边界和告警要求。",
      "开发执行模块并接入测试环境或小资金灰度。",
      "交付源码、部署文档和后续扩展建议。"
    ],
    limits: [
      "不同交易所 API、限频、订单类型和地区规则不同，需要以官方 API 和账户权限为准。",
      "市场波动、滑点、流动性、手续费和平台故障可能造成损失。",
      "系统开发只提升执行一致性，不改变策略本身的盈利能力。"
    ],
    faq: [
      ["API Key 需要提现权限吗？", "不需要，也不建议提供。通常只需要读取和交易权限，并尽量限制 IP 与品种范围。"],
      ["可以部署在自己的服务器吗？", "可以。标准交付包含源码、配置样例和部署说明，适合客户自有 VPS 或云服务器。"],
      ["可以先做小版本吗？", "建议从单策略、单接口、单品种或小资金灰度开始，减少无效开发。"],
      ["交易所 API 限频会影响系统吗？", "会。需要按平台规则设计请求节流、订单状态轮询、WebSocket 监听和异常回退。"],
      ["能做多交易所统一下单吗？", "可以评估，但不同交易所的订单类型、精度、手续费和风控规则不同，通常建议分阶段接入。"]
    ],
    related: [
      ["/tradingview-webhook-automation/", "TradingView Webhook"],
      ["/risk-engine/", "风控引擎"],
      ["/case-studies/", "匿名案例"]
    ]
  },
  {
    slug: "broker-api/ibkr",
    breadcrumb: "IBKR API 自动化",
    eyebrow: "IBKR API Automation",
    title: "IBKR API 自动交易系统开发 | TWS Gateway、订单路由与审计日志",
    description: "IBKR API 自动交易系统开发，面向 Interactive Brokers 工作流，覆盖 TWS Gateway、订单路由、持仓同步、风控和日志审计。",
    h1: "IBKR API 自动交易系统开发",
    intro: "为已经具备 IBKR / Interactive Brokers 账户和明确交易规则的客户，构建订单执行、持仓同步、风险校验和审计日志系统。具体能力以账户权限、地区限制和官方 API 为准。",
    serviceType: "IBKR API automation development",
    llmsLabel: "IBKR API automation",
    fit: [
      "已开通或准备开通 IBKR API 相关权限。",
      "需要把股票、ETF、期权或多资产组合规则接入自动执行。",
      "需要持仓同步、订单状态回报、风控校验和日志审计。"
    ],
    notFit: [
      "希望外包投资判断、荐股、喊单或资金托管。",
      "没有明确订单类型、交易时段、仓位规则和异常处理。",
      "无法接受券商 API、TWS Gateway 或账户权限限制。"
    ],
    deliverables: [
      "IBKR 连接方案评估、TWS Gateway / Client Portal 工作流建议。",
      "订单路由、撤单、成交回报、持仓同步和错误处理。",
      "价格保护、最大仓位、交易时段、只减仓和人工确认节点。",
      "源码交付、部署文档、运行日志和远程讲解。"
    ],
    process: [
      "确认账户类型、地区、API 方式、交易品种和订单类型。",
      "梳理策略触发、组合约束、风控边界和人工确认点。",
      "搭建连接、路由、日志、告警和测试流程。",
      "用模拟环境或小资金灰度验证执行稳定性。"
    ],
    limits: [
      "IBKR 具体 API 能力、数据权限和订单限制以官方说明和账户状态为准。",
      "TWS / Gateway 运行状态、网络连接和账户风控会影响自动化稳定性。",
      "不声称与 Interactive Brokers 存在官方合作、授权或背书。"
    ],
    faq: [
      ["IBKR 自动化适合做全自动吗？", "可以做自动执行，但建议保留风控、限额、日志和必要的人工确认节点。"],
      ["能做组合再平衡吗？", "可以围绕目标权重、现金约束和持仓同步设计订单计划。"],
      ["需要先有 IBKR 账户吗？", "最好已有账户和权限。没有权限时只能做方案评估，不能验证真实接口。"],
      ["TWS Gateway 和 Client Portal 怎么选？", "需要根据账户权限、运行环境、稳定性要求和目标订单流程评估，不能只按接口名称决定。"],
      ["IBKR 项目上线前要验证什么？", "至少验证连接稳定性、订单类型、交易时段、撤单流程、持仓同步、拒单处理和审计日志。"],
      ["IBKR 常见错误怎么处理？", "会把连接断开、权限不足、数据订阅缺失、订单类型不支持和交易时段限制归类到日志，并配置告警或暂停规则。"]
    ],
    related: [
      ["/broker/api/", "券商 API 总览"],
      ["/fix-api-order-routing/", "FIX API 订单路由"],
      ["/broker-api/alpaca/", "Alpaca API 自动化"]
    ]
  },
  {
    slug: "broker-api/schwab",
    breadcrumb: "Schwab API 自动化",
    eyebrow: "Schwab API Automation",
    title: "Schwab API 自动化系统开发 | 账户授权、订单流程与组合监控",
    description: "Schwab API 自动化系统开发，覆盖账户授权、订单流程、组合数据、风控限制、日志审计和私有化部署。",
    h1: "Schwab API 自动化系统开发",
    intro: "面向已有 Schwab 账户、开放接口权限和清晰交易流程的客户，开发规则执行、订单监控、组合数据同步和风险控制系统。所有能力以官方 API、账户权限和地区限制为准。",
    serviceType: "Schwab API automation development",
    llmsLabel: "Schwab API automation",
    fit: [
      "需要把既定交易规则接入 Schwab API 工作流。",
      "关注账户授权、组合数据、订单状态和审计日志。",
      "希望先做小范围验证，再决定是否扩展后台或多账户流程。"
    ],
    notFit: [
      "没有 API 访问条件或不能完成第三方平台审核。",
      "希望由开发方代替做投资判断或管理账户资金。",
      "把盈利结果作为软件项目验收标准。"
    ],
    deliverables: [
      "账户授权流程梳理、API 能力评估和接口边界说明。",
      "订单请求、状态同步、异常告警和日志留存。",
      "风控校验、组合约束、人工确认节点和部署文档。",
      "源码、配置样例和远程交付讲解。"
    ],
    process: [
      "确认 Schwab API 权限、账户类型、交易品种和目标流程。",
      "定义订单规则、风控条件、日志字段和验收路径。",
      "开发授权、订单、组合、风控和告警模块。",
      "在测试或小资金环境中验证流程。"
    ],
    limits: [
      "Schwab API 的可用范围、审核流程和地区限制可能变化，应以官方文档为准。",
      "OAuth 授权、Token 续期和账户权限需要客户自行管理或授权。",
      "不声称与 Schwab 存在官方合作、代理或背书关系。"
    ],
    faq: [
      ["Schwab API 可以做自动下单吗？", "需要先确认你的账户、应用和 API 权限是否支持目标订单流程。"],
      ["可以做只读组合监控吗？", "可以，只读监控、告警和报表比全自动下单风险更低，适合先验证。"],
      ["开发前最重要的资料是什么？", "账户权限状态、目标订单类型、授权流程、策略规则和验收标准。"],
      ["OAuth 授权过期怎么办？", "项目需要设计 token 保存、续期、失效告警和重新授权流程，避免订单链路突然中断。"],
      ["Schwab 项目能承诺 API 可用吗？", "不能。API 权限、审核、地区限制和平台政策由 Schwab 决定，开发前只能做可行性评估和边界说明。"],
      ["Schwab API 最容易卡在哪里？", "常见卡点是应用审核、OAuth 授权、账户范围不可见、订单权限不足和接口返回字段变化。"]
    ],
    related: [
      ["/broker/api/", "券商 API 总览"],
      ["/broker-api/ibkr/", "IBKR API 自动化"],
      ["/risk-engine/", "风控引擎"]
    ]
  },
  {
    slug: "broker-api/alpaca",
    breadcrumb: "Alpaca API 自动化",
    eyebrow: "Alpaca API Automation",
    title: "Alpaca API 自动交易系统开发 | REST、WebSocket、订单状态与告警",
    description: "Alpaca API 自动交易系统开发，覆盖 REST/WebSocket 接入、订单状态同步、风控校验、日志告警和私有化部署。",
    h1: "Alpaca API 自动交易系统开发",
    intro: "为使用 Alpaca API 的量化研究者和交易团队，把研究信号、订单路由、WebSocket 回报、日志审计和风控规则整合成私有化执行系统。",
    serviceType: "Alpaca API automation development",
    llmsLabel: "Alpaca API automation",
    fit: [
      "已有 Alpaca API Key、交易规则和测试环境。",
      "需要 REST 下单、WebSocket 订单回报、持仓同步和告警。",
      "希望从纸面交易或小范围灰度开始验证。"
    ],
    notFit: [
      "希望购买现成盈利策略或把账户交给第三方管理。",
      "没有明确交易品种、订单类型、仓位和风控规则。",
      "不愿意处理 API 限制、市场数据权限和地区限制。"
    ],
    deliverables: [
      "REST API 接入、WebSocket 状态监听和异常处理。",
      "订单路由、持仓同步、风控校验、日志审计和告警。",
      "配置化策略参数、测试环境说明和部署文档。",
      "源码交付和远程操作讲解。"
    ],
    process: [
      "确认 Alpaca 账户权限、品种、数据权限和目标订单流程。",
      "设计信号、风控、状态回报和日志字段。",
      "开发 REST/WebSocket 接入与执行模块。",
      "用 paper trading 或小资金灰度验证。"
    ],
    limits: [
      "Alpaca API 的品种、地区、数据和订单能力以官方说明和账户权限为准。",
      "WebSocket 连接、限频、市场数据延迟和交易时段会影响执行体验。",
      "不声称与 Alpaca 存在官方合作、授权或背书。"
    ],
    faq: [
      ["Alpaca paper trading 可以先验证吗？", "可以，通常建议先用 paper trading 验证订单和风控流程。"],
      ["可以把研究脚本接进来吗？", "可以，但需要先整理输出信号格式、频率和风险边界。"],
      ["是否支持后台面板？", "可以作为 5000 美金或 10000 美金档的扩展范围评估。"],
      ["REST 和 WebSocket 都需要吗？", "通常 REST 用于请求和查询，WebSocket 用于订单状态和行情事件监听，具体按项目范围决定。"],
      ["Alpaca 数据权限会影响执行吗？", "会。行情数据权限、延迟、交易时段和资产类别会影响信号验证与订单决策。"],
      ["Alpaca paper 和 live 环境怎么验收？", "先用 paper trading 验证信号解析、风控拒绝、订单状态和告警，再评估是否切到 live 小范围灰度。"]
    ],
    related: [
      ["/broker/api/", "券商 API 总览"],
      ["/broker-api/ibkr/", "IBKR API 自动化"],
      ["/private-deployment/", "私有化部署"]
    ]
  },
  {
    slug: "fix-api-order-routing",
    breadcrumb: "FIX API 订单路由",
    eyebrow: "FIX API Order Routing",
    title: "FIX API 订单路由系统开发 | 会话管理、风控、回报与审计",
    description: "FIX API 订单路由系统开发，覆盖会话管理、订单消息、执行回报、风控校验、日志审计和私有化部署。",
    h1: "FIX API 订单路由系统开发",
    intro: "面向需要专业订单路由、执行回报和审计日志的团队，围绕 FIX 会话、消息流程、风控网关和异常恢复构建私有化执行系统。",
    serviceType: "FIX API order routing development",
    llmsLabel: "FIX API order routing",
    fit: [
      "已有券商、流动性提供方或交易接口的 FIX 接入条件。",
      "需要可审计的订单消息、执行回报、拒单处理和重连恢复。",
      "关注稳定性、日志、权限和风控，而不是只写一次性脚本。"
    ],
    notFit: [
      "没有 FIX 接入权限、测试环境或接口规范。",
      "希望用 FIX API 规避合规、账户或平台限制。",
      "把低延迟和成交质量承诺作为项目验收目标。"
    ],
    deliverables: [
      "FIX 会话管理、心跳、序号、重连和消息日志。",
      "订单新建、撤单、改单、执行回报和拒单处理。",
      "风控前置校验、限频、权限分层和人工确认节点。",
      "部署文档、运行手册、测试用例和交付讲解。"
    ],
    process: [
      "确认 FIX 版本、接入方规范、测试环境和消息字段。",
      "设计会话、订单、风控、日志和异常恢复流程。",
      "开发并在 UAT / 测试环境完成消息链路验证。",
      "上线前做灰度、监控、回滚和权限检查。"
    ],
    limits: [
      "FIX 接入通常依赖第三方审核、证书、专线或测试环境，周期不可完全由开发方控制。",
      "低延迟能力与网络、机房、券商路由和接口限制有关。",
      "不承诺成交价格、成交速度、收益或回撤。"
    ],
    faq: [
      ["FIX API 适合个人客户吗？", "通常更适合已有专业接口条件的团队或机构，个人客户多数先评估 REST/WebSocket 或券商 API。"],
      ["能做订单审计吗？", "可以，FIX 项目应重点保留原始消息、状态变化、拒单原因和人工操作记录。"],
      ["需要多久？", "取决于接入方测试环境、消息规范和验收流程，通常先做接口可行性评估。"],
      ["FIX 项目最容易卡在哪里？", "常见卡点是测试环境开通、证书/网络配置、消息字段差异、序号恢复和拒单原因处理。"],
      ["是否承诺低延迟成交？", "不承诺。延迟和成交质量受网络、机房、券商路由、市场流动性和接口限制影响。"],
      ["FIX 日志需要保留什么？", "建议同时保留原始 FIX 消息、标准化订单状态、拒单原因、人工操作和系统告警，便于审计和排障。"]
    ],
    related: [
      ["/broker/api/", "券商 API 自动化"],
      ["/risk-engine/", "风控引擎"],
      ["/private-deployment/", "私有部署"]
    ]
  },
  {
    slug: "custom-trading-software-development",
    lang: "en",
    breadcrumb: "Custom Trading Software Development",
    eyebrow: "Custom Trading Software Development",
    title: "Custom Trading Software Development | SignalCraft Labs",
    description: "Custom trading software development for API integration, order execution, risk controls, audit logs, source delivery and private deployment.",
    h1: "Custom Trading Software Development",
    intro: "Engineering for client-defined trading workflows—from signal intake and broker or exchange API integration to controlled execution, risk checks, audit logs and private deployment.",
    serviceType: "Custom trading software development for execution, API integration and operational control",
    llmsLabel: "Custom Trading Software Development",
    fit: [
      "You have documented trading or execution rules and need production engineering.",
      "You need to connect a signal source, strategy engine or internal system to a broker, exchange or FIX API.",
      "You need risk controls, operator actions, reconciliation, audit logs and a maintainable deployment.",
      "You want source delivery and staged acceptance rather than a closed black-box product."
    ],
    notFit: [
      "You want a guaranteed-profit bot, trading signals or outsourced investment decisions.",
      "You want account management, custody or permanent developer control of credentials.",
      "You want a white-label brokerage or exchange clone without a defined operational scope.",
      "You cannot document the workflow, API permissions or acceptance criteria."
    ],
    deliverables: [
      "Architecture and interface contract. Signal sources, APIs, state model, order lifecycle, failure paths and security boundaries.",
      "Execution and integration layer. API adapters, validation, idempotency, submit, cancel and reject handling, and position synchronization.",
      "Risk and operator controls. Position and exposure limits, trading hours, price protection, rate limits, manual pause and optional approval steps.",
      "Operational evidence. Structured logs, reject reasons, alerts, reconciliation records and replayable test cases.",
      "Source and handoff package. Source code, configuration examples, deployment files, runbook, restart, rollback and key-rotation notes."
    ],
    process: [
      "Discovery and scope. Review the workflow, current code, API access and operational constraints.",
      "System contract. Define state transitions, risk rules, failure cases and acceptance tests.",
      "Implementation. Build the integration, execution, control and observability layers.",
      "Staged validation and handoff. Validate through replay, a test environment, paper trading or limited production scope, then complete private handoff."
    ],
    limits: [
      "Customers retain control of accounts, credentials, funds and final trading decisions.",
      "API capability, order support, market data and regional availability depend on the customer's platform and account permissions.",
      "Acceptance covers software behavior such as submit, cancel, reject, partial fill, reconnect, reconciliation, pause, restart and rollback—not strategy returns.",
      "This is engineering delivery only, not financial advice, managed accounts, custody or performance promises."
    ],
    faq: [
      ["What kinds of custom trading software can you build?", "Projects can cover signal intake, broker or exchange API integration, order lifecycle handling, risk controls, reconciliation, operational logs, alerts and private deployment."],
      ["Can you integrate an existing strategy or codebase?", "Yes, after the current code, signal contract, dependencies, API access, state model and acceptance criteria are reviewed."],
      ["Which broker, exchange and FIX APIs can you support?", "The right interface depends on documented API capability, customer account permissions, test access, order types and deployment constraints. TradingView, IBKR and FIX also have dedicated assessment pages."],
      ["What is tested before deployment?", "Tests can cover validation, duplicate events, submits, cancels, rejects, partial fills, disconnects, reconnects, position sync, manual pause, alerts, restart and rollback."],
      ["Do I receive the source code?", "Yes. The agreed delivery package can include source code, configuration examples, deployment files, test evidence, an operations runbook and remote handoff."],
      ["Can the system run in my own cloud account or VPS?", "Yes. Private deployment can target a customer-controlled cloud account, VPS or server when the environment and operational responsibilities are defined."],
      ["Do you provide signals, account management or guaranteed returns?", "No. SignalCraft Labs implements customer-defined workflows and does not provide signals, investment advice, custody, managed accounts or return promises."]
    ],
    related: [
      ["/tradingview-webhook-developer/", "TradingView Webhook Developer"],
      ["/ibkr-api-automation-developer/", "IBKR API Automation Developer"],
      ["/fix-api-order-routing-developer/", "FIX API Order Routing Developer"]
    ]
  },
  {
    slug: "tradingview-webhook-developer",
    lang: "en",
    breadcrumb: "TradingView Webhook Developer",
    eyebrow: "TradingView Webhook Developer",
    title: "TradingView Webhook Developer | Custom Order Execution, Risk Checks and Alerts",
    description: "Hire a TradingView webhook developer to connect TradingView alerts to broker APIs, exchange APIs, order routing, risk checks, audit logs and private deployment.",
    h1: "TradingView Webhook Developer",
    intro: "Custom TradingView webhook development for teams that already have alert logic and need a reliable execution layer: payload validation, duplicate prevention, risk checks, order routing, logs, alerts and private deployment.",
    serviceType: "TradingView webhook developer for automated order execution systems",
    llmsLabel: "TradingView Webhook Developer",
    fit: [
      "You already have Pine Script alerts, alert payloads or a documented trading rule.",
      "You need TradingView alerts connected to a broker API, exchange API or internal order workflow.",
      "You care about duplicate prevention, cooldowns, risk limits, alerting and audit logs before going live."
    ],
    notFit: [
      "You are looking for investment advice, signal selling or account management.",
      "You do not have clear position sizing, order rules, symbols or risk limits.",
      "You want to skip dry-run, paper trading or limited-scope production validation."
    ],
    deliverables: [
      "Webhook receiver, shared-secret validation, payload parser and structured event IDs.",
      "Duplicate prevention, cooldown windows, max-position checks, manual pause and reject logs.",
      "Order routing adapter for the agreed broker API, exchange API or internal execution workflow.",
      "Source code, configuration examples, deployment notes and remote handoff."
    ],
    process: [
      "Review the TradingView alert text, payload variables, symbols, timeframes and trigger conditions.",
      "Define event IDs, position sizing, risk rules, reject reasons and alert channels.",
      "Build the webhook, risk gate, routing layer, logs and deployment package.",
      "Validate with sample payload replay, dry-run, paper trading or a limited live scope."
    ],
    limits: [
      "TradingView emits alerts; execution quality still depends on the connected API, account permissions, network, liquidity and order rules.",
      "Webhook alerts can duplicate, delay or fail, so the system needs idempotency, logging and human-visible alerts.",
      "This is engineering delivery only, not financial advice, managed accounts or performance claims."
    ],
    faq: [
      ["Can you build a TradingView webhook developer workflow for my alert?", "Yes, if the alert payload, symbol mapping, action, size and risk boundaries can be documented and tested."],
      ["How do you prevent duplicate TradingView webhook orders?", "The system uses stable event IDs, cooldown windows, strategy/symbol/action grouping, risk checks and audit logs before sending any order."],
      ["Can the webhook connect to IBKR, Alpaca or FIX?", "It can be evaluated. The final route depends on account permissions, API capability, order types and the customer's deployment requirements."],
      ["Do you need my TradingView login?", "Usually no. We need the alert payload format, webhook configuration details and the intended trading workflow."],
      ["Can this run on my own VPS or cloud account?", "Yes. Standard delivery can include source code, environment variables, deployment documentation and a remote handoff."],
      ["Do you provide trading signals or returns?", "No. The service implements customer-defined rules and does not provide signals, investment advice, custody or return promises."]
    ],
    related: [
      ["/articles/how-we-prevent-duplicate-tradingview-webhook-orders/", "Duplicate webhook case note"],
      ["/risk-engine/", "Risk engine"],
      ["/private-deployment/", "Private deployment"]
    ]
  },
  {
    slug: "ibkr-api-automation-developer",
    lang: "en",
    platformDetailSlug: "broker-api/ibkr",
    breadcrumb: "IBKR API Automation Developer",
    eyebrow: "IBKR API Automation Developer",
    title: "IBKR API Automation Developer | TWS Gateway, Client Portal, Order Routing and Logs",
    description: "Hire an IBKR API automation developer for TWS Gateway or Client Portal workflows, order routing, portfolio automation, risk checks, execution reports and audit logs.",
    h1: "IBKR API Automation Developer",
    intro: "IBKR API automation development for clients with defined rules, account access and a need for reliable order execution, position sync, risk checks, execution reports, audit logs and deployment support.",
    serviceType: "IBKR API automation developer for order execution and portfolio workflows",
    llmsLabel: "IBKR API Automation Developer",
    fit: [
      "You have or are preparing an Interactive Brokers account with relevant API access.",
      "You need order routing, position sync, portfolio workflow automation or execution logs.",
      "You want a staged build that validates account permissions, order types and failure handling before production use."
    ],
    notFit: [
      "You want outsourced investment decisions, stock recommendations or managed accounts.",
      "You cannot verify account permissions, order types, trading hours, market data and API access.",
      "You expect software delivery to be judged by strategy returns instead of tested workflow behavior."
    ],
    deliverables: [
      "TWS Gateway / Client Portal workflow assessment and integration plan.",
      "Order routing, cancel flow, execution report handling, position sync and error classification.",
      "Risk checks for size, exposure, trading hours, manual pause and human confirmation when required.",
      "Source code, configuration examples, runbook, logs and remote handoff."
    ],
    process: [
      "Review account type, region, API access, target instruments, order types and market data needs.",
      "Define the order lifecycle, position sync, risk checks, logs, alerts and acceptance tests.",
      "Build the IBKR connection, routing layer, risk gate and operational logging.",
      "Validate with a test environment, paper workflow or limited live scope where appropriate."
    ],
    limits: [
      "IBKR API capability, market data, order support and regional availability depend on the customer's account and Interactive Brokers policies.",
      "TWS Gateway and Client Portal workflows have different session, authentication and operational tradeoffs.",
      "SignalCraft Labs is not affiliated with, endorsed by or authorized by Interactive Brokers."
    ],
    faq: [
      ["Can you build an IBKR API automation system?", "Yes, after account permissions, target instruments, order types, market data and the intended workflow are reviewed."],
      ["Should I use TWS Gateway or Client Portal?", "It depends on the execution workflow, session requirements, operations model, data needs and account constraints."],
      ["Can you automate portfolio rebalancing?", "Yes, if target weights, cash constraints, account scope, order rules and human confirmation requirements are clear."],
      ["What should be tested before going live?", "Connection stability, order types, cancel flow, rejects, trading hours, position sync, execution reports and audit logs."],
      ["Do you manage my IBKR account?", "No. The customer controls the account, credentials, funding, API permissions and final trading decisions."],
      ["Can this be privately deployed?", "Yes. Delivery can include source code, environment configuration, deployment documentation and a runbook."]
    ],
    related: [
      ["/articles/ibkr-tws-gateway-vs-client-portal-automated-trading/", "IBKR TWS vs Client Portal"],
      ["/broker-api/ibkr/", "IBKR API 中文页"],
      ["/broker/api/", "Broker API overview"]
    ]
  },
  {
    slug: "fix-api-order-routing-developer",
    lang: "en",
    platformDetailSlug: "fix-api-order-routing",
    breadcrumb: "FIX API Order Routing Developer",
    eyebrow: "FIX API Order Routing Developer",
    title: "FIX API Order Routing Developer | Execution Reports, Session Recovery and Audit Logs",
    description: "Hire a FIX API order routing developer for NewOrderSingle, ExecutionReport, Reject handling, session recovery, risk checks, audit logs and UAT support.",
    h1: "FIX API Order Routing Developer",
    intro: "FIX API order routing development for teams that need controlled execution workflows: session management, NewOrderSingle, cancel flow, ExecutionReport handling, Reject processing, risk checks, audit logs and UAT validation.",
    serviceType: "FIX API order routing developer for execution workflows and audit logs",
    llmsLabel: "FIX API Order Routing Developer",
    fit: [
      "You already have a broker, venue, liquidity provider or counterparty that offers FIX access.",
      "You need an auditable order lifecycle with raw FIX messages, normalized status and reject handling.",
      "You can provide the FIX specification, test environment, credentials workflow and acceptance criteria."
    ],
    notFit: [
      "You do not yet have FIX access, a test environment or a counterparty specification.",
      "You want FIX to bypass account, compliance, permission or venue limits.",
      "You expect guaranteed latency, fills, execution quality or trading performance."
    ],
    deliverables: [
      "FIX session management, login, heartbeat, sequence handling, reconnect and logout flow.",
      "NewOrderSingle, cancel, ExecutionReport, Reject and CancelReject message handling.",
      "Risk gate, order state model, raw message archive, normalized audit logs and alerting.",
      "UAT support, deployment notes, runbook and remote handoff."
    ],
    process: [
      "Review FIX version, message spec, SenderCompID/TargetCompID, test environment and network requirements.",
      "Define the order lifecycle, required tags, state transitions, risk checks and audit fields.",
      "Build the session layer, message handlers, risk gate, logs and replay-friendly test cases.",
      "Run UAT for login, heartbeat, order, cancel, reject, partial fill, reconnect and sequence recovery."
    ],
    limits: [
      "FIX onboarding often depends on counterparty approval, certificates, network setup, UAT schedules and custom tag requirements.",
      "Latency and execution quality depend on infrastructure, route, broker, venue, liquidity and market conditions.",
      "This is technical implementation, not financial advice, brokerage service or managed trading."
    ],
    faq: [
      ["Can you build a FIX API order routing system?", "Yes, if the counterparty specification, test environment and required message flow are available for review."],
      ["What FIX messages do you usually handle?", "Typical projects cover Logon, Heartbeat, NewOrderSingle, Cancel, ExecutionReport, Reject, CancelReject, ResendRequest and Logout."],
      ["Do you keep raw FIX messages?", "Yes. A maintainable FIX system should store raw messages and normalized order state for debugging and audit."],
      ["What does UAT need to cover?", "Login, heartbeat, new order, cancel, reject, partial fill, disconnect, reconnect, sequence recovery and logout."],
      ["Can you guarantee low latency?", "No. Latency depends on infrastructure, network, broker, venue and market conditions."],
      ["Is this connected to investment advice?", "No. The service builds the technical order routing and logging layer for customer-defined workflows."]
    ],
    related: [
      ["/articles/fix-api-execution-report-audit-log-design/", "FIX audit log design"],
      ["/fix-api-order-routing/", "FIX API 中文页"],
      ["/risk-engine/", "Risk controls"]
    ]
  },
  {
    slug: "risk-engine",
    breadcrumb: "交易风控引擎",
    eyebrow: "Risk Engine",
    title: "自动交易风控引擎开发 | 仓位限制、价格保护、权限与审计",
    description: "自动交易风控引擎开发，覆盖仓位限制、价格保护、只减仓、限频、权限控制、异常告警和审计日志。",
    h1: "自动交易风控引擎开发",
    intro: "自动交易系统的核心不是更激进地下单，而是在每次执行前确认规则、权限、仓位、价格和异常状态。风控引擎让执行流程有边界、有记录、可回放。",
    serviceType: "Automated trading risk engine development",
    llmsLabel: "Trading risk engine development",
    fit: [
      "已有自动下单或半自动交易流程，需要补前置风控。",
      "需要最大仓位、单笔风险、只减仓、限频和异常价格保护。",
      "希望所有信号、拒绝原因、订单和告警都有日志。"
    ],
    notFit: [
      "希望风控系统承诺不亏损或承诺固定回撤上限。",
      "没有清晰的仓位、资金、品种和订单边界。",
      "不愿意接受人工确认、熔断和暂停机制。"
    ],
    deliverables: [
      "前置风控规则，配置文件、拒单原因和审计日志。",
      "仓位与敞口限制，覆盖最大仓位、敞口、价格偏离、交易时段、订单频率和冷却限制。",
      "异常状态熔断，覆盖告警通知、手动暂停和恢复流程。",
      "接口集成，接入 Webhook、交易所 API、券商 API 或 FIX 路由。"
    ],
    process: [
      "梳理交易规则、账户规模、品种、订单类型和最大风险边界。",
      "定义风控规则优先级、拒绝原因、日志字段和告警级别。",
      "开发规则引擎、配置管理、审计日志和监控告警。",
      "通过模拟盘、回放样本或小资金灰度验证。"
    ],
    limits: [
      "风控引擎降低执行错误和超规则行为，不能消除市场风险。",
      "极端行情、流动性不足、API 故障和网络异常仍可能造成损失。",
      "风控规则需要客户定期复核，不能长期无人维护。"
    ],
    faq: [
      ["风控引擎可以接现有机器人吗？", "可以，但需要先确认现有系统的信号格式、下单入口和日志能力。"],
      ["能支持手动暂停吗？", "可以设计全局暂停、品种暂停、只减仓和人工确认开关。"],
      ["风控规则能配置化吗？", "可以，常见规则会做成配置项，便于后续调整。"],
      ["风控引擎能消除亏损吗？", "不能。它能减少超规则执行和操作错误，但不能消除市场波动、滑点、流动性和策略风险。"],
      ["上线前如何验收风控？", "用回放样本、模拟盘或小资金测试逐项验证拒单、限频、暂停、告警和审计日志。"]
    ],
    related: [
      ["/tradingview-webhook-automation/", "Webhook 自动化"],
      ["/exchange-api-trading-bot-development/", "交易所 API 自动化"],
      ["/fix-api-order-routing/", "FIX API"]
    ]
  },
  {
    slug: "private-deployment",
    breadcrumb: "私有化部署",
    eyebrow: "Private Deployment",
    title: "自动交易系统私有化部署 | 源码交付、VPS、日志、告警与权限",
    description: "自动交易系统私有化部署服务，覆盖源码交付、VPS/Docker 部署、配置密钥、日志告警、备份和运行文档。",
    h1: "自动交易系统私有化部署",
    intro: "把自动交易系统部署在客户控制的服务器或云环境中，交付源码、配置样例、运行文档和远程讲解。重点是让系统可审计、可迁移、可维护。",
    serviceType: "Private deployment for automated trading systems",
    llmsLabel: "Private deployment",
    fit: [
      "希望源码、API Key、数据库和运行环境都掌握在自己手里。",
      "需要日志、告警、备份、重启和权限边界。",
      "已有 VPS、云服务器或希望我们协助选择部署方式。"
    ],
    notFit: [
      "希望把账户和资金完全交给第三方托管。",
      "不愿意负责服务器、API Key 和账户权限安全。",
      "要求开发方长期无边界运维所有环境。"
    ],
    deliverables: [
      "源码、配置样例、环境变量说明和部署文档。",
      "VPS / Docker / 进程守护 / 日志轮转 / 告警配置。",
      "API Key 最小权限建议、IP 限制和密钥轮换说明。",
      "远程上线讲解、回滚方案和后续扩展建议。"
    ],
    process: [
      "确认部署环境、操作系统、网络、域名和安全边界。",
      "整理服务模块、配置项、日志路径和告警渠道。",
      "部署应用、测试启动、重启、日志、告警和备份。",
      "交付文档并完成远程讲解。"
    ],
    limits: [
      "私有化部署不等于全托管运维，长期运维需单独约定范围。",
      "客户应自行保管服务器账号、API Key 和账户安全。",
      "云服务、域名、短信、行情、券商或交易所费用不包含在工程交付包内。"
    ],
    faq: [
      ["必须买服务器吗？", "纯展示站不需要服务器；自动交易执行系统通常需要客户控制的 VPS 或云环境。"],
      ["API Key 如何保护？", "建议最小权限、IP 白名单、环境变量存储和定期轮换，不提供提现权限。"],
      ["可以部署到客户自己的云吗？", "可以，只要能提供必要的远程部署条件和权限。"],
      ["私有部署包括长期运维吗？", "不默认包括。长期监控、升级、备份巡检和应急响应需要单独约定服务范围。"],
      ["交付后客户需要掌握什么？", "需要掌握服务器登录、配置文件、重启命令、日志位置、告警渠道和密钥轮换流程。"]
    ],
    related: [
      ["/risk-engine/", "风控引擎"],
      ["/delivery-policy", "交付边界"],
      ["/contact/", "联系评估"]
    ]
  },
  {
    slug: "hyperliquid-api-trading-bot-development",
    lang: "en",
    breadcrumb: "Custom Hyperliquid Trading Bot",
    eyebrow: "Paid Development Service · For Defined Trading Rules",
    title: "Hyperliquid Bot Development Service | Source Code and Private Deployment",
    description: "Hire a developer to turn defined trading rules into a custom Hyperliquid bot. Planning starts around USD 5,000 for execution, controls, monitoring, source code and private deployment.",
    h1: "Hire a Developer to Build Your Hyperliquid Trading Bot",
    intro: "For strategy owners who already know what the system should trade and need a dependable implementation partner. You define the rules, instruments and risk limits; we deliver execution, controls, monitoring, source code and deployment under your infrastructure.",
    serviceType: "Custom Hyperliquid trading bot development",
    llmsLabel: "Custom Hyperliquid trading bot development",
    lastModified: hyperliquidCheckedDate,
    ogImage: hyperliquidSocialImage,
    buyerIntentVersion: 1,
    buyerAudience: "Strategy owners or small trading teams with written entry, exit, sizing and risk rules.",
    buyerProblem: "Turn defined trading logic into a dependable execution system without relying on fragile scripts or manual order entry.",
    contactProject: "hyperliquid-api-trading-bot-development",
    heroPrimaryLabel: "Request a scoped estimate",
    heroSecondaryLabel: "Choose a project path",
    heroSecondaryHref: "#project-paths",
    outcomesTitle: "Bring the trading logic; receive an operable system",
    outcomesIntro: "This service is for strategy owners who need dependable implementation, not another generic bot template.",
    purchaseSnapshot: [
      ["Best fit", "Strategy owners or small trading teams with written entry, exit, sizing and risk rules."],
      ["Planning budget", "USD 5,000-10,000+ for a production-oriented execution workflow."],
      ["Typical delivery window", "About 4-8 weeks after rules, access and acceptance cases are ready."],
      ["Send first", "A masked rule outline, instruments, order types, sizing and risk limits."]
    ],
    purchaseNote: "Planning ranges are not fixed quotes. Final scope depends on strategy count, account model, controls, dashboard needs and deployment requirements.",
    customerOutcomes: [
      ["You bring", "Defined signals or rules, instruments, sizing and risk limits."],
      ["We build", "Execution, safeguards, monitoring, recovery and operator controls."],
      ["You keep", "Source code, wallet control, configuration and private deployment."]
    ],
    projectPaths: [
      ["TradingView signals", "Send existing TradingView alerts to Hyperliquid with validation, duplicate protection, risk checks and clear failure alerts.", "/tradingview-to-hyperliquid-automation/", "View TradingView path"],
      ["Trading team system", "Build a controlled execution layer for multiple rules, accounts, operators or product workflows.", "/hyperliquid-trading-system-for-teams/", "View team path"]
    ],
    fit: [
      "You already have entry, exit, sizing, market-making, TWAP or portfolio rules that can be written down.",
      "You are losing time to manual execution, fragile scripts or unclear order and position state.",
      "You want source code, risk controls, logs and deployment under your own account and infrastructure."
    ],
    notFit: [
      "You want a profit-guaranteed strategy, copy-trading promotion or an operator to control your funds.",
      "You cannot define instruments, order types, position limits, pause rules or acceptance tests.",
      "You expect an API wallet, vault or private deployment to remove market, protocol, liquidation or operational risk."
    ],
    deliverables: [
      "A working flow from your signal or rule to Hyperliquid order execution and account-state tracking.",
      "Duplicate-order protection, partial-fill handling, restart checks and position reconciliation.",
      "Disconnect detection, recovery, structured logs and alerts that tell you when manual review is needed.",
      "Position, leverage, reduce-only, price-deviation, rate-limit and manual-pause controls.",
      "Testnet acceptance checks, source code, configuration examples, deployment runbook and remote handoff."
    ],
    process: [
      "Confirm wallet role, API/agent wallet boundaries, subaccount or vault scope, instruments and order types.",
      "Define the order state machine, cloid policy, nonce owner, reconciliation rules and risk decisions.",
      "Build the connector, streaming recovery, controls, structured logs and alert paths.",
      "Replay failures on testnet before any separately approved limited live rollout."
    ],
    limits: [
      "Hyperliquid API behavior, available markets, fee rules, rate limits and regional access can change; final capability depends on current official documentation and the customer account.",
      "API/agent wallets can sign trading actions. Main-wallet keys, withdrawal authority and unrelated permissions should not be placed in the bot runtime.",
      "WebSocket streams can disconnect; every production design needs snapshot recovery and query-based reconciliation.",
      "The delivery does not guarantee fills, latency, spreads, funding, liquidation outcomes, strategy performance or profitability."
    ],
    faq: [
      ["Can you build with the official Python SDK or CCXT?", "Yes. The choice depends on the required actions, signing control, data model and deployment constraints. The official SDK is usually preferred when Hyperliquid-specific behavior matters; CCXT can fit a broader multi-exchange adapter."],
      ["How do you prevent duplicate Hyperliquid orders?", "Use a deterministic client order ID, a durable intent record, one nonce owner, pre-submit idempotency checks and post-restart reconciliation against open orders, historical orders and fills."],
      ["What happens when the WebSocket disconnects?", "The runtime detects the gap, reconnects, processes the new snapshot and backfills required account or order state through the info endpoint before normal routing resumes."],
      ["Do you need my main wallet private key?", "No. The production design should use the smallest suitable API/agent-wallet scope, while the customer keeps main-wallet control. Exact approval and revocation procedures are documented and tested."],
      ["Can the system trade for a subaccount or vault?", "Yes when the official account model and customer permissions support the workflow. Signing remains tied to the authorized master or agent model, and vault/subaccount state is reconciled separately."],
      ["How much does custom Hyperliquid bot development cost?", "A narrow API or connector assessment can start near the USD 2,000 package. A production-oriented bot with execution state, risk controls, monitoring and private deployment typically starts around USD 5,000; multi-strategy or team infrastructure is usually USD 10,000+."],
      ["How long does a Hyperliquid bot project take?", "A defined single-workflow build commonly plans around 4-8 weeks after the trading rules, permissions and acceptance cases are ready. Broader dashboards, multiple strategies or account models require a phased estimate."],
      ["Does the service include a profitable strategy?", "No. You provide the execution rules and risk boundaries. Software acceptance is based on deterministic behavior, logs, controls and recovery tests, not returns."]
    ],
    related: [
      ["/tradingview-to-hyperliquid-automation/", "TradingView to Hyperliquid automation"],
      ["/hyperliquid-trading-system-for-teams/", "Hyperliquid systems for trading teams"],
      ["/tools/hyperliquid-fee-calculator/", "Hyperliquid fee calculator"],
      ["/articles/hyperliquid-api-order-reconciliation-websocket-checklist/", "Technical reliability checklist"]
    ],
    officialReferences: hyperliquidReferenceLinks
  },
  {
    slug: "tradingview-to-hyperliquid-automation",
    lang: "en",
    breadcrumb: "TradingView to Hyperliquid Automation",
    eyebrow: "Paid Integration Service · For Existing TradingView Alerts",
    title: "TradingView to Hyperliquid Automation Service | Cost and Delivery",
    description: "Connect existing TradingView alerts to Hyperliquid. Scoped projects start around USD 2,000 for webhook validation, duplicate protection, risk checks, alerts and source delivery.",
    h1: "Connect Your TradingView Alerts to Hyperliquid",
    intro: "For traders who already have usable Pine Script alerts and want a developer to own the webhook, execution and failure-handling work. You send one real alert example; we scope the safest route to a testable Hyperliquid workflow.",
    serviceType: "TradingView to Hyperliquid automation development",
    llmsLabel: "TradingView to Hyperliquid automation",
    lastModified: hyperliquidCheckedDate,
    ogImage: hyperliquidSocialImage,
    platformDetailSlug: "hyperliquid-api-trading-bot-development",
    buyerIntentVersion: 1,
    buyerAudience: "Traders with working Pine Script alerts and explicit order and risk rules.",
    buyerProblem: "Replace repetitive manual order entry with a controlled alert-to-execution workflow that remains observable and pausable.",
    contactProject: "tradingview-to-hyperliquid-automation",
    heroPrimaryLabel: "Get an alert-integration estimate",
    heroSecondaryLabel: "See what is included",
    heroSecondaryHref: "#deliverables",
    outcomesTitle: "From alert message to controlled execution",
    outcomesIntro: "The project starts with an alert you already understand and ends with a workflow you can observe, pause and operate.",
    purchaseSnapshot: [
      ["Best fit", "Traders with working Pine Script alerts and explicit order and risk rules."],
      ["Planning budget", "USD 2,000-5,000+ for one scoped alert-to-execution workflow."],
      ["Typical delivery window", "About 2-4 weeks when the alert format and acceptance cases are ready."],
      ["Send first", "One masked alert payload, intended order action, sizing rule and block conditions."]
    ],
    purchaseNote: "Planning ranges assume one defined workflow. Pine Script research, multiple strategies, dashboards or broader infrastructure are estimated separately.",
    customerOutcomes: [
      ["You provide", "Pine Script alert text, instruments, position rules and expected actions."],
      ["We connect", "Webhook validation, order routing, risk checks, state tracking and alerts."],
      ["You operate", "A testable system with source code, logs, pause controls and deployment notes."]
    ],
    fit: [
      "You already have Pine Script alerts or TradingView conditions that produce repeatable messages.",
      "You want to remove manual order entry while retaining explicit sizing, loss and pause rules.",
      "You need visible logs and alerts when a signal is rejected, delayed or cannot be executed."
    ],
    notFit: [
      "You want us to invent or guarantee a profitable strategy.",
      "Your alerts do not contain enough information to determine instrument, side, size or action.",
      "You are unwilling to validate the workflow on testnet before considering limited live use."
    ],
    deliverables: [
      "Webhook endpoint, shared-secret validation and a documented TradingView alert payload.",
      "Signal normalization, duplicate protection, cooldown rules and stale-alert rejection.",
      "Hyperliquid order, cancel and reduce-only execution with position and price checks.",
      "Structured logs, failure alerts, manual pause and restart reconciliation.",
      "Source code, configuration examples, testnet acceptance checklist and deployment handoff."
    ],
    process: [
      "Review one real alert example, the expected order action and the conditions that should block execution.",
      "Define payload fields, sizing, position limits, cooldowns, stale-signal handling and pause rules.",
      "Build the webhook-to-order workflow with logs, alerts and duplicate protection.",
      "Replay normal and failure cases on testnet before any separately approved limited rollout."
    ],
    limits: [
      "TradingView alerts can arrive late, repeat or fail; the system reduces operational risk but cannot remove network or platform risk.",
      "Hyperliquid market conditions, liquidity, funding and available order behavior remain outside the software's control.",
      "The customer keeps wallet control; withdrawal permissions and main-wallet private keys are not required for the runtime.",
      "Software delivery does not guarantee fills, strategy performance or profitability."
    ],
    faq: [
      ["Do I need to share my TradingView account?", "Usually no. We need the alert format, variables and expected behavior, not ongoing access to your TradingView account."],
      ["Can you use my existing Pine Script?", "Yes when it already produces defined alerts. Strategy research or rewriting the trading logic is scoped separately from execution automation."],
      ["How do you avoid duplicate orders?", "The workflow validates a durable signal identifier, strategy, instrument, action and time window before it creates a new order intent."],
      ["What happens when an alert cannot be executed?", "The system records the reason, sends an alert, and can fail closed instead of silently retrying an ambiguous action."],
      ["Do you need my main wallet private key?", "No. The design uses the smallest suitable trading authorization while the customer retains main-wallet and withdrawal control."],
      ["How much does TradingView to Hyperliquid automation cost?", "A clearly defined single-alert workflow can fit the USD 2,000 starter range. More order types, state reconciliation, dashboards or multi-strategy routing usually move into the USD 5,000+ execution package."],
      ["How long does the integration take?", "A scoped workflow commonly plans around 2-4 weeks after we receive a real alert example, order behavior, risk limits and deployment access. Ambiguous Pine logic or multiple strategies require a separate discovery phase."],
      ["What should I send for an initial assessment?", "Send one masked alert example, the intended order, position-sizing rule, risk limits, instruments and preferred deployment environment."]
    ],
    related: [
      ["/hyperliquid-api-trading-bot-development/", "Custom Hyperliquid trading bot"],
      ["/hyperliquid-trading-system-for-teams/", "Hyperliquid systems for trading teams"],
      ["/articles/how-we-prevent-duplicate-tradingview-webhook-orders/", "How duplicate webhook orders are prevented"]
    ],
    officialReferences: [officialReferenceLinks[0], ...hyperliquidReferenceLinks]
  },
  {
    slug: "hyperliquid-trading-system-for-teams",
    lang: "en",
    breadcrumb: "Hyperliquid Systems for Trading Teams",
    eyebrow: "Custom Engineering · For Trading and Product Teams",
    title: "Hyperliquid Trading System for Teams | Risk and Private Deployment",
    description: "Commission a customer-controlled Hyperliquid execution system for a trading firm, treasury or product team. Projects usually start at USD 10,000 for shared controls, audit logs and private deployment.",
    h1: "Build a Hyperliquid Execution System Your Team Can Operate",
    intro: "For trading firms, digital-asset teams and fintech product teams that have outgrown one-off scripts. We turn strategies, roles, limits and exception handling into a controlled execution service deployed under company ownership.",
    serviceType: "Hyperliquid execution system development for trading teams",
    llmsLabel: "Hyperliquid execution systems for trading teams",
    lastModified: hyperliquidCheckedDate,
    ogImage: hyperliquidSocialImage,
    platformDetailSlug: "hyperliquid-api-trading-bot-development",
    buyerIntentVersion: 1,
    buyerAudience: "Trading firms, treasuries or fintech teams with multiple strategies, accounts or operators.",
    buyerProblem: "Replace disconnected scripts with a shared execution system that operators can review, pause and recover.",
    contactProject: "hyperliquid-trading-system-for-teams",
    heroPrimaryLabel: "Request a team-system assessment",
    heroSecondaryLabel: "Review delivery packages",
    heroSecondaryHref: "#deliverables",
    outcomesTitle: "Replace fragile scripts with a reviewable operating system",
    outcomesIntro: "The goal is not more automation for its own sake. It is controlled execution that operators can understand, pause and recover.",
    purchaseSnapshot: [
      ["Best fit", "Trading firms, treasuries or fintech teams with multiple strategies, accounts or operators."],
      ["Planning budget", "USD 10,000+ for a phased, company-controlled execution system."],
      ["Delivery approach", "A scoped first operating slice, followed by agreed expansion phases."],
      ["Send first", "A workflow map covering roles, accounts, strategies, limits and incident ownership."]
    ],
    purchaseNote: "Team systems require a workflow and ownership review before a timeline is credible. The initial estimate separates the first operable scope from later dashboards, strategies and integrations.",
    customerOutcomes: [
      ["Team workflow", "Document roles, accounts, strategies, approvals and exception ownership."],
      ["Controlled execution", "Route orders through shared risk limits, state checks and operator controls."],
      ["Operational handoff", "Deliver source, deployment, monitoring, audit logs and recovery procedures."]
    ],
    fit: [
      "You operate multiple strategies, instruments, accounts, vaults or team roles that a single script no longer handles safely.",
      "You need shared position limits, audit logs, alerts, dashboards or manual approval points.",
      "You want the system deployed under company-controlled infrastructure with documented ownership and handoff."
    ],
    notFit: [
      "You only need a generic downloadable bot or strategy signal subscription.",
      "No one on the team owns risk limits, incidents, credentials or go-live decisions.",
      "You expect automation to remove market, liquidation, protocol or operational risk."
    ],
    deliverables: [
      "A scoped execution service for the agreed strategies, instruments, account roles and order types.",
      "Shared position, leverage, price, rate, reduce-only and emergency-pause controls.",
      "Order, fill, position and account-state reconciliation with exception queues and operator alerts.",
      "Role-aware configuration, structured audit logs and optional review or approval points.",
      "Source code, deployment files, monitoring notes, rollback procedure and team handoff."
    ],
    process: [
      "Map strategies, account roles, operator decisions, risk ownership and current failure points.",
      "Define the execution state machine, permission boundaries, alerts and acceptance scenarios.",
      "Build the smallest operable system and test normal, reject, disconnect and restart paths.",
      "Hand over deployment and operations before any separately approved staged production use."
    ],
    limits: [
      "The system implements customer-approved rules; it does not supply investment advice or performance guarantees.",
      "Team permissions and wallet roles depend on the official account model and the customer's current Hyperliquid setup.",
      "Availability, fills, latency, funding, liquidation and protocol behavior remain third-party and market risks.",
      "Ongoing monitoring, upgrades and incident response are separate from the initial delivery unless explicitly included."
    ],
    faq: [
      ["Is this only for market-making teams?", "No. The same delivery model can support defined TWAP, portfolio, signal-execution, treasury or product workflows when the rules and acceptance criteria are clear."],
      ["Can the system support subaccounts or vaults?", "Yes when the official account model and customer permissions support the workflow. Each account or vault remains a separate reconciliation and risk scope."],
      ["Can operators approve orders manually?", "Yes. Approval points, pause controls and exception review can be included when fully automatic routing is not appropriate."],
      ["Do you provide a dashboard?", "A focused operator dashboard can be included in the Execution System or Private Infrastructure scope when the team needs shared state and controls."],
      ["Who controls the infrastructure and keys?", "The customer controls the hosting, main wallet and credential lifecycle. The runtime receives only the smallest permissions required for the agreed workflow."],
      ["How much does a Hyperliquid trading system for a team cost?", "A company-controlled execution system normally starts in the USD 10,000+ private-infrastructure range. The estimate depends on strategy count, accounts, operator roles, dashboards, approval points, monitoring and deployment requirements."],
      ["How long does a team system take to deliver?", "We first scope one operable slice and its acceptance path. A focused first phase can often be planned in 6-10 weeks, while multiple strategies, dashboards and integrations are delivered as separately accepted phases."],
      ["How is the project accepted?", "Acceptance is based on agreed workflows, controls, logs, failure recovery and handoff—not trading returns."]
    ],
    related: [
      ["/hyperliquid-api-trading-bot-development/", "Custom Hyperliquid trading bot"],
      ["/tradingview-to-hyperliquid-automation/", "TradingView to Hyperliquid automation"],
      ["/articles/hyperliquid-api-order-reconciliation-websocket-checklist/", "Technical reliability checklist"]
    ],
    officialReferences: hyperliquidReferenceLinks
  }
];

// Historical pages may be upgraded separately. Do not add new slugs here: every
// new service page must pass the buyer-intent contract below before generation.
const legacyBuyerIntentServiceSlugs = new Set([
  "tradingview-webhook-automation",
  "exchange-api-trading-bot-development",
  "broker-api/ibkr",
  "broker-api/schwab",
  "broker-api/alpaca",
  "fix-api-order-routing",
  "custom-trading-software-development",
  "tradingview-webhook-developer",
  "ibkr-api-automation-developer",
  "fix-api-order-routing-developer",
  "risk-engine",
  "private-deployment"
]);

function assertBuyerIntentContract(page) {
  if (legacyBuyerIntentServiceSlugs.has(page.slug)) return;

  const issues = [];

  if (page.buyerIntentVersion !== 1) issues.push("buyerIntentVersion: 1");
  if (!page.buyerAudience) issues.push("buyerAudience");
  if (!page.buyerProblem) issues.push("buyerProblem");

  if (issues.length > 0) {
    throw new Error(`Service page ${page.slug} fails buyer-intent contract: ${issues.join(", ")}`);
  }
}

servicePages.forEach(assertBuyerIntentContract);

const faqPage = {
  slug: "faq",
  breadcrumb: "常见问题",
  eyebrow: "FAQ",
  title: "自动交易系统开发常见问题 | Webhook、券商 API、风控和部署",
  description: "SignalCraft Labs 自动交易系统开发常见问题，覆盖 TradingView Webhook、券商 API、交易所 API、风控、交付包、预算和风险边界。",
  h1: "自动交易系统开发常见问题",
  intro: "这里集中回答客户在咨询前最常问的问题。所有回答都以技术开发和系统交付为边界，不构成投资建议。",
  questions: [
    ["你们是卖策略还是做系统开发？", "我们做自动交易系统和交易 API 定制开发，不出售收益承诺型策略，不代管资金，也不替客户做投资判断。"],
    ["交付包为什么是 2000 / 5000 / 10000 美金三档？", "2000 美金通常适合 API Starter Package，5000 美金适合 Execution System Package，10000 美金适合 Private Infrastructure Package。最终范围以输入条件、交付物和验收清单为准。"],
    ["TradingView Webhook 自动化需要什么资料？", "需要 Alert 文案、信号变量、品种、周期、方向、仓位规则、止损止盈和异常处理方式。"],
    ["券商 API 项目前最需要确认什么？", "需要确认账户 API 权限、地区限制、订单类型、交易品种、数据权限和是否有测试环境。"],
    ["你们会接触客户资金吗？", "不会。我们建议使用最小权限 API Key，不需要提现权限，不代管账户或资金。"],
    ["项目如何验收？", "以双方确认的功能清单、接口平台、测试路径、日志、告警、源码和部署文档为准，盈利结果不作为软件验收标准。"],
    ["能不能做全自动交易？", "技术上可以做自动执行，但建议保留风控、限额、人工确认、暂停开关和小资金灰度流程。"],
    ["多久能交付？", "取决于接口平台、规则复杂度和是否需要后台。单接口验证通常更快，多接口和私有化系统需要分阶段评估。"],
    ["后续可以扩展吗？", "可以。建议先做最小可验证版本，再扩展到多策略、多接口、后台、权限和更完整的运维流程。"],
    ["如果第三方 API 政策变化怎么办？", "第三方平台的 API、费用、权限和地区限制由平台决定。若变化影响项目，需要重新评估替代方案或范围。"]
  ]
};

const caseStudiesPage = {
  slug: "case-studies",
  breadcrumb: "匿名案例",
  eyebrow: "Anonymous Case Studies",
  title: "交易自动化工程匿名案例 | Webhook、券商 API、风控和私有部署",
  description: "SignalCraft Labs 匿名工程案例，展示 TradingView Webhook、券商 API、交易所 API、风控和私有化部署的交付方式，不展示收益承诺。",
  h1: "交易自动化工程匿名案例",
  intro: "以下是匿名化的工程交付场景，按问题、约束、解决方案、交付物、验收方式和不包含事项说明。不公开客户身份，不展示收益曲线，也不构成投资建议。",
  studies: [
    {
      title: "TradingView Webhook 去重与风控执行链路",
      problem: "客户已有 Pine Script 信号，但 Alert 重复、网络重试和手工下单造成执行不一致，无法稳定复盘每一次信号的处理结果。",
      constraints: "不改客户策略逻辑；保留人工暂停开关；API Key 不包含提现权限；每个信号必须有可追踪的 event_id 和处理状态。",
      solution: "TradingView Alert -> 签名校验 -> event_id 幂等去重 -> 冷却窗口 -> 风控规则 -> 订单路由 -> 审计日志和 Telegram 告警。",
      deliverables: "Webhook 接收服务、payload 模板、风控配置、订单路由模块、脱敏日志字段、部署说明和灰度上线清单。",
      acceptance: "回放重复 payload、延迟 payload、错误签名、暂停开关、只减仓和超限数量，验证系统只产生一次明确结果：执行、拒绝或人工处理。",
      evidence: "6 条可重复验收路径：重复、延迟、错误签名、暂停、只减仓和数量超限；每条路径都必须留下唯一处理状态。",
      exclusions: "不评价信号盈利能力，不提供跟单服务，不保证成交价格、滑点、胜率或收益。"
    },
    {
      title: "券商 API 订单计划与人工确认",
      problem: "客户希望把目标权重、持仓同步和订单生成串起来，但订单发送前仍需要人工确认和审计记录。",
      constraints: "券商权限、订单类型和可交易品种以平台为准；发送订单前必须展示现金约束、敞口变化和潜在拒单原因。",
      solution: "持仓同步 -> 目标权重输入 -> 订单计划 -> 交易前风险摘要 -> 人工确认 -> 券商 API -> 执行回报同步 -> 审计日志。",
      deliverables: "订单计划脚本或轻后台、券商 API adapter、确认节点、执行回报映射、日志字段说明、测试样例和交接文档。",
      acceptance: "用 paper 或小额测试路径验证计划生成、确认前不下单、拒单/撤单/成交状态同步、日志留痕和权限最小化。",
      evidence: "5 个可检查节点：计划生成、人工确认、拒单/撤单/成交同步、审计日志和最小权限；确认前不得发送订单。",
      exclusions: "不提供荐股、调仓建议、投资组合建议或账户托管；客户自行确认订单和承担投资决策。"
    },
    {
      title: "交易所 API DCA/Grid 执行与异常熔断",
      problem: "客户已有 DCA 或 Grid 规则，希望系统按配置执行，并在接口异常、精度错误或风险超限时自动停下。",
      constraints: "交易所限频、价格精度、数量精度、最小名义金额和市场状态会影响订单；API Key 仍采用最小必要权限。",
      solution: "规则配置 -> 数量和精度标准化 -> 风控检查 -> 订单状态监听 -> 重试上限 -> 异常熔断 -> 告警和运行日志。",
      deliverables: "规则配置样例、交易所 connector、风控拒单原因表、状态日志、告警配置、部署 runbook 和上线验收脚本。",
      acceptance: "模拟最大层数、冷却窗口、价格保护、API 超时、部分成交和接口拒单，验证暂停、重试、熔断和日志行为。",
      evidence: "6 类异常样本：最大层数、冷却、价格保护、超时、部分成交和接口拒单；每类都要能暂停、告警或进入人工处理。",
      exclusions: "不承诺套利机会、交易收益、手续费优势或滑点结果；不需要提现、划转或账户管理员权限。"
    },
    {
      title: "私有化部署、监控告警与交接",
      problem: "客户希望源码、配置、日志和告警都运行在自己控制的 VPS 或云环境中，并能在交接后自行重启和排障。",
      constraints: "服务器、密钥和第三方账户由客户保管；初始交付不包含无限期运维；重启、回滚、密钥轮换和日志位置必须清楚。",
      solution: "Docker 或进程守护 -> 环境变量 -> 服务健康检查 -> 日志轮转 -> 告警渠道 -> 备份/回滚说明 -> 远程交接。",
      deliverables: "源码、.env.example、部署配置、进程守护配置、日志路径、告警设置、incident checklist 和远程讲解记录。",
      acceptance: "从干净环境完成部署，演示重启、回滚、告警测试、日志查询、密钥轮换检查和暂停开关。",
      evidence: "6 项交接检查：干净部署、重启、回滚、告警、日志查询和密钥/暂停控制；客户可按 runbook 独立复现。",
      exclusions: "不代管客户账户、服务器、API Key 或日常交易决策；长期运维、服务器管理和策略修改需另行确认范围。"
    }
  ]
};

const articlesIndexPage = {
  slug: "articles",
  breadcrumb: "技术文章",
  eyebrow: "Engineering Articles",
  title: "自动交易系统技术文章 | Webhook、券商 API、FIX、风控验收和审计日志",
  description: "SignalCraft Labs 自动交易系统技术文章，覆盖 TradingView Webhook 去重、IBKR 接入选择、风控验收、FIX 回报和审计日志。",
  h1: "自动交易系统技术文章",
  intro: "这些文章面向已经有交易规则和 API 权限、正在评估工程落地的客户。重点是接口限制、风险边界、验收清单和可维护性，不讨论收益预测。"
};

const articlePages = [
  {
    slug: "articles/tradingview-webhook-duplicate-orders",
    breadcrumb: "TradingView Webhook 防重复下单",
    eyebrow: "TradingView Webhook",
    title: "TradingView Webhook 如何防重复下单 | 去重、冷却、风控和日志",
    description: "TradingView Webhook 防重复下单工程指南，说明 event_id、冷却时间、幂等处理、风控拒单、告警和灰度验收。",
    h1: "TradingView Webhook 如何防重复下单",
    intro: "TradingView Alert 负责把信号发出来，但自动交易系统必须自己处理重复信号、延迟、重试、风控和日志。防重复下单不是一个按钮，而是一组工程约束。",
    summary: "TradingView Webhook 防重复下单需要稳定 event_id、时间窗口、冷却规则、幂等订单路由、风控拒绝日志和上线前回放测试。",
    sections: [
      {
        title: "先让 Alert payload 可识别",
        body: "Alert 文案至少应包含策略名、品种、方向、动作、数量、bar 时间或信号时间、以及 shared secret。系统用这些字段生成稳定 event_id，避免同一根 K 线或同一交易动作被重复执行。",
        bullets: ["不要只传 buy/sell 一个词。", "不要把交易数量写死在服务端且没有版本记录。", "secret 只用于请求校验，不应放在前端页面或公开仓库。"]
      },
      {
        title: "用 event_id 和冷却窗口做幂等",
        body: "Webhook 接收后先检查 event_id 是否已处理，再检查同一品种、同一方向、同一策略的冷却窗口。只有通过幂等检查和风控检查后，才进入订单准备或订单路由。",
        bullets: ["event_id 可由 strategy、symbol、action、bar_time 拼接。", "冷却窗口应按策略和品种分组，而不是全局一刀切。", "重复信号应该写入日志，不能静默丢弃。"]
      },
      {
        title: "把风控拒绝当成正常结果记录",
        body: "最大仓位、最大数量、价格偏离、只减仓、暂停开关和交易时段都可能拒绝信号。拒绝不是系统失败，而是可审计的风控结果。",
        bullets: ["日志里保留 risk_decision 和 risk_reason。", "告警区分重复、权限错误、风控拒绝和第三方接口错误。", "上线前用样本信号回放，逐项验证通过和拒绝路径。"]
      }
    ],
    checklistTitle: "上线前检查",
    checklist: [
      "重复同一个 payload 时只准备一次订单。",
      "secret 错误时拒绝并告警。",
      "超出最大数量或仓位时拒绝并记录原因。",
      "交易接口不可用时进入暂停或人工处理流程。",
      "客户能看到事件日志、拒单原因和重启方式。"
    ],
    references: [
      officialReferenceLinks[0],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs 公开脱敏 demo，展示去重、权限校验和风控拒绝日志。"]
    ]
  },
  {
    slug: "articles/ibkr-tws-gateway-vs-client-portal",
    breadcrumb: "IBKR TWS Gateway 与 Client Portal",
    eyebrow: "IBKR API",
    title: "IBKR TWS Gateway 和 Client Portal 怎么选 | 自动化接入评估",
    description: "IBKR TWS Gateway 和 Client Portal 自动化接入选择指南，说明连接方式、会话稳定性、权限限制、订单类型、测试和验收关注点。",
    h1: "IBKR TWS Gateway 和 Client Portal 怎么选",
    intro: "IBKR 自动化项目不能只问“用哪个 API”。实际选择取决于账户权限、运行环境、订单类型、会话稳定性、数据权限、人工确认要求和运维能力。",
    summary: "IBKR 接入选择应先确认账户权限、订单类型、会话稳定性、运行环境、数据订阅、错误处理和灰度验收，而不是按接口名称直接决定。",
    sections: [
      {
        title: "TWS Gateway 更像长期运行入口",
        body: "TWS Gateway / TWS API 工作流常用于需要较完整账户状态、订单管理和持仓同步的自动化场景，但必须认真处理登录会话、断线重连、交易时段、数据订阅和本地运行环境。",
        bullets: ["适合需要持续同步订单、成交和持仓的系统。", "需要监控 Gateway 进程状态和网络连接。", "重启后要验证未完成订单和持仓快照。"]
      },
      {
        title: "Client Portal 更关注 Web API 工作流",
        body: "Client Portal 相关工作流更接近 HTTP/Web API 集成，但仍受账户授权、会话、可用接口和平台策略限制影响。是否适合要看目标订单流程和客户账户状态。",
        bullets: ["适合先做账户、组合或订单流程可行性评估。", "需要处理授权和会话失效。", "不能默认所有订单类型、品种和地区都可用。"]
      },
      {
        title: "最终选择看验收路径",
        body: "如果客户无法在测试或小范围环境里验证连接、订单、撤单、拒单、成交回报和持仓同步，就不应该进入大范围自动化上线。",
        bullets: ["先确认账户权限和市场数据订阅。", "逐项测试订单类型、撤单、交易时段和拒单原因。", "保留人工暂停、只减仓和审计日志。"]
      }
    ],
    checklistTitle: "IBKR 项目评估资料",
    checklist: [
      "账户地区、账户类型和 API 权限状态。",
      "目标品种、订单类型、交易时段和数据订阅。",
      "是否接受本地 Gateway、VPS 或客户自有云运行。",
      "是否需要人工确认、组合再平衡或多账户流程。",
      "上线前如何验证拒单、断线、撤单和持仓同步。"
    ],
    references: [
      officialReferenceLinks[1],
      ["IBKR platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs 脱敏平台接入笔记。"]
    ]
  },
  {
    slug: "articles/automated-trading-risk-acceptance-checklist",
    breadcrumb: "自动交易系统风控验收清单",
    eyebrow: "Risk Controls",
    title: "自动交易系统上线前的风控验收清单 | 权限、暂停、拒单和灰度",
    description: "自动交易系统上线前风控验收清单，覆盖 API Key 权限、暂停开关、最大仓位、重复信号、拒单日志、告警和灰度上线。",
    h1: "自动交易系统上线前的风控验收清单",
    intro: "自动交易系统上线前，真正要验收的不是行情判断，而是系统在错误信号、越权请求、接口异常和人工暂停时能否按预期停下来、写日志并通知负责人。",
    summary: "自动交易系统上线前应逐项验证 API Key 权限、暂停开关、最大仓位、重复信号、拒单日志、告警、回滚和灰度运行流程。",
    sections: [
      {
        title: "先定义不能下单的场景",
        body: "风控验收从禁止条件开始。系统应在 API Key 权限不足、超过最大仓位、超过单笔数量、交易时段不匹配、价格偏离过大或人工暂停开启时拒绝下单。",
        bullets: ["每个禁止条件都应有明确 risk_reason。", "暂停开关应优先于所有策略信号。", "API Key 不需要提现或划转权限。"]
      },
      {
        title: "把拒单和告警做成可复查事件",
        body: "拒单不是异常噪音，而是风控系统的正常输出。日志里应保留信号、规则版本、风控决定、拒绝原因、订单意图、第三方接口响应和告警发送状态。",
        bullets: ["区分 duplicate_signal、risk_rejected、api_error 和 manual_pause。", "告警内容应能定位品种、策略、动作和拒绝原因。", "客户应能用样本信号复现通过和拒绝路径。"]
      },
      {
        title: "用灰度上线替代一次性全自动",
        body: "上线流程应从 dry-run、模拟盘、测试环境或极小范围灰度开始。只有日志、告警、拒单、重启和回滚路径都演示过，才进入更高权限的自动执行。",
        bullets: ["先验证只读、查询、下单、撤单和状态同步。", "先跑固定样本，再接真实信号。", "上线文档应写清楚重启、暂停、回滚和密钥轮换方式。"]
      }
    ],
    checklistTitle: "上线前风控验收项",
    checklist: [
      "API Key 没有提现、划转或无关管理员权限。",
      "人工暂停开启后，任何新信号都不会进入订单路由。",
      "重复信号、超仓位、超数量和价格偏离都会被拒绝并写入日志。",
      "第三方 API 超时、拒单或断线时会告警，并保留原始响应。",
      "客户能按文档完成重启、暂停、回滚和密钥轮换。"
    ],
    references: [
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs 脱敏上线验收清单。"],
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs API Key 最小权限建议。"]
    ]
  },
  {
    slug: "articles/fix-api-execution-report-audit-log-design",
    breadcrumb: "FIX API 回报与审计日志",
    eyebrow: "FIX API",
    title: "FIX API 订单回报和审计日志设计 | ExecutionReport、序号和原始消息",
    description: "FIX API 订单回报和审计日志设计指南，说明 ExecutionReport、Reject、会话序号、原始消息、标准化状态和上线验收。",
    h1: "FIX API 订单回报和审计日志设计",
    intro: "FIX API 项目里，下单只是链路的一部分。真正可维护的订单路由系统必须把 ExecutionReport、Reject、序号恢复、原始消息和标准化订单状态设计清楚。",
    summary: "FIX API 订单路由应同时保存原始 FIX 消息和标准化状态，重点验收 ExecutionReport、Reject、序号恢复、断线重连、审计日志和 UAT 回放。",
    sections: [
      {
        title: "把 ExecutionReport 当成订单状态来源",
        body: "NewOrderSingle 发出后，系统不能只看本地请求成功。订单状态应由 ExecutionReport、Reject、CancelReject 等回报驱动，并映射成内部统一状态。",
        bullets: ["保留 ClOrdID、OrderID、ExecID、OrdStatus、ExecType 和 CumQty。", "拒单和撤单失败要进入人工可见队列。", "同一订单的多次回报应按序合并。"]
      },
      {
        title: "同时保存原始消息和标准化日志",
        body: "原始 FIX 消息用于排查接入方差异和字段问题，标准化日志用于后台展示、告警和审计。两者都要保存，且能通过订单号、会话和时间关联。",
        bullets: ["原始消息不要只存解析后的摘要。", "标准化日志应包含方向、品种、数量、价格、状态和拒绝原因。", "敏感字段和凭证不能写入公开日志。"]
      },
      {
        title: "上线前验证会话和序号恢复",
        body: "FIX 链路必须测试登录、心跳、断线、重连、序号重置、重发请求、登出和 UAT 脚本。没有这些记录，后续生产问题很难定位。",
        bullets: ["记录 SenderCompID、TargetCompID、MsgSeqNum 和 PossDupFlag。", "断线后先同步状态，再继续处理新订单。", "UAT 回放要覆盖下单、撤单、拒单和部分成交。"]
      }
    ],
    checklistTitle: "FIX 回报和审计验收项",
    checklist: [
      "每个订单都有唯一 ClOrdID，并能关联全部回报。",
      "ExecutionReport、Reject 和 CancelReject 都写入原始消息日志。",
      "内部订单状态由回报驱动，不只依赖本地下单请求。",
      "断线重连、序号恢复和重发请求经过 UAT 验证。",
      "审计日志能导出订单生命周期、拒绝原因和关键 FIX 字段。"
    ],
    references: [
      officialReferenceLinks[4],
      ["FIX platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs 脱敏平台接入笔记。"]
    ]
  },
  {
    slug: "articles/how-we-prevent-duplicate-tradingview-webhook-orders",
    lang: "en",
    breadcrumb: "Prevent Duplicate TradingView Webhook Orders",
    eyebrow: "Webhook Case Note",
    title: "How We Prevent Duplicate TradingView Webhook Orders | Event IDs, Cooldowns and Risk Logs",
    description: "A practical engineering note on preventing duplicate TradingView webhook orders with event IDs, cooldown windows, idempotent routing, risk checks and audit logs.",
    h1: "How We Prevent Duplicate TradingView Webhook Orders",
    intro: "Duplicate TradingView webhook orders are usually not solved by one setting. A production-ready workflow needs stable event IDs, cooldown windows, risk decisions, logging and a replayable acceptance test.",
    summary: "Preventing duplicate TradingView webhook orders requires stable event IDs, strategy-symbol-action grouping, cooldown windows, idempotent order routing, risk reject logs and replay tests.",
    sections: [
      {
        title: "Start with a payload that can identify one event",
        body: "The webhook payload should include the strategy name, symbol, action, size, timeframe, signal time or bar time, and a shared secret. Those fields let the receiver build a stable event ID instead of guessing whether two requests are the same trading action.",
        bullets: ["Do not rely on a plain buy or sell string.", "Include enough fields to distinguish strategy, symbol, direction and time.", "Keep the shared secret out of public pages and repositories."]
      },
      {
        title: "Apply idempotency before order routing",
        body: "The receiver should check whether the event ID has already been processed before any order is prepared. A second layer checks the same strategy, symbol and action inside a cooldown window so repeated alerts do not become repeated orders.",
        bullets: ["Store every accepted, duplicated and rejected event.", "Group cooldowns by strategy and symbol, not only globally.", "Log duplicate events as a normal audit result instead of silently dropping them."]
      },
      {
        title: "Treat risk rejects as successful controls",
        body: "Max position, max order size, price protection, trading hours, manual pause and reduce-only rules can all reject a valid-looking webhook. That reject should be visible to the client with a risk reason and alert status.",
        bullets: ["Keep risk_decision and risk_reason in the event log.", "Separate duplicate_signal, risk_rejected, api_error and manual_pause alerts.", "Replay sample payloads before connecting real order permissions."]
      }
    ],
    checklistTitle: "Duplicate-order acceptance checks",
    checklist: [
      "Sending the same payload twice produces only one order intent.",
      "A wrong shared secret is rejected and logged.",
      "A max-position breach is rejected with a visible risk reason.",
      "Manual pause blocks new order routing before the API call.",
      "The client can review event ID, duplicate status, risk decision and alert delivery."
    ],
    references: [
      officialReferenceLinks[0],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."]
    ]
  },
  {
    slug: "articles/ibkr-tws-gateway-vs-client-portal-automated-trading",
    lang: "en",
    breadcrumb: "IBKR TWS Gateway vs Client Portal",
    eyebrow: "IBKR API",
    title: "IBKR TWS Gateway vs Client Portal for Automated Trading | Connection, Sessions and Order Workflow",
    description: "Compare IBKR TWS Gateway and Client Portal for automated trading workflows, including sessions, order routing, account permissions, market data and acceptance tests.",
    h1: "IBKR TWS Gateway vs Client Portal for Automated Trading",
    intro: "The right IBKR automation path depends on the order workflow, account permissions, session model, data needs, operations environment and acceptance tests. The API name alone is not enough.",
    summary: "IBKR TWS Gateway and Client Portal should be compared by session stability, account permissions, order types, market data, deployment model, error handling and acceptance tests.",
    sections: [
      {
        title: "TWS Gateway is usually evaluated for long-running workflows",
        body: "TWS Gateway and TWS API workflows are often considered when the system needs continuous account state, order management, execution reports and position sync. The tradeoff is that the runtime environment, session health and reconnect behavior need careful operations design.",
        bullets: ["Monitor gateway process health and connection status.", "Validate open orders and positions after restart.", "Test trading hours, order types, rejects and cancel flow."]
      },
      {
        title: "Client Portal fits a different operations model",
        body: "Client Portal workflows are closer to HTTP or web API integration, but they still depend on account authorization, session lifecycle, available endpoints, region and platform policy. It can be useful for account and workflow evaluation when the intended order flow matches the available endpoints.",
        bullets: ["Plan for authorization and session expiry.", "Verify whether the needed instruments and order types are available.", "Do not assume every IBKR workflow is exposed through the same API surface."]
      },
      {
        title: "Choose by acceptance tests, not by API branding",
        body: "Before a live automation scope is accepted, the workflow should demonstrate connection, account lookup, order preview or order placement, cancel flow, reject handling, execution reports, position sync, logs and manual pause behavior.",
        bullets: ["Start with a paper, test or limited-scope workflow when possible.", "Keep account credentials and final trading decisions under customer control.", "Use audit logs to connect signals, orders, reports and rejects."]
      }
    ],
    checklistTitle: "IBKR automation decision checklist",
    checklist: [
      "Account region, account type and API access are confirmed.",
      "Target instruments, order types, market data and trading hours are known.",
      "The deployment model is clear: local machine, VPS, customer cloud or supervised process.",
      "Reconnect, session expiry, rejects, cancel flow and position sync are tested.",
      "Manual pause, order limits, audit logs and handoff documentation are part of the scope."
    ],
    references: [
      officialReferenceLinks[1],
      ["IBKR platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."]
    ]
  },
  {
    slug: "articles/tradingview-webhook-strategy-automation",
    lang: "en",
    breadcrumb: "TradingView Webhook Strategy Automation",
    eyebrow: "TradingView Webhook",
    title: "TradingView Webhook Strategy Automation | From Alert Payload to Broker Order",
    description: "A practical guide to TradingView webhook strategy automation, covering alert payloads, event IDs, broker API routing, risk checks, cooldowns and audit logs.",
    h1: "TradingView Webhook Strategy Automation",
    intro: "A TradingView alert is only the signal source. A usable automation workflow needs payload design, request validation, duplicate prevention, risk checks, broker API routing, logs and a controlled go-live process.",
    summary: "TradingView webhook strategy automation should turn alerts into explicit order intents with event IDs, cooldowns, risk checks, broker routing, logs and replayable acceptance tests.",
    sections: [
      {
        title: "Turn the alert into an explicit order intent",
        body: "The alert payload should describe the strategy, symbol, action, side, quantity model, timeframe, signal time and version. That makes the receiver able to decide what the signal means instead of guessing from a short text message.",
        bullets: ["Avoid payloads that only say buy or sell.", "Include a strategy version when the trading rule changes.", "Keep secrets and account identifiers out of public scripts and screenshots."]
      },
      {
        title: "Validate and store the event before execution",
        body: "The receiver should validate the shared secret, parse the payload, create a stable event ID, check duplicate status and store the event before any broker API call. This makes retries and alert bursts auditable.",
        bullets: ["Use event IDs for idempotency.", "Apply cooldowns by strategy, symbol and action.", "Store accepted, duplicated and rejected events with a visible reason."]
      },
      {
        title: "Route only after risk checks pass",
        body: "Order routing should happen after max size, max position, market-hours, price protection, manual pause and reduce-only checks. The system should log whether a signal became an order, a risk reject or an API error.",
        bullets: ["Do not make profit results the acceptance criterion.", "Connect to paper, test or limited live scope first.", "Keep order intent, API response and final status in the audit log."]
      }
    ],
    checklistTitle: "Webhook automation handoff checklist",
    checklist: [
      "The payload contains strategy, symbol, action, timeframe, size model and signal time.",
      "Duplicate payloads do not create duplicate order intents.",
      "Manual pause blocks routing before any broker API request.",
      "Risk rejects show a reason such as max_position, price_protection or market_closed.",
      "The client can review event logs, order logs, rejects, alerts and restart steps."
    ],
    references: [
      officialReferenceLinks[0],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."]
    ]
  },
  {
    slug: "articles/ibkr-api-strategy-execution",
    lang: "en",
    breadcrumb: "IBKR API Strategy Execution",
    eyebrow: "IBKR API",
    title: "IBKR API Strategy Execution | Orders, Positions, Risk Checks and Logs",
    description: "How to evaluate IBKR API strategy execution projects, including account permissions, order types, positions, rejects, risk checks, logs and staged rollout.",
    h1: "IBKR API Strategy Execution",
    intro: "IBKR API strategy execution is not only about sending orders. A reliable workflow has to verify account permissions, instruments, order types, market data, position state, rejects, risk checks and operational logs.",
    summary: "IBKR API strategy execution should start with account permissions and acceptance tests, then add order routing, position sync, risk limits, reject handling, logs and staged rollout.",
    sections: [
      {
        title: "Start with account and permission reality",
        body: "The first question is not which strategy is best. The first question is whether the customer's IBKR account, region, instruments, market data and API permissions support the intended workflow.",
        bullets: ["Confirm account type, region and API access.", "List target instruments, order types and trading hours.", "Separate read-only evaluation from live order permission."]
      },
      {
        title: "Make positions and order state first-class data",
        body: "An execution system should know current positions, open orders, submitted orders, rejected orders and completed fills. Strategy signals should be checked against this state before routing another request.",
        bullets: ["Sync positions before accepting new order intent.", "Track cancel flow, rejects and partial fills.", "Do not assume a local submitted status means an order is live or filled."]
      },
      {
        title: "Stage execution with operational controls",
        body: "A practical IBKR rollout starts with dry-run or limited scope, then verifies reconnects, session health, rejects, cancel flow, position sync, risk limits and manual pause before increasing automation authority.",
        bullets: ["Keep a manual pause switch above strategy logic.", "Log signal, order request, API response and final status.", "Document restart, rollback and key rotation steps."]
      }
    ],
    checklistTitle: "IBKR strategy execution readiness checklist",
    checklist: [
      "Account region, account type, API access and market data requirements are known.",
      "Target instruments, order types and trading hours have been reviewed.",
      "Position sync and open-order sync run before live routing.",
      "Rejects, cancels, partial fills, reconnects and session expiry are tested.",
      "Manual pause, risk limits, audit logs and handoff documentation are included."
    ],
    references: [
      officialReferenceLinks[1],
      ["IBKR platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."]
    ]
  },
  {
    slug: "articles/fix-api-order-routing-execution-reports-audit-logs",
    lang: "en",
    breadcrumb: "FIX API Order Routing",
    eyebrow: "FIX API",
    title: "FIX API Order Routing for Automated Strategies | Execution Reports and Audit Logs",
    description: "A FIX API order routing guide for automated strategies, covering session management, NewOrderSingle, ExecutionReport, Reject handling, sequence recovery and audit logs.",
    h1: "FIX API Order Routing for Automated Strategies",
    intro: "FIX API order routing is an execution workflow, not just a message sender. The system must define session behavior, message scope, order identifiers, execution reports, rejects, sequence recovery and audit logs before production use.",
    summary: "FIX API order routing for automated strategies needs session management, message mapping, ExecutionReport handling, raw message archives, normalized order state and UAT evidence.",
    sections: [
      {
        title: "Define the session and message scope early",
        body: "Before building order routing, the client and counterparty should confirm FIX version, SenderCompID, TargetCompID, heartbeat interval, sequence rules, test environment, certificates, allowlists and required message types.",
        bullets: ["Map Logon, Heartbeat, NewOrderSingle, Cancel, ExecutionReport, Reject and Logout.", "Confirm counterparty-specific tags before coding around assumptions.", "Treat test environment access as a project dependency."]
      },
      {
        title: "Use reports to drive order state",
        body: "Internal order state should be driven by ExecutionReport, Reject and CancelReject messages, not by the fact that a NewOrderSingle was written to the socket. Each report should connect back to a unique client order ID.",
        bullets: ["Preserve ClOrdID, OrderID, ExecID, OrdStatus and ExecType.", "Store raw FIX messages and normalized order state.", "Make rejects and cancel failures visible to operators."]
      },
      {
        title: "Prove recovery before live order flow",
        body: "UAT should cover login, heartbeat, new order, cancel, reject, partial fill, disconnect, reconnect, sequence recovery and logout. Without this evidence, production incidents are difficult to diagnose.",
        bullets: ["Test ResendRequest and PossDupFlag handling where applicable.", "Pause new routing until state is reconciled after reconnect.", "Keep raw messages exportable for audit and support."]
      }
    ],
    checklistTitle: "FIX routing acceptance checklist",
    checklist: [
      "The counterparty FIX spec, test credentials and network requirements are available.",
      "NewOrderSingle, Cancel, ExecutionReport, Reject and Logout are mapped.",
      "Raw messages and normalized status logs can be linked by order ID and session.",
      "Disconnect, reconnect, sequence recovery and resend behavior are tested.",
      "Operators can pause routing and review rejects before production use."
    ],
    references: [
      officialReferenceLinks[4],
      ["FIX platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."]
    ]
  },
  {
    slug: "articles/automated-trading-strategy-risk-checklist",
    lang: "en",
    breadcrumb: "Automated Strategy Risk Checklist",
    eyebrow: "Risk Controls",
    title: "Automated Trading Strategy Risk Checklist | Before Connecting Real Order Permissions",
    description: "A pre-launch risk checklist for automated trading strategies, including API permissions, manual pause, max position, duplicate signals, market hours, alerts and rollback.",
    h1: "Automated Trading Strategy Risk Checklist",
    intro: "Before a strategy gets real order permissions, the system should prove that it can reject unsafe signals, stop on command, log every decision and recover from common API failures.",
    summary: "An automated trading strategy risk checklist should validate API permissions, manual pause, max position, duplicate signals, market hours, alerts, rollback and operator handoff.",
    sections: [
      {
        title: "Set hard limits before strategy logic",
        body: "Risk checks should sit above the strategy. Even if the strategy says to enter, the system should reject requests that break max position, max order size, market hours, symbol allowlist, price protection or manual pause rules.",
        bullets: ["Manual pause should override every strategy signal.", "API keys should not include withdrawal or transfer permission.", "Symbol and order-type allowlists reduce accidental routing risk."]
      },
      {
        title: "Turn failure modes into tests",
        body: "A launch checklist should include duplicate payloads, stale signals, wrong secrets, missing permissions, API timeout, market closed, unsupported order type, reject response and reconnect behavior.",
        bullets: ["Every reject needs a visible risk reason.", "Alerts should distinguish risk_rejected from api_error.", "Sample payload replay is more useful than a vague manual review."]
      },
      {
        title: "Handoff should include operations, not only code",
        body: "The client should receive source code, configuration examples, environment notes, restart steps, rollback steps, key rotation guidance, alert destinations and a way to inspect order and risk logs.",
        bullets: ["Returns are not the acceptance criterion.", "Start with paper, test or limited live scope where possible.", "Document who can pause, restart and rotate keys."]
      }
    ],
    checklistTitle: "Pre-launch risk acceptance checklist",
    checklist: [
      "Read, trade and admin permissions are scoped separately.",
      "Manual pause prevents order routing before any third-party API call.",
      "Duplicate, stale and malformed signals are rejected and logged.",
      "Max position, max order size, market-hours and price-protection checks are tested.",
      "Restart, rollback, alert delivery and key rotation are documented."
    ],
    references: [
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."],
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs public notes for minimum API key permissions."]
    ]
  },
  {
    slug: "articles/common-automated-strategy-failure-points",
    lang: "en",
    breadcrumb: "Automated Strategy Failure Points",
    eyebrow: "Failure Modes",
    title: "Common Automated Trading Strategy Failure Points | Webhooks, APIs and Order State",
    description: "Common failure points in automated trading strategy implementation, including duplicate signals, repainting, stale state, API rejects, reconnects, partial fills and weak logs.",
    h1: "Common Automated Trading Strategy Failure Points",
    intro: "Most strategy automation failures are not caused by one bad indicator. They come from ambiguous signals, missing state, duplicate events, weak risk checks, unsupported order flows, reconnect gaps and logs that cannot explain what happened.",
    summary: "Common automated trading strategy failure points include duplicate signals, repainting, stale position state, API rejects, reconnect gaps, partial fills, missing pause controls and weak audit logs.",
    sections: [
      {
        title: "Signal failures happen before the API call",
        body: "A strategy signal can be duplicated, delayed, repainted, missing context or generated from a rule version that changed. The receiver needs enough payload context and state to reject unsafe or unclear events.",
        bullets: ["Include strategy version, symbol, action, signal time and timeframe.", "Reject stale signals before order preparation.", "Log duplicate and malformed events as normal outcomes."]
      },
      {
        title: "Execution failures come from missing state",
        body: "A system that does not know current position, open orders, recent fills and outstanding cancels can easily send the wrong order. Position sync and order state are part of the strategy automation layer.",
        bullets: ["Check open orders before submitting another entry.", "Handle partial fills and cancel failures explicitly.", "Do not treat API request success as execution success."]
      },
      {
        title: "Operations failures make small bugs expensive",
        body: "When a system has no pause switch, no alert classification, no restart note and no audit log, a small API error becomes a production incident. Operations design should be part of the first build, not a later cleanup.",
        bullets: ["Classify duplicate_signal, risk_rejected, api_error and operator_pause.", "Keep restart and rollback steps near the deployment config.", "Make logs readable by the client, not only by the developer."]
      }
    ],
    checklistTitle: "Failure-mode review checklist",
    checklist: [
      "The system rejects duplicate, stale and malformed signals.",
      "Position, open-order and recent-fill state are checked before routing.",
      "Partial fills, cancel failures, API rejects and reconnects have explicit handling.",
      "Manual pause, alert routing and restart steps are tested.",
      "Audit logs explain why each signal became an order, reject or ignored event."
    ],
    references: [
      officialReferenceLinks[0],
      officialReferenceLinks[1],
      officialReferenceLinks[4],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."]
    ]
  },
  {
    slug: "articles/tradingview-alert-payload-template",
    lang: "en",
    breadcrumb: "TradingView Alert Payload Template",
    eyebrow: "Payload Template",
    title: "TradingView Alert Payload Template | Webhook Fields for Safe Automation",
    description: "A TradingView alert payload template for webhook automation, covering strategy version, symbol, action, event ID, secret validation, risk profile and audit logs.",
    h1: "TradingView Alert Payload Template",
    intro: "A TradingView alert payload should be designed like an interface contract. If the payload only says buy or sell, the receiver cannot reliably prevent duplicates, route orders, apply risk checks or explain what happened later.",
    summary: "A useful TradingView alert payload template includes strategy, version, symbol, action, size model, signal time, event ID inputs, shared secret, risk profile and audit fields.",
    sections: [
      {
        title: "Fields that make a signal auditable",
        body: "The receiver needs enough context to understand one trading intent. Include strategy name, strategy version, symbol, action, side, size model, timeframe, signal time, bar time and a customer-visible risk profile. These fields allow the system to produce an event log that a client can review.",
        bullets: ["Use explicit actions such as enter_long, exit_long, reduce_only or cancel.", "Include strategy_version when the Pine Script or rule set changes.", "Keep account identifiers and secrets out of public examples."]
      },
      {
        title: "Fields that prevent duplicate execution",
        body: "The payload should provide stable inputs for an event ID. A common pattern combines strategy, symbol, action, timeframe and bar time, then stores the result before order routing. The system can then treat repeated delivery as a duplicate event instead of a new order.",
        bullets: ["Do not generate a random ID inside every retry.", "Group cooldown rules by strategy, symbol and action.", "Log duplicate events with a duplicate_signal reason."]
      },
      {
        title: "Fields that support risk review",
        body: "Risk controls need visible context. The payload should allow the receiver to compare intended size, current position, max position, reduce-only status, price protection and manual pause state before any third-party API call is made.",
        bullets: ["Use size_model instead of hard-coding every quantity in the service.", "Record risk_profile and rule version in logs.", "Never make profit results the software acceptance criterion."]
      }
    ],
    checklistTitle: "Payload fields to include",
    checklist: [
      "strategy, strategy_version, symbol, timeframe and signal_time are present.",
      "action, side and size_model are explicit enough for order-intent generation.",
      "bar_time or equivalent event ID input is stable across retries.",
      "secret validation is configured, but secrets are not logged or published.",
      "risk_profile, customer note and alert version are visible in audit logs."
    ],
    references: [
      officialReferenceLinks[0],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."]
    ]
  },
  {
    slug: "articles/trading-bot-api-key-permission-safety",
    lang: "en",
    breadcrumb: "API Key Permission Safety",
    eyebrow: "API Safety",
    title: "API Key Permission Safety for Trading Bots | Read, Trade and Withdrawal Boundaries",
    description: "API key permission safety guidance for trading bot projects, covering read access, trade access, withdrawal exclusion, IP limits, rotation and handover.",
    h1: "API Key Permission Safety for Trading Bots",
    intro: "API permission design is part of trading automation delivery. A client should understand which permissions are needed, which permissions should be avoided and how keys are rotated after handover.",
    summary: "Trading bot API keys should use minimum permissions: read access for evaluation, scoped trade access for execution, no withdrawal or transfer permission, IP limits where available and documented rotation steps.",
    sections: [
      {
        title: "Separate read-only evaluation from live routing",
        body: "Many projects can start with read-only permission to inspect balances, positions, open orders and account capability. Live trade permission should be added only after the workflow, risk limits, logs and acceptance tests are clear.",
        bullets: ["Read-only access is enough for many feasibility checks.", "Trade access should be tied to a specific scope.", "Admin, withdrawal and transfer permissions should stay out of the software delivery path."]
      },
      {
        title: "Constrain the execution key",
        body: "When trade permission is needed, the key should be restricted wherever the platform allows it. IP allowlists, product allowlists, subaccount isolation, symbol limits and order-size limits reduce the blast radius of mistakes.",
        bullets: ["Use a dedicated key for one project when possible.", "Avoid sharing personal master credentials.", "Document which account owner can revoke or rotate the key."]
      },
      {
        title: "Make rotation part of handover",
        body: "A finished project should not leave key handling as informal chat history. The runbook should explain environment variable names, key owner, rotation timing, revoke path, alert owner and which logs prove a key was changed.",
        bullets: ["Never write secrets into public logs or screenshots.", "Rotate keys after external delivery when the client requires it.", "Keep secret names in docs, not secret values."]
      }
    ],
    checklistTitle: "API key handover checklist",
    checklist: [
      "Read, trade, transfer, withdrawal and admin permissions are documented separately.",
      "Withdrawal and transfer permissions are not required for the automation scope.",
      "IP allowlists, symbol limits or subaccount boundaries are reviewed where available.",
      "Environment variable names and key ownership are included in the runbook.",
      "Rotation, revocation and emergency pause steps are documented."
    ],
    references: [
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs public notes for minimum API key permissions."],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/alpaca-api-paper-to-live-checklist",
    lang: "en",
    breadcrumb: "Alpaca API Paper to Live Checklist",
    eyebrow: "Alpaca API",
    title: "Alpaca API Paper to Live Checklist | Orders, Data, Risk and Handover",
    description: "Alpaca API paper-to-live automation checklist covering API keys, base URLs, market data, order status streams, risk limits, logs and rollout.",
    h1: "Alpaca API Paper to Live Checklist",
    intro: "Alpaca API automation often starts in paper trading, but a paper workflow is not automatically ready for live execution. The transition needs explicit checks around keys, base URLs, market data, order behavior, risk rules and operator handoff.",
    summary: "An Alpaca API paper-to-live checklist should verify key separation, base URLs, data permissions, order types, market hours, order status streams, risk limits, logs and manual pause behavior.",
    sections: [
      {
        title: "Separate environments deliberately",
        body: "Paper and live environments should use different keys, base URLs, logs and deployment notes. The system should make the active environment visible so the operator does not confuse a test run with live routing.",
        bullets: ["Name environment variables clearly.", "Log paper or live mode in every order-intent record.", "Keep deployment and rollback steps separate for each environment."]
      },
      {
        title: "Verify order and data behavior",
        body: "Before live routing, confirm the asset class, market data permission, order types, trading hours, order precision and status stream behavior. A paper order acceptance does not prove every live order path will behave the same.",
        bullets: ["Test submitted, filled, canceled, rejected and partially filled states.", "Check market-open and market-closed behavior.", "Confirm WebSocket reconnect and status reconciliation."]
      },
      {
        title: "Use staged authority",
        body: "The live transition should begin with limited symbols, limited size, manual pause and a small set of acceptance cases. Only increase authority after logs, alerts, restart and rollback paths are proven.",
        bullets: ["Manual pause should block routing before API calls.", "Risk rejects should show a visible reason.", "Returns are not the acceptance criterion."]
      }
    ],
    checklistTitle: "Paper-to-live readiness checklist",
    checklist: [
      "Paper and live API keys, base URLs and logs are separated.",
      "Market data, asset class, order type and trading-hour constraints are known.",
      "Submitted, filled, rejected, canceled and partial-fill states are tested.",
      "Manual pause, max size and symbol allowlist rules are active.",
      "Restart, rollback, alert delivery and key rotation are in the handover."
    ],
    references: [
      officialReferenceLinks[3],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/schwab-trader-api-oauth-automation-checklist",
    lang: "en",
    breadcrumb: "Schwab Trader API OAuth Checklist",
    eyebrow: "Schwab API",
    title: "Schwab Trader API OAuth Automation Checklist | Tokens, Accounts and Order Logs",
    description: "Schwab Trader API automation checklist for OAuth, token refresh, account scope, order requests, status sync, error handling and handover.",
    h1: "Schwab Trader API OAuth Automation Checklist",
    intro: "Schwab Trader API automation should be scoped around authorization, account visibility, token lifecycle, order capability, status sync and handover. A first successful token exchange is only the beginning.",
    summary: "A Schwab Trader API automation checklist should confirm OAuth scopes, token refresh, account visibility, order capability, reject handling, logs, reauthorization and operator ownership.",
    sections: [
      {
        title: "Confirm authorization ownership",
        body: "OAuth work should identify the account owner, app owner, redirect URI, requested scopes, token storage, refresh behavior and reauthorization path. The operator needs to know who can reconnect the integration when authorization expires.",
        bullets: ["Separate test and production app notes where possible.", "Do not log access tokens or authorization codes.", "Document token expiry and reauthorization alerts."]
      },
      {
        title: "Map account and order capability",
        body: "The project should confirm which accounts are visible, which instruments and order types are intended, and which endpoints are available to the customer's account. Do not assume every desired workflow is available until tested.",
        bullets: ["List account identifiers without exposing them publicly.", "Test order preview or order request behavior in the agreed scope.", "Record reject and error fields in logs."]
      },
      {
        title: "Build a handoff-friendly lifecycle",
        body: "A maintainable automation should make authorization state, order state, rejects, token failures and restart steps visible. The client should be able to understand whether a problem is authorization, permission, order validation or platform availability.",
        bullets: ["Classify auth_error, permission_error, order_reject and api_error separately.", "Keep manual pause above order routing.", "Include revoke and reconnect steps in the runbook."]
      }
    ],
    checklistTitle: "Schwab API automation checklist",
    checklist: [
      "OAuth app owner, redirect URI, scopes and token storage are documented.",
      "Account visibility, target instruments and order types are confirmed.",
      "Refresh failure, revoked authorization and reauthorization are tested.",
      "Order rejects and API errors are classified in logs.",
      "Manual pause, restart and credential rotation steps are included in handover."
    ],
    references: [
      officialReferenceLinks[2],
      ["IBKR platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."]
    ]
  },
  {
    slug: "articles/fix-api-uat-checklist-before-production",
    lang: "en",
    breadcrumb: "FIX API UAT Checklist",
    eyebrow: "FIX API",
    title: "FIX API UAT Checklist Before Production | Sessions, Reports and Recovery",
    description: "FIX API UAT checklist before production, covering Logon, Heartbeat, NewOrderSingle, ExecutionReport, Reject, reconnects, sequence recovery and audit logs.",
    h1: "FIX API UAT Checklist Before Production",
    intro: "FIX API production readiness depends on UAT evidence. The system should prove session behavior, message mapping, order lifecycle, rejects, disconnect recovery, sequence handling and audit logs before live order flow.",
    summary: "A FIX API UAT checklist should validate Logon, Heartbeat, NewOrderSingle, Cancel, ExecutionReport, Reject, disconnect recovery, sequence behavior, raw message logs and operator pause.",
    sections: [
      {
        title: "Test session lifecycle first",
        body: "Before order routing, UAT should cover Logon, Heartbeat, TestRequest, Logout, disconnect, reconnect, sequence recovery and any counterparty-specific session rules. Session evidence reduces production ambiguity.",
        bullets: ["Record SenderCompID, TargetCompID and sequence behavior.", "Know when sequence reset is allowed.", "Pause routing until session state is reconciled."]
      },
      {
        title: "Map order messages and reports",
        body: "NewOrderSingle and Cancel messages should be matched to ExecutionReport, Reject and CancelReject responses. Internal order state should be driven by reports, not only by local socket writes.",
        bullets: ["Link ClOrdID, OrderID, ExecID, OrdStatus and ExecType.", "Store raw FIX messages and normalized order state.", "Make rejects and cancel failures visible to operators."]
      },
      {
        title: "Rehearse production support",
        body: "A UAT package should include sample logs, reject examples, restart steps, pause behavior, runbook notes and exportable audit records. The client should know how to inspect an order lifecycle without reading raw code.",
        bullets: ["Export raw messages for support when needed.", "Classify session errors separately from order rejects.", "Keep certificates and network details in secure handover notes."]
      }
    ],
    checklistTitle: "FIX UAT acceptance checklist",
    checklist: [
      "Logon, Heartbeat, TestRequest, Logout and reconnect paths are tested.",
      "NewOrderSingle, Cancel, ExecutionReport, Reject and CancelReject are mapped.",
      "Sequence recovery and resend behavior are demonstrated.",
      "Raw messages and normalized order logs are linked by order ID.",
      "Manual pause, restart and production support notes are included."
    ],
    references: [
      officialReferenceLinks[4],
      ["FIX platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."]
    ]
  },
  {
    slug: "articles/trading-bot-private-deployment-vps-docker-runbook",
    lang: "en",
    breadcrumb: "Private Deployment Runbook",
    eyebrow: "Private Deployment",
    title: "Trading Bot Private Deployment Runbook | VPS, Docker, Logs and Alerts",
    description: "Private deployment runbook for trading bot systems, covering VPS setup, Docker, environment variables, logs, health checks, alerts, rollback and handover.",
    h1: "Trading Bot Private Deployment Runbook",
    intro: "Private deployment is valuable only if the client can operate the system after handover. The runbook should explain where the service runs, how it starts, how logs are reviewed, how alerts fire and how to stop or roll back safely.",
    summary: "A trading bot private deployment runbook should document VPS or cloud ownership, Docker or process setup, environment variables, logs, health checks, alerts, pause controls, backup and rollback.",
    sections: [
      {
        title: "Start with ownership and access boundaries",
        body: "The client should own the server, cloud account and third-party accounts. The delivery should avoid requiring permanent developer access to production secrets unless a separate support scope exists.",
        bullets: ["Document who owns the VPS or cloud account.", "Keep API secrets in environment variables or approved secret storage.", "Avoid sending master credentials through casual chat."]
      },
      {
        title: "Make operations repeatable",
        body: "The runbook should include installation, environment variables, start, stop, restart, health check, log location, alert destination, backup and rollback steps. A new operator should not need to reverse engineer the deployment.",
        bullets: ["Use clear service names and paths.", "Document what healthy logs look like.", "Keep pause and rollback commands easy to find."]
      },
      {
        title: "Accept the deployment with failure paths",
        body: "Deployment acceptance should test restart, alert delivery, bad configuration, API failure, manual pause and rollback. The system is not ready if it only works once on the developer's machine.",
        bullets: ["Test from a clean or documented environment.", "Verify logs after restart.", "Confirm the client can find alerts and runbook steps."]
      }
    ],
    checklistTitle: "Private deployment handover checklist",
    checklist: [
      "Server owner, domain, process model and access boundary are documented.",
      "Environment variables, service commands and log paths are written down.",
      "Health checks, alerts, manual pause and restart behavior are tested.",
      "Backup, rollback and key rotation steps are included.",
      "The client receives source code, runbook and acceptance evidence."
    ],
    references: [
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."]
    ]
  },
  {
    slug: "articles/crypto-asset-reporting-reconciliation-checklist",
    lang: "en",
    breadcrumb: "Crypto Asset Reporting Checklist",
    eyebrow: "Crypto Reporting",
    title: "Crypto Asset Reporting Reconciliation Checklist | Wallets, Exchanges and Evidence",
    description: "Crypto asset reporting reconciliation checklist for wallets, exchanges, CSV exports, read-only data, evidence trails, review workflows and private reporting.",
    h1: "Crypto Asset Reporting Reconciliation Checklist",
    intro: "Crypto asset reporting work should start with data sources and evidence boundaries. A useful reporting workflow reconciles wallets, exchange exports, balances, transactions and exceptions without asking for custody or trading authority.",
    summary: "A crypto asset reporting reconciliation checklist should identify wallets, exchange exports, read-only data sources, balance snapshots, transaction evidence, exception queues and report handover boundaries.",
    sections: [
      {
        title: "Inventory the data sources",
        body: "The first step is listing wallets, exchanges, custodians, CSV exports, API exports, reporting periods and responsible reviewers. Each source needs an owner and a refresh method.",
        bullets: ["Use read-only access or exports where possible.", "Record source, date range and snapshot time.", "Do not require withdrawal, transfer or custody permission."]
      },
      {
        title: "Separate reconciliation from advice",
        body: "A reporting system can organize evidence, detect missing records, compare balances and prepare review outputs. It should not be positioned as tax, legal, investment or custody advice unless qualified professionals are explicitly involved.",
        bullets: ["Flag missing cost basis, missing transfer link or unmatched transaction.", "Keep manual review states visible.", "State the reporting boundary in the handover."]
      },
      {
        title: "Make the output reviewable",
        body: "Reports should show source files, transformation rules, balance snapshots, exception reasons and reviewer notes. The client should be able to trace a number back to its source without developer-only knowledge.",
        bullets: ["Preserve raw exports separately from processed tables.", "Log import time, file name and row counts.", "Use exception queues for unmatched or ambiguous records."]
      }
    ],
    checklistTitle: "Reporting workflow checklist",
    checklist: [
      "Wallets, exchange accounts, exports and reporting periods are listed.",
      "Only read-only data, exports or customer-provided files are required.",
      "Raw files, transformed tables and exception records are traceable.",
      "Missing records, duplicate transfers and unmatched balances are reviewable.",
      "The handover states reporting boundaries and reviewer ownership."
    ],
    references: [
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."],
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs public notes for minimum API key permissions."]
    ]
  },
  {
    slug: "articles/hire-trading-api-developer-scope-checklist",
    lang: "en",
    breadcrumb: "Hire Trading API Developer Checklist",
    eyebrow: "Buyer Checklist",
    title: "Hire a Trading API Developer | Scope Checklist Before You Start",
    description: "A buyer checklist for hiring a trading API developer, covering signal source, broker or exchange API, permissions, risk controls, logs, deployment and handover.",
    h1: "Hire a Trading API Developer: Scope Checklist",
    intro: "Hiring a trading API developer goes better when the project brief separates strategy logic, API capability, risk controls, deployment and handover. A clear brief prevents the work from turning into vague automation.",
    summary: "Before hiring a trading API developer, define the signal source, target broker or exchange API, permission state, order flow, risk controls, logs, deployment target, budget tier and acceptance owner.",
    sections: [
      {
        title: "Define the signal and execution boundary",
        body: "The developer needs to know whether the signal comes from TradingView, research code, manual approval, a spreadsheet, a portfolio model or another system. The brief should say what becomes an order intent and what remains manual.",
        bullets: ["List signal source, fields and trigger conditions.", "Separate strategy design from execution engineering.", "State whether the first release is dry-run, paper or limited live."]
      },
      {
        title: "Confirm API and permission reality",
        body: "Broker and exchange APIs differ by region, account type, order type, market data, rate limit and approval process. A serious scope starts from real account capability, not a generic claim that an API exists.",
        bullets: ["Name the target API and account status.", "Document read, trade and excluded permissions.", "List order types, assets and trading hours."]
      },
      {
        title: "Require handover assets",
        body: "The project should end with source code, configuration examples, logs, runbook, restart steps, alert notes and acceptance cases. If the client cannot operate or inspect the system after delivery, the automation is incomplete.",
        bullets: ["Ask for event logs, order logs and risk reject reasons.", "Require manual pause and rollback notes.", "Set acceptance on behavior, not returns."]
      }
    ],
    checklistTitle: "Developer hiring brief checklist",
    checklist: [
      "Signal source, payload fields and trigger rules are documented.",
      "Target broker, exchange or FIX API and permission state are known.",
      "Risk rules, manual pause and order-size limits are defined.",
      "Deployment target, logs, alerts and runbook expectations are clear.",
      "Budget tier, timeline and acceptance owner are included in the brief."
    ],
    references: [
      officialReferenceLinks[0],
      officialReferenceLinks[1],
      officialReferenceLinks[4],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/tradingview-webhook-to-ibkr-order-workflow",
    lang: "en",
    breadcrumb: "TradingView to IBKR Workflow",
    eyebrow: "TradingView + IBKR",
    title: "TradingView Webhook to IBKR Order Workflow | Payload, Gateway and Risk Checks",
    description: "TradingView webhook to IBKR order workflow guide covering alert payloads, IBKR runtime choices, account permissions, risk gates, duplicate handling and audit logs.",
    h1: "TradingView Webhook to IBKR Order Workflow",
    intro: "A TradingView alert can trigger an IBKR automation workflow, but the project is not only a webhook and an order call. The delivery needs a payload contract, IBKR runtime choice, account permission review, risk gates and replayable acceptance evidence.",
    summary: "A TradingView webhook to IBKR order workflow should define payload fields, IBKR connection mode, account permissions, order preview, risk gates, duplicate handling and audit logs.",
    sections: [
      {
        title: "Define the alert payload as a contract",
        body: "The TradingView alert should carry enough fields to describe one intended action: strategy, version, symbol, action, timeframe, signal time, size model and event ID inputs. Without that contract, the IBKR side cannot reliably decide whether a request is new, duplicated, stale or unsafe.",
        bullets: ["Use stable fields for event ID generation.", "Keep shared secrets out of public code and screenshots.", "Version the payload when the TradingView script changes."]
      },
      {
        title: "Choose the IBKR runtime deliberately",
        body: "IBKR automation may involve TWS Gateway, TWS API, Client Portal or another approved route depending on the account and workflow. The scope should document session behavior, market data, order types, trading hours, reconnect behavior and who owns the running process.",
        bullets: ["Validate account permissions before building order routing.", "Log connection state and reconnect events.", "Pause new routing until positions and open orders are reconciled after restart."]
      },
      {
        title: "Accept the workflow with order-state evidence",
        body: "Acceptance should prove duplicate webhook handling, manual pause, max size checks, order preview, submitted orders, rejected orders, cancel flow and position sync. A single successful demo order is not enough for a maintainable delivery.",
        bullets: ["Replay sample alerts before live routing.", "Store signal, risk decision, order intent and broker response together.", "Set acceptance on observable behavior, not trading outcome."]
      }
    ],
    checklistTitle: "TradingView to IBKR scope checklist",
    checklist: [
      "Alert payload fields and event ID inputs are documented.",
      "IBKR connection model, account permissions and order types are confirmed.",
      "Manual pause, duplicate checks, max size and trading-hour checks run before order routing.",
      "Submitted, rejected, canceled and partially filled order states are logged.",
      "The handover includes environment variables, runtime notes, restart steps and acceptance examples."
    ],
    references: [
      officialReferenceLinks[0],
      officialReferenceLinks[1],
      ["Webhook dry-run demo", engineeringNotesUrl, "SignalCraft Labs public engineering notes for webhook validation and dry-run risk checks."],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/binance-api-trading-bot-risk-checklist",
    lang: "en",
    breadcrumb: "Binance API Risk Checklist",
    eyebrow: "Exchange API",
    title: "Binance API Trading Bot Risk Checklist | Keys, Limits, Orders and Logs",
    description: "Binance API trading bot risk checklist covering API key permissions, product scope, rate limits, order filters, position limits, logs, alerts and handover.",
    h1: "Binance API Trading Bot Risk Checklist",
    intro: "A Binance API trading bot scope should start with permissions, product boundaries and operational checks. The engineering task is to make order behavior, risk decisions, API errors and handover evidence visible before any higher-permission rollout.",
    summary: "A Binance API trading bot risk checklist should review API key permissions, product scope, rate limits, order filters, position limits, idempotency, logs, alerts and key rotation.",
    sections: [
      {
        title: "Start with permissions and product scope",
        body: "The project should identify whether the workflow touches spot, margin, futures or another product before implementation. API keys should use the minimum permissions needed for the first scope, and withdrawal or transfer authority should stay outside the automation path.",
        bullets: ["Separate read-only evaluation from trade permission.", "Document product scope and symbols before routing orders.", "Use dedicated project keys where the platform and account policy allow it."]
      },
      {
        title: "Design around filters, limits and retries",
        body: "Exchange APIs can reject orders because of precision, minimum notional, order type, rate limits, trading status or account constraints. The system should normalize inputs, classify rejects and avoid blind retry loops that repeat unsafe orders.",
        bullets: ["Validate quantity, price precision and minimum notional before sending.", "Classify rate_limit, filter_reject, permission_error and api_error separately.", "Cap retries and send alerts when human review is needed."]
      },
      {
        title: "Make every risk decision reviewable",
        body: "The operator should be able to review which signal arrived, what the system intended to do, which risk rule passed or rejected it, and what the exchange returned. Logs and alerts are part of the core delivery, not an optional afterthought.",
        bullets: ["Store signal ID, client order ID, symbol, side, size and risk decision.", "Use manual pause above order routing.", "Document key rotation and emergency revoke steps in the handover."]
      }
    ],
    checklistTitle: "Exchange API acceptance checklist",
    checklist: [
      "Product scope, symbols, order types and permissions are documented.",
      "Withdrawal, transfer and unrelated admin permissions are excluded.",
      "Precision, minimum notional, rate limit and unsupported-order cases are tested.",
      "Duplicate signal, stale signal, risk reject and API reject paths are logged.",
      "The client receives runbook notes for pause, key rotation, restart and alert review."
    ],
    references: [
      officialReferenceLinks[5],
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs public notes for minimum API key permissions."],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/broker-api-order-reconciliation-checklist",
    lang: "en",
    breadcrumb: "Broker API Order Reconciliation",
    eyebrow: "Broker API",
    title: "Broker API Order Reconciliation Checklist | Signals, Orders, Fills and Positions",
    description: "Broker API order reconciliation checklist for matching strategy signals, order intents, broker responses, fills, positions, rejects and audit exports.",
    h1: "Broker API Order Reconciliation Checklist",
    intro: "Broker API automation is not finished when an order request is accepted. A maintainable system reconciles the original signal, order intent, broker order ID, execution reports, fills, rejects, cancels and current positions.",
    summary: "Broker API order reconciliation should connect signals, order intents, broker order IDs, fills, cancels, rejects, positions, exception queues and exportable audit logs.",
    sections: [
      {
        title: "Link signals to broker order records",
        body: "Every order path should preserve the chain from signal to order intent to broker response. Without stable identifiers and timestamps, later support work becomes guesswork when a client asks why a position changed.",
        bullets: ["Keep signal ID, order intent ID and broker order ID together.", "Record account, symbol, side, quantity model and request time.", "Avoid overwriting intermediate states when a later fill arrives."]
      },
      {
        title: "Reconcile fills, rejects and cancels",
        body: "Accepted orders can be partially filled, canceled, rejected after validation or remain open longer than expected. The reconciliation process should make those states visible and separate broker-side rejects from internal risk rejects.",
        bullets: ["Classify submitted, open, partially_filled, filled, canceled and rejected states.", "Store raw broker response where safe.", "Queue unresolved mismatches for human review."]
      },
      {
        title: "Use reconciliation as an acceptance requirement",
        body: "Before production use, the client should see normal order, duplicate signal, rejected order, cancel, partial fill, reconnect and position-sync examples. This evidence is more useful than a screenshot of one successful order.",
        bullets: ["Export order lifecycle rows for review.", "Verify positions after restart before routing new orders.", "Document who resolves reconciliation exceptions."]
      }
    ],
    checklistTitle: "Order reconciliation handover checklist",
    checklist: [
      "Signal, order intent, broker order ID and fill records can be linked.",
      "Submitted, rejected, canceled, partial fill and filled states are visible.",
      "Position sync after restart is tested before new routing resumes.",
      "Mismatch and missing-status cases enter a review queue or alert path.",
      "The handover includes log fields, export format, owner and replay examples."
    ],
    references: [
      officialReferenceLinks[1],
      officialReferenceLinks[3],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/alpaca-order-status-reconciliation",
    lang: "en",
    breadcrumb: "Alpaca WebSocket Reconciliation",
    eyebrow: "Alpaca API",
    title: "Alpaca WebSocket Order Status Reconciliation | Streams, REST Backfill and Logs",
    description: "Alpaca WebSocket order status reconciliation checklist covering stream events, REST backfill, order IDs, partial fills, reconnects, retry behavior and handover.",
    h1: "Alpaca WebSocket Order Status Reconciliation",
    intro: "Alpaca order automation should not depend on a single stream message. A production-minded workflow combines WebSocket order updates, REST backfill, stable identifiers, reconnect behavior and reviewable logs so operators can explain each order state after handover.",
    summary: "Alpaca WebSocket order status reconciliation should combine streaming updates, REST backfill, stable order IDs, reconnect handling, partial-fill states, exception queues and audit logs.",
    related: [
      ["Alpaca broker API integration", "/broker-api/alpaca/"],
      ["Alpaca paper-to-live checklist", "/articles/alpaca-api-paper-to-live-checklist/"],
      ["Broker API order reconciliation checklist", "/articles/broker-api-order-reconciliation-checklist/"]
    ],
    sections: [
      {
        title: "Treat stream events as state inputs",
        body: "WebSocket order updates are useful for timely status changes, but the system still needs durable storage and a way to reconcile missed or repeated events. Each stream event should update a local order lifecycle record rather than replacing the full source of truth.",
        bullets: ["Store client_order_id, Alpaca order ID, symbol, side, requested quantity and event time.", "Classify new, accepted, filled, partially filled, canceled, expired and rejected states.", "Record duplicate or out-of-order stream events instead of silently ignoring them."]
      },
      {
        title: "Use REST backfill after reconnects",
        body: "Disconnects, deploys and token changes can leave gaps. After reconnect, the workflow should query open and recent orders, compare them with local state, and pause new routing if the account state is not reconciled.",
        bullets: ["Backfill open orders before resuming automated routing.", "Compare filled quantity and remaining quantity, not only final status.", "Alert when local state and broker state disagree."]
      },
      {
        title: "Make reconciliation part of acceptance",
        body: "The handover should prove normal fills, partial fills, canceled orders, rejects, reconnects and stale local state. A single accepted paper order does not prove that order status handling is ready for operator use.",
        bullets: ["Export an order lifecycle row for each acceptance case.", "Keep manual pause above order submission.", "Document who reviews unresolved reconciliation exceptions."]
      }
    ],
    checklistTitle: "Alpaca status reconciliation checklist",
    checklist: [
      "WebSocket order updates are stored with stable local and broker identifiers.",
      "REST backfill runs after reconnect, restart and suspected stream gaps.",
      "Partial fill, cancel, reject, expired and missing-status cases are visible.",
      "Routing pauses when order or position state cannot be reconciled.",
      "The runbook explains logs, alerts, replay steps and exception ownership."
    ],
    references: [
      officialReferenceLinks[3],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/schwab-api-token-refresh-runbook",
    lang: "en",
    breadcrumb: "Schwab Token Refresh Runbook",
    eyebrow: "Schwab API",
    title: "Schwab API Token Refresh Runbook | OAuth Expiry, Reauthorization and Logs",
    description: "Schwab API token refresh runbook for OAuth ownership, expiry alerts, refresh failures, reauthorization, credential storage, order pause behavior and handover.",
    h1: "Schwab API Token Refresh Runbook",
    intro: "Schwab API automation needs an OAuth lifecycle that the account owner can operate after delivery. Token refresh, expiry alerts, revoked authorization and reauthorization steps should be documented before order or account workflows depend on them.",
    summary: "A Schwab API token refresh runbook should document OAuth ownership, token storage, expiry alerts, refresh failure handling, reauthorization, pause behavior and credential rotation.",
    related: [
      ["Schwab broker API integration", "/broker-api/schwab/"],
      ["Schwab Trader API OAuth automation checklist", "/articles/schwab-trader-api-oauth-automation-checklist/"],
      ["Trading bot API key permission safety", "/articles/trading-bot-api-key-permission-safety/"]
    ],
    sections: [
      {
        title: "Assign OAuth ownership",
        body: "The runbook should state who owns the developer app, redirect URI, consent flow, token store and reauthorization path. Without an owner, a token failure becomes an urgent production mystery instead of a normal operating event.",
        bullets: ["Document app owner and account owner separately.", "Keep authorization codes, access tokens and refresh tokens out of logs.", "Use clear environment variable names without exposing secret values."]
      },
      {
        title: "Fail closed on auth problems",
        body: "When refresh fails, authorization is revoked or token state is ambiguous, the automation should stop new API actions and notify the operator. Retrying blindly can hide a permission issue and create confusing account state.",
        bullets: ["Classify refresh_failed, revoked_authorization and scope_missing separately.", "Pause order routing before trying higher-risk actions.", "Show the operator the reconnect path and evidence needed for support."]
      },
      {
        title: "Test the lifecycle before handover",
        body: "Acceptance should include a normal refresh, simulated expired token, revoked authorization, missing scope and successful reauthorization. The client should know how to recover the integration without developer-only knowledge.",
        bullets: ["Record the expected healthy auth status.", "Add alert recipients and escalation timing.", "Include revoke and rotate steps in the handover notes."]
      }
    ],
    checklistTitle: "Schwab OAuth runbook checklist",
    checklist: [
      "Developer app owner, redirect URI, scopes and account owner are documented.",
      "Token storage, refresh timing and secret redaction rules are written down.",
      "Refresh failure, revoked authorization and missing scope cases fail closed.",
      "Operator alerts and reauthorization steps are tested.",
      "The handover includes revoke, rotate, restart and support evidence notes."
    ],
    references: [
      officialReferenceLinks[2],
      ["API key permission notes", `${engineeringNotesUrl}/blob/master/docs/api-key-permissions.md`, "SignalCraft Labs public notes for minimum API key permissions."],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/fix-api-certificate-network-allowlist-checklist",
    lang: "en",
    breadcrumb: "FIX Certificate and Allowlist Checklist",
    eyebrow: "FIX API",
    title: "FIX API Certificate and Network Allowlist Checklist | UAT Readiness",
    description: "FIX API certificate and network allowlist checklist for UAT readiness, covering certificate ownership, source IPs, session IDs, ports, firewall rules, logs and handover.",
    h1: "FIX API Certificate and Network Allowlist Checklist",
    intro: "FIX API onboarding often stalls before the first order message because certificates, source IPs, ports, session identifiers and counterparty allowlists are not ready. These operational inputs should be collected before implementation is treated as blocked by code.",
    summary: "A FIX API certificate and network allowlist checklist should confirm certificate ownership, source IPs, ports, SenderCompID, TargetCompID, firewall rules, UAT evidence and support handover.",
    related: [
      ["FIX API order routing", "/fix-api-order-routing/"],
      ["FIX API UAT checklist", "/articles/fix-api-uat-checklist-before-production/"],
      ["Execution report audit log design", "/articles/fix-api-execution-report-audit-log-design/"]
    ],
    sections: [
      {
        title: "Collect connectivity facts early",
        body: "Before building message handlers, the project should confirm the counterparty environment, hostnames, ports, source IPs, TLS or certificate requirements and session identifiers. These details often have lead times outside the developer's control.",
        bullets: ["List UAT and production endpoints separately.", "Document SenderCompID, TargetCompID and any certificate common-name requirements.", "Confirm whether static IP, VPN or private network access is required."]
      },
      {
        title: "Separate secret material from public logs",
        body: "Certificates, private keys and firewall rules need careful handover. The runbook can name file paths, owners and rotation steps without exposing private material in tickets, screenshots or public repositories.",
        bullets: ["Store private keys only in approved secret locations.", "Log certificate expiry and connection errors without dumping secrets.", "Record who can request allowlist changes."]
      },
      {
        title: "Use connectivity as a UAT gate",
        body: "A FIX integration is not ready for order UAT until Logon, Heartbeat, TestRequest, disconnect and reconnect behavior are proven from the approved network path. Connectivity evidence should be part of the acceptance package.",
        bullets: ["Capture successful Logon and Heartbeat evidence.", "Classify network errors separately from FIX session rejects.", "Keep rollback notes for certificate or IP changes."]
      }
    ],
    checklistTitle: "FIX connectivity readiness checklist",
    checklist: [
      "UAT and production endpoints, ports and network paths are documented.",
      "Source IPs, allowlist owner and firewall change process are confirmed.",
      "Certificate ownership, expiry, storage and rotation steps are written down.",
      "SenderCompID, TargetCompID and session settings match counterparty records.",
      "Logon, Heartbeat, disconnect and reconnect evidence is included in UAT handover."
    ],
    references: [
      officialReferenceLinks[4],
      ["FIX platform notes", `${engineeringNotesUrl}/blob/master/docs/platform-notes.md`, "SignalCraft Labs public notes for platform integration evaluation."],
      ["Acceptance checklist notes", `${engineeringNotesUrl}/blob/master/docs/acceptance-checklist.md`, "SignalCraft Labs public acceptance checklist for automated trading delivery."]
    ]
  },
  {
    slug: "articles/hyperliquid-api-order-reconciliation-websocket-checklist",
    lang: "en",
    breadcrumb: "Hyperliquid API Reliability Checklist",
    eyebrow: "Hyperliquid API",
    title: "Hyperliquid API Order Reconciliation and WebSocket Checklist",
    description: "A Hyperliquid API reliability checklist for cloid idempotency, nonce ownership, WebSocket reconnects, snapshots, fills, positions, subaccounts and operator alerts.",
    h1: "Hyperliquid API Order Reconciliation and WebSocket Checklist",
    datePublished: hyperliquidCheckedDate,
    dateModified: hyperliquidCheckedDate,
    intro: "A successful order response is not a complete trading system. A production-minded Hyperliquid workflow must connect order intent, cloid, exchange status, fills, positions, WebSocket snapshots and query-based recovery so a restart or disconnect does not create duplicate or unexplained exposure.",
    summary: "Hyperliquid API reliability requires deterministic cloid values, one nonce owner, normalized order states, WebSocket snapshot recovery, info-endpoint backfill, position reconciliation, alerts and fail-closed restart rules.",
    related: [
      ["Custom Hyperliquid trading bot development", "/hyperliquid-api-trading-bot-development/"],
      ["TradingView to Hyperliquid automation", "/tradingview-to-hyperliquid-automation/"],
      ["Hyperliquid systems for trading teams", "/hyperliquid-trading-system-for-teams/"],
      ["Hyperliquid fee calculator", "/tools/hyperliquid-fee-calculator/"],
      ["Trading bot API key permission safety", "/articles/trading-bot-api-key-permission-safety/"]
    ],
    sections: [
      {
        title: "Give every order intent a deterministic cloid",
        body: "Hyperliquid supports an optional 128-bit client order ID. Generate it from a durable order intent, persist it before submission and keep the mapping to exchange order ID, account role, asset, side and requested size. A retry should look up the existing intent before signing another order.",
        bullets: ["Persist the intent and cloid before the network call.", "Keep one canonical mapping between intent, cloid and exchange order ID.", "Treat duplicate intent as an audit result, not a fresh order request."]
      },
      {
        title: "Normalize resting, filled, rejected and canceled states",
        body: "The exchange endpoint can return different status shapes, while later fills and cancels arrive through queries or streams. Convert them into one internal state machine and preserve the original response so operators can distinguish an internal risk reject from an exchange response.",
        bullets: ["Model submitted, resting, partially_filled, filled, canceled and rejected states.", "Reconcile open orders, historical orders and fills after restart.", "Do not infer a position only from the last local order status."]
      },
      {
        title: "Recover WebSocket state before routing resumes",
        body: "Hyperliquid documents that API servers can disconnect periodically and that reconnect acknowledgements contain snapshots. The runtime should detect the gap, reconnect, process the snapshot and use the info endpoint to recover any required order, fill or position state before accepting new intents.",
        bullets: ["Record the last healthy message time and reconnect attempt.", "Make snapshot handling idempotent.", "Keep new routing paused until reconciliation finishes or an operator intervenes."]
      },
      {
        title: "Assign one nonce owner per signing path",
        body: "Nonces should be controlled by a single durable signing path for each authorized wallet context. Multiple unsynchronized processes can create stale or conflicting actions, so ownership, restart behavior and emergency invalidation need explicit runbook steps.",
        bullets: ["Avoid multiple writers sharing the same signing identity without coordination.", "Log nonce, action type and signer role without logging private material.", "Fail closed when nonce state is ambiguous."]
      },
      {
        title: "Separate account roles and reconciliation scopes",
        body: "Main wallets, API/agent wallets, subaccounts and vaults do not share the same control and state boundaries. The implementation should document who signs each action and reconcile balances, orders and positions inside the correct account or vault scope.",
        bullets: ["Keep main-wallet private keys outside the bot runtime.", "Record the intended subaccount or vault address on every action.", "Test revocation, pause and handoff procedures before live permission is considered."]
      }
    ],
    checklistTitle: "Hyperliquid production-readiness checks",
    checklist: [
      "Submitting the same durable intent twice does not create a second order.",
      "Resting, partial fill, fill, cancel and reject responses map to reviewable internal states.",
      "A forced WebSocket disconnect recovers snapshot and missed state before routing resumes.",
      "Restart reconciliation compares open orders, historical orders, fills and positions.",
      "Nonce ownership, API/agent-wallet scope, subaccount or vault context and emergency pause are documented.",
      "Rate limits, stale state, signing failure and unresolved mismatches produce alerts and fail closed."
    ],
    references: hyperliquidReferenceLinks
  }
];

const aboutPage = {
  slug: "about",
  breadcrumb: "关于",
  eyebrow: "About SignalCraft Labs",
  title: "关于 SignalCraft Labs | 交易自动化数字产品与定制工程服务工作室",
  description: "SignalCraft Labs 是交易自动化数字产品与定制工程服务工作室，提供 Webhook 执行包、API 集成评估、券商/交易所 API、风控监控和私有化部署服务。",
  h1: "关于 SignalCraft Labs",
  intro: "SignalCraft Labs 专注交易自动化方向的数字产品和定制工程交付。我们服务已有规则但缺少工程实现的交易者、研究团队和小型技术团队，通过远程方式完成评估、原型验证、开发、部署和交付讲解。",
  facts: [
    ["服务方式", "远程需求评估、数字产品化交付包、远程开发、私有化部署、源码和文档交付。"],
    ["技术方向", "TradingView Webhook、券商 API、交易所 API、FIX、风控引擎、日志审计、监控告警和部署蓝图。"],
    ["常见技术栈", "Python、Node.js、REST/WebSocket、FIX、SQLite/PostgreSQL、Docker、VPS、Cloudflare、Telegram/Email 告警。"],
    ["交付样例", "源码仓库、环境变量样例、部署文档、运行日志、告警截图说明、灰度测试清单和远程交付讲解。"],
    ["验收方式", "按功能清单、接口路径、测试环境、日志、告警、文档和灰度流程验收，不按交易收益验收。"],
    ["公开工程资料", "GitHub 上提供脱敏 Webhook 去重/风控 dry-run demo、平台接入笔记、API 权限安全建议和验收清单。"],
    ["站外实体信号", "GitHub、LinkedIn、官网和公开工程资料使用一致的 SignalCraft Labs 品牌、服务边界和联系方式。"],
    ["服务地区", "香港、新加坡、台湾、美国及其他可远程协作地区。"],
    ["服务边界", "不代管资金，不提供投资建议，不承诺交易收益，不声称第三方平台官方合作。"]
  ]
};

const contactPage = {
  slug: "contact",
  breadcrumb: "项目 Brief",
  eyebrow: "Project Brief",
  title: "提交项目 Brief | SignalCraft Labs 交付包评估",
  description: "提交项目 Brief，让 SignalCraft Labs 评估交易自动化数字产品、API 集成、Webhook 执行、风控监控和私有化部署交付包。",
  h1: "项目 Brief 交付包评估",
  intro: "请把信号来源、API 平台、权限状态、交易规则、风控边界、部署要求和预算档位整理成一个 Brief。资料越具体，越容易判断先做数字产品、API 可行性评估，还是进入定制工程交付包。",
  checklist: [
    "信号来源：TradingView Alert、研究脚本、人工确认还是组合规则。",
    "接口平台：券商 API、交易所 API、FIX、REST/WebSocket 或内部系统。",
    "交易规则：入场、出场、仓位、止损止盈、撤单和异常处理。",
    "部署要求：客户服务器、VPS、Docker、日志、告警、后台或权限系统。",
    "目标交付包：API Starter、Execution System 或 Private Infrastructure。",
    "预算档位：2000 / 5000 / 10000 美金起，或说明还在评估阶段。"
  ],
  briefTemplate: [
    "项目目标：",
    "信号来源：",
    "API 平台和权限状态：",
    "交易品种、订单类型和仓位规则：",
    "风控边界：",
    "部署环境：",
    "是否需要后台、告警、源码交付或私有部署：",
    "目标交付包和预算档位：",
    "期望时间线："
  ].join("\n"),
  packageHints: [
    ["API Starter Package", "适合单一信号源、单一 API、基础风控、日志和测试环境执行链路。"],
    ["Execution System Package", "适合多规则、多品种、订单路由、风控引擎、监控日志和异常告警。"],
    ["Private Infrastructure Package", "适合多接口、多账户、后台、权限、审计日志、私有化部署和运维交接。"]
  ],
  facts: [
    ["回复时间", "资料完整时通常 1 个工作日内回复初步适配判断。"],
    ["先判断什么", "先判断接口权限、规则完整度、交付包范围、验收方式和明显不可做项。"],
    ["服务地区", "香港、新加坡、台湾、美国及其他可远程协作地区。"],
    ["不要发送", "不要发送提现权限、账户主密码、资金托管权限、完整 API Secret 或无关个人资料。"]
  ]
};

const cryptoReportingPage = {
  slug: "crypto-asset-reporting",
  breadcrumb: "Crypto Asset Reporting",
  eyebrow: "Private Crypto Asset Reporting",
  title: "Crypto Asset Reporting | 私有加密资产记录整理与月度报告工作流",
  description: "为高净值加密资产持有人、顾问和家族办公室式运营方整理交易所、钱包、DeFi、OTC 和衍生品记录，建立私有月度报告、对账和风险复核工作流。",
  h1: "Crypto Asset Reporting and Reconciliation Workflows",
  intro: "把分散在交易所、钱包、DeFi、OTC 和衍生品账户里的加密资产记录，整理成可复核、可交接、可月度运行的私有报告工作流。",
  facts: [
    ["适合对象", "高净值加密资产持有人、私人客户顾问、家族办公室式运营团队，以及需要整理多账户记录的数字资产运营负责人。"],
    ["输入资料", "交易所导出、钱包地址、DeFi 记录、OTC 台账、衍生品成交/资金费记录、人工表格和只读访问边界。"],
    ["交付内容", "资产和场所可见性表、缺口清单、异常复核队列、月度对账流程、报告模板、数据访问说明和交接 runbook。"],
    ["工作边界", "不提供投资建议、税务建议、法律建议、资金托管、交易授权、代客操作、Token 推荐或收益承诺。"],
    ["启动方式", "先做付费诊断：梳理当前数据源、报告使用者、人工流程、访问权限边界，以及 1-2 周 reporting sprint 是否值得做。"]
  ],
  checklist: [
    "当前使用哪些交易所、钱包、DeFi 协议、OTC 渠道和衍生品账户。",
    "已有导出文件、API 只读权限、地址列表或人工记录的可用程度。",
    "报告面向谁：本人、顾问、家庭办公室、会计、合规或内部运营人员。",
    "需要月度净资产、场所暴露、异常交易、稳定币流动、资金费或对账缺口中的哪些视图。",
    "哪些数据不能共享、只能远程查看，或必须由客户本地保管。"
  ]
};

const riskDisclaimerPage = {
  slug: "risk-disclaimer",
  breadcrumb: "风险免责声明",
  eyebrow: "Risk Disclaimer",
  title: "自动交易系统风险免责声明 | 非投资建议、非资金托管、非收益承诺",
  description: "自动交易系统风险免责声明，说明本服务仅为技术开发，不构成投资建议、不代管资金、不承诺收益、胜率或回撤。",
  h1: "自动交易系统风险免责声明",
  intro: "自动交易系统只能把既定规则更一致地执行出来，不能让策略结果变得确定。客户应自行判断策略、资金、账户权限、地区合规和第三方平台规则。",
  points: [
    ["非投资建议", "网站和沟通内容只用于说明技术开发服务，不构成投资建议、交易建议、荐股、喊单或财务建议。"],
    ["非收益承诺", "任何系统、风控、Webhook 或 API 集成都不承诺盈利、胜率、回撤、滑点或成交质量。"],
    ["非资金托管", "我们不代管资金，不要求提现权限，不替客户保管交易账户或 API Key。"],
    ["第三方平台限制", "TradingView、券商、交易所、FIX 接入方和云服务能力以其官方说明、账户权限和地区限制为准。"],
    ["客户责任", "客户应先在测试环境、模拟盘或小资金灰度环境中验证执行链路，并自行承担交易风险。"]
  ]
};

const exchangeFeeToolPage = {
  slug: "tools/crypto-exchange-fee-calculator",
  breadcrumb: "Crypto Exchange Fee Calculator",
  eyebrow: "Fee Intelligence · Updated July 15, 2026",
  title: "Crypto Exchange Fee Calculator | Compare Futures VIP Fees",
  description: "Compare Binance, OKX, Bybit, Bitget, MEXC and Gate perpetual futures fees. Estimate VIP tier, blended fee, monthly cost and the gap to the next tier.",
  h1: "Crypto Exchange VIP Fee Calculator",
  intro: "Turn public VIP schedules into a cost estimate for your actual maker/taker mix. Compare six major exchanges, see the next tier gap, and inspect every source behind the result.",
  lang: "en"
};

const exchangeFeeToolPageZh = {
  slug: "zh/tools/crypto-exchange-fee-calculator",
  breadcrumb: "交易所 VIP 费率计算器",
  eyebrow: "费率情报 · 2026 年 7 月 15 日更新",
  title: "加密货币交易所手续费对比 | VIP 合约费率计算器",
  description: "对比 Binance、OKX、Bybit、Bitget、MEXC 和 Gate 的合约手续费，估算 VIP 等级、Maker/Taker 混合费率、月成本及下一等级差距。",
  h1: "主流交易所 VIP 手续费计算器",
  intro: "根据你的月成交量、Maker 占比和资产余额，把公开 VIP 费率表转换为真实成本估算。一次比较六家主流交易所，并查看每项结果的官方来源。",
  lang: "zh-CN"
};

const hyperliquidFeeToolPage = {
  slug: "tools/hyperliquid-fee-calculator",
  counterpartSlug: "zh/tools/hyperliquid-fee-calculator",
  breadcrumb: "Hyperliquid Fee Calculator",
  eyebrow: "Hyperliquid fee intelligence · Checked July 19, 2026",
  title: "Hyperliquid Fee Calculator | VIP, Staking and Maker Rebates",
  description: "Calculate Hyperliquid perp and spot fees from 14-day weighted volume, maker/taker mix, staking discount and published maker rebate tiers.",
  h1: "Hyperliquid Fee Calculator",
  intro: "Model the official 14-day VIP schedule for standard perps and spot. See your weighted volume, effective maker/taker rates, staking discount, estimated execution cost and gap to the next tier without connecting a wallet.",
  lang: "en"
};

const hyperliquidFeeToolPageZh = {
  slug: "zh/tools/hyperliquid-fee-calculator",
  counterpartSlug: "tools/hyperliquid-fee-calculator",
  breadcrumb: "Hyperliquid 手续费计算器",
  eyebrow: "Hyperliquid 费率情报 · 2026 年 7 月 19 日核验",
  title: "Hyperliquid 手续费计算器 | VIP、质押折扣与 Maker Rebate",
  description: "根据 14 天加权成交量、Maker/Taker 比例、HYPE 质押折扣和公开 Maker Rebate 等级估算 Hyperliquid 永续与现货手续费。",
  h1: "Hyperliquid 手续费计算器",
  intro: "按照官方 14 天 VIP 规则估算标准永续与现货手续费，查看加权成交量、有效 Maker/Taker 费率、质押折扣、预计执行成本和下一等级差距；无需连接钱包。",
  lang: "zh-CN"
};

const exchangeFeeComparisonPages = [
  {
    slug: "compare/binance-vs-okx-futures-fees",
    counterpartSlug: "zh/compare/binance-vs-okx-futures-fees",
    breadcrumb: "Binance vs OKX Futures Fees",
    eyebrow: "Exchange fee comparison · Checked July 17, 2026",
    title: "Binance vs OKX Futures Fees: $1M to $100M Comparison",
    description: "Compare Binance and OKX USDT futures maker/taker fees at $1M, $10M and $100M monthly volume, with VIP paths, API limits and official sources.",
    h1: "Binance vs OKX Futures Fees",
    intro: "A source-bounded comparison of public USDT futures execution fees. OKX publishes a complete VIP ladder; Binance's public page did not expose a complete unauthenticated ladder during this review, so its verified base rate stays a reference rather than a VIP estimate.",
    lang: "en",
    exchangeA: "binance",
    exchangeB: "okx"
  },
  {
    slug: "zh/compare/binance-vs-okx-futures-fees",
    counterpartSlug: "compare/binance-vs-okx-futures-fees",
    breadcrumb: "币安与 OKX 合约手续费对比",
    eyebrow: "交易所手续费对比 · 2026 年 7 月 17 日复核",
    title: "币安与 OKX 合约手续费对比：100 万至 1 亿美元场景",
    description: "对比 Binance 与 OKX 在月成交量 100 万、1000 万和 1 亿美元时的合约 Maker/Taker 费率、VIP 路径、API 限制和官方来源。",
    h1: "币安与 OKX 合约手续费对比",
    intro: "只对比官方资料能够支持的 USDT 合约执行费率。OKX 提供完整 VIP 阶梯；本次复核时 Binance 公共页面未向未登录访问者展示完整阶梯，因此其已核验基础费率仅作为参考，不推算 VIP 费率。",
    lang: "zh-CN",
    exchangeA: "binance",
    exchangeB: "okx"
  }
];

const allGeneratedPages = [
  ...servicePages,
  faqPage,
  caseStudiesPage,
  articlesIndexPage,
  ...articlePages,
  aboutPage,
  contactPage,
  cryptoReportingPage,
  riskDisclaimerPage,
  exchangeFeeToolPage,
  exchangeFeeToolPageZh,
  hyperliquidFeeToolPage,
  hyperliquidFeeToolPageZh,
  ...exchangeFeeComparisonPages
];

const navLinks = [
  ["/#products", "数字产品"],
  ["/#services", "定制工程"],
  ["/broker/api/", "券商 API"],
  ["/#packages", "交付包"],
  ["/articles/", "资料"],
  ["/zh/tools/crypto-exchange-fee-calculator/", "费率工具"],
  ["/about/", "关于"],
  ["/contact/", "联系"]
];

const footerServiceLinks = [
  ["/zh/tools/hyperliquid-fee-calculator/", "Hyperliquid 手续费计算器"],
  ["/zh/tools/crypto-exchange-fee-calculator/", "交易所 VIP 费率计算器"],
  ["/crypto-asset-reporting/", "Crypto Asset Reporting"],
  ["/custom-trading-software-development/", "Custom Trading Software"],
  ["/tradingview-webhook-automation/", "TradingView Webhook"],
  ["/exchange-api-trading-bot-development/", "交易所 API"],
  ["/broker/api/", "券商 API"],
  ["/broker-api/ibkr/", "IBKR API"],
  ["/broker-api/schwab/", "Schwab API"],
  ["/broker-api/alpaca/", "Alpaca API"],
  ["/fix-api-order-routing/", "FIX API"],
  ["/tradingview-webhook-developer/", "TradingView Developer"],
  ["/ibkr-api-automation-developer/", "IBKR Developer"],
  ["/fix-api-order-routing-developer/", "FIX Developer"],
  ["/risk-engine/", "风控引擎"],
  ["/private-deployment/", "私有部署"],
  ["/articles/", "技术文章"],
  ["/faq/", "FAQ"],
  ["/case-studies/", "案例"],
  ["/about/", "关于"],
  ["/contact/", "联系"]
];

const navLinksEn = [
  ["/#products", "Products"],
  ["/#services", "Custom Engineering"],
  ["/broker/api/", "Broker API"],
  ["/#packages", "Packages"],
  ["/articles/", "Articles"],
  ["/tools/crypto-exchange-fee-calculator/", "Fee tool"],
  ["/about/", "About"],
  ["/contact/", "Contact"]
];

const footerServiceLinksEn = [
  ["/tools/hyperliquid-fee-calculator/", "Hyperliquid fee calculator"],
  ["/hyperliquid-api-trading-bot-development/", "Custom Hyperliquid trading bot"],
  ["/tradingview-to-hyperliquid-automation/", "TradingView to Hyperliquid"],
  ["/hyperliquid-trading-system-for-teams/", "Hyperliquid systems for teams"],
  ["/tools/crypto-exchange-fee-calculator/", "Crypto exchange fee calculator"],
  ["/crypto-asset-reporting/", "Crypto Asset Reporting"],
  ["/custom-trading-software-development/", "Custom Trading Software Development"],
  ["/tradingview-webhook-developer/", "TradingView Webhook Developer"],
  ["/ibkr-api-automation-developer/", "IBKR API Automation Developer"],
  ["/fix-api-order-routing-developer/", "FIX API Order Routing Developer"],
  ["/tradingview-webhook-automation/", "TradingView Webhook"],
  ["/broker/api/", "Broker API"],
  ["/broker-api/ibkr/", "IBKR API"],
  ["/fix-api-order-routing/", "FIX API"],
  ["/risk-engine/", "Risk engine"],
  ["/private-deployment/", "Private deployment"],
  ["/articles/", "Articles"],
  ["/case-studies/", "Case studies"],
  ["/contact/", "Contact"]
];

const policyLinks = [
  ["/terms", "服务条款"],
  ["/risk-disclaimer/", "风险免责声明"],
  ["/disclaimer", "免责声明"],
  ["/delivery-policy", "交付边界"],
  ["/privacy", "隐私政策"]
];

const policyLinksEn = [
  ["/terms", "Terms"],
  ["/risk-disclaimer/", "Risk disclaimer"],
  ["/disclaimer", "Disclaimer"],
  ["/delivery-policy", "Delivery policy"],
  ["/privacy", "Privacy"]
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isEnglish(value) {
  return (typeof value === "string" ? value : value?.lang) === "en";
}

function leadText(value) {
  const [lead] = String(value).split(/[，。、.:]/);
  return lead.trim() || String(value);
}

function pagePath(slug) {
  return join(publicDir, slug, "index.html");
}

function canonical(slug) {
  return `${site}/${slug}/`;
}

function routeForSlug(slug) {
  return `/${slug}/`;
}

function serviceManifest() {
  return {
    site,
    generatedAt: today,
    generatedServiceRoutes: servicePages.map((page) => routeForSlug(page.slug)),
    buyerIntentServiceRoutes: servicePages
      .filter((page) => page.buyerIntentVersion === 1)
      .map((page) => routeForSlug(page.slug)),
    coreServiceUrls: [
      { label: "Crypto Asset Reporting", url: canonical(cryptoReportingPage.slug), summary: cryptoReportingPage.description },
      ...servicePages.slice(0, 2).map((page) => ({ label: page.llmsLabel, url: canonical(page.slug), summary: page.description })),
      { label: "Broker API automation", url: `${site}/broker/api/`, summary: "Broker API automation overview for IBKR, Schwab, Alpaca, FIX, REST, WebSocket order execution, risk checks, logs, and private deployment." },
      ...servicePages.slice(2).map((page) => ({ label: page.llmsLabel, url: canonical(page.slug), summary: page.description }))
    ],
    externalTrustLinks: externalTrustLinks.map(([label, url, summary]) => ({ label, url, summary })),
    articleUrls: articlePages.map((page) => ({ label: page.h1, url: canonical(page.slug), summary: page.summary }))
  };
}

function writePublicFile(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${content.trim()}\n`, "utf8");
}

function header(activeLabel = "", language = "zh-CN") {
  const english = isEnglish(language);
  const links = english ? navLinksEn : navLinks;
  return `<header class="site-header">
    <a class="brand" href="/" aria-label="${english ? "SignalCraft Labs home" : "SignalCraft Labs 首页"}">
      <span class="brand-mark" aria-hidden="true">S</span>
      <span>SignalCraft Labs</span>
    </a>
    <nav class="nav" aria-label="${english ? "Main navigation" : "主导航"}">
      ${links.map(([href, label]) => `<a${label === activeLabel ? ' aria-current="page"' : ""} href="${href}">${label}</a>`).join("\n      ")}
      <a class="nav-cta" href="/contact/" data-contact="nav_contact">${english ? "Send brief" : "提交 Brief"}</a>
    </nav>
  </header>`;
}

function footer(language = "zh-CN") {
  const english = isEnglish(language);
  const serviceLinks = english ? footerServiceLinksEn : footerServiceLinks;
  const footerPolicyLinks = english ? policyLinksEn : policyLinks;
  return `<footer class="site-footer">
    <p><strong>SignalCraft Labs</strong> ${english ? "trading automation digital products and custom engineering studio" : "交易自动化数字产品与定制工程服务工作室"}</p>
    <nav aria-label="${english ? "Service page navigation" : "服务页导航"}">
      ${serviceLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
    </nav>
    <nav aria-label="${english ? "Policy page navigation" : "政策页导航"}">
      ${footerPolicyLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
    </nav>
    <p>${english ? "Technical software development only. No investment advice, custody, managed accounts or return promises." : "仅提供技术开发服务，不构成投资建议，不代管资金，不承诺交易收益。"}</p>
  </footer>

  <div class="mobile-contact-bar" role="group" aria-label="${english ? "Mobile quick contact" : "移动端快捷联系"}">
    <a href="/contact/" data-contact="mobile_contact">${english ? "Brief" : "项目 Brief"}</a>
    <button type="button" data-copy="${contact.wechat}" data-contact="mobile_wechat_copy">${english ? "Copy WeChat" : "复制微信"}</button>
  </div>`;
}

function breadcrumbs(page) {
  return `<nav class="breadcrumb" aria-label="${isEnglish(page) ? "Breadcrumb" : "面包屑"}">
      <a href="/">${isEnglish(page) ? "Home" : "首页"}</a>
      <span aria-hidden="true">/</span>
      <span>${escapeHtml(page.breadcrumb)}</span>
    </nav>`;
}

function jsonLd(data) {
  return `<script type="application/ld+json">
${JSON.stringify(data, null, 2)}
  </script>`;
}

function baseGraph(page, type = "WebPage") {
  const url = canonical(page.slug);
  const language = page.lang || "zh-CN";
  const english = isEnglish(page);
  return [
    {
      "@type": "Organization",
      "@id": `${site}/#organization`,
      "name": "SignalCraft Labs",
      "url": site,
      "logo": `${site}/favicon.svg`,
      "email": contact.email,
      "sameAs": [contact.telegramUrl, githubProfileUrl, engineeringNotesUrl, linkedinProfileUrl],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": contact.email,
        "availableLanguage": ["zh-CN", "en"]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      "url": site,
      "name": "SignalCraft Labs",
      "publisher": { "@id": `${site}/#organization` },
      "inLanguage": language
    },
    {
      "@type": type,
      "@id": `${url}#webpage`,
      "url": url,
      "name": page.h1,
      "description": page.description,
      "isPartOf": { "@id": `${site}/#website` },
      "about": { "@id": `${site}/#organization` },
      "inLanguage": language
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": english ? "Home" : "首页", "item": `${site}/` },
        { "@type": "ListItem", "position": 2, "name": page.breadcrumb, "item": url }
      ]
    }
  ];
}

function serviceSchema(page) {
  const english = isEnglish(page);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "WebPage"),
      {
        "@type": "Service",
        "@id": `${canonical(page.slug)}#service`,
        "name": page.h1,
        "description": page.description,
        "serviceType": page.serviceType,
        "provider": { "@id": `${site}/#organization` },
        "areaServed": english ? ["United States", "Hong Kong", "Singapore", "Taiwan", "Worldwide remote delivery"] : ["香港", "新加坡", "台湾", "美国", "全球远程"],
        "offers": {
          "@type": "OfferCatalog",
          "name": english ? "Trading software engineering delivery packages" : "自动交易系统工程交付包",
          "itemListElement": offers.map((offer) => ({
            "@type": "Offer",
            "name": offer.name,
            "priceCurrency": "USD",
            "price": offer.price,
            "description": english ? packageDescriptionsEn[offer.name] : offer.description,
            "availability": "https://schema.org/InStock"
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical(page.slug)}#faq`,
        "mainEntity": page.faq.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      }
    ]
  };
}

function summaryRows(page) {
  if (isEnglish(page)) {
    return [
      ["What it is", `SignalCraft Labs provides ${page.serviceType}, turning customer-defined rules into a testable and auditable execution system.`],
      ["Who it fits", page.fit.join(" ")],
      ["Deliverables", page.deliverables.join(" ")],
      ["What we do not do", "No investment advice, signals, managed accounts, custody, withdrawal permission management or return promises."],
      ["Delivery packages", "API Starter, Execution System and Private Infrastructure packages; scope depends on API count, risk complexity, dashboard scope and deployment requirements."],
      ["Contact", `${contact.email} / WeChat ${contact.wechat} / Telegram ${contact.telegram}`]
    ];
  }

  return [
    ["是什么", `SignalCraft Labs 提供 ${page.serviceType}，把客户已有规则工程化为可测试、可审计的执行系统。`],
    ["服务对象", page.fit.join(" ")],
    ["交付物", page.deliverables.join(" ")],
    ["不做什么", "不提供投资建议、喊单、资金托管、提现权限管理或收益承诺。"],
    ["交付包", "API Starter、Execution System、Private Infrastructure 三档，按接口数量、风控复杂度、后台和部署范围评估。"],
    ["联系方式", `${contact.email} / 微信 ${contact.wechat} / Telegram ${contact.telegram}`]
  ];
}

function comparisonTable(title, intro, rows, columns = ["项目", "说明"]) {
  return `<article class="evidence-table">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(intro)}</p>
          <div class="data-table columns-${columns.length}" role="table" aria-label="${escapeHtml(title)}">
            <div class="table-row table-head" role="row">${columns.map((column) => `<span role="columnheader">${escapeHtml(column)}</span>`).join("")}</div>
            ${rows.map((row) => `<div class="table-row" role="row">${row.map((cell) => `<span role="cell">${escapeHtml(cell)}</span>`).join("")}</div>`).join("")}
          </div>
        </article>`;
}

function aiSummarySection(page) {
  const english = isEnglish(page);
  return `<section class="section ai-summary-section" aria-labelledby="ai-summary-title">
      <div class="section-head">
        <p class="eyebrow">Service Facts</p>
        <h2 id="ai-summary-title">${english ? "Service facts summary" : "服务事实摘要"}</h2>
        <p>${english ? "A concise project-assessment summary covering fit, deliverables, delivery package and exclusions." : "用项目评估语言快速说明服务对象、交付物、交付包和不做事项。"}</p>
      </div>
      <div class="summary-list">
        ${summaryRows(page).map(([label, value]) => `<div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join("")}
      </div>
    </section>`;
}

function buyerOutcomeSection(page) {
  if (!page.customerOutcomes) return "";
  const english = isEnglish(page);
  return `<section id="project-paths" class="section buyer-outcome-section" aria-labelledby="buyer-outcome-title">
      <div class="section-head centered">
        <p class="eyebrow">${english ? "Your Project, In Plain Language" : "用客户语言说明项目"}</p>
        <h2 id="buyer-outcome-title">${escapeHtml(page.outcomesTitle)}</h2>
        <p>${escapeHtml(page.outcomesIntro)}</p>
      </div>
      <div class="buyer-outcome-grid">
        ${page.customerOutcomes.map(([label, value], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(label)}</h3><p>${escapeHtml(value)}</p></article>`).join("")}
      </div>
${page.projectPaths ? `      <div class="buyer-path-grid">${page.projectPaths.map(([title, description, href, label]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><a href="${href}">${escapeHtml(label)} →</a></article>`).join("")}</div>` : ""}
    </section>`;
}

function contactHrefFor(page, packageName = "") {
  if (!page?.contactProject) return "/contact/";
  const values = [`project=${encodeURIComponent(page.contactProject)}`];
  if (packageName) values.push(`package=${encodeURIComponent(packageName)}`);
  return `/contact/?${values.join("&amp;")}`;
}

function buyerIntentSummarySection(page) {
  if (page.buyerIntentVersion !== 1 || page.purchaseSnapshot || page.customerOutcomes) return "";
  const english = isEnglish(page);
  return `<section class="section buyer-intent-summary" aria-labelledby="buyer-intent-summary-title">
      <div class="section-head centered">
        <p class="eyebrow">${english ? "Buyer Fit" : "客户匹配"}</p>
        <h2 id="buyer-intent-summary-title">${english ? "Who this is for and the problem it solves" : "适合谁，解决什么问题"}</h2>
      </div>
      <div class="answer-grid">
        <article><h3>${english ? "Best fit" : "精准客户"}</h3><p>${escapeHtml(page.buyerAudience)}</p></article>
        <article><h3>${english ? "Business problem" : "业务问题"}</h3><p>${escapeHtml(page.buyerProblem)}</p></article>
      </div>
    </section>`;
}

function buyerSnapshotSection(page) {
  if (!page.purchaseSnapshot) return "";
  const english = isEnglish(page);
  return `<section class="buyer-snapshot-section" aria-labelledby="buyer-snapshot-title">
      <div class="buyer-snapshot-shell">
        <div class="buyer-snapshot-head">
          <div><p class="eyebrow">${english ? "Project Planning Snapshot" : "项目规划摘要"}</p><h2 id="buyer-snapshot-title">${english ? "Can this project fit your budget and timeline?" : "预算和时间是否匹配？"}</h2></div>
          <a class="button primary" href="${contactHrefFor(page)}" data-contact="buyer_snapshot_estimate">${english ? "Request a scoped estimate" : "获取范围评估"}</a>
        </div>
        <dl class="buyer-snapshot-grid">
          ${page.purchaseSnapshot.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
        <p class="buyer-snapshot-note">${escapeHtml(page.purchaseNote)}</p>
      </div>
    </section>`;
}

function deliverableSamplesSection() {
  return `<section class="section deliverable-samples" aria-labelledby="deliverable-samples-title">
      <div class="section-head centered">
        <p class="eyebrow">Delivery Samples</p>
        <h2 id="deliverable-samples-title">匿名交付物样例</h2>
        <p>以下是脱敏示意，展示交付中常见的 payload、日志、runbook、权限边界和验收清单，不包含客户账户、策略参数或真实订单。</p>
      </div>
      <div class="sample-artifact-grid">
        <article class="sample-artifact payload-sample wide-artifact">
          <div class="sample-head"><span>Webhook payload 样例</span><em>masked payload</em></div>
          <pre class="payload-window" aria-label="脱敏 Webhook payload 样例"><code>{
  "event_id": "tv-demo-20260705-093104",
  "strategy": "mean-reversion-v3",
  "symbol": "BTCUSDT",
  "action": "reduce_only",
  "bar_time": "2026-07-05T01:30:00Z",
  "risk_profile": "starter",
  "secret": "masked"
}</code></pre>
        </article>
        <article class="sample-artifact flow-sample">
          <div class="sample-head"><span>Webhook 流程图样例</span><em>handoff diagram</em></div>
          <div class="flow-map" role="img" aria-label="Webhook 到风控和订单路由的流程样例">
            <span>TradingView Alert</span>
            <span>签名校验</span>
            <span>去重/冷却</span>
            <span>风控规则</span>
            <span>订单路由</span>
            <span>日志与告警</span>
          </div>
        </article>
        <article class="sample-artifact log-sample wide-artifact">
          <div class="sample-head"><span>风控拒单日志样例</span><em>risk log</em></div>
          <div class="log-window" role="img" aria-label="脱敏运行日志样例">
            <div><strong>09:31:04</strong><span>webhook.received</span><em>symbol=BTCUSDT action=reduce_only</em></div>
            <div><strong>09:31:04</strong><span>risk.checked</span><em>max_position ok, cooldown ok</em></div>
            <div><strong>09:31:05</strong><span>risk.rejected</span><em>reason=price_deviation_limit exceeded, order not sent</em></div>
            <div><strong>09:31:05</strong><span>alert.sent</span><em>telegram delivery confirmed, manual review requested</em></div>
          </div>
        </article>
        <article class="sample-artifact runbook-sample">
          <div class="sample-head"><span>部署 runbook 目录</span><em>handoff doc</em></div>
          <ol class="runbook-list">
            <li>环境变量和密钥最小权限检查</li>
            <li>启动、停止、重启和健康检查命令</li>
            <li>日志位置、告警渠道和异常分类</li>
            <li>回滚步骤、暂停开关和联系人边界</li>
          </ol>
        </article>
        <article class="sample-artifact permission-sample wide-artifact">
          <div class="sample-head"><span>API 权限边界表</span><em>permission scope</em></div>
          <div class="sample-table" role="table" aria-label="API 权限边界样例">
            <div role="row"><strong role="columnheader">权限</strong><span role="columnheader">建议</span><em role="columnheader">用途</em></div>
            <div role="row"><strong>读取持仓</strong><span>按项目需要开启</span><em>同步余额、持仓和订单状态</em></div>
            <div role="row"><strong>交易下单</strong><span>仅在执行包中开启</span><em>发送已通过风控的订单</em></div>
            <div role="row"><strong>提现/划转</strong><span>不需要</span><em>不进入软件交付范围</em></div>
          </div>
        </article>
        <article class="sample-artifact checklist-sample">
          <div class="sample-head"><span>上线验收清单样例</span><em>acceptance sheet</em></div>
          <ul class="sample-checklist">
            <li><span></span>源码、配置样例和部署文档已交付</li>
            <li><span></span>测试环境信号解析、拒单、下单链路已验证</li>
            <li><span></span>暂停开关、限频、最大仓位和只减仓规则已验证</li>
            <li><span></span>日志、告警、重启和回滚流程已讲解</li>
          </ul>
        </article>
      </div>
    </section>`;
}

function evidenceTablesSection(page) {
  const english = isEnglish(page);
  const packageRows = offers.map((offer) => [english ? offer.label.replace(" 美金起", " USD+") : offer.label, english ? packageDescriptionsEn[offer.name] : offer.description]);
  const detailSlug = page.platformDetailSlug || page.slug;
  const platformRows = english ? platformDetailRowsEn[detailSlug] : platformDetailRows[detailSlug];
  const shouldShowBrokerComparison = page.slug.startsWith("broker-api/") || page.slug.includes("ibkr-api") || page.slug.includes("fix-api");
  const tables = [
    platformRows ? comparisonTable(english ? "Platform integration details" : "平台接入细节", english ? "These facts often affect scope, acceptance tests and go-live timing." : "这些是该平台项目更容易影响交付包、验收和上线节奏的关键事实。", platformRows, english ? ["Topic", "Project focus", "Acceptance focus"] : ["主题", "项目要点", "验收关注"]) : null,
    shouldShowBrokerComparison ? comparisonTable("IBKR / Schwab / Alpaca / FIX API 对比", english ? "A quick comparison of broker/API workflow fit, integration focus and common constraints." : "用于快速区分不同券商/API 工作流的适合场景、接入重点和常见限制。", english ? brokerComparisonRowsEn : brokerComparisonRows, english ? ["Interface", "Best fit", "Integration focus", "Common limits"] : ["接口", "适合场景", "接入重点", "常见限制"]) : null,
    comparisonTable(english ? "Pre-contact checklist" : "联系前资料清单", english ? "Without these inputs, the work can only be directionally assessed." : "没有这些资料时，只能做方向评估，不能准确判断交付包或承诺接口可行性。", english ? baseInputRowsEn : baseInputRows, english ? ["Item", "Details"] : ["项目", "说明"]),
    comparisonTable(english ? "API key minimum permission guidance" : "API Key 最小权限建议", english ? "Use only the permissions required for the project and avoid withdrawal, transfer or unrelated admin access." : "默认只使用项目必要权限，避免提现、划转和无关管理员权限。", english ? permissionRowsEn : permissionRows, english ? ["Permission", "Recommendation", "Reason"] : ["权限", "建议", "原因"]),
    comparisonTable(english ? "Delivery package breakdown" : "交付包范围拆解", english ? "Package scope depends on API count, risk complexity, dashboard scope, deployment and integration work." : "交付包不是按页面文案报价，而是按接口、风控、后台、部署和联调复杂度确认范围。", packageRows, english ? ["Package tier", "Suitable scope"] : ["交付包", "适合范围"]),
    comparisonTable(english ? "Launch acceptance checklist" : "上线验收清单", english ? "Acceptance is based on engineering delivery and workflow behavior, not strategy returns." : "验收看工程交付和执行链路，不把策略收益、胜率或回撤作为软件验收标准。", english ? acceptanceRowsEn : acceptanceRows, english ? ["Item", "Details"] : ["项目", "说明"])
  ].filter(Boolean).join("\n        ");

  return `<section class="section evidence-section" aria-labelledby="evidence-title">
      <div class="section-head">
        <p class="eyebrow">Checklists & Tables</p>
        <h2 id="evidence-title">${english ? "Inputs, permissions, package and acceptance tables" : "资料、权限、交付包和验收表"}</h2>
        <p>${english ? "Formal projects turn these tables into a scoped requirements and acceptance checklist." : "正式项目会把这些表转成需求清单和验收清单，减少范围歧义。"}</p>
      </div>
      <div class="evidence-grid">
        ${tables}
      </div>
    </section>`;
}

function externalTrustSection(language = "zh-CN") {
  const english = isEnglish(language);
  const trustLinks = english ? externalTrustLinksEn : externalTrustLinks;
  return `<section class="section external-trust-section" aria-labelledby="external-trust-title">
      <div class="section-head">
        <p class="eyebrow">External Evidence</p>
        <h2 id="external-trust-title">${english ? "External trust materials" : "站外信任资料"}</h2>
        <p>${english ? "These public materials help verify the brand, service boundary, engineering delivery style and sanitized technical examples." : "这些公开资料用于交叉验证品牌、服务边界、工程交付方式和脱敏技术样例。"}</p>
      </div>
      <div class="external-trust-grid">
        ${trustLinks.map(([label, href, summary]) => `<a href="${href}" rel="me noopener" target="_blank"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(summary)}</span></a>`).join("")}
      </div>
    </section>`;
}

function referenceLinksList(references) {
  return `<div class="reference-list">
      ${references.map(([label, href, summary]) => `<a href="${href}" rel="noopener" target="_blank"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(summary)}</span></a>`).join("")}
    </div>`;
}

function articleCards(language = "zh-CN") {
  const english = isEnglish(language);
  const orderedArticles = [
    ...articlePages.filter((article) => isEnglish(article) === english),
    ...articlePages.filter((article) => isEnglish(article) !== english)
  ];
  return `<div class="article-card-grid">
      ${orderedArticles.map((article) => `<article>
        <p class="eyebrow">${escapeHtml(article.eyebrow)}</p>
        <h3>${escapeHtml(article.h1)}</h3>
        <p>${escapeHtml(article.summary)}</p>
        <a href="/${article.slug}/">${english ? "Read article" : "阅读文章"}</a>
      </article>`).join("")}
    </div>`;
}

function servicePageHtml(page) {
  const url = canonical(page.slug);
  const english = isEnglish(page);
  const activeLabel = page.slug.startsWith("broker-api/") ? "券商 API" : "";
  const pageStylesheetHref = page.customerOutcomes ? `${stylesheetHref}&scope=hyperliquid-buyers-20260719` : stylesheetHref;
  return `<!DOCTYPE html>
<html lang="${page.lang || "zh-CN"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(page.h1)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
${page.ogImage ? `  <meta property="og:image" content="${site}${page.ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${site}${page.ogImage}">` : ""}
  <meta name="theme-color" content="#07111f">
  <link rel="stylesheet" href="${pageStylesheetHref}">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs information">
  <script src="${scriptHref}" defer></script>
  ${jsonLd(serviceSchema(page))}
</head>
<body class="content-page">
  <a class="skip-link" href="#main-content">${english ? "Skip to main content" : "跳到主要内容"}</a>
  ${header(activeLabel, page.lang)}
  <main id="main-content"${page.buyerIntentVersion === 1 ? ' data-buyer-intent="v1"' : ""}>
    <section class="content-hero">
      ${breadcrumbs(page)}
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="hero-actions">
        <a class="button primary" href="${contactHrefFor(page)}" data-contact="content_hero_contact">${escapeHtml(page.heroPrimaryLabel || (english ? "Send project brief" : "提交项目 Brief"))}</a>
        <a class="button secondary" href="${page.heroSecondaryHref || "#deliverables"}">${escapeHtml(page.heroSecondaryLabel || (english ? "View deliverables" : "查看交付内容"))}</a>
      </div>
      <nav class="mobile-quick-links" aria-label="${english ? "Mobile quick links" : "移动端快速入口"}">
        <a href="#fit">${english ? "Fit" : "适合谁"}</a>
        <a href="#deliverables">${english ? "Deliverables" : "交付"}</a>
        <a href="#faq">FAQ</a>
        <a href="/contact/">${english ? "Contact" : "联系"}</a>
      </nav>
      <div class="fact-strip" aria-label="${english ? "Delivery packages and service boundaries" : "项目交付包和服务边界"}">
        <span>${english ? "Packages: USD 2,000 / 5,000 / 10,000+" : "交付包：2000 / 5000 / 10000 美金起"}</span>
        <span>${english ? "Source delivery" : "源码交付"}</span>
        <span>${english ? "Private deployment" : "私有部署"}</span>
        <span>${english ? "No custody" : "不代管资金"}</span>
      </div>
    </section>

${buyerIntentSummarySection(page)}${buyerSnapshotSection(page)}

${buyerOutcomeSection(page)}

    ${aiSummarySection(page)}

    <section id="fit" class="section answer-section">
      <div class="section-head centered">
        <p class="eyebrow">Fit Check</p>
        <h2>${english ? "Who this service fits, and who it does not fit" : "这个服务适合谁，不适合谁"}</h2>
        <p>${english ? "Start by checking whether the workflow is ready for technical assessment before expanding scope." : "先判断是否值得进入技术评估，避免把策略效果、平台限制或新增需求混进开发范围。"}</p>
      </div>
      <div class="answer-grid">
        <article>
          <h3>${english ? "Good fit" : "适合谁"}</h3>
          <ul class="check-list">${page.fit.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>${english ? "Not a fit" : "不适合谁"}</h3>
          <ul class="plain-list">${page.notFit.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      </div>
    </section>

    <section id="deliverables" class="section content-band">
      <div class="section-head">
        <p class="eyebrow">Deliverables</p>
        <h2>${english ? "Deliverables" : "交付内容清单"}</h2>
        <p>${english ? "A formal delivery package turns features, APIs, acceptance paths and handoff items into a clear scope." : "正式交付包会把功能、接口、验收路径和交付物写清楚。"}</p>
      </div>
      <div class="detail-grid">${page.deliverables.map((item) => `<article><h3>${escapeHtml(leadText(item))}</h3><p>${escapeHtml(item)}</p></article>`).join("")}</div>
    </section>

    <section class="section process-section">
      <div class="section-head centered">
        <p class="eyebrow">Process</p>
        <h2>${english ? "Development process" : "开发流程"}</h2>
      </div>
      <ol class="process-grid">${page.process.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(leadText(item))}</strong><em>${escapeHtml(item)}</em></li>`).join("")}</ol>
    </section>

    <section class="section budget-section">
      <div class="section-head centered dark">
        <p class="eyebrow">Delivery Packages</p>
        <h2>${english ? "Productized delivery packages" : "产品化交付包"}</h2>
        <p>${english ? "Package scope depends on API platform, risk complexity, dashboard scope, deployment requirements and integration work." : "交付包范围取决于接口平台、风控复杂度、是否需要后台、部署要求和联调周期。"}</p>
      </div>
      <div class="pricing-grid">${offers.map((offer) => `<article${offer.name === "Execution System Package" ? ' class="featured"' : ""}><h3>${offer.name}</h3><p>${escapeHtml(english ? packageDescriptionsEn[offer.name] : offer.description)}</p><strong class="price">${english ? offer.label.replace(" 美金起", " USD+") : offer.label}</strong><a class="button ${offer.name === "Execution System Package" ? "primary" : "secondary"}" href="${contactHrefFor(page, offer.name)}" data-contact="content_package_${offer.name.toLowerCase().replaceAll(" ", "_")}">${english ? "Assess this package" : "评估这个交付包"}</a></article>`).join("")}</div>
    </section>

    <section class="section risk-section">
      <div class="section-head">
        <p class="eyebrow">Risk Boundary</p>
        <h2>${english ? "Risk boundaries and platform limits" : "风险边界和平台限制"}</h2>
      </div>
      <div class="answer-grid">
        <article>
          <h3>${english ? "Risk boundary" : "风险边界"}</h3>
          <ul class="plain-list">${page.limits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>${english ? "Prepare before contact" : "联系前请准备"}</h3>
          <ul class="check-list">
            <li>${english ? "Platform, account permissions and API documentation or interface notes" : "平台、账户权限和 API 文档或接口说明"}</li>
            <li>${english ? "Signal source, instruments, order types and trading hours" : "信号来源、品种、订单类型和交易时段"}</li>
            <li>${english ? "Sizing, risk limits, pause rules, alerts and acceptance criteria" : "仓位、风控、暂停、告警和验收标准"}</li>
            <li>${english ? "Target delivery package and preferred deployment environment" : "目标交付包和期望部署环境"}</li>
          </ul>
        </article>
      </div>
    </section>

    ${evidenceTablesSection(page)}

${page.officialReferences ? `    <section class="section embedded-section">
      <div class="section-head">
        <p class="eyebrow">Official References</p>
        <h2>${english ? "Hyperliquid documentation used for this scope" : "本页使用的官方文档"}</h2>
        <p>${english ? "Current capabilities and implementation details are checked against the official API, WebSocket, account-state and fee references before project acceptance criteria are finalized." : "正式确定项目验收标准前，会依据官方 API、WebSocket、账户状态和费用文档复核当前能力。"}</p>
      </div>
      ${referenceLinksList(page.officialReferences)}
    </section>` : ""}

    ${caseBridgeSection(page.lang, page)}

    ${externalTrustSection(page.lang)}

    <section id="faq" class="section faq-section">
      <div class="section-head centered">
        <p class="eyebrow">FAQ</p>
        <h2>${english ? "Frequently asked questions" : "常见问题"}</h2>
      </div>
      <div class="faq-list">${page.faq.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join("")}</div>
    </section>

    <section class="section related-section">
      <div class="section-head">
        <p class="eyebrow">Related</p>
        <h2>${english ? "Related pages" : "相关服务页"}</h2>
      </div>
      <div class="policy-links">${page.related.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("")}<a href="/faq/">FAQ</a><a href="/case-studies/">${english ? "Case studies" : "匿名案例"}</a></div>
    </section>

    ${ctaBlock(page.lang, page)}
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

function ctaBlock(language = "zh-CN", page) {
  const english = isEnglish(language);
  return `<section class="contact content-cta" aria-labelledby="content-contact-title">
      <div class="contact-copy">
        <p class="eyebrow">Project Brief</p>
        <h2 id="content-contact-title">${english ? "Send the brief first, then we assess the right package" : "先发项目 Brief，再判断适合哪个交付包"}</h2>
        <p>${english ? "Share the signal source, API platform, account permissions, instruments, order types, sizing, risk rules and deployment target. A first feasibility reply usually follows within one business day when the brief is complete." : "请提供信号来源、接口平台、账户权限、交易品种、订单类型、仓位、风控规则和部署目标。资料完整时通常 1 个工作日内回复初步适配判断。"}</p>
        <div class="contact-row">
          <a href="mailto:${contact.email}" data-contact="content_email" data-lead-contact="true">${contact.email}</a>
          <button type="button" data-copy="${contact.wechat}" data-contact="content_wechat_copy">${english ? "Copy WeChat" : "复制微信"} ${contact.wechat}</button>
          <a href="${contact.telegramUrl}" data-contact="content_telegram" data-lead-contact="true">Telegram ${contact.telegram}</a>
        </div>
        <p class="copy-status" aria-live="polite"></p>
      </div>
      <div class="contact-card">
        <strong>${english ? "Assessment inputs" : "评估资料"}</strong>
        <ul>
          <li>${english ? "Signal and trading rules" : "信号和交易规则"}</li>
          <li>${english ? "API platform and permission status" : "API 平台和权限状态"}</li>
          <li>${english ? "Risk, alert and deployment requirements" : "风控、告警和部署要求"}</li>
          <li>${english ? "Target package and budget band" : "目标交付包和预算档位"}</li>
        </ul>
        <a class="button primary" href="${contactHrefFor(page)}" data-contact="content_structured_brief">${english ? "Send a structured brief" : "提交结构化 Brief"}</a>
      </div>
    </section>`;
}

function caseBridgeSection(language = "zh-CN", page) {
  const english = isEnglish(language);
  const cases = english ? [
    ["TradingView Webhook", "Signal intake, signature checks, idempotency, risk rules, order routing and alert handoff."],
    ["Broker API workflow", "Position sync, order plan generation, manual confirmation, execution reports and audit logs."],
    ["Private deployment", "Source delivery, environment files, process supervision, logs, alerts, runbook and handoff."]
  ] : [
    ["TradingView Webhook", "信号接收、签名校验、幂等去重、风控规则、订单路由和告警交接。"],
    ["券商 / 交易所 API", "持仓同步、订单计划、人工确认、执行回报、审计日志和异常处理。"],
    ["私有化部署", "源码交付、环境配置、进程守护、日志告警、部署 runbook 和远程交接。"]
  ];
  return `<section class="section case-bridge-section" aria-labelledby="case-bridge-title">
      <div class="section-head">
        <p class="eyebrow">Case Proof</p>
        <h2 id="case-bridge-title">${english ? "Match your brief to an anonymous case" : "把你的 Brief 对齐到一个匿名案例"}</h2>
        <p>${english ? "The case page shows problem, constraints, solution, deliverables, acceptance and exclusions. Use it to describe what your project resembles before requesting a package assessment." : "案例页已经按问题、约束、解决方案、交付物、验收方式和不包含事项拆解。提交 Brief 前，可以先说明你的项目更像哪一类案例。"}</p>
      </div>
      <div class="case-bridge-grid">
        ${cases.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}
      </div>
      <div class="case-bridge-actions">
        <a class="button primary" href="/case-studies/" data-contact="service_case_bridge">${english ? "View case studies" : "查看匿名案例"}</a>
        <a class="button secondary" href="${contactHrefFor(page)}" data-contact="service_case_brief">${english ? "Send a similar brief" : "按类似案例发 Brief"}</a>
      </div>
    </section>`;
}

function faqHtml(page) {
  const url = canonical(page.slug);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "FAQPage"),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": page.questions.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      }
    ]
  };
  return infoPageHtml(page, "FAQ", `<div class="faq-list wide-faq">${page.questions.map(([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`).join("")}</div>`, schema);
}

function casesHtml(page) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "CollectionPage"),
      ...page.studies.map((study, index) => ({
        "@type": "CreativeWork",
        "@id": `${canonical(page.slug)}#case-${index + 1}`,
        "name": study.title,
        "description": `${study.problem} ${study.constraints} ${study.solution} ${study.deliverables} ${study.acceptance} ${study.evidence} ${study.exclusions}`,
        "isPartOf": { "@id": `${canonical(page.slug)}#webpage` }
      }))
    ]
  };
  const body = `<div class="case-study-grid expanded-cases">${page.studies.map((study, index) => `<article id="case-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(study.title)}</h3><strong>问题</strong><p>${escapeHtml(study.problem)}</p><strong>约束</strong><p>${escapeHtml(study.constraints)}</p><strong>解决方案</strong><p>${escapeHtml(study.solution)}</p><strong>交付物</strong><p>${escapeHtml(study.deliverables)}</p><strong>验收方式</strong><p>${escapeHtml(study.acceptance)}</p><strong>可复核证据</strong><p class="case-evidence">${escapeHtml(study.evidence)}</p><strong>不包含什么</strong><p>${escapeHtml(study.exclusions)}</p><a class="case-link" href="/contact/" data-contact="case_study_${index + 1}">用这个案例发 Brief</a></article>`).join("")}</div>
    <section class="embedded-section">
      <h2>公开脱敏资料</h2>
      <p>案例只描述工程约束和交付方式；公开 GitHub 资料提供脱敏 demo、权限建议和验收清单，便于独立检查交付口径。</p>
      ${referenceLinksList([[externalTrustLinks[1][0], externalTrustLinks[1][1], externalTrustLinks[1][2]]])}
    </section>
    ${deliverableSamplesSection()}`;
  return infoPageHtml(page, "案例", body, schema);
}

function articlesIndexHtml(page) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "CollectionPage"),
      ...articlePages.map((article) => ({
        "@type": "TechArticle",
        "@id": `${canonical(article.slug)}#article`,
        "headline": article.h1,
        "description": article.description,
        "url": canonical(article.slug),
        "author": { "@id": `${site}/#organization` },
        "publisher": { "@id": `${site}/#organization` },
        "datePublished": article.datePublished || articleCatalogPublishedDate,
        "dateModified": article.dateModified || today,
        "inLanguage": article.lang || "zh-CN"
      }))
    ]
  };
  const body = `${articleCards(page.lang)}
    <section class="embedded-section">
      <h2>公开工程资料</h2>
      <p>文章中的实现建议会和 GitHub 脱敏资料仓库保持一致，便于客户在咨询前先判断交付方式是否符合自己的安全边界。</p>
      ${referenceLinksList(externalTrustLinks)}
    </section>`;
  return infoPageHtml(page, "技术资料", body, schema);
}

function articleHtml(page) {
  const language = page.lang || "zh-CN";
  const english = isEnglish(page);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "TechArticle"),
      {
        "@type": "TechArticle",
        "@id": `${canonical(page.slug)}#article`,
        "headline": page.h1,
        "description": page.description,
        "url": canonical(page.slug),
        "author": { "@id": `${site}/#organization` },
        "publisher": { "@id": `${site}/#organization` },
        "datePublished": page.datePublished || articleCatalogPublishedDate,
        "dateModified": page.dateModified || today,
        "inLanguage": language,
        "about": ["Trading API automation", "Webhook automation", "Risk controls", "Private deployment"]
      }
    ]
  };
  const body = `<article class="technical-article">
      <p class="article-summary">${escapeHtml(page.summary)}</p>
      ${page.sections.map((section) => `<section>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.body)}</p>
        <ul class="check-list">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>`).join("")}
      <section>
        <h2>${escapeHtml(page.checklistTitle)}</h2>
        <ul class="check-list">${page.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
${page.related ? `      <section>
        <h2>${english ? "Related implementation paths" : "相关实施路径"}</h2>
        <ul class="check-list">${page.related.map(([label, href]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul>
      </section>\n` : ""}      <section>
        <h2>${english ? "References" : "参考资料"}</h2>
        ${referenceLinksList(page.references)}
      </section>
      <section>
        <h2>${english ? "Related technical articles" : "相关技术文章"}</h2>
        ${articleCards(page.lang)}
      </section>
    </article>`;
  return infoPageHtml(page, "技术资料", body, schema);
}

function aboutHtml(page) {
  const schema = { "@context": "https://schema.org", "@graph": baseGraph(page, "AboutPage") };
  const body = `<div class="detail-grid">${page.facts.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>
    <section class="embedded-section">
      <h2>可验证的站外资料</h2>
      <p>这些链接用于验证 SignalCraft Labs 的公开工程资料、品牌实体和服务边界。</p>
      ${referenceLinksList(externalTrustLinks)}
    </section>
    <div class="answer-grid">
      <article><h3>我们更擅长</h3><ul class="check-list"><li>把已有交易规则工程化</li><li>把 API 工作流做成可测试系统</li><li>补齐风控、日志、告警和部署文档</li></ul></article>
      <article><h3>我们不提供</h3><ul class="plain-list"><li>投资建议、喊单、荐股或代客理财</li><li>资金托管或提现权限管理</li><li>第三方平台品牌复制或官方合作暗示</li></ul></article>
    </div>`;
  return infoPageHtml(page, "关于", body, schema);
}

function leadBriefForm() {
  return `<form class="brief-form" data-mailto-brief data-brief-endpoint="/api/brief" data-contact="structured_brief_submit">
      <label class="form-trap" aria-hidden="true">请勿填写此字段
        <input name="website" tabindex="-1" autocomplete="off">
      </label>
      <div class="form-grid">
        <label>项目类型
          <select name="projectType" data-brief-label="Project type" required>
            <option value="">请选择</option>
            <option>Custom trading software development</option>
            <option>Hyperliquid custom bot development</option>
            <option>TradingView to Hyperliquid automation</option>
            <option>Hyperliquid team execution system</option>
            <option>TradingView webhook automation</option>
            <option>Broker API integration</option>
            <option>Order execution API system</option>
            <option>Risk / monitoring dashboard</option>
            <option>Private deployment / handoff</option>
          </select>
        </label>
        <label>信号来源
          <input name="signalSource" data-brief-label="Signal source" required placeholder="TradingView Alert / 研究脚本 / 人工确认">
        </label>
        <label>API 平台和权限状态
          <input name="apiPlatform" data-brief-label="API platform" required placeholder="IBKR / Alpaca / FIX / 交易所 API">
        </label>
        <label>权限状态
          <select name="permissionStatus" data-brief-label="Permission status" required>
            <option value="">请选择</option>
            <option>已有测试环境或 paper 权限</option>
            <option>已有读取权限，交易权限待确认</option>
            <option>已有完整 API 文档，权限申请中</option>
            <option>还没有 API 权限</option>
          </select>
        </label>
        <label>预算档位
          <select name="budget" data-brief-label="Budget range" required>
            <option value="">请选择</option>
            <option>API Starter Package - 2000 美金起</option>
            <option>Execution System Package - 5000 美金起</option>
            <option>Private Infrastructure Package - 10000 美金起</option>
            <option>还在评估</option>
          </select>
        </label>
        <label>部署环境
          <select name="deploymentTarget" data-brief-label="Deployment target" required>
            <option value="">请选择</option>
            <option>客户 VPS / Docker</option>
            <option>客户本地服务器</option>
            <option>云服务器 + 远程交付</option>
            <option>还不确定</option>
          </select>
        </label>
        <label>期望时间线
          <input name="timeline" data-brief-label="Timeline" required placeholder="例如 2 周内评估 / 4-8 周上线">
        </label>
        <label>联系方式
          <input name="contactMethod" data-brief-label="Preferred contact method" autocomplete="email" required placeholder="邮箱 / 微信 / Telegram">
        </label>
      </div>
      <label>风控边界
        <textarea name="riskBoundary" data-brief-label="Risk boundary" required placeholder="最大仓位、单笔风险、只减仓、暂停开关、价格偏离、告警和人工确认边界。"></textarea>
      </label>
      <label>补充说明
        <textarea name="notes" data-brief-label="Additional notes" placeholder="可以写交易品种、订单类型、失败处理、是否需要后台、源码交付或私有部署。"></textarea>
      </label>
      <div class="form-actions">
        <button class="button primary" type="submit">安全提交项目 Brief</button>
        <button class="button secondary" type="button" data-copy-target="project-brief-template" data-contact="contact_page_brief_copy">复制空白模板</button>
      </div>
      <p class="copy-status" aria-live="polite"></p>
    </form>`;
}

function contactHtml(page) {
  const schema = { "@context": "https://schema.org", "@graph": baseGraph(page, "ContactPage") };
  const body = `<div class="answer-grid contact-brief-grid">
      <article>
        <h3>结构化 Brief 表单</h3>
        <p>先用表单整理项目类型、信号来源、API 权限、风控边界、部署环境、预算档位和联系方式。网站确认收到后，才会计入咨询转化。</p>
        ${leadBriefForm()}
      </article>
      <article>
        <h3>空白 Brief 模板</h3>
        <p>如果暂时不想填表，也可以复制下面的结构，通过邮件、微信或 Telegram 发来。</p>
        <pre id="project-brief-template" class="brief-template">${escapeHtml(page.briefTemplate)}</pre>
        <h3>请附上这些信息</h3>
        <ul class="check-list">${page.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    </div>
    <div class="detail-grid package-hints">${page.packageHints.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><a href="/#packages">查看交付包</a></article>`).join("")}</div>
    <div class="case-brief-panel">
      <div>
        <p class="eyebrow">Case Reference</p>
        <h2>不确定怎么写？先选一个最接近的匿名案例</h2>
        <p>可以在 Brief 里直接写“类似 TradingView Webhook 案例”或“类似私有化部署案例”，再补充你的平台、权限、风控和验收要求。</p>
      </div>
      <div class="case-brief-links">
        <a href="/case-studies/" data-contact="contact_case_reference">查看匿名案例</a>
        <a href="/case-studies/#case-1" data-contact="contact_case_webhook">Webhook 案例</a>
        <a href="/case-studies/#case-2" data-contact="contact_case_broker">券商 API 案例</a>
        <a href="/case-studies/#case-4" data-contact="contact_case_private">私有化部署案例</a>
      </div>
    </div>
    <div class="answer-grid contact-channel-grid">
      <article><h3>发送渠道</h3><div class="contact-row stacked"><a href="mailto:${contact.email}" data-contact="contact_page_email" data-lead-contact="true">${contact.email}</a><button type="button" data-copy="${contact.wechat}" data-contact="contact_page_wechat_copy">复制微信 ${contact.wechat}</button><a href="${contact.telegramUrl}" data-contact="contact_page_telegram" data-lead-contact="true">Telegram ${contact.telegram}</a></div><p class="copy-status" aria-live="polite"></p></article>
      <article><h3>安全边界</h3><ul class="plain-list"><li>不需要提现权限、资金托管权限或账户主密码。</li><li>API Secret 可等范围确认后再通过你认可的方式处理。</li><li>可以先隐藏账户号、真实订单、策略参数和客户敏感信息。</li><li>初步判断只需要足够说明接口、规则、风控和验收路径。</li></ul></article>
    </div>
    <div class="detail-grid contact-facts">${page.facts.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
  return infoPageHtml(page, "联系", body, schema, false);
}

function cryptoReportingHtml(page) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "Service"),
      {
        "@type": "Service",
        "@id": `${canonical(page.slug)}#service`,
        "name": page.h1,
        "description": page.description,
        "serviceType": "Private crypto asset reporting and reconciliation workflow setup",
        "provider": { "@id": `${site}/#organization` },
        "areaServed": ["香港", "新加坡", "台湾", "美国", "全球远程"],
        "audience": {
          "@type": "Audience",
          "audienceType": "HNW crypto holders, advisors, family offices, digital asset operations"
        }
      }
    ]
  };
  const body = `<div class="detail-grid">${page.facts.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>
    <section class="embedded-section">
      <h2>诊断前请准备</h2>
      <ul class="check-list">${page.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section class="embedded-section">
      <h2>联系入口</h2>
      <p>请先发送一个简短说明，包含数据源数量、报告使用者、当前表格或导出文件状态，以及是否只能使用只读数据。我们会先判断是否适合做付费诊断。</p>
      <div class="contact-row stacked"><a href="mailto:${contact.email}" data-contact="crypto_reporting_email" data-lead-contact="true">${contact.email}</a><button type="button" data-copy="${contact.wechat}" data-contact="crypto_reporting_wechat_copy">复制微信 ${contact.wechat}</button><a href="${contact.telegramUrl}" data-contact="crypto_reporting_telegram" data-lead-contact="true">Telegram ${contact.telegram}</a></div>
      <p class="copy-status" aria-live="polite"></p>
    </section>`;
  return infoPageHtml(page, "Crypto Reporting", body, schema, false);
}

function exchangeFeeToolHtml(page) {
  const url = canonical(page.slug);
  const pageStylesheetHref = `${stylesheetHref}&scope=fee-comparison-20260717`;
  const zh = page.lang === "zh-CN";
  const englishUrl = canonical(exchangeFeeToolPage.slug);
  const chineseUrl = canonical(exchangeFeeToolPageZh.slug);
  const t = zh ? {
    skip: "跳到主要内容", active: "费率工具", switchLabel: "语言", switchHref: englishUrl, switchText: "English",
    toolScope: "工具范围", exchanges: "家交易所", fullLadders: "套完整公开等级", noKeys: "无需 API Key", verified: "数据核验",
    noScript: "需要启用 JavaScript 才能运行计算器。下方官方来源链接仍可正常查看。",
    profile: "你的交易参数", estimate: "估算执行成本", market: "USDT 永续合约", volume: "30 天成交量（USD）", makerShare: "Maker 占比", assets: "交易所资产余额（USD）", apiShare: "API 交易占比", apiLow: "不超过 20%", apiHigh: "超过 20%", scopeHint: "适用范围：仅采用全球公开费率。美国、欧洲经济区等当地实体及账户活动可能不同。",
    ranked: "成本排名", monthly: "30 天手续费对比", copyLink: "复制分享链接", loading: "正在加载费率数据…",
    curve: "费率曲线", curveTitle: "成交量变化如何影响有效费率", lower: "越低越好", chartLabel: "不同成交量下的有效混合费率", chartMode: "图表指标", rateMode: "有效费率（bps）", costMode: "手续费（USD）", chartData: "查看图表数据表",
    inspect: "查看等级表", ladderTitle: "VIP 门槛与费率", exchange: "交易所", tier: "等级", volumeShort: "30 天成交量", assetRoute: "资产余额路径", condition: "条件",
    evidence: "所有数字均有来源", sources: "来源与计算方法", download: "下载数据集（JSON）",
    methodology: "仅使用全球公开费率表。系统根据 30 天衍生品成交量或资产余额路径估算可达到的最高等级，并应用已公布的 API 交易占比条件。完整等级交易所单独排名，仅有基础费率的交易所作为参考，不混入排名。计算器不会读取账户，也不包含活动、返佣、平台币折扣、特定交易对例外、强平费、资金费率或当地实体规则。",
    excludedTitle: "未计入项目：", excluded: "资金费率、买卖价差、滑点、强平费、返佣或平台币折扣、做市商计划、当地实体限制及账户专属活动。大额迁移成交量前，请在交易所账户内确认最终费率。",
    faq: "常见问题", faqTitle: "如何正确理解对比结果",
    ctaEyebrow: "需要账户级精确路由？", ctaTitle: "把费率表变成可执行的路由策略", ctaCopy: "我们提供交易所 API 执行、订单路由、风控与监控开发，不托管资金，也不需要提现权限。", ctaPrimary: "查看交易所 API 开发", ctaSecondary: "提交项目 Brief",
    checked: "核验日期", coverageFull: "完整公开等级", coverageBase: "已验证基础费率"
  } : {
    skip: "Skip to main content", active: "Fee tool", switchLabel: "Language", switchHref: chineseUrl, switchText: "中文",
    toolScope: "Tool scope", exchanges: "exchanges", fullLadders: "full public ladders", noKeys: "API keys required", verified: "verified",
    noScript: "JavaScript is required to run the calculator. The official source links remain available below.",
    profile: "Your trading profile", estimate: "Estimate execution cost", market: "USDT perpetuals", volume: "30-day volume (USD)", makerShare: "Maker share", assets: "Exchange asset balance (USD)", apiShare: "API trading share", apiLow: "20% or less", apiHigh: "More than 20%", scopeHint: "Scope: global public schedules only. US, EEA and other local entities or account promotions may differ.",
    ranked: "Ranked estimate", monthly: "Monthly fee comparison", copyLink: "Copy share link", loading: "Loading fee schedules…",
    curve: "Rate curve", curveTitle: "How effective fees change with volume", lower: "Lower is better", chartLabel: "Effective blended fee rate by trading volume", chartMode: "Chart metric", rateMode: "Effective rate (bps)", costMode: "Fee cost (USD)", chartData: "View chart data table",
    inspect: "Inspect the ladder", ladderTitle: "VIP thresholds and rates", exchange: "Exchange", tier: "Tier", volumeShort: "30d volume", assetRoute: "Asset route", condition: "Condition",
    evidence: "Evidence, not mystery math", sources: "Sources and methodology", download: "Download dataset (JSON)", methodology: exchangeFeeData.methodology,
    excludedTitle: "What is excluded:", excluded: "funding payments, spread, slippage, liquidation fees, referral or token discounts, market-maker programs, local entity restrictions and account-specific promotions. Always confirm the final rate inside your exchange account before routing volume.",
    faq: "FAQ", faqTitle: "How to read this comparison",
    ctaEyebrow: "Need account-exact routing logic?", ctaTitle: "Turn fee schedules into an execution policy", ctaCopy: "We build exchange API execution, routing, risk controls and monitoring. No custody and no withdrawal permissions.", ctaPrimary: "Explore exchange API engineering", ctaSecondary: "Send a project brief",
    checked: "Checked", coverageFull: "Full public ladder", coverageBase: "Base rate verified"
  };
  const faqs = zh ? [
    ["这个计算器显示的是我的账户实际费率吗？", "不是。它根据全球公开费率表进行估算。活动、返佣、平台币折扣、当地实体、交易对分组和账户专属计划都可能改变最终费率。"],
    ["混合费率如何计算？", "计算器按照你选择的 Maker 占比，对 Maker 和 Taker 费率进行加权，再乘以 30 天成交量。"],
    ["为什么部分交易所只显示基础费率？", "当官方完整等级表采用动态页面、账户专属规则、动态评分，或不同页面的数据无法可靠合并时，我们不会补填未经验证的数字。"],
    ["计算结果包含资金费率吗？", "不包含。这里仅估算成交手续费，不包含资金费率、价差、滑点、强平费、借贷成本或平台币折扣。"],
    ["负 Maker 费率会降低估算成本吗？", "会。如果官方费率表明确给出 Maker 返佣，计算器会将其作为负手续费计算，但实际资格和合约分组仍需在账户内确认。"],
    ["数据多久核验一次？", `当前数据集核验日期为 ${exchangeFeeData.lastVerified}。每家交易所均显示覆盖程度并链接到官方来源。`]
  ] : [
    ["Does this calculator show my exact account fee?", "No. It estimates fees from public global schedules. Promotions, referral discounts, token discounts, local entities, pair groups and account-specific programs can change the final rate."],
    ["How is the blended fee calculated?", "The tool weights the maker and taker fee rates by your selected maker share, then multiplies that blended rate by your 30-day trading volume."],
    ["Why do some exchanges show only a base rate?", "A complete ladder is excluded when the official public page is client-rendered, dynamic, account-specific or split across incompatible schedules. Partial coverage is more useful than invented precision."],
    ["Are funding payments included?", "No. The estimate covers execution fees only. Funding, spread, slippage, liquidation fees, borrowing and token discounts are outside the model."],
    ["Can a negative maker fee reduce estimated cost?", "Yes. Where an official schedule publishes a maker rebate, the calculator treats it as a negative fee. Actual eligibility and contract group still need account-level verification."],
    ["How often is the data checked?", `The current dataset was checked on ${exchangeFeeData.lastVerified}. Each exchange row links to its official source and displays its coverage level.`]
  ];
  const sourceScopeZh = {
    okx: ["合约分组 1 / 主流交易对", "分组 2 合约的 VIP 7 至 VIP 9 费率不同。"],
    bybit: ["标准 VIP；Pro 3 以上采用主流 72 个 USDT 永续合约费率", "API 交易占比不超过 20% 时采用标准 VIP，超过 20% 时采用 Pro。Pro 3 以上其他 USDT 永续合约可能采用不同 Taker 费率。"],
    bitget: ["合约标准 VIP", "Bitget PRO 做市商分组采用独立费率表，未计入本模型。"],
    binance: ["USDⓈ-M 合约公开基础费率", "官方完整等级表由客户端动态渲染，且可能受账户折扣设置影响；在完整数据可稳定核验前，仅建模公开基础费率。"],
    mexc: ["公开标准永续合约费率", "官方资料显示标准 Maker 0%、Taker 0.02%，但地区、交易对及动态 M-Score VVIP 可能改变账户实际费率，因此不提供确定的下一等级。"],
    gate: ["USDT 合约基础费率", "Gate 在多个页面发布交易对分组和 VIP 调整；为避免混合不兼容表格，本模型仅采用基础费率。"]
  };
  const sourceCards = exchangeFeeData.exchanges.map((exchange) => {
    const sources = exchange.sources || [exchange.source];
    const [scope, note] = zh ? sourceScopeZh[exchange.id] : [exchange.pairScope, exchange.note];
    return `<article>
      <div class="fee-source-head"><h3>${escapeHtml(exchange.name)}</h3><span class="coverage-badge ${exchange.coverage}">${escapeHtml(exchange.coverage === "full" ? t.coverageFull : t.coverageBase)}</span></div>
      <p>${escapeHtml(scope)}${zh ? "。" : ". "}${escapeHtml(note)}</p>
      <ul>${sources.map((source) => `<li><a href="${source.url}" rel="nofollow noopener" target="_blank">${escapeHtml(source.label)}</a><span>${t.checked} ${escapeHtml(source.checkedDate)}</span></li>`).join("")}</ul>
    </article>`;
  }).join("");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "WebPage"),
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        "name": page.h1,
        "url": url,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "isAccessibleForFree": true,
        "description": page.description,
        "dateModified": exchangeFeeData.lastVerified,
        "publisher": { "@id": `${site}/#organization` }
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": faqs.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      }
    ]
  };

  const comparisonLinks = exchangeFeeComparisonPages
    .filter((comparison) => comparison.lang === page.lang)
    .map((comparison) => `<article><h3><a href="/${comparison.slug}/">${escapeHtml(comparison.h1)}</a></h3><p>${escapeHtml(comparison.description)}</p></article>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${englishUrl}">
  <link rel="alternate" hreflang="zh-CN" href="${chineseUrl}">
  <link rel="alternate" hreflang="x-default" href="${englishUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(page.h1)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta name="theme-color" content="#07111f">
  <link rel="stylesheet" href="${pageStylesheetHref}">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs information">
  <script src="${scriptHref}" defer></script>
  ${jsonLd(schema)}
</head>
<body class="content-page fee-tool-page">
  <a class="skip-link" href="#main-content">${t.skip}</a>
  ${header(t.active, page.lang)}
  <main id="main-content">
    <section class="content-hero fee-tool-hero">
      ${breadcrumbs(page)}
      <div class="fee-language-switch" aria-label="${t.switchLabel}"><a href="${t.switchHref}" lang="${zh ? "en" : "zh-CN"}">${t.switchText}</a></div>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="fee-hero-proof" aria-label="${t.toolScope}">
        <span><strong>6</strong> ${t.exchanges}</span>
        <span><strong>3</strong> ${t.fullLadders}</span>
        <span><strong>0</strong> ${t.noKeys}</span>
        <span><strong>${escapeHtml(exchangeFeeData.lastVerified)}</strong> ${t.verified}</span>
      </div>
    </section>

    <section class="fee-tool-shell" data-exchange-fee-tool data-data-url="/data/exchange-fees.json" data-lang="${page.lang}">
      <noscript><p class="tool-notice error">${t.noScript}</p></noscript>
      <form class="fee-controls" data-fee-controls>
        <div class="fee-control-heading">
          <div><p class="eyebrow">${t.profile}</p><h2>${t.estimate}</h2></div>
          <span class="market-chip">${t.market}</span>
        </div>
        <div class="fee-control-grid">
          <label>${t.volume}
            <input type="number" name="volume" min="0" step="100000" value="10000000" inputmode="decimal">
          </label>
          <label>${t.makerShare} <output data-maker-output>70%</output>
            <input type="range" name="makerShare" min="0" max="100" step="1" value="70">
          </label>
          <label>${t.assets}
            <input type="number" name="assets" min="0" step="10000" value="0" inputmode="decimal">
          </label>
          <label>${t.apiShare}
            <select name="apiShare">
              <option value="0">${t.apiLow}</option>
              <option value="21">${t.apiHigh}</option>
            </select>
          </label>
        </div>
        <p class="tool-notice fee-scope-notice">${t.scopeHint}</p>
      </form>

      <section aria-labelledby="fee-results-title" class="fee-results-section">
        <div class="section-heading-row"><div><p class="eyebrow">${t.ranked}</p><h2 id="fee-results-title">${t.monthly}</h2></div><button class="button secondary compact" type="button" data-share-fee-tool>${t.copyLink}</button></div>
        <p class="share-status" data-share-status aria-live="polite"></p>
        <p class="sr-only" data-fee-summary aria-live="polite"></p>
        <div data-fee-results><p>${t.loading}</p></div>
      </section>

      <section class="fee-chart-section" aria-labelledby="cost-curve-title">
        <div class="section-heading-row"><div><p class="eyebrow">${t.curve}</p><h2 id="cost-curve-title">${t.curveTitle}</h2></div><div class="fee-chart-actions"><span class="chart-key">${t.lower}</span><fieldset class="chart-mode-toggle"><legend class="sr-only">${t.chartMode}</legend><label><input type="radio" name="chartMode" value="rate" data-chart-mode checked> ${t.rateMode}</label><label><input type="radio" name="chartMode" value="cost" data-chart-mode> ${t.costMode}</label></fieldset></div></div>
        <div class="fee-chart-wrap"><canvas data-fee-chart width="1100" height="460" role="img" aria-label="${t.chartLabel}"></canvas></div>
        <p class="chart-summary" data-chart-summary></p>
        <details class="fee-chart-data"><summary>${t.chartData}</summary><div class="fee-table-scroll" data-chart-table></div></details>
      </section>

      <section class="fee-ladder-section" aria-labelledby="tier-ladder-title">
        <div class="section-heading-row"><div><p class="eyebrow">${t.inspect}</p><h2 id="tier-ladder-title">${t.ladderTitle}</h2></div><label>${t.exchange} <select data-ladder-exchange>${exchangeFeeData.exchanges.map((exchange) => `<option value="${exchange.id}">${escapeHtml(exchange.name)}</option>`).join("")}</select></label></div>
        <div class="fee-table-scroll"><table class="fee-ladder-table"><thead><tr><th>${t.tier}</th><th>${t.volumeShort}</th><th>${t.assetRoute}</th><th>Maker</th><th>Taker</th><th>${t.condition}</th></tr></thead><tbody data-fee-ladder></tbody></table></div>
        <p class="tool-notice" data-ladder-note></p>
      </section>
    </section>

    <section class="section fee-method-section" id="methodology">
      <div class="section-heading-row"><div><p class="eyebrow">${t.evidence}</p><h2>${t.sources}</h2></div><a href="/data/exchange-fees.json">${t.download}</a></div>
      <p>${escapeHtml(t.methodology)}</p>
      <div class="fee-source-grid">${sourceCards}</div>
      <aside class="fee-limitations"><strong>${t.excludedTitle}</strong> ${t.excluded}</aside>
    </section>

    <section class="section fee-faq-section" id="faq">
      <p class="eyebrow">${t.faq}</p><h2>${t.faqTitle}</h2>
      <div class="fee-faq-list">${faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</div>
    </section>

    <section class="section fee-comparison-links" aria-labelledby="fee-comparison-links-title">
      <p class="eyebrow">${zh ? "高意图对比" : "Focused comparisons"}</p>
      <h2 id="fee-comparison-links-title">${zh ? "按交易所组合继续比较" : "Compare specific exchange pairs"}</h2>
      <div class="fee-source-grid">${comparisonLinks}</div>
    </section>

    <section class="fee-tool-cta">
      <div><p class="eyebrow">${t.ctaEyebrow}</p><h2>${t.ctaTitle}</h2><p>${t.ctaCopy}</p></div>
      <div class="hero-actions"><a class="button primary" href="/exchange-api-trading-bot-development/" data-contact="fee_tool_exchange_api">${t.ctaPrimary}</a><a class="button secondary" href="/contact/" data-contact="fee_tool_brief">${t.ctaSecondary}</a></div>
    </section>
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

function hyperliquidFeeToolHtml(page) {
  const zh = page.lang === "zh-CN";
  const url = canonical(page.slug);
  const alternateUrl = canonical(page.counterpartSlug);
  const englishUrl = zh ? alternateUrl : url;
  const chineseUrl = zh ? url : alternateUrl;
  const pageStylesheetHref = `${stylesheetHref}&scope=hyperliquid-buyers-20260719`;
  const pageScriptHref = `${scriptHref}&scope=hyperliquid-buyers-20260719`;
  const formatRate = (value) => `${Number(value).toFixed(3)}%`;
  const formatVolume = (value) => value === 0 ? "—" : value >= 1000000000 ? `$${value / 1000000000}B` : `$${value / 1000000}M`;
  const tierRows = hyperliquidFeeData.vipTiers.map((tier) => `<tr><th scope="row">${tier.name}</th><td>${formatVolume(tier.minWeightedVolume)}</td><td>${formatRate(tier.perpMaker)} / ${formatRate(tier.perpTaker)}</td><td>${formatRate(tier.spotMaker)} / ${formatRate(tier.spotTaker)}</td></tr>`).join("");
  const stakingOptions = hyperliquidFeeData.stakingTiers.map((tier) => `<option value="${tier.discount}">${tier.name} · ${tier.minHype ? `${tier.minHype.toLocaleString("en-US")}+ HYPE · ` : ""}${tier.discount}%</option>`).join("");
  const rebateOptions = hyperliquidFeeData.makerRebateTiers.map((tier, index) => `<option value="${index}">${zh ? (index ? `Maker Rebate ${index} · 全平台加权 Maker 量占比 >${tier.minWeightedMakerShare}%` : "不使用 Maker Rebate") : (index ? `Maker rebate ${index} · >${tier.minWeightedMakerShare}% of platform weighted maker volume` : "No maker rebate")}</option>`).join("");
  const faqs = zh ? [
    ["Hyperliquid VIP 等级如何计算？", "按滚动 14 天加权成交量计算：永续成交量 + 2 × 现货成交量。子账户成交量计入主账户并共享等级，Vault 单独计算。"],
    ["HYPE 质押折扣如何进入计算？", "本工具按所选官方质押等级降低正的 Maker/Taker 费率。质押关联具有控制权与不可解除等重要风险，是否适用应以账户 userFees 返回结果为准。"],
    ["Maker Rebate 是我的 Maker 订单占比吗？", "不是。官方门槛是用户占全平台 14 天加权 Maker 成交量的比例。只有从账户或官方接口确认等级后才应选择对应 Rebate。"],
    ["是否包含 HIP-3、资金费率和滑点？", "不包含。本工具只估算标准永续和普通现货执行费；HIP-3 deployer fee、growth mode、aligned quote、稳定币交易对缩放、builder fee、返佣、资金费率、价差、滑点和强平成本均未计入。"],
    ["为什么不要求连接钱包？", "首版使用公开官方费率表和手工参数，不读取地址、不请求签名，也不保存账户信息。实际账户费率应以官方 userFees 接口或 Hyperliquid 账户页面为准。"]
  ] : [
    ["How is the Hyperliquid VIP tier calculated?", "It uses rolling 14-day weighted volume: perp volume plus two times spot volume. Subaccount volume rolls into the master account and shares its tier, while vault volume is treated separately."],
    ["How does HYPE staking affect the estimate?", "The calculator reduces positive maker and taker rates by the selected published staking discount. Staking linking has important control and permanence risks; confirm the actual result through the account userFees response."],
    ["Is maker rebate based on my maker-order percentage?", "No. The published threshold is the user's share of platform-wide 14-day weighted maker volume. Select a rebate tier only when the account or official API confirms it."],
    ["Does this include HIP-3, funding and slippage?", "No. It models standard perps and ordinary spot execution fees only. HIP-3 deployer fees, growth mode, aligned quote assets, stable-pair scaling, builder fees, referrals, funding, spread, slippage and liquidation costs are excluded."],
    ["Why does the tool not connect a wallet?", "The first version uses the public official schedule and manual inputs. It does not read an address, request a signature or store account data. Confirm account-specific rates through Hyperliquid or the official userFees endpoint."]
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "WebPage"),
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        "name": page.h1,
        "url": url,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "isAccessibleForFree": true,
        "description": page.description,
        "inLanguage": page.lang
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": faqs.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${englishUrl}">
  <link rel="alternate" hreflang="zh-CN" href="${chineseUrl}">
  <link rel="alternate" hreflang="x-default" href="${englishUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(page.h1)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta name="theme-color" content="#07111f">
  <link rel="stylesheet" href="${pageStylesheetHref}">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs information">
  <script src="${pageScriptHref}" defer></script>
  ${jsonLd(schema)}
</head>
<body class="content-page fee-tool-page hyperliquid-tool-page">
  <a class="skip-link" href="#main-content">${zh ? "跳到主要内容" : "Skip to main content"}</a>
  ${header(zh ? "费率工具" : "Fee tool", page.lang)}
  <main id="main-content" data-hyperliquid-fee-tool data-lang="${page.lang}" data-url="/data/hyperliquid-fees.json">
    <section class="content-hero fee-tool-hero hyperliquid-hero">
      ${breadcrumbs(page)}
      <div class="fee-language-switch" aria-label="${zh ? "语言" : "Language"}"><a href="${alternateUrl}" lang="${zh ? "en" : "zh-CN"}">${zh ? "English" : "中文"}</a></div>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="fee-hero-proof" aria-label="${zh ? "计算范围" : "Calculation scope"}">
        <span><strong>14D</strong>${zh ? "滚动加权成交量" : "rolling weighted volume"}</span>
        <span><strong>2×</strong>${zh ? "现货量计入 VIP" : "spot volume for VIP"}</span>
        <span><strong>6 + 1</strong>${zh ? "VIP 等级" : "VIP thresholds"}</span>
        <span><strong>0</strong>${zh ? "钱包连接或签名" : "wallet connections"}</span>
      </div>
    </section>

    <section class="section fee-tool-shell hyperliquid-tool-shell">
      <form class="fee-controls hl-controls" data-hl-controls>
        <div class="section-heading-row"><div><p class="eyebrow">${zh ? "你的交易画像" : "Your trading profile"}</p><h2>${zh ? "估算标准永续与现货手续费" : "Estimate standard perp and spot fees"}</h2></div><button class="button secondary compact" type="button" data-hl-share>${zh ? "复制场景链接" : "Copy scenario link"}</button></div>
        <p class="tool-notice">${zh ? "不连接钱包。输入值只在浏览器内计算。Maker Rebate 不是个人 Maker 订单比例，请仅在账户已确认等级时选择。" : "No wallet connection. Inputs are calculated in your browser. Maker rebate is not your personal maker-order mix; select a tier only when your account confirms it."}</p>
        <div class="hl-input-grid">
          <label>${zh ? "14 天永续成交量（USD）" : "14-day perp volume (USD)"}<input name="perpVolume" type="number" min="0" step="100000" value="10000000" inputmode="decimal"></label>
          <label>${zh ? "14 天现货成交量（USD）" : "14-day spot volume (USD)"}<input name="spotVolume" type="number" min="0" step="100000" value="0" inputmode="decimal"><small>${zh ? "VIP 加权时按 2 倍计入" : "Counts 2× toward the VIP tier"}</small></label>
          <label>${zh ? "Maker 成交占比" : "Maker execution share"}<input name="makerShare" type="range" min="0" max="100" step="1" value="70"><output data-hl-maker-output>70%</output></label>
          <label>${zh ? "HYPE 质押等级" : "HYPE staking tier"}<select name="stakingDiscount">${stakingOptions}</select></label>
          <label class="hl-wide-input">${zh ? "已确认的 Maker Rebate 等级" : "Confirmed maker rebate tier"}<select name="makerRebate">${rebateOptions}</select></label>
        </div>
        <p class="copy-status" data-hl-share-status aria-live="polite"></p>
      </form>

      <section class="fee-results-section hl-results" aria-labelledby="hl-results-title">
        <div class="section-heading-row"><div><p class="eyebrow">${zh ? "计算结果" : "Estimated result"}</p><h2 id="hl-results-title">${zh ? "有效费率与执行成本" : "Effective rates and execution cost"}</h2></div><span class="coverage-badge full" data-hl-tier>VIP 1</span></div>
        <p class="sr-only" data-hl-summary aria-live="polite"></p>
        <div class="hl-result-grid">
          <article class="hl-primary-result"><span>${zh ? "14 天预计执行手续费" : "Estimated 14-day execution fees"}</span><strong data-hl-total>$0</strong><small>${zh ? "负值表示预计净 Maker Rebate" : "A negative value indicates a modeled net maker rebate"}</small></article>
          <article><span>${zh ? "VIP 加权成交量" : "VIP weighted volume"}</span><strong data-hl-weighted>$0</strong><small>${zh ? "永续 + 2 × 现货" : "Perps + 2 × spot"}</small></article>
          <article><span>${zh ? "下一 VIP 等级" : "Next VIP tier"}</span><strong data-hl-next>—</strong><small data-hl-next-saving></small></article>
          <article><span>${zh ? "质押折扣" : "Staking discount"}</span><strong data-hl-staking>0%</strong><small>${zh ? "仅缩减正费率" : "Applied to positive rates only"}</small></article>
        </div>
        <div class="fee-table-scroll"><table class="fee-comparison-table compact"><thead><tr><th>${zh ? "产品" : "Product"}</th><th>Maker</th><th>Taker</th><th>${zh ? "本场景成本" : "Scenario cost"}</th></tr></thead><tbody><tr><th scope="row">${zh ? "标准永续" : "Standard perps"}</th><td data-hl-perp-maker>—</td><td data-hl-perp-taker>—</td><td data-hl-perp-cost>—</td></tr><tr><th scope="row">${zh ? "普通现货" : "Ordinary spot"}</th><td data-hl-spot-maker>—</td><td data-hl-spot-taker>—</td><td data-hl-spot-cost>—</td></tr></tbody></table></div>
      </section>
    </section>

    <section class="section fee-ladder-section" aria-labelledby="hl-ladder-title">
      <p class="eyebrow">VIP</p><h2 id="hl-ladder-title">${zh ? "14 天加权成交量费率阶梯" : "14-day weighted-volume fee ladder"}</h2>
      <p>${zh ? "以下为未应用质押折扣、返佣或 Maker Rebate 的标准公开费率。达到更高等级后，统一应用于标准永续与现货。" : "These are standard published rates before staking discounts, referral discounts or maker rebates. The selected VIP tier applies across standard perps and spot."}</p>
      <div class="fee-table-scroll"><table class="fee-ladder-table"><thead><tr><th>${zh ? "等级" : "Tier"}</th><th>${zh ? "最低加权量" : "Minimum weighted volume"}</th><th>${zh ? "永续 Maker / Taker" : "Perp maker / taker"}</th><th>${zh ? "现货 Maker / Taker" : "Spot maker / taker"}</th></tr></thead><tbody>${tierRows}</tbody></table></div>
    </section>

    <section class="section fee-method-section" id="methodology">
      <p class="eyebrow">${zh ? "计算边界" : "Method and boundaries"}</p><h2>${zh ? "官方来源、公式与未覆盖项" : "Official sources, formula and exclusions"}</h2>
      <div class="fee-source-grid">
        ${hyperliquidFeeData.sources.map((source) => `<article><div class="fee-source-head"><h3>${escapeHtml(source.label)}</h3><span class="coverage-badge">${source.checkedAt}</span></div><p>${escapeHtml(source.scope)}</p><p><a href="${source.url}" rel="nofollow noopener" target="_blank">${zh ? "查看官方资料" : "Open official source"}</a></p></article>`).join("")}
        <article><div class="fee-source-head"><h3>${zh ? "隐私与账户边界" : "Privacy and account boundary"}</h3><span class="coverage-badge">${zh ? "无需钱包" : "No wallet"}</span></div><p>${zh ? "工具不读取地址、不请求签名、不调用账户级接口。结果是基于公开费率和手工输入的场景估算。" : "The tool does not read an address, request a signature or call account-specific endpoints. Results are scenario estimates from public rates and manual inputs."}</p></article>
      </div>
      <aside class="fee-limitations"><strong>${zh ? "未覆盖：" : "Excluded:"}</strong> ${zh ? "HIP-3 deployer fee、growth mode、aligned quote、稳定币交易对缩放、builder fee、推荐折扣、资金费率、价差、滑点、强平成本、地区限制及账户专属规则。" : "HIP-3 deployer fees, growth mode, aligned quote assets, stable-pair scaling, builder fees, referral discounts, funding, spread, slippage, liquidation costs, regional restrictions and account-specific rules."}</aside>
    </section>

    <section class="section fee-faq-section" id="faq"><p class="eyebrow">FAQ</p><h2>${zh ? "正确理解 Hyperliquid 手续费" : "How to read Hyperliquid fees"}</h2><div class="fee-faq-list">${faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</div></section>

    <section class="section fee-tool-cta buyer-tool-cta" aria-labelledby="buyer-tool-title">
      <div><p class="eyebrow">${zh ? "已经有策略？" : "Already have a strategy?"}</p><h2 id="buyer-tool-title">${zh ? "选择与你的项目最接近的实施路径" : "Choose the implementation path closest to your project"}</h2><p>${zh ? "无需先理解 API 技术细节。告诉我们你的信号来源、交易规则、风控边界和部署目标即可。" : "You do not need to specify API internals first. Start with your signal source, trading rules, risk boundaries and deployment goal."}</p></div>
      <div class="buyer-tool-grid">
        <a href="/tradingview-to-hyperliquid-automation/"><strong>${zh ? "我已有 TradingView 策略" : "I have TradingView alerts"}</strong><span>${zh ? "把 Alert 接入 Hyperliquid，并处理去重、风控和异常告警。" : "Connect existing alerts to Hyperliquid with duplicate protection, risk checks and failure alerts."}</span><em>${zh ? "查看 TradingView 接入 →" : "View TradingView path →"}</em></a>
        <a href="/hyperliquid-api-trading-bot-development/"><strong>${zh ? "我需要定制交易 Bot" : "I need a custom trading bot"}</strong><span>${zh ? "把已有规则工程化，交付源码、日志、暂停控制和私有部署。" : "Turn defined rules into an operable bot with source, logs, pause controls and private deployment."}</span><em>${zh ? "查看定制 Bot →" : "View custom bot path →"}</em></a>
        <a href="/hyperliquid-trading-system-for-teams/"><strong>${zh ? "我们是交易或产品团队" : "We are a trading or product team"}</strong><span>${zh ? "建设多规则、权限、审计日志和团队操作流程。" : "Build shared execution, permissions, audit logs and operator workflows."}</span><em>${zh ? "查看团队方案 →" : "View team system path →"}</em></a>
      </div>
    </section>
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

function exchangeFeeComparisonHtml(page) {
  const zh = page.lang === "zh-CN";
  const url = canonical(page.slug);
  const pageStylesheetHref = `${stylesheetHref}&scope=fee-comparison-20260717`;
  const alternateUrl = canonical(page.counterpartSlug);
  const englishUrl = zh ? alternateUrl : url;
  const chineseUrl = zh ? url : alternateUrl;
  const binance = exchangeFeeData.exchanges.find((exchange) => exchange.id === page.exchangeA);
  const okx = exchangeFeeData.exchanges.find((exchange) => exchange.id === page.exchangeB);
  const makerShare = 70;
  const takerShare = 30;
  const scenarios = [1000000, 10000000, 100000000];
  const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const compactUsd = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
  const scenarioLabel = (volume) => `$${volume / 1000000}M`;
  const percent = (value) => `${value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}%`;
  const tierForVolume = (exchange, volume) => exchange.tiers.reduce((selected, tier) => (
    volume >= tier.minVolume && !Number.isFinite(tier.minApiShareForVolume) ? tier : selected
  ), exchange.tiers[0]);
  const estimate = (tier, volume) => volume * ((tier.maker * makerShare + tier.taker * takerShare) / 100) / 100;
  const scenarioRows = scenarios.map((volume) => {
    const binanceTier = tierForVolume(binance, volume);
    const okxTier = tierForVolume(okx, volume);
    const binanceCost = estimate(binanceTier, volume);
    const okxCost = estimate(okxTier, volume);
    const boundary = volume === 1000000
      ? (zh ? "两边公开基础参考值相同；实际账户活动、地区和折扣仍可能改变结果。" : "The public base references are equal; account promotions, region and discounts can still change the result.")
      : (zh ? "OKX 可按公开成交量门槛建模；Binance 完整 VIP 阶梯未知，不能据此断言 OKX 一定更便宜。" : "OKX can be modeled from its published volume tier; Binance's complete VIP ladder is unknown, so this is not proof that OKX is always cheaper.");
    return `<tr>
      <th scope="row">${scenarioLabel(volume)}</th>
      <td><strong>${escapeHtml(binanceTier.name)}</strong><span>${percent(binanceTier.maker)} / ${percent(binanceTier.taker)}</span><span>${usd.format(binanceCost)} ${zh ? "基础参考" : "base reference"}</span></td>
      <td><strong>${escapeHtml(okxTier.name)}</strong><span>${percent(okxTier.maker)} / ${percent(okxTier.taker)}</span><span>${usd.format(okxCost)} ${zh ? "模型估算" : "modeled estimate"}</span></td>
      <td>${escapeHtml(boundary)}</td>
    </tr>`;
  }).join("");
  const okxLadderRows = okx.tiers.map((tier, index) => `<tr>
    <th scope="row">${escapeHtml(tier.name)}</th>
    <td>${index === 0 ? `${percent(binance.tiers[0].maker)} / ${percent(binance.tiers[0].taker)}` : (zh ? "未知；公共完整表未显示" : "Unknown; complete public table not exposed")}</td>
    <td>${tier.minVolume ? `$${compactUsd.format(tier.minVolume)}+` : "—"}</td>
    <td>${tier.minAssets ? `$${compactUsd.format(tier.minAssets)}+` : "—"}</td>
    <td>${percent(tier.maker)} / ${percent(tier.taker)}</td>
  </tr>`).join("");
  const mixRows = [
    [100, 0, zh ? "全部 Maker" : "All maker"],
    [70, 30, zh ? "默认混合" : "Default mix"],
    [0, 100, zh ? "全部 Taker" : "All taker"]
  ].map(([maker, taker, label]) => {
    const volume = 10000000;
    const binanceTier = binance.tiers[0];
    const okxTier = tierForVolume(okx, volume);
    const blendedCost = (tier) => volume * ((tier.maker * maker + tier.taker * taker) / 100) / 100;
    return `<tr><th scope="row">${escapeHtml(label)} · ${maker}/${taker}</th><td>${usd.format(blendedCost(binanceTier))} ${zh ? "基础参考" : "base reference"}</td><td>${usd.format(blendedCost(okxTier))} · ${escapeHtml(okxTier.name)}</td></tr>`;
  }).join("");
  const faqs = zh ? [
    ["1000 万美元月成交量时，Binance 还是 OKX 手续费更低？", "在 70% Maker / 30% Taker、资产余额为 0 的模型里，OKX 公开 VIP 2 费率对应约 2130 美元。Binance 只能显示约 2900 美元的基础费率参考；因为完整 VIP 阶梯未能公开核验，不能据此断言 OKX 对所有 Binance VIP 账户都更低。"],
    ["为什么不列出 Binance VIP 1 到 VIP 9 的数字？", "Binance 官方费率页在本次未登录复核中没有展示完整表格。为了避免把旧截图、搜索摘要或第三方聚合数据当成当前费率，本页将这些等级标为未知。"],
    ["API 交易会自动获得更低费率吗？", "本页采用的官方资料没有支持“仅因使用 API 就自动降费”的结论。API 用户仍应从账户费率页面或官方账户接口确认实际等级和折扣。"],
    ["本页是否包含资金费率和滑点？", "不包含。场景只计算 Maker/Taker 执行手续费，不包括资金费率、买卖价差、滑点、强平费、返佣、平台币折扣或活动费率。"],
    ["OKX 的费率适用于所有合约和地区吗？", "不适用。表格按 OKX Futures Group 1 公开费率建模；Group 2 的 VIP 7 至 VIP 9 不同，并且具体交易对、当地实体和司法辖区可用性仍需在本地费率页确认。"]
  ] : [
    ["Which is cheaper at $10M monthly volume, Binance or OKX?", "At a 70% maker / 30% taker mix with zero qualifying assets, OKX's published VIP 2 schedule models to about $2,130. Binance shows a $2,900 base-rate reference only; because its complete VIP ladder was not publicly verifiable here, this does not prove OKX is cheaper for every Binance VIP account."],
    ["Why are Binance VIP 1 through VIP 9 rates not listed?", "The official Binance fee page did not expose the complete table during this unauthenticated review. The page marks those tiers unknown instead of treating old screenshots, search snippets or third-party tables as current fees."],
    ["Does API trading automatically lower fees?", "The official sources used here do not support a general claim that API use alone creates a discount. API users should confirm the effective tier and discounts on the account fee page or through an official account endpoint."],
    ["Does this comparison include funding and slippage?", "No. The scenarios cover maker/taker execution fees only. Funding, spread, slippage, liquidation fees, referral rebates, token discounts and promotions are excluded."],
    ["Do the OKX rates apply to every contract and region?", "No. The model uses OKX Futures Group 1. Group 2 differs at VIP 7 through VIP 9, while pair availability, local entities and jurisdiction rules must be confirmed on the applicable local fee page."]
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(page, "WebPage"),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": faqs.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer }
        }))
      }
    ]
  };
  const toolPath = zh ? "/zh/tools/crypto-exchange-fee-calculator/" : "/tools/crypto-exchange-fee-calculator/";
  const calculatorCtas = scenarios.map((volume) => `<a class="button secondary compact" href="${toolPath}?v=${volume}&amp;m=${makerShare}&amp;a=0&amp;api=0">${zh ? "计算" : "Open"} ${scenarioLabel(volume)} · 70/30</a>`).join("");

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en" href="${englishUrl}">
  <link rel="alternate" hreflang="zh-CN" href="${chineseUrl}">
  <link rel="alternate" hreflang="x-default" href="${englishUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(page.h1)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta name="theme-color" content="#07111f">
  <link rel="stylesheet" href="${pageStylesheetHref}">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs information">
  <script src="${scriptHref}" defer></script>
  ${jsonLd(schema)}
</head>
<body class="content-page fee-tool-page fee-comparison-page">
  <a class="skip-link" href="#main-content">${zh ? "跳到主要内容" : "Skip to main content"}</a>
  ${header(zh ? "费率工具" : "Fee tool", page.lang)}
  <main id="main-content">
    <section class="content-hero fee-tool-hero">
      ${breadcrumbs(page)}
      <div class="fee-language-switch" aria-label="${zh ? "语言" : "Language"}"><a href="${alternateUrl}" lang="${zh ? "en" : "zh-CN"}">${zh ? "English" : "中文"}</a></div>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="fee-hero-proof" aria-label="${zh ? "对比范围" : "Comparison scope"}">
        <span><strong>USDT</strong>${zh ? "合约产品范围" : "futures scope"}</span>
        <span><strong>70 / 30</strong>${zh ? "Maker / Taker" : "maker / taker"}</span>
        <span><strong>2026-07-17</strong>${zh ? "本页复核" : "page recheck"}</span>
        <span><strong>1 + 1</strong>${zh ? "完整阶梯 + 基础参考" : "full ladder + base reference"}</span>
      </div>
    </section>

    <section class="section fee-comparison-summary" aria-labelledby="comparison-verdict-title">
      <p class="eyebrow">${zh ? "先看结论" : "Decision boundary"}</p>
      <h2 id="comparison-verdict-title">${zh ? "能比较 OKX 的公开阶梯，但不能推测 Binance VIP" : "Model the OKX ladder; do not invent Binance VIP rates"}</h2>
      <p>${zh ? "在 100 万美元场景，两边公开基础参考均为 Maker 0.02% / Taker 0.05%。OKX 在 1000 万和 1 亿美元场景分别进入 VIP 2 与 VIP 3；Binance 的完整等级表本次无法公开核验，所以高成交量差额只能视为对公开基础费率的比较，不是账户级胜负结论。" : "At $1M, both public base references are 0.02% maker / 0.05% taker. OKX reaches VIP 2 at $10M and VIP 3 at $100M. Binance's complete ladder was not publicly verifiable in this review, so the high-volume gaps compare against a base reference—not an account-level winner."}</p>
      <aside class="fee-limitations"><strong>${zh ? "重要限制：" : "Important limit:"}</strong> ${zh ? "Binance 费率页在 2026-07-17 的未登录复核中显示 No records found；本页保留 2026-07-15 从该官方页面核验的基础费率，不把本次不可见误写为重新确认。" : "The Binance fee page returned “No records found” in the 2026-07-17 unauthenticated recheck. This page retains the base rate verified from that official page on 2026-07-15 and does not mislabel the unavailable table as freshly confirmed."}</aside>
    </section>

    <section class="section fee-scenario-section" aria-labelledby="scenario-title">
      <p class="eyebrow">${zh ? "月成交量场景" : "Monthly volume scenarios"}</p>
      <h2 id="scenario-title">${zh ? "100 万、1000 万与 1 亿美元手续费" : "$1M, $10M and $100M fee scenarios"}</h2>
      <p>${zh ? "假设资产余额为 0、API 条件不触发单独路径，Maker/Taker 为 70% / 30%。费用 = 成交量 ×（Maker 费率 × 70% + Taker 费率 × 30%）。" : "Assumptions: zero qualifying assets, no separate API tier condition, and a 70% / 30% maker/taker mix. Cost = volume × (maker rate × 70% + taker rate × 30%)."}</p>
      <div class="fee-table-scroll"><table class="fee-comparison-table"><thead><tr><th>${zh ? "30 天成交量" : "30-day volume"}</th><th>Binance</th><th>OKX</th><th>${zh ? "如何解读" : "How to read it"}</th></tr></thead><tbody>${scenarioRows}</tbody></table></div>
      <div class="hero-actions fee-preset-actions">${calculatorCtas}</div>
    </section>

    <section class="section fee-path-section" aria-labelledby="path-title">
      <p class="eyebrow">${zh ? "普通 / API / VIP 路径" : "Regular / API / VIP paths"}</p>
      <h2 id="path-title">${zh ? "不同账户路径需要不同证据" : "Different account paths need different evidence"}</h2>
      <div class="fee-path-grid">
        <article><h3>${zh ? "普通路径" : "Regular path"}</h3><p>${zh ? "Binance 基础参考与 OKX Regular 均为 Maker 0.02% / Taker 0.05%。不计 BNB、活动、推荐返佣和当地实体差异。" : "The Binance base reference and OKX Regular are both 0.02% maker / 0.05% taker. BNB, promotions, referrals and local entities are excluded."}</p></article>
        <article><h3>API</h3><p>${zh ? "官方资料没有证明 API 使用本身会自动降费。Binance 需要从账户费率页或官方账户接口确认；OKX 公告按资产或各产品线 30 天成交量决定最高等级。" : "The sources do not show an automatic discount for API use alone. Confirm Binance through the account fee page or an official account endpoint; OKX assigns the highest tier reached by assets or a 30-day product-line volume."}</p></article>
        <article><h3>VIP</h3><p>${zh ? "OKX 的公开门槛可建模到 VIP 9。Binance 页面确认 VIP 权益可跨产品适用、期货成交量汇总 USDⓈ-M 与 COIN-M，但本次没有公开展示可核验的门槛和费率数字。" : "OKX publishes thresholds through VIP 9. Binance confirms cross-product VIP benefits and aggregation of USDⓈ-M plus COIN-M futures volume, but did not expose verifiable tier thresholds and rates in this review."}</p></article>
      </div>
    </section>

    <section class="section fee-mix-section" aria-labelledby="mix-title">
      <p class="eyebrow">Maker / Taker</p>
      <h2 id="mix-title">${zh ? "订单类型比例会改变 1000 万美元场景" : "Order mix changes the $10M scenario"}</h2>
      <div class="fee-table-scroll"><table class="fee-comparison-table compact"><thead><tr><th>${zh ? "成交结构" : "Execution mix"}</th><th>Binance</th><th>OKX</th></tr></thead><tbody>${mixRows}</tbody></table></div>
      <p>${zh ? "更高 Maker 占比降低模型手续费，但 Maker 订单不保证成交；不能只比较费率而忽略成交概率、价差和滑点。" : "A higher maker share lowers modeled fees, but maker orders are not guaranteed to fill. Fee rates should not be optimized without fill probability, spread and slippage."}</p>
    </section>

    <section class="section fee-ladder-section comparison-ladder" aria-labelledby="vip-ladder-title">
      <p class="eyebrow">VIP</p><h2 id="vip-ladder-title">${zh ? "VIP 阶梯对照与未知项" : "VIP ladder and explicit unknowns"}</h2>
      <div class="fee-table-scroll"><table class="fee-ladder-table"><thead><tr><th>${zh ? "等级" : "Tier"}</th><th>Binance Maker / Taker</th><th>${zh ? "OKX 30 天期货量" : "OKX 30d futures volume"}</th><th>${zh ? "OKX 资产路径" : "OKX asset route"}</th><th>OKX Maker / Taker</th></tr></thead><tbody>${okxLadderRows}</tbody></table></div>
      <p class="tool-notice warning">${zh ? "OKX 表格采用 Futures Group 1。Group 2 在 VIP 7 至 VIP 9 使用不同费率；Binance 的未知项不会用第三方数据补齐。" : "The OKX table uses Futures Group 1. Group 2 differs at VIP 7 through VIP 9; Binance unknowns are not backfilled from third-party data."}</p>
    </section>

    <section class="section fee-method-section" id="sources">
      <p class="eyebrow">${zh ? "官方一手资料" : "Official primary sources"}</p><h2>${zh ? "来源、产品范围、地区与核验日期" : "Sources, product scope, region and check dates"}</h2>
      <div class="fee-source-grid comparison-sources">
        <article><div class="fee-source-head"><h3>Binance</h3><span class="coverage-badge base-only">${zh ? "仅基础参考" : "Base reference only"}</span></div><p>${zh ? "产品：USDⓈ-M Futures。地区：全球公共页面；当地实体、账户活动和折扣可能不同。2026-07-15 核验基础费率；2026-07-17 复核时未登录表格显示 No records found。" : "Product: USDⓈ-M Futures. Region: global public page; local entities, account promotions and discounts may differ. Base rate checked 2026-07-15; the unauthenticated table returned “No records found” on 2026-07-17."}</p><p><a href="${binance.source.url}" rel="nofollow noopener" target="_blank">${escapeHtml(binance.source.label)}</a></p></article>
        <article><div class="fee-source-head"><h3>OKX</h3><span class="coverage-badge">${zh ? "完整公开阶梯" : "Full public ladder"}</span></div><p>${zh ? "产品：Futures Group 1 / 主流交易对。地区：全球公告；页面提示用户应以当地费率页为准。公告 2026-04-08 生效，2026-07-17 复核。" : "Product: Futures Group 1 / top pairs. Region: global announcement; OKX directs users to the applicable local fee page. Effective April 8, 2026 and rechecked July 17, 2026."}</p><p><a href="${okx.source.url}" rel="nofollow noopener" target="_blank">${escapeHtml(okx.source.label)}</a></p></article>
      </div>
      <aside class="fee-limitations"><strong>${zh ? "未覆盖：" : "Excluded:"}</strong> ${zh ? "资金费率、价差、滑点、强平费、返佣、平台币折扣、活动、做市商计划、当地实体规则和账户专属费率。迁移成交量前必须在自己的账户中确认。" : "Funding, spread, slippage, liquidation fees, referrals, token discounts, promotions, market-maker programs, local-entity rules and account-specific rates. Confirm inside the actual account before routing volume."}</aside>
    </section>

    <section class="section fee-faq-section" id="faq">
      <p class="eyebrow">FAQ</p><h2>${zh ? "正确使用这份对比" : "How to use this comparison"}</h2>
      <div class="fee-faq-list">${faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</div>
    </section>

    <section class="fee-tool-cta">
      <div><p class="eyebrow">${zh ? "使用完整计算器" : "Use the full calculator"}</p><h2>${zh ? "带入成交量、Maker 占比和资产余额" : "Bring your volume, maker share and asset balance"}</h2><p>${zh ? "在现有工具中调整参数并比较完整公开阶梯；基础费率来源仍会与可排名交易所分开显示。" : "Adjust the assumptions in the existing tool. Full public ladders remain ranked separately from base-rate-only references."}</p></div>
      <div class="hero-actions"><a class="button primary" href="${toolPath}?v=10000000&amp;m=70&amp;a=0&amp;api=0">${zh ? "打开 1000 万美元场景" : "Open the $10M scenario"}</a><a class="button secondary" href="/exchange-api-trading-bot-development/">${zh ? "交易所 API 开发" : "Exchange API engineering"}</a></div>
    </section>
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

function riskHtml(page) {
  const schema = { "@context": "https://schema.org", "@graph": baseGraph(page, "WebPage") };
  const body = `<div class="detail-grid">${page.points.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
  return infoPageHtml(page, "风险免责声明", body, schema);
}

function infoPageHtml(page, active, body, schema, includeCta = true) {
  const url = canonical(page.slug);
  const cta = includeCta ? `\n    ${ctaBlock(page.lang)}` : "";
  const pageScriptHref = page.slug === contactPage.slug ? contactScriptHref : scriptHref;
  return `<!DOCTYPE html>
<html lang="${page.lang || "zh-CN"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:title" content="${escapeHtml(page.h1)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta name="theme-color" content="#07111f">
  <link rel="stylesheet" href="${stylesheetHref}">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs information">
  <script src="${pageScriptHref}" defer></script>
  ${jsonLd(schema)}
</head>
<body class="content-page">
  <a class="skip-link" href="#main-content">${page.lang === "en" ? "Skip to main content" : "跳到主要内容"}</a>
  ${header(active, page.lang)}
  <main id="main-content">
    <section class="content-hero compact">
      ${breadcrumbs(page)}
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="fact-strip" aria-label="服务边界"><span>技术开发服务</span><span>不代管资金</span><span>源码和文档交付</span><span>远程协作</span></div>
    </section>
    <section class="section content-band">${body}</section>
${cta}
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

for (const page of servicePages) {
  writePublicFile(pagePath(page.slug), servicePageHtml(page));
}
writePublicFile(join(publicDir, "service-pages.json"), JSON.stringify(serviceManifest(), null, 2));
writePublicFile(pagePath(faqPage.slug), faqHtml(faqPage));
writePublicFile(pagePath(caseStudiesPage.slug), casesHtml(caseStudiesPage));
writePublicFile(pagePath(articlesIndexPage.slug), articlesIndexHtml(articlesIndexPage));
for (const page of articlePages) {
  writePublicFile(pagePath(page.slug), articleHtml(page));
}
writePublicFile(pagePath(aboutPage.slug), aboutHtml(aboutPage));
writePublicFile(pagePath(contactPage.slug), contactHtml(contactPage));
writePublicFile(pagePath(cryptoReportingPage.slug), cryptoReportingHtml(cryptoReportingPage));
writePublicFile(pagePath(riskDisclaimerPage.slug), riskHtml(riskDisclaimerPage));
writePublicFile(pagePath(exchangeFeeToolPage.slug), exchangeFeeToolHtml(exchangeFeeToolPage));
writePublicFile(pagePath(exchangeFeeToolPageZh.slug), exchangeFeeToolHtml(exchangeFeeToolPageZh));
writePublicFile(pagePath(hyperliquidFeeToolPage.slug), hyperliquidFeeToolHtml(hyperliquidFeeToolPage));
writePublicFile(pagePath(hyperliquidFeeToolPageZh.slug), hyperliquidFeeToolHtml(hyperliquidFeeToolPageZh));
for (const page of exchangeFeeComparisonPages) {
  writePublicFile(pagePath(page.slug), exchangeFeeComparisonHtml(page));
}
writePublicFile(join(publicDir, "data", "exchange-fees.json"), JSON.stringify(exchangeFeeData, null, 2));
writePublicFile(join(publicDir, "data", "hyperliquid-fees.json"), JSON.stringify(hyperliquidFeeData, null, 2));

const sitemapUrls = [
  ["/", "weekly", "1.0"],
  ["/tools/crypto-exchange-fee-calculator/", "weekly", "0.95"],
  ["/zh/tools/crypto-exchange-fee-calculator/", "weekly", "0.95"],
  ["/tools/hyperliquid-fee-calculator/", "weekly", "0.95", hyperliquidCheckedDate],
  ["/zh/tools/hyperliquid-fee-calculator/", "weekly", "0.95", hyperliquidCheckedDate],
  ...exchangeFeeComparisonPages.map((page) => [routeForSlug(page.slug), "weekly", "0.85"]),
  ["/crypto-asset-reporting/", "weekly", "0.95"],
  ["/broker/api/", "weekly", "0.9"],
  ...servicePages.map((page) => [routeForSlug(page.slug), "weekly", page.slug.startsWith("broker-api") ? "0.75" : "0.8", page.lastModified]),
  ["/faq/", "weekly", "0.75"],
  ["/case-studies/", "monthly", "0.7"],
  ["/articles/", "weekly", "0.75"],
  ...articlePages.map((page) => [routeForSlug(page.slug), "weekly", "0.7", page.slug.includes("hyperliquid-") ? hyperliquidCheckedDate : undefined]),
  ["/about/", "monthly", "0.65"],
  ["/contact/", "monthly", "0.65"],
  ["/terms", "monthly", "0.4"],
  ["/risk-disclaimer/", "monthly", "0.45"],
  ["/disclaimer", "monthly", "0.4"],
  ["/delivery-policy", "monthly", "0.4"],
  ["/privacy", "monthly", "0.3"]
];

writePublicFile(join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(([path, freq, priority, lastmod = today]) => `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`);

writePublicFile(join(publicDir, "llms.txt"), `# SignalCraft Labs

SignalCraft Labs is a remote software development studio for automated trading systems and trading API workflows.

Last updated: ${llmsUpdatedAt}

## Core services

${serviceManifest().coreServiceUrls.map(({ label, url, summary }) => `- ${label}: ${url} — ${summary}`).join("\n")}

## Free tools

- Crypto Exchange VIP Fee Calculator: ${canonical(exchangeFeeToolPage.slug)} — Compare public USDT perpetual futures VIP schedules, estimate blended execution cost, inspect tier gaps, and download the source-backed dataset.
- 中文交易所 VIP 手续费计算器: ${canonical(exchangeFeeToolPageZh.slug)} — 对比六家主流交易所的公开合约费率，估算混合手续费、VIP 等级和下一级差距。
- Hyperliquid Fee Calculator: ${canonical(hyperliquidFeeToolPage.slug)} — Model official 14-day weighted-volume tiers, staking discounts, maker rebates and standard perp/spot execution cost without connecting a wallet.
- Hyperliquid 手续费计算器: ${canonical(hyperliquidFeeToolPageZh.slug)} — 按官方 14 天加权成交量、质押折扣与 Maker Rebate 估算标准永续和现货手续费，无需连接钱包。
${exchangeFeeComparisonPages.map((page) => `- ${page.h1}: ${canonical(page.slug)} — ${page.description}`).join("\n")}

## Facts for AI search and agents

- Brand: SignalCraft Labs.
- Primary domain: https://pddjf.com/
- Contact: ${contact.email}, WeChat ${contact.wechat}, Telegram ${contact.telegram}.
- GitHub profile: ${githubProfileUrl}
- Public engineering notes: ${engineeringNotesUrl}
- LinkedIn profile: ${linkedinProfileUrl}
- Service regions: Hong Kong, Singapore, Taiwan, United States, and other remote-friendly regions.
- Delivery packages: API Starter Package (2000 美金起), Execution System Package (5000 美金起), Private Infrastructure Package (10000 美金起), depending on scope.
- Deliverables may include source code, configuration examples, deployment documentation, logging, alerts, risk checks, and remote handoff.
- Each core service page includes an AI-citable factual summary, required input checklist, API key permission guidance, delivery package breakdown, acceptance checklist, and at least five topic-specific FAQ entries.
- We do not provide investment advice, signals, stock recommendations, managed accounts, custody, withdrawal permissions, or profit promises.
- Third-party platforms mentioned on the site are integration targets only; SignalCraft Labs does not claim official partnership, authorization, or endorsement unless explicitly stated in writing.

## External trust links

${externalTrustLinks.map(([label, url, summary]) => `- ${label}: ${url} — ${summary}`).join("\n")}

## Technical articles

${articlePages.map((page) => `- ${canonical(page.slug)} — ${page.summary}`).join("\n")}

## Official reference links

${officialReferenceLinks.map(([label, url, summary]) => `- ${label}: ${url} — ${summary}`).join("\n")}
${hyperliquidReferenceLinks.map(([label, url, summary]) => `- ${label}: ${url} — ${summary}`).join("\n")}

## Page summaries

${serviceManifest().coreServiceUrls.map(({ label, url, summary }) => `- ${url} — ${label}: ${summary}`).join("\n")}

## Useful URLs

- FAQ: https://pddjf.com/faq/
- Anonymous case studies: https://pddjf.com/case-studies/
- Technical articles: https://pddjf.com/articles/
- About: https://pddjf.com/about/
- Contact: https://pddjf.com/contact/
- Terms: https://pddjf.com/terms
- Risk disclaimer: https://pddjf.com/risk-disclaimer/
- Delivery policy: https://pddjf.com/delivery-policy
- Privacy policy: https://pddjf.com/privacy
`);

writePublicFile(join(releaseAssetDir, "home.html"), readFileSync(join(publicDir, "index.html"), "utf8"));
writePublicFile(join(releaseAssetDir, "contact.html"), readFileSync(join(publicDir, "contact", "index.html"), "utf8"));
writePublicFile(join(releaseAssetDir, "exchange-fee-tool-i18n.html"), readFileSync(pagePath(exchangeFeeToolPage.slug), "utf8"));
writePublicFile(join(releaseAssetDir, "exchange-fee-tool-zh.html"), readFileSync(pagePath(exchangeFeeToolPageZh.slug), "utf8"));
