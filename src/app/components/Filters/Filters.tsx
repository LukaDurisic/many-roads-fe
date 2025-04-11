import React from "react";
import styles from "./Filters.module.css";

const filters = ["Nearby", "Architecture", "Art", "History", "Nature", "Shop"];

function Filters() {
  return (
    <div className={styles.wrapper}>
      {filters.map((filter: string, index: number) => (
        <div className={styles.filter} key={index}>
          {filter}
        </div>
      ))}
    </div>
  );
}

export default Filters;
