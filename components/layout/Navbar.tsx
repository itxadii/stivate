"use client";

import Image from "next/image";
import Link from "next/link";
import { FloatingDock } from "@/components/ui/FloatingDock";
import ModernButton from "@/components/ui/ModernButton";
import { Home, HandHeart, MousePointerClick, MessageCircle, Briefcase } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const dockLinks = [
  { title: "Home", icon: <Home className="w-full h-full text-zinc-700" />, href: "/" },
  { title: "Services", icon: <MousePointerClick className="w-full h-full text-zinc-700" />, href: "/services" },
  { title: "Work", icon: <HandHeart className="w-full h-full text-zinc-700" />, href: "/work" },
  { title: "Careers", icon: <Briefcase className="w-full h-full text-zinc-700" />, href: "/careers" },
  { title: "Contact", icon: <MessageCircle className="w-full h-full text-zinc-700" />, href: "/contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.div 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 px-6 lg:px-10 py-5 pointer-events-none flex items-center justify-between"
      >
        <Link href="/" className="pointer-events-auto flex items-center">
          <Image src="/logo.png" alt="Stivate" width={160} height={50} priority className="h-25 w-auto object-contain" />
        </Link>

        <div className="pointer-events-auto">
          <ModernButton href="/contact" label="Get a Free Demo" />
        </div>
      </motion.div>

      <div className="fixed bottom-6 w-full flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDock items={dockLinks} />
        </div>
      </div>
    </>
  );
}