import React from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import Button from "@/app/_components/Button/Button";

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
      {/* <Link href={"/dashboard"}>
        <div className={styles.logInBtn}>Log in</div>
      </Link> */}
      <Button href={"/dashboard"} variant="primary" label={"Log in"} />
    </>
  );
}

export default Login;
