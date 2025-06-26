"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import Button from "@/app/_components/Button/Button";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import { useRouter } from "next/navigation";
import { userLogIn } from "@/app/_services/client-api-requests";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import CustomInput from "../CustomInput/CustomInput";
import "@/app/_translation/i18n";
import { useTranslation } from "react-i18next";
function Login() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorPass, setShowErrorPass] = useState(false);
  const [showInvalidError, setShowInvalidError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const logIn = async () => {
    if (username.trim() === "" && password.trim() === "") {
      setShowErrorName(true);
      setShowErrorPass(true);
      return;
    } else if (username.trim() === "") {
      setShowErrorName(true);
      return;
    } else if (password.trim() === "") {
      setShowErrorPass(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await userLogIn(username, password);

      if (response?.data?.non_field_errors?.length > 0) {
        setShowInvalidError(true);
        setIsLoading(false);
      } else if (
        response.data.access?.length > 0 &&
        response.data.refresh?.length > 0
      ) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        console.error("Unexpected login response:", response);
        setShowInvalidError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowInvalidError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.logInIcon}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>{t("welcomeBack")}</h1>
      </div>
      <div className={styles.inpContainer}>
        <CustomInput
          label={t("email")}
          value={username}
          onChange={(val) => {
            setUsername(val);
            setShowErrorName(false);
            setShowInvalidError(false);
          }}
          placeholder={t("email")}
          showError={showErrorName}
          showInvalidError={showInvalidError}
        />
        <CustomInput
          label={t("password")}
          type="password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            setShowErrorPass(false);
            setShowInvalidError(false);
          }}
          placeholder={t("password")}
          showError={showErrorPass}
          showInvalidError={showInvalidError}
        />
      </div>
      <Link className={styles.forgotPass} href="/forgot-password">
        {t("forgotPassword")}
      </Link>
      <div className={styles.logInBtn}>
        <Button variant="primary" onClick={() => logIn()}>
          {isLoading ? <ClipLoader color={"#fff"} size={30} /> : t("logIn")}
        </Button>
      </div>
      <div className={styles.registration}>
        <p className={styles.registrationP}>{t("dontHaveAcc")}</p>{" "}
        <Link className={styles.registrationLink} href="/registration">
          {t("createAcc")}
        </Link>
      </div>
    </>
  );
}

export default Login;
