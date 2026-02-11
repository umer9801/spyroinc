import React from "react"
import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Spyro Inc - Professional Construction & Renovation Services',
  description: 'Spyro Inc Construction - 25+ years of expert construction and renovation services in the Greater Toronto Area. Specializing in basements, flooring, and complete home renovations.',
  keywords: 'construction, renovation, basements, flooring, Toronto, contractor',
  openGraph: {
    title: 'Spyro Inc - Professional Construction & Renovation',
    description: '25+ years of expert construction and renovation services',
    url: 'https://spyroinc.com',
    siteName: 'Spyro Inc Construction',
    images: [
      {
        url: '/images/hero-construction.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
