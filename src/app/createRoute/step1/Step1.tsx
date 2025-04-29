"use client";

import React, { useState, useRef } from "react";
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

const difficultyOptions = ["Easy", "Moderate", "Difficult"];

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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [routeName, setRouteName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 10));
    }
  };

  const handleImageDelete = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageUpload}>
          <div className={styles.imageGrid}>
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className={styles.imageBox}
                onClick={() => handleImageDelete(index)}
              >
                <Image
                  src={preview}
                  alt={`uploaded preview ${index}`}
                  width={300}
                  height={200}
                  className={styles.previewImage}
                />
              </div>
            ))}

            {imagePreviews.length < 10 && (
              <div
                className={`${styles.imageBox} ${styles.noAfter}`}
                onClick={handleImageBoxClick}
              >
                <div className={styles.addImageBox}>
                  <Image alt="add image icon" src={AddImgIcon} />
                  Add image
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>

        <label className={routeName === "" ? styles.hidden : styles.labelBold}>
          Route Name
        </label>
        <input
          type="text"
          placeholder="Route Name"
          className={styles.input}
          {...register("name")}
          onChange={(e) => setRouteName(e.target.value)}
        />

        <label className={duration === "" ? styles.hidden : styles.labelBold}>
          Estimated Duration
        </label>
        <input
          type="text"
          placeholder="Estimated Duration"
          className={styles.input}
          {...register("duration_est")}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label className={distance === "" ? styles.hidden : styles.labelBold}>
          Total distance
        </label>
        <input
          type="text"
          placeholder="Total distance"
          className={styles.input}
          {...register("distance")}
          onChange={(e) => setDistance(e.target.value)}
        />

        <label
          className={description === "" ? styles.hidden : styles.labelBold}
        >
          Description
        </label>
        <textarea
          placeholder="Description"
          className={styles.textarea}
          maxLength={1000}
          {...register("description")}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.charCount}>
          {watch("description", "").length} / 1000
        </div>
        {/* <label className={styles.checkbox}>
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
        </label> */}
      </div>

      <div className={styles.right}>
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
      </div>
    </div>
  );
};

export default Step1;
