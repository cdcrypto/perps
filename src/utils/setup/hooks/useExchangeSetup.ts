import { useMarketDetails } from "@hooks/useMarketDetails";
import { useInterval } from "@hooks/utility/useInterval";
import { useConnection } from "@solana/wallet-adapter-react";
import { getSolanaNetwork, getWhirligigConnection } from "@utils/connection";
import { Exchange, OraclePrice, utils } from "@zetamarkets/sdk";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { EventType } from "@zetamarkets/sdk/dist/events";
import { DummyWallet, LoadExchangeConfig } from "@zetamarkets/sdk/dist/types";
import { useEffect, useRef } from "react";
import {
  FeePriorityLevel,
  useCalculationStore,
  useUserSettings,
  useZetaStore,
} from "stores";

const LOAD_CONFIG: Omit<LoadExchangeConfig, "connection"> = {
  network: getSolanaNetwork(),
  orderbookConnection: getWhirligigConnection(),
  opts: utils.commitmentConfig(import.meta.env.VITE_COMMITMENT_LEVEL),

  throttleMs: 0,
  loadFromStore: true,
};

export const useExchangeSetup = () => {
  const { connection } = useConnection();
  const setExchangeInitialized = useZetaStore((s) => s.setIsInitialized);
  const isExchangeInitialized = useZetaStore((s) => s.isInitialized);
  const { selectedAsset } = useMarketDetails();
  const setPrice = useZetaStore((s) => s.setPrice);
  const updateMarginAccountCalcs = useCalculationStore(
    (s) => s.updateMarginAccountCalcs
  );

  const feePriorityLevel = useUserSettings((s) => s.feePriorityLevel);

  useInterval(() => {
    /**
     * Oracle price update every block
     * This limits to be every SERVER_FETCH_INTERVAL
     */

    // Make all assets updatable
    shouldUpdateOracleRef.current = allAssets().reduce(
      (a, v) => ({ ...a, [v]: true }),
      {}
    ) as Record<Asset, boolean>;
  }, import.meta.env.VITE_SERVER_FETCH_INTERVAL);

  // Oracle events come through every block, this dampens updates by allowing
  // oracles updates only every SERVER_UPDATE_INTERVAL seconds
  const shouldUpdateOracleRef = useRef<Record<Asset, boolean>>(
    // Make all assets updated in the beginning
    allAssets().reduce((a, v) => ({ ...a, [v]: true }), {}) as Record<
      Asset,
      boolean
    >
  );

  const callback = (
    asset: Asset,
    eventType: EventType,
    _slot: number,
    data: unknown
  ) => {
    switch (eventType) {
      case EventType.CLOCK:
        updateMarginAccountCalcs();
        break;
      case EventType.ORACLE:
        // eslint-disable-next-line no-case-declarations
        const oraclePrice = data as OraclePrice;

        if (!shouldUpdateOracleRef.current[asset]) return;
        setPrice(asset, oraclePrice.price);
        shouldUpdateOracleRef.current[asset] = false;

        break;
    }
  };

  // Only subscribe to the orderbook for the selected asset to reduce RPC load
  // We unsub + resub when switching assets
  // LOAD_CONFIG.orderbookAssetSubscriptionOverride = [selectedAsset];

  useEffect(() => {
    const config: LoadExchangeConfig = {
      ...LOAD_CONFIG,
      connection,
    };
    Exchange.load(config, new DummyWallet(), callback)
      .then(() => {
        setExchangeInitialized(true);
        // Set oracle as soon as exchange loaded instead of waiting for interval to fire
        callback(
          selectedAsset,
          EventType.ORACLE,
          0,
          Exchange.oracle.getPrice(selectedAsset)
        );

        // Enable priority fees
        Exchange.toggleAutoPriorityFee();
      })
      .catch((err: unknown) => {
        console.warn("Error on Exchange.load:", err);
      });

    return () => {
      try {
        void Exchange.close();
      } catch (e) {
        console.warn("Unable to close properly:", e);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isExchangeInitialized) return;

    Exchange.updateAutoPriorityFeeUpperLimit(10000);

    switch (feePriorityLevel) {
      case FeePriorityLevel.NONE:
        Exchange.setAutoPriorityFeeScaling(0, 0);
        break;
      case FeePriorityLevel.LOW:
        Exchange.setAutoPriorityFeeScaling(0, 1);
        break;
      case FeePriorityLevel.HIGH:
        Exchange.setAutoPriorityFeeScaling(1000, 2);
        break;
    }
  }, [feePriorityLevel, isExchangeInitialized]);
};
