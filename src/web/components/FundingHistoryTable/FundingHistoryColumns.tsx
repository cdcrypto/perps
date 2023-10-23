import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { FundingEvent } from "@hooks/api/useFundingHistory";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { getFormattedDate } from "@utils/general";
import { ContractCell } from "@components/Table/ContractCell";

const columnHelper = createColumnHelper<FundingEvent>();

export const fundingHistoryColumns = [
  columnHelper.accessor("asset", {
    cell: (info) => {
      const asset = info.getValue();

      return <ContractCell asset={asset} />;
    },
    id: "asset",
    header: () => (
      <Tooltip
        content={{
          header: "Contract",
          body: TooltipDefinitions.fundingHistoryTable.contract,
        }}
        withLeftOffset
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Contract
        </Text>
      </Tooltip>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("balanceChange", {
    cell: (info) => (
      <Text
        rightAlign
        variant="body2"
        color={info.getValue() < 0 ? "short" : "long"}
      >{`${info.getValue() < 0 ? "-" : ""}$${Math.abs(info.getValue())}`}</Text>
    ),
    id: "balanceChange",
    header: () => (
      <Tooltip
        content={{
          header: "Balance Change",
          body: TooltipDefinitions.fundingHistoryTable.balanceChange,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Balance Change
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
          body: TooltipDefinitions.fundingHistoryTable.timestamp,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Timestamp
        </Text>
      </Tooltip>
    ),
  }),
];
