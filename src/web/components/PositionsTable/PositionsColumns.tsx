import { PriceDelta } from "@components/PriceDelta";
import { TradeableAssetSkeleton } from "@components/Skeletons";
import { ContractCell } from "@components/Table/ContractCell";
import { CenteredInnerHeaderCellWrapper, TableHeaderContainer } from "@components/Table/styles";
import { TakeProfitStopLossButton } from "@components/TakeProfitStopLossModal";
import { TakeProfitStopLossRawButton } from "@components/TakeProfitStopLossModal/TakeProfitStopLossButton/TakeProfitStopLossButton";
import { Text } from "@components/Text";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { createColumnHelper } from "@tanstack/react-table";
import { convertNumberToString, formatAssetPrice } from "@utils/general";
import { constants } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import { QtyTextWrapper } from "../AssetMetricsBar/styles";
import {
  ClosePositionButton,
  ClosePositionRawButton,
} from "./ClosePositionButton";
import {
  SharePositionButton,
  SharePositionRawButton,
} from "./SharePositionButton";

export type TablePosition = {
  unrealizedPnlPercentage: number;
  asset: Asset;
  side: Side;
  markPrice: number;
  entryPrice: number;
  quantity: number;
  liquidationPrice: number;
  initialMargin: number;
  unrealizedPnl: number;
};

const columnHelper = createColumnHelper<TablePosition>();

export const positionColumns = (switchToTriggerOrdersTab: () => void) => [
  columnHelper.accessor("asset", {
    meta: {
      skeleton: <TradeableAssetSkeleton />,
    },
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
          body: TooltipDefinitions.positionsTable.contract,
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
  columnHelper.accessor("quantity", {
    id: "quantity",
    header: () => (
      <Tooltip
        content={{
          header: "Quantity",
          body: TooltipDefinitions.positionsTable.quantity,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary">
          Qty.
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const asset = info.row.original.asset;
      return (
        <QtyTextWrapper>
          <Text variant="body2" color="primary">
            {`${info.getValue()?.toLocaleString(undefined, {
              maximumFractionDigits: constants.PLATFORM_PRECISION,
              minimumFractionDigits: 0,
            })}`}
          </Text>
          <Text variant="body2" color="secondary" noWrap>
            {asset}
          </Text>
        </QtyTextWrapper>
      );
    },
  }),
  columnHelper.accessor((row) => row.markPrice * row.quantity, {
    id: "usdValue",
    header: () => (
      <Tooltip
        content={{
          header: "Value",
          body: TooltipDefinitions.positionsTable.tradeValue,
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
  columnHelper.accessor("entryPrice", {
    cell: (info) => {
      const entryPrice = info.getValue();
      const entryPriceStr = convertNumberToString(entryPrice);
      return (
        <Text variant="body2" rightAlign>
          {entryPriceStr}
        </Text>
      );
    },
    id: "entryPrice",
    header: () => (
      <Tooltip
        content={{
          header: "Entry Price",
          body: TooltipDefinitions.positionsTable.entryPrice,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Entry Price ($)
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("markPrice", {
    id: "markPrice",
    header: () => (
      <Tooltip
        content={{
          header: "Mark",
          body: TooltipDefinitions.positionsTable.markPrice,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Mark ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const marketPrice = info.getValue();
      const asset = info.row.original.asset;
      const marketPriceStr = formatAssetPrice(asset, marketPrice);

      return (
        <Text variant="body2" rightAlign>
          {marketPriceStr}
        </Text>
      );
    },
  }),
  columnHelper.accessor("liquidationPrice", {
    id: "liquidationPrice",
    header: () => (
      <Tooltip
        content={{
          header: "Liquidation Price",
          body: TooltipDefinitions.positionsTable.liquidationPrice,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Liq. Price ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const liquidationPrice = info.getValue();
      const liquidationPriceStr =
        liquidationPrice >= 0 ? convertNumberToString(liquidationPrice) : "-";
      return (
        <Text variant="body2" rightAlign>
          {liquidationPriceStr}
        </Text>
      );
    },
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
          body: TooltipDefinitions.positionsTable.initialMargin,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          Initial Margin ($)
        </Text>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("unrealizedPnl", {
    id: "PnL",
    header: () => (
      <Tooltip
        content={{
          header: "Unrealized PNL",
          body: TooltipDefinitions.positionsTable.uPNL,
        }}
      >
        <Text variant="label" dotted withTooltip color="secondary" noWrap>
          UPNL ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const unrealizedPnlPercentage = info.row.original.unrealizedPnlPercentage;
      return (
        <PriceDelta
          variant="body2"
          delta={info.getValue()}
          deltaPercentage={unrealizedPnlPercentage}
          tableRepresentation
          removeIcon
        />
      );
    },
  }),
  columnHelper.display({
    id: "TakeProfitStopLoss",
    cell: (info) => (
      <TakeProfitStopLossButton
        asset={info.row.original.asset}
        switchToTriggerOrdersTab={switchToTriggerOrdersTab}
      />
    ),
    header: () => (
      <TableHeaderContainer $alignItems="center">
        <Tooltip
          content={{
            header: "Take Profit / Stop Loss",
            body: TooltipDefinitions.takeProfitStopLoss.tpsl,
          }}
        >
          <Text variant="label" dotted color="secondary">
            TP/SL
          </Text>
        </Tooltip>
      </TableHeaderContainer>
    ),
    meta: {
      skeleton: <TakeProfitStopLossRawButton onClick={() => {}} />,
    },
  }),
  columnHelper.display({
    id: "closeIcon",
    cell: ({ row: { original } }) => (
      <ClosePositionButton asset={original.asset} />
    ),
    header: () => (
      <Text variant="label" color="secondary">
        Close
      </Text>
    ),
    meta: {
      skeleton: (
        <ClosePositionRawButton
          onClick={() => {
            console.log("Firing");
          }}
        />
      ),
      headerComponent: CenteredInnerHeaderCellWrapper,
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "shareIcon",
    cell: ({ row: { original } }) => (
      <SharePositionButton
        entryPrice={original.entryPrice}
        unrealizedPnl={original.unrealizedPnl}
        unrealizedPnlPercentage={original.unrealizedPnlPercentage}
        asset={original.asset}
        markPrice={original.markPrice}
        initialMargin={original.initialMargin}
        side={original.side}
      />
    ),
    header: () => null,
    enableSorting: false,
    meta: {
      skeleton: <SharePositionRawButton onClick={() => {}} />,
    },
  }),
];

export const getPositionColumns = (
  includeInitialMargin: boolean,
  switchToTriggerOrdersTab: () => void
) => {
  const columns = positionColumns(switchToTriggerOrdersTab);

  if (includeInitialMargin) {
    return columns;
  }

  return columns.filter((column) => column.id !== "initialMargin");
};
