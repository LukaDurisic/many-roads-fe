import React from "react";
import styles from "./RoutesContainer.module.css";
import { routesMock } from "./utils";
import RouteCard from "../RouteCard/RouteCard";

function RoutesContainer() {
  return (
    <div className={styles.temp}>
      {routesMock.map((route) => (
        <RouteCard key={route.routeId} routeData={route} />
      ))}
    </div>
  );
}

export default RoutesContainer;
