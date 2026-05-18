"use client";

import { motion } from "framer-motion";
import Scene from "@/components/three/Scene";

export default function CareersHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center pt-24 overflow-hidden bg-[#FFF6DE]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-[#BFDDF0]/20 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-zinc-200/30 rounded-full filter blur-[100px]" />
      </div>

      <div className="absolute inset-0 z-0 opacity-40">
        <Scene />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-400 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600 mb-6">
            Join Our Team
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase text-zinc-900 leading-[0.9]">
            Build the <br />
            <span className="text-zinc-400">Future with Us</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
        >
          We're looking for passionate individuals who want to redefine how 
          businesses operate through technology and automation.
        </motion.p>
      </div>
    </section>
  );
}
