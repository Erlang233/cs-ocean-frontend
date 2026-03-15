import { useState } from "react";
import { useScanner } from "./useScanner";
import styles from "./ScannerInput.module.css";

export function ScannerInput() {
  const [url, setUrl] = useState("");
  const { scan, isScanning, error } = useScanner();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) scan(url.trim());
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="url"
          placeholder="Paste a GitHub repo URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isScanning}
        />
        <button className={styles.button} type="submit" disabled={isScanning || !url.trim()}>
          {isScanning ? (
            <span className={styles.spinner} />
          ) : (
            "Scan"
          )}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
