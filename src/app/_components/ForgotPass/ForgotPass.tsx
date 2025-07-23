"use client";
import React, { useState } from "react";
import styles from "./ForgotPass.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Arrow from "../../assets/arrowRight";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";
import CustomInput from "../CustomInput/CustomInput";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function ForgotPass() {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>{t("forgotPasswordTitle")}</h1>
      </div>
      <p className={styles.ph}>{t("forgotPasswordDescription")}</p>
      <CustomInput
        label={t("email")}
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
        {t("resetLink")}
      </Button>
      <Link href={"/"} className={styles.link}>
        <div style={{ rotate: "180deg", paddingTop: 4 }}>
          <Arrow height={16} width={16} fill="#000" />
        </div>
        {t("returnToLogIn")}
      </Link>
    </div>
  );
}

export default ForgotPass;
