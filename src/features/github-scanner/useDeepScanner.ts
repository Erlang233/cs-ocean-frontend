import { useState } from "react";
import { apiFetch } from "../../services/api";
import type { ProjectLearningPlan } from "../../types/plan";

const PLAN_STORAGE_KEY = "cs-ocean-plan";

export function useDeepScanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generatePlan(repoUrl: string) {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await apiFetch<ProjectLearningPlan>("/api/scan/github/deep", {
        method: "POST",
        body: JSON.stringify({ github_url: repoUrl }),
      });

      // Store plan and open project page in new tab
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
      const base = import.meta.env.BASE_URL ?? "/cs-ocean-frontend/";
      window.open(`${base}project.html`, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate plan");
    } finally {
      setIsLoading(false);
    }
  }

  return { generatePlan, isLoading, error };
}
