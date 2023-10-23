import { gradientBorder } from "@utils/styles";
import styled from "styled-components";

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: flex-start;
  background-color: ${(props) => props.theme.background[200]};
  ${gradientBorder}
`;

export const FundingRateDisplayContainer = styled.div`
  position: absolute;
  top: 54px;
  left: 16px;
  display: flex;
  gap: 4px;
`;
