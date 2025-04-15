import React from "react";
import styles from "./CheckpointCard.module.css";
import Image from "next/image";
import LocationIcon from "../../assets/location.svg";

interface CheckpointCardData {
  imageUrl: string;
  name: string;
  address: string;
  checkpointNumber: number;
}

interface CheckpointCardProps {
  checkpointData: CheckpointCardData;
}

const CheckpointCard: React.FC<CheckpointCardProps> = ({ checkpointData }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <div className={styles.fakeImage}>
          <div className={styles.tagContainer}>
            <div className={styles.checkpointNumber}>
              <Image alt="location" src={LocationIcon} height={17} width={17} />
              {checkpointData.checkpointNumber}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.title}>{checkpointData.name}</div>
        <div className={styles.address}>{checkpointData.address}</div>
      </div>
    </div>
  );
};

export default CheckpointCard;
