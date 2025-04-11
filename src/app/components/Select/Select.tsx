"use client";
import React, { use, useState } from "react";
import styles from "./Select.module.css";
import ArrowIconCity from "../../assets/arrowDownCity.svg";
import ArrowIcon from "../../assets/arrowDown.svg";
import Image from "next/image";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  style?: "city" | "lang";
}

const Select: React.FC<SelectProps> = ({ options, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.selectWrapper}
      style={style === "city" ? { gap: "15px" } : { gap: "5px" }}
    >
      <select
        className={style === "city" ? styles.citySelect : styles.langSelect}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={style === "city" ? styles.cityOption : styles.langOption}
          >
            {option.label}
          </option>
        ))}
      </select>
      {style === "city" && (
        <Image
          src={ArrowIconCity}
          alt="arrow"
          className={`${styles.selectIconCity} ${
            isOpen ? styles.iconOpen : ""
          }`}
        />
      )}
      {style === "lang" && (
        <Image
          src={ArrowIcon}
          alt="arrow"
          className={`${styles.selectIconLang} ${
            isOpen ? styles.iconOpen : ""
          }`}
        />
      )}
    </div>
  );
};

export default Select;
