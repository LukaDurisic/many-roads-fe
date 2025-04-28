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
      <div className={styles.imgContainer}></div>
    </div>
  );
}

export default LogInComp;
