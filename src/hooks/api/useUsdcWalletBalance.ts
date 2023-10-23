import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/setup/Root";
import { Exchange, utils } from "@zetamarkets/sdk";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import BN from "bn.js";

export type USDCWalletBalance = number | null | undefined;

interface SolanaTokenAccount {
  mint: string;
  owner: string;
  amount: BN;
  delegateOption: number;
  delegate: string | null;
  state: number;
  isNativeOption: number;
  isNative: boolean;
  delegatedAmount: BN;
  closeAuthorityOption: number;
  closeAuthority: string | null;
  address: string;
  isInitialized: boolean;
  isFrozen: boolean;
  rentExemptReserve: BN | null;
}

const fetchUsdcWalletBalance = async (
  connection: Connection,
  publicKey?: string
): Promise<USDCWalletBalance> => {
  if (!publicKey) return undefined;
 
  const pk = new PublicKey(publicKey);

  const usersUSDCAddress = utils.getAssociatedTokenAddress(
    Exchange.usdcMintAddress,
    pk
  );

  try {
    const tokenAccountInfo = (await utils.getTokenAccountInfo(
      connection,
      usersUSDCAddress
    )) as SolanaTokenAccount;

    if (!tokenAccountInfo) return null;

    return convertNativeBNToDecimal(tokenAccountInfo.amount);
  } catch (e) {
    // No token account exists
    return null;
  }
};

const refetchBalance = (publicKey?: string) => () =>
  queryClient.invalidateQueries(["usdc-wallet-balance", publicKey]);

/**
 *
 * @param publicKey public key of the wallet to get balance for
 * @returns `undefined` if no publickey, `null` if token account doesn't exist, the `number` balance otherwise
 */
export const useUsdcWalletBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const pubKeyStr = publicKey?.toString();
  const { data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["usdc-wallet-balance", pubKeyStr, connection.rpcEndpoint],
    queryFn: () => fetchUsdcWalletBalance(connection, pubKeyStr),
    staleTime: 1000 * 60 * 5,
    enabled: !!pubKeyStr,
  });

  return { balance: data, refetch: refetchBalance(pubKeyStr) };
};
