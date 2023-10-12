import clsx from "clsx";
import { ReactNode, JSX } from "react";

import s from "./Button.module.css";

const Button = ({
  children,
  className,
  onClick,
  isDisabled,
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: JSX.IntrinsicElements['button']['type'];
}) => (
  <button
    className={clsx(s.button, className)}
    onClick={onClick}
    disabled={isDisabled}
    type={type}
  >
    {children}
  </button>
);

export { Button };
