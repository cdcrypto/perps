import { Exchange } from "@zetamarkets/sdk";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { useClientStore } from "./useClientStore";
import { AssetRiskState } from "@zetamarkets/sdk/dist/types";
import { Asset } from "@zetamarkets/sdk/dist/constants";

type State = {
  unrealizedPnl?: number;
  availableBalance?: number;
  liquidationBuffer?: number;
  marginAccountBalance?: number;
  totalAccountEquity?: number;
  totalInitialMargin?: number;
  totalMaintenanceMargin?: number;
  assetMetrics?: Map<Asset, AssetRiskState>;
};

type Action = {
  clearStore: () => void;
  updateMarginAccountCalcs: () => void;
};

const calculationStoreInitValues: State = {
  unrealizedPnl: undefined,
  availableBalance: undefined,
  liquidationBuffer: undefined,
  marginAccountBalance: undefined,
  totalAccountEquity: undefined,
  totalInitialMargin: undefined,
  totalMaintenanceMargin: undefined,
  assetMetrics: undefined,
};

// PRTODO: look where all of these ones are being used.
export const useCalculationStore = create<State & Action>()(
  devtools(
    (set) => ({
      ...calculationStoreInitValues,

      clearStore: () => {
        set({
          ...calculationStoreInitValues,
        });
      },

      updateMarginAccountCalcs: () => {
        const client = useClientStore.getState().client;
        if (!client) return;

        const marginAccount = client.account;

        // If user has no margin account, they should also have no valid stats
        if (!marginAccount) {
          set({
            ...calculationStoreInitValues,
          });
          return;
        }

        // Used internally
        const marginAccountState =
          Exchange.riskCalculator.getCrossMarginAccountState(marginAccount);

        // Exposed externally
        const unrealizedPnl = marginAccountState.unrealizedPnlTotal;

        const marginAccountBalance = convertNativeBNToDecimal(
          marginAccount.balance
        );

        const availableBalance = marginAccountState.availableBalanceInitial;

        // TODO: reanmae to avail bal maintenance
        const liquidationBuffer =
          marginAccountState.availableBalanceMaintenance;

        const totalAccountEquity = marginAccountState.equity;

        const totalMaintenanceMargin =
          marginAccountState.maintenanceMarginTotal;

        const totalInitialMargin = marginAccountState.initialMarginTotal;

        const assetMetrics = marginAccountState.assetState;

        set({
          availableBalance,
          liquidationBuffer,
          marginAccountBalance,
          totalAccountEquity,
          totalInitialMargin,
          totalMaintenanceMargin,
          unrealizedPnl,
          assetMetrics,
        });
      },
    }),
    {
      name: "calculations",
    }
  )
);
