import styles from "./GraphLegend.module.css";

const LAYERS = [
  { key: "surface", color: "#22d3ee", label: "Frontend / UI" },
  { key: "mid", color: "#14b8a6", label: "Backend / APIs / Protocols" },
  { key: "deep_mid", color: "#3b82f6", label: "Databases / Networking / OS" },
  { key: "deep", color: "#6366f1", label: "Infra / DevOps / AI / Systems" },
];

export function GraphLegend() {
  return (
    <div className={styles.legend}>
      {LAYERS.map((layer) => (
        <div key={layer.key} className={styles.item}>
          <span className={styles.dot} style={{ background: layer.color }} />
          <span className={styles.label}>{layer.label}</span>
        </div>
      ))}
      <div className={styles.item}>
        <span className={styles.dot} style={{ background: "#fbbf24", boxShadow: "0 0 8px #fbbf24" }} />
        <span className={styles.label}>Matched from your repo</span>
      </div>
    </div>
  );
}
