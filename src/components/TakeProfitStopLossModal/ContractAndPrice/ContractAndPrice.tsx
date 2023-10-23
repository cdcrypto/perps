import { BuySellTag } from "@components/ClosePositionModal/styles";
import { Text } from "@components/Text";
import { AssetTextWrapper } from "@web/components/AssetMetricsBar/styles";
import { Side } from "@zetamarkets/sdk/dist/types";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { formatAssetPrice, getAssetIcon } from "@utils/general";
import { useMemo } from "react";
import { useZetaStore } from "stores";
import {
  ContractAndPriceContainer,
  ContractContainer,
  PriceContainer,
  PriceWrapper,
} from "./styles";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { H2 } from "@components/Text/styles";

interface ContractAndPriceProps {
  side: Side;
  asset: Asset;
}

export const ContractAndPrice = ({ side, asset }: ContractAndPriceProps) => {
  const assetIcon = useMemo(() => {
    return getAssetIcon(asset, 20);
  }, [asset]);

  const assetPrice = useZetaStore((s) => s.prices[asset]);
  const assetPriceStr = formatAssetPrice(asset, assetPrice);

  return (
    <ContractAndPriceContainer>
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

      <PriceContainer>
        <Tooltip
          content={{
            header: "Est. Market Price",
            body: TooltipDefinitions.orderForm.estMarketPrice,
          }}
        >
          <Text dotted variant="caption" color="secondary">
            Current Price
          </Text>
        </Tooltip>

        <PriceWrapper>
          <H2>$ {assetPriceStr}</H2>
        </PriceWrapper>
      </PriceContainer>
    </ContractAndPriceContainer>
  );
};
