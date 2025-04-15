"use client";
import React, { useState } from "react";
import styles from "./Step2.module.css";
import Image from "next/image";
import TrashIcon from "../../assets/trash.svg";
import AddImageIcon from "../../assets/addImage.svg";
import InfoIcon from "../../assets/info.svg";
import LocationIcon from "../../assets/location.svg";

function Step2() {
  const [createAudio, setCreateAudio] = useState(false);
  const [description, setDescription] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [name, setName] = useState("");

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.leftPane}>
        <h2 className={styles.heading}>Checkpoints</h2>
        <div>
          <div className={styles.inputGroup}>
            <div className={styles.checkpointNumber}>1</div>
            <input
              className={styles.input}
              placeholder="Type Name Here"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Image
              src={TrashIcon}
              alt="Trash"
              className={styles.deleteIcon}
              onClick={() => setName("")}
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <Image
                src={LocationIcon}
                alt="play icon"
                height={22}
                width={24}
              />
            </span>
            <input className={styles.input} placeholder="Address" />
          </div>
        </div>
        <div className={styles.imageUpload}>
          <div className={styles.imageBox}>
            <Image src={AddImageIcon} alt="add image" /> Intro image
          </div>
          <div className={styles.imageNote}>
            <Image src={InfoIcon} alt="info" height={20} width={20} /> Intro
            image is visible on the checkpoint cards, while gallery images are
            the ones that are shown on checkpoint view.
          </div>
        </div>

        <div className={styles.descriptionBox}>
          <label className={styles.descTitle}>Write a Description</label>
          <textarea
            placeholder="Type Here"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
          />
          <div className={styles.charCount}>{description.length} / 1000</div>
        </div>

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

        <div className={styles.galleryBox}>
          <div className={styles.descTitle}>Gallery</div>
          <div className={styles.imageBoxGallery}>
            <Image src={AddImageIcon} alt="add image" />
          </div>
          <div className={styles.imageDescriptionBox}>
            <label className={styles.descTitle}>Image 1 description</label>
            <textarea
              placeholder="Type Here"
              className={styles.textarea}
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              maxLength={100}
            />
            <div className={styles.charCount}>
              {imageDescription.length} / 100
            </div>
          </div>
        </div>
        <div className={styles.addCheckpointBtn}>+ Add checkpoint</div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapImage} />
        </div>
      </div>
    </div>
  );
}

export default Step2;
