import React from "react";
import styles from "./RouteCard.module.css";
import Image from "next/image";
import DistanceIcon from "../../assets/distance.svg";
import TimeIcon from "../../assets/time.svg";
import Link from "next/link";
import { RouteCardProps } from "@/app/_types";
import UserInfo from "../UserInfo/UserInfo";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

interface RouteCardCompProps {
  routeData: RouteCardProps;
  isProfileShowing: boolean;
  isClickable: boolean;
}

const RouteCard: React.FC<RouteCardCompProps> = ({
  routeData,
  isProfileShowing,
  isClickable,
}) => {
  const { t } = useTranslation();
  return (
    <Link href={isClickable ? `/route/${routeData.id}` : "#"}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <div className={styles.fakeImage}>
            {routeData?.images[0] && (
              <Image
                className={styles.bgImage}
                alt="Background"
                src={
                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                  routeData?.images[0].url
                }
                width={1000}
                height={1000}
              />
            )}
            <div className={styles.tagContainer}>
              <div className={styles.tags}>
                {routeData.categories.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {t(tag)}
                  </div>
                ))}
              </div>
              <div
                className={`${styles.checkpointNumber} ${
                  routeData.num_of_completed_routes ===
                    routeData.total_attractions && styles.done
                }`}
              >
                {routeData.num_of_completed_routes === 0
                  ? 1
                  : routeData.num_of_completed_routes}{" "}
                / {routeData.total_attractions}
                {/*vjv nije dobro treba ovaj broj za completed */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.title}>{routeData.name}</div>
          <div className={styles.city}>
            {routeData.country} | {routeData.start} –&gt; {routeData.end}
          </div>
          <div className={styles.info}>
            <div className={styles.aliner}>
              <Image alt="distance" src={DistanceIcon} /> {routeData.distance}
            </div>{" "}
            |{" "}
            <div className={styles.aliner}>
              <Image alt="clock" src={TimeIcon} /> {routeData.duration_est}
            </div>
          </div>
          {isProfileShowing && (
            <UserInfo
              data={{
                username: routeData?.creator.username,
                profile_image: routeData?.creator.profile_image,
              }}
              variant="smallCard"
              verify={false}
              date={false}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
