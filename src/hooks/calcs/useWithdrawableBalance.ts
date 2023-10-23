import { useClient } from "@hooks/client/useClient";
import { getFlatOrders } from "@hooks/client/useFlatOrders";
import { getFlatPositions } from "@hooks/client/useFlatPositions";
import { useInterval } from "@hooks/utility/useInterval";
import { Exchange } from "@zetamarkets/sdk";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import { useCallback, useEffect, useState } from "react";

const SLIPPAGE_TOLERALANCE = 0.99;

export const useWithdrawableBalance = (interval: number | null) => {
  const client = useClient();
  const [withdrawableBalance, setWithdrawableBalance] = useState<number>();

  const getWithdrawableBalance = useCallback(() => {
    const marginAccount = client?.account;
    if (!marginAccount) return;

    const marginAccountState =
      Exchange.riskCalculator.getCrossMarginAccountState(marginAccount);

    const balance = convertNativeBNToDecimal(marginAccount.balance);
    const hasPositions = getFlatPositions().length > 0;
    const hasOrders = getFlatOrders().length > 0;

    // In the case where the users has no position or orders
    // There is no need for the slippage tolerance.
    if (!hasPositions && !hasOrders) {
      setWithdrawableBalance(balance);
      return;
    }

    const totalUnrealizedPNL = marginAccountState.unrealizedPnlTotal;
    const totalInitialMargin = marginAccountState.initialMarginTotal;

    const limit =
      balance -
      totalInitialMargin -
      (totalUnrealizedPNL < 0 ? Math.abs(totalUnrealizedPNL) : 0);

    // Add slippage tolerance if margin requirements / unrealized pnl changes
    const limitWithTolerance = limit * SLIPPAGE_TOLERALANCE;
    const withdrawableAmount = Math.max(0, limitWithTolerance);

    setWithdrawableBalance(withdrawableAmount);
  }, [client?.account]);

  useEffect(() => {
    if (!client) return;
    getWithdrawableBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useInterval(getWithdrawableBalance, interval);

  return withdrawableBalance;
};
