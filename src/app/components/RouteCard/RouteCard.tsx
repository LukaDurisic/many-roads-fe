import React from "react";
import styles from "./RouteCard.module.css";
import Image from "next/image";
import ProfileIcon from "../../assets/profile.svg";
import DistanceIcon from "../../assets/distance.svg";
import TimeIcon from "../../assets/time.svg";
import Link from "next/link";
import { Route } from "@/app/_types";

interface RouteCardProps {
  routeData: Route;
  isProfileShowing: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({
  routeData,
  isProfileShowing,
}) => {
  return (
    <Link href={`/route/${routeData.id}`}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <div className={styles.fakeImage}>
            <img
              className={styles.bgImage}
              alt="Background"
              src={
                process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                routeData?.images[0]?.url
              }
            />
            <div className={styles.tagContainer}>
              <div className={styles.tags}>
                {routeData.tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.checkpointNumber}>
                {routeData.attractions.length} / {routeData.total_attractions}
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
            <Image alt="profile" src={DistanceIcon} /> {routeData.distance} |{" "}
            <Image alt="profile" src={TimeIcon} /> {routeData.duration_est}
          </div>
          {isProfileShowing && (
            <div className={styles.profile}>
              <Image alt="profile" src={ProfileIcon} />{" "}
              {routeData.creator.username}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
