import { Text } from "@components/Text";
import styled from "styled-components";

export const PriceDeltaContainer = styled.div<{
  $rightAlign?: boolean;
  $tableRepresentation?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => (props.$tableRepresentation ? "column" : "row")};
  align-items: ${(props) =>
    props.$tableRepresentation ? "flex-end" : "center"};
  justify-content: ${(props) =>
    props.$rightAlign
      ? "flex-end"
      : props.$tableRepresentation
      ? "center"
      : undefined};
  gap: 4px;
  min-height: 16px;
  white-space: nowrap;

  * {
    line-height: 100%;
  }
`;
export const PercentageText = styled(Text)``;

export const PriceMovementArrow = styled.div<{ isNegative?: boolean }>`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin: 0 3px 1px 0;

  border-top: ${(props) => (props.isNegative ? "5px solid #FF6161" : "none")};

  border-bottom: ${(props) =>
    props.isNegative ? "none" : "5px solid #66D370"};
`;
