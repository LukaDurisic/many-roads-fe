import React from "react";
import styles from "./DeleteCheckpointModal.module.css";
import { UseFieldArrayRemove } from "react-hook-form";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function DeleteCheckpointModal({
  remove,
  close,
}: {
  remove: UseFieldArrayRemove;
  close: () => void;
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
            remove();
            close();
          }}
        />
      </div>
    </div>
  );
}

export default DeleteCheckpointModal;
