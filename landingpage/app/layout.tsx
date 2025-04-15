import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brainly - Smart Bookmarking Platform",
  description:
    "Brainly pulls your saved content from social platforms and organizes them with AI-driven metadata and tags.",
  keywords: "bookmarks, organization, AI, metadata, social platforms, LinkedIn, Twitter, Threads",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
