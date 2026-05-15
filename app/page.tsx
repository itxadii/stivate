import Hero from "@/components/home/Hero";
import OurStudio from "@/components/home/OurStudio";
import Clients from "@/components/home/Clients";
import Services from "@/components/home/Services";
import OurWork from "@/components/home/OurWork";
import OurApproach from "@/components/home/OurApproach";
import HowItWorks from "@/components/home/HowItWorks";
import KeyStats from "@/components/home/KeyStats";
import Testimonials from "@/components/home/Testimonials";
import People from "@/components/home/People";
import GetStarted from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-[#FFF9D2] text-zinc-900 font-sans selection:bg-[#FFEBCC]">
      <Hero />
      <OurStudio />
      <Clients />
      <Services />
      <OurWork />
      <OurApproach />
      <HowItWorks />
      <KeyStats />
      <Testimonials />
      <People />
      <GetStarted />
      <Footer />
    </main>
  );
}
