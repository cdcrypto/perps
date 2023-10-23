import AddBox from "@assets/AddBox";
import { TakeProfitStopLossModal } from "@components/TakeProfitStopLossModal";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { PropsWithChildren, useState } from "react";
import { ButtonContainer, DotContainer } from "./styles";
import { useNearestTriggerOrders } from "@hooks/client/useNearestTriggerOrders";
import FilledCircle from "@assets/FilledCircle";
import { useTheme } from "styled-components";
import { TakeProfitStopLossTooltip } from "./TakeProfitStopLossTooltip";
import { convertNativeIntegerToDecimal } from "@zetamarkets/sdk/dist/utils";
import { CustomTooltip } from "@components/CustomTooltip";
export interface TakeProfitStopLossButtonProps {
  asset: Asset;
  switchToTriggerOrdersTab: () => void;
}

type TakeProfitStopLossRawButtonProps = PropsWithChildren<{
  fill?: string;
  onClick?: () => void;
}>

export const TakeProfitStopLossRawButton = ({ fill, children, onClick }: TakeProfitStopLossRawButtonProps) => {
  const theme = useTheme();
  const fillColor = fill ?? theme?.typography.clickable.disabled;
  return (
    <ButtonContainer onClick={onClick}>
      <AddBox fill={fillColor} />
      {children}
    </ButtonContainer>
  );
};

export const TakeProfitStopLossButton = ({
  asset,
  switchToTriggerOrdersTab,
}: TakeProfitStopLossButtonProps) => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const { nearestStopLoss, nearestTakeProfit, canOpenTriggers } =
    useNearestTriggerOrders(asset);
  const hasStopLoss = nearestStopLoss !== undefined;
  const hasTakeProfit = nearestTakeProfit !== undefined;
  const hasTriggerOrders = hasStopLoss || hasTakeProfit;
  const stopLossPrice =
    hasStopLoss &&
    convertNativeIntegerToDecimal(nearestStopLoss.triggerPrice ?? 0);
  const takeProfitPrice =
    hasTakeProfit &&
    convertNativeIntegerToDecimal(nearestTakeProfit.triggerPrice ?? 0);
  const addBoxFill = canOpenTriggers
    ? theme?.typography.clickable.enabled
    : theme?.typography.clickable.disabled;

  const handleButtonClick = () => {
    if (!canOpenTriggers) {
      switchToTriggerOrdersTab();
    } else {
      setModalOpen(true);
    }
  };

  const handleDotClick = () => {
    switchToTriggerOrdersTab();
  };

  return (
    <>
      <TakeProfitStopLossModal
        asset={asset}
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Take Profit / Stop Loss"
      />
      <CustomTooltip
        tooltipPosition="left"
        content={
          <TakeProfitStopLossTooltip
            nearestStopLossPrice={stopLossPrice}
            nearestTakeProfitPrice={takeProfitPrice}
          />
        }
      >
        <TakeProfitStopLossRawButton fill={addBoxFill} onClick={handleButtonClick}>
          {hasTriggerOrders && (
            <DotContainer onClick={handleDotClick}>
              {hasTakeProfit && <FilledCircle fill={theme?.typography.long} />}
              {hasStopLoss && <FilledCircle fill={theme?.typography.short} />}
            </DotContainer>
          )}
        </TakeProfitStopLossRawButton>
      </CustomTooltip>
    </>
  );
};
