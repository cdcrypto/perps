import { CancelAllButtonWrapper } from "@components/CancelAllOrdersButton/styles";
import { StyledTabs } from "@components/Tabs/styles";
import { ButtonLabel } from "@components/Button/styles";

import styled from "styled-components";
import { Text } from "@components/Text";

export const ClientPortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background[300]};
  ${StyledTabs} {
    border-radius: 0px;
  }
`;

export const ClientPortfolioHeaderText = styled(Text)`
  padding: 24px 0px 0px 16px;
  margin-bottom: -16px;
`;

export const ClientPortfolioTablesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;

  ${CancelAllButtonWrapper} {
    padding: 8px;
    height: 30px;
    width: 102px;
    margin-right: 10px;
    ${ButtonLabel} {
      font-size: 12px;
    }
  }
`;
