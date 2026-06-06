export default function Clients() {
  return (
    <section className="py-20 bg-transparent text-zinc-900 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-10 font-semibold">Trusted by Enterprise Leaders</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {['FinTech Corp', 'Global Logistics', 'HealthTech Innovations', 'Starlight Retail', 'Vanguard Manufacturing'].map((client, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-800">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


