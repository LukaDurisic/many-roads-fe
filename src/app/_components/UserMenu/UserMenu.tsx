"use client";
import React, { useState } from "react";
import styles from "./UserMenu.module.css";
import Image from "next/image";
import BurgerMenuIcon from "../../assets/burgerMenu.svg";
import ProfileIcon from "../../assets/profile.svg";
// import Select from "../Select/Select";
import Link from "next/link";

// const languageOptions = [
//   {
//     label: "English",
//     value: "Eng",
//   },
//   {
//     label: "繁體中文",
//     value: "traditional",
//   },
//   {
//     label: "简体中文",
//     value: "simplified",
//   },
// ];

const userOptions = [
  {
    label: "Log out",
    value: "logOut",
    route: "/",
  },
  // {
  //   label: "Log out",
  //   value: "logOut",
  // route:"/"
  // },
  // {
  //   label: "Log out",
  //   value: "logOut",
  // route:"/"
  // },
];

function UserMenu() {
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.langSelect}>
        <Select options={languageOptions} style="lang" />
      </div> */}
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
                  {option.label}
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
