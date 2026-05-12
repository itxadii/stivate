"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
      <span className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Scroll</span>
      <div className="w-[1px] h-16 bg-foreground/20 overflow-hidden">
        <motion.div
          animate={{
            y: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-primary origin-top"
        />
      </div>
    </div>
  );
}
