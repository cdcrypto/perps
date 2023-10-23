import { Modal } from "@components/Modal";
import styled from "styled-components";
import {
  SingleRow,
  LabelWrapper,
  PriceInput,
} from "@components/OrderForm/styles";
import { Tab } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs";
import { Badge } from "@components/Badge";
import { Tag } from "@components/Tag";
import { Text } from "@components/Text";
import {
  PercentageText,
  PriceDeltaContainer,
} from "@components/PriceDelta/styles";
import { DefaultButton } from "@components/Button/styles";
import { InputContainer } from "@components/Input/styles";
import { PriceDelta } from "@components/PriceDelta";
import { TriggerOrderWarning } from "@components/OrderForm/TriggerOrderWarning";

export const StyledModal = styled(Modal)`
  padding: 0px;
  background: ${(props) => props.theme.background[300]};
`;

export const DialogContent = styled.div`
  width: 400px;
  background: ${(props) => props.theme.background[300]};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const ClosePositionHeader = styled(Text)`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: ${(props) => `1px solid ${props.theme.grey[600]}`};
  padding: 12px 16px;
`;

export const DialogBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px 16px;
  gap: 24px;
`;

export const DialogSingleRow = styled(SingleRow)`
  align-items: center;
`;
export const DialogLabelWrapper = styled(LabelWrapper)``;
export const DialogNumericalInput = styled(PriceInput)`
  /* height: 40px; */
  /* & > ${InputContainer} {
    height: 23px;
  } */
`;

export const DialogMarketTabs = styled(Tabs)`
  border: ${(props) =>
    props.variant === "default" ? "1px solid #342F3E" : "none"};
  width: 50%;
`;

export const DialogMarketTab = styled(Tab)`
  flex: 1;
  justify-content: center;
  height: 40px;
`;

export const SummaryContentBorder = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  background: ${(props) => props.theme.background[200]};
  padding: 24px 24px 16px 24px;
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
`;

export const PNLGradientWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  background: ${(props) => props.theme.gradient[100]};
  padding: 1px;
`;

export const PNLContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background[200]};
  height: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  gap: 8px;
  padding: 18px 0px 20px;
  & > ${PriceDeltaContainer} > ${Text} {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;

export const StyledPriceDelta = styled(PriceDelta)`
  && ${PercentageText} {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 5px 0px 8px;
  align-items: center;
`;

export const PositionBreakdown = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${PriceContainer}:first-child {
    align-items: flex-start;
  }
  ${PriceContainer}:last-child {
    align-items: flex-end;
  }
`;

export const MarketLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const AssetMarketContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LeverageBadge = styled(Badge)`
  width: 40px;
  height: 23px;
  margin-left: 10px;
  padding: 7px 9px;
`;

export const BuySellTag = styled(Tag)`
  min-width: 60px;
  width: 60px;
  height: 24px;
  min-height: 24px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  padding: 3px 11px 4px 11px;
  box-sizing: border-box;
`;

export const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 24px 24px 24px;

  & > ${DefaultButton} {
    width: 100%;
  }
`;

export const SummarySkeletonWrapper = styled.div`
  display: block;
  line-height: 2;
  width: 99%;
`;

export const WarningContainer = styled.div`
  margin-top: 40px;
  padding: 0px 24px;
  display: flex;
  align-items: flex-start;
  gap: 7px;
`;

export const AmountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const StyledTriggerOrderWarning = styled(TriggerOrderWarning)`
  margin-top: 40px;
`;
