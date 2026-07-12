import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Cpu, 
  Layers, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Check, 
  CheckCircle,
  FileCheck 
} from "lucide-react";
import { caseStudies } from "@/components/work/caseStudiesData";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: "i3pl" },
    { id: "cre-crm" },
    { id: "primetimebusinesscentre" }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const targetId = id === "primetimebusinesscentre" ? "cre-crm" : id;
  const project = caseStudies.find((study) => study.id === targetId);
  if (!project) return {};

  return {
    title: `${project.title} Case Study | Stivate`,
    description: `${project.subtitle}. Learn how Stivate delivered: ${project.brief}`,
    alternates: {
      canonical: `/work/${id}`,
    },
  };
}


export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;

  // Normalize id: map "primetimebusinesscentre" or "cre-crm" to "cre-crm"
  const targetId = id === "primetimebusinesscentre" ? "cre-crm" : id;
  const project = caseStudies.find((study) => study.id === targetId);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-transparent text-zinc-900 font-sans">
      <div className="w-full max-w-5xl mx-auto pt-32 pb-24 px-6">
        {/* Back Button & Breadcrumb */}
        <div className="flex items-center gap-4 mb-10">
          <Link 
            href="/work"
            className="p-3 rounded-full border border-slate-400 hover:bg-zinc-900 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Case Study</p>
            <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{project.title}</h4>
          </div>
        </div>

        {/* Case Study Header Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-950 text-white relative overflow-hidden border border-zinc-900 shadow-2xl mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl -z-10" />

          {/* Background Image of header */}
          <div className="absolute inset-0 opacity-20 -z-20">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-3.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                {project.industry}
              </span>
              <span className="px-3.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-[#8BCF2F]">
                {project.client}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {project.title}
            </h1>
            
            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Scrollable Content Sections */}
        <div className="space-y-16">
          {/* Section 1: Overview, Challenges & Approach */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2.5">
                <FileText className="text-primary-hover" size={20} /> Project Overview
              </h3>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium">
                {project.brief}
              </p>
            </div>

            <hr className="border-zinc-100" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Challenges */}
              <div className="space-y-5">
                <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-500 rounded-full" /> Challenges Faced
                </h4>
                <ul className="space-y-3.5">
                  {project.challenge.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 font-medium">
                      <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">!</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approach */}
              <div className="space-y-5">
                <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" /> Our Approach
                </h4>
                <ul className="space-y-3.5">
                  {project.approach.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 font-medium">
                      <CheckCircle2 size={18} className="text-primary-hover mt-0.5 flex-shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Platform Architecture or Solutions Delivered */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            {project.id === "i3pl" ? (
              /* I3PL Architecture Flow & Components */
              <div className="space-y-12">
                {/* Diagram representation */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                    Platform Solution Architecture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.architecture?.steps.map((step, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-extrabold text-zinc-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            Step 0{idx + 1}
                          </span>
                          <span className="text-xxs font-bold text-zinc-400 uppercase">
                            {step.from} → {step.to}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-zinc-900 mb-1">{step.to}</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed font-medium">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-zinc-100" />

                {/* Component breakdown */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                    System Components
                  </h3>
                  <div className="space-y-6">
                    {project.components?.map((comp, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-4">
                        <h4 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                          <Cpu size={18} className="text-primary-hover" /> {comp.name}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {comp.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-600 font-medium">
                              <Check size={16} className="text-primary-hover mt-0.5 flex-shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* UAE CRE CRM Solutions Delivered list */
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                  Solutions Delivered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.solutions?.map((sol, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {sol.title}
                        </h4>
                        <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium">
                          {sol.description}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-zinc-800">
                        <span className="uppercase text-zinc-400 text-[10px] block mb-0.5">Result</span>
                        {sol.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Business Impact, Highlights & Project Value */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                Business & Operational Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.businessImpact.map((impact, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-zinc-950 inline-block">
                      <TrendingUp size={20} />
                    </div>
                    <h4 className="text-base font-extrabold text-zinc-900">{impact.title}</h4>
                    <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium">
                      {impact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-zinc-100" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Tech Highlights */}
              <div className="space-y-5">
                <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                  <Layers size={18} className="text-primary-hover" /> Technical Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techHighlights.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-primary" /> {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Value Statement */}
              <div className="space-y-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-lg font-extrabold text-zinc-950 uppercase tracking-wide flex items-center gap-2">
                  <FileCheck size={18} /> Project Value
                </h4>
                <p className="text-zinc-700 text-xs md:text-sm leading-relaxed font-medium">
                  This engagement demonstrates our ability to engineer high-integrity digital architectures, optimize workflows, and integrate business platforms without causing any disruption to active production settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
