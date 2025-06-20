"use client";
import React, { useState } from "react";
import styles from "./Registration.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";
import ShowIcon from "../../assets/show";
import HideIcon from "../../assets/hide";
import Tabs from "../Tabs/Tabs";

function Registration({
  setIsRegFilled,
}: {
  setIsRegFilled: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    organisation: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState("traveler");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof registrationData, boolean>>
  >({});

  const travelerFilled =
    selectedTab === "traveler" &&
    registrationData.email &&
    registrationData.firstName &&
    registrationData.lastName &&
    registrationData.password &&
    registrationData.password === registrationData.repeatPassword &&
    registrationData.username;

  const organisationFilled =
    selectedTab === "organisation" &&
    registrationData.email &&
    registrationData.organisation &&
    registrationData.password &&
    registrationData.password === registrationData.repeatPassword &&
    registrationData.username;

  const handleInputChange = (
    field: keyof typeof registrationData,
    value: string
  ) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleFocus = (field: keyof typeof registrationData) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>Create account</h1>
      </div>
      <Tabs
        options={["traveler", "organisation"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isCenter={true}
      />
      {selectedTab === "traveler" ? (
        <>
          <div className={styles.inputContainer}>
            <label
              className={`
            ${
              focusedField === "firstName" || registrationData.firstName
                ? styles.label
                : styles.hiddenLabel
            }
            ${errors.firstName ? styles.error : ""}
          `}
            >
              First Name
            </label>
            <input
              type="text"
              className={`${styles.input} ${
                errors.firstName ? styles.error : ""
              }`}
              placeholder={focusedField === "firstName" ? "" : "First Name"}
              value={registrationData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onFocus={() => handleFocus("firstName")}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.inputContainer}>
            <label
              className={`
            ${
              focusedField === "lastName" || registrationData.lastName
                ? styles.label
                : styles.hiddenLabel
            }
            ${errors.lastName ? styles.error : ""}
          `}
            >
              Last Name
            </label>
            <input
              type="text"
              className={`${styles.input} ${
                errors.lastName ? styles.error : ""
              }`}
              placeholder={focusedField === "lastName" ? "" : "Last Name"}
              value={registrationData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              onFocus={() => handleFocus("lastName")}
              onBlur={handleBlur}
            />
          </div>
        </>
      ) : (
        <div className={styles.inputContainer}>
          <label
            className={`
            ${
              focusedField === "organisation" || registrationData.organisation
                ? styles.label
                : styles.hiddenLabel
            }
            ${errors.organisation ? styles.error : ""}
          `}
          >
            Organisation
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.organisation ? styles.error : ""
            }`}
            placeholder={focusedField === "organisation" ? "" : "Organisation"}
            value={registrationData.organisation}
            onChange={(e) => handleInputChange("organisation", e.target.value)}
            onFocus={() => handleFocus("organisation")}
            onBlur={handleBlur}
          />
        </div>
      )}
      <div className={styles.inputContainer}>
        <label
          className={`
            ${
              focusedField === "username" || registrationData.username
                ? styles.label
                : styles.hiddenLabel
            }
            ${errors.username ? styles.error : ""}
          `}
        >
          Username
        </label>
        <input
          type="text"
          className={`${styles.input} ${errors.username ? styles.error : ""}`}
          placeholder={focusedField === "username" ? "" : "Username"}
          value={registrationData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          onFocus={() => handleFocus("username")}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.inputContainer}>
        <label
          className={`
            ${
              focusedField === "email" || registrationData.email
                ? styles.label
                : styles.hiddenLabel
            }
            ${errors.email ? styles.error : ""}
          `}
        >
          Email
        </label>
        <input
          type="text"
          className={`${styles.input} ${errors.email ? styles.error : ""}`}
          placeholder={focusedField === "email" ? "" : "Email"}
          value={registrationData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.inputContainer}>
        <label
          className={`
      ${
        focusedField === "password" || registrationData.password
          ? styles.label
          : styles.hiddenLabel
      }
      ${errors.password ? styles.error : ""}
    `}
        >
          Password
        </label>
        <div
          className={`${styles.passContainer} 
      ${focusedField === "password" ? styles.focused : ""} 
      ${errors.password ? styles.error : ""}
    `}
        >
          <input
            type={showPassword ? "text" : "password"}
            className={`${styles.input} ${styles.inputPassword} ${
              errors.password ? styles.errorPass : ""
            }`}
            placeholder={focusedField === "password" ? "" : "Password"}
            value={registrationData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onFocus={() => handleFocus("password")}
            onBlur={handleBlur}
          />
          {registrationData.password.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.showPass}
            >
              {showPassword ? (
                <HideIcon
                  height={22}
                  width={22}
                  stroke={errors.password ? "#C11A1A" : "#9E9E9E"}
                />
              ) : (
                <ShowIcon
                  height={22}
                  width={22}
                  stroke={errors.password ? "#C11A1A" : "#9E9E9E"}
                />
              )}
            </button>
          )}
        </div>
      </div>
      {/* Repeat Password */}
      <div className={styles.inputContainer}>
        <label
          className={`
      ${
        focusedField === "repeatPassword" || registrationData.repeatPassword
          ? styles.label
          : styles.hiddenLabel
      }
      ${errors.repeatPassword ? styles.error : ""}
    `}
        >
          Repeat Password
        </label>
        <div
          className={`${styles.passContainer} 
      ${focusedField === "repeatPassword" ? styles.focused : ""} 
      ${errors.repeatPassword ? styles.error : ""}
    `}
        >
          <input
            type={showRepeatPassword ? "text" : "password"}
            className={`${styles.input} ${styles.inputPassword} ${
              errors.repeatPassword ? styles.errorPass : ""
            }`}
            placeholder={
              focusedField === "repeatPassword" ? "" : "Repeat Password"
            }
            value={registrationData.repeatPassword}
            onChange={(e) =>
              handleInputChange("repeatPassword", e.target.value)
            }
            onFocus={() => handleFocus("repeatPassword")}
            onBlur={handleBlur}
          />
          {registrationData.repeatPassword.length > 0 && (
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className={styles.showPass}
            >
              {showRepeatPassword ? (
                <HideIcon
                  height={22}
                  width={22}
                  stroke={errors.repeatPassword ? "#C11A1A" : "#9E9E9E"}
                />
              ) : (
                <ShowIcon
                  height={22}
                  width={22}
                  stroke={errors.repeatPassword ? "#C11A1A" : "#9E9E9E"}
                />
              )}
            </button>
          )}
        </div>
      </div>

      <div className={styles.info}>
        By continuing, you agree to ManyRoads{" "}
        <Link className={styles.link} href={"#"}>
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link className={styles.link} href={"#"}>
          Privacy Policy
        </Link>
      </div>
      <div className={styles.btnContainer}>
        <Button
          variant="primary"
          onClick={() => {
            // const newErrors: typeof errors = {};
            // Object.entries(registrationData).forEach(([key, value]) => {
            //   if (!value)
            //     newErrors[key as keyof typeof registrationData] = true;
            // });
            // setErrors(newErrors);
            if ((travelerFilled || organisationFilled) && setIsRegFilled) {
              setIsRegFilled(true);
            }
          }}
          className={
            !travelerFilled && !organisationFilled ? styles.disabled : undefined
          }
        >
          {"CREATE ACCOUNT"}
        </Button>
      </div>
      <div className={styles.login}>
        <p className={styles.loginP}>Already have account?</p>{" "}
        <Link className={styles.loginLink} href="/">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Registration;
