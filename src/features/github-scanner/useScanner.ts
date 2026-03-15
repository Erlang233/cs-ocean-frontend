import { useState } from "react";
import { useAppStore } from "../../store/app-store";
import { scanRepo, acceptProposal, rejectProposal } from "./api";
import type { NodeProposal } from "../../types/scan";

export function useScanner() {
  const setScanResult = useAppStore((s) => s.setScanResult);
  const setGraph = useAppStore((s) => s.setGraph);
  const removeProposal = useAppStore((s) => s.removeProposal);

  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = async (url: string) => {
    setIsScanning(true);
    setError(null);
    try {
      const result = await scanRepo(url);
      setScanResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setIsScanning(false);
    }
  };

  const accept = async (proposal: NodeProposal) => {
    try {
      const updatedGraph = await acceptProposal(proposal);
      setGraph(updatedGraph);
      removeProposal(proposal.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept proposal");
    }
  };

  const reject = async (proposal: NodeProposal) => {
    await rejectProposal(proposal.id);
    removeProposal(proposal.id);
  };

  return { scan, accept, reject, isScanning, error };
}
