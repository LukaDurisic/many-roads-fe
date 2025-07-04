import React from "react";
import styles from "./MapContainer.module.css";
// import Map from "@/app/_components/Map/Map";
import Mapbox from "@/app/mapbox/page";
import { Route } from "@/app/_types";

function MapContainer({ routes }: { routes: Route[] }) {
  return (
    <div className={styles.temp}>
      {" "}
      <Mapbox allRoutes={routes} isAllRoutes />
    </div>
  );
}

export default MapContainer;
