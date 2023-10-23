import PortfolioIcon from "@assets/PortfolioIcon";
import TradeIcon from "@assets/TradeIcon";
import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import { HoverMoreMenu } from "@components/HoverMoreMenu";
import { WalletMultiButton } from "@web/components/Wallet";
import { ROUTES } from "@web/routes";
import { DiscordWidget } from "../DiscordWidget";
import { Settings } from "../Settings";
import {
  LogoLink,
  NavLinkRoute,
  NavLinksWrapper,
  NavbarButtons,
  NavbarContainer,
  NavbarLinksContainer,
  NavbarRightPanel,
} from "./styles";
import { useUserSettings } from "stores";
import { useWallet } from "@solana/wallet-adapter-react";

export const NavBar = () => {
  const displayWalletAddress = useUserSettings((s) => s.displayWalletAddress);
  const { connected } = useWallet();
  return (
    <>
      <NavbarContainer>
        <NavbarLinksContainer>
          <LogoLink to={ROUTES.TRADE}>
            <ZetaFullLogo />
          </LogoLink>
          <NavLinksWrapper>
            <NavLinkRoute to={ROUTES.TRADE}>
              <TradeIcon />
              Trade
            </NavLinkRoute>
            <NavLinkRoute to={ROUTES.PORTFOLIO}>
              <PortfolioIcon />
              Portfolio
            </NavLinkRoute>
            <HoverMoreMenu />
          </NavLinksWrapper>
        </NavbarLinksContainer>
        <NavbarRightPanel $increasedGap={(connected && displayWalletAddress) || !connected}>
          <NavbarButtons>
            <DiscordWidget />
            <Settings />
          </NavbarButtons>
          <WalletMultiButton />
        </NavbarRightPanel>
      </NavbarContainer>
    </>
  );
};
