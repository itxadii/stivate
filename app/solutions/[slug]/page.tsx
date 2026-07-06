import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "../solutionsData";
import { 
  ArrowLeft, 
  CheckCircle, 
  HelpCircle, 
  Briefcase, 
  Layout, 
  TrendingUp, 
  FileText 
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return solutions.map((sol) => ({
    slug: sol.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sol = solutions.find((s) => s.slug === slug);

  if (!sol) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      <div className="w-full max-w-5xl mx-auto pt-32 pb-24 px-6">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 mb-10">
          <Link 
            href="/solutions"
            className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Solutions</p>
            <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{sol.title}</h4>
          </div>
        </div>

        {/* Title Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-secondary-bg border border-slate-200 shadow-sm mb-16 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/3 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <span className="px-3.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#76B827]">
              Industrial Module
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
              {sol.title}
            </h1>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl">
              {sol.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Details (Col-8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* The Operational Challenge */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="text-red-500" size={20} />
                The Operational Bottleneck
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                {sol.problem}
              </p>
            </div>

            {/* How We Solve It */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Layout className="text-[#76B827]" size={20} />
                System Integration & Workflow
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                {sol.solution}
              </p>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-950 uppercase tracking-wide text-xs">
                Key Product Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sol.features.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50/50 border border-slate-200 flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-[#76B827] flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Outcomes (Col-4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Expected Impacts */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-[#76B827]" /> Expected Outcomes
              </h3>
              <ul className="space-y-4">
                {sol.impacts.map((imp, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-zinc-600 font-medium">
                    <span className="w-1.5 h-6 bg-primary rounded-full flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Callout */}
            <div className="p-6 rounded-2xl bg-dark-bg text-white space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Need this system?</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                We custom design this application to fit your specific loading bay parameters and ERP constraints. Let's schedule an audit.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full flex justify-center py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs hover:bg-primary-hover shadow-md transition-colors"
                >
                  Schedule Free Audit
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
