"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative w-full min-h-[40vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white bg-grid">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#8BCF2F]/3 rounded-full filter blur-[100px]" />
      </div>

      <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Connect With Stivate
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 leading-tight">
            Schedule a Process Audit
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed"
        >
          Have a WMS migration, SAP database sync, or yard delay challenges? Let's audit your plant floor operations and map out the custom software solution.
        </motion.p>
      </div>
    </section>
  );
}

