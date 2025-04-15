"use client";
import React, { useState } from "react";
import styles from "./CreateRoute.module.css";
import Navbar from "../components/Navbar/Navbar";
import UserMenu from "../components/UserMenu/UserMenu";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Button from "../components/Button/Button";

function CreateRoute() {
  const [currentStep, setCurrentStep] = useState(1);
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
            <Step1 />
          ) : currentStep === 2 ? (
            <Step2 />
          ) : currentStep === 3 ? (
            <Step3 />
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
                href="/dashboard"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CreateRoute;
