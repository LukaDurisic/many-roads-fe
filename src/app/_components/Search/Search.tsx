"use client";
import React, { useState } from "react";
import styles from "./Search.module.css";
import Image from "next/image";
import FilterIcon from "../../assets/filters.svg";
import FilterModal from "../FilterModal/FilterModal";
import Modal from "../Modal/Modal";

function Search() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className={styles.searchContainer}>
      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <FilterModal />
      </Modal>
      <input
        type="text"
        placeholder="Find routes..."
        className={styles.searchInput}
      />
      <button
        className={styles.searchButton}
        onClick={() => setIsFilterOpen(true)}
      >
        <Image alt="filters" src={FilterIcon} />
      </button>
    </div>
  );
}

export default Search;
