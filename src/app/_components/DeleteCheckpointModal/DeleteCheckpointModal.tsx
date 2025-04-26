import React from "react";
import styles from "./DeleteCheckpointModal.module.css";
import { UseFieldArrayRemove } from "react-hook-form";
import Button from "../Button/Button";

function DeleteCheckpointModal({
  remove,
  close,
}: {
  remove: UseFieldArrayRemove;
  close: () => void;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Are you sure?</div>
      <div className={styles.description}>
        Are you sure you want to delete all data for “Checkpoint 1“? By
        continuing you will lose all informations that you entered about it
        (including name, address, images and description).
      </div>
      <div className={styles.btnsContainer}>
        <div className={styles.close} onClick={close}>
          Close
        </div>
        <Button label="Delete checkpoint" onClick={remove} />
      </div>
    </div>
  );
}

export default DeleteCheckpointModal;
