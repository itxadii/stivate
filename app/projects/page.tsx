import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import LeadCapture from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";

export default function ProjectsPage() {
  return (
    <main className="relative w-full bg-[#FFF6DE] text-zinc-900 font-sans selection:bg-[#e4d9b8]">
      <ProjectsHero />
      <ProjectsGrid />
      <LeadCapture />
      <Footer />
    </main>
  );
}
