import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import {
  WalletConnectWalletAdapter,
  WalletConnectWalletAdapterConfig,
} from "@solana/wallet-adapter-walletconnect";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { isDefined } from "../general";
import { DebugWalletAdapter } from "./DebugWalletAdapter";
import { TestWalletAdapter } from "./TestWalletAdapter";

const WALLET_CONNECT_WALLET_ADAPTER_CONFIG: WalletConnectWalletAdapterConfig = {
  network:
    import.meta.env.VITE_NETWORK_TYPE === "devnet"
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet,
  options: {
    relayUrl: "wss://relay.walletconnect.com",
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    metadata: {
      name: "Zeta Markets",
      description: "Zeta Markets",
      url: "https://dex.zeta.markets/",
      icons: [
        "https://uploads-ssl.webflow.com/649053a6e993a59c07215fb1/6498aac8530bbcad8a07901a_Favicon.png",
      ],
    },
  },
};

export const NON_STANDARD_WALLETS = [
  new SolflareWalletAdapter(),
  new WalletConnectWalletAdapter(WALLET_CONNECT_WALLET_ADAPTER_CONFIG),
  process.env.NODE_ENV === "development" ? new DebugWalletAdapter() : undefined,
  new TestWalletAdapter(),
].filter(isDefined);
