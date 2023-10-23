import { useEffect, useState } from "react";
import { useClientStore, useSelectedContractStore, useZetaStore } from "stores";
import { Exchange } from "@zetamarkets/sdk";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useIsTaker } from "@hooks/useIsTaker";
import { AccountMetric } from "@types";

export const useMarginUsage = (simulate = false) => {
  const client = useClientStore((s) => s.client);
  const prices = useZetaStore((s) => s.prices);
  const { asset, size, price, side } = useSelectedContractStore((s) => ({
    asset: s.asset,
    size: s.quoteSize,
    price: s.quotePrice,
    side: s.side,
  }));
  const [marginUsage, setMarginUsage] = useState<AccountMetric>();
  const [simulatedMarginUsage, setSimulatedMarginUsage] =
    useState<AccountMetric>();
  const isTaker = useIsTaker();
  const signedSize = side === Side.BID ? size : -size;

  useEffect(() => {
    if (!client) {
      setMarginUsage(undefined);
      return;
    }

    if (!client.account) {
      setMarginUsage(null);
      return;
    }

    const _marginUsage = Exchange.riskCalculator.getMarginUsagePercent(
      client.account,
      undefined,
      false
    );

    if (isNaN(_marginUsage)) {
      setMarginUsage(0);
    } else {
      setMarginUsage(_marginUsage);
    }
  }, [prices, client]);

  useEffect(() => {
    if (!client || !simulate) {
      setSimulatedMarginUsage(undefined);
      return;
    }

    if (!client.account) {
      setSimulatedMarginUsage(null);
      return;
    }

    const _simulatedMarginUsage = Exchange.riskCalculator.getMarginUsagePercent(
      client.account,
      {
        asset,
        price,
        size: signedSize,
        isTaker,
      }
    );

    setSimulatedMarginUsage(_simulatedMarginUsage);
  }, [prices, client, asset, signedSize, price, simulate, isTaker]);

  return {
    marginUsage,
    simulatedMarginUsage,
  };
};
