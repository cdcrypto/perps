import { DeltaContainer } from "./styles";
import RightArrow from "@assets/RightArrow";
import { StatsText } from "./StatsText";
import { TextColor } from "@components/Text/Text";
import { useTheme } from "styled-components";
import { AccountMetric } from "@types";

interface DeltaStatProps {
  variant: "percentage" | "dollar" | "leverage";
  initialValue: AccountMetric;
  currentValue: AccountMetric;
  currentColor: TextColor | undefined;
  isHighlighted?: boolean;
}

export const DeltaStat = ({
  variant,
  initialValue,
  currentValue,
  currentColor,
  isHighlighted,
}: DeltaStatProps) => {
  const theme = useTheme();
  return (
    <DeltaContainer>
      <StatsText
        textVariant="body2"
        color={"textDisabled"}
        variant={variant}
        statValue={initialValue}
      />
      <RightArrow
        fill={theme?.grey[600]}
        height={16}
        width={16}
        style={{ marginLeft: 2, marginRight: 2 }}
      />
      <StatsText
        textVariant="body2"
        variant={variant}
        color={currentColor ? currentColor : "primary"}
        statValue={currentValue}
        isBold={isHighlighted}
      />
    </DeltaContainer>
  );
};
