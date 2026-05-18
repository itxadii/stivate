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
    <section className="relative w-full min-h-screen bg-[#FFF6DE] flex items-center overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        <div className="flex flex-col items-start max-w-2xl lg:w-[55%]">

          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-zinc-300 bg-white/70 backdrop-blur-sm text-sm font-medium text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
            Your competitors are already automating.
          </div>

          <h1 className="text-zinc-900 text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Is your business
            <br />
            still{' '}
            <span className="relative inline-block">
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
                  stroke="#1a1a1a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            manually?
          </h1>

          <p className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-xl">
            We build <strong className="text-zinc-800">websites</strong>,{' '}
            <strong className="text-zinc-800">WhatsApp bots</strong>, and{' '}
            <strong className="text-zinc-800">custom CRMs</strong> that turn
            your slow, manual business into a lean, revenue-generating machine —
            in weeks, not months.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <ModernButton href="#contact" label="Start My Free Consultation" />
            <span className="text-zinc-400 text-sm">No commitment. 30-minute call.</span>
          </div>

          <div className="flex flex-wrap gap-8 mb-10">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">{s.value}</div>
                <div className="text-zinc-400 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-zinc-900 fill-zinc-900" />
              ))}
            </div>
            <span className="text-zinc-500 text-sm font-medium">
              Trusted by 50+ businesses across India
            </span>
          </div>

        </div>

        <div className="lg:w-[45%] relative flex justify-center items-center mt-12 lg:mt-0 w-full">
          <Image 
            src="/heroimage.png" 
            alt="Stivate Automation and Websites" 
            width={800} 
            height={800} 
            className="w-full max-w-lg lg:max-w-none h-auto object-contain drop-shadow-2xl" 
            priority 
          />
        </div>

      </div>

    </section >
  )
}