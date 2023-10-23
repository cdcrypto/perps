import { useEffect } from "react";
import { useCalculationStore, useClientStore } from "stores";

export const useHandleWalletDisconnect = (disconnecting: boolean) => {
  const clearClientStore = useClientStore((s) => s.clearStore);
  const clearCalculationStore = useCalculationStore((s) => s.clearStore);

  useEffect(() => {
    // Requires the public key as well otherwise it won't clear when the user selects
    // the "Change Wallet" option.
    if (disconnecting) {
      clearClientStore();
      clearCalculationStore();
    }
  }, [disconnecting, clearClientStore, clearCalculationStore]);
};
