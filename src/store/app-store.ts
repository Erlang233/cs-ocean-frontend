import { create } from "zustand";
import type { OceanGraph } from "../types/graph";
import type { ScanResult, NodeProposal } from "../types/scan";

interface AppStore {
  graph: OceanGraph | null;
  highlightedNodeIds: string[];
  selectedNodeId: string | null;
  scanResult: ScanResult | null;
  proposals: NodeProposal[];

  setGraph: (g: OceanGraph) => void;
  setHighlightedNodes: (ids: string[]) => void;
  selectNode: (id: string | null) => void;
  setScanResult: (r: ScanResult) => void;
  setProposals: (p: NodeProposal[]) => void;
  removeProposal: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  graph: null,
  highlightedNodeIds: [],
  selectedNodeId: null,
  scanResult: null,
  proposals: [],

  setGraph: (g) => set({ graph: g }),
  setHighlightedNodes: (ids) => set({ highlightedNodeIds: ids }),
  selectNode: (id) => set({ selectedNodeId: id }),
  setScanResult: (r) => set({ scanResult: r, highlightedNodeIds: r.matched_node_ids, proposals: r.proposals }),
  setProposals: (p) => set({ proposals: p }),
  removeProposal: (id) => set((s) => ({ proposals: s.proposals.filter((p) => p.id !== id) })),
}));
