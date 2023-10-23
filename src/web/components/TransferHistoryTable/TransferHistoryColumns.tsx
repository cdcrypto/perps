import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { TransferAction, TransferEvent } from "@hooks/api/useTransferHistory";
import { capitalizeFirstLetter, getFormattedDate } from "@utils/general";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";

const columnHelper = createColumnHelper<TransferEvent>();

export const transferHistoryColumns = [
  columnHelper.display({
    cell: () => (
      <Text variant="body2" color="primary">
        USDC
      </Text>
    ),
    id: "asset",
    header: () => (
      <Tooltip
        content={{
          header: "Asset",
          body: TooltipDefinitions.transferHistoryTable.asset,
        }}
        withLeftOffset
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Asset
        </Text>
      </Tooltip>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("action", {
    cell: (info) => (
      <Text
        rightAlign
        variant="body2"
        color={info.getValue() === TransferAction.Deposit ? "long" : "short"}
      >{`${capitalizeFirstLetter(info.getValue())}`}</Text>
    ),
    id: "action",
    header: () => (
      <Tooltip
        content={{
          header: "Action",
          body: TooltipDefinitions.transferHistoryTable.action,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Action
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("amount", {
    cell: (info) => (
      <Text rightAlign variant="body2">{`${info.getValue()}`}</Text>
    ),
    id: "amount",
    header: () => (
      <Tooltip
        content={{
          header: "Amount",
          body: TooltipDefinitions.transferHistoryTable.amount,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Amount ($)
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("timestamp", {
    cell: (info) => (
      <Text variant="body2" color="secondary" rightAlign>
        {`${getFormattedDate(info.getValue())}`}
      </Text>
    ),
    id: "timestamp",
    header: () => (
      <Tooltip
        content={{
          header: "Timestamp",
          body: TooltipDefinitions.transferHistoryTable.timestamp,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Timestamp
        </Text>
      </Tooltip>
    ),
  }),
];
