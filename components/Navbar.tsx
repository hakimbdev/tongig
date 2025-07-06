import Link from "next/link";
import { Menu, Diamond } from "lucide-react";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { useState } from "react";

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/placeholder-logo.png" alt="TONGig Logo" className="h-8 w-auto" />
            <span className="font-bold">TONGig</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/page#jobs" className="text-sm font-medium transition-colors hover:text-primary">
              Job Board
            </Link>
            <Link href="/page#contracts" className="text-sm font-medium transition-colors hover:text-primary">
              Active Contracts
            </Link>
            <Link href="/page#about" className="text-sm font-medium transition-colors hover:text-primary">
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
          <Link href="/page#jobs" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
            Job Board
          </Link>
          <Link href="/page#contracts" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
            Active Contracts
          </Link>
          <Link href="/page#about" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
            About
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setMobileNavOpen(false)}>
            How It Works
          </Link>
        </div>
      )}
    </header>
  );
} 