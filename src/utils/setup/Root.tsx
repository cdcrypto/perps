import { GlobalStyles } from "static/globalStyles";
// import { theme } from "static/theme";
import { StyledToastContainer } from "@components/Notification/styles";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getSolanaNetworkUrl } from "@utils/connection";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AppRouter } from "router";
import { theme } from "static/theme";
import { ThemeProvider } from "styled-components";
import { QUERY_CLIENT } from "./query";


import { NON_STANDARD_WALLETS } from "./nonStandardWallets";

export const Root = () => {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ConnectionProvider endpoint={getSolanaNetworkUrl()}>
        <WalletProvider wallets={NON_STANDARD_WALLETS} autoConnect>
          <WalletModalProvider>
            <ThemeProvider theme={theme}>
              <SkeletonTheme baseColor="#141626" highlightColor="#808285">
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />
                <StyledToastContainer />
                {/* WalletModal is operated by a Zustand store  */}
                <AppRouter />
              </SkeletonTheme>
            </ThemeProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};


// Export for compatibility with old code
export { QUERY_CLIENT as queryClient };
