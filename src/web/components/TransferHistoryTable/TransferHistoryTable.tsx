import { TableActionables } from "@components/ClientAccountSummary/TableActionables";
import { ConnectWalletButton } from "@components/ConnectWalletButton";
import { Table } from "@components/Table";
import {
  TableText,
  TableWrapper
} from "@components/Table/styles";
import { useTransferHistory } from "@hooks/api/useTransferHistory.ts";
import { useWallet } from "@solana/wallet-adapter-react";
import { useClientStore, useZetaStore } from "stores";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore.ts";
import { DepositWithdrawButton } from "../DepositWithdraw/DepositWithdrawButton";
import { transferHistoryColumns } from "./TransferHistoryColumns.tsx";

interface TransferHistoryTableProps {
  showUserStateCTAs?: boolean;
  className?: string;
}

const SKELETON_SETTINGS = { rows: 6, height: 23 };


export const TransferHistoryTable = ({
  showUserStateCTAs,
  className,
}: TransferHistoryTableProps) => {
  const client = useClientStore((s) => s.client);
  const { publicKey, connected } = useWallet();
  const history = useTransferHistory(publicKey?.toString());

  const isInitialized = useZetaStore((s) => s.isInitialized);

  const isLoading = !isInitialized || (connected && !history);

  if (!isLoading) {
    if (showUserStateCTAs && isInitialized && !history?.length) {
      return (
        <TableWrapper>
          <Table
            data={[]}
            columns={transferHistoryColumns}
            className={className}
          />
          {client ? (
            /* No transfer history should logically result in a call for action RE deposit */
            <TableActionables
              instructionText="Deposit USDC to start trading"
              buttonActionable={
                <DepositWithdrawButton
                  isDepositOrWithdraw={DepositWithdrawModalState.Deposit}
                />
              }
            />

          ) : (
            <TableActionables
              instructionText="Connect your wallet to get started"
              buttonActionable={<ConnectWalletButton />}
            />
          )}
        </TableWrapper>
      );
    }


    if (isInitialized && (!history || !client)) {
      /* No transfer history should logically result in a call for action RE deposit
       * but deposit flow for trade page is centered on client account summary
       */
      return (
        <TableWrapper>
          <Table
            data={[]}
            columns={transferHistoryColumns}
            className={className}
          />
          <TableText variant="caption" color="secondary">
            {"You don't have any transfer history yet."}
          </TableText>
        </TableWrapper>
      );
    }

  }

  return (
    <Table
      skeleton={isLoading ? SKELETON_SETTINGS : undefined}
      data={history || []}
      columns={transferHistoryColumns}
      className={className}
    />
  );
};
