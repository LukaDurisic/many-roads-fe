"use client";

import React, { useState } from "react";
import styles from "./Step1.module.css";
import Image from "next/image";
import AddImgIcon from "../../assets/addImage.svg";
import ArrowIconCity from "../../assets/arrowDownCity";
import {
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Route } from "@/app/_types";

const classifications = [
  "History",
  "Adventure",
  "Sports",
  "Entertainment",
  "Culinary",
];
const accessibilities = ["Child", "Pet", "Wheelchair", "Pram-friendly"];

const routeTypeOptions = ["Point To Point", "Loop"];

const countryOptions = ["Hong Kong", "USA", "UK"];

const provinceOptions = ["NA", "Central", "Island"];

const difficultyOptions = ["Hard", "Medium", "Easy"];

const Step1 = ({
  register,
  getValues,
  setValue,
  watch,
}: {
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  setValue: UseFormSetValue<Route>;
  watch: UseFormWatch<Route>;
}) => {
  const selectedClassifications = watch("categories", []);
  const selectedAccessibilities = watch("accessibility", []);

  const toggleClassification = (value: string) => {
    const current = getValues("categories") || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setValue("categories", updated);
  };

  const toggleAccessibility = (value: string) => {
    const current = getValues("accessibility") || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setValue("accessibility", updated);
  };

  const isAudio = watch("isAudio", false);

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
          {...register("name")}
        />

        <label className={styles.labelBold}>Description</label>
        <textarea
          placeholder="Type Here"
          className={styles.textarea}
          maxLength={1000}
          {...register("description")}
        />
        <div className={styles.charCount}>
          {watch("description", "").length} / 1000
        </div>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isAudio}
            className={styles.hiddenCheckbox}
            {...register("isAudio")}
          />
          <span
            className={`${
              isAudio ? styles.customCheckbox : styles.customCheckboxNot
            } ${styles.bigCheckbox}`}
          >
            {isAudio ? "✔" : ""}
          </span>
          Create audio from my description.
        </label>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Route Type</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={watch("type", "")}
              {...register("type")}
            >
              <option key={0} value={""} disabled>
                Select
              </option>
              {routeTypeOptions.map((option, index) => (
                <option value={option} key={index + 1}>
                  {option}
                </option>
              ))}
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
              value={watch("country", "")}
              {...register("country")}
            >
              <option key={0} value={""} disabled>
                Select
              </option>
              {countryOptions.map((option, index) => (
                <option value={option} key={index + 1}>
                  {option}
                </option>
              ))}
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
              value={watch("province", "")}
              {...register("province")}
            >
              <option key={0} value={""} disabled>
                Select
              </option>
              {provinceOptions.map((option, index) => (
                <option value={option} key={index + 1}>
                  {option}
                </option>
              ))}
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
              {...register("duration_est")}
            />
          </div>
        </div>

        <div className={styles.duration}>
          <label className={styles.labelBold}>Total distance</label>
          <input
            type="text"
            placeholder="9999 km"
            className={styles.input}
            {...register("distance")}
          />
        </div>

        <div className={styles.fieldGroupSelect}>
          <label className={styles.labelSelect}>Difficulty</label>
          <div className={styles.selectItem}>
            <select
              className={styles.select}
              value={watch("difficulty", "")}
              {...register("difficulty")}
            >
              <option key={0} value={""} disabled>
                Select
              </option>
              {difficultyOptions.map((option, index) => (
                <option value={option} key={index + 1}>
                  {option}
                </option>
              ))}
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
                checked={selectedAccessibilities.includes(option)}
                onChange={() => toggleAccessibility(option)}
                className={styles.hiddenCheckbox}
              />
              <span
                className={
                  selectedAccessibilities.includes(option)
                    ? styles.customCheckbox
                    : styles.customCheckboxNot
                }
              >
                {selectedAccessibilities.includes(option) ? "✔" : ""}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1;
