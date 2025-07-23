import React from "react";
import styles from "./Tabs.module.css";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

interface TabProps {
  options: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  isCenter: boolean;
}

function Tabs({ options, selectedTab, setSelectedTab, isCenter }: TabProps) {
  const { t } = useTranslation();
  return (
    <div className={isCenter ? styles.tabs : styles.leftTabs}>
      {options.map((option) => (
        <div
          key={option}
          className={selectedTab === option ? styles.activeTab : styles.tab}
          onClick={() => setSelectedTab(option)}
        >
          {t(option)}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
