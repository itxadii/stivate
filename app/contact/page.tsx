import Scene from "@/components/three/Scene";

export default function ContactPage() {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center pt-24">
      <Scene />
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">Let's Talk</h1>
        <p className="text-xl text-foreground/70 max-w-lg mx-auto">
          Coming soon. Get in touch with us.
        </p>
      </div>
    </main>
  );
}
