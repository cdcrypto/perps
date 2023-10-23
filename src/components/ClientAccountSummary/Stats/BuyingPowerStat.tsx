import { useBuyingPower } from "@hooks/calcs/useBuyingPower";
import { ClientAccountStat } from "./ClientAccountStat";

export const BuyingPowerStat = () => {
  const { buyingPower, simulatedBuyingPower } = useBuyingPower(true);

  return (
    <ClientAccountStat
      variant="dollar"
      initialValue={buyingPower}
      currentValue={simulatedBuyingPower}
    />
  );
};
