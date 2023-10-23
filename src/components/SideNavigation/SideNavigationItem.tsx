import { Asset } from "@zetamarkets/sdk/dist/constants";
import {
  DrawerItemContent,
  CoinRepresentation,
  CoinSummary,
  CoinSymbol,
} from "./styles";
import { useZetaStore } from "stores";
import { useDayDelta } from "@hooks/api/useDayDelta";
import { assetToName } from "@zetamarkets/sdk/dist/assets";
import { formatAssetPrice } from "@utils/general";
import { PriceDelta } from "@components/PriceDelta";
import { To } from "react-router-dom";
import { Text } from "@components/Text";

interface SideNavigationItemProps {
  icon: JSX.Element;
  asset: Asset;
  to: To;
}

export const SideNavigationItem = ({
  icon,
  asset,
  to,
}: SideNavigationItemProps) => {
  const price = useZetaStore((s) => s.prices[asset]);
  const delta = useDayDelta(asset);
  const priceStr = formatAssetPrice(asset, price, true);

  return (
    <DrawerItemContent to={to}>
      <CoinRepresentation>
        {icon}
        <CoinSymbol>
          {assetToName(asset)}
          <Text variant="h4" color="secondary" noWrap>
            -PERP
          </Text>
        </CoinSymbol>
      </CoinRepresentation>
      <CoinSummary>
        {priceStr}
        <PriceDelta variant="label" deltaPercentage={delta?.percentage} />
      </CoinSummary>
    </DrawerItemContent>
  );
};
