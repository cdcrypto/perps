import { useState, useCallback, useEffect, useMemo } from "react";
import { useTransactions } from "@hooks/client/useTransactions";
import { SyntheticOrderType } from "stores/useSelectedContract";
import {
  DialogContent,
  DialogBody,
  DialogNumericalInput,
  DialogSingleRow,
  CloseButtonContainer,
  AmountContainer,
  StyledTriggerOrderWarning,
} from "./styles";
import { ClosePositionSummary } from "./ClosePositionSummary";
import { CancelModalButton } from "@web/components/DepositWithdraw/styles";
import { Button } from "@components/Button";
import { PercentageSelector } from "@components/PercentageSelector";
import { Percentage } from "@components/PercentageSelector/PercentageSelector";
import { Asset, POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useMaxCloseSize } from "@hooks/calcs/useMaxCloseSize";
import { useClientStore } from "stores";
import Big from "big.js";
import { Contract } from "./Contract";
import { Text } from "@components/Text";
import { useLiquidityCheck } from "@hooks/useLiquidityCheck";
import { useAssetTriggerOrders } from "@hooks/client/useTriggerOrders";
import { ReduceOnlyNotice } from "@components/Modal/ReduceOnlyNotice";
import { OrderTypeAndPriceDisplay } from "./OrderTypeAndPriceDisplay";

export const ClosePositionDialog = ({
  asset,
  onClose,
}: {
  asset: Asset;
  onClose: () => void;
}): JSX.Element => {
  const [priceInput, setPriceInput] = useState<string>("");
  const [closeAmountInput, setCloseAmountInput] = useState<string>("");
  const closingAssetSize = Number(closeAmountInput) || 0;
  // a value b/w 0-100 of the selected percentage
  const [selectedPercentageSize, setSelectedPercentageSize] = useState<
    Percentage | undefined
  >(100);
  const orderType = SyntheticOrderType.MARKET;
  // There we can only close a position if it actually exists, so we can safely asset that the position exists
  const position = useClientStore((s) => s.positions[asset]!);
  const triggerOrders = useAssetTriggerOrders(asset);
  const showTriggerCancelWarning =
    triggerOrders.length > 0 && selectedPercentageSize === 100;
  const transactions = useTransactions();

  const closingSide = position.size > 0 ? Side.ASK : Side.BID;
  const closingLimits = useMaxCloseSize(
    {
      price: Number(priceInput) || 0,
      asset,
      side: position.size > 0 ? Side.BID : Side.ASK,
      closeSize: Number(closeAmountInput) || 0,
    },
    1000
  );

  const { avgPrice, worstPrice } = useLiquidityCheck(
    closingAssetSize,
    asset,
    closingSide
  );

  /**
   * Update price input as orderbook liquidity changes, if market order
   *
   */
  useEffect(() => {
    if (orderType === SyntheticOrderType.MARKET) {
      setPriceInput(worstPrice.toString());
    }
  }, [orderType, worstPrice]);

  const handleClosePosition = useCallback(async () => {
    if (!transactions || !closingAssetSize || !priceInput) return;
    await transactions.placeOrder(
      {
        price: Number(priceInput),
        size: closingAssetSize,
      },
      closingSide,
      asset,
      orderType,
      true
    );
  }, [
    asset,
    closingAssetSize,
    closingSide,
    orderType,
    priceInput,
    transactions,
  ]);

  const isTaker = useMemo(() => {
    if (orderType === SyntheticOrderType.MARKET) return true;

    return closingSide === Side.BID
      ? Number(priceInput) >= avgPrice
      : Number(priceInput) <= avgPrice;
  }, [orderType, closingSide, priceInput, avgPrice]);

  const closePrice = useMemo(() => {
    // special case for market orders to stop the priceInput value boucing around on init
    // price input would bounce from 0 to avg price, before settling on avg price, but this yields glitchy stats
    if (orderType === SyntheticOrderType.MARKET) return avgPrice;

    return Number(priceInput) || 0;
  }, [orderType, priceInput, avgPrice]);

  return (
    <DialogContent>
      <DialogBody>
        <Contract asset={asset} side={closingSide} />
        <OrderTypeAndPriceDisplay
          asset={asset}
          side={closingSide}
          size={closingAssetSize}
        />

        <AmountContainer>
          <DialogSingleRow>
            <DialogNumericalInput
              value={closeAmountInput}
              setValue={setCloseAmountInput}
              max={closingLimits?.maxCloseSize ?? 0}
              decimalScale={POSITION_PRECISION}
              endAdornment={
                <Text variant="h3" color="secondary">
                  {asset}
                </Text>
              }
              label="Amount to Close"
              onValueChange={() => {
                setSelectedPercentageSize(undefined);
              }}
            />
          </DialogSingleRow>

          <DialogSingleRow>
            <PercentageSelector
              percentage={selectedPercentageSize}
              onPercentageSelect={(percentage, val) => {
                setSelectedPercentageSize(percentage);
                setCloseAmountInput(val.toString());
              }}
              max={closingLimits?.maxCloseSize ?? 0}
            />
          </DialogSingleRow>
        </AmountContainer>

        <ReduceOnlyNotice />
      </DialogBody>

      <ClosePositionSummary
        entryPrice={Big(position.costOfTrades)
          .div(position.size)
          .abs()
          .toNumber()}
        closePrice={closePrice}
        asset={asset}
        size={closingAssetSize}
        isTaker={isTaker}
        closingSide={closingSide}
        orderType={orderType}
      />

      <StyledTriggerOrderWarning
        asset={asset}
        side={closingSide}
        forceShow={showTriggerCancelWarning}
      />
      <CloseButtonContainer>
        <Button
          label="Close Position"
          variant="primary"
          disabled={!Number(closeAmountInput) || !Number(priceInput)}
          onClick={() => {
            void handleClosePosition().then(() => {
              onClose();
            });
          }}
        />
        <CancelModalButton
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </CancelModalButton>
      </CloseButtonContainer>
    </DialogContent>
  );
};
