import type { PlanNode } from "../../types/plan";
import styles from "./NodeDetailPanel.module.css";

const LEVEL_LABELS = ["Project Goal", "Major Area", "Subtopic", "Task"];
const LEVEL_COLORS = ["#fbbf24", "#22d3ee", "#14b8a6", "#a78bfa"];

interface Props {
  node: PlanNode;
  onClose: () => void;
}

export function NodeDetailPanel({ node, onClose }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <span className={styles.level} style={{ color: LEVEL_COLORS[node.level] ?? "#94a3b8" }}>
            {LEVEL_LABELS[node.level] ?? `Level ${node.level}`}
          </span>
          <h2 className={styles.title}>{node.label}</h2>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <p className={styles.description}>{node.description}</p>

      {node.tech_ref && (
        <div className={styles.techRef}>
          <span className={styles.techRefLabel}>Related tech:</span>
          <code className={styles.techRefCode}>{node.tech_ref}</code>
        </div>
      )}

      {node.resources.length > 0 && (
        <div className={styles.resources}>
          <h3 className={styles.resourcesTitle}>Resources</h3>
          {node.resources.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resource}
            >
              <div className={styles.resourceLeft}>
                <span className={styles.resourceType}>{r.type}</span>
                <span className={styles.resourceTitle}>{r.title}</span>
              </div>
              {r.is_free && <span className={styles.freeBadge}>Free</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
