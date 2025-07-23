import React from "react";
import styles from "./DeleteCheckpointModal.module.css";
import { UseFieldArrayRemove } from "react-hook-form";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";
import { PreviewAttraction } from "@/app/_types";

function DeleteCheckpointModal({
  remove,
  close,
  setActiveCheckpoint,
  activeCheckpoint,
  setPreviewAttractions,
}: {
  remove: UseFieldArrayRemove;
  close: () => void;
  activeCheckpoint: number;
  setActiveCheckpoint: React.Dispatch<React.SetStateAction<number>>;
  setPreviewAttractions: React.Dispatch<
    React.SetStateAction<PreviewAttraction[]>
  >;
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t("areYouSure")}</div>
      <div className={styles.description}>{t("areYouSureDesc")}</div>
      <div className={styles.btnsContainer}>
        <div className={styles.close} onClick={close}>
          {t("close")}
        </div>
        <Button
          label={t("deleteCheckpoint")}
          onClick={() => {
            remove(activeCheckpoint);
            setPreviewAttractions((prev) =>
              prev.filter((_, index) => index !== activeCheckpoint)
            );

            setActiveCheckpoint(
              activeCheckpoint > 0 ? activeCheckpoint - 1 : activeCheckpoint
            );
            close();
          }}
        />
      </div>
    </div>
  );
}

export default DeleteCheckpointModal;
