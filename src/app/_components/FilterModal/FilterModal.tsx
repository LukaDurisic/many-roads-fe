"use client";

import { useState } from "react";
import styles from "./FilterModal.module.css";
import Button from "../Button/Button";
import Select from "../Select/Select";

const cityOptions = [
  { value: "HongKong", label: "Hong Kong" },
  { value: "Zagreb", label: "Zagreb" },
];

export default function FilterModal() {
  const [sort, setSort] = useState("bestmatch");
  const [classification, setClassification] = useState<string[]>([]);
  const [distance, setDistance] = useState(50);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);

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

  const handleClear = () => {
    setSort("bestmatch");
    setClassification([]);
    setDistance(50);
    setDifficulty([]);
    setRouteType([]);
    setAccessibility([]);
  };

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
          {["Nearby", "Architecture", "Art", "History", "Nature", "Shop"].map(
            (tag) => (
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
            )
          )}
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
        {["East", "Moderate", "Difficult"].map((level) => (
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
        {["Circular", "Point To Point"].map((type) => (
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
          <Button label="Show 25 routes" />
        </div>
      </div>
    </div>
  );
}
