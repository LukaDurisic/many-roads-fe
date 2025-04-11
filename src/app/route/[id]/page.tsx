import React from "react";
import styles from "./Route.module.css";
import Navbar from "../../components/Navbar/Navbar";

function Route({ params }: { params: { id: string } }) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>
        This is route with id : {params.id}
      </div>
    </div>
  );
}

export default Route;
