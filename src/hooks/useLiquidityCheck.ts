import { Exchange } from "@zetamarkets/sdk";
import { DepthOrderbook, Side } from "@zetamarkets/sdk/dist/types";

import { useWebserverOrderbook } from "@hooks/api/useOrderbook";
import { MIN_LOT_SIZE } from "@utils/constants";
import { getOrderbooks } from "@utils/general";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useMemo } from "react";
import { useUserSettings, useZetaStore } from "stores";

const invalidOrder = { validLiquidity: false, avgPrice: 0, worstPrice: 0 };

type LiquidityCheckInfo = {
  validLiquidity: boolean;
  avgPrice: number;
  worstPrice: number;
};

export const useLiquidityCheck = (
  size: number,
  asset: Asset,
  side: Side
): LiquidityCheckInfo => {
  const marketOrderSlippage = useUserSettings((s) => s.marketOrderSlippage);
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const orderbooks = useWebserverOrderbook();

  const liquidityInfo: LiquidityCheckInfo = useMemo(() => {
    if (!isInitialized || !orderbooks) return invalidOrder;

    return checkLiquidity(
      size,
      asset,
      side,
      marketOrderSlippage,
      orderbooks[asset]
    );
  }, [asset, isInitialized, orderbooks, size, side, marketOrderSlippage]);

  return liquidityInfo;
};

export const checkLiquidityForAllAssets = (size: number, slippage: number) => {
  const allAssetLiquidity = allAssets().reduce((acc, asset) => {
    acc[asset] = checkLiquidity(size, asset, Side.ASK, slippage);

    return acc;
  }, {} as Record<Asset, LiquidityCheckInfo>);

  return allAssetLiquidity;
};

export const checkLiquidity = (
  size: number,
  asset: Asset,
  side: Side,
  slippage: number,
  orderbook?: DepthOrderbook
): LiquidityCheckInfo => {
  orderbook = orderbook || getOrderbooks()?.[asset];
  if (!orderbook) return invalidOrder;

  // We default to min lot size to still show a price
  // TODO: but this logic should go in ther caller of this fn, this should stay innocent and unopinionated.

  const fillSize = size || MIN_LOT_SIZE;
  const orderbookSide = side === Side.ASK ? orderbook.bids : orderbook.asks;

  if (!orderbookSide || !orderbookSide.length) return invalidOrder;

  let validLiquidity = false;
  // Size seen on the orderbook that satisfies the specified price
  let seenSize = 0;
  // The cumulative trade value for the seen size
  let cumAmount = 0;
  // The price of the worst orderbook level that will statisfy the request size entirely
  let worstPrice = 0;
  for (let i = 0; i < orderbookSide.length; i++) {
    const orderbookLevel = orderbookSide[i];
    const isWithinSlippge = checkWithinSlippageTolerance(
      orderbookLevel.price,
      side,
      asset,
      orderbook,
      slippage
    );

    if (!isWithinSlippge) {
      // If not within slippage break early, not a valid market order
      break;
    }

    // Size remaining to fill from orderbook
    const sizeRemaining = fillSize - seenSize;
    // We can satify our size requirements without taking the entire level's size
    const sizeToFill = Math.min(sizeRemaining, orderbookLevel.size);

    seenSize += sizeToFill;
    cumAmount += sizeToFill * orderbookLevel.price;
    worstPrice = orderbookLevel.price;
    validLiquidity = seenSize >= fillSize;

    // Size requirements satified
    if (validLiquidity) break;
  }
  // Average price across all the seen levels
  const avgPrice = cumAmount / seenSize || Exchange.getMarkPrice(asset);

  return { validLiquidity, avgPrice, worstPrice };
};

const checkWithinSlippageTolerance = (
  price: number,
  side: Side,
  asset: Asset,
  orderbook: DepthOrderbook,
  slippage: number
): boolean => {
  const spotPrice = Exchange.getMarkPrice(asset);

  const orderbookMidpoint =
    !orderbook.asks.length || !orderbook.bids.length
      ? undefined
      : (orderbook.asks[0].price + orderbook.bids[0].price) / 2;
  // TODO: should we not be using the mark price always?
  const markPrice = orderbookMidpoint || spotPrice;

  if (side === Side.BID && price < markPrice) return true;
  if (side === Side.ASK && price > markPrice) return true;

  // TODO: spotPrice or midpoint to be used here
  const maxSlippage = slippage * spotPrice;

  return Math.abs(price - markPrice) <= Math.abs(maxSlippage);
};
