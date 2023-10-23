import { OnboardingIndex } from "@web/components/Onboarding/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocalStore = {
  hasOnboarded: boolean;
  setHasOnboarded: () => void;

  onboardingStep: OnboardingIndex;
  setOnboardingStep: (step: number) => void;

  closedHeadlineNotifications: Record<string, boolean>;
  addClosedHeadlineNotifications: (id: string) => void;

  termsConditionsTimestamp: null | number;
  setTermsConditionsTimestamp: (timestamp: number | null) => void;
};

export const useLocalStore = create<LocalStore>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: () => set({ hasOnboarded: true }),

      onboardingStep: 0,
      setOnboardingStep: (stepIndex) => {
        if (stepIndex < 0 || stepIndex > 2) {
          throw new Error(`Invalid step index: ${stepIndex}`);
        }

        return set({ onboardingStep: stepIndex as OnboardingIndex });
      },

    
      closedHeadlineNotifications: {},
      addClosedHeadlineNotifications: (id: string) => {
        set((state) => {
          return {
            closedHeadlineNotifications: {
              ...state.closedHeadlineNotifications,
              [id]: true,
            },
          };
        });
      },

      termsConditionsTimestamp: null as null | number,
      setTermsConditionsTimestamp: (timestamp) =>
        set({ termsConditionsTimestamp: timestamp }),
    }),
    {
      name: "localStore",
    }
  )
);
