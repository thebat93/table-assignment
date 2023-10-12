import { SORT_DIRECTIONS, SORT_DIRECTION_SIGNS } from "./const";
import { SortDirection } from "./types";

const getSortParam = ({
  sortBy,
  sortDirection,
}: {
  sortBy?: string;
  sortDirection: SortDirection;
}) => {
  if (!sortBy) {
    return '';
  }

  const directionSign =
    sortDirection === SORT_DIRECTIONS.DESC
      ? SORT_DIRECTION_SIGNS.DESC
      : SORT_DIRECTION_SIGNS.ASC;

  return `${directionSign}${sortBy}`;
};

export { getSortParam };
