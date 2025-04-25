"use client";

import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../_components/Navbar/Navbar";
import Header from "../_components/Header/Header";
import Image from "next/image";
import MapIcon from "../assets/map.svg";
import ListIcon from "../assets/list.svg";
import MapContainer from "../_components/MapContainer/MapContainer";
import RoutesContainer from "../_components/RoutesContainer/RoutesContainer";

import { Route } from "../_types";

import { getAllTours } from "../_services/client-api-requests";



function Dashboard() {
  const [isMapActive, setIsMapActive] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  
  console.log(routes);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await getAllTours();
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
        {isMapActive ? (
          <MapContainer routes={routes} />
        ) : (
          <RoutesContainer routes={routes} />
        )}
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
