import { Table } from "@components/Table";
import {
  TableText,
  TableWrapper,
} from "@components/Table/styles";
import { useFundingHistory } from "@hooks/api/useFundingHistory.ts";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClientStore, useZetaStore } from "stores";
import { TableType, UnconnectedNoEquityView } from "../UnconnectedNoEquityView/UnconnectedNoEquityView.tsx";
import { fundingHistoryColumns } from "./FundingHistoryColumns.tsx";
interface FundingHistoryTableProps {
  showUserStateCTAs?: boolean;
  className?: string;
}

const SKELETON_SETTINGS = { rows: 6, height: 23 };


export const FundingHistoryTable = ({
  showUserStateCTAs,
  className,
}: FundingHistoryTableProps) => {
  const client = useClientStore((s) => s.client);
  const { publicKey, connected } = useWallet();
  const history = useFundingHistory(publicKey?.toString());

  const isInitialized = useZetaStore((s) => s.isInitialized);

  const isLoading = !isInitialized || (connected && !history);

  if (!isLoading) {
    if (showUserStateCTAs) {
      return (
        <TableWrapper>
          <Table
            data={[]}
            columns={fundingHistoryColumns}
            className={className}
          />
          <UnconnectedNoEquityView tableType={TableType.FundingHistory} />
        </TableWrapper>
      );
    }
    if (

      (isInitialized && (!history?.length || !client)) ||
      /* This case is redundant, but it's here to keep ts happy */
      !history
    ) {
      return (
        <TableWrapper>
          <Table
            data={[]}
            columns={fundingHistoryColumns}
            className={className}
          />
          <TableText variant="caption" color="secondary">
            {"You don't have any funding history yet."}
          </TableText>
        </TableWrapper>
      );
    }
  }


  return (
    <Table
      skeleton={isLoading ? SKELETON_SETTINGS : undefined}
      data={history ?? []}
      columns={fundingHistoryColumns}
      className={className}
    />
  );
};
