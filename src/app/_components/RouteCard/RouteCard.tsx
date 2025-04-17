import React from "react";
import styles from "./RouteCard.module.css";
import Image from "next/image";
import ProfileIcon from "../../assets/profile.svg";
import DistanceIcon from "../../assets/distance.svg";
import TimeIcon from "../../assets/time.svg";
import Link from "next/link";

interface RouteCardData {
  routeId: number;
  imageUrl: string;
  title: string;
  city: string;
  start: string;
  end: string;
  distance: number;
  duration: string;
  userName: string;
  userProfileImg: string;
  checkpointNumber: number;
  tags: string[];
}

interface RouteCardProps {
  routeData: RouteCardData;
  isProfileShowing: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({
  routeData,
  isProfileShowing,
}) => {
  return (
    <Link href={`/route/${routeData.routeId}`}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <div className={styles.fakeImage}>
            <div className={styles.tags}>
              {routeData.tags.map((tag, index) => (
                <div key={index} className={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
            <div className={styles.checkpointNumber}>
              {routeData.checkpointNumber} / 5
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.title}>{routeData.title}</div>
          <div className={styles.city}>
            {routeData.city} | {routeData.start} –&gt; {routeData.end}
          </div>
          <div className={styles.info}>
            <Image alt="profile" src={DistanceIcon} /> {routeData.distance} km |{" "}
            <Image alt="profile" src={TimeIcon} /> {routeData.duration}
          </div>
          {isProfileShowing && (
            <div className={styles.profile}>
              <Image alt="profile" src={ProfileIcon} /> {routeData.userName}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
