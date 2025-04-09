import React from "react";
import styles from "./UserMenu.module.css";
import Image from "next/image";
import BurgerMenuIcon from "../../assets/burgerMenu.svg";
import ProfileIcon from "../../assets/profile.svg";

function UserMenu() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.langSelect}>English</div>
      <div className={styles.userSelect}>
        <Image
          alt="burger menu"
          src={BurgerMenuIcon}
          className={styles.burgerMenuIcon}
        />
        <Image
          alt="profile icon"
          src={ProfileIcon}
          className={styles.profileIcon}
        />
      </div>
    </div>
  );
}

export default UserMenu;
