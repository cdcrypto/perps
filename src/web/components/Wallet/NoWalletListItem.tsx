import { Text } from "@components/Text";
import { NoWalletListItemContainer, WalletListItemIcon } from "./styles";

interface NoWalletListItemProps {
  name: string;
  icon: string;
  url: string;
}

export const NoWalletListItem = ({
  name,
  icon,
  url,
}: NoWalletListItemProps) => {
  return (
    <NoWalletListItemContainer
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WalletListItemIcon src={icon} />
      <Text variant="body1" color="highlight">
        {name}
      </Text>
    </NoWalletListItemContainer>
  );
};
