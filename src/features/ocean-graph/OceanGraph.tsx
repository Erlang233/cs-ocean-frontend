import { useEffect, useRef } from "react";
import ForceGraph, { type NodeObject, type LinkObject } from "force-graph";
import { forceY } from "d3-force";
import { useAppStore } from "../../store/app-store";
import type { OceanNode, OceanGraph } from "../../types/graph";

const LAYER_COLORS: Record<string, string> = {
  surface: "#22d3ee",
  mid: "#14b8a6",
  deep_mid: "#3b82f6",
  deep: "#6366f1",
};

const LAYER_Y: Record<string, number> = {
  surface: -300,
  mid: -100,
  deep_mid: 100,
  deep: 300,
};

const GLOW_COLOR = "#fbbf24";

type GNode = NodeObject & OceanNode;
type GLink = LinkObject<GNode> & { weight?: number };

export function OceanGraph({ graph }: { graph: OceanGraph }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraph<GNode, GLink>>(undefined);
  const selectNode = useAppStore((s) => s.selectNode);
  const highlightedIds = useAppStore((s) => s.highlightedNodeIds);

  // Init graph once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const fg = new ForceGraph<GNode, GLink>(containerRef.current)
      .backgroundColor("#0f172a")
      .nodeId("id")
      .nodeLabel((n) => `${n.label}: ${n.description}`)
      .linkColor(() => "#334155")
      .linkWidth((l) => (l.weight ?? 1) * 0.5)
      .onNodeClick((n) => selectNode(n.id as string))
      .nodeCanvasObjectMode(() => "replace")
      .nodeCanvasObject((n, ctx, globalScale) => {
        const x = n.x ?? 0;
        const y = n.y ?? 0;
        const highlighted = useAppStore.getState().highlightedNodeIds.includes(n.id as string);
        const radius = highlighted ? 8 : 5;

        if (highlighted) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = GLOW_COLOR;
        }
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = highlighted ? GLOW_COLOR : (LAYER_COLORS[n.layer] ?? "#888");
        ctx.fill();
        ctx.shadowBlur = 0;

        if (globalScale >= 1.5) {
          const fontSize = 10 / globalScale;
          ctx.font = `${fontSize}px Inter, sans-serif`;
          ctx.fillStyle = "#e2e8f0";
          ctx.textAlign = "center";
          ctx.fillText(n.label, x, y + radius + fontSize + 1);
        }
      })
      .width(window.innerWidth)
      .height(window.innerHeight - 56);

    fg.d3Force("y-band", forceY<GNode>((n) => LAYER_Y[n.layer] ?? 0).strength(0.3));
    fgRef.current = fg;

    const handleResize = () => fg.width(window.innerWidth).height(window.innerHeight - 56);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update graph data when graph changes
  useEffect(() => {
    if (!fgRef.current) return;
    fgRef.current.graphData({
      nodes: graph.nodes.map((n) => ({ ...n })) as GNode[],
      links: graph.edges.map((e) => ({ source: e.source, target: e.target, weight: e.weight })),
    });
    fgRef.current.d3Force("y-band", forceY<GNode>((n) => LAYER_Y[n.layer] ?? 0).strength(0.3));
    fgRef.current.d3ReheatSimulation();
  }, [graph.version]);

  // Redraw on highlight changes
  useEffect(() => {
    // Trigger a soft re-render by nudging the simulation
    fgRef.current?.d3ReheatSimulation();
  }, [highlightedIds]);

  return <div ref={containerRef} style={{ width: "100%", height: "calc(100vh - 56px)" }} />;
}
