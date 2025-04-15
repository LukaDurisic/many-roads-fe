import React from "react";
import styles from "./MapContainer.module.css";
import Map from "@/app/_components/Map/Map";

function MapContainer() {
  return (
    <div className={styles.temp}>
      <Map />
    </div>
  );
}

export default MapContainer;
