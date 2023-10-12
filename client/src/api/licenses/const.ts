import { LicensesDtoProductEnum } from "../generated";

const TOTAL_COUNT_HEADER = "x-total-count";

const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

const SORT_DIRECTION_SIGNS = {
  ASC: "+",
  DESC: "-",
};

const LICENSES_QUERY_KEY = "licenses";

const PRODUCTS_ENUM = LicensesDtoProductEnum;

export {
  TOTAL_COUNT_HEADER,
  SORT_DIRECTIONS,
  LICENSES_QUERY_KEY,
  PRODUCTS_ENUM,
  SORT_DIRECTION_SIGNS,
};
