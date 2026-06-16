'use client'
import Image from 'next/image'
import { Star } from 'lucide-react'
import ModernButton from '../ui/ModernButton'

const stats = [
  { value: '50+', label: 'Businesses served' },
  { value: '2–4 wks', label: 'Average delivery' },
  { value: '3×', label: 'Avg. lead growth' },
]

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-8.5rem)] flex items-center overflow-hidden rounded-3xl mx-auto max-w-[98%] mt-30 mb-4">

      {/* Hero background image */}
      <Image
        src="/heroimage.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 pb-10 flex flex-col lg:flex-row items-center justify-between gap-8">

        <div className="flex flex-col items-start max-w-2xl lg:w-[65%]">

          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-slate-400/30 bg-white/10 backdrop-blur-md text-sm font-medium text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300/60 animate-pulse" />
            Your competitors are already automating.
          </div>

          <h1 className="text-slate-200 text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4 drop-shadow-lg">
            Is your <span className="text-[#a5d8e6]">business</span>
            <br />
            still{' '}
            <span className="relative inline-block text-[#b8d44a]">
              running
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M2 5.5C50 2 100 2 198 5.5"
                  stroke="#b8d44a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            manually?
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-xl">
            We build <strong className="text-slate-200">logistics automation systems</strong>,{' '}
            <strong className="text-slate-200">custom WMS tracking portals</strong>, and{' '}
            <strong className="text-slate-200">high-converting websites</strong> that turn
            your slow, manual operations into a lean, high-efficiency machine —
            in weeks, not months.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <ModernButton href="#contact" label="Start My Free Consultation" className="!bg-[#C3E236] !border-[#C3E236] !text-zinc-900 hover:!bg-[#d4f04a]" />
            <span className="text-slate-400 text-sm">No commitment. 30-minute call.</span>
          </div>

          <div className="flex flex-wrap gap-8 mb-6">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-slate-200 tracking-tight drop-shadow-md">{s.value}</div>
                <div className="text-slate-400 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-slate-200 fill-slate-200" />
              ))}
            </div>
            <span className="text-slate-300 text-sm font-medium">
              Trusted by 50+ businesses across India
            </span>
          </div>

        </div>

      </div>

    </section>
  )
}

