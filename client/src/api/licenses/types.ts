import { LicensesDto } from "../generated";
import { SORT_DIRECTIONS } from "./const";

type License = LicensesDto;

type SortDirection = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export type { License, SortDirection };
