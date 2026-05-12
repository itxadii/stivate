export default function Services() {
  const services = [
    { title: "Digital Product Design", desc: "Crafting intuitive and engaging user interfaces." },
    { title: "Web Development", desc: "Building scalable and performant web applications." },
    { title: "Brand Identity", desc: "Creating memorable and cohesive brand experiences." },
    { title: "3D & Motion", desc: "Bringing your ideas to life with stunning visuals." },
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-white/60 text-lg">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
