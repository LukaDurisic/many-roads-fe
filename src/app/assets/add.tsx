import React from "react";

interface AddProps {
  stroke: string;
}

const AddIcon: React.FC<AddProps> = ({ stroke }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 10.6666V21.3333M10.6666 16H21.3333M29.3333 16C29.3333 23.3638 23.3638 29.3333 16 29.3333C8.63616 29.3333 2.66663 23.3638 2.66663 16C2.66663 8.63616 8.63616 2.66663 16 2.66663C23.3638 2.66663 29.3333 8.63616 29.3333 16Z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AddIcon;
