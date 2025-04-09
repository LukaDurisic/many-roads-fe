import React from "react";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";
import Select from "../Select/Select";

const testOptions = [
  { label: "Hong Kong", value: "HongKong" },
  { label: "Zagreb", value: "Zagreb" },
];

function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstRow}>
        <div className={styles.title}>
          <div className={styles.citySelect}>
            <p className={styles.in}>In</p>
            <Select options={testOptions} style={"city"} />
          </div>
          <div className={styles.routes}>250 routes</div>
        </div>

        <UserMenu />
      </div>
      <div className={styles.lastRow}></div>
    </div>
  );
}

export default Header;
