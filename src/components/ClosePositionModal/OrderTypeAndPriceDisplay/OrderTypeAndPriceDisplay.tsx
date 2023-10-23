import { Tooltip } from "@components/Tooltip";
import {
  Container,
  MarketOrderInfo,
  OrderTypeContainer,
  StyledMarketPrice,
} from "./styles";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Text } from "@components/Text";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";

interface OrderTypeAndPriceDisplayProps {
  asset: Asset;
  side: Side;
  size: number;
}

export const OrderTypeAndPriceDisplay = ({
  asset,
  side,
  size,
}: OrderTypeAndPriceDisplayProps) => {
  return (
    <Container>
      <OrderTypeContainer>
        <Tooltip
          content={{
            body: TooltipDefinitions.closePositions.orderType,
            header: "Order Type",
          }}
        >
          <Text variant="label" color="secondary" dotted>
            Order Type
          </Text>
        </Tooltip>

        <MarketOrderInfo>
          <Text variant="body1" color="highlight">
            Market
          </Text>
        </MarketOrderInfo>
      </OrderTypeContainer>

      <StyledMarketPrice asset={asset} side={side} size={size} />
    </Container>
  );
};
