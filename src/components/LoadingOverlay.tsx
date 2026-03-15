import styles from "./LoadingOverlay.module.css";

export function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
