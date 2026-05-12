export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Video Background */}
      <video
        src="/videos/heroloop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          3D Websites <br />
          <span className="text-white/80">in Minutes</span>
        </h1>
        <p className="text-white/70 text-lg md:text-2xl mb-10 max-w-2xl font-light">
          No-Code Builder for WebGL 3D Websites
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
            Talk to Us
          </button>
          <button className="px-8 py-4 rounded-full bg-white text-black hover:scale-105 transition-transform font-medium">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-sm font-medium">
        <span>Scroll down & dive in</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce mt-2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>
  );
}
