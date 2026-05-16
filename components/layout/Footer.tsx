import Image from "next/image";
import ModernButton from "../ui/ModernButton";

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl border-t border-white/60 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Footer CTA Banner */}
        <div className="mb-14 p-10 md:p-14 rounded-3xl bg-white/50 border border-white/70 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-zinc-900">
            Stop doing everything manually.
          </h3>
          <p className="text-zinc-500 text-lg mb-8">
            Let's build the system your business deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ModernButton
              href="https://wa.me/919529602759" label="Talk to Us on WhatsApp"
            />
            <ModernButton
              href="#contact"
              label="Book a Free Call"
              className="bg-transparent border-zinc-300 hover:bg-white/80 hover:text-zinc-900"
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Image
              src="/logo.png"
              alt="Stivate"
              width={140}
              height={45}
              className="h-9 w-auto object-contain mb-4"
            />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              We build websites, WhatsApp bots, and custom CRMs that help
              Indian businesses grow faster.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-5 text-zinc-400 text-xs uppercase tracking-widest">
              Quick Links
            </h5>
            <ul className="space-y-3 text-zinc-500 text-sm">
              {[
                ["Services", "#services"],
                ["Results", "#results"],
                ["How It Works", "#how-it-works"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-zinc-900 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-5 text-zinc-400 text-xs uppercase tracking-widest">
              Get In Touch
            </h5>
            <ul className="space-y-3 text-zinc-500 text-sm">
              <li>
                <a
                  href="https://wa.me/918000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 transition-colors duration-200"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-zinc-900 transition-colors duration-200">
                  Book a Free Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200/60 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-sm gap-4">
          <p>© {new Date().getFullYear()} Stivate. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-700 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
