import { useState } from "react";
import { useTransactions } from "@hooks/client/useTransactions";
import { CloseButtonContainer } from "@components/ClosePositionModal/styles";
import { ClosePositionSummary } from "@components/ClosePositionModal/ClosePositionSummary";
import { CancelModalButton } from "@web/components/DepositWithdraw/styles";
import { Percentage } from "@components/PercentageSelector/PercentageSelector";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side, TriggerDirection } from "@zetamarkets/sdk/dist/types";
import { useClientStore } from "stores";
import Big from "big.js";
import { ContractAndPrice } from "./ContractAndPrice";
import { DialogContainer, InputControls, Spacer, StyledButton } from "./styles";
import { OrderTypeWithTriggerPrice } from "./OrderTypeWithTriggerPrice";
import { AmountControl } from "./AmountControl";
import { Exchange } from "@zetamarkets/sdk";
import { BufferWarning } from "./BufferWarning";
import { ReduceOnlyNotice } from "@components/Modal/ReduceOnlyNotice";

interface TakeProfitStopLossDialogProps {
  asset: Asset;
  onClose: () => void;
}

export const MINIMUM_TRIGGER_ORDER_BUFFER = 0.0025;

export const TakeProfitStopLossDialog = ({
  asset,
  onClose,
}: TakeProfitStopLossDialogProps): JSX.Element => {
  const [triggerPrice, setTriggerPrice] = useState<string>("");
  const [closeAmount, setCloseAmount] = useState<string>("");
  const closingAssetSize = Number(closeAmount) || 0;
  // a value b/w 0-100 of the selected percentage
  const [selectedPercentageSize, setSelectedPercentageSize] = useState<
    Percentage | undefined
  >(100);
  const position = useClientStore((s) => s.positions[asset]);
  const transactions = useTransactions();
  const positionSize = position?.size || 0;
  const side = positionSize > 0 ? Side.ASK : Side.BID;
  const isTaker = true;
  const marketPrice = Exchange.getMarkPrice(asset);
  const showPriceWarning =
    Math.abs((Number(triggerPrice) - marketPrice) / marketPrice) <
    MINIMUM_TRIGGER_ORDER_BUFFER;
  const showPnl = Number(triggerPrice) !== 0 && Number(closeAmount) !== 0;
  const isDisabled =
    closingAssetSize === 0 || Number(triggerPrice) === 0 || showPriceWarning;
  const getTriggerDirection = () => {
    if (Number(triggerPrice) >= marketPrice) {
      return TriggerDirection.GREATERTHANOREQUAL;
    }

    return TriggerDirection.LESSTHANOREQUAL;
  };

  const handleCreateTriggerOrder = () => {
    if (!transactions) {
      return;
    }
    const triggerDirection = getTriggerDirection();

    void transactions
      .placeTriggerOrder(
        asset,
        side,
        closingAssetSize,
        Number(triggerPrice) || 0,
        triggerDirection
      )
      .then(onClose);
  };

  const entryPrice = Big(position?.costOfTrades || 0)
    .div(positionSize)
    .abs()
    .toNumber();

  return (
    <DialogContainer>
      <Spacer height="16px" />

      <InputControls>
        <ContractAndPrice asset={asset} side={side} />
        <OrderTypeWithTriggerPrice
          triggerPrice={triggerPrice}
          setTriggerPrice={setTriggerPrice}
        />
        <AmountControl
          asset={asset}
          closeAmount={closeAmount}
          triggerPrice={Number(triggerPrice)}
          selectedPercentageSize={selectedPercentageSize}
          setCloseAmount={setCloseAmount}
          setSelectedPercentageSize={setSelectedPercentageSize}
        />
        <ReduceOnlyNotice />
      </InputControls>

      <Spacer height="16px" />

      <ClosePositionSummary
        entryPrice={entryPrice}
        closePrice={Number(triggerPrice)}
        asset={asset}
        size={closingAssetSize}
        isTaker={isTaker}
        closingSide={side}
        showPnl={showPnl}
      />

      {showPriceWarning && <BufferWarning />}

      <CloseButtonContainer>
        <StyledButton
          disabled={isDisabled}
          label={side === Side.BID ? "Buy" : "Sell"}
          variant="primary"
          onClick={handleCreateTriggerOrder}
        />
        <CancelModalButton
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </CancelModalButton>
      </CloseButtonContainer>
    </DialogContainer>
  );
};
