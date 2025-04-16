import React from "react";
import styles from "./Gallery.module.css";
import LocationIcon from "@/app/assets/location";

function Gallery({
  isNumberShowing,
  isSliderLeft,
  checkpointNumber,
}: {
  isNumberShowing: boolean;
  isSliderLeft: boolean;
  checkpointNumber?: number;
}) {
  return (
    <div className={isSliderLeft ? styles.wrapper : styles.wrapperLeft}>
      <div className={styles.slider}>
        <div
          className={isSliderLeft ? styles.slideImage : styles.sliderImageSmall}
        ></div>
        <div
          className={isSliderLeft ? styles.slideImage : styles.sliderImageSmall}
        ></div>
        <div
          className={isSliderLeft ? styles.slideImage : styles.sliderImageSmall}
        ></div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          {isNumberShowing && (
            <div className={styles.numContainer}>
              <div className={styles.checkpointNumber}>
                <LocationIcon height={17} width={17} fill="white" />
                {checkpointNumber && checkpointNumber + 1}
              </div>
            </div>
          )}
        </div>
        <div className={styles.caption}>
          Here is caption of this image for this checkpoint
        </div>
      </div>
    </div>
  );
}

export default Gallery;
