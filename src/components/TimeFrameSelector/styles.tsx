import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 28px;
  width: 480px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.plum[400]};
`;

export const ButtonContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  min-height: 28px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
  background-color: ${(props) =>
    props.$selected ? props.theme.plum[100] : props.theme.plum[400]};
  user-select: none;
`;
