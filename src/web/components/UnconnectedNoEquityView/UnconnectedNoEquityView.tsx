import { useClient } from "@hooks/client/useClient";
import { TableActionables } from "@components/ClientAccountSummary/TableActionables";
import { ConnectWalletButton } from "@components/ConnectWalletButton";
import { useCalculationStore } from "stores";
import { DepositWithdrawButton } from "../DepositWithdraw/DepositWithdrawButton";
import { TableText } from "@components/Table/styles";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore";
export enum TableType {
  Positions = "positions",
  OpenOrders = "open orders",
  TriggerOrders = "take profit or stop loss orders",
  TradeHistory = "trade history",
  FundingHistory = "funding history",
}
export const UnconnectedNoEquityView = ({
  tableType,
}: {
  tableType: TableType;
}) => {
  const client = useClient();
  const totalAccountEquity = useCalculationStore((s) => s.totalAccountEquity);

  return (
    <>
      {!client ? (
        <TableActionables
          instructionText="Connect your wallet to get started"
          buttonActionable={<ConnectWalletButton />}
        />
      ) : !totalAccountEquity ? (
        <TableActionables
          instructionText="Deposit USDC to start trading"
          buttonActionable={
            <DepositWithdrawButton
              isDepositOrWithdraw={DepositWithdrawModalState.Deposit}
            />
          }
        />
      ) : (
        <TableText variant="caption" color="secondary">
          {`You don't have any ${tableType} yet.`}
        </TableText>
      )}
    </>
  );
};
