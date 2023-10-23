import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * T&C flow has been updated to be intrinsically part of the connect wallet flow, so we will keep it here
 */

export const useZetaWalletModalStore = create<ZetaWalletModalStore>()(
  devtools((set) => ({
    isWalletModalOpen: false,
    setIsWalletModalOpen: (isWalletModalOpen) => set({ isWalletModalOpen }),

    isTCModalOpen: false,
    setIsTCModalOpen: (isTCModalOpen) => set({ isTCModalOpen }),
  }))
);

type ZetaWalletModalStore = {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;

  isTCModalOpen: boolean;
  setIsTCModalOpen: (isTCModalOpen: boolean) => void;
};
