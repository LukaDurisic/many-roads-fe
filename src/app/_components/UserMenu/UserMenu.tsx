"use client";
import React, { useState } from "react";
import styles from "./UserMenu.module.css";
import Image from "next/image";
import BurgerMenuIcon from "../../assets/burgerMenu.svg";
import ProfileIcon from "../../assets/profile.svg";
import Select, { Option } from "../Select/Select";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

const languageOptions: Option[] = [
  {
    label: "English",
    value: "Eng",
    short: "en",
  },
  {
    label: "繁體中文",
    value: "traditional",
    short: "tc",
  },
  {
    label: "简体中文",
    value: "simplified",
    short: "sc",
  },
];

const userOptions = [
  {
    label: "My profile",
    value: "myProfile",
    route: "/my-profile",
  },
  {
    label: "Settings",
    value: "settings",
    route: "/settings",
  },
  {
    label: "Log out",
    value: "logOut",
    route: "/",
  },
];

function UserMenu() {
  const { t } = useTranslation();
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.langSelect}>
        <Select options={languageOptions} style="lang" />
      </div>

      <div className={styles.userSelect}>
        <Image
          alt="burger menu"
          src={BurgerMenuIcon}
          className={styles.burgerMenuIcon}
          onClick={() => setIsUserOpen(!isUserOpen)}
        />
        <Image
          alt="profile icon"
          src={ProfileIcon}
          className={styles.profileIcon}
        />
        {isUserOpen && (
          <div className={styles.optionsDiv}>
            {userOptions.map((option, index) => (
              <Link href={option.route} key={index}>
                <div
                  className={styles.userOption}
                  key={option.value}
                  onClick={() => {
                    if (option.value === "logOut") {
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                    }
                  }}
                >
                  {t(option.value)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
