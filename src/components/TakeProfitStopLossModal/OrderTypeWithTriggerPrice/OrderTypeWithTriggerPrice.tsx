import {
  Container,
  MarketOrderText,
  TriggerPriceContainer,
  OrderTypeContainer,
} from "./styles";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Dispatch, SetStateAction } from "react";
import { PriceInput, SingleRow } from "@components/OrderForm/styles";
import { DEX_PRICE_PRECISION } from "@utils/constants";

interface OrderTypeWithTriggerPriceProps {
  triggerPrice: string;
  setTriggerPrice: Dispatch<SetStateAction<string>>;
}

export const OrderTypeWithTriggerPrice = ({
  triggerPrice,
  setTriggerPrice,
}: OrderTypeWithTriggerPriceProps) => {
  return (
    <Container>
      <OrderTypeContainer>
        <Tooltip
          content={{
            header: "Order Type",
            body: TooltipDefinitions.closePositions.orderType,
          }}
        >
          <Text dotted variant="caption" color="secondary">
            Order Type
          </Text>
        </Tooltip>
        <MarketOrderText variant="body1">Market</MarketOrderText>
      </OrderTypeContainer>

      <TriggerPriceContainer>
        <Tooltip
          content={{
            header: "Order Type",
            body: TooltipDefinitions.takeProfitStopLoss.triggerPrice,
          }}
        >
          <Text dotted variant="caption" color="secondary">
            Trigger Price
          </Text>
        </Tooltip>

        <SingleRow>
          <PriceInput
            value={triggerPrice}
            setValue={setTriggerPrice}
            max={10000}
            decimalScale={DEX_PRICE_PRECISION}
            endAdornment={
              <Text variant="h3" color="secondary">
                USD
              </Text>
            }
            label={""}
          />
        </SingleRow>
      </TriggerPriceContainer>
    </Container>
  );
};
