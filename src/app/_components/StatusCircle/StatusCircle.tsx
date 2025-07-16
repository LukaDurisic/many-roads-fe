import React from "react";
import styles from "./StatusCircle.module.css";

//interface privremeno tu da se ne traži

interface StatusCircleProps {
  content: string;
  backgroundColor: "red" | "green" | "yellow" | "blank";
  circleSize: number;
  contentSize: number;
  completedPercentage?: number;
  fontColor: "white" | "black";
}

function StatusCircle({
  content,
  backgroundColor,
  circleSize,
  contentSize,
  completedPercentage = 0,
  fontColor,
}: StatusCircleProps) {
  return (
    <div
      className={styles.circleWrapper}
      style={{
        width: circleSize + 4,
        height: circleSize + 4,
        background: `conic-gradient(#9E9E9E ${completedPercentage}%, transparent ${completedPercentage}%)`,
        borderRadius: "50%",
        padding: "2px",
      }}
    >
      <div
        className={styles.background}
        style={{
          backgroundColor:
            backgroundColor === "green"
              ? "#00AF00"
              : backgroundColor === "red"
              ? "#C11A1A"
              : backgroundColor === "yellow"
              ? "#E0C82E"
              : "#F2F2F2",
          width: circleSize,
          height: circleSize,
          fontSize: contentSize,
          color: fontColor,
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default StatusCircle;
