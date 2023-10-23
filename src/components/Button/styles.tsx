import styled from "styled-components";
import { Text } from "@components/Text/styles";

export const ButtonLogo = styled.div`
  z-index: 1;
`;

export const ButtonLabel = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-transform: capitalize;
  z-index: 1;
  transition: color 100ms ease-in;
`;

export const CustomisableSvg = styled.svg`
  transition: color 100ms ease-in;
  color: ${(props) =>
    props.color === "secondary"
      ? "#808285"
      : props.color === "positive"
      ? "#66D370"
      : props.color === "negative" || props.color === "warning"
      ? "#FF6161"
      : props.color === "highlight"
      ? "#D6B1FE"
      : props.color === "background"
      ? props.theme.background
      : "#BCBEC0"};
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  height: 40px;
  width: auto;
  white-space: nowrap;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;

  &:active {
    ${ButtonLabel} {
      color: ${(props) => props.theme.typography.primary};
    }
  }

  &:disabled {
    pointer-events: ${(props) => (props.disabled ? "none" : null)};
    ${ButtonLabel} {
      color: ${(props) => props.theme.typography.clickable.disabled};
    }
  }
`;

export const DefaultButton = styled(Button)`
  border: none;
  color: ${(props) => props.theme.typography.highlight};
  background: ${(props) => props.theme.violet[200]};
  &:hover {
    background: ${(props) => props.theme.violet[100]};
  }

  &:active {
    background: ${(props) => props.theme.violet[300]};
  }

  &:disabled {
    background: ${(props) => props.theme.violet[400]};
  }
`;

export const SecondaryButton = styled(DefaultButton)`
  background: none;
  border: ${(props) => `1px solid ${props.theme.violet[200]}`};
  &:hover {
    background: ${(props) => props.theme.violet[100]};
  }
  &:active {
    background: ${(props) => props.theme.violet[300]};
  }

  &:disabled {
    background: transparent;
    border: ${(props) => `1px solid ${props.theme.violet[400]}`};
  }
`;

export const TertiaryButton = styled(DefaultButton)`
  border: none;
  background: ${(props) => props.theme.plum[100]};
  ${ButtonLabel} {
    color: ${(props) => props.theme.typography.clickable.enabled};
  }
  &:hover {
    background: ${(props) => props.theme.plum[200]};
  }
  &:active {
    background: ${(props) => props.theme.plum[300]};
    ${ButtonLabel} {
      color: ${(props) => props.theme.typography.secondary};
    }
  }
  &:disabled {
    background: ${(props) => props.theme.plum[500]};
  }
`;

export const WarningButton = styled(DefaultButton)`
  border: none;
  background: rgba(255, 97, 97, 0.25);
  &:hover {
    background: linear-gradient(0deg, #ff6161, #ff6161),
      linear-gradient(0deg, #242847, #242847);
    border: 2px solid #242847;
  }
  &:disabled {
    background: #241424;
    border: none;
  }
`;

export const BuyButton = styled(DefaultButton)`
  background: ${(props) => props.theme.green[200]};
  &:hover {
    background: ${(props) => props.theme.green[100]};
  }
  &:active {
    background: ${(props) => props.theme.green[300]};
  }
  &:disabled {
    background: ${(props) => props.theme.green[400]};
  }
`;

export const SellButton = styled(DefaultButton)`
  background: ${(props) => props.theme.red[200]};
  &:hover {
    background: ${(props) => props.theme.red[100]};
  }
  &:active {
    background: ${(props) => props.theme.red[300]};
  }
  &:disabled {
    background: ${(props) => props.theme.red[400]};
    border: none;
  }
`;
