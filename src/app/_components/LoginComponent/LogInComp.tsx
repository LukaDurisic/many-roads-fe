"use client";
import React, { useEffect } from "react";
import styles from "./LogInComp.module.css";
import Login from "@/app/_components/Login/Login";
import Registration from "../Registration/Registration";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import ForgotPass from "../ForgotPass/ForgotPass";
import "@/app/_translation/i18n";
import { useTranslation } from "react-i18next";
import i18n from "@/app/_translation/i18n";

interface LogInCompProps {
  formToRender: string;
  selectedLang?: number;
  setSelectedLang?: React.Dispatch<React.SetStateAction<number>>;
  setIsRegFilled?: React.Dispatch<React.SetStateAction<boolean>>;
  setRegAllowed?: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogInComp({
  formToRender,
  selectedLang,
  setSelectedLang,
  setIsRegFilled,
  setRegAllowed,
}: LogInCompProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const browserLang =
      (typeof navigator !== "undefined" && navigator.language.toLowerCase()) ||
      "en";
    let appLang: "en" | "sc" | "tc" = "en";

    if (browserLang.startsWith("zh")) {
      if (
        browserLang.includes("tw") ||
        browserLang.includes("hk") ||
        browserLang.includes("mo")
      ) {
        appLang = "tc";
      } else {
        appLang = "sc";
      }
    } else if (browserLang.startsWith("en")) {
      appLang = "en";
    }

    localStorage.setItem("userLang", appLang);
    i18n.changeLanguage(appLang);
  }, []);
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formWrapper}>
        {formToRender === "logIn" ? (
          <Login />
        ) : formToRender === "registration" ? (
          <Registration setIsRegFilled={setIsRegFilled} />
        ) : formToRender === "lang" ? (
          <SelectLanguage
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            setRegAllowed={setRegAllowed}
          />
        ) : formToRender === "verification" ? (
          <VerifyEmail />
        ) : formToRender === "forgotPass" ? (
          <ForgotPass />
        ) : null}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.text}>{t("makeYourJourney")}</div>
        <div className={styles.text}>{t("travelBy")}</div>
      </div>
    </div>
  );
}

export default LogInComp;
