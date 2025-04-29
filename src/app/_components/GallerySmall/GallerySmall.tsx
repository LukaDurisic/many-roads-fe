import React from "react";
import styles from "./GallerySmall.module.css";
import { Image } from "@/app/_types";

function GallerySmall({ images }: { images: Image[] }) {
  images = [
    {
      caption: "Test test test etste etsets ets ",
      id: 1,
      source: "",
      url: "",
      attraction: 1,
      route: 1,
    },
    {
      caption: "Test test test etste etsets ets ",
      id: 2,
      source: "",
      url: "",
      attraction: 1,
      route: 1,
    },
    {
      caption: "Test test test etste etsets ets ",
      id: 3,
      source: "",
      url: "",
      attraction: 1,
      route: 1,
    },
    {
      caption: "Test test test etste etsets ets ",
      id: 4,
      source: "",
      url: "",
      attraction: 1,
      route: 1,
    },
  ];
  return (
    <div className={styles.wrapperLeft}>
      <div className={styles.slider}>
        {images.length > 0 && images.length < 4
          ? images.map((image, index) => (
              <div className={styles.sliderImageSmall} key={index}></div>
            ))
          : images.slice(0, 3).map((image, index) => (
              <div
                className={`${styles.sliderImageSmall} ${
                  index === 2 && styles.countBg
                }`}
                key={index}
              >
                {index === 2 && (
                  <span className={styles.countText}>
                    + {images.length - 3}
                  </span>
                )}
              </div>
            ))}
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
        <div className={styles.caption}>
          {images[0]?.caption || "No caption"}
        </div>
      </div>
    </div>
  );
}

export default GallerySmall;
