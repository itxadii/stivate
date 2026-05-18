import { Store, GraduationCap, Truck, ShoppingBag, BookOpen, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Client {
  Icon: LucideIcon;
  name: string;
  city: string;
}

const clients: Client[] = [
  { Icon: Store,         name: "Furniture Store",    city: "Pune" },
  { Icon: GraduationCap, name: "Training Institute", city: "Mumbai" },
  { Icon: Truck,         name: "Logistics Co.",      city: "Delhi" },
  { Icon: ShoppingBag,   name: "Retail Chain",       city: "Bangalore" },
  { Icon: BookOpen,      name: "Coaching Center",    city: "Hyderabad" },
  { Icon: Heart,         name: "Healthcare Clinic",  city: "Chennai" },
];

export default function ClientsBar() {
  return (
    <section className="py-12 px-6 md:px-12 bg-white/70 backdrop-blur-sm border-y border-slate-400">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-8">
          Trusted by 50+ businesses across India
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {clients.map(({ Icon, name, city }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-zinc-50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                <Icon size={18} className="text-zinc-500" />
              </div>
              <div className="text-center">
                <p className="text-zinc-700 text-xs font-semibold leading-tight">
                  {name}
                </p>
                <p className="text-zinc-400 text-xs">{city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}