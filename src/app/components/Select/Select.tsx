import React from "react";
import styles from "./Select.module.css";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  style?: string;
}

const Select: React.FC<SelectProps> = ({ options, style }) => {
  return (
    <select
      className={
        style === "city"
          ? styles.citySelect
          : style === "lang"
          ? styles.langSelect
          : style === "user"
          ? styles.userSelect
          : ""
      }
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={
            style === "city"
              ? styles.cityOption
              : style === "lang"
              ? styles.langOption
              : style === "user"
              ? styles.userOption
              : ""
          }
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
