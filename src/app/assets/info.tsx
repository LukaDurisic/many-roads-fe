import React from "react";

interface InfoProps {
  stroke: string;
  width: number;
  height: number;
}

const InfoIcon: React.FC<InfoProps> = ({ stroke, width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 15.5V11.5M11 7.5H11.01M21 11.5C21 17.0228 16.5228 21.5 11 21.5C5.47715 21.5 1 17.0228 1 11.5C1 5.97715 5.47715 1.5 11 1.5C16.5228 1.5 21 5.97715 21 11.5Z"
      stroke={stroke}
      strokeWidth="1.52"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default InfoIcon;
