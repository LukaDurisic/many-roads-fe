"use client";
import React, { useState } from "react";
import styles from "./Step3.module.css";
import CheckpointCardDetailed from "@/app/_components/CheckpointCardDetailed/CheckpointCardDetailed";
import { UseFormGetValues } from "react-hook-form";
import { Route, PreviewAttraction } from "@/app/_types";
import Image from "next/image";
import Map from "@/app/_components/Map/Map";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function Step3({
  getValues,
  previewRoute,
  previewAttractions,
}: {
  getValues: UseFormGetValues<Route>;
  previewRoute: string[];
  previewAttractions: PreviewAttraction[];
}) {
  const { t } = useTranslation();
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
              <div className={styles.label}>{t("description")}</div>
              <div className={styles.info}>
                {getValues().description || "No description inputed!"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("routeType")}</div>
            <div className={styles.info}>
              {t(getValues().type) || "No type selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("country")}</div>
            <div className={styles.info}>
              {getValues().country || "No country selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("province")}</div>
            <div className={styles.info}>
              {getValues().province || "No province selected!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("estimatedDuration")}</div>
            <div className={styles.info}>
              {getValues().duration_est || "No duration inputed!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("totalDistance")}</div>
            <div className={styles.info}>
              {getValues().distance || "No distance inputed!"}
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>{t("difficulty")}</div>
            <div className={styles.info}>
              {t(getValues().difficulty) || "No difficulty selected!"}
            </div>
          </div>

          <div className={styles.classification}>
            <div className={styles.label}>{t("classifications")}</div>
            <div className={styles.tags}>
              {getValues().categories.length > 0 ? (
                getValues().categories.map((item) => (
                  <button type="button" key={item} className={styles.tag}>
                    {t(item)}
                  </button>
                ))
              ) : (
                <div className={styles.info} style={{ marginTop: 10 }}>
                  {t("noClassifications")}
                </div>
              )}
            </div>
          </div>
          <div className={styles.accessibility}>
            <div className={styles.label}>{t("accessibility")}</div>
            {getValues().accessibility.length > 0 ? (
              getValues().accessibility.map((item, index) => (
                <div className={styles.infoItemAcc} key={index}>
                  <div className={styles.info}>{t(item)}</div>
                  <div className={styles.info}>✔</div>
                </div>
              ))
            ) : (
              <div className={styles.info} style={{ marginTop: 20 }}>
                {t("noAccessibilities")}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.checkTitle}>
        <span style={{ color: "black" }}>{checkpoints.length} </span>{" "}
        {t("checkpoints")}
      </div>
      {checkpoints?.map((checkpoint, index) => (
        <CheckpointCardDetailed
          checkpointData={checkpoint}
          images={previewAttractions.find((att) => att.index === index)}
          index={index}
          key={index}
        />
      ))}
      <div className={styles.mapWithRoute}>
        <div className={styles.map}>
          <Map tourList={[getValues()]} isSingleRoute />
        </div>
      </div>
    </div>
  );
}

export default Step3;
