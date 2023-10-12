import { ReactNode } from "react";
import clsx from "clsx";

import { SelectionStatus } from "./components/SelectionStatus";
import { Header } from "./components/Header";
import { Row } from "./components/Row";

import s from "./index.module.css";
import { useTable } from "./hooks/useTable";
import { Columns } from "./types";
import { HeaderCell } from "./components/HeaderCell";
import { PaginationButton } from "./components/PaginationButton";
import { RowCell } from "./components/RowCell";

const Table = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx(s.table, className)}>{children}</div>;

const TableFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx(s.footer, className)}>{children}</div>;

Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.Row = Row;
Table.RowCell = RowCell;
Table.SelectionStatus = SelectionStatus;

TableFooter.PaginationButton = PaginationButton;
TableFooter.SelectionStatus = SelectionStatus;

Table.useTable = useTable;

export type { Columns };
export { Table, TableFooter };
