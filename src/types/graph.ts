export type LayerDepth = "surface" | "mid" | "deep_mid" | "deep";

export interface OceanNode {
  id: string;
  label: string;
  layer: LayerDepth;
  description: string;
  related_ids: string[];
  aliases: string[];
  is_ai_proposed: boolean;
}

export interface OceanEdge {
  source: string;
  target: string;
  weight: number;
}

export interface OceanGraph {
  version: string;
  nodes: OceanNode[];
  edges: OceanEdge[];
  generated_at: string;
}
