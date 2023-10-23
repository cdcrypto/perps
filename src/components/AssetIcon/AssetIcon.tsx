import SolanaIcon from "@assets/coins/SolanaIcon";
import AptosIcon from "@assets/coins/AptosIcon";
import ArbitrumIcon from "@assets/coins/ArbitrumIcon";
import BitcoinIcon from "@assets/coins/BitcoinIcon";
import EthereumIcon from "@assets/coins/EthereumIcon";
import { Asset } from "@zetamarkets/sdk/dist/constants";

type AssetIconProps = {
  asset: Asset;
  size?: number;
  displayName?: boolean;
};
export const AssetIcon = ({ asset, size }: AssetIconProps) => {
  switch (asset) {
    case Asset.SOL:
      return <SolanaIcon height={size} width={size} />;
    case Asset.BTC:
      return <BitcoinIcon height={size} width={size} />;
    case Asset.ETH:
      return <EthereumIcon height={size} width={size} />;
    case Asset.APT:
      return <AptosIcon height={size} width={size} />;
    case Asset.ARB:
      return <ArbitrumIcon height={size} width={size} />;
    default:
      return null;
  }
};
