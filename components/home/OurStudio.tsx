export default function OurStudio() {
  return (
    <section className="py-24 px-4 md:px-12 bg-white text-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-zinc-900">Who We Are</h2>
          <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
            We are a dedicated team of software engineers, cloud architects, and IT strategists. With over a decade of experience, we partner with enterprises to modernize their tech stacks, secure their data, and build custom applications that solve complex business challenges.
          </p>
          <button className="text-zinc-900 font-medium border-b-2 border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
            Learn more about our company
          </button>
        </div>
        <div className="h-[400px] md:h-[500px] bg-[#FFF9D2] rounded-3xl border border-[#FFEBCC] flex items-center justify-center relative overflow-hidden shadow-sm">
          {/* Decorative element for placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFEBCC]/40 to-transparent"></div>
          <span className="text-zinc-400 font-medium relative z-10">Office / Team Image Placeholder</span>
        </div>
      </div>
    </section>
  );
}
