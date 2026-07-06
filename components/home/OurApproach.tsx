import { Check } from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    title: "Operations First, Code Second",
    desc: "We spend time on your plant floor or warehouse before we write a single line of code."
  },
  {
    title: "Fast, Production-Safe Iteration",
    desc: "We deploy stable middleware integrations and test modules in weeks, not months."
  },
  {
    title: "100% Tailored Enterprise Code",
    desc: "No locked SaaS systems. You own the code repository, hosting, and integrations."
  },
  {
    title: "Legacy-Safe ERP Middleware",
    desc: "We connect custom systems to SAP, Oracle, and Tally without breaking active database states."
  },
  {
    title: "Dedicated Local Engineers",
    desc: "We stay on-call and offer hands-on training to ensure operational success on-floor."
  }
];

export default function WhyStivate() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-zinc-900 relative overflow-hidden">
      {/* Soft background light green glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#8BCF2F]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — Reasons */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Why Choose Stivate
          </div>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-6">
            We are not just a design agency. We are software engineers who build robust systems to automate your plant and warehouse floor.
          </p>
          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-[#76B827] flex items-center justify-center mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 mb-0.5">{reason.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Why Choose Us Image */}
        <div className="flex items-center justify-center">
          <Image
            src="/whychooseus.png"
            alt="Why Choose Us"
            width={500}
            height={500}
            className="w-full max-w-md h-auto object-contain rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

