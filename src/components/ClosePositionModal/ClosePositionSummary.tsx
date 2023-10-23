import {
  PriceContainer,
  SummaryContentBorder,
  PNLGradientWrapper,
  PNLContent,
  PositionBreakdown,
  StyledPriceDelta,
} from "./styles";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useRealizedPnl } from "@hooks/calcs/useRealizedPnl";
import { useMemo } from "react";
import { Exchange } from "@zetamarkets/sdk";
import Big from "big.js";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Side } from "@zetamarkets/sdk/dist/types";
import { SyntheticOrderType } from "stores/useSelectedContract";
import { convertDollarNumberToString } from "@utils/general";

type ClosePositionSummaryProps = {
  asset: Asset;
  entryPrice: number;
  closePrice: number;
  isTaker: boolean;
  size: number;
  closingSide: Side;
  orderType?: SyntheticOrderType;
  showPnl?: boolean;
};

export const ClosePositionSummary = ({
  asset,
  entryPrice,
  closePrice,
  isTaker,
  size,
  closingSide,
  orderType = SyntheticOrderType.MARKET,
  showPnl = true,
}: ClosePositionSummaryProps): JSX.Element => {
  const realizedPnl = useRealizedPnl(
    asset,
    closePrice,
    closingSide === Side.BID ? -size : size,
    isTaker,
    500
  );

  const tradeFee = useMemo(() => {
    if (!isTaker) return 0;

    const feePercentage = Big(
      convertNativeBNToDecimal(Exchange.state.nativeD1TradeFeePercentage)
    );
    const feeRatio = feePercentage.div(100);
    const tradeFee = feeRatio.mul(closePrice).mul(size);

    return tradeFee.toNumber();
  }, [closePrice, isTaker, size]);

  const valuePrefix = orderType === SyntheticOrderType.MARKET ? "Est." : "";
  const pnlNominal = realizedPnl?.nominal || 0;
  const pnlPct = realizedPnl?.percentage;

  return (
    <SummaryContentBorder>
      <PositionBreakdown>
        <PriceContainer>
          <Text variant="body2" color="primary">
            ${" "}
            {entryPrice.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Text>
          <Tooltip
            content={{
              header: "Entry Price",
              body: TooltipDefinitions.closePositions.entryPrice,
            }}
          >
            <Text variant="label" dotted withTooltip color="secondary">
              Entry Price
            </Text>
          </Tooltip>
        </PriceContainer>
        <PriceContainer>
          <Text variant="body2" color="primary">
            ${" "}
            {closePrice.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Text>
          <Tooltip
            content={{
              header: "Close Price",
              body: TooltipDefinitions.closePositions.estClosePrice,
            }}
          >
            <Text variant="label" dotted color="secondary">
              {valuePrefix} Close Price
            </Text>
          </Tooltip>
        </PriceContainer>
        <PriceContainer>
          <Text variant="body2" color="primary">
            {convertDollarNumberToString(tradeFee, 2, 2)}
          </Text>
          <Tooltip
            content={{
              header: "Fees",
              body: TooltipDefinitions.closePositions.estFees,
            }}
          >
            <Text variant="label" dotted color="secondary">
              {valuePrefix} Fees
            </Text>
          </Tooltip>
        </PriceContainer>
      </PositionBreakdown>
      <PNLGradientWrapper>
        <PNLContent>
          <StyledPriceDelta
            variant="h3"
            delta={showPnl ? pnlNominal : 0}
            deltaPercentage={showPnl ? pnlPct : 0}
            removeIcon={true}
          />
          <Tooltip
            content={{
              header: "Est. Realizable PnL",
              body: TooltipDefinitions.closePositions.estRealizablePNL,
            }}
          >
            <Text variant="label" dotted color="secondary">
              {valuePrefix} Realizable PNL
            </Text>
          </Tooltip>
        </PNLContent>
      </PNLGradientWrapper>
    </SummaryContentBorder>
  );
};
