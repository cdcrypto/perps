import { useClientStore } from "stores";

export const useClient = () => {
  const client = useClientStore((state) => state.client);

  return client;
};
