import { useMemo } from "react";
import type { OceanGraph, OceanNode } from "../../types/graph";
import { ZONES, NODE_ZONE_MAP, LAYER_ZONE_FALLBACK } from "../../data/zones-config";
import { useAppStore } from "../../store/app-store";
import { ZoneSection } from "./ZoneSection";
import styles from "./ZoneLayout.module.css";

interface ZoneNode extends OceanNode {
  _iconClass?: string;
}

export function ZoneLayout({ graph }: { graph: OceanGraph }) {
  const highlightedIds = useAppStore((s) => s.highlightedNodeIds);
  const selectedId = useAppStore((s) => s.selectedNodeId);
  const selectNode = useAppStore((s) => s.selectNode);

  // Deduplicate nodes by id (graph may have duplicates from AI generation)
  const uniqueNodes = useMemo(() => {
    const seen = new Set<string>();
    return graph.nodes.filter((n) => {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      return true;
    });
  }, [graph.nodes]);

  // Group nodes by zone, attach icon class
  const zoneNodes = useMemo(() => {
    const map: Record<string, ZoneNode[]> = {};
    for (const zone of ZONES) map[zone.id] = [];

    for (const node of uniqueNodes) {
      const mapping = NODE_ZONE_MAP[node.id];
      const zoneId = mapping?.zone ?? LAYER_ZONE_FALLBACK[node.layer] ?? "backend";
      if (map[zoneId]) {
        map[zoneId].push({ ...node, _iconClass: mapping?.icon });
      }
    }
    return map;
  }, [uniqueNodes]);

  return (
    <div className={styles.layout}>
      {ZONES.map((zone) => (
        <ZoneSection
          key={zone.id}
          zone={zone}
          nodes={zoneNodes[zone.id] ?? []}
          highlightedIds={highlightedIds}
          selectedId={selectedId}
          onSelect={selectNode}
        />
      ))}
    </div>
  );
}
