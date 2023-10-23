import { useEffect, useState } from "react";
import { useClientStore, useSelectedContractStore, useZetaStore } from "stores";
import { Exchange } from "@zetamarkets/sdk";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useIsTaker } from "@hooks/useIsTaker";
import { AccountMetric } from "@types";

export const useAccountEquity = (simulate = false) => {
  const client = useClientStore((s) => s.client);
  const prices = useZetaStore((s) => s.prices);
  const { asset, size, price, side } = useSelectedContractStore((s) => ({
    asset: s.asset,
    size: s.quoteSize,
    price: s.quotePrice,
    side: s.side,
  }));
  const [accountEquity, setAccountEquity] = useState<AccountMetric>();
  const [simulatedAccountEquity, setSimulatedAccountEquity] =
    useState<AccountMetric>();
  const isTaker = useIsTaker();
  const signedSize = side === Side.BID ? size : -size;

  useEffect(() => {
    if (!client) {
      setAccountEquity(undefined);
      return;
    }

    if (!client.account) {
      setAccountEquity(null);
      return;
    }

    const _accountEquity = Exchange.riskCalculator.getEquity(
      client.account,
      undefined,
      false
    );
    setAccountEquity(_accountEquity);
  }, [prices, client]);

  useEffect(() => {
    if (!client || !simulate) {
      setSimulatedAccountEquity(undefined);
      return;
    }

    if (!client.account) {
      setSimulatedAccountEquity(null);
      return;
    }

    const _simulatedAccountEquity = Exchange.riskCalculator.getEquity(
      client.account,
      {
        asset,
        price,
        size: signedSize,
        isTaker,
      }
    );

    setSimulatedAccountEquity(_simulatedAccountEquity);
  }, [prices, client, asset, signedSize, price, simulate, isTaker]);

  return {
    accountEquity,
    simulatedAccountEquity,
  };
};
