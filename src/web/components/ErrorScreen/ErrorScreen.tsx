import ErrorLines from "@assets/ErrorLines";
import {
  Container,
  ErrorLinesContainer,
  ContentContainer,
  BodyText,
  RetryButton,
} from "./styles";
import { WarningSignal } from "./styles";
import { useTheme } from "styled-components";
import { H3 } from "@components/Text/styles";

export const ErrorScreen = () => {
  const theme = useTheme();

  return (
    <Container>
      <ErrorLinesContainer>
        <ErrorLines width={"100vw"} height="auto" />
      </ErrorLinesContainer>

      <ContentContainer>
        <WarningSignal fill={theme?.signals.warning} />
        <H3>Well, this is unexpected...</H3>
        <BodyText>
          If refreshing doesn’t work, feel free to reach out to us on Telegram.
        </BodyText>
        <RetryButton
          variant="primary"
          label="Try Again"
          // Refresh the page
          onClick={() => window.location.reload()}
        />
      </ContentContainer>
    </Container>
  );
};
