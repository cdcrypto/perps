import { Button } from "@components/Button";
import { CancelAllButtonWrapper } from "@components/CancelAllOrdersButton/styles";
import { Input } from "@components/Input";
import { InputContainer, StyledInput } from "@components/Input/styles";
import { Slider } from "@components/Slider/";
import { Tab, Tabs } from "@components/Tabs";
import { Text } from "@components/Text";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";

export const StyledSlider = styled(Slider)``;

export const DepositInputContainer = styled.div`
  margin: 0 24px;
`;
export const ActionButton = styled(Button)`
  margin: 0 24px;
`;
export const DepositWithdrawInput = styled(Input)<{ $highlight: boolean }>`
  & > ${Text}:first-child {
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
  }
  & > ${InputContainer} {
    background: transparent;
    height: 72px;
    border-radius: 0px;
    margin: 0px 0px 12px 0px;
    padding: 0px 0px 12px 0px;
    border-bottom: ${(props) =>
      !props.$highlight
        ? `1px solid ${props.theme.plum[400]}`
        : `1px solid  ${props.theme.plum[100]}`};

    & > ${StyledInput} {
      color: ${(props) =>
        props.$highlight
          ? props.theme.typography.highlight
          : props.theme.typography.secondary};
      font-size: 32px;
      font-weight: 500;
      line-height: 40px;
      height: 40px;
      padding-left: 0px;

      &::placeholder {
        color: ${(props) => props.theme.typography.secondary};
      }
      &:focus {
        color: ${(props) => props.theme.typography.highlight};
      }
    }
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0px 24px 0px;
`;

export const WalletIcon = styled.img`
  height: 16px;
  width: 16px;
`;

export const DepositWithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  padding-bottom: 24px;
  background: ${(props) => props.theme.background[300]};

  ${CancelAllButtonWrapper} {
    margin: 0 24px;
  }

  .MuiSkeleton-root {
    background-color: ${(props) => props.theme.typography.secondary};
  }
`;

// this could be re-usable.
export const CancelModalButton = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.violet[200]};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding: 12px 40px;
  display: flex;
  justify-content: center;
`;

export const StyledTabs = styled(Tabs)`
  margin: 16px;
`;

export const StyledTab = styled(Tab)`
  width: 164px;
  height: 32px;
  padding: 6px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex-grow: 1;
`;

export const DepositWithdrawSkeletonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  line-height: 2;
  width: 99%;
  margin-left: 1rem;
`;

export const BalanceSkeleton = styled(Skeleton)`
  margin-right: 32px;
`;
