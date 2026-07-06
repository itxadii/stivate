import { TrendingUp, Clock, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

const metrics = [
  {
    value: "90% Faster",
    label: "GRN & Inbound Logging",
    desc: "OCR invoice processing matches PO SKU lists automatically, eliminating manual typing backlogs."
  },
  {
    value: "45% Reduction",
    label: "Trailer Yard TAT",
    desc: "Automated trailer gate logs and loading bay scheduling calendars reduce driver turnaround times."
  },
  {
    value: "99.9%",
    label: "Inventory Accuracy",
    desc: "Mobile QR bin-location scanning reconciles shelf balances directly against SAP databases."
  }
];

const comparisons = [
  { process: "Inbound Document Receiving", manual: "120 mins", automated: "12 mins", percent: "90% saved" },
  { process: "Physical Cycle Counting", manual: "4 hours", automated: "15 mins", percent: "93% saved" },
  { process: "Bay Dispatch Verification", manual: "45 mins", automated: "5 mins", percent: "88% saved" }
];

export default function Results() {
  return (
    <section id="results" className="py-24 px-6 md:px-12 bg-secondary-bg border-y border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#76B827] text-xs font-bold uppercase tracking-wider inline-block">
            Our Performance Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
            Outcomes That Drive Efficiency
          </h2>
          <p className="text-zinc-500 text-base md:text-lg">
            We measure success in minutes saved and loading bay throughput. Here is the operational impact we deliver.
          </p>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-[#76B827] tracking-tight">
                  {m.value}
                </div>
                <h4 className="text-base font-bold text-zinc-950">{m.label}</h4>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Before vs After Table Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-950 mb-8 flex items-center gap-2">
            <Clock className="text-[#76B827]" size={20} />
            Floor Process Execution Speeds
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="pb-4 pr-4">Operational Process</th>
                  <th className="pb-4 px-4 text-center">Manual (Before)</th>
                  <th className="pb-4 px-4 text-center">Stivate WMS (After)</th>
                  <th className="pb-4 pl-4 text-right">Time Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {comparisons.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 pr-4 text-zinc-900 font-bold">{c.process}</td>
                    <td className="py-5 px-4 text-center text-zinc-500 font-mono">
                      <span className="inline-flex items-center gap-1">
                        <AlertCircle size={12} className="text-red-400" />
                        {c.manual}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center text-[#76B827] font-mono">
                      <span className="inline-flex items-center gap-1 font-bold">
                        <ShieldCheck size={12} />
                        {c.automated}
                      </span>
                    </td>
                    <td className="py-5 pl-4 text-right font-mono">
                      <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#8BCF2F]/10 text-[#76B827] px-2 py-0.5 rounded border border-[#8BCF2F]/20">
                        {c.percent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
