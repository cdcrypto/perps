import { Table } from "@components/Table";
import { TableText, TableWrapper } from "@components/Table/styles";
import { useClient } from "@hooks/client/useClient";
import { useOpenTriggerOrders } from "@hooks/client/useOpenTriggerOrders";
import { useZetaStore } from "stores";
import { useTheme } from "styled-components";
import { shallow } from "zustand/shallow";
import {
  TableType,
  UnconnectedNoEquityView,
} from "../UnconnectedNoEquityView/UnconnectedNoEquityView";
import { getTriggerOrderColumns } from "./TriggerOrdersColumns";
import { useMemo } from "react";

interface TriggerOrdersTableProps {
  showUserStateCTAs?: boolean;
  className?: string;
}

const SKELETON_SETTINGS = { rows: 3, height: 40 };

export const TriggerOrdersTable = ({
  showUserStateCTAs,
  className,
}: TriggerOrdersTableProps) => {
  const isInitialized = useZetaStore((s) => s.isInitialized, shallow);
  const triggerOrders = useOpenTriggerOrders(isInitialized);
  const client = useClient();
  const theme = useTheme();
  const triggerOrderColumns = useMemo(
    () => getTriggerOrderColumns(theme),
    [theme]
  );

  if (showUserStateCTAs && isInitialized && !triggerOrders.length) {
    return (
      <TableWrapper>
        <Table data={[]} columns={triggerOrderColumns} className={className} />
        <UnconnectedNoEquityView tableType={TableType.TriggerOrders} />
      </TableWrapper>
    );
  }

  if (isInitialized && (!triggerOrders.length || !client)) {
    return (
      <TableWrapper className={className}>
        <Table data={[]} columns={triggerOrderColumns} />
        <TableText variant="caption" color="secondary">
          {"You don't have any Take Profit or Stop Loss orders yet."}
        </TableText>
      </TableWrapper>
    );
  }

  return (
    <Table
      skeleton={isInitialized ? undefined : SKELETON_SETTINGS}
      data={triggerOrders}
      columns={triggerOrderColumns}
      className={className}
    />
  );
};
