"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Full Stack Developer",
    type: "contract",
    location: "Remote / Pune",
    description: "Build scalable web applications and internal tools using Next.js, TypeScript, and Node.js."
  },
  {
    title: "Automation Engineer",
    type: "contract",
    location: "Remote",
    description: "Design and implement complex automation workflows using Zapier, Make, and custom scripts."
  },
  {
    title: "UI/UX Designer",
    type: "Contract",
    location: "Remote",
    description: "Create premium, user-centric designs for our clients' websites and custom CRM platforms."
  },
  {
    title: "Business Growth Associate",
    type: "contract",
    location: "Pune",
    description: "Help us identify and partner with Indian businesses that need our systems the most."
  }
];

export default function JobListings() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">Open Positions</h2>
          <p className="text-zinc-500 text-lg">
            Find a role that matches your skills and passion.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <motion.a
              key={i}
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello@stivate.com&su=${encodeURIComponent("Application for " + job.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-zinc-50 border border-slate-400 hover:border-slate-400 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer block"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider">
                    <Briefcase size={12} />
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider">
                    <MapPin size={12} />
                    {job.location}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">{job.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{job.description}</p>
              </div>

              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight size={24} />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[40px] bg-background text-center border border-[#e4d9b8]">
          <h3 className="text-2xl font-bold text-zinc-900 mb-4">Don't see a perfect fit?</h3>
          <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
            We're always looking for talented people to join us. Send your resume to
            <span className="font-bold text-zinc-900 ml-1">hello@stivate.com</span>
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@stivate.com&su=Open%20Application"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:scale-105 transition-transform"
          >
            Send Open Application
          </a>
        </div>
      </div>
    </section>
  );
}

