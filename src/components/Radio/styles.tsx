import styled from "styled-components";

export const RadioButton = styled.span<{
  size: string;
  checked: boolean;
}>`
  flex: 1 0 0;
  position: relative;
  background: ${(props) => props.theme.background[300]};
  border: 0.5px solid #464A5F;
  border-radius: 999px;
  max-width: ${({ size }) =>
    size === "small" ? "16px" : size === "medium" ? "24px" : "32px"};
  height: ${({ size }) =>
    size === "small" ? "16px" : size === "medium" ? "24px" : "32px"};
  /* Styling of the inner circle of the radio button on click */
  &:after {
    content: "";
    position: absolute;
    display: ${({ checked }) => (checked ? "block" : "none")};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    width: ${({ size }) =>
      size === "small" ? "6px" : size === "medium" ? "10px" : "14px"};
    height: ${({ size }) =>
      size === "small" ? "6px" : size === "medium" ? "10px" : "14px"};
    background: ${(props) => props.theme.purple[100]};
  }
`;

export const RemoveRadioButton = styled(RadioButton)`
  /* Styling of the inner minus symbol of the radio button on click */
  &:after {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ size }) =>
      size === "small" ? "9px" : size === "medium" ? "13px" : "19px"};
    height: ${({ size }) =>
      size === "small" ? "1px" : size === "medium" ? "1.5px" : "2px"};
    border-radius: 1px;
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

export const RadioWrapper = styled.label<{ size: string }>`
  color: ${(props) => props.theme.white};
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioLabel = styled.span`
  flex: 1 1 0;
`;
