import { useFreeCollateral } from "@hooks/calcs/useFreeCollateral";
import { ClientAccountStat } from "./ClientAccountStat";

export const FreeCollateralStat = () => {
  const { freeCollateral, simulatedFreeCollateral } = useFreeCollateral(true);

  return (
    <ClientAccountStat
      variant="dollar"
      initialValue={freeCollateral}
      currentValue={simulatedFreeCollateral}
    />
  );
};
