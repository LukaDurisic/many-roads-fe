"use client";
import React, { useState } from "react";
import styles from "./Filters.module.css";
import Route from "@/app/route/[id]/page";

const filters = [
  "Adventure",
  "Culture",
  "History",
  "Heritage",
  "Architecture",
  "Art & Design",
  "Culinary",
  "Shopping",
  "Leisure",
  "Entertainment",
  "Nature",
  "Ecotourism",
];

function Filters({
  routes,
  setRoutes,
}: {
  routes?: Route[];
  setRoutes?: React.Dispatch<React.SetStateAction<Route[]>>;
}) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((v) => v !== value)
      : [...selectedFilters, value];

    setSelectedFilters(updatedFilters);

    if (routes && setRoutes) {
      if (updatedFilters.length === 0) {
        setRoutes(routes);
      } else {
        setRoutes(
          routes.filter((route) =>
            route.categories.some((tag) => updatedFilters.includes(tag))
          )
        );
      }
    }
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
