export default function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">What They Say</h2>
        <div className="relative">
          <div className="text-2xl md:text-4xl font-light leading-relaxed mb-12 italic text-white/80">
            "Stivate transformed our digital presence. Their attention to detail and cinematic approach to web design completely elevated our brand."
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 mb-4"></div>
            <h4 className="font-semibold text-lg">Jane Doe</h4>
            <p className="text-white/50 text-sm">CEO, FutureTech</p>
          </div>
        </div>
      </div>
    </section>
  );
}
