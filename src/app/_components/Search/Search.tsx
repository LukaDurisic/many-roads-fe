"use client";
import React, { useState } from "react";
import styles from "./Search.module.css";
import Image from "next/image";
import FilterIcon from "../../assets/filters.svg";
import FilterModal from "../FilterModal/FilterModal";
import Modal from "../Modal/Modal";
import { Route } from "@/app/_types";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function Search({
  routes,
  setRoutes,
  isReload,
  setIsReload,
}: {
  routes?: Route[];
  setRoutes?: React.Dispatch<React.SetStateAction<Route[]>>;
  isReload?: boolean;
  setIsReload?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState("bestmatch");
  const [classification, setClassification] = useState<string[]>([]);
  const [distance, setDistance] = useState(50);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);

  const handleClear = () => {
    setSort("bestmatch");
    setClassification([]);
    setDistance(50);
    setDifficulty([]);
    setRouteType([]);
    setAccessibility([]);
    sessionStorage.clear();
    if (setIsReload) setIsReload(!isReload);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.searchContainer}>
      <Modal
        isOpen={isFilterOpen}
        onClose={() => {
          setIsFilterOpen(false);
          sessionStorage.clear();
          handleClear();
          if (setRoutes && routes) setRoutes(routes);
          if (setIsReload) setIsReload(!isReload);
        }}
      >
        <FilterModal
          routes={routes}
          setRoutes={setRoutes}
          onClose={() => {
            setIsFilterOpen(false);
          }}
          sort={sort}
          setSort={setSort}
          classification={classification}
          setClassification={setClassification}
          distance={distance}
          setDistance={setDistance}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          routeType={routeType}
          setRouteType={setRouteType}
          accessibility={accessibility}
          setAccessibility={setAccessibility}
          handleClear={handleClear}
        />
      </Modal>
      <input
        type="text"
        placeholder={t("findRoutes")}
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
