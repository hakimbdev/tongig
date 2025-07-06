"use client";

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-base leading-relaxed">
        <p>Your privacy is important to us. This policy explains how TONGig collects, uses, and protects your information.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Data We Collect</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Wallet addresses for login and transaction purposes.</li>
          <li>Job and proposal details you submit.</li>
          <li>Optional profile information (if provided).</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Data</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>To enable job posting, proposals, and contract management.</li>
          <li>To facilitate Toncoin payments and escrow.</li>
          <li>To improve platform features and security.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Wallet Privacy</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>We never store your private keys or seed phrases.</li>
          <li>Wallet addresses are public on the blockchain but not shared with third parties for marketing.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Blockchain Transparency</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>All transactions are public and immutable on the TON blockchain.</li>
          <li>We cannot delete or alter blockchain records.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Contact</h2>
        <p>If you have questions about this policy, contact us at support@tongig.app.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Web3 & Blockchain Privacy</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>TONGig uses wallet-based authentication; we never require email, phone, or traditional personal data for login.</li>
          <li>All actions (job posts, proposals, contracts, payments) are recorded on the TON blockchain and are publicly visible and immutable.</li>
          <li>We do not track your off-chain browsing or activity outside the TONGig platform.</li>
          <li>You have full sovereignty over your wallet and data; TONGig never stores or has access to your private keys or seed phrases.</li>
          <li>While blockchain data is public, we do not link wallet addresses to real-world identities.</li>
        </ul>
      </div>
    </div>
  );
} 