# SignalCraft Labs 获客拦截与私信初筛 SOP (Playbook)

---

## 1. 每日 15 分钟“截流”搜索监控关键词

在 Twitter 搜索栏中搜索并保存以下查询语句，按最新推文（Latest）查看：

### 搜索关键词组：
1. `TradingView Webhook (漏单 OR 重复 OR 报错 OR 接口 OR 实盘)`
2. `Hyperliquid API (报错 OR 订单 OR 延迟 OR Python OR bot)`
3. `量化实盘 (接口 OR 拒单 OR 风控 OR 盈透 OR IBKR)`
4. `Trading bot development (API OR FIX OR IBKR OR execution)`

---

## 2. 专业技术回复模板（展示专家形象，严禁硬广）

### 场景 A：有人抱怨 TradingView 延时/漏单
> **回复**：
> “TV 的 Webhook 偶发延时多为公网路由波动。建议在网关层做两件事：① 设定最大允许延时阈值（如超时 3 秒丢弃，防止开在高点），② 引入基于订单状态机的异步对账。这样基本可以杜绝 90% 的假漏单和重复开仓。”

### 场景 B：有人在问交易系统用 Python 还是 Go/C++
> **回复**：
> “中低频/策略迭代期 Python 生产力无敌；但如果有较多并发账户或高频 WebSocket 订阅，建议将信号接收网关和风控层拆出来用 Go 写，策略计算仍用 Python，双层解耦是性价比最高的方案。”

### 场景 C：有人讨论 Hyperliquid / 交易所 API 踩坑
> **回复**：
> “HL 的 WS 推送在极端行情下偶尔会有乱序，千万不能假设 openOrders 是严格单调递增的，一定要在网关内维护一个基于 Rest 快照的定时 Reconciliation 状态机。”

---

## 3. 私信（DM）客户初筛与快速定级话术（3 句话过滤白嫖/低质客户）

当有客户私信咨询“你能帮我写个交易机器人吗 / 怎么收费”时，**直接发送以下标准化模板**：

```text
您好！感谢关注 SignalCraft Labs。

为了评估工程可行性并为您匹配合适的交付方案（我们专注于团队级与机构级实盘系统定制，梯度起步为 $4,000 / $10,000 / $20,000+，提供全套源码与私有部署），您可以先简单告知我们：

1. 策略信号来源（例如：TradingView Webhook / 自研 Python 脚本 / 指标引擎）
2. 目标对接平台（例如：Hyperliquid / Binance / 盈透证券 IBKR / FIX 接口）
3. 核心需求（例如：单策略快速实盘 / 多账户并发与风控引擎 / 私有交易基础设施）

收到后我们会先帮您做技术边界评估并给出架构方案建议！
```
