import { AlertCircle } from "lucide-react";

const problems = [
  "You're losing leads because nobody replies fast enough on WhatsApp",
  "Your team wastes hours on follow-ups, spreadsheets, and copy-pasting data",
  "You have no website — or one that looks outdated and drives customers away",
  "You want to grow, but your systems can't keep up",
];

export default function Problem() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFF6DE] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#BFDDF0]/30 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600">
            Sound familiar?
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Does any of this hit close to home?
          </h2>
        </div>

        <div className="space-y-4 mb-14">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mt-0.5">
                <AlertCircle size={15} className="text-red-400" />
              </div>
              <p className="text-zinc-700 text-base md:text-lg font-medium leading-relaxed group-hover:text-zinc-900 transition-colors">
                {problem}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 text-white text-center shadow-2xl">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            You don't have a business problem.
            <br />
            <span className="text-[#BFDDF0]">You have a systems problem.</span>
          </p>
          <p className="mt-3 text-zinc-400 text-base">We fix that.</p>
        </div>
      </div>
    </section>
  );
}
