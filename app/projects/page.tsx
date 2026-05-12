import Scene from "@/components/three/Scene";

export default function ProjectsPage() {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center pt-24">
      <Scene />
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">Selected Work</h1>
        <p className="text-xl text-foreground/70 max-w-lg mx-auto">
          Coming soon. View our cinematic portfolio.
        </p>
      </div>
    </main>
  );
}
