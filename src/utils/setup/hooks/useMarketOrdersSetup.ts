import { useLiquidityCheck } from "@hooks/useLiquidityCheck";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { useEffect } from "react";
import { useSelectedContractStore } from "stores";
import { SyntheticOrderType } from "stores/useSelectedContract";

export const useMarketOrdersSetup = () => {
  const orderType = useSelectedContractStore((s) => s.orderType);
  const quoteSize = useSelectedContractStore((s) => s.quoteSize);
  const side = useSelectedContractStore((s) => s.side);
  const setQuotePrice = useSelectedContractStore((s) => s.setQuotePrice);

  const { selectedAsset } = useMarketDetails();
  const { worstPrice } = useLiquidityCheck(quoteSize, selectedAsset, side);

  useEffect(() => {
    if (orderType === SyntheticOrderType.MARKET) {
      setQuotePrice(worstPrice);
    }
  }, [orderType, setQuotePrice, worstPrice]);
};
