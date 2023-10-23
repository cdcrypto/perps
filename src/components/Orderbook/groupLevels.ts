import { Level, Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";

export const groupLevels = (
  levels: Level[],
  side: Side,
  priceIncrement: number
) => {
  if (!levels.length) return [];

  const levelsLiquidity = levels.reduce((accum, curr) => {
    const newStartingPoint = Big(curr.price)
      .div(priceIncrement)
      .round(0, side === Side.BID ? Big.roundDown : Big.roundUp)
      .mul(priceIncrement);

    accum.set(
      newStartingPoint.toNumber(),
      (accum.get(newStartingPoint.toNumber()) || 0) + curr.size
    );

    return accum;
  }, new Map<number, number>());

  const groupedLevels = Array.from(levelsLiquidity.entries()).reduce(
    (accum, [price, size]) => {
      return [...accum, { price, size }];
    },
    [] as Level[]
  );

  return groupedLevels;
};
