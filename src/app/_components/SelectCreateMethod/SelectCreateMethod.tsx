import React from "react";
import styles from "./SelectCreateMethod.module.css";
import Image from "next/image";
import ImportIcon from "@/app/assets/import.svg";
import PlusIcon from "@/app/assets/regularPlus.svg";
import ArrowRight from "../../assets/arrowRight";

function SelectCreateMethod() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Create new route</div>
      <div className={styles.description}>
        Choose how would you like to create your route.
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <Image src={ImportIcon} alt="import" />
          </div>
          <div className={styles.cardDesc}>
            Quickly import your route using existing file (.xlsx){" "}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>
            <Image src={PlusIcon} alt="Plus" />
          </div>
          <div className={styles.cardDesc}>
            Start from scratch with our content creation tool{" "}
            <ArrowRight fill="#0d0d0d" height={14} width={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCreateMethod;
