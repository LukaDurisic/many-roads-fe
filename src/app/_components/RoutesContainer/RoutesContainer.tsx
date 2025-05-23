"use client";
import React from "react";
import styles from "./RoutesContainer.module.css";
import RouteCard from "../RouteCard/RouteCard";
import { Route } from "@/app/_types";

function RoutesContainer({ routes }: { routes: Route[] }) {
  return (
    <div className={styles.temp}>
      {routes.map((route: Route) => (
        <RouteCard
          key={route.id}
          routeData={route}
          isProfileShowing={true}
          isClickable={true}
        />
      ))}
    </div>
  );
}

export default RoutesContainer;
