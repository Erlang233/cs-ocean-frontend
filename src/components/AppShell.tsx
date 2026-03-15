import { ScannerInput } from "../features/github-scanner/ScannerInput";
import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◉</span>
          <span className={styles.logoText}>CS Ocean</span>
        </div>
        <ScannerInput />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
