import { useAccountLeverage } from "@hooks/calcs/useAccountLeverage";
import { ClientAccountStat } from "./ClientAccountStat";

export const AccountLeverageStat = () => {
  const { accountLeverage, simulatedAccountLeverage } =
    useAccountLeverage(true);

  return (
    <ClientAccountStat
      variant="leverage"
      initialValue={accountLeverage}
      currentValue={simulatedAccountLeverage}
    />
  );
};
