import { Check } from "lucide-react";

const reasons = [
  "We speak your language — no tech jargon, just clear outcomes",
  "We move fast — most projects go live within 2–4 weeks",
  "Everything is built custom for your business, not copy-pasted",
  "We stay with you after launch — not disappear like other agencies",
  "Transparent pricing — you know exactly what you're paying for",
];

export default function WhyStivate() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white/50 backdrop-blur-sm text-zinc-900 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BFDDF0]/15 rounded-full filter blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-400 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600">
            Why Stivate
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-6">
            Why businesses
            <br />
            choose us
          </h2>
          <p className="text-zinc-500 text-lg leading-relaxed">
            We're not just another agency. We're your growth partner — obsessed
            with building systems that actually work for your business.
          </p>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center mt-0.5">
                <Check size={13} className="text-white" strokeWidth={3} />
              </div>
              <p className="text-zinc-700 text-base font-medium leading-snug">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
