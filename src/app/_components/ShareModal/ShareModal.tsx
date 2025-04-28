"use client";
import React, { useState } from "react";
import styles from "./ShareModal.module.css";
import RouteCard from "../RouteCard/RouteCard";
import Button from "../Button/Button";
import { RouteCardProps } from "@/app/_types";

export const sampleRoute: RouteCardProps = {
  id: 1,
  name: "Historic Victoria Walk",
  start: "Victoria Harbour",
  end: "Beacon Hill Park",
  duration_est: "1h 30m",
  num_of_completed_routes: 234,
  total_attractions: 3,
  distance: "3.2 km",
  country: "Canada",
  tags: ["victoria", "historic", "sightseeing"],
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
      id: 1,
      route: 1,
      caption: "Scenic view from the harbor",
      source: "user-uploaded",
      url: "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
    },
  ],
};

function ShareModal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>Share this route</div>
      <RouteCard
        routeData={sampleRoute}
        isProfileShowing={true}
        isClickable={false}
      />
      <Button label="Copy link" onClick={handleCopy} />
      {copied && <p className={styles.alert}>Link copied</p>}
    </div>
  );
}

export default ShareModal;
