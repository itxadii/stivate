import CareersHero from "@/components/careers/CareersHero";
import JobListings from "@/components/careers/JobListings";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Stivate | Build Logistics & Automation Software",
  description: "Join Stivate to build high-performance warehouse management systems, SAP integrations, and logistics automation platforms. Explore open engineering roles.",
  alternates: {
    canonical: "/careers",
  },
};


export default function CareersPage() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans ">
      <CareersHero />
      <JobListings />
      <Footer />
    </main>
  );
}


