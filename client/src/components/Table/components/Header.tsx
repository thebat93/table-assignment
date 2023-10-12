import { ReactNode, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Cell } from "./Cell";

import s from "./Header.module.css";

const reorder = <I,>(list: I[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Header = <K extends string>({
  children,
  order,
  isAllSelected,
  setColumnsOrder,
  onChangeSelectionAll,
}: {
  children: ReactNode;
  isAllSelected: boolean;
  order: K[];
  setColumnsOrder: (order: K[]) => void;
  onChangeSelectionAll?: () => void;
}) => {
  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const newOrder = reorder<K>(
        order,
        result.source.index,
        result.destination.index
      );

      setColumnsOrder(newOrder);
    },
    [order, setColumnsOrder]
  );

  return (
    <div className={s.header}>
      {onChangeSelectionAll && (
        <Cell>
          <input
            name="selection_all"
            type="checkbox"
            checked={isAllSelected}
            onChange={onChangeSelectionAll}
          />
        </Cell>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="heading" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={s.dropArea}
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export { Header };
