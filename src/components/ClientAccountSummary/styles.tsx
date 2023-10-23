import { ButtonLabel, DefaultButton } from "@components/Button/styles";
import { Text } from "@components/Text";
import styled from "styled-components";

export const SummaryContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 24px 16px 16px 16px;
  cursor: pointer;
  border-top: 1px solid #242847;

  .MuiSkeleton-root {
    background-color: ${(props) => props.theme.typography.secondary};
  }

  @media only screen and (max-width: 1440px) {
    padding: 12px 16px 16px 16px;
  }
`;

export const SummaryText = styled(Text)`
  white-space: nowrap;
`;

export const IndividualRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
`;

export const DeltaContainer = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
`;

export const SummarySkeletonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 2;
  width: 99%;
`;

export const NoBalanceSummaryContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 24px 52px 52px 52px;
  cursor: pointer;

  @media only screen and (max-width: 1440px) {
    padding: 12px 16px 16px 16px;
  }
`;

export const DepositButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  ${DefaultButton} {
    width: 180px;
    height: 32px;
    ${ButtonLabel} {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }
  }

  @media only screen and (max-width: 1440px) {
    padding-top: 16px;
  }
`;
