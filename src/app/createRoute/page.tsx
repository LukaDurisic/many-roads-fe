import React from "react";
import styles from "./CreateRoute.module.css";
import Navbar from "../components/Navbar/Navbar";

function CreateRoute() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>Create route page test</div>
    </div>
  );
}

export default CreateRoute;
