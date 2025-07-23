"use client";
import React, { useState } from "react";
import styles from "./MyProfile.module.css";
import ProtectedRoute from "../_components/ProtectedRoutes/ProtectedRoute";
import Navbar from "../_components/Navbar/Navbar";
import ProfileHeader from "../_components/ProfileHeader/ProfileHeader";
import Tabs from "../_components/Tabs/Tabs";
import MyRoutes from "../_components/MyRoutes/MyRoutes";
import PlusIcon from "@/app/assets/whitePlus.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

function MyProfile() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("my routes");
  return (
    <ProtectedRoute>
      <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <ProfileHeader />
            <Tabs
              options={["my routes"]}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              isCenter={false}
            />
          </div>
          {selectedTab === "my routes" ? <MyRoutes /> : <></>}
        </div>
        <Link href={"/createRoute"} className={styles.createBtn}>
          <Image src={PlusIcon} alt="add" /> {t("createRoute")}
        </Link>
      </div>
    </ProtectedRoute>
  );
}

export default MyProfile;
