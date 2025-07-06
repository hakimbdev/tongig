"use client";

import { useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Contract, Job } from "@/types";
import { Button } from "@/components/ui/button";

export default function ContractsPage() {
  const wallet = useTonWallet();
  const userAddress = useTonAddress();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!wallet) {
        setContracts([]);
        setLoading(false);
        return;
      }
      const data = await api.getContracts(wallet.account.address);
      setContracts(data);
      setLoading(false);
    };
    const fetchJobs = async () => {
      const data = await api.getJobs();
      setJobs(data);
    };
    fetchContracts();
    fetchJobs();
  }, [wallet]);

  const handleComplete = async (contractId: number) => {
    await api.completeContract(contractId);
    if (wallet) {
      const data = await api.getContracts(wallet.account.address);
      setContracts(data);
    }
  };

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-2xl font-bold mb-6">My Contracts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !wallet ? (
        <p className="text-muted-foreground">Connect your wallet to view contracts</p>
      ) : contracts.length === 0 ? (
        <p className="text-muted-foreground">No contracts found</p>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => {
            const job = jobs.find(j => j.id === contract.jobId);
            const isClient = contract.client === wallet.account.address;
            const isFreelancer = contract.freelancer === wallet.account.address;
            return (
              <div key={contract.id} className="p-4 border rounded-lg bg-card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{job?.title || 'Job'}</div>
                  <div className="text-muted-foreground text-sm">{job?.description}</div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Client:</span> {contract.client}
                    <br />
                    <span className="font-medium">Freelancer:</span> {contract.freelancer}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[180px]">
                  <div className="font-bold text-primary">{contract.amount} TON</div>
                  <div className="text-xs">Status: <span className="capitalize">{contract.status}</span></div>
                  {isClient && contract.status === 'active' && (
                    <Button size="sm" onClick={() => handleComplete(contract.id)}>
                      Mark as Complete
                    </Button>
                  )}
                  {isFreelancer && contract.status === 'active' && (
                    <span className="text-xs text-muted-foreground">Waiting for client approval</span>
                  )}
                  {contract.status === 'completed' && (
                    <span className="text-xs text-green-600">Completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 