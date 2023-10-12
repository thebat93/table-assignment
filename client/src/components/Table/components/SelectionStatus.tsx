import clsx from "clsx";
import s from "./SelectionStatus.module.css";

const SelectionStatus = ({
  selectionCount = 0,
  rowsCount = 0,
  className,
}: {
  selectionCount: number;
  rowsCount: number;
  className?: string;
}) => (
  <div className={clsx(s.selectionInfo, className)}>
    {selectionCount} of {rowsCount} row(s) selected
  </div>
);

export { SelectionStatus };
