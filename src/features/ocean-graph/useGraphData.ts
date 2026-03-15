import { useEffect, useState } from "react";
import { useAppStore } from "../../store/app-store";
import { fetchGraph, initializeGraph } from "./api";

export function useGraphData() {
  const setGraph = useAppStore((s) => s.setGraph);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const graph = await fetchGraph();
      setGraph(graph);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("404") || msg.includes("needs_init")) {
        // Need to initialize
        setIsInitializing(true);
        try {
          const graph = await initializeGraph();
          setGraph(graph);
        } catch (initErr: unknown) {
          setError(initErr instanceof Error ? initErr.message : "Failed to initialize graph");
        } finally {
          setIsInitializing(false);
        }
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { isLoading, isInitializing, error, refreshGraph: load };
}
