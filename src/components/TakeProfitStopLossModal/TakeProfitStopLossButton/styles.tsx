import { Text } from "@components/Text";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: 0px;
  cursor: pointer;
`;

export const DotContainer = styled.div`
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

export const BodyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const TooltipHeaderText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

export const TooltipBodyText = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;
