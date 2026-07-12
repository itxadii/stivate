import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { solutions } from "../solutionsData";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  CheckCircle, 
  HelpCircle, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown,
  Terminal,
  Activity
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((sol) => ({
    slug: sol.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return {};

  return {
    title: `${sol.title} | Warehouse & Manufacturing Automation`,
    description: `Optimize operations with our custom ${sol.title.toLowerCase()}. ${sol.subtitle} Read challenges, workflows, metrics, and FAQs.`,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
  };
}


// Helper to map slug to image asset
function getImagePath(slug: string) {
  switch (slug) {
    case "dispatch-management-software":
      return "/industrialsolutions/dispatchmanagement.png";
    case "grn-management-software":
      return "/industrialsolutions/grnandgoodsinbound.png";
    case "gate-entry-management":
      return "/industrialsolutions/gateentryandvehiclecontrol.png";
    case "visitor-management":
      return "/industrialsolutions/visitormanagementsystem.png";
    case "employee-productivity-tracking":
      return "/industrialsolutions/employeeproductivity.png";
    case "warehouse-dashboard":
      return "/industrialsolutions/warehousedashboard.png";
    case "barcode-management":
      return "/industrialsolutions/barcodeandqrmanagement.png";
    case "warehouse-automation":
      return "/industrialsolutions/inventorybintracking.png";
    case "vendor-portal":
      return "/industrialsolutions/vendorcollaborationportal.png";
    case "approval-workflow":
      return "/industrialsolutions/customworkflowapproval.png";
    case "erp-integration":
      return "/industrialsolutions/sapintegrations.png";
    case "custom-manufacturing-software":
      return "/industrialsolutions/customsoftwaredevelopmetn.png";
    default:
      return "/industrialsolutions/customsoftwaredevelopmetn.png";
  }
}

// Helper to generate dynamic FAQs
const generateFaqs = (title: string) => [
  {
    q: `How does the Stivate ${title} integrate with our existing ERP systems like SAP or Tally?`,
    a: `Our ${title} integrates via a secure, isolated middleware layer. Instead of executing direct database writes that can lock tables and stall operations, we establish validation staging queues. Transactions are processed and synchronized bi-directionally using official SAP APIs or RESTful webhooks with complete automatic retry logic.`
  },
  {
    q: `What is the typical timeframe required to build and deploy a custom ${title}?`,
    a: `Most custom modules for our ${title} are designed, configured, and deployed within 3 to 6 weeks. We roll out in modular phases and run staging sandboxes in parallel to ensure zero downtime or disruption to your daily floor operations.`
  },
  {
    q: `Who owns the source code and software licenses after the project goes live?`,
    a: `You do. Stivate builds 100% bespoke software. Upon completion, we hand over full repository ownership, database structures, deployment scripts, and code credentials. There are no recurring user license fees, seat limits, or monthly SaaS costs.`
  },
  {
    q: `How does the system handle scanner devices and custom label printers?`,
    a: `We build direct integrations for Zebra barcode/QR label printers, Honeywell handheld scanners, barcode readers, and mobile tablet terminals. The interface is optimized to remain extremely lightweight, supporting rapid floor scanning operations.`
  },
  {
    q: `Does the ${title} support offline-mode operations during network drops?`,
    a: `Yes. Our applications utilize localized cache indexes. If the warehouse Wi-Fi drops, floor logs and scanning transactions are stored securely on the device, then automatically synced back to the central ERP as soon as connection is re-established.`
  },
  {
    q: `What security safeguards are implemented to protect our ERP transactions?`,
    a: `We secure all data packets using end-to-end SSL/TLS encryption. Client devices authenticate via secure JWT tokens, and all inputs pass through rigorous database sanitization filters to prevent unauthorized adjustments or query injection.`
  },
  {
    q: `What post-launch SLA support and maintenance guarantees are included?`,
    a: `We provide a dedicated technical support SLA covering active server telemetry monitoring, automatic database backup schedules, and fast-response patching for any floor workflow blocks.`
  },
  {
    q: `Can the dashboard metrics and terminology be customized for our operations?`,
    a: `Absolutely. Unlike static SaaS platforms, we write custom code specifically for your floor workflows, ensuring all tables, dashboards, alerts, and report layouts map directly to your exact operational terms and BOM formats.`
  }
];

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sol = solutions.find((s) => s.slug === slug);

  if (!sol) {
    notFound();
  }

  const faqs = generateFaqs(sol.title);

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://stivate.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Solutions",
        "item": "https://stivate.com/solutions"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": sol.title,
        "item": `https://stivate.com/solutions/${slug}`
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": sol.title,
    "operatingSystem": "Web, Windows, Android, iOS",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": sol.subtitle
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full max-w-5xl mx-auto pt-32 pb-24 px-6">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 mb-10">
          <Link 
            href="/solutions"
            className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Solutions</p>
            <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{sol.title}</h4>
          </div>
        </div>

        {/* Title Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-secondary-bg border border-slate-200 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/3 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-6">
              <span className="px-3.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#76B827]">
                Industrial Module
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
                {sol.title}
              </h1>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl">
                {sol.subtitle}
              </p>
            </div>
            
            <div className="md:col-span-5 w-full">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <Image
                  src={getImagePath(slug)}
                  alt={`${sol.title} Dashboard for Manufacturing Company`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Details (Col-8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* The Operational Challenge */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="text-red-500" size={20} />
                The Operational Bottleneck
              </h3>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                {sol.problem}
              </p>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mt-2 font-medium">
                Traditional off-the-shelf software packages often fail to resolve plant floor bottleneck realities. Standard paper logs are prone to transcribing delays, manual sorting discrepancies, and data double-entry in the ERP office. We solve this by building custom user-friendly terminals that log counts directly where the work happens.
              </p>
            </div>

            {/* How We Solve It */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Layout className="text-[#76B827]" size={20} />
                System Integration & Workflow
              </h3>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                {sol.solution}
              </p>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-medium">
                We custom-engineer the database integration and visual layouts to adapt directly to your existing facility floor parameters. Our database queues securely stack transactions during peak traffic hours, guaranteeing zero lockouts or connection losses during synchronized database writes.
              </p>
            </div>

            {/* Detailed Operational Walkthrough (Rich Copy) */}
            <div className="space-y-6 border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Terminal className="text-[#76B827]" size={20} />
                Operational Workflow Blueprint
              </h3>
              <div className="space-y-4 text-zinc-600 text-sm leading-relaxed font-medium">
                <p>
                  Every system is deployed with isolated local buffers. The operators on the floor interface with customized buttons, barcode scanners, and printer relays that register transactions instantly.
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 font-sans">
                  <div className="flex gap-3">
                    <span className="font-mono text-[#76B827] font-bold">01. SCAN & REGISTER:</span>
                    <span>Operators capture vehicle details, product serial numbers, or ASN logs instantly via localized scan terminals.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[#76B827] font-bold">02. DATA VERIFICATION:</span>
                    <span>Stivate custom validation layers inspect and parse the transaction structure, comparing it against target database limits.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[#76B827] font-bold">03. TRANSACTION QUEUING:</span>
                    <span>Transactions enter an isolated message broker queue that handles database writes safely, preventing ERP database locking.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[#76B827] font-bold">04. REAL-TIME TELEMETRY:</span>
                    <span>Operational speeds, error counts, and process fulfillment SLAs are output on the manager dashboard control console.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-6 border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-zinc-950 uppercase tracking-wider text-xs">
                Key Product Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sol.features.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50/50 border border-slate-200 flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-[#76B827] flex items-center justify-center mt-0.5">
                      <CheckCircle size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic FAQs Section */}
            <div className="space-y-6 border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="text-[#76B827]" size={20} />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <details className="group rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-all duration-300" key={idx}>
                    <summary className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-100/50 transition-all duration-200 cursor-pointer list-none font-bold text-zinc-950 text-sm">
                      <span>{faq.q}</span>
                      <ChevronDown size={16} className="text-zinc-400 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 text-zinc-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-white">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Outcomes (Col-4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Expected Impacts */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-[#76B827]" /> Expected Outcomes
              </h3>
              <ul className="space-y-4">
                {sol.impacts.map((imp, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-zinc-600 font-medium">
                    <span className="w-1.5 h-6 bg-primary rounded-full flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Callout */}
            <div className="p-6 rounded-2xl bg-[#1e2530] text-white space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#76B827] flex items-center gap-1.5">
                <Activity size={16} /> Need this system?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                We custom design this application to fit your specific loading bay parameters and ERP constraints. Let's schedule an audit.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full flex justify-center py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs hover:bg-[#8BCF2F] shadow-md transition-colors"
                >
                  Schedule Free Audit
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
