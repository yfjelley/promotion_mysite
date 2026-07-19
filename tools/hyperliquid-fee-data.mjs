export const hyperliquidFeeData = {
  schemaVersion: 1,
  lastVerified: "2026-07-19",
  market: "Hyperliquid standard perps and spot",
  unit: "percent",
  methodology: "The VIP tier uses 14-day weighted volume: perp volume plus two times spot volume. Positive maker and taker fees are reduced by the selected staking discount. A selected maker-rebate tier replaces the positive maker fee with the published negative maker rate. Referral discounts, HIP-3 deployer fees, growth mode, aligned quote assets, stable-pair scaling, builder fees, funding, spread, slippage and liquidation costs are excluded.",
  sources: [
    {
      label: "Hyperliquid fees",
      url: "https://hyperliquid.gitbook.io/hyperliquid-docs/trading/fees",
      checkedAt: "2026-07-19",
      scope: "14-day weighted volume, perps and spot tiers, staking discounts, maker rebates and fee formula"
    },
    {
      label: "Hyperliquid userFees endpoint",
      url: "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-fees",
      checkedAt: "2026-07-19",
      scope: "Live public fee schedule returned by the official info endpoint"
    }
  ],
  vipTiers: [
    { name: "VIP 0", minWeightedVolume: 0, perpMaker: 0.015, perpTaker: 0.045, spotMaker: 0.040, spotTaker: 0.070 },
    { name: "VIP 1", minWeightedVolume: 5000000, perpMaker: 0.012, perpTaker: 0.040, spotMaker: 0.030, spotTaker: 0.060 },
    { name: "VIP 2", minWeightedVolume: 25000000, perpMaker: 0.008, perpTaker: 0.035, spotMaker: 0.020, spotTaker: 0.050 },
    { name: "VIP 3", minWeightedVolume: 100000000, perpMaker: 0.004, perpTaker: 0.030, spotMaker: 0.010, spotTaker: 0.040 },
    { name: "VIP 4", minWeightedVolume: 500000000, perpMaker: 0.000, perpTaker: 0.028, spotMaker: 0.000, spotTaker: 0.035 },
    { name: "VIP 5", minWeightedVolume: 2000000000, perpMaker: 0.000, perpTaker: 0.026, spotMaker: 0.000, spotTaker: 0.030 },
    { name: "VIP 6", minWeightedVolume: 7000000000, perpMaker: 0.000, perpTaker: 0.024, spotMaker: 0.000, spotTaker: 0.025 }
  ],
  stakingTiers: [
    { name: "No staking discount", minHype: 0, discount: 0 },
    { name: "Wood", minHype: 10, discount: 5 },
    { name: "Bronze", minHype: 100, discount: 10 },
    { name: "Silver", minHype: 1000, discount: 15 },
    { name: "Gold", minHype: 10000, discount: 20 },
    { name: "Platinum", minHype: 100000, discount: 30 },
    { name: "Diamond", minHype: 500000, discount: 40 }
  ],
  makerRebateTiers: [
    { name: "No maker rebate", minWeightedMakerShare: 0, makerRate: null },
    { name: "Maker rebate 1", minWeightedMakerShare: 0.5, makerRate: -0.001 },
    { name: "Maker rebate 2", minWeightedMakerShare: 1.5, makerRate: -0.002 },
    { name: "Maker rebate 3", minWeightedMakerShare: 3.0, makerRate: -0.003 }
  ]
};
