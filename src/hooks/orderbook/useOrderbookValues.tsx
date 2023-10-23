import { Level, Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";
import { useMemo } from "react";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { groupLevels } from "@components/Orderbook/groupLevels";
import { ORDERBOOK_PRECISION } from "@components/Orderbook/Orderbook";

interface OrderbookValue extends Level {
  /**
   * percentage of the total volume
   */
  percentage: string;

  /**
   * percentage of the total volume at this level
   */
  levelPercentage: string;

  asset: Asset;

  priceIncrement: number;
}

interface UseOrderbookValuesParams {
  /**
   * orders (bid or ask) that we want to augment with percentage and levelPercentage.
   * assumes that orders are sorted by price low to high
   */
  levels: Level[];

  /**
   * side of the orderbook (bid or ask)
   */
  side: Side;

  /**
   * size * price for all orders in the orderbook (bid and ask)
   */
  totalVolume: Big;

  /**
   * price increment for the orderbook
   */
  priceIncrement: number;
}

export const useOrderbookValues = ({
  levels,
  priceIncrement,
  side,
  totalVolume,
}: UseOrderbookValuesParams): OrderbookValue[] => {
  const { selectedAsset } = useMarketDetails();

  const groupedLevels = useMemo(
    () => groupLevels(levels, side, priceIncrement),
    [levels, priceIncrement, side]
  );
  const levelsAccumulatedVolume = useMemo(
    () =>
      groupedLevels.reduce((accum, curr) => {
        if (accum.length === 0) {
          return [Big(curr.size).times(Big(curr.price))];
        }

        accum.push(
          Big(curr.size)
            .times(Big(curr.price))
            .plus(accum[accum.length - 1])
        );

        return accum;
      }, new Array<Big>()),
    [groupedLevels]
  );

  const orderbookValues: OrderbookValue[] = useMemo(
    () =>
      groupedLevels.map((level, index) => {
        const percentage = levelsAccumulatedVolume[index]
          .div(totalVolume)
          .times(100)
          .toNumber()
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: ORDERBOOK_PRECISION,
          });

        const levelPercentage = Big(level.size)
          .times(Big(level.price))
          .div(totalVolume)
          .times(100)
          .toFixed();

        return {
          ...level,
          percentage,
          levelPercentage,
          asset: selectedAsset,
          priceIncrement,
        };
      }),
    [
      groupedLevels,
      levelsAccumulatedVolume,
      priceIncrement,
      selectedAsset,
      totalVolume,
    ]
  );

  const sortedOrderbookValues = useMemo(
    // return orderbook values that are sorted by price high to low for both bids and asks
    () =>
      side === Side.BID ? orderbookValues : [...orderbookValues].reverse(),
    [orderbookValues, side]
  );

  return sortedOrderbookValues;
};
