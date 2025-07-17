import React, { useState, useRef } from "react";
import styles from "./AudioInput.module.css";
import Image from "next/image";
import AudioIcon from "@/app/assets/audioFile.svg";
import EmptyAudioIcon from "@/app/assets/emptyAudio.svg";

interface AudioInputProps {
  label: string;
}

function AudioInput({ label }: AudioInputProps) {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAllowedExtension = /\.(mp3|mp5)$/i.test(file.name);
    const isWithinSize = file.size <= 2 * 1024 * 1024; // 2MB privremen0

    if (isAllowedExtension && isWithinSize) {
      setSelectedFile(file);
    } else {
      alert("Only .mp3 or .mp5 files under 2MB are allowed."); //modal ili nešto za velik size
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.container}>
        {!selectedFile ? (
          <>
            <div className={styles.empty} onClick={handleClick}>
              <Image alt="audio" src={EmptyAudioIcon} />
              <div className={styles.emptyText}>
                <div className={styles.title}>Select an audio file</div>
                <div className={styles.description}>
                  File size no more than 2MB
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.mp5"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </>
        ) : (
          <div className={styles.file}>
            <div className={styles.close} onClick={() => setSelectedFile(null)}>
              ×
            </div>
            <div className={styles.fileName}>
              <Image alt="audio" src={AudioIcon} />
              {selectedFile.name}
            </div>
            <div className={styles.mb}>
              {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioInput;
