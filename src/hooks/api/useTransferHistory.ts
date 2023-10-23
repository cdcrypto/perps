import { API, GraphQLResult } from "@aws-amplify/api";
import {
  queryDepositByAuthorityBlockTimeIndex,
  queryWithdrawalByAuthorityBlockTimeIndex,
} from "@graphql/queries";
import { useQuery } from "@tanstack/react-query";
import {
  QueryDepositByAuthorityBlockTimeIndexQuery,
  QueryDepositByAuthorityBlockTimeIndexQueryVariables,
  QueryWithdrawalByAuthorityBlockTimeIndexQuery,
  QueryWithdrawalByAuthorityBlockTimeIndexQueryVariables,
} from "API";
import { useMemo } from "react";
import { MS_IN_SECOND } from "@utils/datetime";

export enum TransferAction {
  Deposit = "deposit",
  Withdrawal = "withdrawal",
}

export type TransferEvent = {
  amount: number;
  timestamp: number;
  action: TransferAction;
};


const queryDepositHistory = async (
  publicKey?: string
): Promise<TransferEvent[] | undefined> => {
  if (!publicKey) return undefined;
  const variables: QueryDepositByAuthorityBlockTimeIndexQueryVariables = {
    authority: publicKey,
    first: 100,
  };

  const resp = (await API.graphql({
    query: queryDepositByAuthorityBlockTimeIndex,
    variables,
  })) as GraphQLResult<QueryDepositByAuthorityBlockTimeIndexQuery>;

  const depositHistoryItems =
    resp.data?.queryDepositByAuthorityBlockTimeIndex?.items;

  return (depositHistoryItems || [])?.map((deposit) => {
    return {
      action: TransferAction.Deposit,
      amount: deposit?.amount || 0,
      timestamp: (deposit?.blockTime || 0) * MS_IN_SECOND,
    };
  });
};

const queryWithdrawalHistory = async (
  publicKey?: string
): Promise<TransferEvent[] | undefined> => {
  if (!publicKey) return undefined;
  const variables: QueryWithdrawalByAuthorityBlockTimeIndexQueryVariables = {
    authority: publicKey,
    first: 100,
  };

  const resp = (await API.graphql({
    query: queryWithdrawalByAuthorityBlockTimeIndex,
    variables,
  })) as GraphQLResult<QueryWithdrawalByAuthorityBlockTimeIndexQuery>;

  const withdrawalHistoryItems =
    resp.data?.queryWithdrawalByAuthorityBlockTimeIndex?.items;

  return (withdrawalHistoryItems || [])?.map((withdrawal) => {
    return {
      action: TransferAction.Withdrawal,
      amount: withdrawal?.amount || 0,
      timestamp: (withdrawal?.blockTime || 0) * MS_IN_SECOND,
    };
  });
};

export const useTransferHistory = (publicKey?: string) => {
  const { data: depositHistory } = useQuery({
    queryKey: ["deposit-history", publicKey],
    queryFn: () => queryDepositHistory(publicKey),
    staleTime: Infinity,
    enabled: !!publicKey,
  });

  const { data: withdrawalData } = useQuery({
    queryKey: ["withdrawal-history", publicKey],
    queryFn: () => queryWithdrawalHistory(publicKey),
    staleTime: Infinity,
    enabled: !!publicKey,
  });

  const transferHistory = useMemo(() => {
    if (!depositHistory || !withdrawalData) return undefined;
    const concatTransferData = depositHistory
      .concat(withdrawalData)
      // Sort in descending order
      .sort((a, b) => b.timestamp - a.timestamp);
    return concatTransferData;
  }, [depositHistory, withdrawalData]);

  return transferHistory;
};
