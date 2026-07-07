"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ClipboardCheck, LayoutGrid, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const solutions = [
  { name: "Dispatch Management", href: "/solutions/dispatch-management-software" },
  { name: "GRN Management", href: "/solutions/grn-management-software" },
  { name: "Gate Entry", href: "/solutions/gate-entry-management" },
  { name: "Visitor Management", href: "/solutions/visitor-management" },
  { name: "Employee Productivity", href: "/solutions/employee-productivity-tracking" },
  { name: "Warehouse Dashboard", href: "/solutions/warehouse-dashboard" },
  { name: "Barcode Management", href: "/solutions/barcode-management" },
  { name: "Inventory Tracking", href: "/solutions/warehouse-automation" },
  { name: "Vendor Portal", href: "/solutions/vendor-portal" },
  { name: "Approval Workflow", href: "/solutions/approval-workflow" },
  { name: "ERP Integration", href: "/solutions/erp-integration" },
  { name: "Custom Software", href: "/solutions/custom-manufacturing-software" },
];

const industries = [
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Warehousing", href: "/industries/warehouse" },
  { name: "3PL Logistics", href: "/industries/3pl" },
  { name: "Food Manufacturing", href: "/industries/food-processing" },
  { name: "Automotive", href: "/industries/automotive" },
  { name: "Pharmaceutical", href: "/industries/pharmaceutical" },
  { name: "Engineering", href: "/industries/engineering" },
  { name: "Textile", href: "/industries/textile" },
  { name: "Chemical", href: "/industries/chemical" },
  { name: "FMCG", href: "/industries/fmcg" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"solutions" | "industries" | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2 shadow-sm"
        : "bg-white/70 backdrop-blur-sm border-b border-transparent py-3 lg:py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center relative transition-all duration-300"
          style={{ height: scrolled ? '44px' : '90px', width: scrolled ? '44px' : '280px' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Logo Text (logo.png) */}
          <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'opacity-0 scale-75 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
            <Image
              src="/logo.png"
              alt="Stivate Logo"
              width={280}
              height={88}
              priority
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Favicon Icon (favicon.ico) */}
          <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none absolute'}`}>
            <Image
              src="/favicon.ico"
              alt="Stivate Icon"
              width={36}
              height={36}
              priority
              className="h-9 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer py-2">
              Solutions <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-1 w-[560px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 grid grid-cols-2 gap-x-6 gap-y-2 z-50"
                >
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <CheckCircle size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-4 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-3 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">Need something custom built?</span>
                    <Link href="/solutions" className="text-xs font-bold text-primary-hover hover:underline flex items-center gap-1">
                      Browse All Solutions &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("industries")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer py-2">
              Industries <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "industries" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 grid grid-cols-2 gap-x-6 gap-y-2 z-50"
                >
                  {industries.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <LayoutGrid size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-4 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-3 rounded-xl">
                    <span className="text-xs text-zinc-400 font-medium">B2B Operations Specialization</span>
                    <Link href="/industries" className="text-xs font-bold text-primary-hover hover:underline">
                      View Verticals &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/work" className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors">
            Case Studies
          </Link>
          <Link href="/resources" className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold border border-transparent shadow-sm hover:bg-primary-hover transition-all duration-200"
          >
            <ClipboardCheck size={16} />
            Book Free Process Audit
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-zinc-600 hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Mobile Solutions Section */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">Solutions</p>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Industries Section */}
              <div className="space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">Industries</p>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {industries.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-zinc-800 hover:text-primary-hover"
                >
                  Case Studies
                </Link>
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-zinc-800 hover:text-primary-hover"
                >
                  Resources
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-zinc-800 hover:text-primary-hover"
                >
                  About
                </Link>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold border border-transparent shadow-md hover:bg-primary-hover transition-colors text-center"
                >
                  <ClipboardCheck size={18} />
                  Book Free Process Audit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}