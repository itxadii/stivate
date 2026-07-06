import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "../industriesData";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  Settings 
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);

  if (!ind) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      <div className="w-full max-w-5xl mx-auto pt-32 pb-24 px-6">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 mb-10">
          <Link 
            href="/industries"
            className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Industries</p>
            <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{ind.name}</h4>
          </div>
        </div>

        {/* Title Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-secondary-bg border border-slate-200 shadow-sm mb-16 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/3 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <span className="px-3.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#76B827]">
              Sector Profile
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
              {ind.title}
            </h1>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl">
              {ind.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Details (Col-8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Core Bottlenecks */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={20} />
                Operational Gaps & Bottlenecks
              </h3>
              <ul className="space-y-3.5">
                {ind.bottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-zinc-700 font-medium">
                    <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5">!</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Stivate Solutions */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Settings className="text-[#76B827]" size={20} />
                How We Solve It
              </h3>
              <ul className="space-y-3.5">
                {ind.solutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 font-medium">
                    <CheckCircle size={18} className="text-primary-hover mt-0.5 flex-shrink-0" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar / Outcomes (Col-4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Business Outcomes */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-[#76B827]" /> Target Metrics
              </h3>
              <ul className="space-y-4">
                {ind.impacts.map((imp, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-zinc-600 font-medium">
                    <span className="w-1.5 h-6 bg-primary rounded-full flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Audit Callout */}
            <div className="p-6 rounded-2xl bg-dark-bg text-white space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Request Staging Trial</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Want to see a sandbox demo of our {ind.name} tracking system? Let's check integration schemas for your site.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full flex justify-center py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs hover:bg-primary-hover shadow-md transition-colors"
                >
                  Request Sandbox Demo
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
