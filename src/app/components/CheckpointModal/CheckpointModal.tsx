"use client";
import React, { useState } from "react";
import styles from "./CheckpointModal.module.css";
import ArrowIcon from "../../assets/arrowRight";
import Gallery from "../Gallery/Gallery";
import { Attraction } from "@/app/_types";

function CheckpointModal({
  checkpointNumber,
  setCheckpointNumber,
  checkpointData,
}: {
  checkpointNumber: number;
  setCheckpointNumber: React.Dispatch<React.SetStateAction<number>>;
  checkpointData: Attraction[];
}) {
  const [activeImage, setActiveImage] = useState<number>(0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.gallery}>
          <Gallery
            isNumberShowing={true}
            checkpointNumber={checkpointNumber}
            isSliderLeft={true}
            images={checkpointData[checkpointNumber]?.images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>
              {checkpointData[checkpointNumber]?.name}
            </div>
            <div className={styles.location}>
              {checkpointData[checkpointNumber]?.address}
            </div>
          </div>
          {checkpointData[checkpointNumber]?.audio && (
            <audio
              controls
              src={
                process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                "/media/route_audio/156-year_History_of_the_City_of_Victoria-audio_ugh1ZvF.mp3"
              }
            ></audio>
          )}
          <div className={styles.description}>
            {checkpointData[checkpointNumber]?.content}
          </div>
          <div className={styles.more}>More</div>
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <div
          className={checkpointNumber === 0 ? styles.disabledBtn : styles.btn}
          onClick={() => {
            if (checkpointNumber > 0) {
              setCheckpointNumber(checkpointNumber - 1);
              setActiveImage(0);
            }
          }}
        >
          <span className={styles.rotatedSpan}>
            <ArrowIcon
              height={16}
              width={16}
              fill={checkpointNumber === 0 ? "#5c5c5c4d" : "0d0d0dff"}
            />
          </span>
          Previous
        </div>
        <div
          className={
            checkpointNumber === checkpointData.length - 1
              ? styles.disabledBtn
              : styles.btn
          }
          onClick={() => {
            if (checkpointNumber < checkpointData.length - 1) {
              setCheckpointNumber(checkpointNumber + 1);
              setActiveImage(0);
            }
          }}
        >
          Next checkpoint{" "}
          <ArrowIcon
            height={16}
            width={16}
            fill={
              checkpointNumber === checkpointData.length - 1
                ? "#5c5c5c4d"
                : "0d0d0dff"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CheckpointModal;
