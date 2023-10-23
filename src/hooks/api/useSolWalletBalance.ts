import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { SOLANA_LAMPORTS_PRECISION } from "@utils/constants";
import { queryClient } from "@utils/setup/Root";
import Big from "big.js";

const fetchSolWalletBalance = async (
  connection: Connection,
  publicKey?: string
): Promise<number | undefined> => {
  if (!publicKey) return undefined;
  const pk = new PublicKey(publicKey);

  try {
    const balanceInLamports = await connection.getBalance(pk);

    return Big(balanceInLamports)
      .div(10 ** SOLANA_LAMPORTS_PRECISION)
      .toNumber();
  } catch (e) {
    console.error("Error fetching SOL balance", e);
    throw e;
  }
};

const refetchBalance = (publicKey?: string) => () =>
  queryClient.invalidateQueries(["sol-wallet-balance", publicKey]);

/**
 *
 * @param publicKey public key of the wallet to get balance for
 * @returns `undefined` if no publickey or error, `null` if token account doesn't exist, the `number` balance otherwise
 */
export const useSolWalletBalance = () => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();
  const pubKeyStr = publicKey?.toString();
  const { data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["sol-wallet-balance", pubKeyStr, connection.rpcEndpoint],
    queryFn: () => fetchSolWalletBalance(connection, pubKeyStr),
    staleTime: 1000 * 60 * 5,
    enabled: !!pubKeyStr,
  });

  return { balance: data, refetch: refetchBalance(pubKeyStr) };
};
