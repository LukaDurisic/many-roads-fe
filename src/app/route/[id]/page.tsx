"use client";
import React, { useEffect, useState } from "react";
import styles from "./Route.module.css";
import Navbar from "../../_components/Navbar/Navbar";
import Header from "@/app/_components/Header/Header";
import Image from "next/image";
import ArrowIcon from "../../assets/arrowRight";
import ShareIcon from "../../assets/share.svg";
import CheckpointCard from "@/app/_components/CheckpointCard/CheckpointCard";
import Link from "next/link";
import ShareModal from "@/app/_components/ShareModal/ShareModal";
import CheckpointModal from "@/app/_components/CheckpointModal/CheckpointModal";
import Modal from "@/app/_components/Modal/Modal";
import {
  getAllRoutes,
  getSingleRoute,
} from "@/app/_services/client-api-requests";
import type { Route } from "@/app/_types";
import Map from "@/app/_components/Map/Map";
import { ClipLoader } from "react-spinners";
import UserInfo from "@/app/_components/UserInfo/UserInfo";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";
import ReviewSection from "@/app/_components/ReviewSection/ReviewSection";

const accessOptions = [
  { name: "Child", checked: true },
  { name: "Pet", checked: false },
  { name: "Wheelchair", checked: false },
  { name: "Pram-friendly", checked: false },
];

interface RoutePageProps {
  params: Promise<{
    id: string;
  }>;
}

function Route({ params }: RoutePageProps) {
  const { t } = useTranslation();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [isCheckpointOpen, setIsCheckpointOpen] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoadingOpen(true);
      const response = await getAllRoutes();
      setRoutes(response.data);
      setIsLoadingOpen(false);
    };

    fetchRoutes();
  }, []);

  const [data, setData] = useState<Route>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const { id } = React.use(params);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const { data } = await getSingleRoute(id);
        seterror(false);
        setData(data);
      } catch (error) {
        console.log(error);
        seterror(true);
      }
    }

    fetchRoute();
  }, [id]);

  const attractions = data?.attractions || [];

  const showMoreButtonVisible =
    data?.description && data?.description.length > 200;

  useEffect(() => {
    if (!data?.images || data.images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className={styles.wrapper}>
      {isShareOpen && (
        <Modal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)}>
          <ShareModal data={data} />
        </Modal>
      )}
      {isLoadingOpen && (
        <div className={styles.loadingModal}>
          <ClipLoader color={"#fff"} size={40} />
        </div>
      )}
      {isCheckpointOpen && (
        <Modal
          isOpen={isCheckpointOpen}
          onClose={() => setIsCheckpointOpen(false)}
        >
          <CheckpointModal
            checkpointNumber={activeCheckpoint}
            setCheckpointNumber={setActiveCheckpoint}
            checkpointData={attractions}
          />
        </Modal>
      )}

      <Navbar />
      <div className={styles.contentWrapper}>
        <Header routes={routes} setRoutes={() => setRoutes} />
        <div className={styles.routeContent}>
          <div className={styles.routeHeader}>
            <Link href={"/dashboard"} className={styles.back}>
              <span className={styles.spanRotated}>
                <ArrowIcon fill="#757575" height={14} width={14} />
              </span>{" "}
              {t("backToList")}
            </Link>
            <div className={styles.share} onClick={() => setIsShareOpen(true)}>
              <Image alt="share" src={ShareIcon} height={18} width={18} />
              {t("share")}
            </div>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              {data?.images && (
                <>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                      data.images[activeIndex].url
                    }
                    alt="background image"
                    width={1000}
                    height={1000}
                    className={styles.bgImage}
                  />

                  <button
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === 0 ? data.images.length - 1 : prev - 1
                      )
                    }
                    className={styles.arrowLeft}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % data.images.length)
                    }
                    className={styles.arrowRight}
                  >
                    ›
                  </button>

                  <div className={styles.indicators}>
                    {data.images.map((_, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`${styles.indicator} ${
                          i === activeIndex ? styles.active : ""
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>{data?.distance || "N/A"}</div>
                    <div className={styles.infoLabel}>{t("distance")}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {data?.duration_est || "N/A"}
                    </div>
                    <div className={styles.infoLabel}>
                      {t("estimatedDuration")}
                    </div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {data?.type ? t(data?.type) : "N/A"}
                    </div>
                    <div className={styles.infoLabel}>{t("routeType")}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {data?.difficulty ? t(data?.difficulty) : "N/A"}
                    </div>
                    <div className={styles.infoLabel}>{t("difficulty")}</div>
                  </div>
                </div>
              </div>
              <div className={styles.accessibility}>
                <div className={styles.accessTitle}>{t("accessibility")}</div>
                {accessOptions.map((option, index) => (
                  <label key={index} className={styles.accessOption}>
                    <span className={styles.label}>{t(option.name)}</span>
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
            {error ? (
              <div className={styles.routeTitle}>Route does not exist</div>
            ) : (
              <div className={styles.routeTitle}>{data?.name || "Unnamed"}</div>
            )}

            <div className={styles.city}>
              {data?.country || "Unknown"} | {data?.start || "?"} –&gt;{" "}
              {data?.end || "?"}
            </div>

            <div className={styles.fullDescription}>
              <div className={styles.descTitle}>{t("description")}</div>
              {/* <audio
                className={styles.audioBox}
                controls
                src={
                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                  "/media/route_audio/156-year_History_of_the_City_of_Victoria-audio_ugh1ZvF.mp3"
                }
              ></audio> */}
              <div
                className={`${styles.description}  ${
                  isDescriptionOpen ? null : styles.close
                }`}
              >
                {data?.description || "No description available."}
              </div>
              {showMoreButtonVisible && (
                <div
                  className={styles.more}
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                  {!isDescriptionOpen ? t("more") : t("less")}
                </div>
              )}
            </div>
          </div>

          <div className={styles.mapSection}>
            <div className={styles.map}>
              {data && <Map tourList={[data]} isSingleRoute />}
            </div>
          </div>

          <div className={styles.checkpointSection}>
            <div className={styles.checkpointTitle}>
              <span className={styles.checkPointNum}>{attractions.length}</span>{" "}
              {t("checkpoints")}
            </div>
            <div className={styles.checkpointsContainer}>
              {attractions
                .sort((x, y) => x.id! - y.id!)
                .map((checkpoint, index) => (
                  <CheckpointCard
                    key={index}
                    index={index}
                    checkpointData={checkpoint}
                    onClick={() => {
                      setIsCheckpointOpen(true);
                      setActiveCheckpoint(index);
                    }}
                  />
                ))}
            </div>
          </div>
          <div className={styles.reviewSection}>
            <div className={styles.userInfo}>
              <UserInfo
                data={{
                  username: data?.creator.username,
                  date_added: data?.date_added,
                  profile_image: data?.creator.profile_image,
                }}
                isInfoShowing={false}
                verify={false}
                date
                variant="small"
              />
            </div>
            <ReviewSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Route;
