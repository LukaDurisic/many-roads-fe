"use client";
import React, { useState } from "react";
import styles from "./Step3.module.css";
import CheckpointCardDetailed from "@/app/_components/CheckpointCardDetailed/CheckpointCardDetailed";
import { UseFormGetValues } from "react-hook-form";
import { Route, PreviewAttraction } from "@/app/_types";
import Image from "next/image";

function Step3({
  getValues,
  previewRoute,
  previewAttractions,
}: {
  getValues: UseFormGetValues<Route>;
  previewRoute: string[];
  previewAttractions: PreviewAttraction[];
}) {
  const checkpoints = getValues().attractions;
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className={styles.stepWrapper}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.imagesAndName}>
          <div className={styles.images}>
            <Image
              src={previewRoute[activeIndex]}
              alt="Route image"
              width={1000}
              height={1000}
              className={styles.imagePreview}
            />
            <div className={styles.indicators}>
              {previewRoute.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`${styles.indicator} ${
                    i === activeIndex ? styles.active : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className={styles.name}>
            <div className={styles.leftInfo}>
              <div className={styles.routeName}>
                {getValues().name || "No name inputed!"}
              </div>
            </div>
            <div className={styles.leftInfo}>
              <div className={styles.label}>Description</div>
              <div className={styles.info}>
                {getValues().description || "No description inputed!"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.infoItem}>
            <div className={styles.label}>Route Type</div>
            <div className={styles.info}>
              {getValues().type || "No type selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Country</div>
            <div className={styles.info}>
              {getValues().country || "No country selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Province</div>
            <div className={styles.info}>
              {getValues().province || "No province selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Estimated Duration</div>
            <div className={styles.info}>
              {getValues().duration_est || "No duration inputed!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Total Distance</div>
            <div className={styles.info}>
              {getValues().distance || "No distance inputed!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Difficulty</div>
            <div className={styles.info}>
              {getValues().difficulty || "No difficulty selected!"}
            </div>
          </div>

          <div className={styles.classification}>
            <div className={styles.label}>Classification</div>
            <div className={styles.tags}>
              {getValues().categories.length > 0 ? (
                getValues().categories.map((item) => (
                  <button type="button" key={item} className={styles.tag}>
                    {item}
                  </button>
                ))
              ) : (
                <div className={styles.info} style={{ marginTop: 10 }}>
                  No classifications selected!
                </div>
              )}
            </div>
          </div>
          <div className={styles.accessibility}>
            <div className={styles.label}>Accessibility</div>
            {getValues().accessibility.length > 0 ? (
              getValues().accessibility.map((item, index) => (
                <div className={styles.infoItemAcc} key={index}>
                  <div className={styles.info}>{item}</div>
                  <div className={styles.info}>✔</div>
                </div>
              ))
            ) : (
              <div className={styles.info} style={{ marginTop: 20 }}>
                No accessibilities selected!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.checkTitle}>
        <span style={{ color: "black" }}>{checkpoints.length} </span>{" "}
        Checkpoints
      </div>
      {checkpoints?.map((checkpoint, index) => (
        <CheckpointCardDetailed
          checkpointData={checkpoint}
          images={previewAttractions.find((att) => att.index === index)}
          index={index}
          key={index}
        />
      ))}
      <div className={styles.mapWithRoute}></div>
    </div>
  );
}

export default Step3;
