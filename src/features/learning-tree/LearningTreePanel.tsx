import { useAppStore } from "../../store/app-store";
import { useTreeData } from "./useTreeData";
import type { TreeNode } from "../../types/tree";
import styles from "./LearningTreePanel.module.css";

const RESOURCE_ICONS: Record<string, string> = {
  video: "▶",
  article: "📄",
  docs: "📖",
  course: "🎓",
  book: "📚",
};

function TreeNodeCard({ node, isRoot }: { node: TreeNode; isRoot: boolean }) {
  return (
    <div className={`${styles.nodeCard} ${isRoot ? styles.root : ""}`} style={{ marginLeft: `${node.level * 16}px` }}>
      <div className={styles.nodeHeader}>
        <span className={styles.levelBadge}>L{node.level}</span>
        <span className={styles.nodeLabel}>{node.label}</span>
      </div>
      <p className={styles.nodeDesc}>{node.description}</p>
      {node.resources.length > 0 && (
        <ul className={styles.resourceList}>
          {node.resources.map((r, i) => (
            <li key={i}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className={styles.resource}>
                <span>{RESOURCE_ICONS[r.type] ?? "🔗"}</span>
                <span>{r.title}</span>
                {r.is_free && <span className={styles.freeBadge}>Free</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LearningTreePanel() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const selectNode = useAppStore((s) => s.selectNode);
  const graph = useAppStore((s) => s.graph);
  const { tree, isLoading, error } = useTreeData(selectedNodeId);

  if (!selectedNodeId) return null;

  const selectedNode = graph?.nodes.find((n) => n.id === selectedNodeId);
  const sortedNodes = tree ? [...tree.nodes].sort((a, b) => a.level - b.level) : [];

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{selectedNode?.label ?? selectedNodeId}</h2>
          <p className={styles.subtitle}>{selectedNode?.description}</p>
        </div>
        <button className={styles.closeBtn} onClick={() => selectNode(null)}>✕</button>
      </div>

      <div className={styles.body}>
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Generating learning path...</span>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {!isLoading && !error && sortedNodes.map((node) => (
          <TreeNodeCard key={node.id} node={node} isRoot={node.id === tree?.root_node_id} />
        ))}
      </div>
    </div>
  );
}
