"use client";

import { useState } from "react";
import { resources, type ResourceItem } from "./resourcesData";
import { 
  BookOpen, 
  Download, 
  Play, 
  ArrowRight,
  ClipboardCheck
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function ResourcesHubPage() {
  const [filter, setFilter] = useState<"all" | "blog" | "download" | "video">("all");

  const filteredItems = filter === "all" 
    ? resources 
    : resources.filter(item => item.category === filter);

  function getCategoryIcon(cat: ResourceItem["category"]) {
    switch (cat) {
      case "blog":
        return BookOpen;
      case "download":
        return Download;
      case "video":
        return Play;
    }
  }

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 font-sans">
      
      {/* Header */}
      <section className="relative w-full pt-32 pb-16 bg-white bg-grid overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#8BCF2F]/3 rounded-full filter blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-zinc-600">
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tight leading-tight max-w-4xl mx-auto">
            Operations Insights & Resources
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Read technical insights about SAP database integrations, download free warehouse process audit checklists, and watch operational system demos.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center gap-4">
          {(["all", "blog", "download", "video"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-transparent shadow-sm"
                  : "bg-white text-zinc-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat === "all" ? "All Resources" : `${cat}s`}
            </button>
          ))}
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6 md:px-12 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, idx) => {
                const Icon = getCategoryIcon(item.category);
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-[#76B827]">
                          {item.tag}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-zinc-400 flex items-center justify-center shadow-sm">
                          <Icon size={14} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-zinc-950 leading-snug group-hover:text-primary-hover transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-hover hover:underline cursor-pointer">
                        {item.linkText} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-sm">No resources found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Free Audit Callout */}
      <section className="py-16 px-6 md:px-12 bg-secondary-bg border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-black text-zinc-950">Audit Your Warehouse Operations</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mx-auto font-medium">
            Let's evaluate your gate entry lists, raw material staging checks, and PO receipt delays together.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-md transition-all text-xs"
            >
              <ClipboardCheck size={16} />
              Book Free Process Audit
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
