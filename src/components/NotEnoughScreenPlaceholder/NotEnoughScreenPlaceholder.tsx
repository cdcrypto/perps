import { ZetaFullLogo } from "@assets/logos/brand/ZetaFullLogo";
import { Centered, Container, TextBlock, TextBlockInner } from "./styles";

export const NotEnoughScreenPlaceholder = () => {
  return (
    <Container>
      <TextBlock>
        <TextBlockInner>
          <Centered variant="h3" color="highlight">
            This screen is too small to have a great trading experience on Zeta v2.0
          </Centered>
          <Centered variant="body2" color="primary">
            Please use a laptop or a desktop for the best trading experience on our platform.
          </Centered>
        </TextBlockInner>
      </TextBlock>
      <ZetaFullLogo />
    </Container>
  );
};
