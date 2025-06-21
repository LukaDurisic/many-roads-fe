"use client";
import React, { useState } from "react";
import styles from "./UserInfo.module.css";
import Image from "next/image";
import ProfileIcon from "../../assets/profile.svg";
import VerifyIcon from "../../assets/verify.svg";
import { UserInfoProps } from "@/app/_types";
import DotsIcon from "@/app/assets/3dots.svg";
import CameraIcon from "@/app/assets/camera.svg";
import Link from "next/link";

function UserInfo({
  data,
  date,
  verify,
  variant,
  isInfoShowing = true,
}: {
  data: UserInfoProps;
  date: boolean;
  verify: boolean;
  variant: "big" | "small" | "smallCard";
  isInfoShowing?: boolean;
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };

    const day = date.getDate();
    const dayWithSuffix =
      day +
      (day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th");

    const formattedMonthYear = date.toLocaleDateString("en-US", options);

    return `${formattedMonthYear.split(" ")[0]} ${dayWithSuffix}, ${
      formattedMonthYear.split(" ")[1]
    }`;
  }

  return (
    <div
      className={
        variant === "smallCard"
          ? styles.smallUserSection
          : variant === "small"
          ? styles.userSection
          : styles.bigUserSection
      }
    >
      {date && (
        <div className={styles.publishDate}>
          Published {data?.date_added ? formatDate(data.date_added) : "N/A"}
        </div>
      )}
      <div
        className={
          variant === "small"
            ? styles.userProfile
            : variant === "smallCard"
            ? styles.userProfileCard
            : styles.userProfileBig
        }
      >
        <div
          className={
            variant === "small"
              ? styles.profile
              : variant === "smallCard"
              ? styles.profileCard
              : styles.profileBig
          }
        >
          {variant === "big" ? (
            <div className={styles.profileImageWrapper}>
              <Image
                alt="profile"
                src={
                  data?.profile_image
                    ? process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                      data?.profile_image
                    : ProfileIcon
                }
                height={200}
                width={200}
                className={styles.profileImgBig}
              />
              <Image
                alt="image"
                src={CameraIcon}
                className={styles.camImg}
                onClick={() => {
                  setIsImageOpen(!isImageOpen);
                  if (isEditOpen) {
                    setIsEditOpen(false);
                  }
                }}
              />
              {isImageOpen && (
                <div className={styles.imageMenu}>
                  <div className={styles.option}>Add image</div>
                  <div className={styles.option}>Remove image</div>
                </div>
              )}
            </div>
          ) : (
            <Image
              alt="profile"
              src={
                data?.profile_image
                  ? process.env.NEXT_PUBLIC_MANY_ROADS_IMG + data?.profile_image
                  : ProfileIcon
              }
              height={100}
              width={100}
              className={
                variant === "small" ? styles.profileImg : styles.profileImgCard
              }
            />
          )}

          {variant !== "big" && data && data.username}
          {variant === "big" && isInfoShowing && (
            <div className={styles.bigUsernameSection}>
              <div>
                <div className={styles.bigUsername}>{data.username}</div>
                <div className={styles.bigCountry}>{data.country}</div>
              </div>
              <Image
                alt="more"
                src={DotsIcon}
                onClick={() => {
                  setIsEditOpen(!isEditOpen);
                  if (isImageOpen) {
                    setIsImageOpen(false);
                  }
                }}
                className={styles.editImg}
              />
              {isEditOpen && (
                <div className={styles.editMenu}>
                  <Link href={"/settings"} className={styles.option}>
                    Edit profile
                  </Link>
                </div>
              )}
            </div>
          )}
          {verify && <Image alt="verify" src={VerifyIcon} />}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
