import { useState, useCallback, useMemo } from "react";
import { useTransactions } from "@hooks/client/useTransactions";
import { Button } from "@components/Button";
import { PercentageSelector } from "@components/PercentageSelector";
import { Percentage } from "@components/PercentageSelector/PercentageSelector";
import { POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Order, Side } from "@zetamarkets/sdk/dist/types";
import { useMaxTradeSize } from "@hooks/calcs/useMaxTradeSize";
import Big from "big.js";
import { ContractAndPrice } from "@components/TakeProfitStopLossModal/ContractAndPrice";
import { OrderTypeWithOrderPrice } from "./OrderTypeWithOrderPrice";
import { Text } from "@components/Text";
import { useSelectedContractStore } from "stores";
import {
  StyledDialogContent,
  DialogBody,
  ConfirmCancelButtonContainer,
  CancelEditOrderModal,
  CenteredDialogSingleRow,
  DialogNumericalInput,
} from "@components/Modal/styles";

export const EditOpenOrderDialog = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}): JSX.Element => {
  const reduceOnly = useSelectedContractStore((s) => s.reduceOnly);
  const [orderPrice, setOrderPrice] = useState(order.price.toString());
  const [quantityInput, setQuantityInput] = useState(order.size.toString());

  const initialTradeValue = useMemo(() => {
    if (Number(orderPrice) !== 0 && Number(quantityInput) !== 0) {
      return Big(orderPrice).mul(quantityInput).toString();
    } else {
      return "";
    }
  }, [orderPrice, quantityInput]);
  const [tradeValueInput, setTradeValueInput] = useState(initialTradeValue);

  const tradeLimits = useMaxTradeSize(
    {
      price: Number(orderPrice),
      asset: order.asset,
      side: order.side,
      reduceOnly: reduceOnly,
    },
    1000
  );
  const maxTradeValue = tradeLimits?.maxTradeValue;

  const maxTradeSize = tradeLimits?.maxTradeSize;

  // a value b/w 0-100 of the selected percentage
  const [selectedPercentageSize, setSelectedPercentageSize] = useState<
    Percentage | undefined
  >(undefined);

  const transactions = useTransactions();

  const changeOrderPrice = useCallback(
    (val: string) => {
      setOrderPrice(val);
      if (Number(val)) {
        const updatedTradeValue = Big(val)
          .mul(quantityInput.trim() === "" ? 0 : quantityInput)
          .toString();
        setTradeValueInput(updatedTradeValue);
      }
    },
    [quantityInput]
  );

  const changeQuantityInput = useCallback(
    (val: string) => {
      setQuantityInput(val.toString());
      if (Number(val)) {
        const updatedTradeValue = Big(val)
          .mul(orderPrice.trim() === "" ? 0 : orderPrice)
          .toString();
        setTradeValueInput(updatedTradeValue);
      }
    },
    [orderPrice]
  );

  const changeTradeValue = useCallback(
    (val: string) => {
      setTradeValueInput(val);
      if (Number(val) === 0) {
        return;
      } else if (Number(quantityInput) !== 0) {
        const updatedQuantity = Big(val).div(orderPrice).toString();
        setQuantityInput(updatedQuantity);
      }
    },
    [orderPrice, quantityInput]
  );

  const handleEditOpenOrder = async () => {
    if (!transactions || !quantityInput || !orderPrice) return;

    await transactions.cancelAndPlaceOrder(
      { size: Number(quantityInput), price: Number(orderPrice) },
      order.side,
      order.asset,
      order.orderId
    );
  };

  const isOrderFieldsEdited =
    Number(orderPrice) !== order.price || Number(quantityInput) !== order.size;
  const isConfirmButtonDisabled =
    !Number(orderPrice) ||
    !Number(quantityInput) ||
    !Number(tradeValueInput) ||
    !isOrderFieldsEdited;

  return (
    <StyledDialogContent>
      <DialogBody>
        <ContractAndPrice
          asset={order.asset}
          side={order.side === Side.BID ? Side.ASK : Side.BID}
        />
        <OrderTypeWithOrderPrice
          orderPrice={orderPrice}
          changeOrderPrice={changeOrderPrice}
        />

        <CenteredDialogSingleRow>
          <DialogNumericalInput
            value={tradeValueInput}
            setValue={changeTradeValue}
            max={maxTradeValue ?? 0}
            decimalScale={POSITION_PRECISION}
            endAdornment={
              <Text variant="h3" color="secondary">
                USD
              </Text>
            }
            label="Trade Value"
            onValueChange={() => {
              setSelectedPercentageSize(undefined);
            }}
          />
        </CenteredDialogSingleRow>
        <CenteredDialogSingleRow>
          <DialogNumericalInput
            value={quantityInput}
            setValue={setQuantityInput}
            max={maxTradeSize ?? 0}
            decimalScale={POSITION_PRECISION}
            endAdornment={
              <Text variant="h3" color="secondary">
                {order.asset}
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
              changeQuantityInput(val.toString());
            }}
            max={maxTradeSize ?? 0}
          />
        </CenteredDialogSingleRow>
      </DialogBody>
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
