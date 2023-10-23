import {
  SideNavBarWrapper,
  SideNavBar,
  DrawerContent,
  DrawerHeading,
  SideNavBarSpacer,
} from "./styles";
import { SideNavigationItem } from "./SideNavigationItem";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { assetToTradeSlug, getAssetIcon } from "@utils/general";

export const SideNavigation = (): JSX.Element => {
  return (
    <>
      <SideNavBarSpacer />
      <SideNavBarWrapper>
        <SideNavBar>
          <DrawerHeading>Select a Market</DrawerHeading>
          <DrawerContent>
            {allAssets().map((asset) => (
              <SideNavigationItem
                key={asset}
                icon={getAssetIcon(asset, 24)}
                asset={asset}
                to={assetToTradeSlug(asset)}
              />
            ))}
          </DrawerContent>
        </SideNavBar>
      </SideNavBarWrapper>
    </>
  );
};
