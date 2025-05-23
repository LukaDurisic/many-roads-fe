import React from "react";
import styles from "./CheckpointCard.module.css";
import LocationIcon from "../../assets/location";
import { Attraction } from "@/app/_types";
import Image from "next/image";

interface CheckpointCardProps {
  checkpointData: Attraction;
  index: number;
  onClick?: () => void;
}

const CheckpointCard: React.FC<CheckpointCardProps> = ({
  checkpointData,
  index,
  onClick,
}) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.imgContainer}>
        <div className={styles.fakeImage}>
          {checkpointData?.images[0] && (
            <Image
              src={
                process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                checkpointData.images[0].url
              }
              width={1000}
              height={1000}
              alt="Background icon"
              className={styles.bgImage}
            />
          )}
          <div className={styles.tagContainer}>
            <div className={styles.checkpointNumber}>
              <LocationIcon height={17} width={17} fill="white" />
              {index + 1}
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
