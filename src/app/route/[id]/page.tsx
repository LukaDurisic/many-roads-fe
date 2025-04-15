import React from "react";
import styles from "./Route.module.css";
import Navbar from "../../components/Navbar/Navbar";

type Params = Promise<{ id: string }>;

const Route = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.contentWrapper}>This is route with id : {id}</div>
    </div>
  );
};

export default Route;
