import { useAppStore } from "./store/app-store";
import { useGraphData } from "./features/ocean-graph/useGraphData";
import { OceanGraph } from "./features/ocean-graph/OceanGraph";
import { GraphLegend } from "./features/ocean-graph/GraphLegend";
import { LearningTreePanel } from "./features/learning-tree/LearningTreePanel";
import { ScanResultOverlay } from "./features/github-scanner/ScanResultOverlay";
import { AppShell } from "./components/AppShell";
import { LoadingOverlay } from "./components/LoadingOverlay";

export default function App() {
  const graph = useAppStore((s) => s.graph);
  const { isLoading, isInitializing, error } = useGraphData();

  if (isLoading || isInitializing) {
    return (
      <LoadingOverlay
        message={
          isInitializing
            ? "Generating ocean graph with AI… (this may take ~30s)"
            : "Loading ocean graph…"
        }
      />
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#0f172a",
          color: "#f87171",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{ margin: 0, fontSize: 16 }}>Failed to load graph</p>
        <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{error}</p>
      </div>
    );
  }

  return (
    <AppShell>
      {graph && <OceanGraph graph={graph} />}
      <GraphLegend />
      <LearningTreePanel />
      <ScanResultOverlay />
    </AppShell>
  );
}
