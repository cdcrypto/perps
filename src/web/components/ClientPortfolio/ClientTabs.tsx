import { Badge } from "@components/Badge";
import { Tabs, Tab } from "@components/Tabs";
import { ClientPortfolioTab } from "./ClientPortfolio";
import styled from "styled-components";
import { useFlatPositions } from "@hooks/client/useFlatPositions";
import { useFlatOrders } from "@hooks/client/useFlatOrders";
import { TabIndicator } from "@components/Tabs/styles";
import { useOpenTriggerOrders } from "@hooks/client/useOpenTriggerOrders";

interface ClientPortfolioTabsProps {
  value: ClientPortfolioTab;
  onChange: (index: number) => void;
}

export const ClientPortfolioTabs = ({
  value,
  onChange: handleChange,
}: ClientPortfolioTabsProps) => {
  const positions = useFlatPositions();
  const orders = useFlatOrders();
  const triggerOrders = useOpenTriggerOrders();

  const numberOfPositions = positions.length;
  const numberOfOrders = orders.length;
  const numberOfTriggerOrders = triggerOrders.length;

  return (
    <StyledTabs
      selectedIndex={value}
      onChange={handleChange}
      variant="underlined"
    >
      <StyledTab
        testId="positions-tab"
        endAdornment={
          numberOfPositions ? (
            <Badge variant="contained">{numberOfPositions.toString()}</Badge>
          ) : null
        }
      >
        Positions
      </StyledTab>
      <StyledTab
        testId="orders-tab"
        endAdornment={
          numberOfOrders ? (
            <Badge variant="contained">{numberOfOrders.toString()}</Badge>
          ) : null
        }
      >
        Open Orders
      </StyledTab>
      <StyledTab
        testId="trigger-orders-tab"
        endAdornment={
          numberOfTriggerOrders ? (
            <Badge variant="contained">
              {numberOfTriggerOrders.toString()}
            </Badge>
          ) : null
        }
      >
        TP/SL Orders
      </StyledTab>
      <StyledTab testId="trade-history-tab">Trade History</StyledTab>
      <StyledTab testId="funding-history-tab">Funding History</StyledTab>
      <StyledTab testId="transfer-history-tab">Transfer History</StyledTab>
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  gap: 1rem;
  padding: 0rem 1rem;
  background: ${(props) => props.theme.background[300]};
  margin-bottom: 0.5rem;
  ${TabIndicator} {
    top: -5px;
  }
`;

const StyledTab = styled(Tab)`
  /* padding: 0.5rem 0; */
  height: 40px;
  padding: 0;
  border-bottom: none;
`;
