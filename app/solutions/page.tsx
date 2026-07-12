import Link from "next/link";
import Image from "next/image";
import { solutions } from "./solutionsData";
import { 
  Truck, 
  ClipboardCheck, 
  DoorOpen, 
  Users, 
  Activity, 
  QrCode, 
  MapPin, 
  Database, 
  FileCheck, 
  ArrowRight,
  ShieldAlert,
  Code2
} from "lucide-react";
import Footer from "@/components/layout/Footer";

// Helper to map slug to icon
function getIcon(slug: string) {
  switch (slug) {
    case "dispatch-management":
      return Truck;
    case "grn-management":
      return ClipboardCheck;
    case "gate-entry":
      return DoorOpen;
    case "visitor-management":
      return Users;
    case "employee-productivity":
      return Activity;
    case "warehouse-dashboard":
      return Activity;
    case "barcode-management":
      return QrCode;
    case "inventory-tracking":
      return MapPin;
    case "vendor-portal":
      return Users;
    case "approval-workflow":
      return FileCheck;
    case "erp-integration":
      return Database;
    case "custom-software-development":
      return Code2;
    default:
      return Code2;
  }
}

// Helper to map slug to image asset
function getImagePath(slug: string) {
  switch (slug) {
    case "dispatch-management":
      return "/industrialsolutions/dispatchmanagement.png";
    case "grn-management":
      return "/industrialsolutions/grnandgoodsinbound.png";
    case "gate-entry":
      return "/industrialsolutions/gateentryandvehiclecontrol.png";
    case "visitor-management":
      return "/industrialsolutions/visitormanagementsystem.png";
    case "employee-productivity":
      return "/industrialsolutions/employeeproductivity.png";
    case "warehouse-dashboard":
      return "/industrialsolutions/warehousedashboard.png";
    case "barcode-management":
      return "/industrialsolutions/barcodeandqrmanagement.png";
    case "inventory-tracking":
      return "/industrialsolutions/inventorybintracking.png";
    case "vendor-portal":
      return "/industrialsolutions/vendorcollaborationportal.png";
    case "approval-workflow":
      return "/industrialsolutions/customworkflowapproval.png";
    case "erp-integration":
      return "/industrialsolutions/sapintegrations.png";
    case "custom-software-development":
      return "/industrialsolutions/customsoftwaredevelopmetn.png";
    default:
      return "/industrialsolutions/customsoftwaredevelopmetn.png";
  }
}

export const metadata = {
  title: "Enterprise Solutions for Warehouse & Operations Automation | Stivate",
  description: "We build custom software systems for GRN processing, dispatch yards, barcode printing, ERP middleware, and inventory location tracking.",
  alternates: {
    canonical: "/solutions",
  },
};


export default function SolutionsLandingPage() {
  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      <div className="w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-zinc-600 text-xs font-bold uppercase tracking-wider inline-block">
            Our Software Products
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tight leading-tight">
            Logistics & Operations Solutions
          </h1>
          <p className="text-lg text-zinc-500 font-medium">
            Robust, custom B2B applications engineered to eliminate manual entry errors, reduce truck yard queues, and automate cycle count validation.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((sol) => {
            const Icon = getIcon(sol.slug);
            return (
              <div 
                key={sol.slug}
                className="group p-6 rounded-3xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Solution Image */}
                  <div className="relative w-full h-60 rounded-2xl overflow-hidden mb-6 border border-slate-200/50 bg-slate-100">
                    <Image
                      src={getImagePath(sol.slug)}
                      alt={sol.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-350"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-primary-hover flex items-center justify-center shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950">{sol.title}</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{sol.subtitle}</p>
                </div>
                <div>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary-hover hover:underline"
                  >
                    View Details & Workflow <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Audit Banner */}
        <div className="p-10 md:p-14 rounded-3xl bg-dark-bg text-white relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="px-3.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold uppercase tracking-wider text-primary">
              System Review
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Get an Operational Process Audit
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
              Not sure which module fits your active floor plan? We will spend 30 minutes mapping out your inbound/outbound queues and show you the exact integrations needed to automate.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all"
              >
                Book Free Audit Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
