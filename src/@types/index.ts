import { Client } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { MarginAccount } from "@zetamarkets/sdk/dist/program-types";
import { Order, Side } from "@zetamarkets/sdk/dist/types";

export type Trade = {
  asset: Asset;
  timestamp: number;
  side: Side;
  size: number;
  price: number;
  isTaker?: boolean;
  isLiquidation?: boolean;
};

export type Migration = {
  migrationRequired: boolean;
  marginAccounts: MarginAccount[];
  openOrders: Record<Asset, Order[]>;
  client: Client;
};

export enum FundingPeriod {
  Hourly = "Hourly",
  Daily = "Daily",
  Annually = "Annually",
}


export enum TriggerOrderType {
  TAKE_PROFIT = "TakeProfit",
  STOP_LOSS = "StopLoss",
}


/**
 * Represents an account metric.
 * - `null`: Returned when the user is connected but no margin account exists.
 * - `undefined`: Returned when the user is not connected or no client.
 * - `number`: Returned in all other cases.
 */
export type AccountMetric = null | undefined | number;

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
