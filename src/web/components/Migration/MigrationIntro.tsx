import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import {
  MigrationContainer,
  LogoContainer,
  TitleText,
  InfoText,
  ActionButton,
} from "./styles";

export const MigrationIntro = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <MigrationContainer>
      <LogoContainer>
        <ZetaFullLogo width={211} height={48} />
      </LogoContainer>
      <TitleText variant="display">2.0 has arrived!</TitleText>
      <InfoText variant="body1">
        {`
          To continue trading on our platform you need to transfer your account
          over to our new version in 2 simple steps.
          `}
      </InfoText>
      <ActionButton variant="primary" label="Let's go" onClick={onComplete} />
    </MigrationContainer>
  );
};
