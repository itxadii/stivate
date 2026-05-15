export default function OurWork() {
  return (
    <section className="py-24 px-4 md:px-12 bg-gradient-to-t from-[#FFF9D2]/50 to-[#BFDDF0]/20 text-zinc-900 border-t border-[#FFEBCC]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900">Success Stories</h2>
          <button className="text-zinc-900 font-medium border-b-2 border-zinc-900 pb-1 hover:text-[#BFDDF0] hover:border-[#BFDDF0] transition-colors hidden md:block">
            View All Case Studies
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
             { title: "Legacy System Modernization", industry: "Financial Services" },
             { title: "Global Cloud Infrastructure Setup", industry: "Logistics" },
             { title: "Automated Data Pipeline", industry: "Healthcare" },
             { title: "Enterprise ERP Implementation", industry: "Manufacturing" }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-[400px] md:h-[450px] w-full bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 mb-6 overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow group-hover:shadow-[0_8px_30px_rgb(191,221,240,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#BFDDF0]/40 to-[#FFEBCC]/20 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-medium z-10 backdrop-blur-sm">
                   Project Visual
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 group-hover:text-[#BFDDF0] transition-colors">{item.title}</h3>
              <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">{item.industry}</p>
            </div>
          ))}
        </div>
        <button className="text-zinc-900 font-medium border-b-2 border-zinc-900 pb-1 hover:text-zinc-600 transition-colors md:hidden mt-12 w-full text-center">
          View All Case Studies
        </button>
      </div>
    </section>
  );
}
