import { Asset } from "@zetamarkets/sdk/dist/constants";
import { AssetText, Container, TextSection } from "./styles";
import { getAssetIcon } from "@utils/general";
import { AssetTextWrapper } from "@web/components/AssetMetricsBar/styles";
import { Text } from "@components/Text";
import { Side } from "@zetamarkets/sdk/dist/types";

interface ContractCellProps {
  asset: Asset;
  side?: Side;
}

export const ContractCell = ({ asset, side }: ContractCellProps) => {
  const assetIcon = getAssetIcon(asset, 20);

  return (
    <Container>
      {assetIcon}
      <TextSection>
        <AssetTextWrapper>
          <AssetText variant="body2" color="primary">
            {asset}
          </AssetText>{" "}
          <Text variant="body2" color="secondary" noWrap>
            -PERP
          </Text>
        </AssetTextWrapper>

        {side !== undefined && (
          <Text variant="body2" color={side === Side.BID ? "long" : "short"}>
            {side === Side.BID ? "Long" : "Short"}
          </Text>
        )}
      </TextSection>
    </Container>
  );
};
