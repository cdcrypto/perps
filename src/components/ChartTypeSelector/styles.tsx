import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 16px 16px 8px 16px;
  align-items: center;
  gap: 16px;
`;

export const ChartTypeOptionContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  min-height: 20px;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  border-bottom: ${(props) =>
    props.$selected
      ? `2px solid ${props.theme.typography.clickable.active}`
      : "none"};
  margin-bottom: ${(props) => (props.$selected ? "0px" : "2px")};
  cursor: pointer;
  user-select: none;
`;
