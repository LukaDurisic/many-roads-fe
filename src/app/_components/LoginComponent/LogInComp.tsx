"use client";
import React from "react";
import styles from "./LogInComp.module.css";
import Login from "@/app/_components/Login/Login";
import Registration from "../Registration/Registration";
import SelectLanguage from "../SelectLanguage/SelectLanguage";
import VerifyEmail from "../VerifyEmail/VerifyEmail";
import ForgotPass from "../ForgotPass/ForgotPass";
import "@/app/_translation/i18n";
import { useTranslation } from "react-i18next";

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
