"use client";
import React, { useState } from "react";
import styles from "./Settings.module.css";
import Navbar from "../_components/Navbar/Navbar";
import UserMenu from "../_components/UserMenu/UserMenu";
import Tabs from "../_components/Tabs/Tabs";
import UserInfo from "../_components/UserInfo/UserInfo";
import Button from "../_components/Button/Button";
import CustomInput from "../_components/CustomInput/CustomInput";
import ArrDown from "@/app/assets/arrDown";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

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
  language: 1,
  email: "testis.livi@gmail.comdf",
  donationLink: "donate for 911",
};

const languageOptions = [
  {
    name: "English",
    id: 1,
  },
  {
    name: "繁體中文",
    id: 2,
  },
  {
    name: "简体中文",
    id: 3,
  },
];

function Settings() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("edit profile");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
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
          <div className={styles.title}>{t("settings")}</div>
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
              <div className={styles.profileTitle}>{t("myAccount")}</div>
              <div className={styles.form}>
                {(Object.keys(userData) as (keyof typeof userData)[]).map(
                  (field) => {
                    if (field === "language") {
                      return (
                        <div key={field} className={styles.selectWrapper}>
                          <label className={styles.label}>
                            {t("language")}
                          </label>
                          <div className={styles.selectFlex}>
                            <select
                              value={userData[field]}
                              onChange={(e) =>
                                handleInputChange(field, e.target.value)
                              }
                              className={styles.select}
                              onFocus={() => setIsSelectOpen(true)}
                              onBlur={() => setIsSelectOpen(false)}
                            >
                              {languageOptions.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                  {lang.name}
                                </option>
                              ))}
                            </select>
                            <ArrDown
                              stroke="#0d0d0d"
                              height="14px"
                              width="14px"
                              style={
                                isSelectOpen ? undefined : { rotate: "180deg" }
                              }
                            />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <CustomInput
                          key={field}
                          label={t(field)}
                          value={userData[field]}
                          onChange={(val) => handleInputChange(field, val)}
                          showError={errors[field]}
                          type="text"
                          showLock={field === "username" || field === "email"}
                        />
                      );
                    }
                  }
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
                {t("continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
