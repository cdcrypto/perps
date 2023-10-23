import { useClientStore, useSelectedContractStore } from "stores";
import { Container } from "./styles";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { Switcher } from "@components/Switcher";
import { Side } from "@zetamarkets/sdk/dist/types";
import { SyntheticOrderType } from "stores/useSelectedContract";
import { useEffect } from "react";

interface ReduceOnlyProps {
  setOrderType: (orderType: SyntheticOrderType) => void;
}

export const ReduceOnly = ({ setOrderType }: ReduceOnlyProps) => {
  const { asset, quoteSide, orderType, reduceOnly, setReduceOnly } =
    useSelectedContractStore((s) => ({
      asset: s.asset,
      quoteSide: s.side,
      orderType: s.orderType,
      reduceOnly: s.reduceOnly,
      setReduceOnly: s.setReduceOnly,
    }));
  const position = useClientStore((s) => s.positions[asset]);
  const signedPositionSize = position?.size ?? 0;
  const positionSide = signedPositionSize >= 0 ? Side.BID : Side.ASK;
  const nonZeroPositionSize = signedPositionSize !== 0;
  const isReducingPosition = quoteSide !== positionSide;
  const isValidOrderType =
    orderType === SyntheticOrderType.MARKET ||
    orderType === SyntheticOrderType.LIMIT ||
    orderType === SyntheticOrderType.FILLORKILL ||
    orderType === SyntheticOrderType.IMMEDIATEORCANCEL;
  const reduceOnlyPossible =
    nonZeroPositionSize && isReducingPosition && isValidOrderType;

  const toggleReduceOnly = () => {
    if (!reduceOnly && orderType === SyntheticOrderType.LIMIT) {
      setOrderType(SyntheticOrderType.FILLORKILL);
    }

    setReduceOnly(!reduceOnly);
  };

  useEffect(() => {
    if (!reduceOnlyPossible) {
      setReduceOnly(false);
    }
  }, [reduceOnlyPossible, setReduceOnly]);

  if (!reduceOnlyPossible) {
    return null;
  }

  return (
    <Container>
      <Tooltip
        content={{
          header: "Reduce only",
          body: TooltipDefinitions.orderForm.reduceOnly,
        }}
      >
        <Text dotted withTooltip variant="label" color="secondary">
          Reduce only
        </Text>
      </Tooltip>

      <Switcher checked={reduceOnly} onSwitch={toggleReduceOnly} />
    </Container>
  );
};
