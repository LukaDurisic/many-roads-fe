"use client";

import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../_components/Navbar/Navbar";
import Header from "../_components/Header/Header";
import Image from "next/image";
import MapIcon from "../assets/map.svg";
import ListIcon from "../assets/list.svg";
import MapContainer from "../_components/MapContainer/MapContainer";
import RoutesContainer from "../_components/RoutesContainer/RoutesContainer";

function Dashboard() {
  const [isMapActive, setIsMapActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <Header />
        {isMapActive ? <MapContainer /> : <RoutesContainer />}
        <div
          className={styles.mapToggle}
          onClick={() => setIsMapActive(!isMapActive)}
        >
          <Image
            alt=""
            src={isMapActive ? ListIcon : MapIcon}
            className={styles.toggleImg}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
