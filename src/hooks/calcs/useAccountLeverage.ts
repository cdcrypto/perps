import { useEffect, useState } from "react";
import { useClientStore, useSelectedContractStore, useZetaStore } from "stores";
import { Exchange } from "@zetamarkets/sdk";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useIsTaker } from "@hooks/useIsTaker";
import { AccountMetric } from "@types";

export const useAccountLeverage = (simulate = false) => {
  const client = useClientStore((s) => s.client);
  const prices = useZetaStore((s) => s.prices);
  const { asset, size, price, side } = useSelectedContractStore((s) => ({
    asset: s.asset,
    size: s.quoteSize,
    price: s.quotePrice,
    side: s.side,
  }));
  const [accountLeverage, setAccountLeverage] = useState<AccountMetric>();
  const [simulatedAccountLeverage, setSimulatedAccountLeverage] =
    useState<AccountMetric>();
  const isTaker = useIsTaker();
  const signedSize = side === Side.BID ? size : -size;

  useEffect(() => {
    if (!client) {
      setAccountLeverage(undefined);
      return;
    }

    if (!client.account) {
      setAccountLeverage(null);
      return;
    }

    const _leverage = Exchange.riskCalculator.getLeverage(
      client.account,
      undefined,
      false
    );

    if (isNaN(_leverage)) {
      setAccountLeverage(0);
    } else {
      setAccountLeverage(_leverage);
    }
  }, [prices, client]);

  useEffect(() => {
    if (!client || !simulate) {
      setSimulatedAccountLeverage(undefined);
      return;
    }

    if (!client.account) {
      setSimulatedAccountLeverage(null);
      return;
    }

    const _simulatedLeverage = Exchange.riskCalculator.getLeverage(
      client.account,
      {
        asset,
        price,
        size: signedSize,
        isTaker,
      }
    );

    setSimulatedAccountLeverage(_simulatedLeverage);
  }, [prices, client, asset, signedSize, price, simulate, isTaker]);

  return {
    accountLeverage,
    simulatedAccountLeverage,
  };
};
