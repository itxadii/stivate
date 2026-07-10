"use client";

import Link from "next/link";
import { ClipboardCheck, ArrowRight, Activity, Truck, Package, ShieldCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative max-w-[98%] mx-auto mt-30 mb-4 rounded-3xl min-h-[calc(100vh-8.5rem)] pt-16 pb-16 flex items-center bg-white overflow-hidden border border-slate-200/60 shadow-sm">
      
      {/* AI Corner Glowing Auras (vibrant, soft color bleeds at corners) */}
      <div className="absolute top-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full bg-blue-500/20 blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-pink-500/15 blur-[80px] pointer-events-none animate-pulse-slow delay-1000" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full bg-[#8BCF2F]/20 blur-[80px] pointer-events-none animate-pulse-slow delay-2000" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-yellow-500/15 blur-[80px] pointer-events-none animate-pulse-slow delay-700" />

      {/* Top soft cyan glow to add background depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/3 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Operations-First Custom Software
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-zinc-950 tracking-tight leading-[1.1]">
            Software That Automates <br className="hidden sm:inline" />
            <span className="text-zinc-800 border-b-4 border-primary">Manufacturing & Warehouse</span> Operations
          </h1>

          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
            We build custom software and AI-powered automation solutions to scale warehousing, logistics, and plant operations. No more paper checklists, manual data entry, or dispatch bottlenecks.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all text-center"
            >
              <ClipboardCheck size={18} />
              Book Free Process Audit
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-zinc-800 font-bold transition-all text-center border border-slate-200"
            >
              View Case Studies
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-slate-100/80 w-full max-w-md">
            <div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">3+</div>
              <div className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Warehouses</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">10+</div>
              <div className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">Integrations Live</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-zinc-950">99.9%</div>
              <div className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider">System Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Side - Custom CSS Dashboard Widget */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-[#1E293B] rounded-3xl p-6 shadow-2xl border border-slate-800 text-white relative overflow-hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono pl-2">STIVATE_WMS_NODE_01</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                LIVE MONITOR
              </span>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Inbound Gate Queue</span>
                  <Truck size={14} className="text-primary" />
                </div>
                <div className="text-2xl font-black">12 Trucks</div>
                <span className="text-[10px] text-emerald-400 font-medium">Avg. wait: 14 mins</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">SAP Sync Status</span>
                  <Database size={14} className="text-primary" />
                </div>
                <div className="text-2xl font-black text-emerald-400">100% OK</div>
                <span className="text-[10px] text-slate-400 font-mono">Last sync: 2s ago</span>
              </div>
            </div>

            {/* Live Receiving List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Activity size={12} className="text-primary" /> Inbound GRN Pipeline
              </h4>

              {[
                { grn: "GRN-2026-089", sku: "SKU-AMP-882", qty: "450 Units", status: "SAP Synced", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { grn: "GRN-2026-090", sku: "SKU-WLT-110", qty: "1,200 Units", status: "QR Generated", statusColor: "text-[#8BCF2F] bg-[#8BCF2F]/10 border-[#8BCF2F]/20" },
                { grn: "GRN-2026-091", sku: "SKU-CBX-459", qty: "180 Units", status: "OCR Validation", statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800/50 text-xs">
                  <div>
                    <div className="font-bold font-mono text-slate-200">{row.grn}</div>
                    <div className="text-[10px] text-slate-400">{row.sku} • {row.qty}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${row.statusColor}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom summary stats */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Package size={12} className="text-primary" /> 14,892 items sorted today
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck size={12} /> SSL Secured
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

