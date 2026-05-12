"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import FloatingParticles from "./FloatingParticles";

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <FloatingParticles count={150} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
