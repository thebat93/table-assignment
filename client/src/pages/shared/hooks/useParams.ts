import {
  PRODUCTS_ENUM,
  SORT_DIRECTIONS,
  SORT_DIRECTION_SIGNS,
} from "../../../api/licenses/const";
import { License, SortDirection } from "../../../api/licenses/types";
import { isValidKey, useQueryParams } from "../../../hooks/useQueryParams";

type QueryParam =
  | "pageIndex"
  | "pageSize"
  | "sortBy"
  | "product"
  | "lastSeenGe"
  | "lastSeenLe"
  | "search";

const LICENSE_FIELDS: Array<keyof License> = [
  "id",
  "product",
  "lastSeen",
  "assignedTo",
];
const PRODUCTS_LIST = Object.values(PRODUCTS_ENUM);

const QUERY_PARAMS: QueryParam[] = [
  "pageIndex",
  "pageSize",
  "sortBy",
  "search",
  "product",
  "lastSeenGe",
  "lastSeenLe",
];

const defaultParams = {
  pageIndex: "0",
  pageSize: "5",
  search: "",
  product: "",
  lastSeenGe: "",
  lastSeenLe: "",
};

const transformToNumber = (value: unknown): number | undefined => {
  const number = Number(value);

  if (Number.isInteger(number) && number >= 0) {
    return number;
  }

  return undefined;
};

const parseSortParam = (
  sortParam?: string
): { field?: keyof License; sortDirection?: SortDirection } => {
  if (!sortParam) {
    return {
      field: undefined,
      sortDirection: undefined,
    };
  }

  let sortDirection = undefined;

  if (sortParam.startsWith(SORT_DIRECTION_SIGNS.ASC)) {
    sortDirection = SORT_DIRECTIONS.ASC;
  }

  if (sortParam.startsWith(SORT_DIRECTION_SIGNS.DESC)) {
    sortDirection = SORT_DIRECTIONS.DESC;
  }

  const sortBy = sortParam.slice(1);

  return {
    field: isValidKey(sortBy, LICENSE_FIELDS) ? sortBy : undefined,
    sortDirection,
  };
};

const parseDateParam = (dateParam?: string) => {
  if (!dateParam) {
    return undefined;
  }

  const timestamp = Date.parse(dateParam);

  if (Number.isNaN(timestamp)) {
    return undefined;
  } else {
    return dateParam;
  }
};

const useParams = () => {
  const { params, setParams } = useQueryParams<QueryParam>(
    QUERY_PARAMS,
    defaultParams
  );

  return {
    setParams,
    params: {
      product: isValidKey(params.product, PRODUCTS_LIST) ? params.product : "",
      lastSeenGe: parseDateParam(params.lastSeenGe) ?? "",
      lastSeenLe: parseDateParam(params.lastSeenLe) ?? "",
      search: params.search,
      pageIndex: transformToNumber(params.pageIndex),
      pageSize: transformToNumber(params.pageSize),
      sortBy: parseSortParam(params.sortBy),
    },
  };
};

export { useParams, parseDateParam, parseSortParam, transformToNumber };
