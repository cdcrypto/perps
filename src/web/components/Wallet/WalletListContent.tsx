import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import { WalletList } from "./WalletList";
import { Text } from "@components/Text";
import { WalletModalContentBody } from "./styles";

/**
 * This component exists, as it can be composed into the onboarding section.
 */
export const WalletListContent = () => {
  return (
    <WalletModalContentBody>
      <ZetaFullLogo />
      <Text variant="body2" color="primary">
        Get ready to start trading on the most <br /> secure and fastest DEX on
        Solana.
      </Text>

      <WalletList />
    </WalletModalContentBody>
  );
};
