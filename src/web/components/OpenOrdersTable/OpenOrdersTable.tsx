import { Table } from "@components/Table";
import {
  TableText,
  TableWrapper
} from "@components/Table/styles";
import { useAssetMetrics } from "@hooks/calcs/useAssetMetrics";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Order } from "@zetamarkets/sdk/dist/types";
import { useMemo } from "react";
import {
  ClientStore,
  useClientStore,
  useZetaStore,
} from "stores";
import { shallow } from "zustand/shallow";
import { TableType, UnconnectedNoEquityView } from "../UnconnectedNoEquityView/UnconnectedNoEquityView";
import { TableOpenOrder, openOrderColumns } from "./OpenOrdersColumns";

interface OpenOrdersTableProps {
  orders?: ClientStore["orders"];
  showUserStateCTAs?: boolean;
  className?: string;
}


const SKELETON_SETTINGS = { rows: 3, height: 40 };


export const OpenOrdersTable = ({
  orders,
  showUserStateCTAs,
  className,
}: OpenOrdersTableProps) => {
  const { client, orders: clientOrders } = useClientStore(
    (state) => ({
      client: state.client,
      orders: state.orders,
    }),
    shallow
  );

  const resolvedOrders = orders ?? clientOrders;

  const isInitialized = useZetaStore((s) => s.isInitialized);
  const assetMetrics = useAssetMetrics(500);

  const formattedOrders: TableOpenOrder[] = useMemo(() => {
    if (!isInitialized) return [];
    return (Object.keys(resolvedOrders) as Asset[]).reduce(
      (accum, curr) => {
        const mappedAssetOrders: TableOpenOrder[] = resolvedOrders[curr].map((o: Order) => {
          return {
            order: o,
            asset: curr,
            side: o.side,
            price: o.price,
            quantity: o.size,
            initialMargin: assetMetrics?.get(curr)?.initialMargin ?? 0,
          };
        });
        return [...accum, ...mappedAssetOrders];
      },
      [] as TableOpenOrder[]
    );
  }, [assetMetrics, isInitialized, resolvedOrders]);


  if (showUserStateCTAs && isInitialized && !formattedOrders.length) {
    return (
      <TableWrapper>
        <Table data={[]} columns={openOrderColumns} className={className} />
        <UnconnectedNoEquityView tableType={TableType.OpenOrders} />
      </TableWrapper>
    );
  }

  if (isInitialized && (!formattedOrders.length || !client)) {
    return (
      <TableWrapper className={className}>
        <Table data={[]} columns={openOrderColumns} />
        <TableText variant="caption" color="secondary">
          {"You don't have any open orders yet."}
        </TableText>
      </TableWrapper>
    );
  }

  return (
    <Table
      skeleton={isInitialized ? undefined : SKELETON_SETTINGS}
      data={formattedOrders}
      columns={openOrderColumns}
      className={className}
    />
  );
};
