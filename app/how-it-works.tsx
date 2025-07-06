"use client";

import { Wallet, ArrowRight, Diamond, Shield, Zap } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-10">How It Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
        <div>
          <div className="flex items-center justify-center mb-2"><Wallet className="h-12 w-12 text-primary" /></div>
          <div className="font-semibold text-lg">Connect Wallet</div>
          <div className="text-muted-foreground text-base">Login with TON Connect</div>
        </div>
        <div>
          <div className="flex items-center justify-center mb-2"><ArrowRight className="h-12 w-12 text-primary" /></div>
          <div className="font-semibold text-lg">Post/Find a Job</div>
          <div className="text-muted-foreground text-base">Clients post, freelancers browse</div>
        </div>
        <div>
          <div className="flex items-center justify-center mb-2"><Diamond className="h-12 w-12 text-primary" /></div>
          <div className="font-semibold text-lg">Submit Proposal</div>
          <div className="text-muted-foreground text-base">Freelancers apply with offers</div>
        </div>
        <div>
          <div className="flex items-center justify-center mb-2"><Shield className="h-12 w-12 text-primary" /></div>
          <div className="font-semibold text-lg">Escrow & Work</div>
          <div className="text-muted-foreground text-base">Toncoin held until job is done</div>
        </div>
        <div>
          <div className="flex items-center justify-center mb-2"><Zap className="h-12 w-12 text-primary" /></div>
          <div className="font-semibold text-lg">Approve & Get Paid</div>
          <div className="text-muted-foreground text-base">Funds released on approval</div>
        </div>
      </div>
    </div>
  );
} 