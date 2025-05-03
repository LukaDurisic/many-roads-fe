import React from "react";
import styles from "./MapContainer.module.css";
import Map from "@/app/_components/Map/Map";
import { Route } from "@/app/_types";

function MapContainer({ routes }: { routes: Route[] }) {
  return (
    <div className={styles.temp}>
      {" "}
      <Map tourList={routes} isSingleRoute={false} />
    </div>
  );
}

export default MapContainer;
