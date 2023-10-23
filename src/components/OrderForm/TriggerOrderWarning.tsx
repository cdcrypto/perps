import { useAssetTriggerOrders } from "@hooks/client/useTriggerOrders";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { StyledWarningIcon, WarningContainer } from "./styles";
import { Text } from "@components/Text";
import { useTheme } from "styled-components";
import { useClientStore, useSelectedContractStore } from "stores";
import { checkIfClosingPosition, convertToSignedSize } from "@utils/general";
import { Side } from "@zetamarkets/sdk/dist/types";

interface TriggerOrderWarningProps {
  asset: Asset;
  side: Side;
  forceShow?: boolean;
  className?: string;
}

export const TriggerOrderWarning = ({
  asset,
  side,
  forceShow = false,
  className,
}: TriggerOrderWarningProps) => {
  const triggerOrders = useAssetTriggerOrders(asset);
  const hasTriggerOrders = triggerOrders.length > 0;
  const theme = useTheme();
  const position = useClientStore((s) => s.positions[asset]);
  const signedPositionSize = position?.size ?? 0;
  const orderSize = useSelectedContractStore((s) => s.quoteSize);
  const signedOrderSize = convertToSignedSize(orderSize, side);
  const isClosingPosition = checkIfClosingPosition(
    signedPositionSize,
    signedOrderSize
  );

  if (!forceShow && (!hasTriggerOrders || !isClosingPosition)) {
    return null;
  }

  return (
    <WarningContainer className={className}>
      <StyledWarningIcon width={24} height={24} fill={theme?.signals.warning} />
      <Text variant="body2" color="secondary">
        Closing your position will automatically cancel your existing {asset}{" "}
        TP/SL order(s).
      </Text>
    </WarningContainer>
  );
};
