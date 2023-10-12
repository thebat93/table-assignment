import { useCallback, useEffect, useState } from "react";
import { SORT_DIRECTIONS } from "../const";
import { SortDirection } from "../types";

interface SortChangeParams<K extends string> {
  sortBy?: K;
  sortDirection: SortDirection;
}

const useSorting = <K extends string>({
  defaultSortBy,
  defaultSortDirection = SORT_DIRECTIONS.ASC,
  onSortChange,
}: {
  defaultSortBy?: K;
  defaultSortDirection?: SortDirection;
  onSortChange?: ({ sortBy, sortDirection }: SortChangeParams<K>) => void;
} = {}) => {
  const [sortBy, setSortBy] = useState<K | undefined>(defaultSortBy);
  const [sortDirection, setSortingDirection] =
    useState<SortDirection>(defaultSortDirection);

  const toggleSortDirection = useCallback(() => {
    setSortingDirection((sortingDirection) =>
      sortingDirection === SORT_DIRECTIONS.ASC
        ? SORT_DIRECTIONS.DESC
        : SORT_DIRECTIONS.ASC
    );
  }, []);

  useEffect(() => {
    onSortChange?.({ sortBy, sortDirection });
  }, [onSortChange, sortBy, sortDirection]);

  return {
    sortBy,
    setSortBy,
    sortDirection,
    toggleSortDirection,
  };
};

export type { SortChangeParams };
export { useSorting };
