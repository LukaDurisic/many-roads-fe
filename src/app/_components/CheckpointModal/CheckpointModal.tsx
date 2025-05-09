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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  const showMoreButtonVisible =
    checkpointData[checkpointNumber]?.content.length > 200;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.gallery}>
          <Gallery
            isNumberShowing={true}
            checkpointNumber={checkpointNumber}
            isSliderLeft={true}
            images={checkpointData[checkpointNumber]?.images?.slice(
              1,
              checkpointData[checkpointNumber]?.images?.length
            )}
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
          {/* <audio
            controls
            src={
              process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
              "/media/route_audio/156-year_History_of_the_City_of_Victoria-audio_ugh1ZvF.mp3"
            }
            className={styles.audioPlayer}
          ></audio> */}
          <div
            className={`${styles.description}  ${
              isDescriptionOpen ? null : styles.close
            }`}
          >
            {checkpointData[checkpointNumber]?.content
              ?.split("\n\n")
              .map((para, index) => (
                <p key={index}>
                  {para}
                  <br />
                  <br />
                </p>
              ))}
          </div>
          {showMoreButtonVisible && (
            <div
              className={styles.more}
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              {!isDescriptionOpen ? "More" : "Less"}
            </div>
          )}
        </div>
      </div>
      <div className={styles.btnsContainer}>
        <div
          className={checkpointNumber === 0 ? styles.disabledBtn : styles.btn}
          onClick={() => {
            if (checkpointNumber > 0) {
              setCheckpointNumber(checkpointNumber - 1);
              setActiveImage(0);
              setIsDescriptionOpen(false);
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
              setIsDescriptionOpen(false);
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
