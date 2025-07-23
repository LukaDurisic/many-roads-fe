"use client";
import React from "react";
import styles from "./Gallery.module.css";
import LocationIcon from "@/app/assets/location";
import { Image as ImageInterface } from "@/app/_types";
import Image from "next/image";

function Gallery({
  isNumberShowing,
  isSliderLeft,
  checkpointNumber,
  images,
  imageUrls,
  activeImage,
  setActiveImage,
}: {
  isNumberShowing: boolean;
  isSliderLeft: boolean;
  images?: ImageInterface[];
  imageUrls?: string[];
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  checkpointNumber?: number;
}) {
  return (
    <div className={isSliderLeft ? styles.wrapper : styles.wrapperLeft}>
      <div className={styles.slider}>
        {images ? (
          images.map((image, index) => (
            <div
              className={`${
                isSliderLeft ? styles.slideImage : styles.sliderImageSmall
              } ${activeImage === index ? styles.active : null}`}
              key={index}
              onClick={() => setActiveImage(index)}
            >
              <Image
                src={process.env.NEXT_PUBLIC_MANY_ROADS_IMG + image.url}
                alt=""
                height={100}
                width={100}
                className={styles.sliderBg}
              />
            </div>
          ))
        ) : imageUrls ? (
          imageUrls.map((image, index) => (
            <div
              className={`${
                isSliderLeft ? styles.slideImage : styles.sliderImageSmall
              } ${activeImage === index ? styles.active : null}`}
              key={index}
              onClick={() => setActiveImage(index)}
            >
              <Image
                src={process.env.NEXT_PUBLIC_MANY_ROADS_IMG + image}
                alt=""
                height={100}
                width={100}
                className={styles.sliderBg}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          {isNumberShowing && (
            <div className={styles.numContainer}>
              <div className={styles.checkpointNumber}>
                <LocationIcon height={17} width={17} fill="white" />
                {checkpointNumber === 0
                  ? 1
                  : checkpointNumber
                  ? checkpointNumber + 1
                  : 0}
              </div>
            </div>
          )}
          <Image
            src={
              process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
              (images
                ? images[activeImage]?.url
                : imageUrls
                ? imageUrls[activeImage]
                : "")
            }
            alt=""
            height={1000}
            width={1000}
            className={styles.bigImg}
          />
          <div className={styles.imageChangeContainer}>
            <div
              onClick={() =>
                setActiveImage(
                  images && activeImage === 0
                    ? images.length - 1
                    : images && activeImage !== 0
                    ? activeImage - 1
                    : imageUrls && activeImage === 0
                    ? imageUrls.length - 1
                    : imageUrls && activeImage !== 0
                    ? activeImage - 1
                    : 0
                )
              }
            >
              {"<"}
            </div>
            <div
              onClick={() =>
                setActiveImage(
                  images && activeImage === images.length - 1
                    ? 0
                    : images && activeImage !== images.length - 1
                    ? activeImage + 1
                    : imageUrls && activeImage === imageUrls.length - 1
                    ? 0
                    : imageUrls && activeImage !== imageUrls.length
                    ? activeImage + 1
                    : 0
                )
              }
            >
              {">"}
            </div>
          </div>
        </div>
        <div className={styles.caption}>
          {images && images[activeImage]?.caption
            ? images[activeImage].caption
            : images
            ? "No caption"
            : null}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
