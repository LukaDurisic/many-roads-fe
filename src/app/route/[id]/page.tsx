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
import Star from "@/app/assets/star";
import FlagIcon from "@/app/assets/flag.svg";
import FlagFilledIcon from "@/app/assets/flagFilled.svg";

const accessOptions = [
  { name: "child", checked: true },
  { name: "pet", checked: false },
  { name: "wheelchair", checked: false },
  { name: "pram-friendly", checked: false },
];

const reviewsData = {
  average: 4.5,
  reviewsCount: 245,
  reviews: [
    {
      id: 1,
      username: "Amanda Big",
      stars: 4,
      createdAt: "1 month ago",
      description:
        "This urban walking route offers a rich and engaging journey through some of Hong Kong’s most iconic architectural landscapes. Starting in the historic heart of Central, the walk weaves past colonial-era buildings, sleek modern skyscrapers, and tucked-away heritage gems as it moves toward Wan Chai.",
      profileImg:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      images: [
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      ],
      isReported: true,
    },
    {
      id: 2,
      username: "Sing Chan",
      stars: 5,
      createdAt: "2 days ago",
      description:
        "An easy walk that cycles around some of the most iconic architectures in the city. Now I’ve learnt to appreciate historic sites even more.",
      profileImg:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      images: [],
      isReported: false,
    },
    {
      id: 3,
      username: "Sing Chan 2",
      stars: 5,
      createdAt: "2 days ago",
      description:
        "An easy walk that cycles around some of the most iconic architectures in the city. Now I’ve learnt to appreciate historic sites even more.",
      profileImg:
        "/media/images/156-year_History_of_the_City_of_Victoria-image_3H6uIjj.jpg",
      images: [],
      isReported: false,
    },
  ],
};

interface RoutePageProps {
  params: Promise<{
    id: string;
  }>;
}

function Route({ params }: RoutePageProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [isCheckpointOpen, setIsCheckpointOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);

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

  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [isReportedShowing, setIsReportedShowing] = useState<{
    [key: string]: boolean;
  }>({});

  const showMoreButtonVisible =
    data?.description && data?.description.length > 200;

  useEffect(() => {
    if (!data?.images || data.images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const handleReportClick = (review: any) => {
    if (review.isReported) {
      setIsReportedShowing((prev) => ({ ...prev, [review.id]: true }));

      setTimeout(() => {
        setIsReportedShowing((prev) => ({ ...prev, [review.id]: false }));
      }, 3000);
    }
  };

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
              Back to list
            </Link>
            <div className={styles.share} onClick={() => setIsShareOpen(true)}>
              <Image alt="share" src={ShareIcon} height={18} width={18} />
              Share
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
                    <div className={styles.infoLabel}>Distance</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {data?.duration_est || "N/A"}
                    </div>
                    <div className={styles.infoLabel}>Estimated Duration</div>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>{data?.type || "N/A"}</div>
                    <div className={styles.infoLabel}>Route Type</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.data}>
                      {data?.difficulty || "N/A"}
                    </div>
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
              <div className={styles.descTitle}>Description</div>
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
                  {!isDescriptionOpen ? "More" : "Less"}
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
              Checkpoints
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
            <div className={styles.reviewsContainer}>
              <div className={styles.reviewHeader}>
                <div className={styles.average}>
                  {reviewsData.average}{" "}
                  <Star fill="#0d0d0d" height={24} width={20} />
                </div>
                <div className={styles.revCount}>
                  {reviewsData.reviewsCount}{" "}
                  {reviewsData.reviewsCount === 1 ? "review" : "reviews"}
                </div>
              </div>
              <div className={styles.reviews}>
                {showAllReviews
                  ? reviewsData.reviews.map((review) => (
                      <div key={review.id} className={styles.review}>
                        <div className={styles.userData}>
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                              review.profileImg
                            }
                            alt="profile image"
                            className={styles.userImg}
                            height={48}
                            width={48}
                          />
                          <div className={styles.userRight}>
                            <div className={styles.username}>
                              {review.username}
                            </div>
                            <div className={styles.bottomContainer}>
                              {Array.from({ length: review.stars }).map(
                                (_, index) => (
                                  <Star
                                    key={index}
                                    width={18}
                                    height={18}
                                    fill="#FFDD00"
                                  />
                                )
                              )}
                              {review.createdAt}
                            </div>
                          </div>
                        </div>
                        <div className={styles.revDescription}>
                          {review.description}
                        </div>
                        {review.images.length > 0 && (
                          <div className={styles.reviewImagesContainer}>
                            {review.images.map((img, index) => (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG + img
                                }
                                alt="review image"
                                height={116}
                                width={77}
                                className={styles.reviewImg}
                                key={index}
                              />
                            ))}
                          </div>
                        )}
                        <div
                          className={styles.report}
                          onClick={() => handleReportClick(review)}
                        >
                          {review.isReported ? (
                            <Image src={FlagIcon} alt="flag icon" />
                          ) : (
                            <Image src={FlagFilledIcon} alt="flag icon" />
                          )}
                          Report
                          {isReportedShowing[review.id] && (
                            <div className={styles.reportTooltip}>
                              Review reported!
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : reviewsData.reviews.slice(0, 2).map((review) => (
                      <div key={review.id} className={styles.review}>
                        <div className={styles.userData}>
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                              review.profileImg
                            }
                            alt="profile image"
                            className={styles.userImg}
                            height={48}
                            width={48}
                          />
                          <div className={styles.userRight}>
                            <div className={styles.username}>
                              {review.username}
                            </div>
                            <div className={styles.bottomContainer}>
                              {Array.from({ length: review.stars }).map(
                                (_, index) => (
                                  <Star
                                    key={index}
                                    width={18}
                                    height={18}
                                    fill="#FFDD00"
                                  />
                                )
                              )}
                              {review.createdAt}
                            </div>
                          </div>
                        </div>
                        <div className={styles.revDescription}>
                          {review.description}
                        </div>
                        {review.images.length > 0 && (
                          <div className={styles.reviewImagesContainer}>
                            {review.images.map((img, index) => (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG + img
                                }
                                alt="review image"
                                height={116}
                                width={77}
                                className={styles.reviewImg}
                                key={index}
                              />
                            ))}
                          </div>
                        )}
                        <div
                          className={styles.report}
                          onClick={() => handleReportClick(review)}
                        >
                          {review.isReported ? (
                            <Image src={FlagIcon} alt="flag icon" />
                          ) : (
                            <Image src={FlagFilledIcon} alt="flag icon" />
                          )}
                          Report
                          {isReportedShowing[review.id] && (
                            <div className={styles.reportTooltip}>
                              Review reported!
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                {!showAllReviews && (
                  <div
                    className={styles.showAll}
                    onClick={() => {
                      setShowAllReviews(true);
                    }}
                  >
                    Show all reviews
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Route;
