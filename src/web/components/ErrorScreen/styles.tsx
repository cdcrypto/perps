import styled from "styled-components";
import WarningIcon from "@assets/WarningIcon";
import { Body2 } from "@components/Text/styles";
import { Button } from "@components/Button";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.background[400]};
  justify-content: center;
  align-items: center;
`;

export const ErrorLinesContainer = styled.div`
  z-index: 0;
  position: absolute;
  bottom: -200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ContentContainer = styled.div`
  transform: rotate(-12deg) translateY(-74px);
  width: 312px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

export const WarningSignal = styled(WarningIcon)`
  width: 48px;
  height: 48px;
`;

export const BodyText = styled(Body2)`
  text-align: center;
`;

export const RetryButton = styled(Button)`
  margin-top: 32px;
  width: 100%;
  height: 48px;
  z-index: 1000;
`;
