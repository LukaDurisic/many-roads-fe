import React from "react";
import styles from "./ShareModal.module.css";
import RouteCard from "../RouteCard/RouteCard";
import Button from "../Button/Button";

function ShareModal() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Share this route</div>
      <RouteCard
        routeData={{
          routeId: 1,
          imageUrl: "",
          title: "Architecture Walk from Central to Wan Chai",
          distance: 5.75,
          duration: "2.5 - 3 hrs",
          userName: "Sean Kwok",
          userProfileImg: "",
          checkpointNumber: 1,
          tags: ["Tag", "Tag"],
          start: "Central",
          end: "Wan Chai",
          city: "Hong Kong SAR",
        }}
        isProfileShowing={false}
      />
      <Button label="Copy link" />
    </div>
  );
}

export default ShareModal;
