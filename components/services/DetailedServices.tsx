"use client";

import { motion } from "framer-motion";
import { Globe, BarChart2, Package, Truck, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PremiumButton from "@/components/ui/PremiumButton";

interface ServiceDetail {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  results: string;
  color: string;
  image: string;
}

const detailedServices: ServiceDetail[] = [
  {
    Icon: Package,
    title: "Warehouse & WMS Automation",
    subtitle: "Cloud-Native Inventory Tracking & SAP Sync",
    desc: "Transform your storage facilities. We construct high-integrity WMS dashboards with QR-based shelf tracking, automated OCR document receiving, and secure bi-directional SAP ERP integrations.",
    features: [
      "QR code asset tagging & tracking",
      "OCR invoice data extraction",
      "SAP & legacy system integration",
      "Live location & movement audit logs"
    ],
    results: "90% faster inbound receipt processing.",
    color: "bg-blue-50",
    image: "/services/businessautomation.png"
  },
  {
    Icon: Truck,
    title: "Logistics Workflow Automation",
    subtitle: "End-to-End Operational Control",
    desc: "Connect operations, save time. We build tracking platforms that link dispatch routing, carrier validation, real-time driver tracking, and instant automated customer delivery updates.",
    features: [
      "Automated dispatch planning",
      "Carrier & driver tracking portals",
      "Real-time customer status alerts",
      "Centralized operational telemetry"
    ],
    results: "Reduces dispatch lag by up to 80%.",
    color: "bg-green-50",
    image: "/services/whatsappautomation.png"
  },
  {
    Icon: BarChart2,
    title: "Custom Enterprise CRM",
    subtitle: "Tailored Business Process Optimization",
    desc: "Stop relying on chaotic worksheets. We deploy custom business CRMs engineered for your unique operations—handling tenant files, balance ledgers, automatic invoicing, and HR payroll administration.",
    features: [
      "Custom workspace management grids",
      "Automated outstanding balance tracking",
      "Dynamic data-table visibility control",
      "Website form-to-CRM lead pipelines"
    ],
    results: "100% visibility into collections and rental pipelines.",
    color: "bg-purple-50",
    image: "/services/customcrm.png"
  },
  {
    Icon: Globe,
    title: "Professional Website",
    subtitle: "High-Converting Web Portals",
    desc: "Your web presence should match your enterprise scale. We build fast, mobile-optimized Next.js web applications that showcase your operations and capture corporate inquiries.",
    features: [
      "Conversion-focused structure",
      "Technical SEO & Core Web Vitals",
      "Custom Headless CMS dashboards",
      "Interactive quotation forms"
    ],
    results: "Drives 24/7 lead capture and catalog traffic.",
    color: "bg-orange-50",
    image: "/services/webdev.png"
  }
];

export default function DetailedServices() {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-32">
          {detailedServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-12 md:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-3xl overflow-hidden bg-zinc-50 border border-slate-400 relative group">
                <div className={`absolute inset-0 ${service.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                <div className="relative w-full h-full z-10 flex items-center justify-center">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                
                {/* Decorative floating card */}
                <div className="absolute bottom-6 right-6 z-20 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-400 max-w-[240px]">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Impact</p>
                  <p className="text-zinc-900 font-medium text-sm leading-snug">{service.results}</p>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-6">
                    <service.Icon size={24} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4">{service.title}</h2>
                  <p className="text-xl font-semibold text-zinc-400 mb-6">{service.subtitle}</p>
                  <p className="text-lg text-zinc-600 leading-relaxed">{service.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-zinc-900 flex-shrink-0" />
                      <span className="text-zinc-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link href={service.title.includes("Website") ? "/websites" : "/work"}>
                    <PremiumButton variant="secondary" className="w-full sm:w-auto">
                      {service.title === "Professional Website" ? "View Website Plans" : `View ${service.title} Work`}
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

