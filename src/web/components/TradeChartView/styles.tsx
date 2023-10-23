import styled from "styled-components";

export const TradeChartViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background[300]};
`;

export const GridWrapper = styled.div<{ $visible: boolean }>`
  flex: 1;
  display: ${(props) => (props.$visible ? "grid" : "none")};
`;
