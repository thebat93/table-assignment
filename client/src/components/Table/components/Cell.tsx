import { CSSProperties, ReactNode, forwardRef } from "react";
import { DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import clsx from "clsx";

import s from "./Cell.module.css";

type DNDProps = Partial<DraggableProvidedDraggableProps>;

type Props = {
  children: ReactNode;
  width?: number;
  className?: string;
  style?: CSSProperties;
} & DNDProps;

const Cell = forwardRef<HTMLDivElement, Props>(
  ({ children, width, className, style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={clsx(s.cell, className)}
      {...restProps}
      style={{ ...style, width }}
    >
      {children}
    </div>
  )
);

export { Cell };
