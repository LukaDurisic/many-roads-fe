"use client";
import React, { useEffect, useState } from "react";
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
import TrashIcon from "../../assets/trash.svg";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";
import Mapbox from "@/app/_components/Mapbox/Mapbox";
import Modal from "@/app/_components/Modal/Modal";
import DeleteCheckpointModal from "@/app/_components/DeleteCheckpointModal/DeleteCheckpointModal";

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
  setIsAllowed,
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
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeCheckpoint, setActiveCheckpoint] = useState<number>(0);
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
    setActiveCheckpoint(activeCheckpoint + 1);
  };

  useEffect(() => {
    const attractions = getValues().attractions || [];

    const isAllowed = attractions.every((attraction, index) => {
      return (
        attraction.name?.trim().length > 0 &&
        attraction.address?.trim().length > 0 &&
        attraction.content?.trim().length > 0 &&
        String(attraction.poi?.latitude || "").length > 0 &&
        String(attraction.poi?.longitude || "").length > 0 &&
        previewAttractions[index]?.heroImage &&
        previewAttractions[index]?.images?.length > 0
      );
    });
    setIsAllowed(isAllowed);
  }, [getValues().attractions.length, JSON.stringify(previewAttractions)]);

  useEffect(() => {
    const subscription = watch(() => {
      const attractions = getValues().attractions || [];

      const isAllowed = attractions.every((attraction, index) => {
        return (
          attraction.name?.trim().length > 0 &&
          attraction.address?.trim().length > 0 &&
          attraction.content?.trim().length > 0 &&
          String(attraction.poi?.latitude || "").length > 0 &&
          String(attraction.poi?.longitude || "").length > 0 &&
          previewAttractions[index]?.heroImage &&
          previewAttractions[index]?.images?.length > 0
        );
      });

      setIsAllowed(isAllowed);
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, JSON.stringify(previewAttractions)]);

  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.stepWrapper}>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <DeleteCheckpointModal
          remove={remove}
          close={() => setIsDeleteModalOpen(false)}
          activeCheckpoint={activeCheckpoint}
          setActiveCheckpoint={setActiveCheckpoint}
        />
      </Modal>
      <div className={styles.leftPane}>
        <h2 className={styles.heading}>{t("checkpoints")}</h2>
        <CheckpointCreate
          register={register}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          index={activeCheckpoint}
          setAttractionImages={setAttractionImages}
          previewAttractions={previewAttractions.find(
            (att) => att.index === activeCheckpoint
          )}
          setPreviewAttractions={setPreviewAttractions}
        />
        <div className={styles.btnsContainer}>
          <div
            className={styles.deleteCheckpointBtn}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Image src={TrashIcon} alt="delete" height={22} width={22} />{" "}
            {t("deleteCheckpoint")}
          </div>
          <div
            className={styles.addCheckpointBtn}
            onClick={() => addCheckpoint()}
          >
            <Image src={PlusIcon} alt="add" height={22} width={22} />{" "}
            {t("addCheckpoint")}
          </div>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.mapPlaceholder}>
          <div className={styles.map}>
            <Mapbox
              isPickable
              setValue={setValue}
              watch={watch}
              activeCheckpoint={activeCheckpoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
