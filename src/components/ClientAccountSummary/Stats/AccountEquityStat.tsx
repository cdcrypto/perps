import { useAccountEquity } from "@hooks/calcs/useAccountEquity";
import { ClientAccountStat } from "./ClientAccountStat";

export const AccountEquityStat = () => {
  const { accountEquity, simulatedAccountEquity } = useAccountEquity(true);

  return (
    <ClientAccountStat
      variant="dollar"
      initialValue={accountEquity}
      currentValue={simulatedAccountEquity}
    />
  );
};
