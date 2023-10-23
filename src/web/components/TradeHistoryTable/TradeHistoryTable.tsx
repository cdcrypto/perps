import { Table } from "@components/Table";
import {
  TableText,
  TableWrapper
} from "@components/Table/styles";
import { useTradeHistory } from "@hooks/api/useTradeHistory";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClientStore, useZetaStore } from "stores";
import { TableType, UnconnectedNoEquityView } from "../UnconnectedNoEquityView/UnconnectedNoEquityView";
import { tradeHistoryColumns } from "./TradeHistoryColumns";
interface TradeHistoryTableProps {
  showUserStateCTAs?: boolean;
  className?: string;
}

const SKELETON_SETTINGS = { rows: 3, height: 40 };


export const TradeHistoryTable = ({
  showUserStateCTAs,
  className,
}: TradeHistoryTableProps) => {
  const client = useClientStore((s) => s.client);
  const { publicKey, connected } = useWallet();
  const history = useTradeHistory(publicKey?.toString());
  const isInitialized = useZetaStore((s) => s.isInitialized);

  const isLoading = !isInitialized || (connected && !history);

  if (!isLoading) {


    if (showUserStateCTAs && isInitialized && !history?.length) {
      return (
        <TableWrapper>
          <Table data={[]} columns={tradeHistoryColumns} className={className} />
          <UnconnectedNoEquityView tableType={TableType.TradeHistory} />
        </TableWrapper>
      );
    }

    if (isInitialized && (!history?.length || !client)) {
      return (
        <TableWrapper>
          <Table data={[]} columns={tradeHistoryColumns} className={className} />
          <TableText variant="caption" color="secondary">
            {"You don't have any trade history yet."}
          </TableText>
        </TableWrapper>
      );
    }

  }
  return (
    <Table
      skeleton={isLoading ? SKELETON_SETTINGS : undefined}
      data={history ?? []}
      columns={tradeHistoryColumns}
      className={className}
    />
  );
};
