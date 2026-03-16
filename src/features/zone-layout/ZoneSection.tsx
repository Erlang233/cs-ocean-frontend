import type { OceanNode } from "../../types/graph";
import type { ZoneConfig } from "../../data/zones-config";
import { TechCard } from "./TechCard";
import styles from "./ZoneSection.module.css";

interface Props {
  zone: ZoneConfig;
  nodes: OceanNode[];
  highlightedIds: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ZoneSection({ zone, nodes, highlightedIds, selectedId, onSelect }: Props) {
  if (nodes.length === 0) return null;

  return (
    <section
      className={styles.zone}
      style={{ "--zone-color": zone.color, "--zone-bg": zone.bgColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.stripe} />
        <h2 className={styles.title}>{zone.label}</h2>
        <span className={styles.count}>{nodes.length}</span>
      </div>
      <div className={styles.grid}>
        {nodes.map((node) => (
          <TechCard
            key={node.id}
            nodeId={node.id}
            label={node.label}
            iconClass={(node as any)._iconClass}
            highlighted={highlightedIds.includes(node.id)}
            selected={selectedId === node.id}
            onClick={() => onSelect(node.id)}
          />
        ))}
      </div>
    </section>
  );
}
