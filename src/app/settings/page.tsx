"use client";
import React, { useState } from "react";
import styles from "./Settings.module.css";
import Navbar from "../_components/Navbar/Navbar";
import UserMenu from "../_components/UserMenu/UserMenu";
import Tabs from "../_components/Tabs/Tabs";
import UserInfo from "../_components/UserInfo/UserInfo";
import Button from "../_components/Button/Button";
import CustomInput from "../_components/CustomInput/CustomInput";

const userMock = {
  username: "Test user",
  profile_image:
    "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
  date_added: "",
};

const userInputsMock = {
  username: "Test user",
  country: "BiH",
  firstName: "Test",
  lastName: "user",
  language: "Bosanski",
  email: "testis.livi@gmail.comdf",
  donationLink: "donate for 911",
};

function Settings() {
  const [selectedTab, setSelectedTab] = useState("edit profile");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [userData, setUserData] = useState(
    //   {
    //   username: "",
    //   firstName: "",
    //   lastName: "",
    //   country: "",
    //   language: "",
    //   email: "",
    //   donationLink: "",
    // }
    userInputsMock
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof userData, boolean>>
  >({});

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

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
              <div className={styles.form}>
                {(Object.keys(userData) as (keyof typeof userData)[]).map(
                  (field) => (
                    <CustomInput
                      key={field}
                      label={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                      value={userData[field]}
                      onChange={(val) => handleInputChange(field, val)}
                      showError={errors[field]}
                      type="text"
                      showLock={field === "username" || field === "email"}
                    />
                  )
                )}
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  const newErrors: typeof errors = {};
                  for (const key in userData) {
                    if (!userData[key as keyof typeof userData]) {
                      newErrors[key as keyof typeof userData] = true;
                    }
                  }
                  setErrors(newErrors);
                  setIsFormFilled(Object.keys(newErrors).length === 0);
                }}
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
