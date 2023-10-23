import { TCText } from "./TCText";
import {
  Breakdown,
  ButtonsContainer,
  DialogBody,
  Instructions,
  AgreeContainer,
  ExternalLink,
  AgreeText,
  ContinueButton,
} from "./styles";
import { useState } from "react";
import { Checkbox } from "@components/Checkbox";
import { TC_LINK, PRIVACY_LINK } from "./TCLinks";
import { useZetaWalletModalStore, useLocalStore } from "stores";
import { analytics } from "analytics";
import { shallow } from "zustand/shallow";
export const TCDialog = (): JSX.Element => {
  const [agree, setAgree] = useState(false);

  const setTermsConditionsTimestamp = useLocalStore(
    (s) => s.setTermsConditionsTimestamp
  );

  const { setIsWalletModalOpen, setIsTCModalOpen } = useZetaWalletModalStore(
    (s) => ({
      setIsWalletModalOpen: s.setIsWalletModalOpen,
      setIsTCModalOpen: s.setIsTCModalOpen,
    }),
    shallow
  );
  return (
    <>
      <DialogBody>
        <Instructions variant="caption" color="highlight">
          By accessing and/or using Zeta you agree to the Terms and Conditions
          and the Privacy Policy. You hereby agree, represent and warrant that:
        </Instructions>
        <Breakdown>
          <TCText />
        </Breakdown>
      </DialogBody>
      <AgreeContainer>
        <Checkbox size="medium" checked={agree} onChange={setAgree} />
        <AgreeText variant="caption" color="highlight">
          I have read and agreed to the{" "}
          <ExternalLink href={TC_LINK}>Terms and Conditions</ExternalLink> and
          the <ExternalLink href={PRIVACY_LINK}>Privacy Policy</ExternalLink>.
        </AgreeText>
      </AgreeContainer>
      <ButtonsContainer>
        <ContinueButton
          label="Continue"
          disabled={!agree}
          variant="primary"
          onClick={() => {
            analytics.acceptTcs();
            setTermsConditionsTimestamp(Date.now());
            setIsTCModalOpen(false);
            setIsWalletModalOpen(true);
          }}
        />
      </ButtonsContainer>
    </>
  );
};
