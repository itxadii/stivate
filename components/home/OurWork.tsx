import Image from "next/image";

export default function Results() {
  return (
    <section
      id="results"
      className="py-24 px-6 md:px-12 bg-transparent text-zinc-900"
    >
      <div className="max-w-[98%] mx-auto">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/resultssection.png"
            alt="Real businesses. Real results. Numbers that speak for themselves."
            width={1920}
            height={1080}
            className="w-full h-auto object-cover rounded-3xl"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
