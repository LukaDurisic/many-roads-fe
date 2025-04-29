"use client";
import React, { useState, useRef } from "react";
import styles from "./CheckpointCreate.module.css";
import Image from "next/image";
import {
  UseFormWatch,
  UseFormRegister,
  UseFormGetValues,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Route, AttractionImages } from "@/app/_types";
import TrashIcon from "../../assets/trash.svg";
import InfoIcon from "../../assets/info";
import LocationIcon from "@/app/assets/location";
import AddImageIcon from "../../assets/addImage.svg";
import Modal from "../Modal/Modal";
import DeleteCheckpointModal from "../DeleteCheckpointModal/DeleteCheckpointModal";

function CheckpointCreate({
  index,
  register,
  getValues,
  watch,
  remove,
  setAttractionImages,
}: {
  index: number;
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  watch: UseFormWatch<Route>;
  remove: UseFieldArrayRemove;
  setAttractionImages: React.Dispatch<React.SetStateAction<AttractionImages[]>>;
}) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [heroImagePreviews, setHeroImagePreviews] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(getValues);

  const handleHeroImageBoxClick = () => {
    heroFileInputRef.current?.click();
  };

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 10));

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
      setHeroImagePreviews([newPreview]);

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

  const handleImageDelete = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHeroImageDelete = (index: number) => {
    setHeroImagePreviews((prev) => prev.filter((_, i) => i !== index));
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
            placeholder="Type Name Here"
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
          <span className={styles.icon}>
            <LocationIcon height={22} width={24} fill="#757575" />
          </span>
          <input
            className={styles.input}
            placeholder="Address"
            {...register(`attractions.${index}.address`)}
          />
        </div>
      </div>
      <div className={styles.imageUpload}>
        <div className={styles.imageGrid}>
          {heroImagePreviews.map((preview, index) => (
            <div
              key={index}
              className={styles.imageBox}
              onClick={() => handleHeroImageDelete(index)}
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
          {!heroImagePreviews[index] && (
            <div
              className={`${styles.imageBox} ${styles.noAfter}`}
              onClick={handleHeroImageBoxClick}
            >
              <Image src={AddImageIcon} alt="add image" /> Intro image
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                ref={heroFileInputRef}
                onChange={handleHeroImageUpload}
              />
            </div>
          )}{" "}
        </div>
        <div className={styles.imageNote}>
          <InfoIcon height={35} width={35} stroke="#CCCCCC" /> Intro image is
          visible on the checkpoint cards, while gallery images are the ones
          that are shown on checkpoint view.
        </div>
      </div>
      <div className={styles.descriptionBox}>
        <label className={styles.descTitle}>Write a Description</label>
        <textarea
          placeholder="Type Here"
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
        <div className={styles.descTitle}>Gallery</div>
        <div className={styles.galleryImageUpload}>
          <div className={styles.galleryImageGrid}>
            {imagePreviews.map((preview, index) => (
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
            {imagePreviews.length < 10 && (
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
