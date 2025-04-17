import React from "react";
import styles from "./CheckpointCardDetailed.module.css";
import Image from "next/image";
import PlayIcon from "../../assets/play.svg";
import LocationIcon from "../../assets/location";
import Gallery from "../Gallery/Gallery";

interface GalleryImage {
  url: string;
  caption: string;
}

interface Checkpoint {
  name: string;
  address: string;
  isAudio: boolean;
  description: string;
  heroImageUrl: string;
  galleryImages: GalleryImage[];
}

function CheckpointCardDetailed({
  checkpointData,
  index,
}: {
  checkpointData: Checkpoint;
  index: number;
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.heroImage}></div>
      <div className={styles.info}>
        <div>
          <div className={styles.infoItem}>
            <div className={styles.checkpointNumber}>{index + 1}</div>
            <div className={styles.name}>{checkpointData.name}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <LocationIcon height={22} width={24} fill="white" />
            </span>
            <div className={styles.location}>{checkpointData.address}</div>
          </div>
        </div>
        <div>
          <div className={styles.descHeading}>
            Description
            <div className={styles.audio}>
              <Image src={PlayIcon} alt="play icon" />{" "}
              {checkpointData.isAudio ? "Audio included" : "Audio not included"}
            </div>{" "}
          </div>
          <div className={styles.description}>{checkpointData.description}</div>
        </div>
      </div>
      <div className={styles.gallery}>
        <Gallery isNumberShowing={false} isSliderLeft={false} />
      </div>
    </div>
  );
}

export default CheckpointCardDetailed;
