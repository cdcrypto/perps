import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import { ProgressStepper } from "@components/Stepper/Stepper";
import { ReactNode } from "react";
import styled from "styled-components";
import { MigrationStep } from "./MigrationV2";
import { ExplainerText } from "./CloseOpenOrdersContent";

export const MigrationTitleStepper = ({
  step,
  children,
  explainerText,
}: {
  step: MigrationStep;
  children: ReactNode;
  explainerText: string;
}) => {
  return (
    <MigrationFlowContainer>
      <LogoStepperContainer>
        <ZetaFullLogo width={211} height={48} />
        <StyledStepper
          steps={["Close Open Orders", "Migrate", "Trade!"]}
          activeStep={
            step === MigrationStep.CloseOpenOrders
              ? 0
              : step === MigrationStep.MigrateAccounts
              ? 1
              : 2
          }
        />
      </LogoStepperContainer>
      <ExplainerText variant="body1">{explainerText}</ExplainerText>
      {children}
    </MigrationFlowContainer>
  );
};
const StyledStepper = styled(ProgressStepper)`
  margin-bottom: 3.5rem;
`;
const LogoStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  width: 560px;
`;
const MigrationFlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  box-sizing: border-box;
`;
