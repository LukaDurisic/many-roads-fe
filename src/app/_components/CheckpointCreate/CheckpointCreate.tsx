"use client";
import React, { useState, useRef } from "react";
import styles from "./CheckpointCreate.module.css";
import Image from "next/image";
import {
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  UseFieldArrayRemove,
  UseFormGetValues,
} from "react-hook-form";
import { Route, AttractionImages, PreviewAttraction } from "@/app/_types";
import TrashIcon from "../../assets/trash.svg";
import InfoIcon from "../../assets/info";
// import LocationIcon from "@/app/assets/location";
import AddImageIcon from "../../assets/addImage.svg";
import Modal from "../Modal/Modal";
import DeleteCheckpointModal from "../DeleteCheckpointModal/DeleteCheckpointModal";
// import LocationInput from "../LocationInput/LocationInput";
import MapboxSearch from "../MapboxSearch/MapboxSearch";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function CheckpointCreate({
  index,
  register,
  watch,
  remove,
  setValue,
  getValues,
  setAttractionImages,
  previewAttractions,
  setPreviewAttractions,
}: {
  index: number;
  register: UseFormRegister<Route>;
  watch: UseFormWatch<Route>;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Route>;
  getValues: UseFormGetValues<Route>;
  setAttractionImages: React.Dispatch<React.SetStateAction<AttractionImages[]>>;
  previewAttractions: PreviewAttraction | undefined;
  setPreviewAttractions: React.Dispatch<
    React.SetStateAction<PreviewAttraction[]>
  >;
}) {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroImageBoxClick = () => {
    heroFileInputRef.current?.click();
  };

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  console.log(getValues());

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewAttractions((prev) => {
        const updated = [...prev];
        const foundIndex = updated.findIndex((item) => item.index === index);

        if (foundIndex !== -1) {
          const combinedImages = [
            ...updated[foundIndex].images,
            ...newPreviews,
          ].slice(0, 10);

          updated[foundIndex] = {
            ...updated[foundIndex],
            images: combinedImages,
          };
        } else {
          updated.push({
            index,
            heroImage: "",
            images: newPreviews.slice(0, 10),
          });
        }

        return updated;
      });
      setAttractionImages((prev) => {
        const existing = [...prev];

        const foundIndex = existing.findIndex(
          (item) => item.attractionIndex === index
        );

        if (foundIndex !== -1) {
          const updatedImages = [
            ...existing[foundIndex].images,
            ...fileArray,
          ].slice(0, 10);

          existing[foundIndex] = {
            ...existing[foundIndex],
            images: updatedImages,
          };
        } else {
          existing.push({
            attractionIndex: index,
            heroImage: undefined,
            images: fileArray.slice(0, 10),
          });
        }

        return existing;
      });
    }
  };

  const handleHeroImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const heroFile = files[0];
      const newPreview = URL.createObjectURL(heroFile);

      setPreviewAttractions((prev) => {
        const updated = [...prev];
        const foundIndex = updated.findIndex((item) => item.index === index);

        if (foundIndex !== -1) {
          updated[foundIndex] = {
            ...updated[foundIndex],
            heroImage: newPreview,
          };
        } else {
          updated.push({
            index,
            heroImage: newPreview,
            images: [],
          });
        }

        return updated;
      });

      setAttractionImages((prev) => {
        const existing = [...prev];
        const foundIndex = existing.findIndex(
          (item) => item.attractionIndex === index
        );

        if (foundIndex !== -1) {
          existing[foundIndex] = {
            ...existing[foundIndex],
            heroImage: heroFile,
          };
        } else {
          existing.push({
            attractionIndex: index,
            heroImage: heroFile,
            images: [],
          });
        }

        return existing;
      });
    }
  };

  const handleImageDelete = (imgIndex: number) => {
    setPreviewAttractions((prev) => {
      const updated = [...prev];
      const foundIndex = updated.findIndex((item) => item.index === index);

      if (foundIndex !== -1) {
        const newImages = updated[foundIndex].images.filter(
          (_, i) => i !== imgIndex
        );
        updated[foundIndex] = {
          ...updated[foundIndex],
          images: newImages,
        };
      }

      return updated;
    });
  };

  const handleHeroImageDelete = () => {
    setPreviewAttractions((prev) => {
      const updated = [...prev];
      const foundIndex = updated.findIndex((item) => item.index === index);

      if (foundIndex !== -1) {
        updated[foundIndex] = {
          ...updated[foundIndex],
          heroImage: "",
        };
      }

      return updated;
    });
  };

  return (
    <>
      <div>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
        >
          <DeleteCheckpointModal
            remove={() => remove(index)}
            close={() => setIsDeleteModalOpen(false)}
          />
        </Modal>
        <div className={styles.inputGroup}>
          <div className={styles.checkpointNumber}>{index + 1}</div>
          <input
            className={styles.input}
            placeholder={t("typeName")}
            {...register(`attractions.${index}.name`)}
          />
          <Image
            src={TrashIcon}
            alt="Trash"
            className={styles.deleteIcon}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
        <div className={styles.inputGroup}>
          {/* <span className={styles.icon}>
            <LocationIcon height={22} width={24} fill="#757575" />
          </span> */}
          {/* <LocationInput
            setValue={setValue}
            getValues={getValues}
            index={index}
          /> */}
          <MapboxSearch watch={watch} setValue={setValue} />
        </div>
      </div>
      <div className={styles.imageUpload}>
        <div className={styles.imageGrid}>
          {previewAttractions?.heroImage && (
            <div
              key={index}
              className={styles.imageBox}
              onClick={() => handleHeroImageDelete()}
            >
              <Image
                src={previewAttractions?.heroImage}
                alt={`uploaded preview ${index}`}
                width={300}
                height={200}
                className={styles.previewImage}
              />
            </div>
          )}
          {!previewAttractions?.heroImage && (
            <div
              className={`${styles.imageBox} ${styles.noAfter}`}
              onClick={handleHeroImageBoxClick}
            >
              <Image src={AddImageIcon} alt="add image" /> {t("introImage")}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                ref={heroFileInputRef}
                onChange={handleHeroImageUpload}
              />
            </div>
          )}{" "}
        </div>
        <div className={styles.imageNote}>
          <InfoIcon height={35} width={35} stroke="#CCCCCC" />{" "}
          {t("introImgDesc")}
        </div>
      </div>
      <div className={styles.descriptionBox}>
        <label className={styles.descTitle}>{t("writeDescription")}</label>
        <textarea
          placeholder={t("typeHere")}
          className={styles.textarea}
          {...register(`attractions.${index}.content`)}
          maxLength={1000}
        />
        <div className={styles.charCount}>
          {watch(`attractions.${index}.content`).length} / 1000
        </div>
      </div>

      {/* <label className={styles.checkbox}>
        <input
          type="checkbox"
          {...register(`attractions.${index}.needs_upload`)}
          className={styles.hiddenCheckbox}
        />
        vjv treba promjenit prop checkpointa al za sad ok
        <span
          className={`${
            watch(`attractions.${index}.needs_upload`, false)
              ? styles.customCheckbox
              : styles.customCheckboxNot
          } ${styles.bigCheckbox}`}
        >
          {watch(`attractions.${index}.needs_upload`, false) ? "✔" : ""}
        </span>
        Create audio from my description.
      </label> */}
      <div className={styles.galleryBox}>
        <div className={styles.descTitle}>{t("gallery")}</div>
        <div className={styles.galleryImageUpload}>
          <div className={styles.galleryImageGrid}>
            {previewAttractions?.images.map((preview, index) => (
              <div
                key={index}
                className={styles.imageBoxGallery}
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
            {previewAttractions && previewAttractions?.images?.length < 10 && (
              <div
                className={`${styles.imageBoxGallery} ${styles.noAfter}`}
                onClick={handleImageBoxClick}
              >
                <Image src={AddImageIcon} alt="add image" />
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
            )}{" "}
          </div>
        </div>
        {/* <div className={styles.imageDescriptionBox}>
          <label className={styles.descTitle}>Image 1 description</label>
          <textarea
            placeholder="Type Here"
            className={styles.textarea}
            // value={imageDescription}
            // onChange={(e) => setImageDescription(e.target.value)}
            maxLength={100}
          />
          <div className={styles.charCount}>
             {imageDescription.length} / 100 }
          </div>
        </div>
         */}
      </div>
    </>
  );
}

export default CheckpointCreate;
