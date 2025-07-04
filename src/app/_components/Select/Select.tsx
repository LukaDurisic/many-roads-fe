"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";
import ArrowIconCity from "../../assets/arrowDownCity";
import ArrowIcon from "../../assets/arrowDown.svg";
import Image from "next/image";
import { changeLanguage } from "@/app/_translation/i18n";
import "@/app/_translation/i18n";

export interface Option {
  label: string;
  value: string;
  short?: "en" | "tc" | "sc";
}

interface SelectProps {
  options: Option[];
  style?: "city" | "lang" | "citySmall";
}

const Select: React.FC<SelectProps> = ({ options, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [initialLangValue, setInitialLangValue] = useState(options[0].value);

  useEffect(() => {
    if (typeof window !== "undefined" && style === "lang") {
      const storedLang = localStorage.getItem("userLang");
      const matchedOption = options.find(
        (option) => option.short === storedLang
      );
      if (matchedOption) {
        setInitialLangValue(matchedOption.value);
      }
    }
  }, [options, style]);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.selectWrapper}
      style={style === "city" ? { gap: "15px" } : { gap: "5px" }}
      ref={dropdownRef}
    >
      {style === "city" ? (
        <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.selectedText}>
            {selectedOption ? selectedOption.label : options[0].label}
          </span>
          <ArrowIconCity
            fill={"#0d0d0d"}
            height="24"
            width="24"
            style={isOpen ? { transform: "rotate(180deg)" } : {}}
          />
          {isOpen && (
            <ul className={styles.dropdownList}>
              {options.map((option) => (
                <li
                  key={option.value}
                  className={styles.dropdownItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <select
            className={
              style === "citySmall" ? styles.citySmallSelect : styles.langSelect
            }
            onClick={() => setIsOpen(!isOpen)}
            value={initialLangValue}
            onChange={(e) => {
              const selected = options.find(
                (opt) => opt.value === e.target.value
              );
              if (style === "lang" && selected?.short) {
                changeLanguage(selected.short);
                if (typeof window !== "undefined") {
                  localStorage.setItem("userLang", selected.short);
                }
                setInitialLangValue(selected.value);
              }
            }}
          >
            {style === "citySmall" ? (
              options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles.cityOption}
                  onClick={() => console.log(option.short)}
                >
                  {option.label}
                </option>
              ))
            ) : style === "lang" ? (
              options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles.langOption}
                >
                  {option.label}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          {style === "citySmall" && (
            <ArrowIconCity
              fill={"#757575"}
              height="19"
              width="19"
              style={isOpen ? { transform: "rotate(180deg)" } : {}}
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
        </>
      )}
    </div>
  );
};

export default Select;
