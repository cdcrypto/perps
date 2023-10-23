import AptosIcon from "@assets/coins/AptosIcon";
import ArbitrumIcon from "@assets/coins/ArbitrumIcon";
import BitcoinIcon from "@assets/coins/BitcoinIcon";
import EthereumIcon from "@assets/coins/EthereumIcon";
import SolanaIcon from "@assets/coins/SolanaIcon";
import { TriggerOrderType } from "@types";
import { TextColor } from "@components/Text/Text";
import { Orderbooks } from "@hooks/api/useOrderbook";
import { QUERY_CLIENT } from "@utils/setup/query";
import { ROUTES } from "@web/routes";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side, TriggerDirection } from "@zetamarkets/sdk/dist/types";
import { format } from "date-fns";

export const getAssetIcon = (asset: Asset, size?: number) => {
  switch (asset) {
    case Asset.SOL:
      return <SolanaIcon height={size} width={size} />;
    case Asset.BTC:
      return <BitcoinIcon height={size} width={size} />;
    case Asset.ETH:
      return <EthereumIcon height={size} width={size} />;
    case Asset.APT:
      return <AptosIcon height={size} width={size} />;
    case Asset.ARB:
      return <ArbitrumIcon height={size} width={size} />;
    case Asset.UNDEFINED:
      return <SolanaIcon height={size} width={size} />;
  }
};

/**
 *
 * Accounts for signed dollar figure (number) and converts to currency string
 *
 * @param dollarAmount: number
 *
 */
export const convertDollarNumberToString = (
  dollarAmount: number | undefined,
  minDecimals?: number,
  maxDecimals?: number
) => {
  if (dollarAmount === undefined) return "$ -";
  return `${dollarAmount < 0 ? "-" : ""}$${Math.abs(
    dollarAmount
  ).toLocaleString(undefined, {
    minimumFractionDigits: minDecimals !== undefined ? minDecimals : 2,
    maximumFractionDigits: maxDecimals !== undefined ? maxDecimals : 4,
  })}`;
};

/**
 *
 * Accounts for figures (number) with long decimal places and rounds the value
 *
 * @param amount: number
 *
 */
export const convertNumberToString = (
  amount: number | undefined,
  minDecimals?: number,
  maxDecimals?: number
) => {
  if (amount === undefined) return "-";
  const threshold = Number(`0.${"0".repeat((maxDecimals || 2) - 1)}1`);
  if (amount > 0 && amount < threshold) return `<${threshold}`;
  return `${Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: minDecimals !== undefined ? minDecimals : 2,
    maximumFractionDigits: maxDecimals !== undefined ? maxDecimals : 4,
  })}`;
};

/**
 * Formats a UNIX date to a string in this format: DD MMM YY (e.g 12 Sep)
 * @param date
 * @returns formatted  date string
 */
export const getFormattedDate = (
  date: number,
  type?: "recent-trade-ts" | "trade-history-timestamp"
): string => {
  switch (type) {
    case "recent-trade-ts":
      return format(new Date(date), "kk:mm:ss");
    case "trade-history-timestamp":
      return format(new Date(date * 1000), "d LLL yyyy kk:mm");
    default:
      return format(new Date(date), "d LLL yyyy kk:mm");
  }
};

/**
 *
 * Converts any string to Capitalised string form
 *
 * @param string: string
 *
 */
export const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Provides a shortened version of a publicKey as a string
 */
export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const getOrderbooks = () => {
  return QUERY_CLIENT.getQueryData<Orderbooks>(["orderbook"]);
};

export const countDecimals = function (value: number) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

export const countDigits = function (value: number | string) {
  return value.toString().length;
};

export const assetToTradeSlug = (asset: Asset) => {
  return `${ROUTES.TRADE}/${asset.toString().toUpperCase()}-PERP`;
};

export const getMarginUsageTextColor = (
  marginUsage: number | null | undefined
): TextColor => {
  const definedMarginUsage = marginUsage || 0;

  if (definedMarginUsage <= 50) {
    return "success";
  } else if (definedMarginUsage <= 65) {
    return "alert";
  } else if (definedMarginUsage <= 75) {
    return "warning";
  } else if (definedMarginUsage <= 80) {
    return "caution";
  } else {
    return "danger";
  }
};

/**
 *
 * @param price       Order price
 * @param slippage    Slippage as a fraction: 1% -> 0.01
 * @param side        The side the order will be executing on
 * @returns           Adjusted order price accounting for slippage
 */
export const adjustOrderPriceForSlippage = (
  price: number,
  slippage: number,
  side: Side
) => {
  const slippageTolerance = slippage * price;
  const adjustedPrice =
    side === Side.BID ? price + slippageTolerance : price - slippageTolerance;
  return adjustedPrice;
};

/**
 * positionSide = Side.BID && triggerDirection = GTE => Take Profit
 * positionSide = Side.ASK && triggerDirection = LTE => Take Profit
 *
 *
 */
export const getTriggerOrderType = (
  positionSide: Side,
  triggerDirection: TriggerDirection
) => {
  if (
    (positionSide === Side.BID &&
      triggerDirection === TriggerDirection.GREATERTHANOREQUAL) ||
    (positionSide === Side.ASK &&
      triggerDirection === TriggerDirection.LESSTHANOREQUAL)
  ) {
    return TriggerOrderType.TAKE_PROFIT;
  }

  return TriggerOrderType.STOP_LOSS;
};

export const checkIfReducingOrder = (
  signedPositionSize: number,
  signedOrderSize: number
) => {
  return Math.sign(signedPositionSize) === -Math.sign(signedOrderSize);
};

export const checkIfClosingPosition = (
  signedPositionSize: number,
  signedOrderSize: number
) => {
  return (
    Math.sign(signedPositionSize) === -Math.sign(signedOrderSize) &&
    Math.abs(signedOrderSize) >= Math.abs(signedPositionSize)
  );
};

export const convertToSignedSize = (size: number, side: Side) => {
  if (side === Side.BID) {
    return Math.abs(size);
  }

  return -Math.abs(size);
};

export const trimeWalletAddress = (address: string) => {
  const len = address.length;
  return `${address.slice(0, 4)}...${address.slice(len - 4, len)}`;
};

export const getTriggerOrderDescription = (
  triggerDirection: TriggerDirection | null,
  asset: Asset,
  size: number,
  triggerPrice: number,
  isLong: boolean
) => {
  if (triggerDirection === null) {
    return "-";
  }

  const triggerOrderStr = getTriggerOrderStr(triggerDirection, isLong);

  return `${triggerOrderStr} ${size} ${asset}-PERP at ${convertDollarNumberToString(
    triggerPrice ?? 0
  )}`;
};

export const getTriggerOrderStr = (
  triggerDirection: TriggerDirection | null,
  isLong: boolean
) => {
  if (triggerDirection === null) {
    return "-";
  }

  if (
    (isLong && triggerDirection === TriggerDirection.GREATERTHANOREQUAL) ||
    (!isLong && triggerDirection === TriggerDirection.LESSTHANOREQUAL)
  ) {
    return "TP";
  }

  return "SL";
};

export const getSide = (signedSize: number) => {
  return signedSize >= 0 ? Side.BID : Side.ASK;
};

export function isEqual<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function isDefined<T>(a?: T | undefined | null): a is T {
  return a !== null && a !== undefined;
}

export const formatAssetPrice = (
  asset: Asset,
  price: number,
  includeDollarSign = false
) => {
  const prefix = includeDollarSign ? "$" : "";

  switch (asset) {
    case Asset.SOL:
    case Asset.ARB:
    case Asset.APT:
      return prefix + convertNumberToString(price, 2, 3);
    case Asset.BTC:
    case Asset.ETH:
      return prefix + convertNumberToString(price, 1, 2);
    default:
      console.warn("Undefined Asset");
      return "-";
  }
};

export const getPrecisionForAsset = (asset: Asset) => {
  switch (asset) {
    case Asset.SOL:
    case Asset.ARB:
    case Asset.APT:
      return {
        minPrecision: 2,
        maxPrecision: 3,
      };
    case Asset.BTC:
    case Asset.ETH:
      return {
        minPrecision: 1,
        maxPrecision: 2,
      };
    default:
      console.warn("Undefined Asset");
      return {
        minPrecision: 0,
        maxPrecision: 0,
      };
  }
};
