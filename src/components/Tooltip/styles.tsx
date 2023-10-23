import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { Text } from "@components/Text";

export const StyledTooltip = styled(Tooltip)`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  max-width: 200px;

  /* TODO: Add in this colour */

  && {
    background: ${(props) => props.theme.background[200]};
    opacity: 1;
    z-index: 3;
  }

  border-radius: 6px;
  flex: none;
  order: 0;
  flex-grow: 0;

  &:before {
    z-index: 0;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 6px;
    padding: 1px;

    background: linear-gradient(
      133.21deg,
      #ffc4b0 0%,
      #f8b7b5 12%,
      #e795c2 33%,
      #cb5fd8 61%,
      #a414f5 95%,
      #9e08fa 100%
    );

    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    /* Firefox */
    mask-composite: exclude;
  }

  &.example-arrow {
    display: none;
  }
`;

export const ChildWrapper = styled.a`
  height: fit-content;
  display: flex;
  cursor: help;
`;

export const ParagraphText = styled(Text)<{ $isFirst: boolean }>`
  margin-top: ${(props) => (props.$isFirst ? "0px" : "4px")};
`;
