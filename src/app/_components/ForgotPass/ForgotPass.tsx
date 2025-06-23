"use client";
import React, { useState } from "react";
import styles from "./ForgotPass.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Arrow from "../../assets/arrowRight";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";
import CustomInput from "../CustomInput/CustomInput";

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
        All good. Enter your account&apos;s email address and we&apos;ll send
        you a link to reset your password.
      </p>
      <CustomInput
        label="Email"
        value={email}
        onChange={setEmail}
        showError={isError}
      />
      <br />
      <br />
      <Button
        variant="primary"
        onClick={() => {
          if (email.length <= 0) {
            setIsError(true);
          }
        }}
        className={email.length > 0 ? undefined : styles.disabled}
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
