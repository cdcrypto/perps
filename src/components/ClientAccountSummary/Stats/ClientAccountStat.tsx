import { UserState, useUserState } from "@hooks/client/useUserState";
import React from "react";
import { DeltaStat } from "../StatsUpdate";
import { StatsText } from "../StatsText";
import { useSelectedContractStore } from "stores";
import { TextColor } from "@components/Text/Text";
import { AccountMetric } from "@types";

interface Props {
  initialValue: AccountMetric;
  currentValue: AccountMetric;
  variant: "percentage" | "dollar" | "leverage";
  currentColor?: TextColor | undefined;
}

export const ClientAccountStat: React.FC<Props> = ({
  initialValue,
  currentValue,
  currentColor,
  variant,
}) => {
  const userState = useUserState();
  const size = useSelectedContractStore((s) => s.quoteSize);

  if (
    userState === UserState.DISCONNECTED ||
    userState === UserState.CONNECTED_AND_LOADING
  ) {
    return (
      <StatsText
        color="primary"
        statValue={undefined}
        variant={variant}
        textVariant="body2"
      />
    );
  } 
  
  if (userState === UserState.CONNECTED_WITHOUT_MARGIN_ACCOUNT) {
    return (
      <StatsText
        color="primary"
        statValue={0}
        variant={variant}
        textVariant="body2"
      />
    );
  } 
  
  if (size === 0) {
    return (
      <StatsText
        color={currentColor ? currentColor : "primary"}
        statValue={initialValue}
        variant={variant}
        textVariant="body2"
      />
    );
  }

  return (
    <DeltaStat
      initialValue={initialValue}
      currentValue={currentValue}
      currentColor={currentColor}
      variant={variant}
    />
  );
};
