import ServicesHero from "@/components/services/ServicesHero";
import DetailedServices from "@/components/services/DetailedServices";
import HowItWorks from "@/components/home/HowItWorks";
import LeadCapture from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
  return (
    <main className="relative w-full bg-[#FFF6DE] text-zinc-900 font-sans selection:bg-[#e4d9b8]">
      <ServicesHero />
      <DetailedServices />
      <HowItWorks />
      <LeadCapture />
      <Footer />
    </main>
  );
}
