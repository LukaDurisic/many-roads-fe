"use client";

import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Image from "next/image";
import MapIcon from "../assets/map.svg";
import ListIcon from "../assets/list.svg";
import MapContainer from "../components/MapContainer/MapContainer";
import RoutesContainer from "../components/RoutesContainer/RoutesContainer";
import { getAllRoutes } from "../_services/client-api-requests";
import { Route } from "../_types";
// import { useTours } from "../_hooks/tours";

function Dashboard() {
  const [isMapActive, setIsMapActive] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await getAllRoutes();
      setRoutes(response.data);
    };

    fetchRoutes();
  }, []);
  // const { data } = useTours();
  // console.log(data);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <Header numberOfRoutes={routes.length} />
        {isMapActive ? <MapContainer /> : <RoutesContainer routes={routes} />}
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
