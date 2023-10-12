import { ReactNode } from "react";
import clsx from "clsx";
import { FaArrowRightArrowLeft, FaGripLinesVertical } from "react-icons/fa6";
import { Draggable } from "@hello-pangea/dnd";
import { Cell } from "./Cell";

import s from "./HeaderCell.module.css";

const HeaderCell = <K extends string>({
  columnKey,
  index,
  children,
  isSorting,
  setSorting,
  toggleSortDirection,
}: {
  columnKey: K;
  index: number;
  children: ReactNode;
  isSorting: boolean;
  setSorting: (columnKey: K) => void;
  toggleSortDirection: () => void;
}) => (
  <Draggable key={columnKey} draggableId={columnKey} index={index}>
    {(provided) => (
      <Cell
        ref={provided.innerRef}
        className={s.headerCell}
        {...provided.draggableProps}
      >
        <span
          className={clsx(s.label, { [s.sorting]: isSorting })}
          onClick={() => setSorting(columnKey)}
        >
          {children}
        </span>
        {isSorting && (
          <div className={clsx(s.sortIcon, s.icon)}>
            <FaArrowRightArrowLeft onClick={toggleSortDirection} />
          </div>
        )}
        <div
          className={clsx(s.icon, s.handleIcon)}
          {...provided.dragHandleProps}
        >
          <FaGripLinesVertical />
        </div>
      </Cell>
    )}
  </Draggable>
);

export { HeaderCell };
