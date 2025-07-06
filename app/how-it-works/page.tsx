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
      <div className="container py-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Related Content</h2>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li><a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> – Learn about your rights and responsibilities on TONGig.</li>
          <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> – How we protect your data and wallet privacy.</li>
          <li><a href="https://ton.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TON Official Documentation</a> – Learn more about the TON blockchain.</li>
          <li><a href="https://ton.org/wallets" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TON-Compatible Wallets</a> – See the list of supported wallets.</li>
          <li><a href="mailto:support@tongig.app" className="text-blue-600 hover:underline">Contact Support</a> – Need help? Reach out to our team.</li>
          <li><a href="https://core.telegram.org/bots/webapps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Telegram Mini App Info</a> – How TONGig works inside Telegram.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">What is TONGig?</span>
            <p className="text-muted-foreground">TONGig is a decentralized freelance marketplace built on the TON blockchain. It connects clients and freelancers globally with secure, on-chain contracts and payments.</p>
          </div>
          <div>
            <span className="font-semibold">How do I connect my wallet?</span>
            <p className="text-muted-foreground">Click 'Connect Wallet' and use any TON-compatible wallet via TON Connect. Your profile is created instantly on first connect.</p>
          </div>
          <div>
            <span className="font-semibold">How do I get Toncoin?</span>
            <p className="text-muted-foreground">You can buy Toncoin (TON) on major exchanges or through supported wallets. See the <a href='https://ton.org/buy-toncoin' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>official guide</a>.</p>
          </div>
          <div>
            <span className="font-semibold">Which wallets are supported?</span>
            <p className="text-muted-foreground">Any wallet that supports TON Connect, including Tonkeeper, OpenMask, MyTonWallet, and more. See the <a href='https://ton.org/wallets' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>wallet list</a>.</p>
          </div>
          <div>
            <span className="font-semibold">How does escrow work?</span>
            <p className="text-muted-foreground">When a client accepts a proposal, Toncoin is held in a smart contract until the job is completed and approved. This ensures trust for both parties.</p>
          </div>
          <div>
            <span className="font-semibold">How is reputation managed?</span>
            <p className="text-muted-foreground">Reputation is earned through successful contracts and can be tied to NFTs or SBTs in the future, making your work history portable and verifiable.</p>
          </div>
          <div>
            <span className="font-semibold">How do I stay safe?</span>
            <p className="text-muted-foreground">Never share your wallet seed phrase or private key. Only use trusted wallets and double-check contract details before approving transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 