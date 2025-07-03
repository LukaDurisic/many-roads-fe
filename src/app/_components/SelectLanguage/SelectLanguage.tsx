import React, { useTransition } from "react";
import styles from "./SelectLanguage.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Button from "@/app/_components/Button/Button";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function SelectLanguage({
  selectedLang,
  setSelectedLang,
  setRegAllowed,
}: {
  selectedLang: number | undefined;
  setSelectedLang: React.Dispatch<React.SetStateAction<number>> | undefined;
  setRegAllowed: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const languages = [
    {
      id: 1,
      name: "English",
    },
    {
      id: 2,
      name: "繁體中文",
    },
    {
      id: 3,
      name: "简体中文",
    },
  ];

  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>{t("selectLanguage")}</h1>
      </div>
      <div className={styles.langContainer}>
        {languages.map((lang) => (
          <div
            className={`${styles.langItem} ${
              selectedLang === lang.id ? styles.selectedLang : null
            }`}
            key={lang.id}
            onClick={() => {
              if (setSelectedLang) {
                setSelectedLang(lang.id);
              }
            }}
          >
            {lang.name}
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        onClick={() => {
          if (selectedLang !== 0 && setRegAllowed) {
            setRegAllowed(true);
          }
        }}
        className={selectedLang === 0 ? styles.disabled : undefined}
      >
        {t("continue")}
      </Button>
    </div>
  );
}

export default SelectLanguage;
