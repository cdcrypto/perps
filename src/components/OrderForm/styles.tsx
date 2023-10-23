import styled, { css } from "styled-components";
import { Tabs } from "@components/Tabs";
import { StyledTab, TabIndicator } from "@components/Tabs/styles";
import { Input } from "@components/Input";
import { InputContainer, StyledInput } from "@components/Input/styles";
import { AccordionDetails } from "@components/Accordion/Accordion";
import { BodyContainer } from "@components/Accordion/styles";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import WarningIcon from "@assets/WarningIcon";

export const OrderFormContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
`;

export const FormInputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const OrderTabs = styled(Tabs)`
  width: 100%;
  height: 40px;
  background: ${(props) => props.theme.plum[400]};
  @media screen and (min-width: 3000px) {
    height: 50px;
  }

  & > ${StyledTab} {
    justify-content: center;
    width: 160px;
    min-width: 50%;
    font-size: 14px;
  }
`;

export const TradeLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 50%;
  flex: 1 1 50%;
`;

export const TradeValueInput = styled(Input)`
  flex: 1 1 0;
  & ${InputContainer} {
    height: 48px;
    box-sizing: border-box;
  }
  & ${StyledInput} {
    height: 24px;
    font-size: 16px;
  }
`;

export const SizeTypeTabs = styled(Tabs)`
  & > ${StyledTab} {
    width: 44px;
    height: 24px;
    padding: 2px 8px;
  }
`;

export const OrderTabIndicator = styled(TabIndicator)<{
  $selectedIndex: number;
}>`
  border-radius: 8px;

  ${({ $selectedIndex, theme }) =>
    $selectedIndex === 0
      ? css`
          background: ${theme.green[200]};
          border-color: transparent;
        `
      : css`
          background: ${theme.red[200]};
          border-color: transparent;
        `}
`;

export const SingleRow = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  gap: 16px;
`;

export const AmountRow = styled(SingleRow)`
  gap: 8px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #bcbec0;
  gap: 5px;
  width: 50%;
  flex: 1 1 50%;
`;

export const EstMarketPriceWrapper = styled.div<{ $textOverflow?: boolean }>`
  display: flex;
  align-items: center;
  height: 48px;

  & > ${Text} {
    font-size: 24px;
    line-height: 32px;

    ${(props) =>
      props.$textOverflow &&
      `@media only screen and (min-width: ${props.theme.breakpoints.sm}) {
          font-size: 20px;
          line-height: 28px;
      }`}
  }
`;

export const PriceInput = styled(TradeValueInput)`
  flex: 1 1 50%;
`;

export const SliderContainer = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  padding-bottom: 12px;

  @media only screen and (max-width: 1440px) {
    padding-bottom: 6px;
  }
`;

export const AdvancedOrderTypesContainer = styled.div`
  width: 100%;
`;
export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AdvancedOrderTypes = styled(AccordionDetails)`
  width: 100%;
  color: white;
  padding-top: 10px;
  ${BodyContainer} {
    display: flex;
  }

  @media only screen and (max-width: 1440px) {
    padding-top: 0px;
  }
`;

export const RadioColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;

export const OrderRadio = styled(Radio)`
  font-size: 16px;
  font-weight: 400;
  color: "#BCBEC0";
`;

export const OrderButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;

  @media only screen and (max-width: 1440px) {
    margin-bottom: 0px;
  }
`;

export const WarningContainer = styled.div`
  padding: 0px 16px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const StyledWarningIcon = styled(WarningIcon)`
  margin-top: 4px;
  min-height: 24px;
  min-width: 24px;
`;
