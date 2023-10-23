import { Asset } from "@zetamarkets/sdk/dist/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PERP_MARKET_ORDER_SPOT_SLIPPAGE } from "@utils/constants";
import { SyntheticOrderType } from "./useSelectedContract";
import { Side } from "@zetamarkets/sdk/dist/types";

export enum FeePriorityLevel {
  NONE = "None",
  LOW = "Low",
  HIGH = "High",
}

export enum RpcProviderType {
  TRITON = "Triton",
  CUSTOM = "Custom",
}

export enum OrderbookPriceIncrement {
  ONE = "1",
  TENTH = "0.1",
  HUNDREDTH = "0.01",
  THOUSANDTH = "0.001",
  TEN_THOUSANDTH = "0.0001",
}

interface UserSettings {
  enableTooltips: boolean;
  defaultAsset: Asset;
  marketOrderSlippage: number;
  displayWalletAddress: boolean;
  feePriorityLevel: FeePriorityLevel;
  rpcProvider: RpcProviderType;
  customRpcUrl?: string;
}

type OrderQuantityType = "asset" | "usd";

export interface TradingSettings {
  orderType: SyntheticOrderType;
  orderSide: Side;
  orderQuantityType: OrderQuantityType;
  orderbookPriceIncrements: Partial<Record<Asset, OrderbookPriceIncrement>>;
}

export interface TradingSettingsStore {
  setOrderType: (orderType: SyntheticOrderType) => void;
  setOrderSide: (side: Side) => void;
  setOrderQuantityType: (orderQuantityType: OrderQuantityType) => void;
  setOrderbookPriceIncrement: (asset: Asset, orderbookPriceIncrement: OrderbookPriceIncrement) => void;
}

export interface UserSettingsStore extends UserSettings, TradingSettings, TradingSettingsStore {
  setEnableTooltips: (enableTooltips: boolean) => void;
  setDefaultAsset: (defaultAsset: Asset) => void;
  setmarketOrderSlippage: (marketOrderSlippage: number) => void;
  setDisplayWalletAddress: (displayWalletAddress: boolean) => void;
  setFeePriorityLevel: (feePriorityLevel: FeePriorityLevel) => void;
  setRpcProvider: (rpcProvider: RpcProviderType) => void;
  setCustomRpcUrl: (customRpcUrl: string) => void;

  setSettings: (settings: Partial<UserSettings>) => void;
}

export const useUserSettings = create<UserSettingsStore>()(
  persist(
    (set, get) => ({

      enableTooltips: true,
      defaultAsset: Asset.SOL,
      marketOrderSlippage: PERP_MARKET_ORDER_SPOT_SLIPPAGE,
      displayWalletAddress: true,
      feePriorityLevel: FeePriorityLevel.NONE,
      rpcProvider: RpcProviderType.TRITON,
      customRpcUrl: undefined,

      orderType: SyntheticOrderType.MARKET,
      orderSide: Side.BID,
      orderQuantityType: "asset",
      orderbookPriceIncrements: {},

      setEnableTooltips: (enableTooltips) => set({ enableTooltips }),
      setDefaultAsset: (defaultAsset) => set({ defaultAsset }),
      setmarketOrderSlippage: (marketOrderSlippage) => set({ marketOrderSlippage }),
      setDisplayWalletAddress: (displayWalletAddress) => set({ displayWalletAddress }),
      setFeePriorityLevel: (feePriorityLevel) => set({ feePriorityLevel }),
      setRpcProvider: (rpcProvider) => set({ rpcProvider }),
      setCustomRpcUrl: (customRpcUrl) => set({ customRpcUrl }),

      setSettings: (settings: Partial<UserSettings>) => set(settings),

      setOrderType: (orderType) => set({ orderType }),
      setOrderSide: (orderSide) => set({ orderSide }),
      setOrderQuantityType: (orderQuantityType) => set({ orderQuantityType }),
      setOrderbookPriceIncrement: (asset, orderbookPriceIncrement) => set({ orderbookPriceIncrements: { ...get().orderbookPriceIncrements, [asset]: orderbookPriceIncrement } }),
    }),
    {
      name: "userSettings",
    }
  )
);
