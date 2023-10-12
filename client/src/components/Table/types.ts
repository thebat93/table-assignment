import { SORT_DIRECTIONS } from "./const";

type Columns<R, K extends string> = Record<
  K,
  {
    label: string;
    renderData: (row: R) => React.ReactNode;
  }
>;

type SortDirection = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export type { Columns, SortDirection };
