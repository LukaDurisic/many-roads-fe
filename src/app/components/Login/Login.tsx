"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import Button from "@/app/components/Button/Button";
import Image from "next/image";
import ShowIcon from "../../assets/show";
import HideIcon from "../../assets/hide";
import LogoIcon from "../../assets/mrLogo.svg";
import { useRouter } from "next/navigation";
import { userLogIn } from "@/app/_services/client-api-requests";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
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
      const response = await userLogIn(username, password);

      if (response?.data?.non_field_errors?.length > 0) {
        setShowInvalidError(true);
      } else if (
        response.data.access?.length > 0 &&
        response.data.refresh?.length > 0
      ) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        router.push("/dashboard");
      } else {
        console.error("Unexpected login response:", response);
        setShowInvalidError(true);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response?.data?.non_field_errors?.length > 0) {
        setShowInvalidError(true);
      } else {
        setShowInvalidError(true);
      }
    }
  };

  return (
    <>
      <div className={styles.logInIcon}>
        <Image alt="logo" src={LogoIcon} />

        <h1 className={styles.title}>Welcome back!</h1>
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            isFocusedName || username.length > 0
              ? styles.label
              : styles.hiddenLabel
          }
        >
          Email or username
        </label>
        <input
          type="text"
          className={`${styles.input} ${
            showInvalidError || showErrorName ? styles.error : ""
          }`}
          placeholder={isFocusedName ? "" : "Email or username"}
          onChange={(e) => {
            setUsername(e.target.value);
            if (showInvalidError || showErrorName) {
              setShowErrorName(false);
              setShowInvalidError(false);
            }
          }}
          onFocus={() => setIsFocusedName(true)}
          onBlur={() => setIsFocusedName(false)}
        />
        <label
          className={
            isFocused || password.length > 0 ? styles.label : styles.hiddenLabel
          }
        >
          Password
        </label>
        <div
          className={`${styles.passContainer} ${
            isFocused ? styles.focused : ""
          } ${showInvalidError || showErrorPass ? styles.error : ""}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            className={`${styles.input} ${styles.inputPassword}`}
            placeholder={isFocused ? "" : "Password"}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showInvalidError || showErrorPass) {
                setShowErrorPass(false);
                setShowInvalidError(false);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {password.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.showPass}
            >
              {showPassword ? (
                <HideIcon
                  height={22}
                  width={22}
                  stroke={
                    showInvalidError || showErrorPass ? "#C11A1A" : "#9E9E9E"
                  }
                />
              ) : (
                <ShowIcon
                  height={22}
                  width={22}
                  stroke={
                    showInvalidError || showErrorPass ? "#C11A1A" : "#9E9E9E"
                  }
                />
              )}
            </button>
          )}
        </div>
        {showInvalidError && "Error"}
      </div>
      <div className={styles.logInBtn}>
        <Button variant="primary" label={"Log in"} onClick={() => logIn()} />
      </div>
    </>
  );
}

export default Login;
