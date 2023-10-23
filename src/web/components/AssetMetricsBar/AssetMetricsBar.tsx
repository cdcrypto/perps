import { AssetMetrics } from "./AssetMetrics";
import {
  AssetMetricsBarContainer,
  AssetIconName,
  AssetTextWrapper,
} from "./styles";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { Text } from "@components/Text";
import { useMemo } from "react";
import { getAssetIcon } from "@utils/general";

interface AssetMetricsBarProps {
  className?: string;
}

export const AssetMetricsBar = ({ className }: AssetMetricsBarProps) => {
  const { selectedAsset } = useMarketDetails();

  const assetIcon = useMemo(() => {
    return getAssetIcon(selectedAsset, 20);
  }, [selectedAsset]);

  return (
    <AssetMetricsBarContainer className={className}>
      <AssetIconName>
        {assetIcon}
        <AssetTextWrapper>
          <Text variant="h3" color="primary">
            {selectedAsset}
          </Text>
          <Text variant="h3" color="secondary" noWrap>
            -PERP
          </Text>
        </AssetTextWrapper>
      </AssetIconName>
      <AssetMetrics />
    </AssetMetricsBarContainer>
  );
};
