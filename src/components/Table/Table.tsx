import AscendingIcon from "@assets/AscendingIcon";
import DescendingIcon from "@assets/DescendingIcon";
import SortIcon from "@assets/SortIcon";

import {
  Cell,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  ContentTableRow,
  InnerHeaderCellWrapper,
  ScrollableTableWrapper,
  SkeletonContainer,
  StyledSkeleton,
  TableDataCell,
  Table as TableElement,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tbody,
  StubTableRow,
} from "./styles";

interface TableProps<T> {
  /**
   * The data required to display the table
   */
  data: T[];
  /**
   * The customisable columns created which decide how the data is displayed and formatted
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  className?: string;

  /**
   * Optional skeleton to display while the table is loading
   */
  skeleton?: {
    rows: number;
    /**
     * The height of each row in pixels. Default is 20px
     */
    rowHeight?: number;
  };
}
interface SkeletonForCellProps<T> {
  cell: Cell<T, unknown>;
  height?: number;
}

function SkeletonForCell<T>({ cell, height = 20 }: SkeletonForCellProps<T>) {
  if (cell.column.columnDef.meta?.skeleton) {
    const skeleton = cell.column.columnDef.meta.skeleton;
    return <SkeletonContainer>{skeleton}</SkeletonContainer>;
  }
  return (
    <SkeletonContainer>
      <StyledSkeleton height={height} />
    </SkeletonContainer>
  );
}

export const Table = <T,>({
  data,
  columns,
  className,
  skeleton,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const dataWithSkeleton = useMemo(
    () => (skeleton ? (Array(skeleton.rows).fill({}) as T[]) : data),
    [data, skeleton]
  );
  const table = useReactTable({
    data: dataWithSkeleton,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <ScrollableTableWrapper $withContent={dataWithSkeleton.length > 0}>
      <TableElement className={className}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  $sort={header.column.getCanSort()}
                >
                  {header.isPlaceholder ? null : (
                    <InnerHeaderCellWrapper
                      $rightAlign={header.column.getCanSort()}
                      as={header.column.columnDef.meta?.headerComponent}
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {!header.column.getCanSort()
                        ? null
                        : {
                            asc: <AscendingIcon />,
                            desc: <DescendingIcon />,
                          }[header.column.getIsSorted() as string] ?? (
                            <SortIcon />
                          )}
                    </InnerHeaderCellWrapper>
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <Tbody>
          {table.getRowModel().rows.map((row, rowIdx) => (
            <>
              {rowIdx === 0 && (
                <StubTableRow>
                  <td colSpan={row.getVisibleCells().length}></td>
                </StubTableRow>
              )}
              <ContentTableRow key={row.id}>
                {row.getVisibleCells().map((cell, idx) => (
                  <TableDataCell key={cell.id}>
                    {skeleton ? (
                      <SkeletonForCell
                        key={`skeleton-${rowIdx}-${idx}`}
                        cell={cell}
                        height={skeleton.rowHeight}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableDataCell>
                ))}
              </ContentTableRow>
            </>
          ))}
        </Tbody>
      </TableElement>
    </ScrollableTableWrapper>
  );
};
