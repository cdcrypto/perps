import { css } from "styled-components";

export const gradientBorder = css`
  &:before {
    z-index: 0;
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 6px;
    padding: 1px;

    background: linear-gradient(3.81deg, #9e08fa -3.28%, #f1c1b1 94.71%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    /* Firefox */
    mask-composite: exclude;
  }
`;
