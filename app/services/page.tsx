import ServicesHero from "@/components/services/ServicesHero";
import DetailedServices from "@/components/services/DetailedServices";
import HowItWorks from "@/components/home/HowItWorks";
import LeadCapture from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Web Systems & Operations Automation Services | Stivate",
  description: "Custom software engineering services for warehouse automation, SAP integrations, OCR document engines, and custom business portals.",
  alternates: {
    canonical: "/services",
  },
};


export default function ServicesPage() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans">
      <ServicesHero />
      <DetailedServices />
      <HowItWorks />
      <LeadCapture />
      <Footer />
    </main>
  );
}

