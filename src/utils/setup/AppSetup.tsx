import { API } from "@aws-amplify/api";
import { useWhitelistedUser } from "@hooks/useWhitelistedUser";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAmplitudeUserSetup } from "@utils/setup/hooks/useAmpliUserSetup";
import { useClientSetup } from "@utils/setup/hooks/useClientSetup";
import { useExchangeSetup } from "@utils/setup/hooks/useExchangeSetup";
import { useMarketOrdersSetup } from "@utils/setup/hooks/useMarketOrdersSetup";
import { useNotificationSetup } from "@utils/setup/hooks/useNotificationSetup";
import { useRecentTradesSetup } from "@utils/setup/hooks/useRecentTradesSetup";
import { useTradeHistorySetup } from "@utils/setup/hooks/useTradeHistorySetup";
import "../../../node_modules/react-resizable/css/styles.css";
import awsExports from "../aws-exports";
import { useWindowTitleSetup } from "./hooks/useWindowTitleSetup";

API.configure({
  ...awsExports,
  aws_appsync_apiKey: import.meta.env.VITE_APPSYNC_APIKEY,
});

export const AppSetup = () => {
  const { publicKey } = useWallet();

  useExchangeSetup();
  const handleTradeEvents = useNotificationSetup();
  useClientSetup(handleTradeEvents);
  useRecentTradesSetup();
  useWhitelistedUser();
  useTradeHistorySetup(publicKey?.toString());
  useMarketOrdersSetup();
  useWindowTitleSetup();
  useAmplitudeUserSetup();

  return null;
};
