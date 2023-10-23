import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
`;

export const TickIcon = styled.svg`
  fill: none;
  stroke: ${(props) => props.theme.background[300]};
  stroke-width: 3px;
`;

export const CheckboxStyling = styled.label<{
  checked: boolean;
  size: string;
}>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  background: ${(props) =>
    props.checked ? props.theme.grey[300] : "transparent"};
  transition: background-color 0.3s;
  border: ${(props) => `solid ${props.theme.grey[300]}`};
  border-width: ${({ size }) =>
    size === "small" ? "1px" : size === "medium" ? "2px" : "3px"};
  border-radius: 3px;
  width: ${({ size }) =>
    size === "small" ? "12px" : size === "medium" ? "20px" : "28px"};
  height: ${({ size }) =>
    size === "small" ? "12px" : size === "medium" ? "20px" : "28px"};

  ${TickIcon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const InputCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;
