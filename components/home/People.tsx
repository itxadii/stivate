export default function People() {
  return (
    <section className="py-24 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((person) => (
            <div key={person} className="text-center group">
              <div className="w-full aspect-square bg-white/5 rounded-2xl mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                 <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h4 className="font-semibold text-xl mb-1">Team Member {person}</h4>
              <p className="text-white/50 text-sm">Role {person}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
