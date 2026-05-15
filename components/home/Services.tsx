export default function Services() {
  const services = [
    { title: "Custom Software Development", desc: "Building scalable, secure, and bespoke applications tailored to your operational needs." },
    { title: "Cloud Migration & Architecture", desc: "Seamlessly transition your infrastructure to AWS, Azure, or GCP for maximum reliability." },
    { title: "Cybersecurity Solutions", desc: "Protecting your data and assets with enterprise-grade security audits and implementations." },
    { title: "IT Consulting & Strategy", desc: "Aligning your technology stack with your long-term business goals for optimal ROI." },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white/40 backdrop-blur-sm text-zinc-900 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#BFDDF0]/40 rounded-full filter blur-[100px] -z-10"></div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div key={i} className="p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 hover:border-[#BFDDF0] hover:bg-white/80 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-12 h-12 bg-[#BFDDF0]/50 rounded-xl mb-6 shadow-sm flex items-center justify-center backdrop-blur-sm">
                 <span className="text-zinc-400">❖</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">{service.title}</h3>
              <p className="text-zinc-600 text-lg leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
