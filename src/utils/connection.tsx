import { Connection } from "@solana/web3.js";
import { Network } from "@zetamarkets/sdk";
import { RpcProviderType, useUserSettings } from "stores";

export const SOLANA_NETWORKS: Record<string, string> = {
  Mainnet: import.meta.env.VITE_MAINNET_RPC_URL || "http://zeta.rpcpool.com/",
  Devnet:
    import.meta.env.VITE_DEVNET_RPC_URL || "https://api.devnet.solana.com",
  Localnet: "http://127.0.0.1:8899",
  Testnet: "http://api.testnet.solana.com",
};

let _connection: Connection | undefined;

export const getWhirligigConnection = (): Connection | undefined => {
  let url = "";
  let wsUrl = "";

  // Whirligig is a Triton-specific thing that's only valid on mainnet
  switch (import.meta.env.VITE_NETWORK_TYPE) {
    case "mainnet":
      if (import.meta.env.VITE_MAINNET_WHIRLIGIG_URL) {
        const userSettings = useUserSettings.getState();
        const { rpcProvider, customRpcUrl } = userSettings;
        
        if (rpcProvider === RpcProviderType.CUSTOM && customRpcUrl) {
          url = customRpcUrl;
          wsUrl = customRpcUrl;
        } else {
          url = SOLANA_NETWORKS.Mainnet;
          wsUrl = import.meta.env.VITE_MAINNET_WHIRLIGIG_URL;
        }
        
        break;
      } else {
        return undefined;
      }
    default:
      return undefined;
  }

  _connection = new Connection(url, {
    wsEndpoint: wsUrl,
    commitment: "processed",
  });

  return _connection;
};

export const getSolanaNetwork = (): Network => {
  switch (import.meta.env.VITE_NETWORK_TYPE) {
    case "localnet":
      return Network.LOCALNET;
    case "mainnet":
      return Network.MAINNET;
    default:
      return Network.DEVNET;
  }
};

const getSolanaSystemNetworkUrl = () => {
  switch (import.meta.env.VITE_NETWORK_TYPE) {
    case "localnet":
      return SOLANA_NETWORKS.Localnet;
    case "mainnet":
      return SOLANA_NETWORKS.Mainnet;
    default:
      return SOLANA_NETWORKS.Devnet;
  }
};

export const getSolanaNetworkUrl = (): string => {
  const settings = useUserSettings.getState();
  const { customRpcUrl, rpcProvider } = settings;

  if (rpcProvider === RpcProviderType.CUSTOM && customRpcUrl) {
    return customRpcUrl;
  }

  return getSolanaSystemNetworkUrl();
 
};

export type ValidateRpcEndpointResponse = { status: "success" } | { status: "error", message: string };

export const validateRpcEndpoint = async (url?: string): Promise<ValidateRpcEndpointResponse> => {

  if (url === getSolanaSystemNetworkUrl()) {
    return { status: "error", message: "Please enter your own RPC provider" };
  }
  if (!url) {
    return { status: "error", message: "URL cannot be empty" };
  }
  try {
    new URL(url);
  } catch (e) {
    return { status: "error", message: "Invalid URL" };
  }

  try {
    const connection = new Connection(url);
    await connection.getGenesisHash();
  } catch (e) {
    return { status: "error", message: "Unable to connect to RPC node" };
  }

  return { status: "success" };

};
