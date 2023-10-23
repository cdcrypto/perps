import { Tooltip } from "@components/Tooltip";
import { Container, AmountInputContainer, Row } from "./styles";
import { Text } from "@components/Text";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { PriceInput } from "@components/OrderForm/styles";
import { Asset, POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { SetStateAction, useEffect } from "react";
import {
  Percentage,
  PercentageSelector,
} from "@components/PercentageSelector/PercentageSelector";
import { useMaxTriggerOrderSize } from "@hooks/calcs/useMaxTriggerOrderSize";

interface AmountControlProps {
  closeAmount: string;
  selectedPercentageSize: Percentage | undefined;
  asset: Asset;
  triggerPrice: number;
  setCloseAmount: (value: SetStateAction<string>) => void;
  setSelectedPercentageSize: (
    value: SetStateAction<Percentage | undefined>
  ) => void;
}

export const AmountControl = ({
  closeAmount,
  selectedPercentageSize,
  asset,
  triggerPrice,
  setCloseAmount,
  setSelectedPercentageSize,
}: AmountControlProps) => {
  const maxSize = useMaxTriggerOrderSize(asset, triggerPrice);

  useEffect(() => {
    if (Number(closeAmount) > maxSize) {
      setCloseAmount(maxSize.toString());
    }
  }, [maxSize, closeAmount, setCloseAmount]);

  return (
    <Container>
      <AmountInputContainer>
        <Tooltip
          content={{
            header: "Amount",
            body: TooltipDefinitions.takeProfitStopLoss.amount(asset),
          }}
        >
          <Text dotted variant="caption" color="secondary">
            Amount
          </Text>
        </Tooltip>

        <Row>
          <PriceInput
            value={closeAmount}
            setValue={setCloseAmount}
            max={maxSize}
            decimalScale={POSITION_PRECISION}
            endAdornment={
              <Text variant="h3" color="secondary">
                {asset}
              </Text>
            }
            onValueChange={() => {
              setSelectedPercentageSize(undefined);
            }}
          />
        </Row>
      </AmountInputContainer>

      <Row>
        <PercentageSelector
          percentage={selectedPercentageSize}
          onPercentageSelect={(percentage, val) => {
            setSelectedPercentageSize(percentage);
            setCloseAmount(val.toString());
          }}
          max={maxSize}
        />
      </Row>
    </Container>
  );
};
