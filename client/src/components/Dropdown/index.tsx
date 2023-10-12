import { useState, useRef, useEffect, ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa6";

import s from "./Dropdown.module.css";
import { Button } from "../Button";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  label: string;
  align?: "left" | "right";
  className?: string;
}

const Dropdown = ({ children, label, align = "left", className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={clsx(s.dropdown, className)} ref={dropdownRef}>
      <Button onClick={handleDropdownClick} className={s.dropdownButton}>
        <span className={s.dropdownButtonContent}>
          {label} <FaChevronDown />
        </span>
      </Button>
      {isOpen && (
        <div
          className={clsx(s.dropdownOptions, {
            [s.leftAlign]: align === "left",
            [s.rightAlign]: align === "right",
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
