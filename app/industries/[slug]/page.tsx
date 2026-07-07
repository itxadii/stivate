import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { industries } from "../industriesData";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  Settings,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return {};

  return {
    title: `${ind.title} Solutions | Stivate`,
    description: `Modernize ${ind.name.toLowerCase()} workflows, optimize loading dock turnaround, and eliminate manual processes. Read challenges, case studies, and FAQs.`,
  };
}

// Helper to map slug to image asset
function getImagePath(slug: string) {
  if (slug === "warehouse") return "/industries/warehousing.png";
  if (slug === "3pl") return "/industries/3pllogistics.png";
  if (slug === "food-processing") return "/industries/foodmanufacturing.png";
  return `/industries/${slug}.png`;
}

// Helper to generate dynamic FAQs
const generateFaqs = (name: string, title: string) => [
  {
    q: `What are the most common operational bottlenecks in ${name} operations?`,
    a: `Operational challenges in ${name} typically involve paper-based tracking, component stockout blind spots, delayed database entries, and high turnaround times for transport vehicles. Stivate builds custom workflows to resolve these gaps directly on the floor.`
  },
  {
    q: `How does Stivate design custom software specific to our ${name} facility constraints?`,
    a: `We build bespoke database pipelines and localized scan registers tailored for ${name} workflows. For instance, in dispatch operations, we write batch tracking logic (FIFO/FEFO) that eliminates duplicate pick tasks and manual counting checks.`
  },
  {
    q: `Does the ${name} software solution connect with legacy ERP setups?`,
    a: `Yes, we support direct integrations with SAP, Oracle, Microsoft Dynamics, Tally, and custom SQL databases. We build staging validation layers to isolate legacy systems, ensuring zero downtime or record locks during synchronizations.`
  },
  {
    q: `What is the average timeline to deploy a fully integrated software module in our ${name} facility?`,
    a: `Most custom software systems and floor integrations are active within 3 to 6 weeks. We work in modular phases, releasing core dispatch, gate entry, or scanning tools first so your team sees immediate operational value.`
  },
  {
    q: `Can Stivate's system run on barcode scanners, mobile terminals, and warehouse tablets?`,
    a: `Absolutely. We write lightweight web applications compatible with all major devices including Honeywell scanners, Zebra label printers, floor iPads, and dynamic Android terminal interfaces.`
  },
  {
    q: `Who holds ownership of the source code and software database schemas after delivery?`,
    a: `You own the system entirely. We build custom intellectual property for your organization. Once active, we hand over full code repository keys, schema diagrams, and server passwords. No monthly licensing fees or user seat caps apply.`
  },
  {
    q: `How does Stivate ensure transaction security and data protection?`,
    a: `We secure all transactions using end-to-end SSL/TLS encryption. Client devices authenticate via secure JWT tokens, and all input logs pass through rigorous database sanitization filters to prevent query injection.`
  },
  {
    q: `What post-launch SLA technical support and telemetry checks do you provide?`,
    a: `We provide dedicated SLA support covering real-time server telemetry tracking, automatic hourly database backup logs, and responsive troubleshooting response times for any on-floor blocks.`
  }
];

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);

  if (!ind) {
    notFound();
  }

  const faqs = generateFaqs(ind.name, ind.title);

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
        "name": "Industries",
        "item": "https://stivate.com/industries"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": ind.name,
        "item": `https://stivate.com/industries/${slug}`
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full max-w-5xl mx-auto pt-32 pb-24 px-6">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center gap-4 mb-10">
          <Link 
            href="/industries"
            className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Industries</p>
            <h4 className="text-sm font-bold text-zinc-950 truncate max-w-xs sm:max-w-md">{ind.name}</h4>
          </div>
        </div>

        {/* Title Block */}
        <div className="p-8 md:p-12 rounded-3xl bg-secondary-bg border border-slate-200 shadow-sm mb-16 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/3 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-6">
              <span className="px-3.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#76B827]">
                Sector Profile
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
                {ind.title}
              </h1>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl">
                {ind.subtitle}
              </p>
            </div>
            
            <div className="md:col-span-5 w-full">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <Image
                  src={getImagePath(slug)}
                  alt={`${ind.name} Operations Automation System`}
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
            
            {/* Core Bottlenecks */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={20} />
                Operational Gaps & Bottlenecks
              </h3>
              <ul className="space-y-3.5">
                {ind.bottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-zinc-700 font-medium">
                    <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 mt-0.5">!</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Stivate Solutions */}
            <div className="space-y-5 border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                <Settings className="text-[#76B827]" size={20} />
                Custom Stivate Solutions & Workflows
              </h3>
              <ul className="space-y-3.5">
                {ind.solutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 font-medium">
                    <CheckCircle size={18} className="text-primary-hover mt-0.5 flex-shrink-0" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
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
            {/* Business Outcomes */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-[#76B827]" /> Target Metrics
              </h3>
              <ul className="space-y-4">
                {ind.impacts.map((imp, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-zinc-600 font-medium">
                    <span className="w-1.5 h-6 bg-primary rounded-full flex-shrink-0" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Audit Callout */}
            <div className="p-6 rounded-2xl bg-[#1e2530] text-white space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#76B827]">Request Staging Trial</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Want to see a sandbox demo of our {ind.name} tracking system? Let's check integration schemas for your site.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full flex justify-center py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs hover:bg-[#8BCF2F] shadow-md transition-colors"
                >
                  Request Sandbox Demo
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
