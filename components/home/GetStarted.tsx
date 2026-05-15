export default function GetStarted() {
  return (
    <section className="py-32 px-4 md:px-12 bg-zinc-900 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Ready to Scale?</h2>
        <p className="text-xl md:text-2xl text-zinc-300 font-light mb-12">
          Partner with us to modernize your infrastructure, build robust software, and secure your digital assets. Let's discuss your technical roadmap.
        </p>
        <button className="px-10 py-5 rounded-full bg-[#FFF9D2] text-zinc-900 text-lg font-bold hover:scale-105 hover:bg-white transition-all shadow-lg">
          Contact Our Experts
        </button>
      </div>
    </section>
  );
}
