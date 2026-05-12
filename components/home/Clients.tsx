export default function Clients() {
  return (
    <section className="py-20 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-10">Trusted by modern teams</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['Acme Corp', 'Global Tech', 'Nexus', 'Starlight', 'Vanguard'].map((client, i) => (
            <div key={i} className="text-xl md:text-2xl font-semibold tracking-tighter">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
