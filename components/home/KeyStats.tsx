"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build my website / CRM / automation?",
    a: "Most projects are delivered in 2–4 weeks. We move fast without cutting corners.",
  },
  {
    q: "Do I need to be tech-savvy?",
    a: "Not at all. We explain everything in plain language and train your team before handover.",
  },
  {
    q: "What if I don't know what I need?",
    a: "That's exactly what our free strategy call is for. We'll figure it out together.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes — most of our clients are small to mid-sized businesses who are ready to grow and need the right systems to do it.",
  },
  {
    q: "What happens after the project is done?",
    a: "We offer ongoing support and maintenance. We're not the kind of team that builds and disappears.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent text-zinc-900 border-t border-zinc-200 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#BFDDF0]/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-400 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/80 transition-all duration-200"
              >
                <span className="text-zinc-900 font-semibold text-base leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-zinc-400 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-zinc-500 text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


