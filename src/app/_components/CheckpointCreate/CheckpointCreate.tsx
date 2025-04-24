import React from "react";
import styles from "./CheckpointCreate.module.css";
import Image from "next/image";
import {
  UseFormWatch,
  UseFormRegister,
  UseFormGetValues,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Route } from "@/app/_types";
import TrashIcon from "../../assets/trash.svg";
import InfoIcon from "../../assets/info";
import LocationIcon from "@/app/assets/location";
import AddImageIcon from "../../assets/addImage.svg";

function CheckpointCreate({
  index,
  register,
  getValues,
  watch,
  remove,
}: {
  index: number;
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  watch: UseFormWatch<Route>;
  remove: UseFieldArrayRemove;
}) {
  return (
    <>
      <div>
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
            onClick={() => remove(index)}
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
        <div className={styles.imageBox}>
          <Image src={AddImageIcon} alt="add image" /> Intro image
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

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          {...register(`attractions.${index}.needs_upload`)}
          className={styles.hiddenCheckbox}
        />
        {/*vjv treba promjenit prop checkpointa al za sad ok*/}
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
      </label>

      <div className={styles.galleryBox}>
        <div className={styles.descTitle}>Gallery</div>
        {/*slike rješim kasnije */}
        <div className={styles.imageBoxGallery}>
          <Image src={AddImageIcon} alt="add image" />
        </div>
        <div className={styles.imageDescriptionBox}>
          <label className={styles.descTitle}>Image 1 description</label>
          <textarea
            placeholder="Type Here"
            className={styles.textarea}
            // value={imageDescription}
            // onChange={(e) => setImageDescription(e.target.value)}
            maxLength={100}
          />
          <div className={styles.charCount}>
            {/* {imageDescription.length} / 100 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckpointCreate;
