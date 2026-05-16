"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Clock, CheckCircle, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Project {
  title: string;
  category: string;
  stat: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
  color: string;
}

const projects: Project[] = [
  {
    title: "Modern Furniture Retailer",
    category: "Web + WhatsApp Automation",
    stat: "3×",
    label: "Leads Increase",
    desc: "Built a conversion-optimized catalog website integrated with a WhatsApp bot that handles 80% of initial customer inquiries automatically.",
    Icon: TrendingUp,
    color: "bg-blue-50"
  },
  {
    title: "Pan-India Logistics Firm",
    category: "Workflow Automation",
    stat: "₹4L",
    label: "Monthly Savings",
    desc: "Automated daily reporting and driver tracking systems, eliminating manual data entry and reducing operational overhead significantly.",
    Icon: DollarSign,
    color: "bg-green-50"
  },
  {
    title: "Home Services Startup",
    category: "WhatsApp Automation",
    stat: "60%",
    label: "Faster Response",
    desc: "Implemented a real-time lead routing and automated response system on WhatsApp, ensuring no customer is left waiting for more than 2 minutes.",
    Icon: Clock,
    color: "bg-purple-50"
  },
  {
    title: "Leading Coaching Institute",
    category: "Custom CRM Implementation",
    stat: "0",
    label: "Missed Follow-ups",
    desc: "Deployed a custom-built CRM tailored to student enrollment cycles, helping the sales team track every lead from inquiry to admission.",
    Icon: CheckCircle,
    color: "bg-orange-50"
  }
];

export default function ProjectsGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl ${project.color} flex items-center justify-center`}>
                  <project.Icon size={24} className="text-zinc-900" />
                </div>
                <div className="p-2 rounded-full bg-white border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">{project.category}</p>
                  <h3 className="text-2xl font-bold text-zinc-900">{project.title}</h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-zinc-900">{project.stat}</span>
                  <span className="text-lg font-semibold text-zinc-500">{project.label}</span>
                </div>

                <p className="text-zinc-600 leading-relaxed text-lg">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
