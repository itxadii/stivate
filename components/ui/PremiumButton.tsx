"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function PremiumButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate magnetic pull
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative px-6 py-3 rounded-full font-medium overflow-hidden group ${className}`}
    >
      {/* Background with lime accent */}
      <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/30 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/50" />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/30 rounded-full"
      />

      {/* Button content */}
      <span className="relative z-10 text-foreground group-hover:text-primary-foreground transition-colors duration-300">
        {children}
      </span>

      {/* Fill element that grows on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0 bg-primary -z-0 rounded-full"
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
