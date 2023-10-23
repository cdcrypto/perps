import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip } from "@components/Tooltip";
import { Text } from "@components/Text";
import {
  CancelWrapper,
  CenteredInnerHeaderCellWrapper,
} from "@components/Table/styles";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Order, Side } from "@zetamarkets/sdk/dist/types";
import { constants } from "@zetamarkets/sdk";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { useClientStore } from "stores";
import OutlinedCancelIcon from "@assets/OutlinedCancelIcon";
import { convertNumberToString } from "@utils/general";
import { ContractCell } from "@components/Table/ContractCell";
import { EditOpenOrderButton } from "./EditOpenOrderButton";
import { TradeableAssetSkeleton } from "@components/Skeletons";

export type TableOpenOrder = {
  order: Order;
  asset: Asset;
  side: Side;
  price: number;
  quantity: number;
  initialMargin: number;
};

const columnHelper = createColumnHelper<TableOpenOrder>();

export const openOrderColumns = [
  columnHelper.accessor("asset", {
    id: "asset",
    header: () => (
      <Tooltip
        content={{
          header: "Contract",
          body: TooltipDefinitions.openOrdersTable.contract,
        }}
        withLeftOffset
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Contract
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const asset = info.getValue();
      const side = info.row.original.side;

      return <ContractCell asset={asset} side={side} />;
    },
    meta: {
      skeleton: <TradeableAssetSkeleton />,
    },
    enableSorting: false,
  }),
  columnHelper.accessor("price", {
    cell: (info) => {
      const marketPrice = info.getValue();
      const marketPriceStr = convertNumberToString(marketPrice);

      return (
        <Text variant="body2" rightAlign>
          {marketPriceStr}
        </Text>
      );
    },
    id: "price",
    header: () => (
      <Tooltip
        content={{
          header: "Price",
          body: TooltipDefinitions.openOrdersTable.price,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Price ($)
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => (
      <Text variant="body2" rightAlign>
        {`${info.getValue()?.toLocaleString(undefined, {
          maximumFractionDigits: constants.PLATFORM_PRECISION,
          minimumFractionDigits: 0,
        })}`}
      </Text>
    ),
    id: "remaining",
    header: () => (
      <Tooltip
        content={{
          header: "Quantity Remaining",
          body: TooltipDefinitions.openOrdersTable.qtyRemaining,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Qty. Remaining
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor((row) => row.price * row.quantity, {
    id: "usdValue",
    header: () => (
      <Tooltip
        content={{
          header: "Trade Value",
          body: TooltipDefinitions.openOrdersTable.value,
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
  columnHelper.accessor("initialMargin", {
    cell: (info) => (
      <Text variant="body2" rightAlign>
        {info.getValue() < 0
          ? "-"
          : convertNumberToString(info.getValue(), 2, 2)}
      </Text>
    ),
    id: "initialMargin",
    header: () => (
      <Tooltip
        content={{
          header: "Initial Margin",
          body: TooltipDefinitions.openOrdersTable.initialMargin,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Initial Margin ($)
        </Text>
      </Tooltip>
    ),
  }),

  columnHelper.display({
    id: "editOrder",
    cell: (info) => {
      const order = info.row.original.order;
      return <EditOpenOrderButton order={order} />;
    },
    header: () => (
      <Tooltip
        content={{
          header: "Edit",
          body: TooltipDefinitions.openOrdersTable.initialMargin,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Edit
        </Text>
      </Tooltip>
    ),
    meta: {
      headerComponent: CenteredInnerHeaderCellWrapper,
    },
    enableSorting: false,
  }),

  columnHelper.display({
    id: "cancelIcon",
    cell: (info) => (
      <CancelWrapper
        onClick={() => {
          const transactions = useClientStore.getState().transactions;
          const order = info.row.original.order;
          void transactions?.cancelOrder(order);
        }}
      >
        <OutlinedCancelIcon />
      </CancelWrapper>
    ),
    header: () => (
      <Text variant="label" color="secondary" noWrap>
        Cancel
      </Text>
    ),
    meta: {
      skeleton: (
        <CancelWrapper>
          <OutlinedCancelIcon />
        </CancelWrapper>
      ),
      headerComponent: CenteredInnerHeaderCellWrapper,
    },
    enableSorting: false,
  }),
];
