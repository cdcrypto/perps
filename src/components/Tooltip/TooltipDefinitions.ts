export const TooltipDefinitions = {
  metricsBar: {
    markPrice:
      "The platforms fair price for a derivatives contract. This is used for internal calculations including those related to risk.",
    "24hChange":
      "The difference between asset’s highest and lowest price points in the past 24 hours.",
    "24hVolume":
      "The total dollar value of trades for this market in the past 24 hours.",
    openInterest: "The dollar value of open positions for this market.",
    "1hFundingRate":
      "The hourly rate used to keep the price of the derivative contract aligned with the index price. When funding is positive, long positions pay shorts. When funding is negative, short positions pay longs.",
    fundingAPR:
      "The annualised rate used to keep the price of the derivative contract aligned with the index price. When funding is positive long positions pay shorts. When funding is negative short positions pay longs.",
  },
  advancedOrderTypes: {
    FOK: "Fill Or Kill - Order will only execute if the size is fully filled otherwise it will be cancelled.",
    IOC: "Immediate or Cancel - Any portion of the order which is not filled immediately will be cancelled.",
    postOnly:
      "Order will only be placed if it does not trade against an existing order.",
    postOnlySlide:
      "Order will be placed at the price you set, unless it matches against and existing order on the orderbook, in which case the price will slide 1 tick.",
  },
  accountMetricsSummary: {
    marginUsage: "Percentage of equity used in maintenance margin.",
    accountEquity: "The net worth of your whole account.",
    buyingPower: "The position size you can additionally trade.",
    freeCollateral:
      "The amount of available collateral your account has for trading.",
    currentAccountLeverage:
      "The proportion of your total position size relative to your account equity. The higher the leverage, the higher the risk.",
  },
  positionsTable: {
    contract: "The asset you are trading.",
    entryPrice: "The average price that you opened your trade(s) at.",
    markPrice:
      "The platforms fair price for a derivatives contract. This is used for internal calculations including those related to risk.",
    quantity: "The number of contracts you are trading.",
    tradeValue: "The dollar value of your trade.",
    liquidationPrice:
      "The price at which your position will be liquidated assuming everything else remains constant.",
    uPNL: "The current estimated profit and loss of your positions relative to the Mark Price.",
    initialMargin: "The amount of capital required to open this position.",
  },
  openOrdersTable: {
    contract: "The asset you are trading.",
    price: "The price at which your order will trade.",
    qtyRemaining: "The outstanding number of contracts from your order.",
    value: "The dollar value of your order.",
    initialMargin: "The amount of capital required to open this position.",
    currentPrice:
      "The current price at which this order will fill based on the orderbook (current liquidity). Note that the actual fill price might differ as the market moves.",
  },
  tradeHistoryTable: {
    contract: "The asset you traded.",
    fill: "The method in which the trade was executed.",
    price: "The price at which your order was traded at.",
    quantity: "The number of contracts you traded.",
    tradeValue: "The dollar value of your historical trade.",
    timestamp: "The time at which the trade occurred.",
    fee: "The cost of the trade.",
  },
  fundingHistoryTable: {
    contract:
      "The contract you are holding that is enabling you to pay or receive funding changes.",
    balanceChange: "The change in your equity due to funding rates.",
    timestamp: "The time at which the funding balance change occurred.",
  },
  transferHistoryTable: {
    asset: "The asset you are transferring.",
    action: "The type of transfer event.",
    amount: "The value of the transfer amount.",
    timestamp: "The time at which the transfer event occurred.",
  },
  orderForm: {
    estMarketPrice:
      "The estimated price at which this order will fill based on the orderbook (current liquidity). Note that the actual fill price might differ as the market moves.",
    tradeValue: "The estimated dollar value of the trade once it fills.",
    reduceOnly: "A type of order which decreases your position towards 0.",
  },
  closePositions: {
    orderType: "The type of order that will be executed.",
    limitPrice: "The price at which you will execute your closing trade.",
    entryPrice: "The average price that you opened your trade(s) at.",
    estClosePrice:
      "The price at which the closing trade is expected to fill at.",
    estFees: "The estimated cost to place the trade",
    estRealizablePNL:
      "The estimated profit or loss as a result of closing this position given the close price and platform fee.",
    amountToClose: (asset: string) =>
      `The amount in ${asset} that you wish to close from your position.`,
  },
  takeProfitStopLoss: {
    tpsl: [
      "A dual order mechanism designed to manage your profits and limit potential losses.",
      "Take profit (TP) aims to lock in your profit by reducing your position once the asset price, for a long position, reaches a specified higher level, or for a short position, drops to a certain level.",
      "Stop loss (SL) aims to limit your potential loss by reducing your position if the asset price, for a long position, drops to a certain level, or for a short position, reaches a specified higher level.",
    ],
    triggerPrice:
      "The conditional price that your TP/SL order will be triggered at.",
    slippage:
      "The largest amount, as an additional percentage, that you are willing to pay such that your TP/SL order executes.",
    cancel: "Click the cross icon within your order row to cancel your order.",
    amount: (asset: string) =>
      `The amount in ${asset} that you wish to reduce your position by.`,
  },
};
