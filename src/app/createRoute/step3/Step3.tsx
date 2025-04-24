import React from "react";
import styles from "./Step3.module.css";
import CheckpointCardDetailed from "@/app/_components/CheckpointCardDetailed/CheckpointCardDetailed";
import { UseFormRegister, UseFormGetValues } from "react-hook-form";
import { Route } from "@/app/_types";

const classifications = ["History", "Adventure"];
const accessibilities = ["Child", "Pet"];
const checkpoints = [
  {
    name: "The Henderson",
    address: "2 Murray Road, Central",
    isAudio: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    heroImageUrl: "",
    galleryImages: [
      { url: "", caption: "Test caption" },
      { url: "", caption: "Test caption 2" },
    ],
  },
  {
    name: "The Henderson",
    address: "2 Murray Road, Central",
    isAudio: true,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    heroImageUrl: "",
    galleryImages: [
      { url: "", caption: "Test caption" },
      { url: "", caption: "Test caption 2" },
    ],
  },
];

function Step3({ getValues }: { getValues: UseFormGetValues<Route> }) {
  return (
    <div className={styles.stepWrapper}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.mapAndName}>
          <div className={styles.map}></div>
          <div className={styles.name}>
            <div className={styles.leftInfo}>
              <div className={styles.routeName}>{getValues().name}</div>
            </div>
            <div className={styles.leftInfo}>
              <div className={styles.label}>Description</div>
              <div className={styles.info}>{getValues().description}</div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.infoItem}>
            <div className={styles.label}>Route Type</div>
            <div className={styles.info}>{getValues().type}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Country</div>
            <div className={styles.info}>{getValues().country}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Province</div>
            <div className={styles.info}>{getValues().province}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Estimated Duration</div>
            <div className={styles.info}>{getValues().duration_est}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Total Distance</div>
            <div className={styles.info}>{getValues().distance}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Difficulty</div>
            <div className={styles.info}>{getValues().difficulty}</div>
          </div>

          <div className={styles.classification}>
            <div className={styles.label}>Classification</div>
            <div className={styles.tags}>
              {getValues().categories.map((item) => (
                <button type="button" key={item} className={styles.tag}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.accessibility}>
            <div className={styles.label}>Accessibility</div>
            {getValues().accessibility.length > 0
              ? getValues().accessibility.map((item, index) => (
                  <div className={styles.infoItemAcc} key={index}>
                    <div className={styles.info}>{item}</div>
                    <div className={styles.info}>✔</div>
                  </div>
                ))
              : "No accessibilities selected!"}
          </div>
        </div>
      </div>
      {checkpoints?.map((checkpoint, index) => (
        <CheckpointCardDetailed
          checkpointData={checkpoint}
          index={index}
          key={index}
        />
      ))}
      <div className={styles.mapWithRoute}></div>
    </div>
  );
}

export default Step3;
