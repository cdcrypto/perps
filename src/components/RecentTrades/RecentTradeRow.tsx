import { useMemo } from "react";
import { Trade } from "@types";
import { getFormattedDate } from "@utils/general";
import { Side } from "@zetamarkets/sdk/dist/types";
import { AlignedText, RecentTradeRowContainer } from "./styles";
import { Text } from "@components/Text";

type RecentTradeRowProps = { trade: Trade };

export const RecentTradeRow = ({ trade }: RecentTradeRowProps) => {
  const { timestamp, side, size, price } = trade;
  const bid = useMemo(() => {
    return side === Side.BID;
  }, [side]);
  const priceStr = useMemo(() => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }, [price]);
  const sizeStr = useMemo(() => {
    return size.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
  }, [size]);

  const timestampStr = useMemo(() => {
    return getFormattedDate(new Date(timestamp).getTime(), "recent-trade-ts");
  }, [timestamp]);

  return (
    <RecentTradeRowContainer>
      <AlignedText variant="caption" color={bid ? "long" : "short"}>
        {priceStr}
      </AlignedText>
      <Text variant="caption" rightAlign>
        {sizeStr}
      </Text>
      <Text variant="caption" rightAlign>
        {timestampStr}
      </Text>
    </RecentTradeRowContainer>
  );
};
