import React from "react";
import styles from "./CheckpointModal.module.css";
import ArrowIcon from "../../assets/arrowRight";
import Gallery from "../Gallery/Gallery";

function CheckpointModal({ checkpointNumber }: { checkpointNumber: number }) {
  const isDisabled = true;
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.gallery}>
          <Gallery
            isNumberShowing={true}
            checkpointNumber={checkpointNumber}
            isSliderLeft={true}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>Bank of China Tower</div>
            <div className={styles.location}>1 Garden Road, Central</div>
          </div>
          <div className={styles.description}>
            A walk that takes you across and in-between post-colonial and
            contemporary architecture in Wan Chai. Start at The Henderson.
            <br />
            <br /> A walk that takes you across and in-between post-colonial and
            contemporary architecture in Wan Chai. Start at The Henderson. A
            walk that takes you across and in-between post-colonial and
            contemporary architecture in Wan Chai. Start at The Henderson...
          </div>
          <div className={styles.more}>More</div>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <div className={isDisabled ? styles.disabledBtn : styles.btn}>
          <span className={styles.rotatedSpan}>
            <ArrowIcon
              height={16}
              width={16}
              fill={isDisabled ? "#5c5c5c4d" : "0d0d0d"}
            />
          </span>
          Previous
        </div>
        <div className={styles.btn}>
          Next checkpoint <ArrowIcon height={16} width={16} fill="#0d0d0d" />
        </div>
      </div>
    </div>
  );
}

export default CheckpointModal;
