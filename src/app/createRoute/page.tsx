"use client";
import React, { useState, useEffect } from "react";
import styles from "./CreateRoute.module.css";
import Navbar from "../_components/Navbar/Navbar";
import UserMenu from "../_components/UserMenu/UserMenu";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Button from "../_components/Button/Button";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Image, Route, AttractionImages, PreviewAttraction } from "../_types";
import { uploadImage, createRoute } from "../_services/client-api-requests";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

function CreateRoute() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [routeImages, setRouteImages] = useState<File[]>([]);
  const [attractionImages, setAttractionImages] = useState<AttractionImages[]>(
    []
  );
  const [authToken, setAuthToken] = useState<string>("");
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [previewRoute, setPreviewRoute] = useState<string[]>([]);
  const [previewAttractions, setPreviewAttractions] = useState<
    PreviewAttraction[]
  >([]);
  const { register, handleSubmit, setValue, watch, getValues, control } =
    useForm<Route>({
      defaultValues: {
        name: "",
        accessibility: [],
        attractions: [
          {
            address: "",
            audio: "",
            content: "",
            images: [],
            name: "",
            needs_upload: false,
            poi: {
              latitude: 0,
              longitude: 0,
              name: "",
              id: 0,
            },
          },
        ],
        audio: "",
        categories: [],
        category: [],
        country: "",
        creator: {},
        date_added: "",
        description: "",
        difficulty: "",
        directions: [],
        distance: "",
        duration_est: "",
        end: "",
        images: [],
        language: "",
        num_of_completed_routes: 0,
        ratings: [],
        start: "",
        tags: [],
        total_attractions: 0,
        transport_mode: "",
        type: "",
        province: "",
      },
    });

  const router = useRouter();

  useEffect(() => {
    const storedValue = localStorage.getItem("accessToken");
    if (storedValue) {
      setAuthToken(storedValue);
    }
  }, []);

  const onSubmit: SubmitHandler<Route> = async (data) => {
    setIsLoadingOpen(true);
    const uploads = await Promise.all(
      routeImages.map(async (img) => {
        const formData = new FormData();
        formData.append("image", img);
        const upload = await uploadImage(formData, authToken);
        return {
          caption: ".",
          image_id: upload.image_id || 1,
          source: "user",
          url: ".",
        };
      })
    );
    data.images = uploads;

    const updatedAttractions = await Promise.all(
      attractionImages.map(async (img) => {
        let heroImg: Image | null = null;

        if (img.heroImage) {
          const formDataHero = new FormData();
          formDataHero.append("image", img.heroImage);
          const upload = await uploadImage(formDataHero, authToken);
          heroImg = {
            caption: ".",
            image_id: upload.image_id || 1,
            source: "userHero",
            url: ".",
          };
        }

        const galleryImgs = await Promise.all(
          img.images.map(async (image) => {
            const formData = new FormData();
            formData.append("image", image);
            const upload = await uploadImage(formData, authToken);
            return {
              caption: ".",
              image_id: upload.image_id || 1,
              source: "user",
              url: ".",
            };
          })
        );

        return heroImg ? [heroImg, ...galleryImgs] : galleryImgs;
      })
    );

    updatedAttractions.forEach((images, index) => {
      data.attractions[index].images = images;
    });

    const createBody = {
      name: data.name,
      language: data.language || "",
      type: data.type,
      country: data.country,
      difficulty: data.difficulty,
      route_gallery: data.images,
      duration: data.duration_est,
      categories: data.categories,
      classification: data.categories,
      tags: data.categories,
      accessibility: data.accessibility.join(","),
      description: data.description,
      distance: data.distance,
      start: data.attractions[0].address,
      end: data.attractions[data.attractions.length - 1].address,
      checkpoints: data.attractions.map((attraction) => ({
        name: attraction.name,
        content: attraction.content,
        address: attraction.address.split(",")[0],
        checkpoint_gallery: attraction.images.map((img) => ({
          caption: img.caption,
          image_id: img.image_id,
          source: img.source,
          url: img.url,
        })),
        coordinates: {
          latitude: attraction.poi.latitude,
          longitude: attraction.poi.longitude,
        },
      })),
    };
    const newRoute = await createRoute(createBody, authToken);
    setIsLoadingOpen(false);
    if (newRoute) {
      router.push("/dashboard");
    } else {
      alert("Route creation failed!");
    }
  };

  const { append, remove } = useFieldArray({
    control,
    name: "attractions",
  });

  return (
    <div className={styles.wrapper}>
      {isLoadingOpen && (
        <div className={styles.loadingModal}>
          <ClipLoader color={"#fff"} size={40} />
        </div>
      )}
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.createHeader}>
          <div className={styles.createTitle}>Create new route</div>
          <UserMenu />
        </div>
        <div className={styles.stepsPreview}>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>
              {currentStep === 1 ? "1" : "✔"}
            </div>{" "}
            General info
          </div>
          <div className={styles.line}></div>
          <div className={styles.stepItem}>
            <div
              className={
                currentStep === 1 ? styles.notActive : styles.stepNumber
              }
            >
              {currentStep !== 3 ? "2" : "✔"}
            </div>
            Checkpoints
          </div>
          <div className={styles.line}></div>
          <div className={styles.stepItem}>
            <div
              className={
                currentStep !== 3 ? styles.notActive : styles.stepNumber
              }
            >
              3
            </div>
            Overview
          </div>
        </div>
        <div className={styles.stepContentContainer}>
          {currentStep === 1 ? (
            <Step1
              register={register}
              getValues={getValues}
              watch={watch}
              setValue={setValue}
              setRouteImages={setRouteImages}
              previewRoute={previewRoute}
              setPreviewRoute={setPreviewRoute}
            />
          ) : currentStep === 2 ? (
            <Step2
              register={register}
              getValues={getValues}
              watch={watch}
              appendAttraction={append}
              remove={remove}
              setValue={setValue}
              setAttractionImages={setAttractionImages}
              previewAttractions={previewAttractions}
              setPreviewAttractions={setPreviewAttractions}
            />
          ) : currentStep === 3 ? (
            <Step3
              getValues={getValues}
              previewRoute={previewRoute}
              previewAttractions={previewAttractions}
            />
          ) : (
            "Invalid step"
          )}
        </div>
        <div className={styles.routing}>
          {currentStep === 1 ? (
            <div className={styles.step1Btn}>
              <Button
                label="Next ->"
                className={styles.nextBtn}
                onClick={() => setCurrentStep(2)}
              />
            </div>
          ) : currentStep === 2 ? (
            <div className={styles.step23Btn}>
              <Button
                label="<- Previous"
                onClick={() => setCurrentStep(1)}
                className={styles.prevBtn}
              />
              <Button
                label="Next ->"
                onClick={() => setCurrentStep(3)}
                className={styles.nextBtn}
              />
            </div>
          ) : currentStep === 3 ? (
            <div className={styles.step23Btn}>
              <Button
                label="<- Previous"
                className={styles.prevBtn}
                onClick={() => setCurrentStep(2)}
              />
              <Button
                label="Publish"
                className={styles.nextBtn}
                // href="/dashboard"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CreateRoute;
