import React from "react";
import styles from "./VerifyEmail.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function VerifyEmail() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {/* One Last Step!
        <br />
        Verify Your Email */}
        {t("checkEmail")}
      </h1>
      <br />
      <br />
      <p className={styles.ph}>{t("verificationDescription")}</p>
      <br />
      <p className={styles.ph}>
        {/* Didn&apos;t get the email? Check your spam folder or{" "} */}
        <Link className={styles.link} href={"#"}>
          {t("resendEmail")}
        </Link>
      </p>
    </div>
  );
}

export default VerifyEmail;
