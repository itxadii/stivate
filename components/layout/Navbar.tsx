import Link from "next/link";
import PremiumButton from "../ui/PremiumButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 pointer-events-auto">
      {/* Blurred pill background */}
      <div className="absolute inset-x-4 inset-y-2 md:inset-x-8 md:inset-y-4 rounded-full glassmorphism -z-10" />

      <div className="flex items-center gap-2 z-10 pl-4 md:pl-6">
        <Link href="/landing" className="text-xl md:text-2xl font-bold tracking-tight uppercase hover:text-primary transition-colors duration-300">
          Stivate<span className="text-primary">.</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 z-10 font-medium text-sm tracking-wide">
        <Link href="/services" className="hover:text-primary transition-colors duration-300">Services</Link>
        <Link href="/projects" className="hover:text-primary transition-colors duration-300">Work</Link>
        <Link href="/about" className="hover:text-primary transition-colors duration-300">Agency</Link>
      </div>

      <div className="z-10 pr-2 md:pr-4">
        <Link href="/contact">
          <PremiumButton>Let's Talk</PremiumButton>
        </Link>
      </div>
    </nav>
  );
}
