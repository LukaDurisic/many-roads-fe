import React from "react";
import styles from "./CheckpointCardDetailed.module.css";
import Image from "next/image";
// import PlayIcon from "../../assets/play.svg";
import LocationIcon from "../../assets/location";
import GallerySmall from "../GallerySmall/GallerySmall";
import { Attraction, PreviewAttraction } from "@/app/_types";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function CheckpointCardDetailed({
  checkpointData,
  images,
  index,
}: {
  checkpointData: Attraction;
  images: PreviewAttraction | undefined;
  index: number;
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.cardContainer}>
      <div className={styles.heroImage}>
        {images && (
          <Image
            src={images.heroImage}
            alt="Hero image"
            width={1000}
            height={1000}
            className={styles.imagePreview}
          />
        )}
      </div>
      <div className={styles.info}>
        <div>
          <div className={styles.infoItem}>
            <div className={styles.checkpointNumber}>{index + 1}</div>
            <div className={styles.name}>
              {checkpointData.name || "No name inputed!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <LocationIcon height={22} width={24} fill="white" />
            </span>
            <div className={styles.location}>
              {checkpointData.address || "No address inputed!"}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.descHeading}>
            {t("description")}
            {/* <div className={styles.audio}>
              <Image src={PlayIcon} alt="play icon" />{" "}
              {checkpointData.needs_upload
                ? "Audio included"
                : "Audio not included"}
            </div>{" "} */}
          </div>
          <div className={styles.description}>
            {checkpointData.content || "No description inputed!"}
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        <GallerySmall images={images ? images.images : []} />
      </div>
    </div>
  );
}

export default CheckpointCardDetailed;
