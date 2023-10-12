import { useQuery } from "@tanstack/react-query";
import { apiClient } from "..";
import { License, SortDirection } from "./types";
import { LICENSES_QUERY_KEY, SORT_DIRECTIONS, TOTAL_COUNT_HEADER } from "./const";
import { getSortParam } from "./utils";

interface UseLicensesParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  lastSeenGe?: Date;
  lastSeenLe?: Date;
  product?: string[];
}

interface Data {
  licenses: License[];
  total: number;
}

const useLicenses = ({
  pageIndex,
  pageSize,
  search,
  sortBy,
  sortDirection = SORT_DIRECTIONS.DESC,
  lastSeenGe,
  lastSeenLe,
  product,
}: UseLicensesParams = {}) => {
  const firstDate = lastSeenGe ? lastSeenGe.toISOString() : undefined;
  const secondDate = lastSeenLe ? lastSeenLe.toISOString() : undefined;
  const sortParam = getSortParam({ sortBy, sortDirection });

  return useQuery<Data, Error, Data>(
    [
      LICENSES_QUERY_KEY,
      {
        pageIndex,
        pageSize,
        search,
        sortParam,
        firstDate,
        secondDate,
        product,
      },
    ],
    () =>
      apiClient.licensesApi
        .licensesControllerGetLicenses(
          pageIndex,
          pageSize,
          search,
          sortParam,
          firstDate,
          secondDate,
          product
        )
        .then((response) => {
          const total = response.headers[TOTAL_COUNT_HEADER];

          return {
            licenses: response.data,
            total: Number(total),
          };
        }),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
};

export type { SortDirection };
export { useLicenses };
