export default function OurApproach() {
  return (
    <section className="py-24 px-4 md:px-12 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Approach</h2>
        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12">
          We believe in a holistic approach to digital product design. It's not just about how it looks, but how it works. We combine user-centric design with cutting-edge technology to build solutions that scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          {['Discover', 'Design', 'Deliver'].map((step, i) => (
            <div key={i} className="border-t border-white/20 pt-6">
              <span className="text-white/30 font-mono text-sm block mb-4">0{i + 1}</span>
              <h3 className="text-2xl font-semibold mb-2">{step}</h3>
              <p className="text-white/50 text-sm">A rigorous process ensuring quality at every phase.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
