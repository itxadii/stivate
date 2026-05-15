export default function OurApproach() {
  return (
    <section className="py-24 px-4 md:px-12 bg-white text-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Methodology</h2>
        <p className="text-xl md:text-2xl text-zinc-600 font-light leading-relaxed mb-16">
          We combine agile frameworks with deep technical expertise to deliver scalable IT solutions that align precisely with your business objectives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            { step: 'Assess', desc: 'Comprehensive audit of your current architecture and business needs.' },
            { step: 'Architect', desc: 'Designing secure, scalable, and resilient technical solutions.' },
            { step: 'Implement', desc: 'Agile execution with rigorous testing and deployment protocols.' }
          ].map((item, i) => (
            <div key={i} className="border-t-2 border-[#FFEBCC] pt-8">
              <span className="text-zinc-400 font-bold text-lg block mb-4">0{i + 1}</span>
              <h3 className="text-2xl font-semibold mb-3 text-zinc-900">{item.step}</h3>
              <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
