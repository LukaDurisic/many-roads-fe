"use client";
import React, { useState } from "react";
import styles from "./ForgotPass.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Arrow from "../../assets/arrowRight";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";

function ForgotPass() {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>Forgot password</h1>
      </div>
      <p className={styles.ph}>
        All good. Enter your account’s email address and we’ll send you a link
        to reset your password.
      </p>
      <div className={styles.inputContainer}>
        <label
          className={`
            ${isFocused ? styles.label : styles.hiddenLabel}
            ${isError ? styles.error : ""}
          `}
        >
          Email
        </label>
        <input
          type="text"
          className={`${styles.input} ${isError ? styles.error : ""}`}
          placeholder={isFocused ? "" : "Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <Button
        variant="primary"
        onClick={() => {
          if (email.length <= 0) {
            setIsError(true);
          }
        }}
      >
        {"SEND RESET LINK"}
      </Button>
      <Link href={"/"} className={styles.link}>
        <div style={{ rotate: "180deg", paddingTop: 4 }}>
          <Arrow height={16} width={16} fill="#000" />
        </div>
        Return to Log In
      </Link>
    </div>
  );
}

export default ForgotPass;
