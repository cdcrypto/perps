import LeftArrow from "@assets/LeftArrow";
import { Text } from "@components/Text";
import { DEX_PRICE_PRECISION } from "@utils/constants";
import { countDecimals } from "@utils/general";
import { POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";
import React, { useMemo } from "react";
import { useSelectedContractStore } from "stores/useSelectedContract";
import { ORDERBOOK_PRECISION } from "./Orderbook";

import {
  AccumulativeVolumeShading,
  AlignedText,
  IndividualVolumeShading,
  OrderbookRowContainer,
} from "./styles";

type OrderbookRowProps = {
  price: number;
  size: number;
  percentage: string;
  levelPercentage: string;
  side: Side;
  priceIncrement: number;
  isClientOrder?: boolean;
};

export const OrderbookRow = React.memo(function OrderbookRow({
  price,
  size,
  side,
  percentage,
  levelPercentage,
  priceIncrement,
  isClientOrder,
}: OrderbookRowProps) {
  const setQuotePrice = useSelectedContractStore((s) => s.setQuotePrice);

  const isAsk = side === Side.ASK;

  const priceStr = useMemo(() => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: countDecimals(priceIncrement),
      maximumFractionDigits: DEX_PRICE_PRECISION,
    });
  }, [price, priceIncrement]);

  const sizeStr = useMemo(() => {
    return size.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: POSITION_PRECISION,
    });
  }, [size]);

  const valueStr = useMemo(() => {
    const value = Big(size).mul(price);
    return value.toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: ORDERBOOK_PRECISION,
    });
  }, [price, size]);

  const handleOnClickRow = () => {
    setQuotePrice(price);
  };


  return (
    /**
     * TODO: Add in hover/onClick to set price/size
     */
    <OrderbookRowContainer $isAsk={isAsk} onClick={handleOnClickRow}>
      <AccumulativeVolumeShading style={{ width: `${percentage}%` }} $isAsk={isAsk} />
      <IndividualVolumeShading style={{ width: `${levelPercentage}%` }} $isAsk={isAsk} />
      <AlignedText variant="caption" color={isAsk ? "short" : "long"}>
        {priceStr} {isClientOrder && <LeftArrow color="peach" />}
      </AlignedText>
      <Text variant="caption" color="primary" rightAlign>
        {sizeStr}
      </Text>
      <Text variant="caption" color="primary" rightAlign>
        {valueStr}
      </Text>
    </OrderbookRowContainer>
  );
});
