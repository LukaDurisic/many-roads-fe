"use client";
import React, { useState } from "react";
import styles from "./Select.module.css";
import ArrowIconCity from "../../assets/arrowDownCity";
import ArrowIcon from "../../assets/arrowDown.svg";
import Image from "next/image";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  style?: "city" | "lang" | "citySmall";
}

const Select: React.FC<SelectProps> = ({ options, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.selectWrapper}
      style={style === "city" ? { gap: "15px" } : { gap: "5px" }}
    >
      <select
        className={
          style === "city"
            ? styles.citySelect
            : style === "citySmall"
            ? styles.citySmallSelect
            : styles.langSelect
        }
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
        <ArrowIconCity
          fill={"#0d0d0d"}
          height="24"
          width="24"
          style={isOpen ? { rotate: " 180deg" } : {}}
        />
      )}

      {style === "citySmall" && (
        <ArrowIconCity
          fill={"#757575"}
          height="19"
          width="19"
          style={isOpen ? { rotate: " 180deg" } : {}}
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
