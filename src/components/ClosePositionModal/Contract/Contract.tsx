import { ContractContainer, BuySellTag } from "./styles";
import { Text } from "@components/Text";
import { AssetTextWrapper } from "@web/components/AssetMetricsBar/styles";
import { Side } from "@zetamarkets/sdk/dist/types";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { getAssetIcon } from "@utils/general";
import { useMemo } from "react";

interface ContractProps {
  side: Side;
  asset: Asset;
}

export const Contract = ({ side, asset }: ContractProps) => {
  const assetIcon = useMemo(() => {
    return getAssetIcon(asset, 24);
  }, [asset]);

  return (
    <ContractContainer>
      {assetIcon}
      <AssetTextWrapper>
        <Text variant="h2" color="primary">
          {asset}
        </Text>
        <Text variant="h2" color="secondary" noWrap>
          -PERP
        </Text>
      </AssetTextWrapper>
      <BuySellTag variant={side === Side.BID ? "sell" : "buy"}>
        {side === Side.BID ? "Short" : "Long"}
      </BuySellTag>
    </ContractContainer>
  );
};
