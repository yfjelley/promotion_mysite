import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const today = "2026-07-07";
const site = "https://pddjf.com";
const stylesheetHref = "/styles.css?v=20260707-organic";
const scriptHref = "/scripts.js?v=20260707-organic";
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

const officialReferenceLinks = [
  ["TradingView Webhook alerts", "https://www.tradingview.com/support/solutions/43000529348-how-to-configure-webhook-alerts/", "TradingView 官方 Webhook alert 说明。"],
  ["IBKR API documentation", "https://www.interactivebrokers.com/campus/ibkr-api-page/ibkr-api-home/", "Interactive Brokers 官方 API 文档入口，覆盖 TWS API、Web API、Excel API 和 FIX。"],
  ["Schwab Trader API", "https://developer.schwab.com/products/trader-api--individual", "Charles Schwab 官方 Trader API 产品入口。"],
  ["Alpaca Docs", "https://docs.alpaca.markets/us/", "Alpaca 官方 API 文档入口。"],
  ["FIX Trading Community", "https://fixtrading.org/standards/fix-protocol/", "FIX Trading Community 的 FIX Protocol 标准介绍。"],
  ["Binance Developer Docs", "https://developers.binance.com/docs/binance-spot-api-docs/rest-api/general-api-information", "Binance 官方开发者文档入口，覆盖 REST API 基础信息、限制和接口行为。"]
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
  "broker-api/ibkr": [
    ["Connection model", "Evaluate TWS Gateway / Client Portal runtime, reconnect behavior, session lifecycle and account login flow.", "Stable connection, disconnect alerts and no duplicate routing after reconnect."],
    ["Orders and positions", "Confirm stocks, ETFs, options or portfolio order types, trading hours, cancel flow and execution report fields.", "Order requests, rejects, cancels, fills and position sync are logged."],
    ["Common errors", "Handle disconnects, missing permissions, missing data subscriptions, unsupported order types and trading-hour restrictions.", "Errors are classified with alerts, pause controls and rollback steps."]
  ],
  "fix-api-order-routing": [
    ["Session management", "Confirm FIX version, SenderCompID/TargetCompID, heartbeat, sequence numbers, reset rules and recovery behavior.", "UAT validates login, heartbeat, reconnect, sequence recovery and logout."],
    ["Message fields", "Map NewOrderSingle, Cancel, ExecutionReport, Reject and counterparty-specific tags.", "Raw FIX messages, normalized status and field-level errors are preserved."],
    ["Go-live constraints", "Confirm test environment, certificates, network, allowlists, approval timeline and UAT scripts early.", "Staged rollout, rollback, monitoring and manual pause are verified before production use."]
  ]
};

const servicePages = [
  {
    slug: "tradingview-webhook-automation",
    breadcrumb: "TradingView Webhook 自动化",
    eyebrow: "TradingView Webhook Automation",
    title: "TradingView Webhook 自动交易系统开发 | 信号解析、风控、下单与告警",
    description: "TradingView Webhook 自动交易系统开发，把 Alert 信号接入去重、风控、订单路由、日志审计、告警和私有化部署。",
    h1: "TradingView Webhook 自动交易系统开发",
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
  }
];

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
      exclusions: "不评价信号盈利能力，不提供跟单服务，不保证成交价格、滑点、胜率或收益。"
    },
    {
      title: "券商 API 订单计划与人工确认",
      problem: "客户希望把目标权重、持仓同步和订单生成串起来，但订单发送前仍需要人工确认和审计记录。",
      constraints: "券商权限、订单类型和可交易品种以平台为准；发送订单前必须展示现金约束、敞口变化和潜在拒单原因。",
      solution: "持仓同步 -> 目标权重输入 -> 订单计划 -> 交易前风险摘要 -> 人工确认 -> 券商 API -> 执行回报同步 -> 审计日志。",
      deliverables: "订单计划脚本或轻后台、券商 API adapter、确认节点、执行回报映射、日志字段说明、测试样例和交接文档。",
      acceptance: "用 paper 或小额测试路径验证计划生成、确认前不下单、拒单/撤单/成交状态同步、日志留痕和权限最小化。",
      exclusions: "不提供荐股、调仓建议、投资组合建议或账户托管；客户自行确认订单和承担投资决策。"
    },
    {
      title: "交易所 API DCA/Grid 执行与异常熔断",
      problem: "客户已有 DCA 或 Grid 规则，希望系统按配置执行，并在接口异常、精度错误或风险超限时自动停下。",
      constraints: "交易所限频、价格精度、数量精度、最小名义金额和市场状态会影响订单；API Key 仍采用最小必要权限。",
      solution: "规则配置 -> 数量和精度标准化 -> 风控检查 -> 订单状态监听 -> 重试上限 -> 异常熔断 -> 告警和运行日志。",
      deliverables: "规则配置样例、交易所 connector、风控拒单原因表、状态日志、告警配置、部署 runbook 和上线验收脚本。",
      acceptance: "模拟最大层数、冷却窗口、价格保护、API 超时、部分成交和接口拒单，验证暂停、重试、熔断和日志行为。",
      exclusions: "不承诺套利机会、交易收益、手续费优势或滑点结果；不需要提现、划转或账户管理员权限。"
    },
    {
      title: "私有化部署、监控告警与交接",
      problem: "客户希望源码、配置、日志和告警都运行在自己控制的 VPS 或云环境中，并能在交接后自行重启和排障。",
      constraints: "服务器、密钥和第三方账户由客户保管；初始交付不包含无限期运维；重启、回滚、密钥轮换和日志位置必须清楚。",
      solution: "Docker 或进程守护 -> 环境变量 -> 服务健康检查 -> 日志轮转 -> 告警渠道 -> 备份/回滚说明 -> 远程交接。",
      deliverables: "源码、.env.example、部署配置、进程守护配置、日志路径、告警设置、incident checklist 和远程讲解记录。",
      acceptance: "从干净环境完成部署，演示重启、回滚、告警测试、日志查询、密钥轮换检查和暂停开关。",
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

const allGeneratedPages = [
  ...servicePages,
  faqPage,
  caseStudiesPage,
  articlesIndexPage,
  ...articlePages,
  aboutPage,
  contactPage,
  cryptoReportingPage,
  riskDisclaimerPage
];

const navLinks = [
  ["/#products", "数字产品"],
  ["/#services", "定制工程"],
  ["/broker/api/", "券商 API"],
  ["/#packages", "交付包"],
  ["/articles/", "资料"],
  ["/case-studies/", "案例"],
  ["/about/", "关于"],
  ["/contact/", "联系"]
];

const footerServiceLinks = [
  ["/crypto-asset-reporting/", "Crypto Asset Reporting"],
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
  ["/case-studies/", "Cases"],
  ["/about/", "About"],
  ["/contact/", "Contact"]
];

const footerServiceLinksEn = [
  ["/crypto-asset-reporting/", "Crypto Asset Reporting"],
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
  const [lead] = String(value).split(/[，。、]/);
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
  return `<footer class="site-footer">
    <p><strong>SignalCraft Labs</strong> ${english ? "trading automation digital products and custom engineering studio" : "交易自动化数字产品与定制工程服务工作室"}</p>
    <nav aria-label="${english ? "Service page navigation" : "服务页导航"}">
      ${serviceLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
    </nav>
    <nav aria-label="${english ? "Policy page navigation" : "政策页导航"}">
      ${policyLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n      ")}
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
        { "@type": "ListItem", "position": 1, "name": "首页", "item": `${site}/` },
        { "@type": "ListItem", "position": 2, "name": page.breadcrumb, "item": url }
      ]
    }
  ];
}

function serviceSchema(page) {
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
        "areaServed": ["香港", "新加坡", "台湾", "美国", "全球远程"],
        "offers": {
          "@type": "OfferCatalog",
          "name": "自动交易系统工程交付包",
          "itemListElement": offers.map((offer) => ({
            "@type": "Offer",
            "name": offer.name,
            "priceCurrency": "USD",
            "price": offer.price,
            "description": offer.description,
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
    comparisonTable(english ? "Pre-contact checklist" : "联系前资料清单", english ? "Without these inputs, the work can only be directionally assessed." : "没有这些资料时，只能做方向评估，不能准确判断交付包或承诺接口可行性。", english ? baseInputRowsEn : baseInputRows),
    comparisonTable(english ? "API key minimum permission guidance" : "API Key 最小权限建议", english ? "Use only the permissions required for the project and avoid withdrawal, transfer or unrelated admin access." : "默认只使用项目必要权限，避免提现、划转和无关管理员权限。", english ? permissionRowsEn : permissionRows, english ? ["Permission", "Recommendation", "Reason"] : ["权限", "建议", "原因"]),
    comparisonTable(english ? "Delivery package breakdown" : "交付包范围拆解", english ? "Package scope depends on API count, risk complexity, dashboard scope, deployment and integration work." : "交付包不是按页面文案报价，而是按接口、风控、后台、部署和联调复杂度确认范围。", packageRows, english ? ["Package tier", "Suitable scope"] : ["交付包", "适合范围"]),
    comparisonTable(english ? "Launch acceptance checklist" : "上线验收清单", english ? "Acceptance is based on engineering delivery and workflow behavior, not strategy returns." : "验收看工程交付和执行链路，不把策略收益、胜率或回撤作为软件验收标准。", english ? acceptanceRowsEn : acceptanceRows)
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
  return `<section class="section external-trust-section" aria-labelledby="external-trust-title">
      <div class="section-head">
        <p class="eyebrow">External Evidence</p>
        <h2 id="external-trust-title">${english ? "External trust materials" : "站外信任资料"}</h2>
        <p>${english ? "These public materials help verify the brand, service boundary, engineering delivery style and sanitized technical examples." : "这些公开资料用于交叉验证品牌、服务边界、工程交付方式和脱敏技术样例。"}</p>
      </div>
      <div class="external-trust-grid">
        ${externalTrustLinks.map(([label, href, summary]) => `<a href="${href}" rel="me noopener" target="_blank"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(summary)}</span></a>`).join("")}
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-975458180"></script>
  <script src="${scriptHref}" defer></script>
  ${jsonLd(serviceSchema(page))}
</head>
<body class="content-page">
  ${header(activeLabel, page.lang)}
  <main>
    <section class="content-hero">
      ${breadcrumbs(page)}
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="hero-lede">${escapeHtml(page.intro)}</p>
      <div class="hero-actions">
        <a class="button primary" href="/contact/" data-contact="content_hero_contact">${english ? "Send project brief" : "提交项目 Brief"}</a>
        <a class="button secondary" href="#deliverables">${english ? "View deliverables" : "查看交付内容"}</a>
      </div>
      <nav class="mobile-quick-links" aria-label="${english ? "Mobile quick links" : "移动端快速入口"}">
        <a href="#fit">${english ? "Fit" : "适合谁"}</a>
        <a href="#deliverables">${english ? "Deliverables" : "交付"}</a>
        <a href="#faq">FAQ</a>
        <a href="/contact/">${english ? "Contact" : "联系"}</a>
      </nav>
      <div class="fact-strip" aria-label="项目交付包和服务边界">
        <span>${english ? "Packages: USD 2,000 / 5,000 / 10,000+" : "交付包：2000 / 5000 / 10000 美金起"}</span>
        <span>${english ? "Source delivery" : "源码交付"}</span>
        <span>${english ? "Private deployment" : "私有部署"}</span>
        <span>${english ? "No custody" : "不代管资金"}</span>
      </div>
    </section>

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
      <div class="pricing-grid">${offers.map((offer) => `<article${offer.name === "Execution System Package" ? ' class="featured"' : ""}><h3>${offer.name}</h3><p>${escapeHtml(english ? packageDescriptionsEn[offer.name] : offer.description)}</p><strong class="price">${english ? offer.label.replace(" 美金起", " USD+") : offer.label}</strong><a class="button ${offer.name === "Execution System Package" ? "primary" : "secondary"}" href="/contact/" data-contact="content_package_${offer.name.toLowerCase().replaceAll(" ", "_")}">${english ? "Assess this package" : "评估这个交付包"}</a></article>`).join("")}</div>
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

    ${caseBridgeSection(page.lang)}

    ${externalTrustSection(page.lang)}

    <section id="faq" class="section faq-section">
      <div class="section-head centered">
        <p class="eyebrow">FAQ</p>
        <h2>常见问题</h2>
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

    ${ctaBlock(page.lang)}
  </main>
  ${footer(page.lang)}
</body>
</html>`;
}

function ctaBlock(language = "zh-CN") {
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
      </div>
    </section>`;
}

function caseBridgeSection(language = "zh-CN") {
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
        <a class="button secondary" href="/contact/" data-contact="service_case_brief">${english ? "Send a similar brief" : "按类似案例发 Brief"}</a>
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
        "description": `${study.problem} ${study.constraints} ${study.solution} ${study.deliverables} ${study.acceptance} ${study.exclusions}`,
        "isPartOf": { "@id": `${canonical(page.slug)}#webpage` }
      }))
    ]
  };
  const body = `<div class="case-study-grid expanded-cases">${page.studies.map((study, index) => `<article id="case-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(study.title)}</h3><strong>问题</strong><p>${escapeHtml(study.problem)}</p><strong>约束</strong><p>${escapeHtml(study.constraints)}</p><strong>解决方案</strong><p>${escapeHtml(study.solution)}</p><strong>交付物</strong><p>${escapeHtml(study.deliverables)}</p><strong>验收方式</strong><p>${escapeHtml(study.acceptance)}</p><strong>不包含什么</strong><p>${escapeHtml(study.exclusions)}</p><a class="case-link" href="/contact/" data-contact="case_study_${index + 1}">用这个案例发 Brief</a></article>`).join("")}</div>
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
        "datePublished": today,
        "dateModified": today,
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
        "datePublished": today,
        "dateModified": today,
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
      <section>
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
  return `<form class="brief-form" data-mailto-brief data-mailto-recipient="${contact.email}" data-mailto-subject="SignalCraft Labs project brief" data-contact="structured_brief_submit">
      <div class="form-grid">
        <label>项目类型
          <select name="projectType" data-brief-label="Project type" required>
            <option value="">请选择</option>
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
          <input name="contactMethod" data-brief-label="Preferred contact method" required placeholder="邮箱 / 微信 / Telegram">
        </label>
      </div>
      <label>风控边界
        <textarea name="riskBoundary" data-brief-label="Risk boundary" required placeholder="最大仓位、单笔风险、只减仓、暂停开关、价格偏离、告警和人工确认边界。"></textarea>
      </label>
      <label>补充说明
        <textarea name="notes" data-brief-label="Additional notes" placeholder="可以写交易品种、订单类型、失败处理、是否需要后台、源码交付或私有部署。"></textarea>
      </label>
      <div class="form-actions">
        <button class="button primary" type="submit">生成邮件并提交 Brief</button>
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
        <p>先用表单整理项目类型、信号来源、API 权限、风控边界、部署环境、预算档位和联系方式。只有有效提交会计入咨询转化。</p>
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

function riskHtml(page) {
  const schema = { "@context": "https://schema.org", "@graph": baseGraph(page, "WebPage") };
  const body = `<div class="detail-grid">${page.points.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}</div>`;
  return infoPageHtml(page, "风险免责声明", body, schema);
}

function infoPageHtml(page, active, body, schema, includeCta = true) {
  const url = canonical(page.slug);
  const cta = includeCta ? `\n    ${ctaBlock(page.lang)}` : "";
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-975458180"></script>
  <script src="${scriptHref}" defer></script>
  ${jsonLd(schema)}
</head>
<body class="content-page">
  ${header(active, page.lang)}
  <main>
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

const sitemapUrls = [
  ["/", "weekly", "1.0"],
  ["/crypto-asset-reporting/", "weekly", "0.95"],
  ["/broker/api/", "weekly", "0.9"],
  ...servicePages.map((page) => [routeForSlug(page.slug), "weekly", page.slug.startsWith("broker-api") ? "0.75" : "0.8"]),
  ["/faq/", "weekly", "0.75"],
  ["/case-studies/", "monthly", "0.7"],
  ["/articles/", "weekly", "0.75"],
  ...articlePages.map((page) => [routeForSlug(page.slug), "weekly", "0.7"]),
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
${sitemapUrls.map(([path, freq, priority]) => `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`);

writePublicFile(join(publicDir, "llms.txt"), `# SignalCraft Labs

SignalCraft Labs is a remote software development studio for automated trading systems and trading API workflows.

Last updated: ${today}

## Core services

${serviceManifest().coreServiceUrls.map(({ label, url, summary }) => `- ${label}: ${url} — ${summary}`).join("\n")}

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
