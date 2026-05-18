import { Globe, MessageSquare, BarChart2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  quote: string;
}

const services: Service[] = [
  {
    Icon: Globe,
    title: "Professional Website",
    subtitle: "Your 24/7 salesperson.",
    desc: "We build fast, mobile-first websites that make customers trust you instantly and take action — book, buy, or call.",
    quote: "\"Finally a website that actually brings in leads\"",
  },
  {
    Icon: MessageSquare,
    title: "WhatsApp Automation",
    subtitle: "Never miss a customer again.",
    desc: "We set up auto-replies, lead capture, order confirmations, and follow-ups — all on WhatsApp, running while you sleep.",
    quote: "\"We respond to 300+ customers a day without lifting a finger\"",
  },
  {
    Icon: BarChart2,
    title: "Custom CRM",
    subtitle: "Stop managing from WhatsApp and Excel.",
    desc: "Get a system built exactly for how you work — track leads, follow-ups, sales, and customers in one place.",
    quote: "\"I finally know what's happening in my business every single day\"",
  },
  {
    Icon: Zap,
    title: "Business Automation",
    subtitle: "Connect your tools. Save your time.",
    desc: "We automate your repetitive tasks and build workflows that save your team hours every single week.",
    quote: "\"Our team does in 2 hours what used to take a full day\"",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 bg-[#FFF6DE] text-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">
            What we build for you
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Four systems that transform your business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map(({ Icon, title, subtitle, desc, quote }, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white border border-slate-400 hover:border-slate-400 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-5">
                <Icon size={18} className="text-zinc-600" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-zinc-900">{title}</h3>
              <p className="text-zinc-400 text-sm font-medium mb-3">{subtitle}</p>
              <p className="text-zinc-600 text-base leading-relaxed mb-6">{desc}</p>
              <p className="text-zinc-400 text-sm italic">{quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
