"use client";
import styles from "./MobileBlockedPage.module.css";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

export default function MobileBlockedPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{t("unsupportedDevice")}</h1>
        <p>{t("unsupportedDesc")}</p>
      </div>
    </div>
  );
}
