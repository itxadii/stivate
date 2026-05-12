export default function HowItWorks() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">How It Works</h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {[
            { title: "Briefing", desc: "We start by understanding your goals, audience, and vision." },
            { title: "Prototyping", desc: "Rapid wireframes to align on structure and flow." },
            { title: "Visual Design", desc: "Applying modern aesthetics to bring the prototype to life." },
            { title: "Development", desc: "Pixel-perfect implementation using the latest tech stack." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <div className="text-6xl font-bold text-white/10 mt-[-10px]">{(i + 1).toString().padStart(2, '0')}</div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/60 text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
