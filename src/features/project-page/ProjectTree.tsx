import { useRef } from "react";
import { hierarchy, tree } from "d3-hierarchy";
import type { PlanNode, ProjectLearningPlan } from "../../types/plan";
import styles from "./ProjectTree.module.css";

const LEVEL_COLORS = ["#fbbf24", "#22d3ee", "#14b8a6", "#a78bfa"];

const NODE_W = 160;
const NODE_H = 54;
const H_GAP = 40;
const V_GAP = 80;

interface TreeItem {
  data: PlanNode;
  children?: TreeItem[];
}

function buildHierarchy(plan: ProjectLearningPlan): TreeItem | null {
  const map = new Map<string, TreeItem>();
  for (const n of plan.nodes) {
    map.set(n.id, { data: n, children: [] });
  }
  let root: TreeItem | null = null;
  for (const n of plan.nodes) {
    const item = map.get(n.id)!;
    if (!n.parent_id || !map.has(n.parent_id)) {
      root = item;
    } else {
      map.get(n.parent_id)!.children!.push(item);
    }
  }
  // Remove empty children arrays
  map.forEach((item) => {
    if (item.children?.length === 0) delete item.children;
  });
  return root;
}

interface Props {
  plan: ProjectLearningPlan;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProjectTree({ plan, selectedId, onSelect }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const root = buildHierarchy(plan);
  if (!root) return <div className={styles.empty}>No tree data</div>;

  const h = hierarchy(root, (d) => d.children);
  const treeLayout = tree<TreeItem>()
    .nodeSize([NODE_W + H_GAP, NODE_H + V_GAP])
    .separation(() => 1);
  const treeRoot = treeLayout(h);

  const nodes = treeRoot.descendants();
  const links = treeRoot.links();

  // Compute SVG bounds
  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = Math.min(...xs) - NODE_W / 2 - 20;
  const maxX = Math.max(...xs) + NODE_W / 2 + 20;
  const minY = Math.min(...ys) - NODE_H / 2 - 20;
  const maxY = Math.max(...ys) + NODE_H / 2 + 20;
  const svgW = maxX - minX;
  const svgH = maxY - minY;

  return (
    <div className={styles.container}>
      <svg
        ref={svgRef}
        width={svgW}
        height={svgH}
        viewBox={`${minX} ${minY} ${svgW} ${svgH}`}
        className={styles.svg}
      >
        {/* Links */}
        <g>
          {links.map((link, i) => {
            const sx = link.source.x;
            const sy = link.source.y + NODE_H / 2;
            const tx = link.target.x;
            const ty = link.target.y - NODE_H / 2;
            const my = (sy + ty) / 2;
            return (
              <path
                key={i}
                d={`M ${sx} ${sy} C ${sx} ${my}, ${tx} ${my}, ${tx} ${ty}`}
                fill="none"
                stroke="#334155"
                strokeWidth={1.5}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((node) => {
            const n = node.data.data;
            const x = node.x - NODE_W / 2;
            const y = node.y - NODE_H / 2;
            const color = LEVEL_COLORS[n.level] ?? "#94a3b8";
            const isSelected = selectedId === n.id;

            return (
              <g
                key={n.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelect(n.id)}
                className={styles.nodeGroup}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={isSelected ? "rgba(56,189,248,0.12)" : "#1e293b"}
                  stroke={isSelected ? "#38bdf8" : color}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text
                  x={NODE_W / 2}
                  y={20}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={color}
                  fontFamily="Inter, sans-serif"
                >
                  {n.label.length > 20 ? n.label.slice(0, 18) + "…" : n.label}
                </text>
                <text
                  x={NODE_W / 2}
                  y={36}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#64748b"
                  fontFamily="Inter, sans-serif"
                >
                  {n.description.length > 28 ? n.description.slice(0, 26) + "…" : n.description}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
