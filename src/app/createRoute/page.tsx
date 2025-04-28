"use client";
import React, { useState } from "react";
import styles from "./CreateRoute.module.css";
import Navbar from "../_components/Navbar/Navbar";
import UserMenu from "../_components/UserMenu/UserMenu";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Button from "../_components/Button/Button";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Route } from "../_types";

function CreateRoute() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, setValue, watch, getValues, control } =
    useForm<Route>({
      defaultValues: {
        name: "",
        accessibility: [],
        attractions: [
          {
            id: 0,
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

  const onSubmit: SubmitHandler<Route> = (data) => {
    console.log(data);
  };

  const { append, remove } = useFieldArray({
    control,
    name: "attractions",
  });

  return (
    <div className={styles.wrapper}>
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
            />
          ) : currentStep === 2 ? (
            <Step2
              register={register}
              getValues={getValues}
              watch={watch}
              appendAttraction={append}
              remove={remove}
            />
          ) : currentStep === 3 ? (
            <Step3 getValues={getValues} />
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
