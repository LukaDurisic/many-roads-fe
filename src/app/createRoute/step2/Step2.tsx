"use client";
import React from "react";
import styles from "./Step2.module.css";
import {
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormSetValue,
} from "react-hook-form";
import { Route, AttractionImages, PreviewAttraction } from "@/app/_types";
import CheckpointCreate from "@/app/_components/CheckpointCreate/CheckpointCreate";
import PlusIcon from "../../assets/plus.svg";
import Image from "next/image";
import Map from "@/app/_components/Map/Map";

function Step2({
  register,
  getValues,
  watch,
  appendAttraction,
  remove,
  setValue,
  setAttractionImages,
  previewAttractions,
  setPreviewAttractions,
}: {
  register: UseFormRegister<Route>;
  getValues: UseFormGetValues<Route>;
  watch: UseFormWatch<Route>;
  appendAttraction: UseFieldArrayAppend<Route, "attractions">;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<Route>;
  setAttractionImages: React.Dispatch<React.SetStateAction<AttractionImages[]>>;
  previewAttractions: PreviewAttraction[];
  setPreviewAttractions: React.Dispatch<
    React.SetStateAction<PreviewAttraction[]>
  >;
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
            watch={watch}
            remove={remove}
            setValue={setValue}
            getValues={getValues}
            index={index}
            setAttractionImages={setAttractionImages}
            previewAttractions={previewAttractions.find(
              (att) => att.index === index
            )}
            setPreviewAttractions={setPreviewAttractions}
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
          <div className={styles.map}>
            <Map tourList={[getValues()]} isSingleRoute />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
