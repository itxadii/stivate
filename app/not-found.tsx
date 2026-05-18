"use client";

import { motion } from "framer-motion";
import Scene from "@/components/three/Scene";
import ModernButton from "@/components/ui/ModernButton";

export default function NotFound() {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#FFF6DE]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#BFDDF0]/20 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-zinc-200/30 rounded-full filter blur-[100px]" />
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
            Error 404
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase text-zinc-900 leading-[0.9]">
            Lost in <br />
            <span className="text-zinc-400">the System</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ModernButton href="/" label="Return Home" className="px-10 py-5" />
        </motion.div>
      </div>
    </main>
  );
}
