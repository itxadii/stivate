export default function OurWork() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Our Work</h2>
          <button className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors hidden md:block">
            View All Case Studies
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="h-[400px] md:h-[500px] w-full bg-white/5 rounded-3xl border border-white/10 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Project Name {item}</h3>
              <p className="text-white/50">Web Design • Development</p>
            </div>
          ))}
        </div>
        <button className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors md:hidden mt-12 w-full text-center">
          View All Case Studies
        </button>
      </div>
    </section>
  );
}
