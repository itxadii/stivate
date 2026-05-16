import CareersHero from "@/components/careers/CareersHero";
import JobListings from "@/components/careers/JobListings";
import Footer from "@/components/layout/Footer";

export default function CareersPage() {
  return (
    <main className="relative w-full bg-[#FFF6DE] text-zinc-900 font-sans selection:bg-[#e4d9b8]">
      <CareersHero />
      <JobListings />
      <Footer />
    </main>
  );
}
