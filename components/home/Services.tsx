import Link from "next/link";
import { 
  Truck, 
  ClipboardCheck, 
  BarChart3, 
  Users, 
  Network, 
  Code2, 
  ArrowRight 
} from "lucide-react";

const previewSolutions = [
  {
    title: "Dispatch Management",
    slug: "dispatch-management",
    desc: "Automate vehicle gate logs, dispatch slot scheduling, and loading verification to eliminate yard delays.",
    Icon: Truck
  },
  {
    title: "GRN & Goods Inbound",
    slug: "grn-management",
    desc: "OCR verification of packing lists and PO receipts matching, reducing receiving delays by up to 90%.",
    Icon: ClipboardCheck
  },
  {
    title: "Warehouse Dashboard",
    slug: "warehouse-dashboard",
    desc: "Single-pane operations view displaying live warehouse inventory volumes, bay loading queues, and SLA times.",
    Icon: BarChart3
  },
  {
    title: "Employee Productivity",
    slug: "employee-productivity",
    desc: "Track sorting, packing, and bin loading activities per worker to set up clear performance incentives.",
    Icon: Users
  },
  {
    title: "ERP & SAP Integrations",
    slug: "erp-integration",
    desc: "Seamless, secure bi-directional sync middleware linking custom warehouse applications directly to SAP/Oracle databases.",
    Icon: Network
  },
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    desc: "Tailored industrial software engineered to resolve unique manufacturing, sorting, or billing bottle-necks.",
    Icon: Code2
  }
];

export default function SolutionsPreviewGrid() {
  return (
    <section id="solutions" className="py-24 px-6 md:px-12 bg-white text-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600 mb-4">
            Industrial Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            Software Engineered for Logistics & Plants
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-3">
            High-integrity digital tools to streamline inventory verification, dispatch scheduling, and legacy ERP synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewSolutions.map(({ title, slug, desc, Icon }, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-primary-hover flex items-center justify-center mb-6 shadow-sm">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-950">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{desc}</p>
              </div>
              <div>
                <Link
                  href={`/solutions/${slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary-hover hover:underline"
                >
                  Explore Solution <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-sm hover:shadow-lg transition-all"
          >
            Browse All 12 Solutions
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

