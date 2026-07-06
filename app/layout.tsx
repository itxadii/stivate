import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CookiePopup from "@/components/ui/CookiePopup";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stivate.com"),
  title: "Stivate — Logistics Automation, Custom WMS & Enterprise Web Systems",
  description: "We build custom WMS software, logistics automation platforms, SAP integrations, and high-performance web systems to scale warehousing and supply chain operations.",
  keywords: [
    "Logistics Automation",
    "Warehouse Management System",
    "WMS Software",
    "SAP ERP Integration",
    "OCR Document Processing",
    "QR Inventory Tracking",
    "Supply Chain Systems",
    "Enterprise Web Development",
    "Stivate"
  ],
  authors: [{ name: "Stivate" }],
  openGraph: {
    title: "Stivate — Logistics Automation & Custom WMS",
    description: "High-performance logistics automation platforms, WMS tracking systems, and SAP integrations.",
    url: "https://stivate.com",
    siteName: "Stivate",
    images: [
      {
        url: "https://stivate.com/logo.png",
        width: 800,
        height: 600,
        alt: "Stivate Logo"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stivate — Logistics Automation & Custom WMS",
    description: "High-performance logistics automation platforms, WMS tracking systems, and SAP integrations.",
    images: ["https://stivate.com/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const isAdmin = headersList.get("x-is-admin") === "true";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stivate",
    "url": "https://stivate.com",
    "logo": "https://stivate.com/logo.png",
    "image": "https://stivate.com/logo.png",
    "description": "We build logistics automation platforms, custom WMS tracking portals, SAP ERP integrations, and enterprise web portals.",
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
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GQWMGVG48M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GQWMGVG48M');
          `}
        </Script>
        <LenisProvider>
          {!isAdmin && <NoiseOverlay />}
          {!isAdmin && <Navbar />}
          {children}
          {!isAdmin && <CookiePopup />}
        </LenisProvider>
      </body>
    </html>
  );
}
