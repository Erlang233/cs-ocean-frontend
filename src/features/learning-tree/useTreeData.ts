import { useEffect, useState } from "react";
import type { LearningTree } from "../../types/tree";
import { fetchLearningTree } from "./api";

export function useTreeData(nodeId: string | null) {
  const [tree, setTree] = useState<LearningTree | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nodeId) {
      setTree(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchLearningTree(nodeId)
      .then(setTree)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setIsLoading(false));
  }, [nodeId]);

  return { tree, isLoading, error };
}
