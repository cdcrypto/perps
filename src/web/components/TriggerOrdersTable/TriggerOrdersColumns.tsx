import { CenteredInnerHeaderCellWrapper, TableHeaderContainer } from "@components/Table/styles";
import { createColumnHelper } from "@tanstack/react-table";
import { Asset, PLATFORM_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { Side, TriggerOrder } from "@zetamarkets/sdk/dist/types";
import { AssetTextWrapper, QtyTextWrapper } from "../AssetMetricsBar/styles";
import { Text } from "@components/Text";
import { Tooltip } from "@components/Tooltip";
import { TooltipDefinitions } from "@components/Tooltip/TooltipDefinitions";
import { TriggerOrderType } from "@types";
import { TextColor } from "@components/Text/Text";
import { assetToName } from "@zetamarkets/sdk/dist/assets";
import { CancelTriggerOrderButton } from "./CancelTriggerOrderButton";
import FilledCircle from "@assets/FilledCircle";
import { Column, TriggerOrderTypeText } from "./styles";
import { convertNumberToString, formatAssetPrice } from "@utils/general";
import { ContractCell } from "@components/Table/ContractCell";
import { DefaultTheme } from "styled-components";
import { EditTriggerOrderButton } from "./EditTriggerOrderButton";

export type OpenTriggerOrder = {
  triggerOrder: TriggerOrder;
  triggerOrderType: TriggerOrderType;
  asset: Asset;
  side: Side;
  triggerPrice: number;
  executionPrice: number;
  quantityRemaining: number;
  notionalValue: number;
};

const columnHelper = createColumnHelper<OpenTriggerOrder>();

export const getTriggerOrderColumns = (theme?: DefaultTheme) => [
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
        <Text variant="label" dotted color="secondary">
          Contract
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const asset = info.getValue();
      const side = info.row.original.side;
      return <ContractCell asset={asset} side={side} />;
    },
    enableSorting: false,
  }),
  columnHelper.accessor("triggerOrderType", {
    id: "triggerOrderType",
    header: () => (
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
    ),
    cell: (info) => {
      const triggerOrderType = info.getValue();
      const text =
        triggerOrderType === TriggerOrderType.STOP_LOSS
          ? "Stop Loss"
          : "Take Profit";
      const textColor: TextColor =
        triggerOrderType === TriggerOrderType.STOP_LOSS ? "short" : "long";
      const circleFill =
        triggerOrderType === TriggerOrderType.STOP_LOSS
          ? theme?.typography.short
          : theme?.typography.long;

      return (
        <AssetTextWrapper>
          <FilledCircle fill={circleFill} />
          <TriggerOrderTypeText variant="body2" color={textColor}>
            {text}
          </TriggerOrderTypeText>
        </AssetTextWrapper>
      );
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "orderType",
    header: () => (
      <Tooltip
        content={{
          header: "Trigger Price",
          body: TooltipDefinitions.closePositions.orderType,
        }}
      >
        <Text variant="label" dotted color="secondary">
          Trigger Price ($)
        </Text>
      </Tooltip>
    ),
    cell: () => {
      return (
        <Column>
          <Text variant="body2" color="primary" bold>
            Market
          </Text>
          <Text variant="caption" color="tertiary">
            Reduce only
          </Text>
        </Column>
      );
    },
  }),
  columnHelper.accessor("triggerPrice", {
    id: "triggerPrice",
    header: () => (
      <Tooltip
        content={{
          header: "Trigger Price",
          body: TooltipDefinitions.takeProfitStopLoss.triggerPrice,
        }}
      >
        <Text variant="label" dotted color="secondary">
          Trigger Price ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const asset = info.row.original.asset;
      const triggerPrice = info.getValue();
      const triggerPriceStr = formatAssetPrice(asset, triggerPrice);

      return (
        <QtyTextWrapper>
          <Text variant="body2">{triggerPriceStr}</Text>
        </QtyTextWrapper>
      );
    },
  }),
  columnHelper.accessor("quantityRemaining", {
    id: "quantity",
    header: () => (
      <Tooltip
        content={{
          header: "Qty.",
          body: TooltipDefinitions.openOrdersTable.qtyRemaining,
        }}
      >
        <Text variant="label" dotted color="secondary">
          Qty.
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const quantityRemaining = convertNumberToString(
        info.getValue(),
        2,
        PLATFORM_PRECISION
      );
      const asset = assetToName(info.row.original.asset);

      return (
        <QtyTextWrapper>
          <Text variant="body2">{quantityRemaining}</Text>
          <Text variant="body2" color="secondary" noWrap>
            {asset}
          </Text>
        </QtyTextWrapper>
      );
    },
  }),
  columnHelper.accessor("notionalValue", {
    id: "notionalValue",
    header: () => (
      <Tooltip
        content={{
          header: "Value",
          body: TooltipDefinitions.openOrdersTable.value,
        }}
      >
        <Text variant="label" dotted color="secondary">
          Value ($)
        </Text>
      </Tooltip>
    ),
    cell: (info) => {
      const notionalValue = convertNumberToString(info.getValue(), 2, 2);

      return (
        <QtyTextWrapper>
          <Text variant="body2">{notionalValue}</Text>
        </QtyTextWrapper>
      );
    },
  }),
  columnHelper.display({
    id: "editOrder",
    cell: (info) => {
      const openTriggerOrder = info.row.original;
      return <EditTriggerOrderButton openTriggerOrder={openTriggerOrder} />;
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
  columnHelper.accessor("triggerOrder", {
    id: "cancel",
    header: () => (
      <TableHeaderContainer $alignItems="center">
        <Tooltip
          content={{
            header: "Cancel",
            body: TooltipDefinitions.takeProfitStopLoss.cancel,
          }}
        >
          <Text variant="label" dotted color="secondary">
            Cancel
          </Text>
        </Tooltip>
      </TableHeaderContainer>
    ),
    cell: (info) => {
      const triggerOrder = info.getValue();

      return <CancelTriggerOrderButton triggerOrder={triggerOrder} />;
    },
    enableSorting: false,
  }),
];
