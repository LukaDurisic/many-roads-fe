"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Step1.module.css";
import Image from "next/image";
import AddImgIcon from "../../assets/addImage.svg";
import {
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Route } from "@/app/_types";
import CustomDropdown from "@/app/_components/CustomSelect/CustomSelect";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

const classifications = [
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
const accessibilities = ["Child", "Pet", "Wheelchair", "Pram-friendly"];

const routeTypeOptions = ["Point To Point", "Circular"];

const countryOptions = ["Hong Kong SAR"];

const provinceOptions = ["North", "Central", "West"];

const difficultyOptions = ["Easy", "Moderate", "Difficult"];

const Step1 = ({
  register,
  getValues,
  setValue,
  watch,
  setRouteImages,
  previewRoute,
  setPreviewRoute,
  setIsAllowed,
}: {
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  setValue: UseFormSetValue<Route>;
  watch: UseFormWatch<Route>;
  setRouteImages: React.Dispatch<React.SetStateAction<File[]>>;
  previewRoute: string[];
  setPreviewRoute: React.Dispatch<React.SetStateAction<string[]>>;
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const [routeName, setRouteName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const watchFields = watch([
    "categories",
    "country",
    "description",
    "difficulty",
    "distance",
    "duration_est",
    "name",
    "province",
    "type",
  ]);

  useEffect(() => {
    const [
      categories,
      country,
      description,
      difficulty,
      distance,
      duration_est,
      name,
      province,
      type,
    ] = watchFields;

    const isAllowed =
      categories.length > 0 &&
      country.length > 0 &&
      description.length > 0 &&
      difficulty.length > 0 &&
      distance.length > 0 &&
      duration_est.length > 0 &&
      name.length > 0 &&
      province.length > 0 &&
      type.length > 0 &&
      previewRoute.length > 0;

    setIsAllowed(isAllowed);
  }, [watchFields, previewRoute]);

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

  // const isAudio = watch("isAudio", false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

      setPreviewRoute((prev) => [...prev, ...newPreviews].slice(0, 10));
      setRouteImages((prev) => [...prev, ...fileArray].slice(0, 10));
    }
  };

  const handleImageDelete = (index: number) => {
    setPreviewRoute((prev) => prev.filter((_, i) => i !== index));
    setRouteImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageUpload}>
          <div className={styles.imageGrid}>
            {previewRoute.map((preview, index) => (
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

            {previewRoute.length < 10 && (
              <div
                className={`${styles.imageBox} ${styles.noAfter}`}
                onClick={handleImageBoxClick}
              >
                <div className={styles.addImageBox}>
                  <Image alt="add image icon" src={AddImgIcon} />
                  {t("addImage")}
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
          {t("routeName")}
        </label>
        <input
          type="text"
          placeholder={t("routeName")}
          className={styles.input}
          {...register("name")}
          onChange={(e) => setRouteName(e.target.value)}
        />

        <label className={duration === "" ? styles.hidden : styles.labelBold}>
          {t("estimatedDuration")}
        </label>
        <input
          type="text"
          placeholder={t("estimatedDuration")}
          className={styles.input}
          {...register("duration_est")}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label className={distance === "" ? styles.hidden : styles.labelBold}>
          {t("totalDistance")}
        </label>
        <input
          type="text"
          placeholder={t("totalDistance")}
          className={styles.input}
          {...register("distance")}
          onChange={(e) => setDistance(e.target.value)}
        />

        <label
          className={description === "" ? styles.hidden : styles.labelBold}
        >
          {t("description")}
        </label>
        <textarea
          placeholder={t("description")}
          className={styles.textarea}
          maxLength={1000}
          {...register("description")}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.charCount}>{description.length} / 1000</div>
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
          <label className={styles.labelBold}>{t("classifications")}</label>
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
                {t(item)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.accessibility}>
          <div className={styles.accessTitle}>{t("accessibility")}</div>
          {accessibilities.map((option, index) => (
            <label key={index} className={styles.accessOption}>
              <span className={styles.label}>{t(option)}</span>
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
        <CustomDropdown
          label={t("routeType")}
          options={routeTypeOptions}
          value={watch("type")}
          onChange={(val) => setValue("type", val)}
        />

        <CustomDropdown
          label={t("country")}
          options={countryOptions}
          value={watch("country")}
          onChange={(val) => setValue("country", val)}
        />

        <CustomDropdown
          label={t("province")}
          options={provinceOptions}
          value={watch("province")}
          onChange={(val) => setValue("province", val)}
        />

        <CustomDropdown
          label={t("difficulty")}
          options={difficultyOptions}
          value={watch("difficulty")}
          onChange={(val) => setValue("difficulty", val)}
        />
      </div>
    </div>
  );
};

export default Step1;
