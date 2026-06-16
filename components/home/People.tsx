'use client'
import Image from "next/image";

const brands = [
  { src: "/trustedbrands/brand1.png", alt: "Brand 1" },
  { src: "/trustedbrands/brand2.png", alt: "Brand 2" },
  { src: "/trustedbrands/brand3.png", alt: "Brand 3" },
  { src: "/trustedbrands/brand4.png", alt: "Brand 4" },
  { src: "/trustedbrands/brand5.png", alt: "Brand 5" },
];

export default function ClientsBar() {
  // Double the array for seamless infinite scroll
  const scrollBrands = [...brands, ...brands];

  return (
    <section className="py-10 px-6 md:px-12 bg-white/70 backdrop-blur-sm border-y border-slate-400 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-8">
          Trusted by 50+ businesses across India
        </p>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-16 animate-marquee w-max">
            {scrollBrands.map((brand, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-12 w-36 relative hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}