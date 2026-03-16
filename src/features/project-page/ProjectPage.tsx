import { useState } from "react";
import type { ProjectLearningPlan, PlanNode } from "../../types/plan";
import { ProjectTree } from "./ProjectTree";
import { NodeDetailPanel } from "./NodeDetailPanel";
import styles from "./ProjectPage.module.css";

const PLAN_STORAGE_KEY = "cs-ocean-plan";

export function ProjectPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const raw = localStorage.getItem(PLAN_STORAGE_KEY);
  const plan: ProjectLearningPlan | null = raw ? JSON.parse(raw) : null;

  if (!plan) {
    return (
      <div className={styles.empty}>
        <h1>No learning plan loaded</h1>
        <p>Scan a GitHub repo from the main CS Ocean page and click "Generate Learning Plan".</p>
      </div>
    );
  }

  const selectedNode: PlanNode | null =
    selectedId ? (plan.nodes.find((n) => n.id === selectedId) ?? null) : null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <a href={plan.repo_url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
            ◉ {plan.repo_name}
          </a>
          <p className={styles.summary}>{plan.summary}</p>
        </div>
        <div className={styles.legend}>
          {[
            { label: "Goal", color: "#fbbf24" },
            { label: "Area", color: "#22d3ee" },
            { label: "Topic", color: "#14b8a6" },
            { label: "Task", color: "#a78bfa" },
          ].map(({ label, color }) => (
            <span key={label} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.body} style={{ paddingRight: selectedNode ? 340 : 0 }}>
        <ProjectTree plan={plan} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {selectedNode && (
        <NodeDetailPanel node={selectedNode} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
