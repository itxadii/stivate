"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  Wrench, 
  Layout, 
  FileCode, 
  Network, 
  MessageSquare, 
  Cpu, 
  Calendar, 
  CreditCard, 
  LineChart, 
  SlidersHorizontal,
  Flame,
  Clock,
  Check
} from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";
import Link from "next/link";

interface FeatureGroup {
  category: string;
  items: string[];
}

interface Package {
  name: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  bestFor: string;
  highlights?: string[];
  features: FeatureGroup[];
  delivery: string;
}

const packages: Package[] = [
  {
    name: "ESSENTIAL BUSINESS WEBSITE",
    price: "₹19,999",
    bestFor: "Startups, local businesses, consultants, service providers, clinics, agencies.",
    features: [
      {
        category: "Strategy & Planning",
        items: [
          "Business Discovery Session",
          "Website Structure Planning",
          "Conversion-Oriented Layout Planning",
        ],
      },
      {
        category: "Design & Development",
        items: [
          "Custom Next.js Website",
          "Up to 7 Pages",
          "Modern Professional UI",
          "Mobile & Tablet Responsive Design",
          "Fast Loading Architecture",
          "Premium Animations",
        ],
      },
      {
        category: "Lead Generation",
        items: [
          "Contact Forms",
          "WhatsApp Integration",
          "Click-to-Call Buttons",
          "Lead Capture Setup",
        ],
      },
      {
        category: "SEO Foundation",
        items: [
          "Technical SEO Setup & Metadata Optimization",
          "Sitemap Generation & Robots Configuration",
          "Google Search Console & Google Analytics Setup",
        ],
      },
      {
        category: "Infrastructure & Support",
        items: [
          "SSL Configuration & Deployment Setup",
          "Domain Connection & Website Backups",
          "100% Source Code Ownership & Full Handover",
          "30 Days Support & 2 Revision Rounds",
        ],
      },
    ],
    delivery: "7–10 Business Days",
  },
  {
    name: "GROWTH WEBSITE SYSTEM",
    price: "₹34,999",
    badge: "Most Popular",
    isPopular: true,
    bestFor: "Finance Companies, Loan Consultants, Real Estate, Healthcare, Recruitment, Growing Businesses.",
    highlights: ["Everything in Essential Plus"],
    features: [
      {
        category: "Advanced Design & CMS",
        items: [
          "Up to 15 Pages",
          "Premium Custom Design & Industry Layouts",
          "Advanced UI Animations & Interactive Sections",
          "Blog CMS (Powered by Sanity CMS: Add/Edit/Delete blogs, Featured Images, SEO Fields without dev assistance)",
        ],
      },
      {
        category: "CRM & Leads",
        items: [
          "CRM Integration (HubSpot, Zoho, OR Google Sheets)",
          "Advanced Multi-Step Forms",
          "Lead Tracking Setup & Inquiry Workflow Design",
          "Conversion Optimization",
        ],
      },
      {
        category: "SEO & Analytics",
        items: [
          "Technical & Local SEO Setup",
          "Schema Markup & Google Indexing Setup",
          "SEO Ready Blog Structure",
          "User Behaviour, Conversion, & Traffic Tracking",
        ],
      },
      {
        category: "Support & Handover",
        items: [
          "100% Source Code Ownership",
          "60 Days Support & 3 Revision Rounds",
        ],
      },
    ],
    delivery: "10–15 Business Days",
  },
  {
    name: "BUSINESS AUTOMATION PLATFORM",
    price: "₹69,999",
    badge: "Premium Package",
    bestFor: "Large Service Businesses, Finance Companies, Real Estate, Insurance, Logistics, Organizations Scaling Operations.",
    highlights: ["Everything in Growth Plus"],
    features: [
      {
        category: "AI & Automation (Choose any 3)",
        items: [
          "AI Website Chatbot / WhatsApp Lead Automation",
          "Automated Follow-Ups & Email Automation",
          "Lead Qualification / Appointment Booking Agent",
          "CRM Automation & Document Collection Workflow",
        ],
      },
      {
        category: "Business Systems & Dashboard",
        items: [
          "Custom Client Dashboard & Customer Portal",
          "Secure Document Upload & Dynamic Forms",
          "Workflow Automation",
        ],
      },
      {
        category: "Advanced CRM & Analytics",
        items: [
          "CRM Pipeline Setup & Lead Stages",
          "Sales Workflow Design & Team Notifications",
          "Custom Analytics Dashboard & Conversion Monitoring",
          "Lead Source Tracking",
        ],
      },
      {
        category: "Infrastructure & Support",
        items: [
          "Enterprise Grade Architecture & Advanced Hardening",
          "Enhanced Performance & Scalable Deployment Setup",
          "100% Source Code Ownership & Documentation",
          "90 Days Priority Support & 5 Revision Rounds",
        ],
      },
    ],
    delivery: "2–4 Weeks",
  },
];

const carePlans = [
  {
    name: "Essential Care",
    price: "₹1,499",
    icon: ShieldCheck,
    features: [
      "Security Monitoring",
      "Automated Backups",
      "Bug Fixes",
      "Uptime Monitoring",
    ],
  },
  {
    name: "Growth Care",
    price: "₹3,999",
    icon: Database,
    isPopular: true,
    features: [
      "Everything in Essential Care",
      "Content Updates",
      "Monthly Analytics Reporting",
      "Landing Page Updates",
    ],
  },
  {
    name: "Premium Care",
    price: "₹7,999",
    icon: Wrench,
    features: [
      "Everything in Growth Care",
      "CRM Maintenance",
      "Automation Maintenance",
      "Priority 24/7 Support",
    ],
  },
];

const addons = [
  { name: "Additional Page", price: "₹2,000", desc: "Need more pages? We will design and develop custom subpages.", icon: Layout },
  { name: "Blog CMS", price: "₹8,000", desc: "Sanity CMS integration to post, update and manage articles yourself.", icon: FileCode },
  { name: "CRM Integration", price: "₹7,500", desc: "Sync contact forms directly to Zoho, HubSpot, or custom pipelines.", icon: Network },
  { name: "WhatsApp Automation", price: "₹15,000", desc: "Interactive flows, auto-replies, notifications, and alerts.", icon: MessageSquare },
  { name: "AI Chatbot", price: "₹15,000", desc: "Configured AI agent responding to queries based on your business data.", icon: Cpu },
  { name: "Appointment Booking System", price: "₹10,000", desc: "Direct slots calendar integration with Cal.com or Calendly.", icon: Calendar },
  { name: "Payment Gateway", price: "₹8,000", desc: "Razorpay or Stripe integration with automated receipt workflows.", icon: CreditCard },
  { name: "Lead Dashboard", price: "₹15,000", desc: "Beautiful internal database to view, download and manage leads.", icon: LineChart },
  { name: "Admin Panel", price: "₹20,000", desc: "Complete manager interface for business roles and system triggers.", icon: SlidersHorizontal },
];

export default function WebsitesPageContent() {
  return (
    <main className="w-full bg-transparent text-zinc-900 pt-32 pb-24 px-6 md:px-12">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles size={12} className="animate-pulse" /> Pricing & Packages
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight text-balance">
            Websites & Automation Plans
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
            Clear, transparent pricing structures engineered to build high-performance systems for your business.
          </p>
        </motion.div>
      </section>

      {/* Main Packages */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                pkg.isPopular 
                  ? "bg-zinc-950 text-white border-zinc-950 shadow-2xl scale-105 z-10" 
                  : "bg-white text-zinc-900 border-slate-400 hover:shadow-xl hover:border-zinc-800"
              }`}
            >
              {/* Popular Badge */}
              {pkg.badge && (
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow ${
                  pkg.isPopular ? "bg-[#C3E236] text-black" : "bg-purple-600 text-white"
                }`}>
                  <Flame size={12} fill="currentColor" /> {pkg.badge}
                </span>
              )}

              {/* Package Details */}
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-widest ${pkg.isPopular ? "text-purple-400" : "text-purple-600"}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-4xl md:text-5xl font-black tracking-tight">{pkg.price}</span>
                    <span className={`text-xs font-semibold uppercase ${pkg.isPopular ? "text-zinc-400" : "text-zinc-500"}`}>One-time</span>
                  </div>
                </div>

                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${pkg.isPopular ? "text-zinc-400" : "text-zinc-500"}`}>
                    Best For
                  </p>
                  <p className="text-sm font-medium leading-relaxed">
                    {pkg.bestFor}
                  </p>
                </div>

                {pkg.highlights && (
                  <div className={`p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    pkg.isPopular ? "bg-zinc-900 text-[#C3E236]" : "bg-purple-50 text-purple-700"
                  }`}>
                    <Sparkles size={14} className="flex-shrink-0" />
                    {pkg.highlights[0]}
                  </div>
                )}

                <hr className={pkg.isPopular ? "border-zinc-800" : "border-zinc-100"} />

                {/* Features list */}
                <div className="space-y-6">
                  {pkg.features.map((grp, gIdx) => (
                    <div key={gIdx} className="space-y-2.5">
                      <h4 className={`text-xs font-extrabold uppercase tracking-widest ${pkg.isPopular ? "text-zinc-400" : "text-zinc-500"}`}>
                        {grp.category}
                      </h4>
                      <ul className="space-y-2">
                        {grp.items.map((item, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${pkg.isPopular ? "text-[#C3E236]" : "text-purple-600"}`} />
                            <span className={pkg.isPopular ? "text-zinc-200" : "text-zinc-700"}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery and Action */}
              <div className="mt-8 pt-6 space-y-4">
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${pkg.isPopular ? "text-zinc-400" : "text-zinc-500"}`}>
                  <Clock size={14} />
                  Delivery: {pkg.delivery}
                </div>
                <Link href="/contact" className="block w-full">
                  <PremiumButton 
                    variant={pkg.isPopular ? "primary" : "secondary"} 
                    className="w-full justify-center py-3.5 text-sm font-bold"
                  >
                    Select Plan <ArrowRight size={14} className="ml-1.5" />
                  </PremiumButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Monthly Care Plans */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Monthly Care Plans
          </h2>
          <p className="text-base text-zinc-500 max-w-xl mx-auto font-medium">
            Keep your systems updated, secure, and running smoothly with monthly care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carePlans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-white border-purple-500 shadow-xl"
                    : "bg-white border-slate-400 hover:border-zinc-800"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-purple-50 text-purple-700">
                    <Icon size={24} />
                  </div>
                  {plan.isPopular && (
                    <span className="bg-purple-100 text-purple-800 text-xxs font-extrabold uppercase px-2.5 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-zinc-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-zinc-900">{plan.price}</span>
                  <span className="text-zinc-500 text-sm font-semibold">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-sm text-zinc-700 font-medium">
                      <Check size={16} className="text-purple-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="block w-full">
                  <PremiumButton variant="secondary" className="w-full justify-center">
                    Get Started
                  </PremiumButton>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* High-Profit Add-ons */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
            High-Profit Add-ons
          </h2>
          <p className="text-base text-zinc-500 max-w-xl mx-auto font-medium">
            Customize your package with dynamic add-ons designed to scale your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {addons.map((addon, idx) => {
            const Icon = addon.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-slate-400 hover:border-zinc-800 hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 mt-1 flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-extrabold text-zinc-900 text-sm md:text-base leading-tight">
                      {addon.name}
                    </h4>
                    <span className="text-purple-700 font-black text-sm whitespace-nowrap bg-purple-50 px-2 py-0.5 rounded">
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-medium">
                    {addon.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="max-w-4xl mx-auto mt-28">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-950 text-white text-center space-y-6 relative overflow-hidden border border-zinc-900 shadow-2xl">
          {/* Subtle gradient highlights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C3E236]/5 rounded-full blur-3xl -z-10" />

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Need a Custom Architecture?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Let's design a customized package tailored specifically to your company's workflow, integrations, and performance standards.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/contact">
              <PremiumButton variant="primary" className="px-8 py-3.5 text-sm font-bold text-black bg-[#C3E236]">
                Book Strategy Session
              </PremiumButton>
            </Link>
            <span className="text-zinc-500 font-bold text-xs uppercase">OR</span>
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 font-bold text-sm flex items-center gap-1 group transition-colors">
              Talk to our tech lead <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

