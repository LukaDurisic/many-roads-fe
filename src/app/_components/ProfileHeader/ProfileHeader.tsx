import React from "react";
import styles from "./ProfileHeader.module.css";
import UserMenu from "../UserMenu/UserMenu";
import UserInfo from "../UserInfo/UserInfo";

const mockData = {
  username: "Test name",
  profile_image:
    "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
  country: "Croatia",
};

function ProfileHeader() {
  return (
    <div className={styles.wrapper}>
      <UserInfo variant="big" verify={false} date={false} data={mockData} />
      <UserMenu />
    </div>
  );
}

export default ProfileHeader;
