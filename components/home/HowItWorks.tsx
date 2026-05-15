export default function HowItWorks() {
  return (
    <section className="py-24 px-4 md:px-12 bg-[#FFF9D2] text-zinc-900 border-t border-[#FFEBCC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">Engagement Model</h2>
        <div className="space-y-16 max-w-4xl mx-auto">
          {[
            { title: "Discovery & Analysis", desc: "We start by deeply understanding your operational workflows, technical debt, and future scaling requirements." },
            { title: "Strategic Planning", desc: "Our architects draft a comprehensive roadmap, detailing the tech stack, infrastructure, and security compliance." },
            { title: "Development & Integration", desc: "Our engineering teams build and integrate solutions using modern CI/CD pipelines and best practices." },
            { title: "Managed Support", desc: "Post-deployment, we provide 24/7 monitoring, maintenance, and continuous optimization." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
              <div className="text-6xl md:text-7xl font-bold text-[#FFEBCC] group-hover:text-zinc-300 transition-colors mt-[-10px]">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
