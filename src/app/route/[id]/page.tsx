"use client";
import React from "react";
import styles from "./Route.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "@/app/components/Header/Header";
import Image from "next/image";
import ArrowIcon from "../../assets/arrowRight.svg";
import ShareIcon from "../../assets/share.svg";
import PersonIcon from "../../assets/person.svg";
import CheckpointCard from "@/app/components/CheckpointCard/CheckpointCard";
import ProfileIcon from "../../assets/profile.svg";
import VerifyIcon from "../../assets/verify.svg";
import Link from "next/link";

const accessOptions = [
  { name: "child", checked: true },
  { name: "pet", checked: false },
  { name: "wheelchair", checked: false },
  { name: "pram-friendly", checked: false },
];

const checkpointsData = [
  {
    name: "The Henderson",
    imageUrl: "",
    address: "2 Murray Road, Central",
    checkpointNumber: 1,
  },
  { name: "Second", imageUrl: "", address: "Ipsum", checkpointNumber: 2 },
  { name: "Third", imageUrl: "", address: "Lorem", checkpointNumber: 3 },
  { name: "Fourth", imageUrl: "", address: "Ipsum", checkpointNumber: 4 },
];

function Route({ params }: { params: { id: string } }) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <Header />
        <div className={styles.routeContent}>
          <div className={styles.routeHeader}>
            <Link href={"/dashboard"} className={styles.back}>
              <Image
                alt="arrow"
                src={ArrowIcon}
                style={{ rotate: "180deg" }}
                height={14}
                width={14}
              />{" "}
              Back to list
            </Link>
            <div className={styles.share}>
              <Image alt="share" src={ShareIcon} height={18} width={18} />
              Share
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}></div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>5.75 km</div>
                    <div className={styles.infoLabel}>Distance</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>3.5 - 4 hours</div>
                    <div className={styles.infoLabel}>Estimated Duration</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>Point to Point</div>
                    <div className={styles.infoLabel}>Route Type</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>Easy</div>
                    <div className={styles.infoLabel}>Difficulty</div>
                  </div>
                </div>
              </div>
              <div className={styles.accessibility}>
                <div className={styles.accessTitle}>Accessibility</div>
                {accessOptions.map((option, index) => (
                  <label key={index} className={styles.accessOption}>
                    <span className={styles.label}>
                      {option.name.charAt(0).toUpperCase() +
                        option.name.slice(1)}
                    </span>
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => {}}
                      className={styles.hiddenCheckbox}
                    />
                    <span className={styles.customCheckbox}>
                      {option.checked ? "✔" : "−"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.descriptionSection}>
            <div className={styles.routeTitle}>
              Architecture Walk from Central to Wan Chai
            </div>
            <div className={styles.city}>
              {/* {routeData.city} | {routeData.start} –&gt; {routeData.end} */}
              Hong Kong | Central –&gt; Wan Chai
            </div>
            <div className={styles.steps}>
              <Image alt="person" src={PersonIcon} height={22} width={22} />
              250
            </div>
            <div className={styles.fullDescription}>
              <div className={styles.descTitle}>Description</div>
              <div className={styles.audioBox}></div>
              <div className={styles.descText}>
                This small fairytale island will leave you breathless at first
                sight. Only a few minutes drive from the island of Vis, is a
                place that should be in your travel plan. Its name is Host and
                it is located at the very entrance to the Gulf of Vis. It offers
                a view of the open sea and the port of Vis. Arriving on this
                unique island, either by private boat or organized transfer,
                where the view reaches the crystal clear sea, you will feel the
                peace that will make your vacation unforgettable.
              </div>
              <div className={styles.textToggle}>More</div>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.map}>Map goes here</div>
          </div>
          <div className={styles.checkpointSection}>
            <div className={styles.checkpointTitle}>
              <span className={styles.checkPointNum}>5</span> Checkpoints
            </div>
            <div className={styles.checkpointsContainer}>
              {checkpointsData.map((checkpoint, index) => (
                <CheckpointCard key={index} checkpointData={checkpoint} />
              ))}
            </div>
          </div>
          <div className={styles.userSection}>
            <div className={styles.publishDate}>Published 31 October, 2024</div>
            <div className={styles.userProfile}>
              <div className={styles.profile}>
                <Image alt="profile" src={ProfileIcon} /> Sean Kwok
                <Image alt="verify" src={VerifyIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Route;
