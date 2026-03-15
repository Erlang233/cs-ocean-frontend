import { apiFetch } from "../../services/api";
import type { OceanGraph } from "../../types/graph";

export const fetchGraph = () => apiFetch<OceanGraph>("/api/graph");

export const initializeGraph = (force = false) =>
  apiFetch<OceanGraph>("/api/graph/initialize", {
    method: "POST",
    body: JSON.stringify({ force }),
  });
