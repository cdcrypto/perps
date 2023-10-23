import { Side } from "@zetamarkets/sdk/dist/types";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useSelectedContractStore } from "stores";
import { SyntheticOrderType } from "stores/useSelectedContract";
import { useLiquidityCheck } from "./useLiquidityCheck";

export const useIsTaker = () => {
  const { size, price, side, asset, orderType } = useSelectedContractStore(
    (s) => ({
      size: s.quoteSize,
      price: s.quotePrice,
      side: s.side,
      asset: s.market?.asset,
      orderType: s.orderType,
    })
  );

  const closingSide = side === Side.BID ? Side.ASK : Side.BID;

  // can't have conditional use of hook so default to Asset.SOL
  const { avgPrice } = useLiquidityCheck(size, asset ?? Asset.SOL, closingSide);

  if (orderType === SyntheticOrderType.MARKET) {
    return true;
  }

  return side === Side.BID ? price >= avgPrice : price <= avgPrice;
};
