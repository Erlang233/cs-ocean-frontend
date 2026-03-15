import { useAppStore } from "../../store/app-store";
import { useScanner } from "./useScanner";
import type { NodeProposal } from "../../types/scan";
import styles from "./ScanResultOverlay.module.css";

function ProposalCard({ proposal, onAccept, onReject }: {
  proposal: NodeProposal;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className={styles.proposalCard}>
      <div className={styles.proposalHeader}>
        <span className={styles.proposalLabel}>{proposal.label}</span>
        <span className={`${styles.scopeBadge} ${styles[proposal.scope]}`}>{proposal.scope}</span>
        <span className={styles.layerBadge}>{proposal.layer}</span>
      </div>
      <p className={styles.proposalDesc}>{proposal.description}</p>
      {proposal.suggested_parent_id && (
        <p className={styles.parentHint}>Under: <code>{proposal.suggested_parent_id}</code></p>
      )}
      <div className={styles.proposalActions}>
        <button className={styles.acceptBtn} onClick={onAccept}>Add to graph</button>
        <button className={styles.rejectBtn} onClick={onReject}>Dismiss</button>
      </div>
    </div>
  );
}

export function ScanResultOverlay() {
  const scanResult = useAppStore((s) => s.scanResult);
  const proposals = useAppStore((s) => s.proposals);
  const setScanResult = useAppStore((s) => s.setScanResult);
  const { accept, reject } = useScanner();

  if (!scanResult) return null;

  const matched = scanResult.detected_techs.filter((t) => t.matched_node_id);

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div>
          <span className={styles.title}>Scan Results</span>
          <span className={styles.repoUrl}>{scanResult.repo_url.replace("https://github.com/", "")}</span>
        </div>
        <button className={styles.closeBtn} onClick={() => setScanResult({ ...scanResult, matched_node_ids: [] })}>✕</button>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionTitle}>
          {matched.length} matched {matched.length === 1 ? "technology" : "technologies"}
        </span>
        <div className={styles.tagList}>
          {matched.map((t) => (
            <span key={t.matched_node_id} className={styles.techTag}>{t.name}</span>
          ))}
        </div>
        <p className={styles.filesNote}>Analyzed: {scanResult.files_analyzed.join(", ")}</p>
      </div>

      {proposals.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionTitle}>{proposals.length} new {proposals.length === 1 ? "technology" : "technologies"} found</span>
          <div className={styles.proposalList}>
            {proposals.map((p) => (
              <ProposalCard
                key={p.id}
                proposal={p}
                onAccept={() => accept(p)}
                onReject={() => reject(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
