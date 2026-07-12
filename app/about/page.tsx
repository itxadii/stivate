import Link from "next/link";
import Image from "next/image";
import { 
  ClipboardCheck, 
  ShieldCheck, 
  HeartHandshake, 
  Eye, 
  TrendingUp,
  ArrowRight 
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Stivate Manufacturing Automation Company",
  description: "Learn about Stivate's journey to help manufacturing operations, warehouses, and 3PL providers modernize workflows and move beyond manual spreadsheet sheets.",
  alternates: {
    canonical: "/about",
  },
};


const values = [
  {
    title: "Understand Before We Build",
    desc: "Every solution starts with understanding the client's operations, not assumptions.",
    Icon: Eye
  },
  {
    title: "Solve Real Business Problems",
    desc: "We focus on practical software that saves time, reduces manual work, and improves operational efficiency.",
    Icon: ShieldCheck
  },
  {
    title: "Build for Long-Term Value",
    desc: "Our goal is to create reliable systems that businesses can depend on as they grow.",
    Icon: TrendingUp
  },
  {
    title: "Work as Partners",
    desc: "We believe successful software is built through close collaboration with our clients, maintaining transparency throughout every stage of the project.",
    Icon: HeartHandshake
  },
  {
    title: "Continuously Improve",
    desc: "Every implementation helps us refine our products, strengthen our expertise, and deliver better solutions for future customers.",
    Icon: ClipboardCheck
  }
];

const team = [
  {
    name: "Aditya Waghmare",
    role: "Co-Founder • Technology & Delivery",
    bio: "Aditya leads the technical vision and execution at Stivate. He is responsible for understanding client requirements, designing software architecture, managing product development, overseeing implementation, and ensuring successful project delivery. He works directly with clients during discovery sessions to translate operational challenges into reliable software solutions."
  },
  {
    name: "Prathamesh Kolpe",
    role: "Co-Founder • Client Relations & Business Development",
    bio: "Prathamesh leads client relationships and business development at Stivate. He is responsible for identifying new opportunities, building long-term partnerships, understanding customer requirements, and guiding organizations through the consultation process. He works closely with clients to ensure every engagement begins with a clear understanding of their operational goals."
  }
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 bg-white overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#8BCF2F]/3 rounded-full filter blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600">
            About Stivate
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Building Software Around Real Operational Challenges
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            We simplify manufacturing, warehouse, and logistics processes through deep collaboration, custom engineering, and practical tools.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-zinc-700 leading-relaxed text-sm md:text-base font-medium">
          <p className="text-lg md:text-2xl font-black text-zinc-950 leading-snug">
            Stivate is a technology company focused on helping manufacturing businesses, warehouses, and third-party logistics (3PL) providers improve their day-to-day operations through custom software and intelligent automation.
          </p>
          <p>
            Our journey began with a simple observation: many growing businesses still rely on spreadsheets, paper records, and disconnected tools to manage critical operations. These manual processes often lead to delays, errors, duplicate work, and limited visibility.
          </p>
          <p>
            Instead of offering generic software, we work closely with our clients to understand how their operations function on the ground. From warehouse dispatch and delivery challans to gate entry, employee productivity, reporting, and workflow automation, we design solutions that fit the way each business actually works.
          </p>
          <p>
            Our approach combines process analysis, software engineering, and practical implementation to build systems that simplify operations, improve efficiency, and support long-term growth.
          </p>
          <p>
            As we continue to work with manufacturing and logistics companies, our vision is to build a comprehensive suite of automation solutions that modernize industrial operations while remaining practical, scalable, and easy to use.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-6 md:px-12 bg-secondary-bg border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Our Founders
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
                Meet the Founders
              </h2>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                Stivate is led by specialists dedicated to operational precision, technical excellence, and long-term client relations.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {team.map((member, i) => (
                <div 
                  key={i}
                  className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-black text-zinc-950 leading-tight">{member.name}</h4>
                      <p className="text-[#76B827] text-xs font-bold uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight mt-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 transition-all duration-300 space-y-6"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-primary-hover flex items-center justify-center shadow-sm">
                  <item.Icon size={22} className="text-[#76B827]" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#76B827] uppercase tracking-widest">
            Our Vision
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight leading-relaxed max-w-2xl mx-auto">
            "To become a trusted technology partner for manufacturing and logistics businesses by building software that simplifies operations, increases visibility, and helps organizations move beyond manual processes toward efficient, data-driven workflows."
          </h2>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 md:px-12 bg-white text-center border-t border-slate-100">
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
