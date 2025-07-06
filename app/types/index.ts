export interface Transaction {
  id: number;
  asset_id: number;
  transaction_hash: string;
  from_address: string;
  to_address: string;
  amount: number;
  type: 'purchase' | 'bid' | 'auction_end';
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  client: string; // wallet address
  proposals: Proposal[];
}

export interface Proposal {
  id: number;
  jobId: number;
  freelancer: string; // wallet address
  coverLetter: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Contract {
  id: number;
  jobId: number;
  client: string;
  freelancer: string;
  amount: number;
  status: 'active' | 'completed' | 'disputed';
  escrowAddress: string;
  created_at: string;
  updated_at: string;
} 