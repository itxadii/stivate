import Hero from "@/components/home/Hero";
import Problem from "@/components/home/OurStudio";
import ClientsBar from "@/components/home/People";
import Services from "@/components/home/Services";
import Results from "@/components/home/OurWork";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStivate from "@/components/home/OurApproach";
import Testimonials from "@/components/home/Testimonials";
import LeadCapture from "@/components/home/GetStarted";
import FAQ from "@/components/home/KeyStats";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-[#FFF6DE] text-zinc-900 font-sans selection:bg-[#e4d9b8]">
      <Hero />
      <ClientsBar />
      <Problem />
      <Services />
      <Results />
      <HowItWorks />
      <WhyStivate />
      <Testimonials />
      <LeadCapture />
      <FAQ />
      <Footer />
    </main>
  );
}
