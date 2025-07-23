import React from "react";

interface ArrProps {
  stroke: string;
  height: string;
  width: string;
  style?: React.CSSProperties;
}

const ArrDown: React.FC<ArrProps> = ({ stroke, height, width, style }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M13 8.16211L7 2.16211L1 8.16211"
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinecap={"round"}
    />
  </svg>
);

export default ArrDown;
