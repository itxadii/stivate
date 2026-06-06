"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Database, 
  FileText, 
  Layers, 
  Layout, 
  Network, 
  Scan, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Building2, 
  Code,
  Check,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";
import Link from "next/link";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  client: string;
  technologies: string[];
  impactTitle: string;
  impactLabel: string;
  brief: string;
  challenge: string[];
  approach: string[];
  solutions?: {
    title: string;
    description: string;
    result: string;
  }[];
  businessImpact: {
    title: string;
    description: string;
  }[];
  techHighlights: string[];
  architecture?: {
    steps: {
      from: string;
      to: string;
      description: string;
    }[];
  };
  components?: {
    name: string;
    features: string[];
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "i3pl",
    title: "I3PL Warehouse Automation Platform",
    subtitle: "QR-Based Inventory Tracking, OCR-Powered Document Processing & SAP Integration",
    industry: "3PL Logistics & Warehousing",
    client: "I3PL Logistics & Warehousing",
    technologies: ["AWS", "SAP Integration", "OCR", "QR Tracking", "FastAPI", "PostgreSQL", "React", "Next.js"],
    impactTitle: "90% Faster",
    impactLabel: "Document Extraction",
    brief: "A cloud-native warehouse automation platform that digitizes receiving processes, synchronizes stock movements with SAP ERP in real-time, and reduces processing backlogs.",
    challenge: [
      "Manual inventory receiving and physical stock verification took hours.",
      "Repetitive manual SAP data entry caused significant data lag and entry errors.",
      "Inbound PDF and invoice processing resulted in reconciliation mismatches.",
      "Slow GRN (Goods Received Note) processing and dispatch verification limited operational throughput."
    ],
    approach: [
      "Preserved SAP ERP as the authoritative system of record while introducing a high-performance validation layer.",
      "Introduced automatic scanning and document extraction workflows to bypass keyboard data entry.",
      "Implemented a secure middleware architecture for bi-directional transaction synchronization."
    ],
    architecture: {
      steps: [
        { from: "Manufacturers", to: "Inbound Documents", description: "PDFs, Invoices, and Packing Lists arrive at the warehouse." },
        { from: "Inbound Documents", to: "OCR Processing Engine", description: "Tesseract/Vision extraction pulls SKU codes, quantities, and reference numbers." },
        { from: "OCR Processing Engine", to: "Validation Layer", description: "System validates data integrity and matches SKUs against purchase orders." },
        { from: "Validation Layer", to: "Warehouse Portal", description: "Operators verify details and approve inbound shipment." },
        { from: "Warehouse Portal", to: "QR Scanning Operations", description: "Unique identifiers generated for inventory units, pallets, and bin locations." },
        { from: "QR Scanning Operations", to: "SAP Integration Layer", description: "Data is synchronized to the SAP ERP system of record." }
      ]
    },
    components: [
      {
        name: "1. Warehouse Management Portal",
        features: [
          "Centralized web dashboard to view stock quantities and bin assignments.",
          "Inbound and outbound shipment validation tools.",
          "Detailed audits and tracking history for stock location movements.",
          "Live telemetry displaying warehouse capacity and operator queues."
        ]
      },
      {
        name: "2. QR-Based Tracking System",
        features: [
          "Unique QR code labels generated for inventory units, cartons, and storage racks.",
          "Mobile-optimized web scanning portals for warehouse operators.",
          "Step-by-step picking route optimization guides.",
          "Instant dispatch validation scanning at loading bays."
        ]
      },
      {
        name: "3. OCR Document Engine",
        features: [
          "Automatic processing of PDF invoices, packing lists, and delivery challans.",
          "Intelligent data extraction (SKU codes, quantities, batch numbers, vendors).",
          "Automated cross-referencing with active purchase orders.",
          "Sync-ready files generated for direct ERP logging."
        ]
      }
    ],
    businessImpact: [
      { title: "Process Automation", description: "Manual data entry, inventory verification, and GRN updates are replaced with direct QR scans and OCR-driven document uploads." },
      { title: "Inventory Accuracy", description: "Eliminated duplicate data entries and stock level mismatches between physical shelves and SAP database logs." },
      { title: "Scale-Ready Architecture", description: "Built fully cloud-native, ready to handle multi-warehouse locations and high-volume daily shipping events." }
    ],
    techHighlights: [
      "Production WMS Customization",
      "Legacy SAP Integration Middleware",
      "OCR-Powered Document Processing",
      "Mobile Web QR Scanning API",
      "Scalable AWS Cloud Infrastructure"
    ]
  },
  {
    id: "cre-crm",
    title: "Commercial Real Estate & Workspace Management CRM Transformation (UAE)",
    subtitle: "Enterprise custom CRM customization and workflow automation to resolve rental scale challenges.",
    industry: "Commercial Real Estate / Workspace Management",
    client: "Confidential UAE Workspace Management Company",
    technologies: ["PHP 8", "CodeIgniter", "Perfex CRM", "MySQL", "JavaScript", "DataTables", "REST Integrations"],
    impactTitle: "100% Active",
    impactLabel: "Payment & Lead Sync",
    brief: "Enhanced and extended a heavily customized business CRM managing office rentals, tenant billing, lead scoring, and financial operations in a production-safe environment.",
    challenge: [
      "The client's growth outpaced their CRM capacity, resulting in workspace customization limits.",
      "Manual lead assignment and slow document validation created operational visibility gaps.",
      "Complex payment collections and outstanding balance tracking required manual synchronization.",
      "Interconnected database workflows posed a risk of system failure if modified unsafely."
    ],
    approach: [
      "Performed a thorough System Analysis & Database Review to map module dependencies.",
      "Maintained baseline CRM stability while engineering custom extension modules.",
      "Designed user-specific UI workspaces allowing dynamic operational visibility without legacy resets."
    ],
    solutions: [
      {
        title: "Custom Workspace Management UI",
        description: "Developed user-specific workspace preferences and custom CRM data table capabilities, allowing persistent column reordering.",
        result: "Operations teams organize client lists based on daily tasks rather than fixed grids."
      },
      {
        title: "Dynamic Column Sizing",
        description: "Implemented customizable resizing on large data tables, enhancing navigation on invoice and payroll pages.",
        result: "Saves staff time scrolling through large workspace rental details."
      },
      {
        title: "Browser-based Invoice Viewer",
        description: "Designed a direct PDF invoice viewing feature, skipping download dependencies for faster approval.",
        result: "Reduced operational verification delays."
      },
      {
        title: "Lead Capture & Category Automation",
        description: "Connected public website inquiry portals directly to CRM leads with auto-categorization rules.",
        result: "Improved lead response time and cut down manual logging."
      },
      {
        title: "Outstanding Balance Tracking",
        description: "Engineered automated ledger balance tracking showing partial payments and collection histories.",
        result: "System automatically tracks outstanding balances (e.g. tracking AED 750 remaining on an AED 1,500 invoice)."
      }
    ],
    businessImpact: [
      { title: "Operational Efficiency", description: "Eliminated manual payroll checks and lead updates through secure, automated API workflows." },
      { title: "Financial Visibility", description: "Staff gained total visibility of outstanding invoice balances, payments, and rental collections." },
      { title: "Scalable Expansion", description: "Preserved original legacy codebase settings, ensuring future CRM updates remain fully compatible." }
    ],
    techHighlights: [
      "Production CRM Extension",
      "CodeIgniter Performance Tuning",
      "Secure Database Optimization",
      "Inquiry and Form Capture Automation",
      "Dynamic Dashboard Column Sizing"
    ]
  }
];

export default function WorkClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "solutions" | "impact">("details");

  const selectedProject = caseStudies.find(study => study.id === selectedId);

  return (
    <div className="w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-12">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Briefcase size={12} /> Case Studies
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight">
                Our Work
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 font-medium">
                Deep-dives into systems engineering, logistics automation, and custom CRM systems we have deployed for our clients.
              </p>
            </div>

            {/* Grid of Work */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, idx) => (
                <div 
                  key={study.id}
                  className="group rounded-3xl bg-white border border-slate-400 p-8 flex flex-col justify-between hover:shadow-2xl hover:border-zinc-800 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-600 px-3 py-1 rounded bg-purple-50">
                        {study.industry}
                      </span>
                      <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
                        <MapPin size={12} />
                        {study.id === "i3pl" ? "India" : "UAE"}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-zinc-900 group-hover:text-purple-700 transition-colors leading-tight">
                        {study.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-semibold tracking-wide uppercase">
                        {study.id === "i3pl" ? "Warehouse Automation" : "CRM Transformation"}
                      </p>
                    </div>

                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed font-medium">
                      {study.brief}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {study.technologies.slice(0, 5).map(tech => (
                        <span key={tech} className="text-xxs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 5 && (
                        <span className="text-xxs font-bold px-2 py-0.5 rounded bg-zinc-50 text-zinc-400">
                          +{study.technologies.length - 5} More
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-zinc-900">{study.impactTitle}</span>
                      <span className="text-xxs font-bold text-zinc-400 uppercase tracking-wider">{study.impactLabel}</span>
                    </div>
                    <PremiumButton 
                      variant="secondary" 
                      onClick={() => {
                        setSelectedId(study.id);
                        setActiveTab("details");
                      }}
                      className="px-5 py-2.5 text-xs font-bold"
                    >
                      Read Case Study <ArrowRight size={12} className="ml-1.5" />
                    </PremiumButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Back Button & Breadcrumb */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedId(null)}
                className="p-3 rounded-full border border-slate-400 hover:bg-zinc-900 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Case Study</p>
                <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{selectedProject?.title}</h4>
              </div>
            </div>

            {/* Case Study Header Card */}
            <div className="p-8 rounded-3xl bg-zinc-950 text-white relative overflow-hidden border border-zinc-900 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C3E236]/5 rounded-full blur-3xl -z-10" />

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-purple-400">
                    {selectedProject?.industry}
                  </span>
                  <span className="px-3.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-[#C3E236]">
                    {selectedProject?.client}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  {selectedProject?.title}
                </h1>
                
                <p className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-3xl">
                  {selectedProject?.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedProject?.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-zinc-200 gap-6">
              {[
                { id: "details", label: "Overview & Challenges" },
                { id: "solutions", label: selectedProject?.id === "i3pl" ? "Platform Architecture" : "Solutions Delivered" },
                { id: "impact", label: "Business Impact" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                    activeTab === tab.id ? "text-purple-700" : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-700"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-3xl border border-slate-400 p-8 md:p-12 shadow-sm min-h-[400px]">
              {activeTab === "details" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  {/* Brief */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2.5">
                      <FileText className="text-purple-600" size={20} /> Project Overview
                    </h3>
                    <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium">
                      {selectedProject?.brief}
                    </p>
                  </div>

                  <hr className="border-zinc-100" />

                  {/* Grid Challenges and Approach */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Challenges */}
                    <div className="space-y-5">
                      <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-red-500 rounded-full" /> Challenges Faced
                      </h4>
                      <ul className="space-y-3.5">
                        {selectedProject?.challenge.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 font-medium">
                            <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">!</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Approach */}
                    <div className="space-y-5">
                      <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#C3E236] rounded-full" /> Our Approach
                      </h4>
                      <ul className="space-y-3.5">
                        {selectedProject?.approach.map((a, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 font-medium">
                            <CheckCircle2 size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  {selectedProject?.id === "i3pl" ? (
                    /* I3PL Architecture Flow & Components */
                    <div className="space-y-12">
                      {/* Diagram representation */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                          Platform Solution Architecture
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedProject.architecture?.steps.map((step, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between space-y-4">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                                  Step 0{idx + 1}
                                </span>
                                <span className="text-xxs font-bold text-zinc-400 uppercase">
                                  {step.from} → {step.to}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-zinc-900 mb-1">{step.to}</h4>
                                <p className="text-zinc-500 text-xs leading-relaxed font-medium">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-zinc-100" />

                      {/* Component breakdown */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                          System Components
                        </h3>
                        <div className="space-y-6">
                          {selectedProject.components?.map((comp, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-4">
                              <h4 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                                <Cpu size={18} className="text-purple-600" /> {comp.name}
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {comp.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-600 font-medium">
                                    <Check size={16} className="text-[#C3E236] mt-0.5 flex-shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* UAE CRE CRM Solutions Delivered list */
                    <div className="space-y-8">
                      <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                        Solutions Delivered
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject?.solutions?.map((sol, idx) => (
                          <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h4 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-600" />
                                {sol.title}
                              </h4>
                              <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium">
                                {sol.description}
                              </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100/50 text-xs font-bold text-purple-700">
                              <span className="uppercase text-purple-500 text-[10px] block mb-0.5">Result</span>
                              {sol.result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "impact" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                      Business & Operational Impact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {selectedProject?.businessImpact.map((impact, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-3">
                          <div className="p-2.5 rounded-xl bg-[#C3E236]/10 text-zinc-950 inline-block">
                            <TrendingUp size={20} />
                          </div>
                          <h4 className="text-base font-extrabold text-zinc-900">{impact.title}</h4>
                          <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium">
                            {impact.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="border-zinc-100" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Tech Highlights */}
                    <div className="space-y-5">
                      <h4 className="text-lg font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                        <Layers size={18} className="text-purple-600" /> Technical Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject?.techHighlights.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle size={12} className="text-[#C3E236]" /> {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Value Statement */}
                    <div className="space-y-5 p-6 rounded-2xl bg-purple-50/40 border border-purple-100">
                      <h4 className="text-lg font-extrabold text-purple-900 uppercase tracking-wide flex items-center gap-2">
                        <FileCheck size={18} /> Project Value
                      </h4>
                      <p className="text-zinc-700 text-xs md:text-sm leading-relaxed font-medium">
                        This engagement demonstrates our ability to engineer high-integrity digital architectures, optimize workflows, and integrate business platforms without causing any disruption to active production settings.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
