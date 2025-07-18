import React, { useState, useRef, useEffect } from "react";
import styles from "./SmallLangSelect.module.css";
import ArrowIcon from "@/app/assets/arrowDown.svg";
import Image from "next/image";

export interface Option {
  name: string;
  id: number;
}

const languageOptions: Option[] = [
  { id: 1, name: "English" },
  { id: 2, name: "繁體中文" },
  { id: 3, name: "简体中文" },
];

function SmallLangSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
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
    <div className={styles.wrapper}>
      <div className={styles.selectLabel}>Select checkpoint language mode</div>
      <div className={styles.selectWrapper} ref={dropdownRef}>
        <div
          className={styles.customSelect}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.selectedText}>
            {selectedOption?.name || "Select"}
          </span>
          <Image
            src={ArrowIcon}
            alt="arrow"
            className={`${styles.selectIconLang} ${
              isOpen ? styles.iconOpen : ""
            }`}
          />
        </div>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {languageOptions.map((option) => (
              <li
                key={option.id}
                className={styles.dropdownItem}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SmallLangSelect;
