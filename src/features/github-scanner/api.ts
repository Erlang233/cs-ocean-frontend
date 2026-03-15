import { apiFetch } from "../../services/api";
import type { ScanResult } from "../../types/scan";
import type { OceanGraph } from "../../types/graph";
import type { NodeProposal } from "../../types/scan";

export const scanRepo = (github_url: string) =>
  apiFetch<ScanResult>("/api/scan/github", {
    method: "POST",
    body: JSON.stringify({ github_url }),
  });

export const acceptProposal = (proposal: NodeProposal) =>
  apiFetch<OceanGraph>("/api/proposals/accept", {
    method: "POST",
    body: JSON.stringify(proposal),
  });

export const rejectProposal = (proposal_id: string) =>
  apiFetch<{ ok: boolean }>("/api/proposals/reject", {
    method: "POST",
    body: JSON.stringify({ proposal_id }),
  });
