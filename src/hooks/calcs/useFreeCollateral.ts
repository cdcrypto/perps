import { useEffect, useState } from "react";
import { useClientStore, useSelectedContractStore, useZetaStore } from "stores";
import { Exchange } from "@zetamarkets/sdk";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useIsTaker } from "@hooks/useIsTaker";
import { AccountMetric } from "@types";

export const useFreeCollateral = (simulate = false) => {
  const client = useClientStore((s) => s.client);
  const prices = useZetaStore((s) => s.prices);
  const { asset, size, price, side } = useSelectedContractStore((s) => ({
    asset: s.asset,
    size: s.quoteSize,
    price: s.quotePrice,
    side: s.side,
  }));
  const [freeCollateral, setFreeCollateral] = useState<AccountMetric>();
  const [simulatedFreeCollateral, setSimulatedFreeCollateral] =
    useState<AccountMetric>();
  const isTaker = useIsTaker();
  const signedSize = side === Side.BID ? size : -size;

  useEffect(() => {
    if (!client) {
      setFreeCollateral(undefined);
      return;
    }

    if (!client.account) {
      setFreeCollateral(null);
      return;
    }

    const _freeCollateral = Exchange.riskCalculator.getFreeCollateral(
      client.account,
      undefined,
      false
    );

    setFreeCollateral(_freeCollateral);
  }, [prices, client]);

  useEffect(() => {
    if (!client || !simulate) {
      setSimulatedFreeCollateral(undefined);
      return;
    }

    if (!client.account) {
      setSimulatedFreeCollateral(null);
      return;
    }

    const _simulatedFreeCollateral = Exchange.riskCalculator.getFreeCollateral(
      client.account,
      {
        asset,
        price,
        size: signedSize,
        isTaker,
      }
    );

    setSimulatedFreeCollateral(_simulatedFreeCollateral);
  }, [prices, client, asset, signedSize, price, simulate, isTaker]);

  return {
    freeCollateral,
    simulatedFreeCollateral,
  };
};
