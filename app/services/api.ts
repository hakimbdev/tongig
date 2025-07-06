import { Job, Proposal, Contract, Transaction } from '@/types';

// In-memory database for demo purposes
let jobs: Job[] = [
  {
    id: 1,
    title: "Build a Telegram Bot",
    description: "Looking for a developer to build a TON-integrated Telegram bot.",
    budget: 50,
    deadline: "2024-07-15",
    client: "0:abc...123",
    proposals: [],
  },
  {
    id: 2,
    title: "Design a TONGig Logo",
    description: "Need a creative logo for TONGig platform.",
    budget: 20,
    deadline: "2024-07-10",
    client: "0:def...456",
    proposals: [],
  },
];

let proposals: Proposal[] = [];
let contracts: Contract[] = [];
let nextJobId = 3;
let nextProposalId = 1;
let nextContractId = 1;

export const api = {
  async getJobs(): Promise<Job[]> {
    return [...jobs];
  },

  async getJob(id: number): Promise<Job> {
    const job = jobs.find(j => j.id === id);
    if (!job) throw new Error('Job not found');
    return { ...job };
  },

  async postJob(data: Omit<Job, 'id' | 'proposals'>): Promise<Job> {
    const job: Job = { ...data, id: nextJobId++, proposals: [] };
    jobs.push(job);
    return { ...job };
  },

  async getProposals(jobId: number): Promise<Proposal[]> {
    return proposals.filter(p => p.jobId === jobId);
  },

  async submitProposal(data: Omit<Proposal, 'id' | 'status' | 'created_at'>): Promise<Proposal> {
    const proposal: Proposal = {
      ...data,
      id: nextProposalId++,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    proposals.push(proposal);
    // Add to job's proposals
    const job = jobs.find(j => j.id === data.jobId);
    if (job) job.proposals.push(proposal);
    return { ...proposal };
  },

  async acceptProposal(proposalId: number): Promise<Contract> {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal) throw new Error('Proposal not found');
    proposal.status = 'accepted';
    // Create contract
    const contract: Contract = {
      id: nextContractId++,
      jobId: proposal.jobId,
      client: jobs.find(j => j.id === proposal.jobId)?.client || '',
      freelancer: proposal.freelancer,
      amount: proposal.amount,
      status: 'active',
      escrowAddress: 'EQD...escrow',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    contracts.push(contract);
    return { ...contract };
  },

  async getContracts(address: string): Promise<Contract[]> {
    return contracts.filter(c => c.client === address || c.freelancer === address);
  },

  async completeContract(contractId: number): Promise<Contract> {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) throw new Error('Contract not found');
    contract.status = 'completed';
    contract.updated_at = new Date().toISOString();
    return { ...contract };
  },
}; 