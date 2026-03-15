import type { LayerDepth } from "./graph";

export interface DetectedTech {
  name: string;
  matched_node_id: string | null;
  confidence: number;
}

export interface NodeProposal {
  id: string;
  label: string;
  layer: LayerDepth;
  description: string;
  suggested_parent_id: string | null;
  scope: "major" | "niche";
}

export interface ScanResult {
  repo_url: string;
  detected_techs: DetectedTech[];
  matched_node_ids: string[];
  proposals: NodeProposal[];
  files_analyzed: string[];
}
