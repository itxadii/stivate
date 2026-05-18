const testimonials = [
  {
    quote:
      "We had no website and were losing customers to competitors. Stivate built us a site and set up WhatsApp automation in 3 weeks. Our enquiries doubled in the first month.",
    name: "Rahul M.",
    role: "Owner, Furniture Store",
    location: "Pune",
    initials: "RM",
    bg: "bg-[#BFDDF0]/60",
  },
  {
    quote:
      "I used to track everything in Excel. Now I have a CRM that shows me every lead, every follow-up, every sale. I wish I had done this 2 years ago.",
    name: "Priya S.",
    role: "Director, Training Institute",
    location: "Mumbai",
    initials: "PS",
    bg: "bg-[#FFF6DE]/80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white/40 to-[#FFF6DE] text-zinc-900 border-t border-white/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#FFF6DE]/30 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-400 bg-white/60 backdrop-blur-sm text-sm font-medium text-zinc-600">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            What our clients say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Large quote mark — typographic, no emoji */}
              <div className="text-6xl text-zinc-200 font-serif leading-none mb-4 select-none">
                &ldquo;
              </div>
              <p className="text-zinc-700 text-base md:text-lg leading-relaxed italic mb-8 flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-400">
                <div
                  className={`w-11 h-11 rounded-full ${t.bg} flex items-center justify-center font-bold text-zinc-700 text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-zinc-900">— {t.name}</div>
                  <div className="text-zinc-400 text-sm">
                    {t.role}, {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
