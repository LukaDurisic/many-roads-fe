import React from "react";
import styles from "./RouteList.module.css";
import { RouteCardProps } from "@/app/_types";
import RouteCard from "../RouteCard/RouteCard";

function RouteList({
  title,
  routes,
}: {
  title: string;
  routes: RouteCardProps[];
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.cardContainer}>
        {routes.map((route) => (
          <div key={route.id}>
            <RouteCard routeData={route} isProfileShowing isClickable />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteList;
