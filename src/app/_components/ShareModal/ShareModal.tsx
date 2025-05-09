"use client";
import React, { useState } from "react";
import styles from "./ShareModal.module.css";
import RouteCard from "../RouteCard/RouteCard";
import Button from "../Button/Button";
import { RouteCardProps, Route } from "@/app/_types";

function ShareModal({ data }: { data: Route | undefined }) {
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

  const routeInfo: RouteCardProps = {
    id: data?.id || 1,
    name: data?.name || "No name",
    start: data?.start || "No info",
    end: data?.end || "No info",
    duration_est: data?.duration_est || "No info",
    num_of_completed_routes: 1, //vidit šta s tim brojem
    total_attractions: data?.attractions.length || 0,
    distance: data?.distance || "No info",
    country: data?.country || "No info",
    categories: data?.categories || [],
    tags: data?.tags || [],
    creator: {
      id: data?.creator.id || 1,
      username:
        data?.creator.first_name + " " + data?.creator.last_name || "No info",
      email: data?.creator.email || "No info",
      profile_image: data?.creator.profile_image || "No info",
      first_name: data?.creator.first_name || "No info",
      last_name: data?.creator.last_name || "No info",
    },
    images: [
      {
        image_id: data?.images[0].image_id || 1,
        route: data?.images[0].route || 1,
        caption: data?.images[0].caption || "No caption",
        source: data?.images[0].source || "No source",
        url: data?.images[0].url || "No url",
      },
    ],
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>Share this route</div>
      <RouteCard
        routeData={routeInfo}
        isProfileShowing={true}
        isClickable={false}
      />
      <Button label="Copy link" onClick={handleCopy} />
      {copied && <p className={styles.alert}>Link copied</p>}
    </div>
  );
}

export default ShareModal;
