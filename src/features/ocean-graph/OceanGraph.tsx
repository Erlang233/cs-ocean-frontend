import { useCallback, useRef, useEffect } from "react";
import { ForceGraph2D } from "react-force-graph";
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

type GraphNodeObj = OceanNode & { x?: number; y?: number };

export function OceanGraph({ graph }: { graph: OceanGraph }) {
  const selectNode = useAppStore((s) => s.selectNode);
  const highlightedIds = useAppStore((s) => s.highlightedNodeIds);
  const highlightSet = new Set(highlightedIds);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(undefined);

  const graphData = {
    nodes: graph.nodes.map((n) => ({ ...n })),
    links: graph.edges.map((e) => ({ source: e.source, target: e.target, weight: e.weight })),
  };

  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    fg.d3Force(
      "y-band",
      forceY<GraphNodeObj>((node) => LAYER_Y[node.layer] ?? 0).strength(0.3)
    );
    fg.d3ReheatSimulation();
  }, [graph.version]);

  const paintNode = useCallback(
    (node: GraphNodeObj, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const isHighlighted = highlightSet.has(node.id);
      const radius = isHighlighted ? 8 : 5;
      const color = LAYER_COLORS[node.layer] ?? "#888";

      if (isHighlighted) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = GLOW_COLOR;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isHighlighted ? GLOW_COLOR : color;
      ctx.fill();

      ctx.shadowBlur = 0;

      if (globalScale >= 1.5) {
        const fontSize = 10 / globalScale;
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = "#e2e8f0";
        ctx.textAlign = "center";
        ctx.fillText(node.label, x, y + radius + fontSize + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [highlightedIds]
  );

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      nodeId="id"
      nodeCanvasObject={paintNode}
      nodeCanvasObjectMode={() => "replace"}
      linkColor={() => "#334155"}
      linkWidth={(link: { weight?: number }) => (link.weight ?? 1) * 0.5}
      backgroundColor="#0f172a"
      onNodeClick={(node: GraphNodeObj) => selectNode(node.id)}
      nodeLabel={(node: GraphNodeObj) => `${node.label}\n${node.description}`}
      cooldownTicks={200}
      width={window.innerWidth}
      height={window.innerHeight - 56}
    />
  );
}
