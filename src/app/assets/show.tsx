import React from "react";

interface ShowProps {
  stroke: string;
  height: number;
  width: number;
}

const ShowIcon: React.FC<ShowProps> = ({ stroke, height, width }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.00006 9C1.00006 9 5.00006 1 12.0001 1C19.0001 1 23.0001 9 23.0001 9C23.0001 9 19.0001 17 12.0001 17C5.00006 17 1.00006 9 1.00006 9Z"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.0001 12C13.6569 12 15.0001 10.6569 15.0001 9C15.0001 7.34315 13.6569 6 12.0001 6C10.3432 6 9.00006 7.34315 9.00006 9C9.00006 10.6569 10.3432 12 12.0001 12Z"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShowIcon;
