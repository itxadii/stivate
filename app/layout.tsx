import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stivate — Websites, WhatsApp Bots & CRM for Indian Businesses",
  description: "We build websites, WhatsApp automation, and custom CRMs that help Indian businesses grow faster. Get a free 30-minute strategy session today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
        <LenisProvider>
          <NoiseOverlay />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
