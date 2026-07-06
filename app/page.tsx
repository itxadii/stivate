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

export default function Home() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans">
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

