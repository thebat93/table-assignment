import { ChangeEvent, JSX, useCallback } from "react";

import s from "./Search.module.css";
import clsx from "clsx";

type Props = { onSearch: (newSearch: string) => void } & Omit<
  JSX.IntrinsicElements["input"],
  "type" | "onChange"
>;

const Search = ({ onSearch, ...restProps }: Props) => {
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  return (
    <input
      onChange={handleSearch}
      {...restProps}
      type="search"
      className={clsx(s.searchInput, restProps.className)}
    />
  );
};

export { Search };
