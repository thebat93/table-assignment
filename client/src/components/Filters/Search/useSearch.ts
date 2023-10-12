import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

const useSearch = ({
  defaultSearch = "",
  onDebouncedSearchChange,
  wait = 300,
}: {
  defaultSearch?: string;
  onDebouncedSearchChange?: (newSearch: string) => void;
  wait?: number;
} = {}) => {
  const [search, setSearch] = useState(defaultSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debouncedPerformSearch = useRef(
    debounce((newSearch: string) => {
      setDebouncedSearch(newSearch);
      onDebouncedSearchChange?.(newSearch)
    }, wait)
  );

  const onSearch = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
      debouncedPerformSearch.current(newSearch);
    },
    [setSearch, debouncedPerformSearch]
  );

  return {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    onSearch,
    debouncedPerformSearch: debouncedPerformSearch.current,
  };
};

export { useSearch };
