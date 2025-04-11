import React from "react";
import styles from "./Login.module.css";
import Button from "@/app/components/Button/Button";

function Login() {
  return (
    <>
      <div className={styles.logInIcon} />
      <h1 className={styles.title}>Welcome back!</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Email address or username"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
        />
      </div>
      <div className={styles.logInBtn}>
        <Button href={"/dashboard"} variant="primary" label={"Log in"} />
      </div>
    </>
  );
}

export default Login;
