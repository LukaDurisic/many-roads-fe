import React from "react";
import styles from "./Step3.module.css";
import CheckpointCardDetailed from "@/app/components/CheckpointCardDetailed/CheckpointCardDetailed";

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

function Step3() {
  return (
    <div className={styles.stepWrapper}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.mapAndName}>
          <div className={styles.map}></div>
          <div className={styles.name}>
            <div className={styles.label}>Route Name</div>
            <div className={styles.routeName}>
              Architecture Walk from Central to Wan Chai
            </div>
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.infoItem}>
            <div className={styles.label}>Route Type</div>
            <div className={styles.info}>Point To Point</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Country</div>
            <div className={styles.info}>Hong Kong</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Province</div>
            <div className={styles.info}>NA</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Estimated Duration</div>
            <div className={styles.info}>3.75 – 4 hours</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Difficulty</div>
            <div className={styles.info}>Easy</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.label}>Total Distance</div>
            <div className={styles.info}>5.75 km</div>
          </div>
          <div className={styles.classification}>
            <div className={styles.label}>Classification</div>
            <div className={styles.tags}>
              {classifications.map((item) => (
                <button type="button" key={item} className={styles.tag}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.accessibility}>
            <div className={styles.label}>Accessibility</div>
            {accessibilities.length > 0
              ? accessibilities.map((item, index) => (
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
