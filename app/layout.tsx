import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TonWalletProvider } from "@/components/ton-wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TONGig – Decentralized Freelance Marketplace",
  description: "A Web3-powered freelance marketplace on the TON blockchain for global freelancers and clients.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TonWalletProvider>
            {children}
          </TonWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'