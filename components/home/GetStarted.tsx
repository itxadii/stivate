export default function GetStarted() {
  return (
    <section className="py-32 px-4 md:px-12 bg-zinc-900 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Ready to Start?</h2>
        <p className="text-xl md:text-2xl text-white/70 font-light mb-12">
          Let's build something extraordinary together. Reach out and let's discuss your next big project.
        </p>
        <button className="px-10 py-5 rounded-full bg-white text-black text-lg font-medium hover:scale-105 transition-transform">
          Contact Us
        </button>
      </div>
    </section>
  );
}
