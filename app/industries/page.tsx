import Link from "next/link";
import Image from "next/image";
import { industries } from "./industriesData";
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
import Footer from "@/components/layout/Footer";

// Helper to map slug to icon
function getIcon(slug: string) {
  switch (slug) {
    case "manufacturing":
      return Building2;
    case "warehousing":
      return Warehouse;
    case "3pl-logistics":
      return Ship;
    case "food-manufacturing":
      return UtensilsCrossed;
    case "automotive":
      return Car;
    case "pharmaceutical":
      return Pill;
    case "engineering":
      return Wrench;
    case "textile":
      return Scissors;
    case "chemical":
      return FlaskConical;
    case "fmcg":
      return ShoppingBag;
    default:
      return Building2;
  }
}

// Helper to map slug to image asset
function getImagePath(slug: string) {
  if (slug === "3pl-logistics") return "/industries/3pllogistics.png";
  if (slug === "food-manufacturing") return "/industries/foodmanufacturing.png";
  return `/industries/${slug}.png`;
}

export const metadata = {
  title: "Sectors & Industries We Support | Stivate",
  description: "We build tailored software applications for manufacturing plants, multi-tenant warehouses, automotive JIT yards, and food processing lines.",
};

export default function IndustriesLandingPage() {
  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      <div className="w-full max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-zinc-600 text-xs font-bold uppercase tracking-wider inline-block">
            Industrial Expertise
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tight leading-tight">
            Sectors We Support
          </h1>
          <p className="text-lg text-zinc-500 font-medium">
            We don't build generic apps. We build deep, functional operational tools designed for specific manufacturing and warehouse environments.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {industries.map((ind) => {
            const Icon = getIcon(ind.slug);
            return (
              <div 
                key={ind.slug}
                className="group p-6 rounded-3xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Industry Image */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 border border-slate-200/50 bg-slate-100">
                    <Image
                      src={getImagePath(ind.slug)}
                      alt={ind.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-350"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-primary-hover flex items-center justify-center shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950">{ind.name}</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{ind.subtitle}</p>
                </div>
                <div>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary-hover hover:underline"
                  >
                    View Industrial Solutions <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* B2B Callout */}
        <div className="p-10 md:p-14 rounded-3xl bg-[#E8F4FD] border border-slate-200 shadow-sm text-zinc-900">
          <div className="max-w-3xl space-y-6">
            <span className="px-3.5 py-1 rounded bg-white border border-slate-300 text-xs font-bold uppercase tracking-wider text-primary-hover">
              Floor Audit
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
              Tailored For Your Shop Floor
            </h2>
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium">
              Every operation has its own specific bottlenecks. Our team brings deep industry experience to build software that seamlessly interfaces with your current machinery, scales, and barcodes.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all"
              >
                Request Free Operational Audit
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
