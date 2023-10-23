import styled from "styled-components";
import { Button } from "@components/Button";
import { ButtonLabel } from "@components/Button/styles";

export const ConnectWalletButtonContainer = styled(Button)`
  padding: 8px 16px;
  width: 200px;
  & > ${ButtonLabel} {
    text-transform: none;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
`;
