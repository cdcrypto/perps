import { useMarginUsage } from "@hooks/calcs/useMarginUsage";
import { ClientAccountStat } from "./ClientAccountStat";
import { getMarginUsageTextColor } from "@utils/general";

export const MarginUsageStat = () => {
  const { marginUsage, simulatedMarginUsage } = useMarginUsage(true);
  const textColor = getMarginUsageTextColor(simulatedMarginUsage);

  return (
    <ClientAccountStat
      variant="percentage"
      initialValue={marginUsage}
      currentValue={simulatedMarginUsage}
      currentColor={textColor}
    />
  );
};
