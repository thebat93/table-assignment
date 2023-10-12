import { ChangeEvent, JSX, useCallback } from "react";

import s from "./Select.module.css";
import clsx from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

type Props = {
  options: SelectOption[];
  onSelect: (optionValue: SelectOption["value"]) => void;
  placeholder?: string;
} & Omit<JSX.IntrinsicElements["select"], "onSelect">;

const Select = ({ options, onSelect, placeholder, ...restProps }: Props) => {
  const handleOnSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onSelect(e.target.value);
    },
    [onSelect]
  );

  return (
    <select
      {...restProps}
      onChange={handleOnSelect}
      className={clsx(s.select, restProps.className)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export type { SelectOption };
export { Select };
