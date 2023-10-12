import { useCallback, useEffect, useMemo, useState } from "react";
import { useColumnsOrder } from "./useColumnsOrder";
import { useSelection } from "./useSelection";
import { usePagination } from "./usePagination";
import { Columns, SortDirection } from "../types";
import { SortChangeParams, useSorting } from "./useSorting";

const useTable = <R, K extends string>({
  id,
  getRowId,
  columns,
  defaultData = [],
  defaultPageIndex,
  defaultPageSize,
  defaultSortBy,
  defaultSortDirection,
}: {
  id: string;
  getRowId: (row: R) => string;
  columns: Columns<R, K>;
  defaultData?: R[];
  defaultPageIndex?: number;
  defaultPageSize?: number;
  defaultSortBy?: K;
  defaultSortDirection?: SortDirection;
  onSortChange?: ({ sortBy, sortDirection }: SortChangeParams<K>) => void;
}) => {
  const [data, setData] = useState<R[]>(defaultData);

  const columnsOrder = useColumnsOrder<K>({
    id,
    defaultOrder: Object.keys(columns) as K[],
  });

  const selection = useSelection();

  const { setSelectedIds, setRowIds } = selection;

  const handlePageChange = useCallback(() => {
    setSelectedIds(new Set());
  }, [setSelectedIds]);

  const pagination = usePagination({
    defaultPageIndex,
    defaultPageSize,
    onPageChange: handlePageChange,
  });

  const { page, pageSize } = pagination;

  const rows = useMemo(() => {
    if (data.length > pageSize) {
      return data.slice((page - 1) * pageSize, page * pageSize);
    }

    return data;
  }, [data, page, pageSize]);

  useEffect(() => {
    setRowIds(rows.map((row) => getRowId(row)));
  }, [rows, getRowId, setRowIds]);

  const sorting = useSorting<K>({
    defaultSortBy,
    defaultSortDirection,
  });

  return {
    data,
    setData,
    rows,
    columnsOrder,
    selection,
    pagination,
    sorting,
  };
};

export { useTable };
