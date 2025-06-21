"use client";
import React, { useState } from "react";
import styles from "./Settings.module.css";
import Navbar from "../_components/Navbar/Navbar";
import UserMenu from "../_components/UserMenu/UserMenu";
import Tabs from "../_components/Tabs/Tabs";
import UserInfo from "../_components/UserInfo/UserInfo";
import Button from "../_components/Button/Button";

const userMock = {
  username: "Test user",
  profile_image:
    "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
  date_added: "",
  country: "BiH",
};

function Settings() {
  const [selectedTab, setSelectedTab] = useState("edit profile");
  const [isFormFilled, setIsFormFilled] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <div className={styles.title}>Settings</div>
          <UserMenu />
        </div>
        <div className={styles.tabContainer}>
          <Tabs
            options={["edit profile"]}
            isCenter={false}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.profileImg}>
            <UserInfo
              variant="big"
              data={userMock}
              date={false}
              verify={false}
              isInfoShowing={false}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.formContainer}>
              <div className={styles.profileTitle}>My account</div>
              <div className={styles.form}>Form inputs</div>
              <Button
                variant="primary"
                onClick={() => {}}
                className={!isFormFilled ? styles.disabled : undefined}
              >
                {"CONTINUE"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
