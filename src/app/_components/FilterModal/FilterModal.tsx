"use client";

import React, { useState, useEffect } from "react";
import styles from "./FilterModal.module.css";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { Route } from "@/app/_types";
import { usePathname, useRouter } from "next/navigation";

const cityOptions = [{ value: "Hong Kong SAR", label: "Hong Kong SAR" }];

const filterOptions = [
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

export default function FilterModal({
  routes,
  setRoutes,
  onClose,
  sort,
  setSort,
  classification,
  setClassification,
  distance,
  setDistance,
  difficulty,
  setDifficulty,
  routeType,
  setRouteType,
  accessibility,
  setAccessibility,
  handleClear,
}: {
  routes?: Route[];
  setRoutes?: React.Dispatch<React.SetStateAction<Route[]>>;
  onClose: () => void;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  classification: string[];
  setClassification: React.Dispatch<React.SetStateAction<string[]>>;
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  difficulty: string[];
  setDifficulty: React.Dispatch<React.SetStateAction<string[]>>;
  routeType: string[];
  setRouteType: React.Dispatch<React.SetStateAction<string[]>>;
  accessibility: string[];
  setAccessibility: React.Dispatch<React.SetStateAction<string[]>>;
  handleClear: () => void;
}) {
  const [numOfRoutes, setNumOfRoutes] = useState<number>(routes?.length || 0);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = (
    value: string,
    setter: (newState: string[]) => void,
    state: string[]
  ) => {
    setter(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const filterRoutes = () => {
    if (!routes || !setRoutes) return;

    const newRoutes = routes.filter((route: Route) => {
      const distanceValue = parseFloat(
        route.distance.match(/[\d.]+/)?.[0] || "0"
      );

      const matchesDistance =
        distance !== 50 ? distanceValue > 0 && distanceValue < distance : true;

      const matchesDifficulty =
        difficulty.length > 0 ? difficulty.includes(route.difficulty) : true;

      const matchesType =
        routeType.length > 0 ? routeType.includes(route.type) : true;

      const matchesAccessibility =
        accessibility.length > 0
          ? accessibility.some((acc) => route.accessibility.includes(acc))
          : true;

      const matchesClassification =
        classification.length > 0
          ? route.categories.some((tag) => classification.includes(tag))
          : true;

      return (
        matchesDistance &&
        matchesDifficulty &&
        matchesType &&
        matchesAccessibility &&
        matchesClassification
      );
    });

    setNumOfRoutes(newRoutes.length);
    setFilteredRoutes(newRoutes);
    setRoutes(newRoutes);
  };

  useEffect(() => {
    filterRoutes();
  }, [sort, classification, distance, difficulty, routeType, accessibility]);

  return (
    <div className={styles.modal}>
      <div className={styles.title}>Filter</div>
      <div className={styles.sectionCity}>
        <label className={styles.label}>Country</label>
        <Select options={cityOptions} style="citySmall" />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Sort</label>
        {["Best Match", "Most Popular", "Closest", "Newly Added"].map(
          (label) => {
            const value = label.toLowerCase().replace(" ", "");
            return (
              <div key={value} className={styles.inputItem}>
                <label htmlFor={value} className={styles.option}>
                  {label}
                </label>
                <label className={styles.customRadioContainer}>
                  <input
                    type="radio"
                    name="sort"
                    id={value}
                    checked={sort === value}
                    onChange={() => setSort(value)}
                    className={styles.radioInput}
                  />
                  <span className={styles.customRadio}></span>
                </label>
              </div>
            );
          }
        )}
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Route Classification</label>
        <div>
          {filterOptions.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${
                classification.includes(tag) ? styles.active : ""
              }`}
              onClick={() =>
                handleToggle(tag, setClassification, classification)
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionCity}>
          <label htmlFor="distance" className={styles.label}>
            Distance
          </label>
          <div className={styles.distanceInfo}>{`0 - ${
            distance === 50 ? "50+" : distance
          } km`}</div>
        </div>
        <input
          type="range"
          id="distance"
          min={0}
          max={50}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className={styles.distance}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Difficulty</label>
        {["Easy", "Moderate", "Difficult"].map((level) => (
          <div key={level} className={styles.inputItem}>
            <label htmlFor={level} className={styles.option}>
              {level}
            </label>
            <div
              className={styles.accessOption}
              onClick={() => handleToggle(level, setDifficulty, difficulty)}
            >
              <input
                type="checkbox"
                id={level}
                checked={difficulty.includes(level)}
                onChange={() => {}}
                className={styles.hiddenCheckbox}
              />
              <span
                className={
                  difficulty.includes(level)
                    ? styles.customCheckbox
                    : styles.customCheckboxNot
                }
              >
                {difficulty.includes(level) ? "✔" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Route Type</label>
        {["Linear", "Circular", "Point To Point"].map((type) => (
          <div key={type} className={styles.inputItem}>
            <label htmlFor={type} className={styles.option}>
              {type}
            </label>
            <div
              className={styles.accessOption}
              onClick={() => handleToggle(type, setRouteType, routeType)}
            >
              <input
                type="checkbox"
                id={type}
                checked={routeType.includes(type)}
                onChange={() => {}}
                className={styles.hiddenCheckbox}
              />
              <span
                className={
                  routeType.includes(type)
                    ? styles.customCheckbox
                    : styles.customCheckboxNot
                }
              >
                {routeType.includes(type) ? "✔" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Accessibility</label>
        {["Child", "Pet", "Wheelchair", "Pram-friendly"].map((option) => (
          <div key={option} className={styles.inputItem}>
            <label htmlFor={option} className={styles.option}>
              {option}
            </label>
            <div
              className={styles.accessOption}
              onClick={() =>
                handleToggle(option, setAccessibility, accessibility)
              }
            >
              <input
                type="checkbox"
                id={option}
                checked={accessibility.includes(option)}
                onChange={() => {}}
                className={styles.hiddenCheckbox}
              />
              <span
                className={
                  accessibility.includes(option)
                    ? styles.customCheckbox
                    : styles.customCheckboxNot
                }
              >
                {accessibility.includes(option) ? "✔" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.clear} onClick={handleClear}>
          Clear
        </div>
        <div className={styles.btnContainer}>
          <Button
            label={`Show ${numOfRoutes} routes`}
            onClick={() => {
              if (pathname === "/dashboard") {
                onClose();
              } else {
                sessionStorage.setItem(
                  "filteredRoutes",
                  JSON.stringify(filteredRoutes)
                );
                router.push("/dashboard");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
