import styles from "./MobileBlockedPage.module.css";

export default function MobileBlockedPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Unsupported Device</h1>
        <p>This app is only available on desktop devices.</p>
      </div>
    </div>
  );
}
