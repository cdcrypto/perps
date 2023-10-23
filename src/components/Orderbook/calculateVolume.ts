import { Level } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";

export const calculateVolume = (levels: Level[]) =>
  levels.reduce(
    (volume, curr) => volume.add(Big(curr.size).times(curr.price)),
    Big(0)
  );
