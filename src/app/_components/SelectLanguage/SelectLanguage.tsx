import React from "react";
import styles from "./SelectLanguage.module.css";
import Image from "next/image";
import LogoIcon from "../../assets/mrLogo.svg";
import Button from "@/app/_components/Button/Button";

function SelectLanguage({
  setIsLangSelected,
}: {
  setIsLangSelected: React.Dispatch<React.SetStateAction<boolean>> | undefined;
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

  return (
    <div>
      <div className={styles.mrLogo}>
        <Image alt="logo" src={LogoIcon} />
        <h1 className={styles.title}>Choose your language</h1>
      </div>
      <div className={styles.langContainer}>
        {languages.map((lang) => (
          <div className={styles.langItem} key={lang.id}>
            {lang.name}
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        onClick={() => {
          if (setIsLangSelected) {
            setIsLangSelected(true);
          }
        }}
      >
        {"CONTINUE"}
      </Button>
    </div>
  );
}

export default SelectLanguage;
