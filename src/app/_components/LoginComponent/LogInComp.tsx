import React from "react";
import styles from "./LogInComp.module.css";
import Login from "@/app/_components/Login/Login";

interface LogInCompProps {
  formToRender: string;
}

function LogInComp({ formToRender }: LogInCompProps) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.formWrapper}>
        {formToRender === "logIn" ? <Login /> : null}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.text}>Make your own journey.</div>
        <div className={styles.text}>Travel by manyroads.</div>
      </div>
    </div>
  );
}

export default LogInComp;
