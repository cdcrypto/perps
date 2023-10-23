import { useLocalStore } from "stores";
import { Suspense, lazy } from "react";

const OnboardingModal = lazy(() => import("./OnboardingModal"));

export const Onboarding = () => {
  const hasOnboarded = useLocalStore((s) => s.hasOnboarded);

  if (hasOnboarded) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <OnboardingModal />
    </Suspense>
  );
};
