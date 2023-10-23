import { Text } from "@components/Text";
import { Container } from "./styles";
import WarningIcon from "@assets/WarningIcon";
import { useTheme } from "styled-components";

export const BufferWarning = () => {
  const theme = useTheme();

  return (
    <Container>
      <WarningIcon fill={theme?.signals.warning} width={28} height={28} />
      <Text variant="body2" color="warning">
        Cannot place TP/SL order with a trigger price within 2% of current price
      </Text>
    </Container>
  );
};
