import { convertNumberToString } from "@utils/general";
import { format } from "date-fns";

export const formatTickTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const formattedTickTimestamp = format(date, "dd");
  return formattedTickTimestamp;
};

export const formatTooltipTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const formattedTooltipTimestamp = format(date, "dd MMM yy, HH:mm");
  return formattedTooltipTimestamp;
};

export const formatDailyFundingRate = (dailyFundingRate: number) => {
  const prefix = dailyFundingRate > 0 ? "" : "-";
  const formatted = `${prefix}${convertNumberToString(
    dailyFundingRate,
    2,
    5
  )}%`;
  return formatted;
};

export const generateSymmetricTicks = (dataMin: number, dataMax: number) => {
  const ticks = [0];
  const delta = (dataMax - dataMin) / 7;

  if (delta === 0) {
    return ticks;
  }

  let point = delta;

  while (point <= dataMax) {
    ticks.push(point);
    ticks.push(-point);
    point += delta;
  }

  ticks.sort((a, b) => a - b);
  return ticks;
};

export const formatPercentTick = (tick: number) => {
  const formatted = convertNumberToString(tick, 4, 4);
  return `${formatted}%`;
};
