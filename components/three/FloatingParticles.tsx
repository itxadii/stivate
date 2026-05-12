"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingParticles({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  // Generate random positions, rotations, and scales for the particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = Math.random() * 10 + 20;
      const speed = Math.random() * 0.01 + 0.005;
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      
      // Update time for movement
      time = particle.time += speed / 2;

      // Calculate dynamic positions with some sine/cosine waves for smooth floating
      dummy.position.set(
        x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
        y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
        z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
      );

      // Add gentle rotation
      dummy.rotation.set(
        (time * factor) / 100,
        (time * factor) / 100,
        (time * factor) / 100
      );

      dummy.scale.setScalar(Math.max(0.1, Math.sin(time) * 0.5 + 0.5));
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* Abstract geometric shapes like tetrahedrons give a more futuristic vibe */}
      <octahedronGeometry args={[0.2, 0]} />
      <meshPhysicalMaterial 
        color="#c3e236" 
        emissive="#5a6e14"
        roughness={0.2}
        metalness={0.8}
        transmission={0.9}
        thickness={0.5}
        clearcoat={1}
      />
    </instancedMesh>
  );
}
