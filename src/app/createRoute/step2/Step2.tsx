"use client";
import React from "react";
import styles from "./Step2.module.css";
import {
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Route, AttractionImages } from "@/app/_types";
import CheckpointCreate from "@/app/_components/CheckpointCreate/CheckpointCreate";
import PlusIcon from "../../assets/plus.svg";
import Image from "next/image";

function Step2({
  register,
  getValues,
  watch,
  appendAttraction,
  remove,
  setAttractionImages,
}: {
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  watch: UseFormWatch<Route>;
  appendAttraction: UseFieldArrayAppend<Route, "attractions">;
  remove: UseFieldArrayRemove;
  setAttractionImages: React.Dispatch<React.SetStateAction<AttractionImages[]>>;
}) {
  const addCheckpoint = () => {
    appendAttraction({
      address: "",
      audio: "",
      content: "",
      images: [],
      name: "",
      needs_upload: false,
      poi: {
        latitude: 0,
        longitude: 0,
        name: "",
        id: 0,
      },
    });
  };

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.leftPane}>
        <h2 className={styles.heading}>Checkpoints</h2>
        {getValues().attractions.map((attraction, index) => (
          <CheckpointCreate
            register={register}
            getValues={getValues}
            watch={watch}
            remove={remove}
            index={index}
            setAttractionImages={setAttractionImages}
            key={index}
          />
        ))}
        <div
          className={styles.addCheckpointBtn}
          onClick={() => addCheckpoint()}
        >
          <Image src={PlusIcon} alt="add" height={22} width={22} /> Add
          checkpoint
        </div>
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
