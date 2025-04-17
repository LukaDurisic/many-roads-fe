import React from "react";
import styles from "./CheckpointCard.module.css";
import LocationIcon from "../../assets/location";

interface CheckpointCardData {
  imageUrl: string;
  name: string;
  address: string;
  checkpointNumber: number;
}

interface CheckpointCardProps {
  checkpointData: CheckpointCardData;
  onClick?: () => void;
}

const CheckpointCard: React.FC<CheckpointCardProps> = ({
  checkpointData,
  onClick,
}) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.imgContainer}>
        <div className={styles.fakeImage}>
          <div className={styles.tagContainer}>
            <div className={styles.checkpointNumber}>
              <LocationIcon height={17} width={17} fill="white" />
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
