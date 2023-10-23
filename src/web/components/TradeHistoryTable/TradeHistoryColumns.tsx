import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import { constants } from "@zetamarkets/sdk";
import { formatAssetPrice, getFormattedDate } from "@utils/general";
import { Trade } from "@types";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { ContractCell } from "@components/Table/ContractCell";
import { TradeableAssetSkeleton } from "@components/Skeletons";

const columnHelper = createColumnHelper<Trade>();

export const tradeHistoryColumns = [
  columnHelper.accessor("asset", {
    cell: (info) => {
      const asset = info.getValue();
      const side = info.row.original.side;
      return <ContractCell asset={asset} side={side} />;
    },
    id: "asset",
    header: () => (
      <Tooltip
        content={{
          header: "Contract",
          body: TooltipDefinitions.tradeHistoryTable.contract,
        }}
        withLeftOffset
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Contract
        </Text>
      </Tooltip>
    ),
    meta: {
      skeleton: <TradeableAssetSkeleton />
    },
    enableSorting: false,
  }),
  columnHelper.accessor(
    (row) =>
      row.isLiquidation ? "Liquidation" : row.isTaker ? "Taker" : "Maker",
    {
      cell: (info) => (
        <Text variant="body2" color="primary">
          {info.getValue()}
        </Text>
      ),
      id: "fill",
      header: () => (
        <Tooltip
          content={{
            header: "Fill",
            body: TooltipDefinitions.tradeHistoryTable.fill,
          }}
        >
          <Text variant="label" dotted withTooltip color="secondary" noWrap>
            Fill
          </Text>
        </Tooltip>
      ),
      enableSorting: false,
    }
  ),
  columnHelper.accessor("price", {
    cell: (info) => {
      const price = info.getValue();
      const asset = info.row.original.asset;
      const priceStr = formatAssetPrice(asset, price);

      return (
        <Text variant="body2" rightAlign>
          {priceStr}
        </Text>
      );
    },
    id: "price",
    header: () => (
      <Tooltip
        content={{
          header: "Price",
          body: TooltipDefinitions.tradeHistoryTable.price,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Price ($)
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("size", {
    cell: (info) => (
      <Text variant="body2" rightAlign>
        {`${info.getValue()?.toLocaleString(undefined, {
          maximumFractionDigits: constants.PLATFORM_PRECISION,
          minimumFractionDigits: 0,
        })}`}
      </Text>
    ),
    id: "size",
    header: () => (
      <Tooltip
        content={{
          header: "Quantity",
          body: TooltipDefinitions.tradeHistoryTable.quantity,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Qty.
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor((row) => row.price * row.size, {
    id: "usdValue",
    header: () => (
      <Tooltip
        content={{
          header: "Trade Value",
          body: TooltipDefinitions.tradeHistoryTable.tradeValue,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Value ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => (
      <Text variant="body2" rightAlign>
        {`${info.getValue()?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}`}
      </Text>
    ),
  }),
  // columnHelper.accessor("fee", {
  //   cell: (info) => (
  //     <Text variant="body2" rightAlign>
  //       {`${info.getValue()?.toLocaleString(undefined, {
  //         maximumFractionDigits: constants.PLATFORM_PRECISION,
  //         minimumFractionDigits: 0,
  //       })}`}
  //     </Text>
  //   ),
  //   id: "fee",
  //   header: () => (
  //     <Tooltip
  //       content={{
  //         header: "Fee",
  //         body: TooltipDefinitions.tradeHistoryTable.fee,
  //       }}
  //     >
  //       <Text variant="label" dotted withTooltip color="secondary">
  //         Fee
  //       </Text>
  //     </Tooltip>
  //   ),
  // }),
  columnHelper.accessor("timestamp", {
    cell: (info) => (
      <Text variant="body2" color="secondary" rightAlign>
        {`${getFormattedDate(info.getValue(), "trade-history-timestamp")}`}
      </Text>
    ),
    id: "timestamp",
    header: () => (
      <Tooltip
        content={{
          header: "Timestamp",
          body: TooltipDefinitions.tradeHistoryTable.timestamp,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Timestamp
        </Text>
      </Tooltip>
    ),
  }),
];
