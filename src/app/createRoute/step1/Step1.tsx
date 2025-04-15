"use client";

import React, { useState } from "react";
import styles from "./Step1.module.css";
import Image from "next/image";
import AddImgIcon from "../../assets/addImage.svg";
import ArrowIconCity from "../../assets/arrowDownCity";

const classifications = [
  "History",
  "Adventure",
  "Sports",
  "Entertainment",
  "Culinary",
];
const accessibilities = ["Child", "Pet", "Wheelchair", "Pram-friendly"];

const Step1: React.FC = () => {
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [createAudio, setCreateAudio] = useState(false);
  const [routeType, setRouteType] = useState("Point To Point");
  const [country, setCountry] = useState("Hong Kong");
  const [province, setProvince] = useState("NA");
  const [difficulty, setDifficulty] = useState("Easy");
  const [selectedClassifications, setSelectedClassifications] = useState<
    string[]
  >([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);

  const toggleClassification = (value: string) => {
    setSelectedClassifications((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleAccessibility = (value: string) => {
    setAccessibility((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageUpload}>
          <div className={styles.imageBox}>
            <Image alt="add image icon" src={AddImgIcon} /> Add image
          </div>
        </div>

        <label className={styles.labelBold}>Route Name</label>
        <input
          type="text"
          placeholder="Type Here"
          className={styles.input}
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />

        <label className={styles.label}>Description</label>
        <textarea
          placeholder="Type Here"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
        />
        <div className={styles.charCount}>{description.length} / 1000</div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={createAudio}
            onChange={() => setCreateAudio(!createAudio)}
            className={styles.hiddenCheckbox}
          />
          <span
            className={`${
              createAudio ? styles.customCheckbox : styles.customCheckboxNot
            } ${styles.bigCheckbox}`}
          >
            {createAudio ? "✔" : ""}
          </span>
          Create audio from my description.
        </label>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Route Type</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
            >
              <option>Point To Point</option>
              <option>Loop</option>
            </select>
            <ArrowIconCity
              fill={"#757575"}
              height="16"
              width="16"
              // style={isOpen ? { rotate: " 180deg" } : {}}
            />
          </div>
        </div>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Country</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Hong Kong</option>
              <option>USA</option>
              <option>UK</option>
            </select>
            <ArrowIconCity
              fill={"#757575"}
              height="16"
              width="16"
              // style={isOpen ? { rotate: " 180deg" } : {}}
            />
          </div>
        </div>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Province</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option>NA</option>
              <option>Central</option>
              <option>Island</option>
            </select>
            <ArrowIconCity
              fill={"#757575"}
              height="16"
              width="16"
              // style={isOpen ? { rotate: " 180deg" } : {}}
            />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.duration}>
          <label className={styles.labelBold}>Estimated Duration</label>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="3.75 – 4 hours"
              className={styles.input}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Difficulty</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <ArrowIconCity
              fill={"#757575"}
              height="16"
              width="16"
              // style={isOpen ? { rotate: " 180deg" } : {}}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.labelBold}>Classification</label>
          <div className={styles.tags}>
            {classifications.map((item) => (
              <button
                type="button"
                key={item}
                className={`${styles.tag} ${
                  selectedClassifications.includes(item)
                    ? styles.tagSelected
                    : ""
                }`}
                onClick={() => toggleClassification(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.accessibility}>
          <div className={styles.accessTitle}>Accessibility</div>
          {accessibilities.map((option, index) => (
            <label key={index} className={styles.accessOption}>
              <span className={styles.label}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
              <input
                type="checkbox"
                checked={accessibility.includes(option)}
                onChange={() => toggleAccessibility(option)}
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
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1;
