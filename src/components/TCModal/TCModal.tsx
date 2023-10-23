import { useEffect } from "react";
import { TCDialog } from "./TCDialog";
import { StyledModal, TCHeaderContainer } from "./styles";
import { useLocalStore, useZetaWalletModalStore } from "stores";
import { shallow } from "zustand/shallow";
import { Analytics, AnalyticsEvent } from "analytics";
import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
const DAYS_TO_RESET_TC = 30;

export const TCModal = () => {
  const {
    hasOnboarded,
    termsConditionsTimestamp,
    setTermsConditionsTimestamp,
  } = useLocalStore(
    (s) => ({
      hasOnboarded: s.hasOnboarded,
      termsConditionsTimestamp: s.termsConditionsTimestamp,
      setTermsConditionsTimestamp: s.setTermsConditionsTimestamp,
    }),
    shallow
  );

  const isTCModalOpen = useZetaWalletModalStore((s) => s.isTCModalOpen);

  useEffect(() => {
    const shouldResetTcModal =
      termsConditionsTimestamp !== null &&
      Date.now() - termsConditionsTimestamp >
        1000 * 60 * 60 * 24 * DAYS_TO_RESET_TC;

    if (shouldResetTcModal) {
      setTermsConditionsTimestamp(null);
    }
  }, [setTermsConditionsTimestamp, termsConditionsTimestamp]);

  return (
    <StyledModal open={hasOnboarded && isTCModalOpen} title={<TCHeader />}>
      <Analytics eventType={AnalyticsEvent.ViewTCs}>
        <TCDialog />
      </Analytics>
    </StyledModal>
  );
};

const TCHeader = () => {
  return (
    <TCHeaderContainer>
      <ZetaFullLogo width={132} height={30} />
      Terms and Conditions
    </TCHeaderContainer>
  );
};
