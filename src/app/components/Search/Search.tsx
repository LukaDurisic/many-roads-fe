import React from "react";
import styles from "./Search.module.css";
import Image from "next/image";
import FilterIcon from "../../assets/filters.svg";

function Search() {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Find routes..."
        className={styles.searchInput}
      />
      <button className={styles.searchButton}>
        <Image alt="filters" src={FilterIcon} />
      </button>
    </div>
  );
}

export default Search;
