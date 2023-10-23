import { Tab, Tabs } from "@components/Tabs";
import styled from "styled-components";
import { Text } from "@components/Text";

export const OrderbookTradesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 16px;
  background: ${(props) => props.theme.background[300]};
`;

export const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-start;
  /* width: 100%; */
  background: ${(props) => props.theme.background[300]};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding: 16px 8px 0px 0px;
  gap: 16px;
`;

export const StyledTab = styled(Tab)`
  display: flex;
  justify-content: center;
  height: 26px;
  white-space: nowrap;
  padding: 0;
`;

export const StyledText = styled(Text)`
  padding: 16px 8px 8px 8px;
`;
