const steps = [
  {
    num: "01",
    title: "Process Audit",
    desc: "We walk your warehouse floor or audit operational sheets to map existing dispatch and receiving patterns.",
  },
  {
    num: "02",
    title: "Requirement Analysis",
    desc: "We identify exact API connections, custom ERP schema extensions, and user security roles needed.",
  },
  {
    num: "03",
    title: "Solution Design",
    desc: "We sketch structural database models, API flows, and clean responsive dashboard views.",
  },
  {
    num: "04",
    title: "Development",
    desc: "We construct your specialized cloud web panels, QR scanning APIs, and server-side database endpoints.",
  },
  {
    num: "05",
    title: "Testing & Validation",
    desc: "We run deep integration tests against simulated network lags and load spikes to prevent runtime errors.",
  },
  {
    num: "06",
    title: "Staged Deployment",
    desc: "We launch the system in a secure sandbox, verify ERP data mirrors, and then flip to live production.",
  },
  {
    num: "07",
    title: "Operator Training",
    desc: "We provide hands-on guides for warehouse workers, QR scanning runs, and administrative walkthroughs.",
  },
  {
    num: "08",
    title: "Continuous Support",
    desc: "We monitor systems, check database backups, and maintain API health keys to guarantee 99.9% uptime.",
  },
];

export default function HowWeWorkTimeline() {
  return (
    <section id="how-we-work" className="py-24 px-6 md:px-12 bg-secondary-bg border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Our Method
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            How We Work
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-3">
            A structured, 8-phase implementation pipeline engineered to ensure zero database downtime and fast on-floor adoption.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-slate-300 md:ml-32 pl-8 md:pl-12 space-y-12 py-2">
          {steps.map(({ num, title, desc }, i) => (
            <div key={i} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-slate-300 group-hover:border-primary group-hover:bg-primary transition-colors duration-300 flex items-center justify-center text-xs font-bold text-zinc-600 group-hover:text-primary-foreground shadow-sm">
                {num}
              </div>

              {/* Content box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                <h3 className="text-lg font-bold text-zinc-950 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
