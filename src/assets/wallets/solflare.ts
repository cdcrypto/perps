import {
  SolflareWalletAdapter,
  SolflareWalletName,
} from "@solana/wallet-adapter-solflare";

const solflareWalletAdapter = new SolflareWalletAdapter();

export const solflare = {
  name: SolflareWalletName,
  icon: solflareWalletAdapter.icon,
  url: "https://docs.solflare.com/solflare/onboarding/web-app-and-extension/how-to-create-a-new-wallet",
};
