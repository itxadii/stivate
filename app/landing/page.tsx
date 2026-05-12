import Hero from "./components/Hero";
import Scene from "@/components/three/Scene";
import PremiumButton from "@/components/ui/PremiumButton";

export default function LandingPage() {
  return (
    <main className="relative w-full">
      <Scene />
      
      <Hero />

      {/* Spacer / Content Section to demonstrate scroll & parallax */}
      <section className="relative z-10 w-full min-h-screen bg-background flex flex-col items-center justify-center py-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">
            Elevate Your <br />
            <span className="text-primary">Digital Presence</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto">
            We blend cinematic aesthetics with robust engineering to build web applications that stand out in the modern era.
          </p>
          <div className="pt-8">
            <PremiumButton>Explore Our Work</PremiumButton>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="relative z-10 w-full py-12 border-t border-white/5 flex items-center justify-center">
        <p className="text-sm text-foreground/40 font-medium uppercase tracking-widest">
          © {new Date().getFullYear()} Stivate. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
