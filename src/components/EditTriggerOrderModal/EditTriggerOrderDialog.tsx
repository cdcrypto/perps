import { useState, useCallback, useEffect } from "react";
import { useClientStore } from "stores";
import Big from "big.js";
import { useTransactions } from "@hooks/client/useTransactions";
import { Button } from "@components/Button";
import { PercentageSelector } from "@components/PercentageSelector";
import { Percentage } from "@components/PercentageSelector/PercentageSelector";
import { POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import { ContractAndPrice } from "@components/TakeProfitStopLossModal/ContractAndPrice";
import { Text } from "@components/Text";
import { OrderTypeWithTriggerPrice } from "@components/TakeProfitStopLossModal/OrderTypeWithTriggerPrice";
import { OpenTriggerOrder } from "@web/components/TriggerOrdersTable/TriggerOrdersColumns";
import { ClosePositionSummary } from "@components/ClosePositionModal/ClosePositionSummary";
import { useMaxEditTriggerOrderSize } from "@hooks/calcs/useMaxEditTriggerOrderSize";
import {
  StyledDialogContent,
  DialogBody,
  ConfirmCancelButtonContainer,
  CancelEditOrderModal,
  CenteredDialogSingleRow,
  DialogNumericalInput,
} from "@components/Modal/styles";

export const EditTriggerOrderDialog = ({
  openTriggerOrder,
  onClose,
}: {
  openTriggerOrder: OpenTriggerOrder;
  onClose: () => void;
}): JSX.Element => {
  const triggerOrder = openTriggerOrder.triggerOrder;
  const asset = triggerOrder.asset;
  const position = useClientStore((s) => s.positions[asset]);
  const positionSize = position?.size || 0;

  const transactions = useTransactions();

  const [triggerPrice, setTriggerPrice] = useState("");
  useEffect(() => {
    if (openTriggerOrder.triggerPrice !== null) {
      setTriggerPrice(openTriggerOrder.triggerPrice.toString());
    }
  }, [asset, openTriggerOrder.triggerPrice, triggerOrder.triggerPrice]);

  const [quantityInput, setQuantityInput] = useState(
    openTriggerOrder.quantityRemaining.toString()
  );

  const maxSize = useMaxEditTriggerOrderSize(
    asset,
    Number(triggerPrice),
    openTriggerOrder.quantityRemaining
  );

  // a value b/w 0-100 of the selected percentage
  const [selectedPercentageSize, setSelectedPercentageSize] = useState<
    Percentage | undefined
  >(undefined);

  const handleEditOpenOrder = useCallback(async () => {
    if (!transactions || !quantityInput || !triggerPrice) return;

    await transactions.editPriceTriggerOrder(
      triggerOrder.triggerOrderBit,
      Number(triggerPrice),
      Number(quantityInput),
      triggerOrder.side
    );
  }, [
    quantityInput,
    transactions,
    triggerOrder.side,
    triggerOrder.triggerOrderBit,
    triggerPrice,
  ]);
  const showPnl = Number(triggerPrice) !== 0 && Number(quantityInput) !== 0;
  const entryPrice = Big(position?.costOfTrades || 0)
    .div(positionSize)
    .abs()
    .toNumber();

  const closingSide = openTriggerOrder.side === Side.BID ? Side.ASK : Side.BID;

  const isOrderFieldsEdited =
    Number(triggerPrice) !== openTriggerOrder.triggerPrice ||
    Number(quantityInput) !== openTriggerOrder.quantityRemaining;
  const isConfirmButtonDisabled =
    !Number(triggerPrice) || !Number(quantityInput) || !isOrderFieldsEdited;

  return (
    <StyledDialogContent>
      <DialogBody>
        <ContractAndPrice asset={triggerOrder.asset} side={triggerOrder.side} />
        <OrderTypeWithTriggerPrice
          triggerPrice={triggerPrice}
          setTriggerPrice={setTriggerPrice}
        />

        <CenteredDialogSingleRow>
          <DialogNumericalInput
            value={quantityInput}
            setValue={setQuantityInput}
            max={maxSize ?? 0}
            decimalScale={POSITION_PRECISION}
            endAdornment={
              <Text variant="h3" color="secondary">
                {triggerOrder.asset}
              </Text>
            }
            label="Quantity"
            onValueChange={() => {
              setSelectedPercentageSize(undefined);
            }}
          />
        </CenteredDialogSingleRow>
        <CenteredDialogSingleRow>
          <PercentageSelector
            percentage={selectedPercentageSize}
            onPercentageSelect={(percentage, val) => {
              setSelectedPercentageSize(percentage);
              setQuantityInput(val.toString());
            }}
            max={maxSize ?? 0}
          />
        </CenteredDialogSingleRow>
      </DialogBody>
      <ClosePositionSummary
        entryPrice={entryPrice}
        closePrice={Number(triggerPrice)}
        asset={asset}
        size={Number(quantityInput)}
        isTaker={true}
        closingSide={closingSide}
        showPnl={showPnl}
      />
      <ConfirmCancelButtonContainer>
        <Button
          label="Confirm"
          variant="primary"
          disabled={isConfirmButtonDisabled}
          onClick={() => {
            void handleEditOpenOrder().then(() => {
              onClose();
            });
          }}
        />
        <CancelEditOrderModal
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </CancelEditOrderModal>
      </ConfirmCancelButtonContainer>
    </StyledDialogContent>
  );
};
