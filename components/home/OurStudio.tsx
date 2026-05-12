export default function OurStudio() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Studio</h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            We are a digital product design and development agency. We craft premium digital experiences for ambitious brands. Our minimalist approach ensures that every pixel serves a purpose.
          </p>
          <button className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
            Read our story
          </button>
        </div>
        <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
          <span className="text-white/20">Studio Image Placeholder</span>
        </div>
      </div>
    </section>
  );
}
