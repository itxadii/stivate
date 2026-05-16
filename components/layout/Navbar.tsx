"use client";

import Image from "next/image";
import Link from "next/link";
import { FloatingDock } from "@/components/ui/FloatingDock";
import ModernButton from "@/components/ui/ModernButton";
import { Home, Globe, TrendingUp, Zap, MessageSquare } from "lucide-react";

const dockLinks = [
  { title: "Home", icon: <Home className="w-full h-full text-zinc-700" />, href: "/" },
  { title: "Services", icon: <Globe className="w-full h-full text-zinc-700" />, href: "#services" },
  { title: "Results", icon: <TrendingUp className="w-full h-full text-zinc-700" />, href: "#results" },
  { title: "How It Works", icon: <Zap className="w-full h-full text-zinc-700" />, href: "#how-it-works" },
  { title: "Contact", icon: <MessageSquare className="w-full h-full text-zinc-700" />, href: "#contact" },
];

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-6 lg:px-10 py-5 pointer-events-none flex items-center justify-between">

        <Link href="/" className="pointer-events-auto flex items-center">
          <Image src="/logo.png" alt="Stivate" width={160} height={50} priority className="h-25 w-auto object-contain" />
        </Link>

        <div className="pointer-events-auto">
          <ModernButton href="#contact" label="Get a Free Demo" />
        </div>

      </div>

      <div className="fixed bottom-6 w-full flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDock items={dockLinks} />
        </div>
      </div>
    </>
  );
}