import React from "react";
import styles from "./MyRoutes.module.css";
import { RouteCardProps } from "@/app/_types";
import RouteList from "../RouteList/RouteList";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

const routes: RouteCardProps[] = [
  {
    categories: ["History", "Heritage", "City"],
    country: "Hong Kong SAR",
    creator: {
      id: 2,
      profile_image:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      username: "Test name",
      first_name: "Test name",
      last_name: "",
      email: "",
    },
    distance: "3.6 km",
    duration_est: "3 - 3.5 hrs",
    end: "Admiralty",
    id: 1,
    name: "156-year History of the City of Victoria",
    num_of_completed_routes: 0,
    start: "Sheung Wan",
    total_attractions: 20,
    images: [
      {
        url: "/media/images/P_pz5CHFB",
        caption: "",
        image_id: 1,
        source: "",
      },
    ],
    tags: [],
  },
  {
    categories: ["History", "Heritage", "City"],
    country: "Hong Kong SAR",
    creator: {
      id: 2,
      profile_image:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      username: "Test name",
      first_name: "Test name",
      last_name: "",
      email: "",
    },
    distance: "3.6 km",
    duration_est: "3 - 3.5 hrs",
    end: "Admiralty",
    id: 2,
    name: "156-year History of the City of Victoria",
    num_of_completed_routes: 0,
    start: "Sheung Wan",
    total_attractions: 20,
    images: [
      {
        url: "/media/images/P_3g0XVPk",
        caption: "",
        image_id: 1,
        source: "",
      },
    ],
    tags: [],
  },
  {
    categories: ["History", "Heritage", "City"],
    country: "Hong Kong SAR",
    creator: {
      id: 2,
      profile_image:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      username: "Test name",
      first_name: "Test name",
      last_name: "",
      email: "",
    },
    distance: "3.6 km",
    duration_est: "3 - 3.5 hrs",
    end: "Admiralty",
    id: 3,
    name: "156-year History of the City of Victoria",
    num_of_completed_routes: 0,
    start: "Sheung Wan",
    total_attractions: 20,
    images: [
      {
        url: "/media/images/MR-ROUTE-SYS-Intro-C.jpg",
        caption: "",
        image_id: 1,
        source: "",
      },
    ],
    tags: [],
  },
  {
    categories: ["History", "Heritage", "City"],
    country: "Hong Kong SAR",
    creator: {
      id: 2,
      profile_image:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      username: "Test name",
      first_name: "Test name",
      last_name: "",
      email: "",
    },
    distance: "3.6 km",
    duration_est: "3 - 3.5 hrs",
    end: "Admiralty",
    id: 4,
    name: "156-year History of the City of Victoria",
    num_of_completed_routes: 0,
    start: "Sheung Wan",
    total_attractions: 20,
    images: [
      {
        url: "/media/images/Battle_of_the_Egg_Tarts_-_Causeway_Bay_765.jpeg",
        caption: "",
        image_id: 1,
        source: "",
      },
    ],
    tags: [],
  },
];

function MyRoutes() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      {routes.length === 0 && (
        <div className={styles.info}>
          <div className={styles.title}>{t("nothingHere")}</div>
          <div className={styles.description}>{t("noRoutesDesc")}</div>
        </div>
      )}
      {routes.length > 0 && (
        <RouteList routes={routes} title={t("published")} />
      )}
      {routes.length > 0 && <RouteList routes={routes} title={t("drafts")} />}
    </div>
  );
}

export default MyRoutes;
