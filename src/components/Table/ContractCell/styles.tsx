import { Text } from "@components/Text";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const AssetText = styled(Text)`
  font-weight: 500;
`;
