import Link from "next/link";
import Image from "next/image";
import { ClipboardCheck, ShieldCheck, HeartHandshake, Eye } from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Stivate | Custom Warehouse & Operations Software Engineers",
  description: "Learn about Stivate's mission to digitize manufacturing plants, logistics networks, and warehouse floors with high-integrity custom systems.",
};

const philosophy = [
  {
    title: "Operations-First Engineering",
    desc: "We don't build software from comfortable offices. Our engineers spend time on your plant floor and loading docks, observing actual workflows before writing single files of code.",
    Icon: Eye
  },
  {
    title: "Production-Safe Middleware",
    desc: "We understand that your ERP system is the company's lifeline. We build parallel staging buffers and queues to guarantee zero downtime or locking issues during integrations.",
    Icon: ShieldCheck
  },
  {
    title: "100% Code Ownership",
    desc: "We believe in clean partnerships. Once a system goes live, you own the entire custom repository, database structure, and deployment keys. No user limits, no monthly license locks.",
    Icon: HeartHandshake
  }
];

const team = [
  {
    name: "Shripad Mankar",
    role: "Founder & Chief Architect",
    bio: "Over 12 years engineering database middleware, warehouse flow charts, and custom ERP extensions for logistics clients in India and UAE."
  },
  {
    name: "Mohammad Yasin Ansari",
    role: "Lead Systems Engineer",
    bio: "Specialist in database telemetry, OCR extraction APIs, and barcode printing protocols, managing production-safe deployments."
  }
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 bg-white bg-grid overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#8BCF2F]/3 rounded-full filter blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600">
            About Stivate
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto">
            We Engineer Software for Plants & Warehouse Floors
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Stivate was founded to bridge the gap between high-level database architecture and the daily realities of operational workers. We build tools that make operations smooth, secure, and fast.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight mt-4">
              Our Core Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 transition-all duration-300 space-y-6"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-primary-hover flex items-center justify-center shadow-sm">
                  <item.Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-zinc-950">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-6 md:px-12 bg-secondary-bg border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Our Team
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
                Operations Specialists
              </h2>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                Stivate is led by experienced developers who understand database logic, network sync middleware, and plant floor environments.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((member, i) => (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm"
                >
                  <div>
                    <h4 className="text-base font-bold text-zinc-950 leading-tight">{member.name}</h4>
                    <p className="text-[#76B827] text-xs font-semibold">{member.role}</p>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 md:px-12 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            Work With Operations-First Engineers
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Let's design and build a secure operational portal that resolves your daily dispatch yard, cycle counts, or PO reconciliation challenges.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md transition-all text-sm"
            >
              <ClipboardCheck size={16} />
              Book Free Process Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
