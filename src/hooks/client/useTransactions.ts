import { useClientStore } from "stores";

export const useTransactions = () => {
  const transactions = useClientStore((state) => state.transactions);

  return transactions;
};
