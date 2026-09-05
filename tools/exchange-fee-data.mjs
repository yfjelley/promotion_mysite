export const exchangeFeeData = {
  schemaVersion: 1,
  lastVerified: "2026-09-05",
  market: "USDT perpetual futures",
  currency: "USD",
  methodology: "Public global fee schedules only. Estimated tier uses the highest qualifying 30-day derivatives volume or asset-balance route, subject to published API-share conditions. Exchanges with a complete modeled ladder are ranked separately from base-rate-only references. It does not inspect an account and does not include promotions, referrals, token discounts, pair-specific exceptions, liquidation fees, funding or local-entity rules.",
  exchanges: [
    {
      id: "okx",
      name: "OKX",
      color: "#111827",
      coverage: "full",
      coverageLabel: "Full public ladder",
      pairScope: "Futures Group 1 / top pairs",
      note: "Group 2 contracts use different VIP7-VIP9 rates.",
      source: {
        label: "OKX VIP tier and futures fee adjustment",
        url: "https://www.okx.com/help/advance-notice-adjustment-to-vip-tier-and-future-fees",
        effectiveDate: "2026-04-08",
        checkedDate: "2026-07-23"
      },
      tiers: [
        { name: "Regular", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.050 },
        { name: "VIP 1", minVolume: 5000000, minAssets: 100000, maker: 0.016, taker: 0.045 },
        { name: "VIP 2", minVolume: 10000000, minAssets: 200000, maker: 0.015, taker: 0.036 },
        { name: "VIP 3", minVolume: 50000000, minAssets: 2000000, maker: 0.010, taker: 0.028 },
        { name: "VIP 4", minVolume: 200000000, minAssets: 5000000, maker: 0.008, taker: 0.027 },
        { name: "VIP 5", minVolume: 600000000, minAssets: 20000000, maker: 0.005, taker: 0.026 },
        { name: "VIP 6", minVolume: 1000000000, minAssets: 50000000, maker: 0.000, taker: 0.025 },
        { name: "VIP 7", minVolume: 1500000000, minAssets: 100000000, maker: -0.002, taker: 0.020 },
        { name: "VIP 8", minVolume: 2000000000, minAssets: 250000000, maker: -0.005, taker: 0.020 },
        { name: "VIP 9", minVolume: 20000000000, minAssets: 500000000, maker: -0.005, taker: 0.015 }
      ]
    },
    {
      id: "bybit",
      name: "Bybit",
      color: "#f7a600",
      coverage: "full",
      coverageLabel: "Full standard ladder",
      pairScope: "Perpetual & futures standard VIP; Pro 3+ uses top 72 USDT perpetual rates",
      note: "Standard VIP applies when API trading is 20% or less. Pro tiers apply above 20%; Pro 3+ rates in this model use Bybit's published top 72 USDT perpetual group.",
      sources: [
        {
          label: "Bybit VIP fee rates",
          url: "https://www.bybit.com/en/help-center/article/Benefits-of-the-VIP-Program",
          updatedDate: "2026-06-03",
          checkedDate: "2026-07-23"
        },
        {
          label: "Bybit VIP qualification thresholds",
          url: "https://www.bybit.com/en/help-center/article/Introduction-to-Bybit-VIP-Program?category=bcaeae54c20e409dbc",
          updatedDate: "2026-05-26",
          checkedDate: "2026-07-23"
        }
      ],
      tiers: [
        { name: "VIP 0", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.055 },
        { name: "VIP 1", minVolume: 10000000, minAssets: 100000, maker: 0.018, taker: 0.040 },
        { name: "VIP 2", minVolume: 25000000, minAssets: 250000, maker: 0.016, taker: 0.0375 },
        { name: "VIP 3", minVolume: 50000000, minAssets: 500000, maker: 0.014, taker: 0.035 },
        { name: "VIP 4", minVolume: 100000000, minAssets: 1000000, maxApiShareForVolume: 20, maker: 0.012, taker: 0.032 },
        { name: "Pro 1", minVolume: 100000000, minAssets: null, minApiShareForVolume: 21, maker: 0.010, taker: 0.032 },
        { name: "VIP 5", minVolume: 250000000, minAssets: 2000000, maxApiShareForVolume: 20, maker: 0.010, taker: 0.032 },
        { name: "Pro 2", minVolume: 250000000, minAssets: null, minApiShareForVolume: 21, maker: 0.005, taker: 0.032 },
        { name: "Supreme VIP", minVolume: 500000000, minAssets: null, maxApiShareForVolume: 20, maker: 0.000, taker: 0.030 },
        { name: "Pro 3", minVolume: 750000000, minAssets: null, minApiShareForVolume: 21, maker: 0.000, taker: 0.0275, rateScope: "Top 72 USDT perpetuals" },
        { name: "Pro 4", minVolume: 1500000000, minAssets: null, minApiShareForVolume: 21, maker: 0.000, taker: 0.024, rateScope: "Top 72 USDT perpetuals" },
        { name: "Pro 5", minVolume: 3000000000, minAssets: null, minApiShareForVolume: 21, maker: 0.000, taker: 0.021, rateScope: "Top 72 USDT perpetuals" },
        { name: "Pro 6", minVolume: 5000000000, minAssets: null, minApiShareForVolume: 21, maker: 0.000, taker: 0.018, rateScope: "Top 72 USDT perpetuals" }
      ]
    },
    {
      id: "bitget",
      name: "Bitget",
      color: "#00a6a6",
      coverage: "full",
      coverageLabel: "Full standard ladder",
      pairScope: "Futures standard VIP",
      note: "Bitget PRO market-maker groups use a separate schedule and are not included.",
      source: {
        label: "Bitget VIP fee rates and thresholds",
        url: "https://www.bitget.com/support/articles/12560603830277",
        effectiveDate: "2025-07-01",
        checkedDate: "2026-07-15"
      },
      tiers: [
        { name: "VIP 0", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.060 },
        { name: "VIP 1", minVolume: 5000000, minAssets: 30000, maker: 0.019, taker: 0.060 },
        { name: "VIP 2", minVolume: 10000000, minAssets: 50000, maker: 0.016, taker: 0.040 },
        { name: "VIP 3", minVolume: 20000000, minAssets: 250000, maker: 0.014, taker: 0.0375 },
        { name: "VIP 4", minVolume: 50000000, minAssets: 750000, maker: 0.012, taker: 0.035 },
        { name: "VIP 5", minVolume: 100000000, minAssets: 2000000, maker: 0.010, taker: 0.032 },
        { name: "VIP 6", minVolume: 300000000, minAssets: 5000000, maxApiShareForVolume: 20, maker: 0.008, taker: 0.030 },
        { name: "VIP 7", minVolume: 1000000000, minAssets: 10000000, maxApiShareForVolume: 20, maker: 0.000, taker: 0.020 }
      ]
    },
    {
      id: "binance",
      name: "Binance",
      color: "#d9a400",
      coverage: "base-only",
      coverageLabel: "Base rate verified",
      pairScope: "USDⓈ-M futures public base rate",
      note: "The official ladder is client-rendered and can vary by account and discount settings. Only the public base rate is modeled until the complete ladder can be source-verified.",
      source: {
        label: "Binance USDⓈ-M futures fees",
        url: "https://www.binance.com/en/fee/futureFee",
        checkedDate: "2026-07-15"
      },
      tiers: [
        { name: "Regular", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.050 }
      ]
    },
    {
      id: "mexc",
      name: "MEXC",
      color: "#2f6fed",
      coverage: "base-only",
      coverageLabel: "Base rate verified",
      pairScope: "Published standard perpetual futures rate",
      note: "MEXC publishes 0% maker and 0.02% taker as its standard perpetual futures rate, while noting that rates can vary by region and pair. VVIP uses a dynamic M-Score, so no deterministic next tier is modeled.",
      sources: [
        {
          label: "MEXC futures fee guide",
          url: "https://www.mexc.com/learn/article/mexc-fees-explained-complete-trading-futures-withdrawal-fees-guide/1",
          checkedDate: "2026-07-15"
        },
        {
          label: "MEXC VVIP M-Score FAQ",
          url: "https://www.mexc.com/support/article/mexc-vvip-system-faq-338954841861595136",
          updatedDate: "2026-04-02",
          checkedDate: "2026-07-15"
        }
      ],
      tiers: [
        { name: "Standard", minVolume: 0, minAssets: 0, maker: 0.000, taker: 0.020 }
      ]
    },
    {
      id: "gate",
      name: "Gate",
      color: "#2354e6",
      coverage: "base-only",
      coverageLabel: "Base rate verified",
      pairScope: "USDT futures base schedule",
      note: "Gate publishes pair-group and VIP adjustments across multiple surfaces. Only the base schedule is modeled here to avoid mixing incompatible tables.",
      sources: [
        {
          label: "Gate futures fee adjustment",
          url: "https://www.gate.com/pt/announcements/article/50390",
          updatedDate: "2026-04-09",
          checkedDate: "2026-07-15"
        },
        {
          label: "Gate VIP program overview",
          url: "https://www.gate.com/de/blog/101880/gate-vip-program-fee-structure-benefits-cost-optimization-trading-discounts-promotions",
          checkedDate: "2026-07-15"
        }
      ],
      tiers: [
        { name: "VIP 0", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.050 }
      ]
    },
    {
      id: "kraken",
      name: "Kraken",
      color: "#5741d9",
      coverage: "full",
      coverageLabel: "Full public ladder",
      pairScope: "Kraken Futures perpetual tier schedule",
      note: "Tier qualification is the best of 30-day spot volume, 30-day futures volume or Assets on Platform; only the futures-volume route is modeled here. Kraken states that futures are not available to customers in the United States, Canada and New Zealand.",
      source: {
        label: "Kraken fee schedule (Futures tiers)",
        url: "https://www.kraken.com/features/fee-schedule",
        checkedDate: "2026-09-05"
      },
      tiers: [
        { name: "Tier 1", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.050 },
        { name: "Tier 2", minVolume: 5000000, minAssets: null, maker: 0.0175, taker: 0.045 },
        { name: "Tier 3", minVolume: 10000000, minAssets: null, maker: 0.015, taker: 0.040 },
        { name: "Tier 4", minVolume: 15000000, minAssets: null, maker: 0.0125, taker: 0.035 },
        { name: "Tier 5", minVolume: 25000000, minAssets: null, maker: 0.010, taker: 0.030 },
        { name: "Tier 6", minVolume: 40000000, minAssets: null, maker: 0.0075, taker: 0.0275 },
        { name: "Tier 7", minVolume: 50000000, minAssets: null, maker: 0.005, taker: 0.025 },
        { name: "Tier 8", minVolume: 75000000, minAssets: null, maker: 0.005, taker: 0.0225 },
        { name: "Tier 9", minVolume: 100000000, minAssets: null, maker: 0.000, taker: 0.020 },
        { name: "Tier 10", minVolume: 150000000, minAssets: null, maker: 0.000, taker: 0.018 },
        { name: "Tier 11", minVolume: 250000000, minAssets: null, maker: -0.003, taker: 0.0175 },
        { name: "Tier 12", minVolume: 300000000, minAssets: null, maker: -0.003, taker: 0.017 },
        { name: "Pro 1", minVolume: 400000000, minAssets: null, maker: -0.003, taker: 0.016 },
        { name: "Pro 2", minVolume: 500000000, minAssets: null, maker: -0.005, taker: 0.015 },
        { name: "Pro 3", minVolume: 1000000000, minAssets: null, maker: -0.006, taker: 0.0135 },
        { name: "Pro 4", minVolume: 2000000000, minAssets: null, maker: -0.006, taker: 0.013 },
        { name: "Pro 5", minVolume: 5000000000, minAssets: null, maker: -0.006, taker: 0.0125 }
      ]
    },
    {
      id: "kucoin",
      name: "KuCoin",
      color: "#23af91",
      coverage: "full",
      coverageLabel: "Full public ladder",
      pairScope: "USDT-M futures VIP schedule",
      note: "Levels can also be reached through KCS holdings, 30-day spot volume or net borrowing; only the 30-day futures-volume route and the two published account net-asset routes (VIP 5 and VIP 8) are modeled. KuCoin notes that actual fees may vary for certain coins.",
      source: {
        label: "KuCoin VIP levels and fees",
        url: "https://www.kucoin.com/vip/privilege/fee",
        checkedDate: "2026-09-05"
      },
      tiers: [
        { name: "VIP 0", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.060 },
        { name: "VIP 1", minVolume: 5000000, minAssets: null, maker: 0.018, taker: 0.060 },
        { name: "VIP 2", minVolume: 8000000, minAssets: null, maker: 0.015, taker: 0.060 },
        { name: "VIP 3", minVolume: 16000000, minAssets: null, maker: 0.010, taker: 0.060 },
        { name: "VIP 4", minVolume: 40000000, minAssets: null, maker: 0.008, taker: 0.060 },
        { name: "VIP 5", minVolume: 60000000, minAssets: 1000000, maker: 0.006, taker: 0.048 },
        { name: "VIP 6", minVolume: 120000000, minAssets: null, maker: 0.004, taker: 0.043 },
        { name: "VIP 7", minVolume: 200000000, minAssets: null, maker: 0.002, taker: 0.039 },
        { name: "VIP 8", minVolume: 300000000, minAssets: 3000000, maker: 0.000, taker: 0.036 },
        { name: "VIP 9", minVolume: 400000000, minAssets: null, maker: 0.000, taker: 0.033 },
        { name: "VIP 10", minVolume: 600000000, minAssets: null, maker: 0.000, taker: 0.030 },
        { name: "VIP 11", minVolume: 800000000, minAssets: null, maker: 0.000, taker: 0.028 },
        { name: "VIP 12", minVolume: 1000000000, minAssets: null, maker: 0.000, taker: 0.025 }
      ]
    },
    {
      id: "htx",
      name: "HTX",
      color: "#1f6fff",
      coverage: "full",
      coverageLabel: "Full public ladder",
      pairScope: "USDT-margined futures Group 1 Prime schedule",
      note: "Rates exclude the optional HTX-token fee deduction. Prime levels can also be reached through 30-day spot volume or HTX holdings; only the 30-day futures-volume route and the previous-day total-asset route are modeled. HTX values HTX holdings at 1.5x market value for asset snapshots.",
      source: {
        label: "HTX tiered fee rates",
        url: "https://www.htx.com/fee/",
        checkedDate: "2026-09-05"
      },
      tiers: [
        { name: "Prime 0", minVolume: 0, minAssets: 0, maker: 0.020, taker: 0.060 },
        { name: "Prime 1", minVolume: 300000, minAssets: 5000, maker: 0.018, taker: 0.055 },
        { name: "Prime 2", minVolume: 5000000, minAssets: 20000, maker: 0.016, taker: 0.050 },
        { name: "Prime 3", minVolume: 10000000, minAssets: 60000, maker: 0.014, taker: 0.045 },
        { name: "Prime 4", minVolume: 20000000, minAssets: 100000, maker: 0.012, taker: 0.040 },
        { name: "Prime 5", minVolume: 100000000, minAssets: 150000, maker: 0.010, taker: 0.038 },
        { name: "Prime 6", minVolume: 300000000, minAssets: 300000, maker: 0.006, taker: 0.035 },
        { name: "Prime 7", minVolume: 500000000, minAssets: 600000, maker: 0.004, taker: 0.032 },
        { name: "Prime 8", minVolume: 600000000, minAssets: 1200000, maker: 0.002, taker: 0.030 },
        { name: "Prime 9", minVolume: 700000000, minAssets: 3000000, maker: 0.001, taker: 0.028 },
        { name: "Prime 10", minVolume: 1000000000, minAssets: null, maker: 0.0005, taker: 0.0265 },
        { name: "Prime 11", minVolume: 1500000000, minAssets: null, maker: 0.000, taker: 0.025 }
      ]
    }
  ],
  changelog: [
    { date: "2026-09-05", exchange: "kraken", type: "added", en: "Kraken Futures tier schedule added: 17 tiers from Tier 1 to Pro 5, verified on the official fee schedule page.", zh: "新增 Kraken 合约阶梯：Tier 1 到 Pro 5 共 17 档，按官方费率页核验。", url: "https://www.kraken.com/features/fee-schedule" },
    { date: "2026-09-05", exchange: "kucoin", type: "added", en: "KuCoin USDT-M futures VIP schedule added: VIP 0 to VIP 12 with 30-day futures-volume thresholds and the published net-asset routes.", zh: "新增 KuCoin USDT-M 合约 VIP 阶梯：VIP 0 到 VIP 12，含 30 天合约成交量门槛和已公布的净资产路径。", url: "https://www.kucoin.com/vip/privilege/fee" },
    { date: "2026-09-05", exchange: "htx", type: "added", en: "HTX USDT-margined futures Prime schedule added: Prime 0 to Prime 11, Group 1 rates without the HTX-token deduction.", zh: "新增 HTX USDT 本位合约 Prime 阶梯：Prime 0 到 Prime 11，分组 1 费率，不含 HTX 代币抵扣。", url: "https://www.htx.com/fee/" },
    { date: "2026-07-23", exchange: "okx", type: "verified", en: "OKX VIP ladder re-checked against the official adjustment notice; no change from the April 8, 2026 schedule.", zh: "按官方调整公告复核 OKX VIP 阶梯，与 2026 年 4 月 8 日生效的费率表一致。", url: "https://www.okx.com/help/advance-notice-adjustment-to-vip-tier-and-future-fees" },
    { date: "2026-07-23", exchange: "bybit", type: "verified", en: "Bybit standard VIP and Pro ladders re-checked against the help-center pages updated on May 26 and June 3, 2026.", zh: "按 2026 年 5 月 26 日和 6 月 3 日更新的帮助中心页面复核 Bybit 标准 VIP 与 Pro 阶梯。", url: "https://www.bybit.com/en/help-center/article/Benefits-of-the-VIP-Program" },
    { date: "2026-07-15", exchange: "binance", type: "verified", en: "Binance USDⓈ-M base rate verified at 0.02% maker / 0.05% taker; the full ladder is client-rendered and stays a base-rate reference.", zh: "核验币安 USDⓈ-M 合约基础费率 Maker 0.02% / Taker 0.05%；完整阶梯由客户端渲染，仍作为基础参考。", url: "https://www.binance.com/en/fee/futureFee" },
    { date: "2026-07-15", exchange: "bitget", type: "verified", en: "Bitget standard VIP ladder verified against the schedule effective July 1, 2025.", zh: "按 2025 年 7 月 1 日生效的费率表核验 Bitget 标准 VIP 阶梯。", url: "https://www.bitget.com/support/articles/12560603830277" },
    { date: "2026-07-15", exchange: "mexc", type: "verified", en: "MEXC standard perpetual rate verified at 0% maker / 0.02% taker; VVIP uses a dynamic M-Score and is not modeled.", zh: "核验 MEXC 标准永续费率 Maker 0% / Taker 0.02%；VVIP 采用动态 M-Score，不建模。", url: "https://www.mexc.com/learn/article/mexc-fees-explained-complete-trading-futures-withdrawal-fees-guide/1" },
    { date: "2026-07-15", exchange: "gate", type: "verified", en: "Gate USDT futures base rate verified at 0.02% maker / 0.05% taker after the April 9, 2026 adjustment.", zh: "核验 Gate USDT 合约基础费率 Maker 0.02% / Taker 0.05%，对应 2026 年 4 月 9 日的调整。", url: "https://www.gate.com/pt/announcements/article/50390" },
    { date: "2026-06-03", exchange: "bybit", type: "changed", en: "Bybit updated its VIP fee-rate help page (Pro tiers and top-72 USDT perpetual group rates).", zh: "Bybit 更新 VIP 费率帮助页（Pro 等级与主流 72 个 USDT 永续合约分组费率）。", url: "https://www.bybit.com/en/help-center/article/Benefits-of-the-VIP-Program" },
    { date: "2026-05-26", exchange: "bybit", type: "changed", en: "Bybit updated its VIP qualification thresholds page.", zh: "Bybit 更新 VIP 资格门槛页面。", url: "https://www.bybit.com/en/help-center/article/Introduction-to-Bybit-VIP-Program?category=bcaeae54c20e409dbc" },
    { date: "2026-04-09", exchange: "gate", type: "changed", en: "Gate published a futures fee adjustment announcement.", zh: "Gate 发布合约手续费调整公告。", url: "https://www.gate.com/pt/announcements/article/50390" },
    { date: "2026-04-08", exchange: "okx", type: "changed", en: "OKX VIP tier and futures fee adjustment took effect.", zh: "OKX VIP 等级与合约费率调整生效。", url: "https://www.okx.com/help/advance-notice-adjustment-to-vip-tier-and-future-fees" },
    { date: "2025-07-01", exchange: "bitget", type: "changed", en: "Bitget VIP fee rates and thresholds schedule took effect.", zh: "Bitget VIP 费率与门槛表生效。", url: "https://www.bitget.com/support/articles/12560603830277" }
  ]
};
