"use client";
import React, { useState } from "react";
import styles from "./Route.module.css";
import Navbar from "../../_components/Navbar/Navbar";
import Header from "@/app/_components/Header/Header";
import Image from "next/image";
import ArrowIcon from "../../assets/arrowRight";
import ShareIcon from "../../assets/share.svg";
// import PersonIcon from "../../assets/person.svg";
import CheckpointCard from "@/app/_components/CheckpointCard/CheckpointCard";
import ProfileIcon from "../../assets/profile.svg";
import VerifyIcon from "../../assets/verify.svg";
import Link from "next/link";
import ShareModal from "@/app/_components/ShareModal/ShareModal";
import CheckpointModal from "@/app/_components/CheckpointModal/CheckpointModal";
import Modal from "@/app/_components/Modal/Modal";
import { Route as RouteType } from "@/app/_types";

const accessOptions = [
  { name: "child", checked: true },
  { name: "pet", checked: false },
  { name: "wheelchair", checked: false },
  { name: "pram-friendly", checked: false },
];

// const checkpointsData = [
//   {
//     name: "The Henderson",
//     imageUrl: "",
//     address: "2 Murray Road, Central",
//     checkpointNumber: 1,
//   },
//   { name: "Second", imageUrl: "", address: "Ipsum", checkpointNumber: 2 },
//   { name: "Third", imageUrl: "", address: "Lorem", checkpointNumber: 3 },
//   { name: "Fourth", imageUrl: "", address: "Ipsum", checkpointNumber: 4 },
// ];

// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

//{ params }: RouteParams

//const { id } = await params;

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

const sampleRoute: RouteType = {
  id: 1,
  name: "Historic Victoria Walk",
  description:
    "This small fairytale island will leave you breathless at first sight. Only a few minutes drive from the island of Vis, is a place that should be in your travel plan. Its name is Host and it is located at the very entrance to the Gulf of Vis. It offers a view of the open sea and the port of Vis. Arriving on this unique island, either by private boat or organized transfer, where the view reaches the crystal clear sea, you will feel the peace that will make your vacation unforgettable.",
  start: "Victoria Harbour",
  end: "Beacon Hill Park",
  transport_mode: "walking",
  duration_est: "1h 30m",
  num_of_completed_routes: 234,
  total_attractions: 3,
  distance: "3.2 km",
  difficulty: "easy",
  language: "en",
  country: "Canada",
  audio: "https://example.com/audio/route_intro.mp3",
  categories: ["History", "Culture", "Walking Tour"],
  category: [1, 3],
  tags: ["victoria", "historic", "sightseeing"],
  accessibility: [],
  province: "",
  date_added: "2024-06-15T12:00:00Z",
  type: "Point To Point",
  creator: {
    id: 101,
    username: "historybuff88",
    email: "historybuff@example.com",
    profile_image: "https://example.com/profiles/user101.jpg",
    first_name: "Sean",
    last_name: "Kwok",
  },
  images: [
    {
      image_id: 1,
      route: 1,
      caption: "Scenic view from the harbor",
      source: "user-uploaded",
      url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
    },
  ],
  attractions: [
    {
      id: 10,
      address: "501 Belleville St, Victoria, BC",
      audio: "https://example.com/audio/attraction_legislature.mp3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      name: "BC Legislature",
      needs_upload: false,
      poi: {
        id: 100,
        latitude: 48.4202,
        longitude: -123.3681,
        name: "BC Legislature",
      },
      images: [
        {
          image_id: 2,
          attraction: 10,
          caption: "Parliament Building at dusk 1",
          source: "user-uploaded",
          url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        },
        {
          image_id: 66,
          attraction: 10,
          caption: "Parliament Building at dusk 2",
          source: "user-uploaded",
          url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        },
        {
          image_id: 45,
          attraction: 10,
          caption: "Parliament Building at dusk 3",
          source: "user-uploaded",
          url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        },
      ],
    },
    {
      id: 11,
      address: "1070 Joan Crescent, Victoria, BC",
      audio: "https://example.com/audio/attraction_craigdarroch.mp3",
      content:
        "Craigdarroch Castle is a historic, Victorian-era Scottish Baronial mansion.",
      name: "Craigdarroch Castle",
      needs_upload: false,
      poi: {
        id: 101,
        latitude: 48.4261,
        longitude: -123.3415,
        name: "Craigdarroch Castle",
      },
      images: [
        {
          image_id: 3,
          attraction: 11,
          caption: "Front view of Craigdarroch Castle",
          source: "user-uploaded",
          url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        },
        {
          image_id: 5,
          attraction: 11,
          caption: "Front view of Craigdarroch Castle2",
          source: "user-uploaded",
          url: "/media/images/POI00-01C_H7LWTzx.jpg",
        },
        {
          image_id: 39,
          attraction: 11,
          caption: "Front view of Craigdarroch Castle3",
          source: "user-uploaded",
          url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        },
        {
          image_id: 49,
          attraction: 11,
          caption: "Front view of Craigdarroch Castle 4",
          source: "user-uploaded",
          url: "/media/images/POI00-01C_H7LWTzx.jpg",
        },
      ],
    },
  ],
  directions: [
    {
      id: 1,
      origin: 100,
      destination: 101,
      points: "encodedPolylineHere",
    },
  ],
  ratings: [
    {
      id: 5001,
      value: "5",
      comment: "Amazing route, well organized and informative!",
      date_added: "2024-06-18T15:23:00Z",
      first_name: "Jamie",
      last_name: "Lee",
      author: {
        id: 202,
        username: "jamielee23",
        email: "jamie@example.com",
        profile_image: "https://example.com/profiles/jamie.jpg",
        first_name: "Jamie",
        last_name: "Lee",
      },
    },
  ],
};

function Route() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCheckpointOpen, setIsCheckpointOpen] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);

  return (
    <div className={styles.wrapper}>
      {isShareOpen && (
        <Modal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)}>
          <ShareModal />
        </Modal>
      )}
      {isCheckpointOpen && (
        <Modal
          isOpen={isCheckpointOpen}
          onClose={() => setIsCheckpointOpen(false)}
        >
          <CheckpointModal
            checkpointNumber={activeCheckpoint}
            setCheckpointNumber={setActiveCheckpoint}
            checkpointData={sampleRoute.attractions}
          />
        </Modal>
      )}
      <Navbar />
      <div className={styles.contentWrapper}>
        <Header />
        <div className={styles.routeContent}>
          <div className={styles.routeHeader}>
            <Link href={"/dashboard"} className={styles.back}>
              <span className={styles.spanRotated}>
                <ArrowIcon fill="#757575" height={14} width={14} />
              </span>{" "}
              Back to list
            </Link>
            <div className={styles.share} onClick={() => setIsShareOpen(true)}>
              <Image alt="share" src={ShareIcon} height={18} width={18} />
              Share
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                  sampleRoute.images[0].url
                }
                alt="background image"
                width={1000}
                height={1000}
                className={styles.bgImage}
              />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>{sampleRoute.distance}</div>
                    <div className={styles.infoLabel}>Distance</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {sampleRoute.duration_est}
                    </div>
                    <div className={styles.infoLabel}>Estimated Duration</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>{sampleRoute.type}</div>
                    <div className={styles.infoLabel}>Route Type</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>{sampleRoute.difficulty}</div>
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
            <div className={styles.routeTitle}>{sampleRoute.name}</div>
            <div className={styles.city}>
              {sampleRoute.country} | {sampleRoute.start} –&gt;{" "}
              {sampleRoute.end}
            </div>
            {/* <div className={styles.steps}>
              <Image alt="person" src={PersonIcon} height={22} width={22} />
              2500
            </div> */}

            <div className={styles.fullDescription}>
              <div className={styles.descTitle}>Description</div>
              <audio
                className={styles.audioBox}
                controls
                src={
                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                  "/media/route_audio/156-year_History_of_the_City_of_Victoria-audio_ugh1ZvF.mp3"
                }
              ></audio>
              <div className={styles.descText}>{sampleRoute.description}</div>

              <div className={styles.textToggle}>More</div>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.map}>Map goes here!</div>
          </div>
          <div className={styles.checkpointSection}>
            <div className={styles.checkpointTitle}>
              <span className={styles.checkPointNum}>
                {sampleRoute.attractions.length}
              </span>{" "}
              Checkpoints
            </div>
            <div className={styles.checkpointsContainer}>
              {sampleRoute.attractions.map((checkpoint, index) => (
                <CheckpointCard
                  key={index}
                  checkpointData={checkpoint}
                  onClick={() => {
                    setIsCheckpointOpen(true);
                    setActiveCheckpoint(index);
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.userSection}>
            <div className={styles.publishDate}>
              Published {formatDate(sampleRoute.date_added)}
            </div>
            <div className={styles.userProfile}>
              <div className={styles.profile}>
                <Image alt="profile" src={ProfileIcon} />{" "}
                {sampleRoute.creator.first_name +
                  " " +
                  sampleRoute.creator.last_name}
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
