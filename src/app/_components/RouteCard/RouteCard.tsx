import React from "react";
import styles from "./RouteCard.module.css";
import Image from "next/image";
import ProfileIcon from "../../assets/profile.svg";
import DistanceIcon from "../../assets/distance.svg";
import TimeIcon from "../../assets/time.svg";
import Link from "next/link";
import { RouteCardProps } from "@/app/_types";

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
  return (
    <Link href={isClickable ? `/route/${routeData.id}` : "#"}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <div className={styles.fakeImage}>
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
            <div className={styles.tagContainer}>
              <div className={styles.tags}>
                {routeData.tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className={styles.checkpointNumber}>
                {routeData.num_of_completed_routes} /{" "}
                {routeData.total_attractions}
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
