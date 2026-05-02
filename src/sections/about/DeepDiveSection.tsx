"use client";

import { FC, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/cosmos-3d-orbit-gallery";
import { useScrollSequence } from "../../hooks/useScrollSequence";
import { THEMES } from "../../constants/themes";
import "./DeepDiveSection.css";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import image1 from "../../../public/orbit/DSC_1111 4.jpg";
import image2 from "../../../public/orbit/Hyderabad marathon.jpeg";
import image3 from "../../../public/orbit/IMG_0298.jpg";
import image4 from "../../../public/orbit/IMG_0705 3.jpg";
import image5 from "../../../public/orbit/IMG_0843.jpg";
import image6 from "../../../public/orbit/IMG_0884 3.jpg";
import image7 from "../../../public/orbit/IMG_1342 4.jpg";
import image8 from "../../../public/orbit/IMG_1819.jpg";
import image9 from "../../../public/orbit/IMG_1838 2.jpg";
import image10 from "../../../public/orbit/IMG_4354.jpg";
import image11 from "../../../public/orbit/IMG_4400.jpg";
import image12 from "../../../public/orbit/IMG_4751.jpg";
import image13 from "../../../public/orbit/IMG_4958 3.jpg";
import image14 from "../../../public/orbit/IMG_5392 2.jpg";
import image15 from "../../../public/orbit/IMG_8576.jpg";
import image16 from "../../../public/orbit/IMG_8584.jpg";
import image17 from "../../../public/orbit/IMG_9309.jpg";
import image18 from "../../../public/orbit/IMG_9360 2.jpg";

type Theme = typeof THEMES.light;

interface DeepDiveSectionProps {
  t?: Theme;
  onZoomCompleteChange?: (isComplete: boolean) => void;
}

type DeepDiveStyle = React.CSSProperties &
  Record<`--ad-${string}`, string>;

type BgParticleStyle = React.CSSProperties &
  Record<"--drift-x" | "--drift-y", string>;

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

type OrbitViewState = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

const DEFAULT_ORBIT_GROUP_SCALE = 0.15;
const MIN_ORBIT_GROUP_SCALE = 0.15;
const MIN_CAMERA_DISTANCE = 0.5;
const SYNCED_ZOOM_WHEEL_DISTANCE_PX = 2200;
const DEFAULT_CAMERA_DISTANCE = Math.sqrt(10 ** 2 + 1.5 ** 2 + 10 ** 2);
const MAX_DISTANCE_FOR_MIN_SCALE =
  DEFAULT_CAMERA_DISTANCE * (DEFAULT_ORBIT_GROUP_SCALE / MIN_ORBIT_GROUP_SCALE);

const getWheelDeltaPixels = (event: Pick<WheelEvent, "deltaMode" | "deltaY">) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 40;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
};

const applyZoomDistance = (
  camera: THREE.Camera,
  target: THREE.Vector3,
  zoomProgress: number
) => {
  const direction = new THREE.Vector3().subVectors(camera.position, target);
  if (direction.lengthSq() === 0) {
    direction.set(-10, 1.5, 10);
  }

  const clampedProgress = THREE.MathUtils.clamp(zoomProgress, 0, 1);
  const distance = THREE.MathUtils.lerp(
    MAX_DISTANCE_FOR_MIN_SCALE,
    MIN_CAMERA_DISTANCE,
    clampedProgress
  );

  direction.setLength(distance);
  camera.position.copy(target).add(direction);
  camera.updateMatrixWorld();
};

interface SyncedOrbitControlsProps {
  zoomProgress: number;
  viewStateRef: React.MutableRefObject<OrbitViewState | null>;
}

const SyncedOrbitControls: FC<SyncedOrbitControlsProps> = ({
  zoomProgress,
  viewStateRef,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    applyZoomDistance(camera, controls.target, zoomProgress);
    controls.update();
  }, [camera, zoomProgress]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (!viewStateRef.current) {
      viewStateRef.current = {
        position: new THREE.Vector3(),
        target: new THREE.Vector3(),
      };
    }

    viewStateRef.current.position.copy(camera.position);
    viewStateRef.current.target.copy(controls.target);
  });

  return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={false} enableRotate={true} />;
};

interface MirroredOrbitCameraProps {
  zoomProgress: number;
  viewStateRef: React.MutableRefObject<OrbitViewState | null>;
}

const MirroredOrbitCamera: FC<MirroredOrbitCameraProps> = ({
  zoomProgress,
  viewStateRef,
}) => {
  const { camera } = useThree();

  useFrame(() => {
    const viewState = viewStateRef.current;

    if (viewState) {
      camera.position.copy(viewState.position);
      camera.lookAt(viewState.target);
      camera.updateMatrixWorld();
      return;
    }

    applyZoomDistance(camera, new THREE.Vector3(0, 0, 0), zoomProgress);
  });

  return null;
};

const DeepDiveSection: FC<DeepDiveSectionProps> = ({
  t = THEMES.light,
  onZoomCompleteChange,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomProgressRef = useRef(0);
  const orbitViewStateRef = useRef<OrbitViewState | null>(null);
  const [showArrow, setShowArrow] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);

  const handleSyncedZoomWheel = useCallback((deltaPixels: number) => {
    const nextProgress = THREE.MathUtils.clamp(
      zoomProgressRef.current + deltaPixels / SYNCED_ZOOM_WHEEL_DISTANCE_PX,
      0,
      1
    );

    zoomProgressRef.current = nextProgress;
    setZoomProgress(nextProgress);
  }, []);

  const handleSectionWheelCapture = (event: React.WheelEvent<HTMLElement>) => {
    const deltaPixels = getWheelDeltaPixels(event.nativeEvent);

    if (zoomProgressRef.current >= 1 && deltaPixels > 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    handleSyncedZoomWheel(deltaPixels);
  };

  useEffect(() => {
    onZoomCompleteChange?.(zoomProgress >= 1);
  }, [onZoomCompleteChange, zoomProgress]);

  // Initialize scroll sequence animation
  useScrollSequence(sequenceCanvasRef, {
    totalFrames: 91,
    framePath: (n) =>
      `/about-me/ezgif-frame-${String(n).padStart(3, "0")} 2.png`,
    sectionSelector: ".about-deepdive",
    manualProgress: zoomProgress,
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
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
      image12,
      image13,
      image14,
      image15,
      image16,
      image17,
      image18,
    ],
    []
  );

  const isDarkTheme = t === THEMES.dark;

  const bgParticles = useMemo<BgParticle[]>(() => {
    const count = 170;
    const centerX = 50;
    const centerY = 50;
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
      onWheelCapture={handleSectionWheelCapture}
      style={
        {
          // Make this section full-bleed even inside centered/padded layouts.
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          "--ad-bg": isDarkTheme ? "#000000" : t.bg,
          "--ad-ink": t.ink,
          "--ad-ink2": t.ink2,
          "--ad-ink3": t.ink3,
          "--ad-bg2": t.bg2,
          "--ad-btn": t.btn,
          "--ad-border": t.border,
          "--ad-accent": t.accent,
          "--ad-particle": isDarkTheme ? "rgba(255, 255, 255, 0.72)" : "rgba(100, 116, 139, 0.7)",
          "--ad-particle-glow": isDarkTheme
            ? "0 0 6px rgba(255, 255, 255, 0.22)"
            : "0 0 6px rgba(100, 116, 139, 0.24)",
          "--ad-scroll-fg": isDarkTheme ? "rgba(255, 255, 255, 0.8)" : "rgba(28, 24, 16, 0.78)",
          "--ad-scroll-fg-hover": isDarkTheme ? "#ffffff" : t.ink,
        } as DeepDiveStyle
      }
    >
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
                "--drift-x": `${p.driftX}px`,
                "--drift-y": `${p.driftY}px`,
              } as BgParticleStyle
            }
          />
        ))}
      </div>

      <div
        className="about-deepdive__orbitWrap about-deepdive__orbitWrap--back"
        style={{
          transform: "translateY(-15vh)",
          height: "calc(100% + 15vh)"
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
              <ParticleSphere
                images={unsplashImages}
                imageLayer="back"
                particlePalette={isDarkTheme ? "warm" : "slate"}
              />
            </group>
          </Suspense>
          <SyncedOrbitControls
            zoomProgress={zoomProgress}
            viewStateRef={orbitViewStateRef}
          />
        </Canvas>
      </div>

      {/* Scroll-driven image sequence canvas */}
      <canvas
        ref={sequenceCanvasRef}
        className="about-deepdive__sequenceCanvas"
        aria-hidden="true"
      />

      <div
        className="about-deepdive__orbitWrap about-deepdive__orbitWrap--front"
        style={{
          transform: "translateY(-15vh)",
          height: "calc(100% + 15vh)"
        }}
      >
        <Canvas className="about-deepdive__orbitCanvas" camera={{ position: [-10, 1.5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <group scale={[DEFAULT_ORBIT_GROUP_SCALE, DEFAULT_ORBIT_GROUP_SCALE, DEFAULT_ORBIT_GROUP_SCALE]}>
              <ParticleSphere
                images={unsplashImages}
                imageLayer="front"
                particlePalette={isDarkTheme ? "warm" : "slate"}
                showParticles={false}
              />
            </group>
          </Suspense>
          <MirroredOrbitCamera
            zoomProgress={zoomProgress}
            viewStateRef={orbitViewStateRef}
          />
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
