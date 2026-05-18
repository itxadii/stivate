import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Result {
  Icon: LucideIcon;
  stat: string;
  label: string;
  desc: string;
}

const results: Result[] = [
  {
    Icon: TrendingUp,
    stat: "3×",
    label: "more leads",
    desc: "Retail store in Mumbai after launching their website + WhatsApp bot",
  },
  {
    Icon: DollarSign,
    stat: "₹4L",
    label: "saved per month",
    desc: "Logistics company after automating their daily reporting",
  },
  {
    Icon: Clock,
    stat: "60%",
    label: "faster response time",
    desc: "Service business after WhatsApp automation went live",
  },
  {
    Icon: CheckCircle,
    stat: "0",
    label: "missed follow-ups",
    desc: "Coaching institute after switching to their custom CRM",
  },
];

export default function Results() {
  return (
    <section
      id="results"
      className="py-24 px-6 md:px-12 bg-[#FFF6DE] text-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Real businesses. Real results.
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Numbers that speak for themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {results.map(({ Icon, stat, label, desc }, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-slate-400 hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center mb-5">
                <Icon size={16} className="text-zinc-500" />
              </div>
              <div className="text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-1">
                {stat}
              </div>
              <div className="text-base font-semibold text-zinc-700 mb-3">{label}</div>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
