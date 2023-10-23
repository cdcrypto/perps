import { API, GraphQLResult } from "@aws-amplify/api";
import { checkV2BetaWhitelist } from "@graphql/queries";
import { useQuery } from "@tanstack/react-query";
import {
  CheckV2BetaWhitelistQuery,
  CheckV2BetaWhitelistQueryVariables,
} from "API";

export const queryWhitelist = async (publicKey?: string) => {
  if (!publicKey) return;
  const variables: CheckV2BetaWhitelistQueryVariables = {
    authority: publicKey,
  };

  const resp = (await API.graphql({
    query: checkV2BetaWhitelist,
    variables,
  })) as GraphQLResult<CheckV2BetaWhitelistQuery>;

  return !!resp.data?.checkV2BetaWhitelist;
};
export const useV2WhitelistedUser = (publicKey?: string) => {
  const { data } = useQuery({
    queryKey: ["whitelist", publicKey],
    queryFn: () => queryWhitelist(publicKey),
    staleTime: Infinity,
    enabled: import.meta.env.VITE_ENABLE_WHITELIST === "true",
  });

  if (import.meta.env.VITE_ENABLE_WHITELIST !== "true") return true;

  return data;
};
