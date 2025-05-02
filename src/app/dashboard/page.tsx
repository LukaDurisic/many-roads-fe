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
import { getAllRoutes } from "../_services/client-api-requests";
import { Route } from "../_types";
//import { useTours } from "../_hooks/tours";
import ProtectedRoute from "../_components/ProtectedRoutes/ProtectedRoute";

function Dashboard() {
  const [isMapActive, setIsMapActive] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await getAllRoutes();
      setAllRoutes(response.data);
      setRoutes(response.data);
    };
    const stored = sessionStorage.getItem("filteredRoutes");
    if (stored) {
      const parsedRoutes = JSON.parse(stored);
      setRoutes(parsedRoutes);
      setAllRoutes(parsedRoutes);
    } else {
      fetchRoutes();
    }
  }, [isReload]);
  // const { data } = useTours();
  // console.log(data);

  return (
    <ProtectedRoute>
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.contentWrapper}>
          <Header numberOfRoutes={routes.length} 
            routes={allRoutes}
          setRoutes={setRoutes}
          isReload={isReload}
          setIsReload={setIsReload}
            />
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
    </ProtectedRoute>
  );
}

export default Dashboard;
