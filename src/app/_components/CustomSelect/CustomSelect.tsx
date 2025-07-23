import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";
import ArrowIconCity from "../../assets/arrowDownCity";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.fieldGroupSelect}>
      <label className={styles.labelSelect}>{label}</label>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div
          className={styles.dropdownHeader}
          onClick={() => setIsOpen(!isOpen)}
        >
          {t(value) || t("select")}
          <ArrowIconCity
            fill={"#9E9E9E"}
            height="16"
            width="16"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </div>
        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option)}
              >
                {t(option)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
