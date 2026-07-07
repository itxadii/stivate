"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of databases and ERP systems do you integrate with?",
    a: "We integrate custom operational portals directly with SAP (ECC & S/4HANA), Oracle ERP, Microsoft Dynamics, Tally, and custom SQL databases using secure middleware APIs.",
  },
  {
    q: "How do you ensure zero database downtime during integration?",
    a: "We build staging sandboxes that run in parallel. We use read-replicated databases and secure queue middleware so the live production ERP is never locked or exposed during deployment.",
  },
  {
    q: "Who owns the custom software and source code after launch?",
    a: "You do. We build 100% custom software. Upon project completion, you receive full source code ownership, database schemas, and active intellectual property rights.",
  },
  {
    q: "What is your average timeline to launch a custom WMS or dispatch tool?",
    a: "Most custom operational systems and integrations are deployed within 3 to 6 weeks. We roll out in modular phases so you get immediately usable tools on the floor.",
  },
  {
    q: "What kind of post-launch maintenance SLA do you provide?",
    a: "We provide dedicated technical support, active server telemetry monitoring, automatic database backups, and security patch upgrades with clear response time guarantees.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-white text-zinc-900 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-100/50 transition-all duration-200 cursor-pointer"
              >
                <span className="text-zinc-950 font-bold text-base leading-snug">
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
                <p className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed">
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


