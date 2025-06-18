import React from "react";
import styles from "./GallerySmall.module.css";
import Image from "next/image";

function GallerySmall({ images }: { images: string[] | undefined }) {
  return (
    <div className={styles.wrapperLeft}>
      <div className={styles.slider}>
        {images && images.length > 0 && images.length < 4
          ? images.slice(1, images.length).map((image, index) => (
              <div className={styles.sliderImageSmall} key={index}>
                <Image
                  src={image}
                  alt="Checkpoint image"
                  width={1000}
                  height={1000}
                  className={styles.imagePreview}
                />
              </div>
            ))
          : images &&
            images.slice(1, 4).map((image, index) => (
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
                <Image
                  src={image}
                  alt="Checkpoint image"
                  width={1000}
                  height={1000}
                  className={styles.imagePreview}
                />
              </div>
            ))}
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          {images && (
            <Image
              src={images[0]}
              alt="Checkpoint image"
              width={1000}
              height={1000}
              className={styles.imagePreview}
            />
          )}
        </div>
        {/* <div className={styles.caption}>
          {images && images[0]?.caption || "No caption"}
        </div> */}
      </div>
    </div>
  );
}

export default GallerySmall;
