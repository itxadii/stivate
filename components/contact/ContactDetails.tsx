"use client";

import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export default function ContactDetails() {
  const details = [
    {
      Icon: Mail,
      title: "Email",
      value: "hello@stivate.com",
      desc: "For detailed proposals"
    },
    {
      Icon: MapPin,
      title: "Office",
      value: "Pune, Maharashtra",
      desc: "Innovation hub"
    },
    {
      Icon: Clock,
      title: "Hours",
      value: "Mon - Sat, 10am - 7pm",
      desc: "Fast response guaranteed"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {details.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white border border-zinc-100 hover:border-zinc-200 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-4">
            <item.Icon size={18} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">{item.title}</h3>
          <p className="text-zinc-900 font-bold mb-1">{item.value}</p>
          <p className="text-zinc-500 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
