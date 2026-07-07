"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { name: "Manufacturing", icon: Building2, desc: "Process logs, inventory scheduling, and on-floor machine telemetry logging.", slug: "manufacturing", image: "/industries/manufacturing.png" },
  { name: "Warehousing", icon: Warehouse, desc: "Real-time bin slotting, carton counts, picking layouts, and QR sorting systems.", slug: "warehouse", image: "/industries/warehousing.png" },
  { name: "3PL Logistics", icon: Ship, desc: "Multi-tenant inventory ledgers, cargo load scheduling, and tracking systems.", slug: "3pl", image: "/industries/3pllogistics.png" },
  { name: "Food Manufacturing", icon: UtensilsCrossed, desc: "Batch tracking, expiration alerts, temperature log sheets, and recipe controls.", slug: "food-processing", image: "/industries/foodmanufacturing.png" },
  { name: "Automotive", icon: Car, desc: "Just-In-Time part sorting, supply chain alerts, and order confirmations.", slug: "automotive", image: "/industries/automotive.png" },
  { name: "Pharmaceutical", icon: Pill, desc: "FDA-compliant batch logs, document audit trails, and strict shelf-life tracking.", slug: "pharmaceutical", image: "/industries/pharmaceutical.png" },
  { name: "Engineering", icon: Wrench, desc: "BOM management, CAD drawing sheets link logs, and part assembly logs.", slug: "engineering", image: "/industries/engineering.png" },
  { name: "Textile", icon: Scissors, desc: "Roll length logs, dye lot shade sorting, and multi-warehouse distribution.", slug: "textile", image: "/industries/textile.png" },
  { name: "Chemical", icon: FlaskConical, desc: "Safety sheet records, hazard alerts, batch weights logs, and ERP links.", slug: "chemical", image: "/industries/chemical.png" },
  { name: "FMCG", icon: ShoppingBag, desc: "Fast-shipping dispatch queues, distributor invoices, and return checks.", slug: "fmcg", image: "/industries/fmcg.png" }
];

export default function IndustriesPreviewGrid() {
  const N = previewIndustries.length;
  // Render 3 sets of cards to allow infinite scrolling in both directions
  const infiniteIndustries = [...previewIndustries, ...previewIndustries, ...previewIndustries];

  // Start active card at the first element of the middle copy (index 10)
  const [activeIndex, setActiveIndex] = useState(N);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Card size calculations: card is 280px wide on mobile (+24px gap) or 450px wide on desktop (+24px gap)
  const [cardStep, setCardStep] = useState(304);

  // Initialize and handle resize events to sync cardStep
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setCardStep(474); // 450px width + 24px gap
      } else {
        setCardStep(304); // 280px width + 24px gap
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize scroll position to the middle set on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = N * cardStep;
    }
  }, [N, cardStep]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    isScrollingRef.current = true;
    scrollRef.current.scrollTo({
      left: index * cardStep,
      behavior: "smooth",
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      handleInfiniteLoopReset(index);
    }, 850);
  };

  const handleInfiniteLoopReset = (index: number) => {
    if (!scrollRef.current) return;
    
    // If we scrolled past the middle set (index >= 20), jump instantly back to index 10-19 range
    if (index >= N * 2) {
      const resetIdx = index - N;
      isScrollingRef.current = true;
      scrollRef.current.scrollLeft = resetIdx * cardStep;
      setActiveIndex(resetIdx);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 50);
    } 
    // If we scrolled before the middle set (index < 10), jump instantly back to index 10-19 range
    else if (index < N) {
      const resetIdx = index + N;
      isScrollingRef.current = true;
      scrollRef.current.scrollLeft = resetIdx * cardStep;
      setActiveIndex(resetIdx);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 50);
    }
  };

  // Autoplay step (pause for ~2.8 seconds, then slide)
  useEffect(() => {
    if (isHovered) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, 2800);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, activeIndex]);

  // Sync scroll position with active index when user manually scrolls/swipes
  const handleScroll = () => {
    if (!scrollRef.current || isScrollingRef.current) return;
    
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardStep);
      if (index >= 0 && index < infiniteIndustries.length && index !== activeIndex) {
        setActiveIndex(index);
        handleInfiniteLoopReset(index);
      }
    }, 150);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
  };

  const handleDotClick = (index: number) => {
    const targetIdx = index + N;
    setActiveIndex(targetIdx);
    scrollToIndex(targetIdx);
  };

  return (
    <section id="industries" className="py-24 bg-white text-zinc-900 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="text-center max-w-3xl mx-auto">
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
      </div>

      {/* Interactive Horizontal Scroll Carousel */}
      <div 
        className="relative w-full overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Force scrollbar hiding globally on this element across all platforms */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
          .no-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}} />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-[calc(50%-140px)] md:px-[calc(50%-225px)] no-scrollbar"
        >
          {infiniteIndustries.map(({ name, icon: Icon, desc, slug, image }, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                onClick={() => handleCardClick(i)}
                className={`w-[280px] md:w-[450px] flex-shrink-0 snap-center p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? "bg-white border-primary shadow-xl scale-105 z-10" 
                    : "bg-slate-50/40 border-slate-200 opacity-60 scale-95 hover:opacity-85"
                }`}
              >
                <div>
                  {/* Industry Image */}
                  <div className="relative w-full h-36 md:h-56 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-100">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, 450px"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? "bg-primary/20 text-[#76B827]" : "bg-slate-200/50 text-zinc-500"
                      }`}>
                        <Icon size={16} />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-zinc-950 truncate">{name}</h3>
                    </div>
                    <p className="text-zinc-500 text-[11px] md:text-sm leading-relaxed line-clamp-3">{desc}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center">
                  <Link
                    href={`/industries/${slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] md:text-xs font-bold text-primary-hover hover:underline flex items-center gap-1"
                  >
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation Indicator Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {previewIndustries.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex % N ? "bg-primary w-4" : "bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
