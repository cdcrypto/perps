import { useMemo } from "react";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { LabelWrapper, EstMarketPriceWrapper } from "./styles";
import { Text } from "@components/Text";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Side } from "@zetamarkets/sdk/dist/types";
import { countDigits } from "@utils/general";
import { useLiquidityCheck } from "@hooks/useLiquidityCheck";

interface MarketPriceDisplayProps {
  /**
   * Absolute positive value of size
   */
  size: number;
  side: Side;
  asset: Asset;
  className?: string;
}
export const MarketPriceDisplay = ({
  size,
  side,
  asset,
  className,
}: MarketPriceDisplayProps): JSX.Element => {
  const { validLiquidity, avgPrice } = useLiquidityCheck(size, asset, side);

  const minDecimals = useMemo(() => {
    return asset === Asset.BTC || asset === Asset.ETH ? 2 : 3;
  }, [asset]);

  const estimatedMarketPrice = useMemo(() => {
    if (!validLiquidity || !avgPrice) {
      return "-";
    } else if (avgPrice < 0.01) {
      return "<0.01";
    } else {
      return avgPrice.toLocaleString(undefined, {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: minDecimals,
      });
    }
  }, [avgPrice, validLiquidity, minDecimals]);

  const textOverflow = useMemo(() => {
    return countDigits(estimatedMarketPrice) > 6;
  }, [estimatedMarketPrice]);
  return (
    <LabelWrapper className={className}>
      <Tooltip
        content={{
          header: "Est. Market Price",
          body: TooltipDefinitions.orderForm.estMarketPrice,
        }}
      >
        <Text dotted withTooltip variant="caption" color="secondary">
          Est. Market Price
        </Text>
      </Tooltip>

      <EstMarketPriceWrapper
        // Added this in to reduce text overflow, most typically in the case when BTC is selected
        // as it's price has more digits than other asset prices
        $textOverflow={textOverflow}
      >
        <Text variant="h2" color="primary">
          $ {estimatedMarketPrice}
        </Text>
      </EstMarketPriceWrapper>
    </LabelWrapper>
  );
};
