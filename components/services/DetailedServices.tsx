"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, BarChart2, Zap, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ServiceDetail {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  results: string;
  color: string;
  image: string;
}

const detailedServices: ServiceDetail[] = [
  {
    Icon: Globe,
    title: "Professional Website",
    subtitle: "High-Converting Digital Presence",
    desc: "Your website shouldn't just look good; it should be your best salesperson. We build lightning-fast, mobile-optimized sites that turn visitors into loyal customers.",
    features: [
      "Conversion-focused design",
      "SEO & Speed optimization",
      "Mobile-first architecture",
      "Integrated lead capture forms"
    ],
    results: "Average 40% increase in lead generation post-launch.",
    color: "bg-blue-50",
    image: "/services/webdev.png"
  },
  {
    Icon: MessageSquare,
    title: "WhatsApp Automation",
    subtitle: "24/7 Customer Engagement",
    desc: "Meet your customers where they are. We build intelligent WhatsApp flows that handle inquiries, bookings, and support automatically, so you never miss a lead again.",
    features: [
      "Automated FAQ responses",
      "Appointment & booking bots",
      "Broadcast & marketing flows",
      "Real-time lead notifications"
    ],
    results: "Reduces manual response time by up to 90%.",
    color: "bg-green-50",
    image: "/services/whatsappautomation.png"
  },
  {
    Icon: BarChart2,
    title: "Custom CRM",
    subtitle: "Unified Business Intelligence",
    desc: "Stop relying on messy spreadsheets. We build custom CRM systems tailored to your specific workflow, giving you total visibility into your sales pipeline and customer data.",
    features: [
      "Lead & pipeline management",
      "Automated follow-up reminders",
      "Custom analytics dashboards",
      "Team collaboration tools"
    ],
    results: "Helps teams close deals 25% faster with better tracking.",
    color: "bg-purple-50",
    image: "/services/customcrm.png"
  },
  {
    Icon: Zap,
    title: "Business Automation",
    subtitle: "Eliminate Repetitive Tasks",
    desc: "Work smarter, not harder. We connect your existing tools and automate boring manual tasks, freeing up your team to focus on high-value work that actually grows the business.",
    features: [
      "Tool integration (Zapier/Make)",
      "Automated invoicing & reporting",
      "Workflow optimization",
      "Data synchronization across platforms"
    ],
    results: "Saves an average of 15+ hours of manual work per week.",
    color: "bg-orange-50",
    image: "/services/businessautomation.png"
  }
];

export default function DetailedServices() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-32">
          {detailedServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-12 md:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-3xl overflow-hidden bg-zinc-50 border border-slate-400 relative group">
                <div className={`absolute inset-0 ${service.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                <div className="relative w-full h-full z-10 flex items-center justify-center">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                
                {/* Decorative floating card */}
                <div className="absolute bottom-6 right-6 z-20 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-400 max-w-[240px]">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Impact</p>
                  <p className="text-zinc-900 font-medium text-sm leading-snug">{service.results}</p>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6">
                    <service.Icon size={24} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">{service.title}</h2>
                  <p className="text-xl font-semibold text-zinc-400 mb-6">{service.subtitle}</p>
                  <p className="text-lg text-zinc-600 leading-relaxed">{service.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-zinc-900 flex-shrink-0" />
                      <span className="text-zinc-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
