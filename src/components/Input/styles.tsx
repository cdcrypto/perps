import { NumericFormat } from "react-number-format";
import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.plum[400]};
  padding: 12px 8px 12px 8px;
  gap: 8px;
  border-radius: 8px;
  height: 48px;
  transition: 200ms;

  &:hover {
    background: ${(props) => props.theme.plum[100]};
    color: ${(props) => props.theme.typography.highlight};
  }
  &:focus {
    background: ${(props) => props.theme.plum[100]};
    color: ${(props) => props.theme.typography.highlight};
  }
`;

export const StyledInput = styled(NumericFormat)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  gap: 8px;
  height: 16px;
  outline: none;
  background: inherit;
  border-radius: 8px;
  border: none;
  color: ${(props) => props.theme.grey[400]};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: ${(props) => props.theme.grey[400]};
  }
  width: 100%;

  &:hover {
    color: ${(props) => props.theme.typography.highlight};
  }
  &:focus {
    color: ${(props) => props.theme.typography.highlight};
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #13121f;
  border-radius: 6px;
  padding: 4px 8px;
  height: 16px;
  * {
    line-height: 100%;
  }
  cursor: pointer;
  z-index: 1;
  &:hover {
    filter: brightness(1.2);
    transition: 200ms;
  }
`;

export const EndAdornmentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  padding: 4px 8px;
  height: 16px;
  * {
    line-height: 100%;
  }
  cursor: pointer;
  z-index: 1;
  /* &:hover {
    filter: brightness(1.2);
    transition: 200ms;
  } */
`;
