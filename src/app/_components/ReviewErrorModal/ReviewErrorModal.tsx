import React from "react";
import styles from "./ReviewErrorModal.module.css";

function ReviewErrorModal() {
  return (
    <div className={styles.reviewErrorWrapper}>
      <div className={styles.reviewErrorTitle}>Oops! Something went wrong</div>
      <div className={styles.reviewErrorDesc}>
        Looks like your review didn’t go through. Give it another try. If the
        issue persists, check your connection or try again later. Thank you for
        sharing your thoughts!
      </div>
    </div>
  );
}

export default ReviewErrorModal;
