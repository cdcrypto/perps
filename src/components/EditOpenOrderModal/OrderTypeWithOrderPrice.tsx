import {
  Container,
  LimitOrderText,
  OrderPriceContainer,
  OrderTypeContainer,
} from "./styles";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { PriceInput, SingleRow } from "@components/OrderForm/styles";
import { DEX_PRICE_PRECISION } from "@utils/constants";

interface OrderTypeWithTriggerPriceProps {
  orderPrice: string;
  changeOrderPrice: (val: string) => void;
}

export const OrderTypeWithOrderPrice = ({
  orderPrice,
  changeOrderPrice,
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
        <LimitOrderText variant="body1">Limit</LimitOrderText>
      </OrderTypeContainer>

      <OrderPriceContainer>
        <Tooltip
          content={{
            header: "Order Type",
            body: TooltipDefinitions.takeProfitStopLoss.triggerPrice,
          }}
        >
          <Text dotted variant="caption" color="secondary">
            Order Price
          </Text>
        </Tooltip>

        <SingleRow>
          <PriceInput
            value={orderPrice}
            setValue={changeOrderPrice}
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
      </OrderPriceContainer>
    </Container>
  );
};
