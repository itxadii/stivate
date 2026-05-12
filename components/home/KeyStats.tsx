export default function KeyStats() {
  return (
    <section className="py-24 px-4 md:px-12 bg-zinc-950 text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {[
          { value: "50+", label: "Projects Completed" },
          { value: "99%", label: "Client Satisfaction" },
          { value: "12", label: "Awards Won" },
          { value: "5", label: "Years Experience" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-5xl md:text-7xl font-bold mb-4">{stat.value}</div>
            <div className="text-white/50 text-sm uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
