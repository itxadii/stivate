import CareersHero from "@/components/careers/CareersHero";
import JobListings from "@/components/careers/JobListings";
import Footer from "@/components/layout/Footer";

export default function CareersPage() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans ">
      <CareersHero />
      <JobListings />
      <Footer />
    </main>
  );
}


