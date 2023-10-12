import { ChangeEvent, JSX, useCallback } from "react";

import s from "./DateInput.module.css";
import clsx from "clsx";

type Props = {
  label?: string;
  onSelect: (newDateString: string) => void;
} & Omit<JSX.IntrinsicElements["input"], "type" | "onChange" | "onSelect">;

const DateInput = ({ label, onSelect, ...restProps }: Props) => {
  const handleOnSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e.target.value);
    },
    [onSelect]
  );

  return (
    <label className={s.wrapper}>
      {label}
      <input
        {...restProps}
        onChange={handleOnSelect}
        type="date"
        className={clsx(s.dateInput, restProps.className)}
      />
    </label>
  );
};

export { DateInput };
