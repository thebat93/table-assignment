import { ReactNode } from "react";
import clsx from "clsx";
import { Cell } from "./Cell";

import s from "./RowCell.module.css";

const RowCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <Cell className={clsx(s.rowCell, className)}>{children}</Cell>;

export { RowCell };
