"use client";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-base leading-relaxed">
        <p>Welcome to TONGig. By using our platform, you agree to the following terms and conditions. Please read them carefully.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">1. User Responsibilities</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>You must connect a valid TON wallet to use TONGig.</li>
          <li>Clients are responsible for posting accurate job descriptions and budgets.</li>
          <li>Freelancers must deliver work as agreed in the contract.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Payments & Escrow</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>All payments are made in Toncoin (TON) via smart contract escrow.</li>
          <li>Funds are released to freelancers only after client approval.</li>
          <li>TONGig does not hold or control user funds at any time.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Dispute Resolution</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Disputes should be resolved between client and freelancer.</li>
          <li>TONGig may provide guidance but does not arbitrate or reverse blockchain transactions.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Blockchain Disclaimer</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>All transactions are final and recorded on the TON blockchain.</li>
          <li>Users are responsible for the security of their wallets and private keys.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Changes to Terms</h2>
        <p>We may update these terms from time to time. Continued use of TONGig constitutes acceptance of the latest version.</p>
      </div>
    </div>
  );
} 