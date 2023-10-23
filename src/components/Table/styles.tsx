import { Text } from "@components/Text";
import { Skeleton } from "@mui/material";
import { CSSProperties } from "react";
import { css, styled } from "styled-components";

interface HeaderProps {
  $alignItems?: CSSProperties["alignItems"];
}

interface HeaderProps {
  $alignItems?: CSSProperties["alignItems"];
}

export const ScrollableTableWrapper = styled.div<{ $withContent: boolean }>`
  height: ${(props) => (props.$withContent ? "100%" : "auto")};
  width: 100%;
  overflow: ${(props) => (props.$withContent ? "auto" : "visible")};
  overflow-x: auto;
  position: relative;
  z-index: 1;
`;

export const Table = styled.table`
  width: 100%;
  background: ${(props) => props.theme.background[300]};
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid #342f3e;
  box-shadow: 0 0.5px 0 #464a5f;

  th {
    position: sticky;
    top: 0;
    padding-left: 16px;
  }
  tr {
    position: sticky;
    top: 0;
  }
`;

export const TableRow = styled.tr`
  background: ${(props) => props.theme.background[300]};
  height: 40px;
  width: 100%;
`;

export const StubTableRow = styled(TableRow)`
  padding: 0;
  height: 8px;
`;

export const ContentTableRow = styled(TableRow)`
  &:hover {
    background: ${(props) => props.theme.grey[800]};
  }
`;

export const Tbody = styled.tbody``;

export const TableHeaderCell = styled.th<{ $sort?: boolean }>`
  padding: 8px;

  font-size: 12px;
  font-weight: 500;
  color: "#808285";
  white-space: nowrap;

  ${(props) =>
    props.$sort &&
    css`
      &:hover {
        cursor: pointer;
      }
    `};
`;
export const TableBody = styled.tbody``;
export const TableDataCell = styled.td`
  padding: 0.5rem;
  padding-left: 16px;

  font-size: 12px;
  font-weight: 500;
  color: #bcbec0;
  height: 19px;
  vertical-align: top;

  svg {
    &:hover {
      cursor: pointer;
      filter: brightness(1.2);
    }
  }
`;

export const InnerHeaderCellWrapper = styled.div<{
  $rightAlign: boolean;
}>`
  display: flex;
  gap: 4px;

  ${(props) =>
    props.$rightAlign &&
    css`
      flex-direction: row;
      justify-content: end;
    `}
`;

export const CenteredInnerHeaderCellWrapper = styled(InnerHeaderCellWrapper)`
  flex-direction: row;
  justify-content: center;
`;

export const TableCellInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  .MuiSkeleton-root {
    background-color: ${(props) => props.theme.typography.secondary};
  }
`;

export const TableText = styled(Text)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const ContractsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CancelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const TableHeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$alignItems ?? "flex-start"};
  justify-content: center;
`;

export const SkeletonContainer = styled.div`
  height: 100%;
`;

export const StyledSkeleton = styled(Skeleton)`
  &.MuiSkeleton-root {
    background-color: ${(props) => props.theme.grey[700]};
    transform: none;
  }
`;
