import { Text } from "@components/Text";
import { Container } from "./styles";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <Container>
      <Text variant="h3">{title}</Text>
    </Container>
  );
};
