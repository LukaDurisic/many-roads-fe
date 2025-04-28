import React from "react";
import styles from "./CheckpointCardDetailed.module.css";
import Image from "next/image";
import PlayIcon from "../../assets/play.svg";
import LocationIcon from "../../assets/location";
import GallerySmall from "../GallerySmall/GallerySmall";
import { Attraction } from "@/app/_types";


function CheckpointCardDetailed({
  checkpointData,
  index,
}: {
  checkpointData: Attraction;
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
              {checkpointData.needs_upload
                ? "Audio included"
                : "Audio not included"}
            </div>{" "}
          </div>
          <div className={styles.description}>{checkpointData.content}</div>
        </div>
      </div>
      <div className={styles.gallery}>
        <GallerySmall images={checkpointData.images} />

      </div>
    </div>
  );
}

export default CheckpointCardDetailed;
