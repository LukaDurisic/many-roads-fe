import React, { useState, useRef } from "react";
import styles from "./ReviewSection.module.css";
import Star from "@/app/assets/star";
import FlagIcon from "@/app/assets/flag.svg";
import FlagFilledIcon from "@/app/assets/flagFilled.svg";
import EmptyStar from "@/app/assets/emptyStar.svg";
import CheckTrue from "@/app/assets/checkTrue.svg";
import Button from "@/app/_components/Button/Button";
import CustomInput from "@/app/_components/CustomInput/CustomInput";
import AddImgIcon from "@/app/assets/addImage.svg";
import { Review } from "@/app/_types";
import Image from "next/image";
import Gallery from "@/app/_components/Gallery/Gallery";
import ReviewErrorModal from "@/app/_components/ReviewErrorModal/ReviewErrorModal";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

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
        "/media/images/Battle_of_the_Egg_Tarts_-_Causeway_Bay_765.jpeg",
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

function ReviewSection() {
  const { t } = useTranslation();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [reviewFileImages, setReviewFileImages] = useState<File[]>([]);
  const [isReviewSuccessOpen, setIsReviewSuccessOpen] = useState(false);
  const [isReportedShowing, setIsReportedShowing] = useState<{
    [key: string]: boolean;
  }>({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedReviewImgs, setSelectedReviewImgs] = useState<string[]>([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [isReviewErrorOpen, setIsReviewErrorOpen] = useState(false);

  const handleReportClick = (review: Review) => {
    if (review.isReported) {
      setIsReportedShowing((prev) => ({ ...prev, [review.id]: true }));

      setTimeout(() => {
        setIsReportedShowing((prev) => ({ ...prev, [review.id]: false }));
      }, 3000);
    }
  };

  const handleSubmitReviewClick = () => {
    setIsReviewOpen(false);
    setIsReviewSuccessOpen(true);
    setTimeout(() => {
      setIsReviewSuccessOpen(false);
    }, 3000);
  };

  console.log(reviewFileImages);

  const handleImageDelete = (index: number) => {
    setReviewImages((prev) => prev.filter((_, i) => i !== index));
    setReviewFileImages((prev) => prev.filter((_, i) => i !== index));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

      setReviewImages((prev) => [...prev, ...newPreviews].slice(0, 3));
      setReviewFileImages((prev) => [...prev, ...fileArray].slice(0, 3));
    }
  };

  const cleanReview = () => {
    setReviewImages([]);
    setReviewFileImages([]);
    setReviewDescription("");
    setReviewRating(0);
    setIsReviewOpen(false);
  };

  return (
    <div className={styles.reviewsContainer}>
      {isImageOpen && (
        <Modal isOpen={isImageOpen} onClose={() => setIsImageOpen(false)}>
          <Gallery
            activeImage={activeImage}
            imageUrls={selectedReviewImgs}
            isNumberShowing={false}
            isSliderLeft
            setActiveImage={setActiveImage}
          />
        </Modal>
      )}
      {isReviewErrorOpen && (
        <Modal
          isOpen={isReviewErrorOpen}
          onClose={() => setIsReviewErrorOpen(false)}
        >
          <ReviewErrorModal />
        </Modal>
      )}
      <div className={styles.reviewHeader}>
        <div className={styles.average}>
          {reviewsData.average} <Star fill="#0d0d0d" height={24} width={20} />
        </div>
        <div className={styles.revCount}>
          {reviewsData.reviewsCount}{" "}
          {t("review", { count: reviewsData.reviewsCount })}
        </div>
        <div className={styles.revBtnContainer}>
          <Button
            label={t("reviewRoute")}
            onClick={() => setIsReviewOpen(true)}
          />
        </div>
      </div>
      <div className={styles.reviews}>
        {isReviewOpen && (
          <div className={styles.createRevWrapper}>
            <div className={styles.userData}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_MANY_ROADS_IMG +
                  reviewsData.reviews[0].profileImg
                }
                alt="profile image"
                className={styles.userImg}
                height={48}
                width={48}
              />
              <div className={styles.userRight}>
                <div className={styles.username}>
                  {reviewsData.reviews[0].username}
                </div>
              </div>
            </div>
            <div className={styles.rating}>
              <div className={styles.ratingTitle}>{t("rateRoute")}</div>
              <div className={styles.ratingStars}>
                {Array.from({ length: reviewRating }).map((_, index) => (
                  <div
                    className={styles.ratingStarsDiv}
                    key={index}
                    onClick={() => setReviewRating(index + 1)}
                  >
                    <Star key={index} width={25} height={25} fill="#FFDD00" />
                  </div>
                ))}

                {Array.from({ length: 5 - reviewRating }).map((_, index) => (
                  <div
                    className={styles.ratingStarsDiv}
                    key={index}
                    onClick={() => setReviewRating(reviewRating + index + 1)}
                  >
                    <Image src={EmptyStar} alt="star" width={24} height={24} />
                  </div>
                ))}
              </div>
            </div>
            <CustomInput
              label={t("revDesc")}
              placeholder={t("revDesc")}
              onChange={setReviewDescription}
              value={reviewDescription}
              isFullLength
            />
            <div className={styles.descriptionLength}>
              {reviewDescription.length}/300
            </div>
            <div className={styles.revImages}>
              <div className={styles.ratingTitle}>
                {t("addImage")} ({reviewImages.length}/3)
              </div>
            </div>
            <div className={styles.imageUpload}>
              <div className={styles.imageGrid}>
                {reviewImages.map((preview, index) => (
                  <div
                    key={index}
                    className={styles.imageBox}
                    onClick={() => handleImageDelete(index)}
                  >
                    <Image
                      src={preview}
                      alt={`uploaded preview ${index}`}
                      width={300}
                      height={200}
                      className={styles.previewImage}
                    />
                  </div>
                ))}

                {reviewImages.length < 3 && (
                  <div
                    className={`${styles.imageBox} ${styles.noAfter}`}
                    onClick={handleImageBoxClick}
                  >
                    <div className={styles.addImageBox}>
                      <Image
                        alt="add image icon"
                        src={AddImgIcon}
                        height={30}
                        width={30}
                      />
                    </div>
                  </div>
                )}
              </div>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>
            <div className={styles.reviewBtnsContainer}>
              <div className={styles.reviewCancel} onClick={cleanReview}>
                {t("cancel")}
              </div>
              <div className={styles.reviewSubmit}>
                <Button
                  label={t("submitReview")}
                  onClick={handleSubmitReviewClick}
                />
              </div>
            </div>
          </div>
        )}
        {isReviewSuccessOpen && (
          <div className={styles.reviewTooltip}>
            <Image src={CheckTrue} alt="check true" />
            {t("reviewSubmited")}
          </div>
        )}
        {showAllReviews
          ? reviewsData.reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.userData}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MANY_ROADS_IMG + review.profileImg
                    }
                    alt="profile image"
                    className={styles.userImg}
                    height={48}
                    width={48}
                  />
                  <div className={styles.userRight}>
                    <div className={styles.username}>{review.username}</div>
                    <div className={styles.bottomContainer}>
                      {Array.from({ length: review.stars }).map((_, index) => (
                        <Star
                          key={index}
                          width={18}
                          height={18}
                          fill="#FFDD00"
                        />
                      ))}
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
                        src={process.env.NEXT_PUBLIC_MANY_ROADS_IMG + img}
                        alt="review image"
                        height={116}
                        width={77}
                        className={styles.reviewImg}
                        key={index}
                        onClick={() => {
                          setIsImageOpen(true);
                          setActiveImage(index);
                          setSelectedReviewImgs(review.images);
                        }}
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
                  {t("report")}
                  {isReportedShowing[review.id] && (
                    <div className={styles.reportTooltip}>{t("reported")}</div>
                  )}
                </div>
              </div>
            ))
          : reviewsData.reviews.slice(0, 2).map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.userData}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_MANY_ROADS_IMG + review.profileImg
                    }
                    alt="profile image"
                    className={styles.userImg}
                    height={48}
                    width={48}
                  />
                  <div className={styles.userRight}>
                    <div className={styles.username}>{review.username}</div>
                    <div className={styles.bottomContainer}>
                      {Array.from({ length: review.stars }).map((_, index) => (
                        <Star
                          key={index}
                          width={18}
                          height={18}
                          fill="#FFDD00"
                        />
                      ))}
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
                        src={process.env.NEXT_PUBLIC_MANY_ROADS_IMG + img}
                        alt="review image"
                        height={116}
                        width={77}
                        className={styles.reviewImg}
                        key={index}
                        onClick={() => {
                          setIsImageOpen(true);
                          setActiveImage(index);
                          setSelectedReviewImgs(review.images);
                        }}
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
                  {t("report")}
                  {isReportedShowing[review.id] && (
                    <div className={styles.reportTooltip}>{t("reported")}</div>
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
            {t("showAllReviews")}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewSection;
