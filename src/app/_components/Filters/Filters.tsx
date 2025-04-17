"use client";
import React, { useState } from "react";
import styles from "./Filters.module.css";

const filters = ["Nearby", "Architecture", "Art", "History", "Nature", "Shop"];

function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className={styles.wrapper}>
      {filters.map((filter: string, index: number) => (
        <div
          className={`${styles.filter} ${
            selectedFilters.includes(filter) ? styles.filterSelected : ""
          }`}
          onClick={() => toggleFilter(filter)}
          key={index}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}

export default Filters;
