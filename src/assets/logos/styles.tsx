import styled from "styled-components";

export const CustomisableSvg = styled.svg`
  transition: color 100ms ease-in;
  color: ${(props) =>
    props.color === "secondary"
      ? "#808285"
      : props.color === "positive"
      ? props.theme.typography.long
      : props.color === "textEnabled"
      ? props.theme.typography.clickable.enabled
      : props.color === "negative" || props.color === "warning"
      ? props.theme.typography.short
      : props.color === "highlight"
      ? props.theme.purple[200]
      : props.color === "peach"
      ? "#F1C1B1"
      : props.color === "background"
      ? props.theme.background[300]
      : props.color === "clickable-active"
      ? props.theme.typography.clickable.active
      : props.color === "clickable-enabled"
      ? props.theme.typography.clickable.enabled
      : props.theme.typography.highlight};
`;
