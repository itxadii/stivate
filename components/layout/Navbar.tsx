"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import PremiumButton from "../ui/PremiumButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-3 py-3 md:px-12 md:py-6">

        {/* Glass Background */}
        <div className="absolute inset-0 md:inset-x-8 md:inset-y-4 bg-white/20 backdrop-blur-2xl md:rounded-[2rem] -z-10" />

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="relative z-20 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Stivate Logo"
              width={180}
              height={60}
              priority
              className="h-10 md:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 z-20">

            {[
              { name: "About", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Case Studies", href: "/case-studies" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  relative
                  px-5
                  py-2.5
                  rounded-full
                  overflow-hidden
                  group
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-white/10
                    border
                    border-transparent
                    backdrop-blur-md
                    transition-all
                    duration-300
                    group-hover:bg-lime-200/20
                    group-hover:border-lime-300/40
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    blur-xl
                    bg-lime-300/20
                    rounded-full
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    text-zinc-800
                    text-[15px]
                    font-semibold
                    tracking-wide
                    transition-colors
                    duration-300
                    group-hover:text-lime-700
                  "
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex z-20">
            <Link href="/contact">
              <PremiumButton>
                Let's Talk
              </PremiumButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              relative
              z-50
              flex
              items-center
              justify-center
              h-12
              w-12
              rounded-full
              bg-white/40
              backdrop-blur-xl
              border
              border-lime-100
              text-zinc-800
              shadow-sm
            "
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          fixed
          top-20
          left-3
          right-3
          z-40
          rounded-[2rem]
          bg-[#F5F2E8]/95
          backdrop-blur-2xl
          border
          border-lime-100
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          overflow-hidden
          transition-all
          duration-300
          ${menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col gap-3 p-4">

          {[
            { name: "About", href: "/about" },
            { name: "Services", href: "/services" },
            { name: "Case Studies", href: "/case-studies" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="
                relative
                px-5
                py-4
                rounded-2xl
                overflow-hidden
                group
                bg-white/50
                transition-all
                duration-300
                hover:bg-lime-100/40
              "
            >
              <span
                className="
                  relative
                  z-10
                  text-zinc-800
                  text-[15px]
                  font-semibold
                  tracking-wide
                  transition-colors
                  duration-300
                  group-hover:text-lime-700
                "
              >
                {item.name}
              </span>
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            <PremiumButton className="w-full">
              Let's Talk
            </PremiumButton>
          </Link>
        </div>
      </div>
    </>
  );
}