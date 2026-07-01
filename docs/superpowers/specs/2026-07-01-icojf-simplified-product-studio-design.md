# ICOJF 简体中文产品工作室站点设计规格

日期：2026-07-01
状态：已确认方向，等待用户审阅后进入实施计划

## 目标

把 `icojf.com` 从基础软件外包落地页升级为独立的简体中文软件产品工作室站点。站点要面向香港、新加坡、台湾、日本及海外中文客户，主打 SaaS MVP、API Integration、Workflow Automation 和企业内部工具开发。

这个站点必须和 `pddjf.com` 明确分开：

- `icojf.com`：软件产品工作室、软件外包、API 集成、SaaS MVP、业务自动化。
- `pddjf.com`：TradingView webhook、Broker API、Exchange API 等交易自动化服务。
- 两个站点不互相共享广告最终 URL，不把 `icojf.com` 做成 `pddjf.com/icojf/` 子目录。

## 定位

主定位：**简体中文软件产品工作室**。

站点语气要专业、克制、国际化，不使用低价外包站常见表达。避免：

- “低价开发”
- “快速仿站”
- “包满意”
- “全行业都能做”
- “保证增长 / 保证融资 / 保证转化”

推荐表达：

- 软件产品工作室
- API 集成开发
- SaaS MVP 开发
- 业务流程自动化
- 企业内部工具开发
- 源码、部署文档、运行手册、验收清单交付
- 面向香港、新加坡、台湾、日本及海外中文客户

## 语言策略

第一阶段使用简体中文作为主站语言。

写法规则：

- 页面正文用简体中文。
- 技术词保留英文，例如 `SaaS MVP`、`API Integration`、`Workflow Automation`、`Webhook`、`OAuth`、`Runbook`、`Source Code`。
- 使用国际中文商业语气，避免明显大陆低价外包平台语感。
- 地区描述写“香港、新加坡、台湾、日本及海外中文客户”，不把中国大陆列为服务地区。
- 如果后续香港或台湾广告数据表现好，再补繁体落地页，而不是第一阶段同时维护两套语言。

## 信息架构

第一阶段保留紧凑结构，先把核心页面做深，不急着增加大量 URL。

核心页面：

- `/`：首页，负责品牌定位、能力地图、案例笔记、交付流程、信任边界和主 CTA。
- `/api-integration-development/`：API 集成开发服务页。
- `/mvp-saas-development/`：SaaS MVP 开发服务页。
- `/business-process-automation/`：业务流程自动化服务页。
- `/contact/`：项目评估与联系页面。
- `/terms`、`/privacy`、`/404`：保留基础合规页面。

后续可以新增但不纳入第一阶段：

- `/case-notes/`：脱敏案例笔记集合。
- `/security-handover/`：源码、权限、安全、交接说明。
- 地区或行业页，例如 `/hong-kong-software-development/`、`/singapore-saas-mvp/`，但必须等广告或 Search Console 数据证明有需求后再做。

## 首页设计

首页第一屏要传达三个信号：

1. ICOJF 是独立的软件产品工作室。
2. 服务对象是海外中文客户，而不是泛泛的软件外包市场。
3. 交付内容是可维护的软件系统，不只是页面或一次性脚本。

推荐首屏文案：

- Eyebrow：`Software Product Studio`
- H1：`为中文团队设计、开发、交付可维护的软件产品。`
- Supporting copy：`ICOJF 面向香港、新加坡、台湾、日本及海外中文客户，提供 SaaS MVP、API Integration、Workflow Automation 与企业内部工具开发。`
- Primary CTA：`提交项目简述`
- Secondary CTA：`查看服务能力`

首页主视觉使用产品工作室风格的系统界面，而不是抽象插画或传统咨询公司照片。视觉内容可以是：

- 项目交付模型
- Workflow 列表
- MVP 进度卡片
- 交接资产标签：`Source Code`、`Runbook`、`Logs`
- 四步流程：`Brief`、`Prototype`、`Build`、`Launch`

首页阅读顺序：

1. 首屏定位与 CTA。
2. 服务能力地图：SaaS MVP、API Integration、Workflow Automation、Internal Tools。
3. 案例笔记：用脱敏方式展示问题、限制、架构、交付物、验收方式，不写夸大商业结果。
4. 交付流程：Brief、Prototype、Build、Launch、Handover。
5. 安全与边界：权限、源码、部署、日志、保密、第三方平台限制。
6. 联系 CTA：提交项目背景、现有系统、目标、预算范围和期望时间。

## 服务页设计

每个服务页必须针对独立搜索或广告意图，不只是替换关键词。

服务页标准结构：

1. 这个服务适合谁。
2. 常见问题和业务场景。
3. 交付物清单。
4. 技术实现表。
5. 验收标准。
6. 安全和边界。
7. FAQ。
8. 联系 CTA。

### API 集成开发页

重点内容：

- 第三方 SaaS、支付、CRM、ERP、邮件短信、物流、数据平台、内部系统接口。
- `OAuth`、`API Key`、`Webhook`、`Rate Limit`、`Retry Queue`、`Audit Log`、`Error Handling`。
- API 权限最小化、密钥保管、失败重试、日志留存。
- 验收方式：沙盒环境、测试账号、请求日志、失败场景、回滚方式。

### SaaS MVP 开发页

重点内容：

- 产品范围拆解、用户流程、角色权限、后台管理、数据模型、部署上线。
- 明确 MVP 不是完整大平台，而是可验证的第一版产品。
- 交付物：前端、后端、数据库结构、基础权限、管理后台、部署说明、运行手册。
- 验收方式：核心流程可跑通、权限正确、关键数据可追踪、文档能支持移交。

### 业务流程自动化页

重点内容：

- 表格处理、审批、报表、提醒、跨系统同步、人工复核。
- 自动化必须保留失败处理和人工介入路径。
- 交付物：流程图、自动任务、异常队列、通知规则、日志视图。
- 验收方式：样例数据、边界数据、失败场景、重复执行、权限校验。

## 联系页设计

联系页要减少低质量询盘，让客户在发送邮件前知道需要准备什么。

页面内容：

- 项目类型：SaaS MVP、API Integration、Workflow Automation、Internal Tools。
- 服务地区：香港、新加坡、台湾、日本及海外中文客户。
- 建议提供资料：项目背景、现有系统、目标用户、接口文档、预算范围、期望上线时间。
- 合作前置条件：能提供需求负责人、测试账号或接口文档、接受分阶段交付和验收。
- 不适合的项目：极低预算、没有明确负责人、只要求复制竞品、不接受阶段验收或文档交接。

## 视觉系统

风格关键词：

- 产品工作室
- 技术可信
- 清爽、克制、系统化
- 有界面感，但不花哨

推荐视觉处理：

- 使用白色、浅灰、深蓝黑作为基础。
- 主强调色使用专业蓝，少量使用绿色或琥珀色区分状态。
- 页面中可以出现系统面板、流程卡片、能力表、验收表。
- 卡片圆角保持克制，避免过度圆润。
- 不使用渐变球、装饰性光斑、抽象 SVG 插画作为主要视觉。
- 首屏主视觉应该像真实系统界面或交付模型，而不是营销插图。

## SEO / GEO 要求

基础 SEO：

- 每页 title 和 description 唯一。
- canonical 指向 `https://icojf.com/...`。
- sitemap 包含所有公开页面。
- robots 策略与站点分离，不混入 `pddjf.com` 的交易自动化语义。
- JSON-LD 使用 Organization、Service、Breadcrumb、ContactPage 等合适结构。

内容要求：

- 首页和服务页都要有明确服务地区。
- 不列中国大陆为服务地区。
- 服务页必须有事实密度：清单、表格、验收标准、FAQ。
- 文案避免空泛的“专业团队、快速交付、全流程服务”，要写具体交付物和限制。

GEO / AI 引用友好：

- 每个核心页顶部保留事实摘要区。
- 使用表格说明适合项目、交付物、客户需提供资料、不适合情况。
- FAQ 用可直接引用的问答句式。
- 明确交付边界，避免 AI 摘要误读为保证商业结果。

## 转化路径

第一阶段不新增复杂后端表单，优先使用稳定联系方式：

- 主要 CTA 指向 `/contact/` 或 `mailto:contact@icojf.com`。
- 联系页列出项目简述模板，鼓励用户按模板发邮件。
- 后续如果广告有稳定点击，再评估是否增加表单、CRM 或预约工具。

转化质量优先于数量。站点应该筛掉不合适项目，而不是吸引所有外包询盘。

## 技术实现边界

当前站点是静态站点，由 Cloudflare Pages/Worker 根据 Host 分流：

- `icojf.com` 服务 `public/icojf/`。
- `pddjf.com` 服务交易自动化站点。
- `promotion-mysite.pages.dev` 不作为广告最终 URL。

实施时应修改 `public/icojf/` 内页面和样式，不改 `pddjf.com` 的交易站内容。除非路由或 sitemap 需要同步，否则不要改 `public/_worker.js`。

## 错误处理和边界情况

实施后要验证：

- `https://icojf.com/` 返回 ICOJF 简体中文产品工作室内容。
- `https://icojf.com/api-integration-development/`、`/mvp-saas-development/`、`/business-process-automation/`、`/contact/` 均为 200。
- `https://pddjf.com/` 不出现 ICOJF 软件外包内容。
- `https://pddjf.com/icojf/` 仍不应作为正式 URL。
- `https://promotion-mysite.pages.dev/` 仍不作为广告最终 URL。
- 移动端首屏文字不重叠，按钮不溢出。
- Footer 在首页、服务页、联系页和基础合规页面的移动端不乱。

## 验证计划

实施完成后至少运行：

- `npm test` 或项目当前等价测试命令。
- `node tools/validate-seo-geo.mjs`。
- 本地 Worker 预览的核心 URL smoke test。
- Playwright 或等价浏览器截图检查：桌面和移动端首页、三个服务页、联系页。
- 生产部署后使用 `curl -I` 或等价方式确认 `icojf.com` 和 `pddjf.com` 分流正确。

## 不做事项

第一阶段不做：

- 繁体中文版。
- 英文完整站。
- 行业页矩阵。
- 博客系统。
- 预约系统或复杂表单后端。
- 与 `pddjf.com` 互相导流的站内链接。

这些可以在广告数据、Search Console 查询词或真实询盘证明后再进入下一阶段。
