import React from "react";
import styles from "./VerifyEmail.module.css";
import Link from "next/link";

function VerifyEmail() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        One Last Step!
        <br />
        Verify Your Email
      </h1>
      <br />
      <br />
      <p className={styles.ph}>
        You're almost there! To complete your registration, please check your
        inbox for a verification email and click the link inside.
      </p>
      <br />
      <p className={styles.ph}>
        Didn't get the email? Check your spam folder or{" "}
        <Link className={styles.link} href={"#"}>
          Resend Verification Email.
        </Link>
      </p>
    </div>
  );
}

export default VerifyEmail;
