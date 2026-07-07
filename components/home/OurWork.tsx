import { TrendingUp, Clock, ShieldCheck, AlertCircle, ArrowRight, Truck, Database, Activity, Package } from "lucide-react";

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

        {/* Inspired Performance Console Card */}
        <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-[#1e2530] border border-slate-700 shadow-2xl text-slate-100 flex flex-col justify-between font-sans">
          <div>
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-3">
                  STIVATE_PERFORMANCE_ANALYTICS_01
                </span>
              </div>
              <span className="px-2.5 py-1 rounded text-[9px] font-extrabold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 uppercase tracking-wider">
                LIVE PERFORMANCE
              </span>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-[#12161f]/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider">Avg. Cycle Time Reduction</span>
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">90.3% Faster</div>
                  <p className="text-[10px] text-primary font-medium mt-1">Across all automated workflows</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#12161f]/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider">SAP Sync Latency</span>
                  <Database className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#10B981]">&lt; 1.2 Seconds</div>
                  <p className="text-[10px] text-slate-500 mt-1">Active database sync & check</p>
                </div>
              </div>
            </div>

            {/* Core Section: Process Optimization Pipeline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-300 border-b border-slate-700/80 pb-2">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Floor Process Execution Speeds</span>
              </div>

              <div className="space-y-3">
                {comparisons.map((c, idx) => {
                  const badgeClasses = 
                    idx === 0 ? "text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20" :
                    idx === 1 ? "text-[#8BCF2F] bg-[#8BCF2F]/10 border border-[#8BCF2F]/20" :
                    "text-orange-400 bg-orange-400/10 border border-orange-400/20";

                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-[#12161f]/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#12161f]/80"
                    >
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">{c.process}</h5>
                        <p className="text-[10px] text-slate-400">
                          Manual Time: <span className="text-red-400 font-mono font-bold line-through mr-2">{c.manual}</span>
                          ➔ Automated Time: <span className="text-primary font-mono font-bold">{c.automated}</span>
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold text-center self-start sm:self-center uppercase tracking-wider ${badgeClasses}`}>
                        {c.percent}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-700/80 pt-4 mt-6 text-slate-400 text-[10px]">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-primary" />
              Continuous performance logs active
            </span>
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <ShieldCheck className="w-3.5 h-3.5" />
              SSL Secured
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
