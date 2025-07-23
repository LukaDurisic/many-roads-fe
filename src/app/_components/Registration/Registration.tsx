"use client";
import React, { useState } from "react";
import styles from "./Registration.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Button from "@/app/_components/Button/Button";
import Link from "next/link";
import Tabs from "../Tabs/Tabs";
import CustomInput from "@/app/_components/CustomInput/CustomInput";
import { useTranslation, Trans } from "react-i18next";
import "@/app/_translation/i18n";

function Registration({
  setIsRegFilled,
}: {
  setIsRegFilled: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const { t } = useTranslation();
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    organisation: "",
    repeatPassword: "",
  });

  const [selectedTab, setSelectedTab] = useState("traveler");
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof registrationData, boolean>>
  >({});

  const handleInputChange = (
    field: keyof typeof registrationData,
    value: string
  ) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

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

  return (
    <div>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>{t("createAcc")}</h1>
      </div>
      <Tabs
        options={["traveler", "organisation"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isCenter={true}
      />
      {selectedTab === "traveler" ? (
        <>
          <CustomInput
            label={t("firstName")}
            value={registrationData.firstName}
            onChange={(val) => handleInputChange("firstName", val)}
            showError={!!errors.firstName}
          />
          <CustomInput
            label={t("lastName")}
            value={registrationData.lastName}
            onChange={(val) => handleInputChange("lastName", val)}
            showError={!!errors.lastName}
          />
        </>
      ) : (
        <CustomInput
          label={t("organisation")}
          value={registrationData.organisation}
          onChange={(val) => handleInputChange("organisation", val)}
          showError={!!errors.organisation}
        />
      )}

      <CustomInput
        label={t("username")}
        value={registrationData.username}
        onChange={(val) => handleInputChange("username", val)}
        showError={!!errors.username}
      />

      <CustomInput
        label={t("email")}
        value={registrationData.email}
        onChange={(val) => handleInputChange("email", val)}
        showError={!!errors.email}
      />
      <div className={styles.passContainer}>
        <CustomInput
          label={t("password")}
          type={"password"}
          value={registrationData.password}
          onChange={(val) => handleInputChange("password", val)}
          showError={!!errors.password}
        />
      </div>
      <div className={styles.passContainer}>
        <CustomInput
          label={t("repeatPassword")}
          type={"password"}
          value={registrationData.repeatPassword}
          onChange={(val) => handleInputChange("repeatPassword", val)}
          showError={!!errors.repeatPassword}
        />
      </div>

      <div className={styles.info}>
        <Trans
          i18nKey="agreeWTermsAndPrivacy"
          components={[
            <Link key={"terms"} className={styles.link} href="#" />,
            <Link key={"privacy"} className={styles.link} href="#" />,
          ]}
        />
      </div>

      <div className={styles.btnContainer}>
        <Button
          variant="primary"
          onClick={() => {
            if ((travelerFilled || organisationFilled) && setIsRegFilled) {
              setIsRegFilled(true);
            }
          }}
          className={
            !travelerFilled && !organisationFilled ? styles.disabled : undefined
          }
        >
          {t("createAcc")}
        </Button>
      </div>

      <div className={styles.login}>
        <p className={styles.loginP}>{t("haveAcc")}</p>
        <Link className={styles.loginLink} href="/">
          {t("logIn")}
        </Link>
      </div>
    </div>
  );
}

export default Registration;
