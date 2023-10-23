import { Text } from "@components/Text";
import { BalanceContainer, BalanceRow } from "./styles";

export const WalletBalance = ({
  balance,
  subtext,
  icon,
}: {
  balance: string;
  subtext: string;
  icon?: JSX.Element;
}) => {
  return (
    <BalanceContainer>
      <Text variant="label" color="secondary">
        {subtext}
      </Text>
      <BalanceRow>
        <Text variant="body2" color="primary">
          {balance} {icon}
        </Text>
        <Text variant="caption" color="primary">
          USDC
        </Text>
      </BalanceRow>
    </BalanceContainer>
  );
};
