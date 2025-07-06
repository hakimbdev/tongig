"use client";

import Link from "next/link"
import { ArrowRight, Shield, Wallet, Zap, Menu, Loader2, Diamond } from "lucide-react"
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/app/services/api";
import { Job, Proposal } from "@/app/types";
import { useTonTransaction } from "@/app/utils/ton-transaction";

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Job posting schema
const jobSchema = z.object({
  title: z.string().min(3, "Title is required").max(100),
  description: z.string().min(10, "Description is required").max(1000),
  budget: z.string().min(1, "Budget is required").regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
  deadline: z.string().min(1, "Deadline is required"),
});

// Proposal schema
const proposalSchema = z.object({
  coverLetter: z.string().min(10, "Cover letter is required").max(1000),
  amount: z.string().min(1, "Amount is required").regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount"),
});

export default function Home() {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { toast } = useToast();
  const { placeBid } = useTonTransaction();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [postingJob, setPostingJob] = useState(false);
  const [postingError, setPostingError] = useState<string | null>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { title: '', description: '', budget: '', deadline: '' }
  });
  const [proposalOpen, setProposalOpen] = useState<number | null>(null);
  const proposalForm = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: { coverLetter: '', amount: '' }
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setJobsLoading(true);
    setJobsError(null);
    api.getJobs()
      .then(setJobs)
      .catch(() => setJobsError("Failed to load jobs. Please try again."))
      .finally(() => setJobsLoading(false));
  }, []);

  const handlePostJob = async (values: any) => {
    setPostingJob(true);
    setPostingError(null);
    try {
      await api.postJob({
        title: values.title,
        description: values.description,
        budget: Number(values.budget),
        deadline: values.deadline,
        client: wallet?.account.address || '0:demo',
      });
      const updatedJobs = await api.getJobs();
      setJobs(updatedJobs);
      setOpen(false);
      form.reset();
    } catch (e) {
      setPostingError("Failed to post job. Please try again.");
    } finally {
      setPostingJob(false);
    }
  };

  const handleSubmitProposal = async (jobId: number, values: any) => {
    setSubmittingProposal(true);
    setProposalError(null);
    try {
      await api.submitProposal({
        jobId,
        freelancer: wallet?.account.address || '0:freelancer',
        coverLetter: values.coverLetter,
        amount: Number(values.amount),
      });
      setProposalOpen(null);
      proposalForm.reset();
      toast({ title: 'Proposal submitted', description: 'Your proposal has been sent.' });
    } catch (e) {
      setProposalError("Failed to submit proposal. Please try again.");
    } finally {
      setSubmittingProposal(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/placeholder-logo.png" alt="TONGig Logo" className="h-8 w-auto" />
              <span className="font-bold">TONGig</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="#jobs" className="text-sm font-medium transition-colors hover:text-primary">
                Job Board
              </Link>
              <Link href="#contracts" className="text-sm font-medium transition-colors hover:text-primary">
                Active Contracts
              </Link>
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
                How It Works
              </Link>
            </nav>
            <button className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <WalletConnectButton />
          </div>
        </div>
        {/* Mobile nav */}
        {mobileNavOpen && (
          <div className="md:hidden bg-background border-t px-4 pb-4 pt-2 flex flex-col gap-2">
            <Link href="#jobs" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
              Job Board
            </Link>
            <Link href="#contracts" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
              Active Contracts
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
              About
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
              How It Works
            </Link>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Freelancers & Clients on TON
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TONGig is the decentralized freelance marketplace for the TON blockchain. Post jobs, hire global talent, and manage contracts with on-chain escrow and reputation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Browse Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setOpen(true)}>
                    Post a Job
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-[450px] rounded-full bg-gradient-to-r from-primary/20 to-primary p-1">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background p-6">
                    <div className="space-y-2 text-center">
                      <div className="text-4xl font-bold">100+</div>
                      <div className="text-sm text-muted-foreground">Active Freelance Gigs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-2"><Wallet className="h-10 w-10 text-primary" /></div>
                <div className="font-semibold">Connect Wallet</div>
                <div className="text-muted-foreground text-sm">Login with TON Connect</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2"><ArrowRight className="h-10 w-10 text-primary" /></div>
                <div className="font-semibold">Post/Find a Job</div>
                <div className="text-muted-foreground text-sm">Clients post, freelancers browse</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2"><Diamond className="h-10 w-10 text-primary" /></div>
                <div className="font-semibold">Submit Proposal</div>
                <div className="text-muted-foreground text-sm">Freelancers apply with offers</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2"><Shield className="h-10 w-10 text-primary" /></div>
                <div className="font-semibold">Escrow & Work</div>
                <div className="text-muted-foreground text-sm">Toncoin held until job is done</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2"><Zap className="h-10 w-10 text-primary" /></div>
                <div className="font-semibold">Approve & Get Paid</div>
                <div className="text-muted-foreground text-sm">Funds released on approval</div>
              </div>
            </div>
          </div>
        </section>
        <section id="jobs" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Gigs</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse open freelance jobs and submit proposals. All payments are secured by Toncoin escrow smart contracts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {jobsLoading ? (
                <div className="col-span-full flex justify-center items-center py-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
              ) : jobsError ? (
                <div className="col-span-full text-center text-destructive py-12">{jobsError}</div>
              ) : jobs.length === 0 ? (
                <div className="col-span-full text-center py-12">No jobs found.</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="rounded-lg border bg-background p-6 shadow-sm flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">{job.budget} TON</span>
                      <span className="text-xs text-muted-foreground">Deadline: {job.deadline}</span>
                    </div>
                    <Button size="sm" className="mt-2" onClick={() => setProposalOpen(job.id)}>Apply</Button>
                    <Dialog open={proposalOpen === job.id} onOpenChange={open => setProposalOpen(open ? job.id : null)}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Proposal</DialogTitle>
                        </DialogHeader>
                        <Form {...proposalForm}>
                          <form onSubmit={proposalForm.handleSubmit((values) => handleSubmitProposal(job.id, values))} className="space-y-4">
                            <FormField name="coverLetter" control={proposalForm.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cover Letter</FormLabel>
                                <FormControl>
                                  <Input placeholder="Describe your approach and experience" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField name="amount" control={proposalForm.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount (TON)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Your offer in Toncoin" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            {proposalError && <div className="text-destructive text-sm mb-2">{proposalError}</div>}
                            <DialogFooter>
                              <Button type="submit" disabled={submittingProposal}>
                                {submittingProposal ? <Loader2 className="animate-spin h-4 w-4 mr-2 inline" /> : null} Submit Proposal
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section id="contracts" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Contracts</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track and manage your active and completed freelance contracts. Funds are released only when work is approved.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* No asset/auction UI sections, only job/proposal/contract UI */}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Contracts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why TONGig?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The decentralized freelance platform for the TON blockchain economy
                </p>
              </div>
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4">
                  TONGig connects clients and freelancers worldwide, enabling trustless collaboration with Toncoin payments, on-chain escrow, and NFT-based reputation. No middlemen, no borders—just pure talent and opportunity.
                </p>
                <p>
                  Join the future of work: instant wallet login, transparent contracts, and blockchain-powered reviews. All inside Telegram.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose TONGig?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <Diamond className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">On-chain Escrow</div>
                <div className="text-muted-foreground text-sm">Secure payments, no middlemen</div>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">NFT/SBT Reputation</div>
                <div className="text-muted-foreground text-sm">Earn badges for completed jobs</div>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <Wallet className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">Instant Wallet Login</div>
                <div className="text-muted-foreground text-sm">No email, just TON Connect</div>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <Zap className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">Telegram Mini App</div>
                <div className="text-muted-foreground text-sm">Works inside Telegram</div>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <ArrowRight className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">Global Talent</div>
                <div className="text-muted-foreground text-sm">Hire or work from anywhere</div>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                <Diamond className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="font-semibold mb-1">Transparent Contracts</div>
                <div className="text-muted-foreground text-sm">Everything on-chain, always visible</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Diamond className="h-5 w-5" />
              <span className="font-semibold">TONGig</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/terms" className="text-sm font-medium hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm font-medium hover:underline">
                Privacy
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TONGig. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePostJob)} className="space-y-4">
              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the job" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="budget" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (TON)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Budget in Toncoin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="deadline" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {postingError && <div className="text-destructive text-sm mb-2">{postingError}</div>}
              <DialogFooter>
                <Button type="submit" disabled={postingJob}>
                  {postingJob ? <Loader2 className="animate-spin h-4 w-4 mr-2 inline" /> : null} Post Job
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

