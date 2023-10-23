import { Text } from "@components/Text";
import { Wallet } from "@solana/wallet-adapter-react";
import { WalletListItemContainer, WalletListItemIcon } from "./styles";

interface WalletListItemProps {
  wallet: Wallet;
  onClick: () => void;
}

export const WalletListItem = ({ wallet, onClick }: WalletListItemProps) => {
  return (
    <WalletListItemContainer onClick={onClick}>
      <WalletListItemIcon src={wallet.adapter.icon} />
      <Text variant="body1" color="highlight">
        {wallet.adapter.name}
      </Text>
    </WalletListItemContainer>
  );
};
