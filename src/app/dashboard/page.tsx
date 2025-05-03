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
import { ClipLoader } from "react-spinners";

function Dashboard() {
  const [isMapActive, setIsMapActive] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoadingOpen(true);
      const response = await getAllRoutes();
      setAllRoutes(response.data);
      setRoutes(response.data);
      setIsLoadingOpen(false);
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

  return (
    <ProtectedRoute>
      <div className={styles.wrapper}>
        <Navbar />
        {isLoadingOpen && (
          <div className={styles.loadingModal}>
            <ClipLoader color={"#fff"} size={40} />
          </div>
        )}
        <div className={styles.contentWrapper}>
          <Header
            numberOfRoutes={routes.length}
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
