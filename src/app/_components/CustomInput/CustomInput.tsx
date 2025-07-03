"use client";

import React, { useState } from "react";
import styles from "./CustomInput.module.css";
import ShowIcon from "../../assets/show";
import HideIcon from "../../assets/hide";
import LockIcon from "../../assets/lock.svg";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

interface CustomInputProps {
  label: string;
  type?: "text" | "password";
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
  placeholder?: string;
  showInvalidError?: boolean;
  showLock?: boolean;
  isFullLength?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  showError = false,
  placeholder,
  showInvalidError = false,
  showLock,
  isFullLength = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const labelVisible = isFocused || value.length > 0;
  const hasError = showError || showInvalidError;

  return (
    <div
      className={`${styles.inputContainer} ${
        isFullLength ? styles.fullLenghtContainer : null
      }`}
    >
      <label
        className={`${labelVisible ? styles.label : styles.hiddenLabel} ${
          hasError ? styles.error : ""
        }`}
      >
        {label}
      </label>

      <div
        className={`${
          isPassword || showLock ? styles.passContainer : styles.inputWrapper
        } ${isFocused ? styles.focused : ""} ${hasError ? styles.error : ""}`}
      >
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className={`${styles.input} ${
            isPassword ? styles.inputPassword : ""
          } ${hasError ? styles.error : ""} ${
            hasError && isPassword ? styles.errorPass : ""
          }`}
          value={value}
          placeholder={labelVisible ? "" : placeholder || label}
          onChange={(e) => {
            if (!showLock) {
              onChange(e.target.value);
            }
          }}
          onFocus={() => {
            if (!showLock) {
              setIsFocused(true);
            }
          }}
          readOnly={showLock}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && value.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.showPass}
          >
            {showPassword ? (
              <HideIcon
                height={22}
                width={22}
                stroke={hasError ? "#C11A1A" : "#9E9E9E"}
              />
            ) : (
              <ShowIcon
                height={22}
                width={22}
                stroke={hasError ? "#C11A1A" : "#9E9E9E"}
              />
            )}
          </button>
        )}

        {showLock && (
          <>
            <Image
              src={LockIcon}
              alt="lock"
              height={22}
              width={22}
              className={styles.showPass}
              data-tooltip-id="lock-tooltip"
              data-tooltip-content="This field can not be updated."
            />
            <Tooltip
              id="lock-tooltip"
              place="bottom"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "12px 18px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "16px",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
