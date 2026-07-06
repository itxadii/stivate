import Link from "next/link";
import { 
  Building2, 
  Warehouse, 
  Ship, 
  UtensilsCrossed, 
  Car, 
  Pill, 
  Wrench, 
  Scissors, 
  FlaskConical, 
  ShoppingBag, 
  ArrowRight 
} from "lucide-react";

const previewIndustries = [
  { name: "Manufacturing", icon: Building2, desc: "Process logs, inventory scheduling, and on-floor machine telemetry logging.", slug: "manufacturing" },
  { name: "Warehousing", icon: Warehouse, desc: "Real-time bin slotting, carton counts, picking layouts, and QR sorting systems.", slug: "warehousing" },
  { name: "3PL Logistics", icon: Ship, desc: "Multi-tenant inventory ledgers, cargo load scheduling, and tracking systems.", slug: "3pl-logistics" },
  { name: "Food Manufacturing", icon: UtensilsCrossed, desc: "Batch tracking, expiration alerts, temperature log sheets, and recipe controls.", slug: "food-manufacturing" },
  { name: "Automotive", icon: Car, desc: "Just-In-Time part sorting, supply chain alerts, and order confirmations.", slug: "automotive" },
  { name: "Pharmaceutical", icon: Pill, desc: "FDA-compliant batch logs, document audit trails, and strict shelf-life tracking.", slug: "pharmaceutical" },
  { name: "Engineering", icon: Wrench, desc: "BOM management, CAD drawing sheets link logs, and part assembly logs.", slug: "engineering" },
  { name: "Textile", icon: Scissors, desc: "Roll length logs, dye lot shade sorting, and multi-warehouse distribution.", slug: "textile" },
  { name: "Chemical", icon: FlaskConical, desc: "Safety sheet records, hazard alerts, batch weights logs, and ERP links.", slug: "chemical" },
  { name: "FMCG", icon: ShoppingBag, desc: "Fast-shipping dispatch queues, distributor invoices, and return checks.", slug: "fmcg" }
];

export default function IndustriesPreviewGrid() {
  return (
    <section id="industries" className="py-24 px-6 md:px-12 bg-white text-zinc-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Sectors We Support
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            Engineered for Your Industry Gaps
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-3">
            Custom operational software designed to resolve specific inventory tracking and dispatch bottlenecks in your sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {previewIndustries.map(({ name, icon: Icon, desc, slug }, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/20 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary-hover flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 mb-1">{name}</h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
                <Link
                  href={`/industries/${slug}`}
                  className="text-[11px] font-bold text-primary-hover hover:underline flex items-center gap-1"
                >
                  Learn More <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
