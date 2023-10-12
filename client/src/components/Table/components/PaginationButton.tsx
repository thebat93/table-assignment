import { ReactNode } from "react";
import clsx from "clsx";

import s from "./PaginationButton.module.css";

const PaginationButton = ({
  children,
  className,
  isDisabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(s.button, className)}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export { PaginationButton };
