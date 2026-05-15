export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-[#FFF9D2] via-[#BFDDF0]/30 to-[#FFEBCC] flex items-center justify-center pt-24">
      {/* Decorative ambient blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#BFDDF0] rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center text-left px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm text-sm font-medium text-zinc-600">
          Enterprise IT Solutions
        </div>
        <h1 className="text-zinc-900 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
          Empowering Your <br />
          <span className="text-zinc-600">Digital Transformation</span>
        </h1>
        <p className="text-zinc-700 text-lg md:text-2xl mb-12 max-w-2xl font-light leading-relaxed">
          We provide scalable software development, robust cloud infrastructure, and strategic IT consulting to accelerate your business growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 rounded-full bg-zinc-900 text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20">
            Schedule a Consultation
          </button>
          <button className="px-8 py-4 rounded-full border border-zinc-300 bg-white/60 backdrop-blur-md text-zinc-900 font-medium hover:bg-white transition-all shadow-sm">
            Explore Services
          </button>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-sm font-medium">
        <span>Discover more</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce mt-2 text-zinc-400"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  );
}
