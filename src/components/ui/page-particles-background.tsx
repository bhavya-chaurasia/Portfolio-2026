import { FC, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import * as THREE from "three";

type SphereParticle = {
  color: THREE.Color;
  position: [number, number, number];
  scale: number;
};

const PageBackgroundSphere: FC<{ dark: boolean }> = ({ dark }) => {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo<SphereParticle[]>(() => {
    const particleCount = 1800;
    const sphereRadius = 13.5;
    const positionRandomness = 5.5;
    const particleSizeMin = 0.005;
    const particleSizeMax = 0.01;

    return Array.from({ length: particleCount }, (_, index) => {
      const phi = Math.acos(-1 + (2 * index) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radiusVariation =
        sphereRadius + (Math.random() - 0.5) * positionRandomness;

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi);
      const y = radiusVariation * Math.cos(phi);
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi);

      return {
        position: [x, y, z],
        scale:
          Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin,
        color: dark
          ? new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.6 + Math.random() * 0.3)
          : new THREE.Color().setHSL(0, 0, 0.03 + Math.random() * 0.06),
      };
    });
  }, [dark]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.00032;
    groupRef.current.rotation.x += 0.00004;
  });

  return (
    <group ref={groupRef} scale={[1.45, 1.45, 1.45]} position={[0, 0, -2]}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={dark ? 0.95 : 0.52}
          />
        </mesh>
      ))}
    </group>
  );
};

interface PageParticlesBackgroundProps {
  dark?: boolean;
  className?: string;
}

const PageParticlesBackground: FC<PageParticlesBackgroundProps> = ({
  dark = false,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}
    >
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 34], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <PageBackgroundSphere dark={dark} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PageParticlesBackground;
