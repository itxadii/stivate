export default function People() {
  return (
    <section className="py-24 px-4 md:px-12 bg-white/40 backdrop-blur-sm text-zinc-900 relative overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-x-0 bottom-0 mx-auto w-[280px] h-[280px] md:w-[500px] md:h-[500px] bg-[#FFF9D2]/60 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Leadership Team
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {[
            {
              name: "John Smith",
              role: "Principal Cloud Architect",
            },
            {
              name: "Sarah Jenkins",
              role: "Head of Engineering",
            },
            {
              name: "Michael Chen",
              role: "VP of IT Strategy",
            },
            {
              name: "Emily Davis",
              role: "Lead Security Consultant",
            },
          ].map((person, i) => (
            <div
              key={i}
              className="
                text-center
                group
                p-6
                rounded-3xl
                bg-white/30
                backdrop-blur-md
                border
                border-white/50
                hover:bg-white/60
                transition-all
                duration-300
                shadow-sm
              "
            >

              {/* Photo Card */}
              <div
                className="
                  w-full
                  aspect-square
                  bg-gradient-to-br
                  from-[#BFDDF0]/40
                  to-[#FFEBCC]/30
                  rounded-2xl
                  mb-6
                  overflow-hidden
                  relative
                  border
                  border-white/60
                  transition-transform
                  duration-500
                  shadow-sm
                  group-hover:-translate-y-2
                  group-hover:shadow-[0_10px_40px_rgb(191,221,240,0.5)]
                "
              >

                {/* Glass Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-white/20
                    backdrop-blur-sm
                    group-hover:opacity-0
                    transition-opacity
                    duration-700
                  "
                />

                {/* Placeholder */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-zinc-500
                    font-medium
                  "
                >
                  Photo
                </div>
              </div>

              {/* Name */}
              <h4 className="font-bold text-xl mb-1 text-zinc-900">
                {person.name}
              </h4>

              {/* Role */}
              <p className="text-[#BFDDF0] font-semibold text-sm drop-shadow-sm">
                {person.role}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}