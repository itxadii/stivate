export default function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-12 bg-gradient-to-br from-[#BFDDF0]/30 to-[#FFF9D2]/50 text-zinc-900 border-t border-white/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Client Testimonials</h2>
        <div className="relative p-12 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="text-2xl md:text-4xl font-light leading-relaxed mb-12 italic text-zinc-700">
            "Stivate completely overhauled our legacy infrastructure. Their strategic approach to cloud migration saved us 40% in operational costs while improving system uptime."
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm mb-4 flex items-center justify-center">
               <span className="text-zinc-400 font-bold">JD</span>
            </div>
            <h4 className="font-bold text-lg text-zinc-900">Jane Doe</h4>
            <p className="text-zinc-500 text-sm font-medium">CTO, Global Logistics</p>
          </div>
        </div>
      </div>
    </section>
  );
}
