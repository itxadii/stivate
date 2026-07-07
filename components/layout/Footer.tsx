import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 pb-8 px-6 md:px-12 overflow-hidden bg-transparent">
      {/* Sky blue background container */}
      <div className="absolute inset-0 mx-4 md:mx-8 my-4 rounded-3xl bg-[#E8F4FD] pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Footer CTA Banner */}
        <div className="mb-14 p-10 md:p-14 rounded-3xl bg-white/50 border border-white/70 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-zinc-900">
            Stop doing everything manually.
          </h3>
          <p className="text-zinc-500 text-lg mb-8 max-w-xl mx-auto">
            Let's build custom systems to streamline your warehouse, plant, or logistics operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all"
            >
              <ClipboardCheck size={18} />
              Book Free Process Audit
            </Link>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Image
              src="/logo.png"
              alt="Stivate"
              width={280}
              height={88}
              className="h-20 w-auto object-contain mb-6"
            />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Enterprise software engineering for manufacturing, warehouse operations, and logistics process automation.
            </p>
            <p className="mt-4 text-zinc-500 text-sm">
              Pune, Maharashtra, India
            </p>
          </div>

          <div>
            <h5 className="font-extrabold mb-5 text-zinc-800 text-xs uppercase tracking-widest">
              Key Solutions
            </h5>
            <ul className="space-y-3 text-zinc-500 text-sm font-medium">
              {[
                ["Dispatch Management", "/solutions/dispatch-management-software"],
                ["GRN & Inbound Gate", "/solutions/grn-management-software"],
                ["Warehouse Dashboard", "/solutions/warehouse-dashboard"],
                ["Employee Productivity", "/solutions/employee-productivity-tracking"],
                ["ERP & SAP Integration", "/solutions/erp-integration"],
                ["Custom Development", "/solutions/custom-manufacturing-software"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-zinc-950 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold mb-5 text-zinc-800 text-xs uppercase tracking-widest">
              Industries Served
            </h5>
            <ul className="space-y-3 text-zinc-500 text-sm font-medium">
              {[
                ["Manufacturing Operations", "/industries/manufacturing"],
                ["Warehousing & Storage", "/industries/warehouse"],
                ["3PL Logistics", "/industries/3pl"],
                ["Automotive Parts", "/industries/automotive"],
                ["Food & Beverages", "/industries/food-processing"],
                ["FMCG Distribution", "/industries/fmcg"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-zinc-950 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold mb-5 text-zinc-800 text-xs uppercase tracking-widest">
              Company
            </h5>
            <ul className="space-y-3 text-zinc-500 text-sm font-medium">
              {[
                ["About Stivate", "/about"],
                ["Our Case Studies", "/work"],
                ["Careers", "/careers"],
                ["Contact Office", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-zinc-950 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-300/40">
                <a href="mailto:hello@stivate.com" className="hover:text-zinc-950 transition-colors font-bold">
                  hello@stivate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-400/40 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-xs gap-4 font-medium">
          <p>© {new Date().getFullYear()} Stivate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-zinc-700 transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-zinc-700 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
