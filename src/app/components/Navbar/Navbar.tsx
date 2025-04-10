import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import AddIcon from "../../assets/add.svg";
import SearchIcon from "../../assets/search.svg";

function Navbar() {
  return (
    <div className={styles.wrapper}>
      <Image src={SearchIcon} className={styles.navItem} alt="search icon" />
      <Image src={AddIcon} className={styles.navItem} alt="book icon" />
    </div>
  );
}

export default Navbar;
