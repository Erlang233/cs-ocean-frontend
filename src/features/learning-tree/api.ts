import { apiFetch } from "../../services/api";
import type { LearningTree } from "../../types/tree";

export const fetchLearningTree = (nodeId: string) =>
  apiFetch<LearningTree>(`/api/nodes/${nodeId}/tree`);
