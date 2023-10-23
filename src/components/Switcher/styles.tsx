import styled from "styled-components";

type SwitcherProps = {
  $checked: boolean;
  disabled?: boolean;
}

export const SwitcherWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;


export const Toggler = styled.div<Omit<SwitcherProps, "$checked">>`
  width: 12px;
  height: 12px;
  background: ${({ theme, disabled }) => disabled ? theme.grey[800] : theme.typography.primary};
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
`;

export const TogglerContainer = styled.div<SwitcherProps>`
  transition: all 0.2s ease-in-out; 
  width: 40px;
  box-sizing: border-box;
  border: 1px solid ${({ theme, disabled }) => disabled ? theme.grey[800] : theme.purple[200]};
  border-radius: 16px;
  padding: 2px;
  background: ${({ theme, $checked, disabled }) => disabled ? theme.plum[500] : $checked ? theme.plum[100] : theme.background[100]};
  ${Toggler} {
  transform: translateX(${props => props.$checked ? "21px" : "0px"});
  }

`;
