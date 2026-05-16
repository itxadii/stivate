import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CookiePopup from "@/components/ui/CookiePopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stivate — Websites, WhatsApp Bots & CRM for Indian Businesses",
  description: "We build high-performance websites, WhatsApp automation, and custom CRMs that help Indian businesses grow faster. Get a free 30-minute strategy session today.",
  keywords: ["Web Design India", "WhatsApp Automation", "Custom CRM", "Business Automation India", "Stivate"],
  authors: [{ name: "Stivate" }],
  openGraph: {
    title: "Stivate — Digital Systems for Growth",
    description: "Websites, WhatsApp Automation, and Custom CRMs for Indian Businesses.",
    url: "https://stivate.com",
    siteName: "Stivate",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stivate — Digital Systems for Growth",
    description: "Websites, WhatsApp Automation, and Custom CRMs for Indian Businesses.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stivate",
    "url": "https://stivate.com",
    "logo": "https://stivate.com/logo.png",
    "description": "We build websites, WhatsApp automation, and custom CRMs for Indian businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "hello@stivate.com"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
        <LenisProvider>
          <NoiseOverlay />
          <Navbar />
          {children}
          <CookiePopup />
        </LenisProvider>
      </body>
    </html>
  );
}
