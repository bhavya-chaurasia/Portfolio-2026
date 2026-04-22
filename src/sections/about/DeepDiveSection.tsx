/* eslint-disable react/no-unknown-property */
"use client";

import { FC, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/cosmos-3d-orbit-gallery";
import { useScrollSequence } from "../../hooks/useScrollSequence";
import { THEMES } from "../../constants/themes";
import "./DeepDiveSection.css";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Theme = typeof THEMES.light;

interface DeepDiveSectionProps {
  t?: Theme;
}

type BgParticle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

const DEFAULT_ORBIT_GROUP_SCALE = 0.25;
const MIN_ORBIT_GROUP_SCALE = 0.05;
const DEFAULT_CAMERA_DISTANCE = Math.sqrt(10 ** 2 + 1.5 ** 2 + 10 ** 2);
const MAX_DISTANCE_FOR_MIN_SCALE =
  DEFAULT_CAMERA_DISTANCE * (DEFAULT_ORBIT_GROUP_SCALE / MIN_ORBIT_GROUP_SCALE);

const ClampedOrbitControls: FC = () => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onWheel = (event: WheelEvent) => {
      if (!controls.enabled) return;

      // Keep page scroll behavior (handled by parent), but take over zoom to ensure consistent direction + clamp.
      event.preventDefault();

      const direction = new THREE.Vector3().subVectors(camera.position, controls.target);
      const distance = direction.length();
      const isNearMaxZoom = distance < 1.5; // When very close to max zoom

      // deltaY > 0 is typically "scroll down"
      const abs = Math.min(250, Math.abs(event.deltaY));
      const zoomFactor = 1 + abs / 600; // gentle exponential-ish zoom

      // Browser behavior:
      // - normal scroll wheel: deltaY > 0 is typically "scroll down"
      // - trackpad pinch-to-zoom often comes through as a wheel event with ctrlKey=true,
      //   and the deltaY sign is commonly opposite of "zoom intent".
      const zoomIn = event.ctrlKey ? event.deltaY < 0 : event.deltaY > 0;
      const nextDistance = zoomIn ? distance / zoomFactor : distance * zoomFactor;
      const clampedDistance = THREE.MathUtils.clamp(nextDistance, 0.5, MAX_DISTANCE_FOR_MIN_SCALE);

      direction.setLength(clampedDistance);
      camera.position.copy(controls.target).add(direction);
      camera.updateMatrixWorld();
      controls.update();

      // Slow down page scroll while zooming in, resume normal speed at max zoom
      const scrollMultiplier = isNearMaxZoom ? 1 : 0.35; // 65% scroll reduction until max zoom
      window.scrollBy({ top: event.deltaY * scrollMultiplier, left: 0, behavior: "auto" });
    };

    gl.domElement.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      gl.domElement.removeEventListener("wheel", onWheel as any);
    };
  }, [camera, gl]);

  return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={false} enableRotate={true} />;
};

const DeepDiveSection: FC<DeepDiveSectionProps> = ({ t = THEMES.light }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  // Initialize scroll sequence animation
  useScrollSequence(sequenceCanvasRef, {
    totalFrames: 91,
    framePath: (n) =>
      `/about-me/ezgif-frame-${String(n).padStart(3, "0")} 2.png`,
    sectionSelector: ".about-deepdive",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    if (sectionRef.current) {
      const sectionBottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({
        top: sectionBottom,
        behavior: "smooth",
      });
    }
  };

  const unsplashImages = useMemo(
    () => [
      // From src/constants/gallery.ts (17-22)
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/Frame%208.png?updatedAt=1773071656240",
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/deliotte-image.png?updatedAt=1773071657340",
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/Screenshot%202026-03-08%20at%202.15.07%E2%80%AFPM.png?updatedAt=1773071655009",
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/maruti-win-cheque.png?updatedAt=1773071655136",
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/Screenshot%202026-03-08%20at%202.28.55%E2%80%AFPM.png?updatedAt=1773071655025",
      "https://ik.imagekit.io/jlzzapai2/Founding%20Designer/5c46de55-2f5f-4e41-b1cf-dae702de0f9d.JPG?updatedAt=1773071654529",

      // From src/constants/gallery.ts (35-40)
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_8633%201.png?updatedAt=1773068033829",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_0928%201.png?updatedAt=1773068029849",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_5055%201.png?updatedAt=1773068034947",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_5030%201.png?updatedAt=1773068034430",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_4013%201.png?updatedAt=1773068032629",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_0927%201.png?updatedAt=1773068031449",

      //Duplicates
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_8633%201.png?updatedAt=1773068033829",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_0928%201.png?updatedAt=1773068029849",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_5055%201.png?updatedAt=1773068034947",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_5030%201.png?updatedAt=1773068034430",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_4013%201.png?updatedAt=1773068032629",
      "https://ik.imagekit.io/jlzzapai2/Hyderabad/IMG_0927%201.png?updatedAt=1773068031449",
    ],
    []
  );

  const isDarkTheme = t === THEMES.dark;

  const bgParticles = useMemo<BgParticle[]>(() => {
    const count = 170;
    const centerX = 100;
    const centerY = 100;
    const exclusionRadius = 31; // Keep center clear (globe area)
    const points: BgParticle[] = [];

    while (points.length < count) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= exclusionRadius) continue;

      points.push({
        x,
        y,
        size: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.28 + 0.16,
        duration: Math.random() * 22 + 18,
        delay: Math.random() * -24,
        driftX: (Math.random() - 0.5) * 7,
        driftY: (Math.random() - 0.5) * 7,
      });
    }

    return points;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-deepdive w-full h-screen relative "
      style={
        {
          // Make this section full-bleed even inside centered/padded layouts.
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          ["--ad-ink" as any]: t.ink,
          ["--ad-ink2" as any]: t.ink2,
          ["--ad-ink3" as any]: t.ink3,
          ["--ad-bg2" as any]: t.bg2,
          ["--ad-btn" as any]: t.btn,
          ["--ad-border" as any]: t.border,
          ["--ad-accent" as any]: t.accent,
          ["--ad-particle" as any]: isDarkTheme ? "rgba(255, 255, 255, 0.72)" : "rgba(100, 116, 139, 0.7)",
          ["--ad-particle-glow" as any]: isDarkTheme
            ? "0 0 6px rgba(255, 255, 255, 0.22)"
            : "0 0 6px rgba(100, 116, 139, 0.24)",
        } as React.CSSProperties
      }
    >
      {/* Scroll-driven image sequence canvas */}
      <canvas
        ref={sequenceCanvasRef}
        className="about-deepdive__sequenceCanvas"
        aria-hidden="true"
      />

      <div className="about-deepdive__bgParticles" aria-hidden="true">
        {bgParticles.map((p, idx) => (
          <span
            key={idx}
            className="about-deepdive__bgParticle"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--drift-x" as any]: `${p.driftX}px`,
                ["--drift-y" as any]: `${p.driftY}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        className="about-deepdive__orbitWrap"
        onWheelCapture={(e) => {
          // Keep orbit zoom, but also allow normal page scroll progression.
          window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
        }}
      >
        <Canvas className="about-deepdive__orbitCanvas" camera={{ position: [-10, 1.5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense
            fallback={
              <mesh>
                <sphereGeometry args={[1, 16, 12]} />
                <meshBasicMaterial color="white" opacity={0.25} transparent />
              </mesh>
            }
          >
            <group scale={[DEFAULT_ORBIT_GROUP_SCALE, DEFAULT_ORBIT_GROUP_SCALE, DEFAULT_ORBIT_GROUP_SCALE]}>
              <ParticleSphere images={unsplashImages} particlePalette={isDarkTheme ? "warm" : "slate"} />
            </group>
          </Suspense>
          <ClampedOrbitControls />
        </Canvas>
      </div>

      <button
        className={`about-deepdive__scrollButton ${showArrow ? "about-deepdive__scrollButton--visible" : ""}`}
        onClick={handleScrollDown}
        aria-label="Scroll down to next section"
      >
        <div className="about-deepdive__scrollButton__content">
          <svg
            className="about-deepdive__scrollButton__icon"
            width="24"
            height="40"
            viewBox="0 0 24 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <defs>
              <pattern id="deepdive-scroll-mouse-fill" patternUnits="userSpaceOnUse" x="4" y="2" width="16" height="28">
                <image
                  href="/Space/image%20106.png"
                  x="0.8"
                  y="-3.6"
                  width="22.4"
                  height="39.2"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            {/* Mouse/scroll wheel shape - rounded rectangle */}
            <rect x="4" y="2" width="16" height="28" rx="8" ry="8" fill="url(#deepdive-scroll-mouse-fill)" />
            {/* Scroll indicator line */}
            <line className="about-deepdive__scrollButton__line" x1="12" y1="8" x2="12" y2="14" strokeLinecap="round" />
          </svg>
          <span className="about-deepdive__scrollButton__text">Scroll</span>
        </div>
      </button>

    </section>
  );
};

export default DeepDiveSection;
