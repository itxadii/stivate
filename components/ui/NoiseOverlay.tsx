export default function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none opacity-40 mix-blend-overlay"
      style={{
        backgroundImage: "url('/textures/noise.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
      }}
    />
  );
}
