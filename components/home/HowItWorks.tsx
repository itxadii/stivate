import { Phone, Hammer, Rocket, type LucideIcon } from "lucide-react";
import ModernButton from "../ui/ModernButton";

interface Step {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    Icon: Phone,
    title: "Free Strategy Call",
    desc: "Tell us about your business. We'll map out exactly what's holding you back and what to build first.",
  },
  {
    num: "02",
    Icon: Hammer,
    title: "We Build It",
    desc: "Our team designs and delivers your solution fast. No fluff, no delays, no jargon — just results.",
  },
  {
    num: "03",
    Icon: Rocket,
    title: "You Grow",
    desc: "Your new system goes live. More leads come in. Less time wasted. You focus on running your business.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#FFF6DE] to-white/60 text-zinc-900 border-t border-[#FFF6DE] relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-[#FFF6DE]/50 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-400 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600">
            Simple process
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            From idea to live system
            <br />
            <span className="text-zinc-400">in 3 steps</span>
          </h2>
        </div>

        <div className="space-y-5 mb-14">
          {steps.map(({ num, Icon, title, desc }, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 flex items-center gap-4">
                <div className="text-5xl md:text-6xl font-extrabold text-zinc-100 group-hover:text-zinc-200 transition-colors leading-none select-none">
                  {num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-zinc-900">{title}</h3>
                <p className="text-zinc-600 text-base leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <ModernButton
            href="#contact"
            label="Book Your Free Call Today"
            className="px-10 py-5 text-base"
          />
        </div>
      </div>
    </section>
  );
}
