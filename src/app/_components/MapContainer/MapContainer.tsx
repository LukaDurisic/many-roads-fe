import React from "react";
import styles from "./MapContainer.module.css";
import Map from "@/app/_components/Map/Map";
import { tours as initialTours } from "@/app/_mock-data/tours";

function MapContainer() {
  return (
    <div className={styles.temp}>
      <Map tourList={initialTours} />
    </div>
  );
}

export default MapContainer;
