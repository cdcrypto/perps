import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Position } from "@zetamarkets/sdk/dist/types";
import { useClientStore } from "stores";

export const useFlatPositions = () => {
  const positions = useClientStore((s) => s.positions);

  return flattenPositions(positions);
};

export const getFlatPositions = () => {
  const positions = useClientStore.getState().positions;

  return flattenPositions(positions);
};

export const flattenPositions = (
  obj: Record<Asset, Position | undefined>
): Position[] =>
  Object.values(obj).filter((value) => value !== undefined) as Position[];
