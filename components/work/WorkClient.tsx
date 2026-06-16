"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Database, 
  FileText, 
  Layers, 
  Layout, 
  Network, 
  Scan, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Building2, 
  Code,
  Check,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";
import Image from "next/image";
import Link from "next/link";

import { caseStudies, type CaseStudy } from "./caseStudiesData";
export { caseStudies };
export type { CaseStudy };

export default function WorkClient() {
  return (
    <div className="w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-12">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Briefcase size={12} /> Case Studies
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium">
            Deep-dives into systems engineering, logistics automation, and custom CRM systems we have deployed for our clients.
          </p>
        </div>

        {/* Grid of Work */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <div 
              key={study.id}
              className="group rounded-3xl bg-white border border-slate-400 p-6 flex flex-col justify-between hover:shadow-2xl hover:border-zinc-800 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Project Image */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl font-black text-zinc-900 group-hover:text-purple-700 transition-colors leading-tight">
                    {study.title}
                  </h3>
                </div>

                <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                  {study.brief}
                </p>
              </div>

              <div className="mt-8 pt-4 flex justify-end">
                <Link
                  href={`/work/${study.id === "cre-crm" ? "primetimebusinesscentre" : study.id}`}
                  className="px-5 py-2.5 text-xs font-bold bg-[#7d2ae8] text-white rounded-xl hover:bg-[#631ec4] transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg"
                >
                  Read Case Study <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
