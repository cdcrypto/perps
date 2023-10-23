import { styled } from "styled-components";
import { Text } from "@components/Text";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.background[400]};
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
`;

export const TextBlock = styled.div`
  padding: 1px;
  background: ${(props) => props.theme.gradient[100]};
  width: 90vw;
  max-width: 390px;
  box-sizing: border-box;
  border-radius: 16px;

`;

export const TextBlockInner = styled.div`
  padding: 24px 32px;
  background: ${(props) => props.theme.background[400]};
  text-align: center;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Centered = styled(Text)`
  text-align: center;
`;
