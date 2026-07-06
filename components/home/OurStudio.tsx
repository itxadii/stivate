import { 
  FileSpreadsheet, 
  FileSignature, 
  Clock, 
  EyeOff, 
  BarChart, 
  Copy, 
  MapPin, 
  UserCheck 
} from "lucide-react";

const problems = [
  {
    title: "Manual Excel Processes",
    desc: "Relying on offline spreadsheets to track inventory movements and dispatch logs.",
    impact: "Impact: Triggers version conflicts, file loss, and zero real-time visibility.",
    Icon: FileSpreadsheet
  },
  {
    title: "Paper-based Approvals",
    desc: "Routing physical gate passes, delivery challans, and PO sheets for manual signatures.",
    impact: "Impact: Causes bottlenecks at gate loading and delays invoice clearance.",
    Icon: FileSignature
  },
  {
    title: "Vehicle & Dispatch Delays",
    desc: "Slow vehicle check-ins and unstructured driver registration workflows.",
    impact: "Impact: Increases turnaround times (TAT) and incurs transporter penalties.",
    Icon: Clock
  },
  {
    title: "Lack of Visibility",
    desc: "No single-pane visibility over dock availability, bin occupancy, or pending dispatches.",
    impact: "Impact: Plant heads cannot adjust layout sorting plans dynamically.",
    Icon: EyeOff
  },
  {
    title: "Manual Reporting",
    desc: "Compiling weekly operational and stock metrics by manually merging siloed logs.",
    impact: "Impact: Consumes administrative labor and delays weekly dispatch decisions.",
    Icon: BarChart
  },
  {
    title: "Duplicate Data Entry",
    desc: "Re-typing shipping challan details across multiple isolated portal terminals.",
    impact: "Impact: Doubles manual entry work and introduces data mismatch errors.",
    Icon: Copy
  },
  {
    title: "Inventory Inaccuracies",
    desc: "Missing physical bin locations and blind spot slots in storage corridors.",
    impact: "Impact: Slows picking speeds and triggers accidental stockouts.",
    Icon: MapPin
  },
  {
    title: "Unmonitored Productivity",
    desc: "No clear metrics on sorting, picking, or packing counts per warehouse worker.",
    impact: "Impact: Prevents performance-based incentives and hinders labor planning.",
    Icon: UserCheck
  }
];

export default function Problem() {
  return (
    <section className="py-24 px-6 md:px-12 bg-secondary-bg border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Operational Bottlenecks
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            The Hidden Costs of Manual Operations
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-3">
            Legacy workflows and paper checklists limit warehouse throughput. Here are the core process gaps we eliminate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map(({ title, desc, impact, Icon }, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary-hover flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 mb-1 leading-snug">
                    {title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-[#76B827]">
                  {impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-dark-bg text-white text-center shadow-xl max-w-3xl mx-auto">
          <p className="text-lg md:text-xl font-bold leading-relaxed">
            You don't have a business capacity problem.
            <br />
            <span className="text-primary font-black">You have a systems integration problem.</span>
          </p>
          <p className="mt-3 text-slate-400 text-sm">We engineer the custom software to resolve it.</p>
        </div>
      </div>
    </section>
  );
}


