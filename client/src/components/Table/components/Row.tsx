import { ReactNode } from "react";
import { Cell } from "./Cell";

import s from "./Row.module.css";

const Row = ({
  id,
  isSelected,
  children,
  onChangeSelection,
}: {
  id: string;
  isSelected: boolean;
  children: ReactNode;
  onChangeSelection?: (id: string) => void;
}) => (
  <div key={id} className={s.row}>
    {onChangeSelection && (
      <Cell>
        <input
          id={`${id}_selection`}
          name={`${id}_selection`}
          type="checkbox"
          checked={isSelected}
          onChange={() => onChangeSelection(id)}
        />
      </Cell>
    )}
    <div className={s.rowCells}>{children}</div>
  </div>
);

export { Row };
