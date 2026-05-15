export default function KeyStats() {
  return (
    <section className="py-24 px-4 md:px-12 bg-white text-zinc-900 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 text-center">
        {[
          { value: "150+", label: "Enterprise Deployments" },
          { value: "99.9%", label: "Uptime Guaranteed" },
          { value: "24/7", label: "Global Support" },
          { value: "10+", label: "Years Experience" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-5xl md:text-7xl font-bold mb-4 text-zinc-900 tracking-tighter">{stat.value}</div>
            <div className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
