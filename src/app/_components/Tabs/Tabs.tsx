import React from "react";
import styles from "./Tabs.module.css";

interface TabProps {
  options: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  isCenter: boolean;
}

function Tabs({ options, selectedTab, setSelectedTab, isCenter }: TabProps) {
  return (
    <div className={isCenter ? styles.tabs : styles.leftTabs}>
      {options.map((option) => (
        <div
          key={option}
          className={selectedTab === option ? styles.activeTab : styles.tab}
          onClick={() => setSelectedTab(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
