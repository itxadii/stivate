import Hero from "@/components/home/Hero";
import Problem from "@/components/home/OurStudio";
import ClientsBar from "@/components/home/People";
import Industries from "@/components/home/Industries";
import SolutionsPreviewGrid from "@/components/home/Services";
import Results from "@/components/home/OurWork";
import HowWeWorkTimeline from "@/components/home/HowItWorks";
import WhyStivate from "@/components/home/OurApproach";
import Testimonials from "@/components/home/Testimonials";
import LeadCapture from "@/components/home/GetStarted";
import FAQ from "@/components/home/KeyStats";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Manufacturing & Warehouse Automation Software | Stivate",
  description: "Stivate builds custom software for manufacturing companies, warehouses, and 3PL providers. Automate dispatch, GRN, gate entry, employee productivity, reporting, and operational workflows.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stivate",
    "url": "https://stivate.com"
  };

  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero />
      <ClientsBar />
      <Problem />
      <Industries />
      <SolutionsPreviewGrid />
      <Results />
      <HowWeWorkTimeline />
      <WhyStivate />
      <Testimonials />
      <LeadCapture />
      <FAQ />
      <Footer />
    </main>
  );
}

