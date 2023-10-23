import { useEffect, useState } from "react";
import { useClientStore, useSelectedContractStore, useZetaStore } from "stores";
import { Exchange } from "@zetamarkets/sdk";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useIsTaker } from "@hooks/useIsTaker";
import { AccountMetric } from "@types";

export const useBuyingPower = (simulate = false) => {
  const client = useClientStore((s) => s.client);
  const prices = useZetaStore((s) => s.prices);
  const { asset, size, price, side } = useSelectedContractStore((s) => ({
    asset: s.asset,
    size: s.quoteSize,
    price: s.quotePrice,
    side: s.side,
  }));
  const [buyingPower, setBuyingPower] = useState<AccountMetric>();
  const [simulatedBuyingPower, setSimulatedBuyingPower] =
    useState<AccountMetric>();
  const isTaker = useIsTaker();
  const signedSize = side === Side.BID ? size : -size;

  useEffect(() => {
    if (!client) {
      setBuyingPower(undefined);
      return;
    }

    if (!client.account) {
      setBuyingPower(null);
      return;
    }

    const _buyingPower = Exchange.riskCalculator.getBuyingPower(
      client.account,
      asset,
      undefined,
      false
    );
    setBuyingPower(_buyingPower);
  }, [prices, client, asset]);

  useEffect(() => {
    if (!client || !simulate) {
      setSimulatedBuyingPower(undefined);
      return;
    }

    if (!client.account) {
      setSimulatedBuyingPower(null);
      return;
    }

    const _simulatedBuyingPower = Exchange.riskCalculator.getBuyingPower(
      client.account,
      asset,
      {
        asset,
        price,
        size: signedSize,
        isTaker,
      }
    );

    setSimulatedBuyingPower(_simulatedBuyingPower);
  }, [prices, client, asset, signedSize, price, simulate, isTaker]);

  return {
    buyingPower,
    simulatedBuyingPower,
  };
};
