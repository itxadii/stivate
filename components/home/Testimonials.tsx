const testimonials = [
  {
    quote:
      "The team delivered exactly what we needed for our CRM. They added custom features tailored to our business processes, making lead management and customer tracking much more efficient. Their technical expertise, quick response times, and understanding of our requirements helped us improve productivity across our operations. We are very satisfied with the results.",
    name: "Mohammad Yasin Ansari",
    role: "Founder, Prime Time Business Center",
    location: "Dubai",
    initials: "YA",
    bg: "bg-[#BFDDF0]/60",
  },
  {
    quote:
      "Our goal was to establish a strong digital presence and generate quality inquiries through our website. The team developed a professional website that reflects our brand and project portfolio while also focusing on lead generation. Since launch, we've seen improved online visibility and a steady flow of genuine customer inquiries. Their dedication and business-focused approach made the entire experience seamless.",
    name: "Shripad Mankar",
    role: "Founder, Shrinivas Developers",
    location: "Pune",
    initials: "SM",
    bg: "bg-background/80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent text-zinc-900 border-t border-zinc-200 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-background/30 rounded-full filter blur-[100px] pointer-events-none" />

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
                  <div className="font-bold text-zinc-900">{t.name}</div>
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


