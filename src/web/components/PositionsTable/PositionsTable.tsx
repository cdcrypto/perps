import { Table } from "@components/Table";
import {
  TableText,
  TableWrapper
} from "@components/Table/styles";
import { useAssetMetrics } from "@hooks/calcs/useAssetMetrics";
import { useLiquidationPrice } from "@hooks/calcs/useLiquidationPrice";
import { useUnrealizedPnL } from "@hooks/calcs/useUnrealizedPnl";
import { Exchange } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useMemo } from "react";
import { useClientStore, useZetaStore } from "stores";
import { shallow } from "zustand/shallow";
import { TableType, UnconnectedNoEquityView } from "../UnconnectedNoEquityView/UnconnectedNoEquityView";
import { TablePosition, getPositionColumns } from "./PositionsColumns";
interface PositionsTableProps {
  switchToTriggerOrdersTab: () => void;
  className?: string;
  showUserStateCTAs?: boolean;
  includeInitialMargin?: boolean;
}

const SKELETON_SETTINGS = { rows: 3, height: 40 };

export const PositionsTable = ({
  switchToTriggerOrdersTab,
  className,
  showUserStateCTAs,
  includeInitialMargin = false,
}: PositionsTableProps) => {
  const { client, positions } = useClientStore(
    (state) => ({
      client: state.client,
      positions: state.positions,
    }),
    shallow
  );
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const assetMetrics = useAssetMetrics(500);

  const getLiquidationPrice = useLiquidationPrice();
  const uPnls = useUnrealizedPnL(1000);

  const positionColumns = useMemo(() => {
    return getPositionColumns(includeInitialMargin, switchToTriggerOrdersTab);
  }, [includeInitialMargin, switchToTriggerOrdersTab]);

  const formattedPositions: TablePosition[] = useMemo(() => {
    if (!isInitialized) return [];
    return (Object.keys(positions) as Asset[])
      .map((asset) => {
        const pos = positions[asset];
        if (!pos) return undefined;
        return {
          asset,
          side: pos?.size > 0 ? Side.BID : Side.ASK,
          entryPrice: Math.abs(pos?.costOfTrades / pos?.size),
          markPrice: Exchange.getMarkPrice(asset),
          quantity: Math.abs(pos?.size),
          liquidationPrice: getLiquidationPrice(asset, pos?.size),
          initialMargin: assetMetrics?.get(asset)?.initialMargin,
          unrealizedPnl: uPnls?.get(asset)?.nominal,
          unrealizedPnlPercentage: uPnls?.get(asset)?.percentage,
        };
      }, [])
      .filter((pos) => !!pos) as TablePosition[];
  }, [isInitialized, positions, getLiquidationPrice, assetMetrics, uPnls]);

  if (showUserStateCTAs && isInitialized && !formattedPositions.length) {
    return (
      <TableWrapper>
        <Table data={[]} columns={positionColumns} className={className} />
        <UnconnectedNoEquityView tableType={TableType.Positions} />
      </TableWrapper>
    );
  }

  if (isInitialized && (!formattedPositions.length || !client)) {
    return (
      <TableWrapper>
        <Table data={[]} columns={positionColumns} className={className} />
        <TableText variant="caption" color="secondary">
          {"You don't have any open positions yet."}
        </TableText>
      </TableWrapper>
    );
  }

  return (
    <Table
      skeleton={isInitialized ? undefined : SKELETON_SETTINGS}
      data={formattedPositions}
      columns={positionColumns}
      className={className}
    />
  );
};
