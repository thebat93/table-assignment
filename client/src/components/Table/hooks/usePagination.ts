import { useCallback, useEffect, useState } from "react";

const usePagination = ({
  defaultPageIndex = 0,
  defaultPageSize = 5,
  defaultTotal = 0,
  onPageChange,
  onPageSizeChange,
}: {
  defaultPageIndex?: number;
  defaultPageSize?: number;
  defaultTotal?: number;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
} = {}) => {
  const [page, setPage] = useState(defaultPageIndex + 1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(defaultTotal);

  useEffect(() => {
    onPageChange?.(page);
  }, [page, onPageChange]);

  useEffect(() => {
    onPageSizeChange?.(pageSize);
  }, [pageSize, onPageSizeChange]);

  const goNextPage = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const goPreviousPage = useCallback(() => {
    setPage((page) => page - 1);
  }, []);

  return {
    page,
    setPage,
    goNextPage,
    goPreviousPage,
    pageSize,
    setPageSize,
    total,
    setTotal,
    isPreviousActive: total > 0 && page > 1,
    isNextActive: total > 0 && page * pageSize < total,
  };
};

export { usePagination };
