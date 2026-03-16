import styles from "./TechCard.module.css";

interface Props {
  nodeId: string;
  label: string;
  iconClass?: string;
  highlighted: boolean;
  selected: boolean;
  onClick: () => void;
}

export function TechCard({ nodeId, label, iconClass, highlighted, selected, onClick }: Props) {
  // Derive initials fallback from label
  const initials = label.replace(/[^A-Za-z0-9+#]/g, " ").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 3).toUpperCase();

  return (
    <button
      className={[
        styles.card,
        highlighted ? styles.highlighted : "",
        selected ? styles.selected : "",
      ].join(" ")}
      onClick={onClick}
      title={label}
      data-node-id={nodeId}
    >
      <div className={styles.icon}>
        {iconClass ? (
          <i className={iconClass} />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
