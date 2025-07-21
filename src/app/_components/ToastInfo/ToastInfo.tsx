"use client";
import React, { useEffect } from "react";
import styles from "./ToastInfo.module.css";
import Image from "next/image";
import CheckIcon from "@/app/assets/greenCheck.svg";
import XIcon from "@/app/assets/redX.svg";

function ToastInfo({
  content,
  check,
  onClose,
}: {
  content: string;
  check: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          className={styles.icon}
          src={check ? CheckIcon : XIcon}
          alt="icon"
        />
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  );
}

export default ToastInfo;
