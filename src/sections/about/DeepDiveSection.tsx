/* eslint-disable react/no-unknown-property */
"use client";

import { FC, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/cosmos-3d-orbit-gallery";
import { THEMES } from "../../constants/themes";
import "./DeepDiveSection.css";

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

const FRAME_COUNT = 91;

const getFrameSrc = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/about-me/ezgif-frame-${padded} 2.png`;
};

const drawCover = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
) => {
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  const imageRatio = image.width / image.height;
  const canvasRatio = canvasW / canvasH;

  let drawW = canvasW;
  let drawH = canvasH;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawH = canvasH;
    drawW = drawH * imageRatio;
    offsetX = (canvasW - drawW) / 2;
  } else {
    drawW = canvasW;
    drawH = drawW / imageRatio;
    offsetY = (canvasH - drawH) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(image, offsetX, offsetY, drawW, drawH);
};

const DeepDiveSection: FC<DeepDiveSectionProps> = ({ t = THEMES.light }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);
  const activeFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      c.width = Math.max(1, Math.floor(rect.width * dpr));
      c.height = Math.max(1, Math.floor(rect.height * dpr));
      if (loadedRef.current && activeFrameRef.current >= 0) {
        const img = framesRef.current[activeFrameRef.current];
        if (img) drawCover(c, ctx, img);
      }
    };

    const updateFrameFromScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        if (!loadedRef.current || !sectionRef.current || !canvasRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const progressRaw = (vh - rect.top) / (vh + rect.height);
        const progress = Math.min(1, Math.max(0, progressRaw));
        const nextFrame = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
        );

        if (nextFrame === activeFrameRef.current) return;
        activeFrameRef.current = nextFrame;
        const img = framesRef.current[nextFrame];
        if (!img) return;
        drawCover(canvasRef.current, ctx, img);
      });
    };

    const preloadFrames = async () => {
      const frames = await Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, i) => {
          const frameNumber = i + 1;
          return new Promise<HTMLImageElement>((resolve) => {
            const image = new Image();
            image.src = getFrameSrc(frameNumber);
            image.onload = () => resolve(image);
            image.onerror = () => resolve(image);
          });
        })
      );

      if (cancelled) return;
      framesRef.current = frames;
      loadedRef.current = true;
      resizeCanvas();
      updateFrameFromScroll();
    };

    preloadFrames();
    resizeCanvas();
    updateFrameFromScroll();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateFrameFromScroll, { passive: true });

    return () => {
      cancelled = true;
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateFrameFromScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-deepdive w-full h-screen bg-black relative "
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
        } as React.CSSProperties
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
                ["--drift-x" as any]: `${p.driftX}px`,
                ["--drift-y" as any]: `${p.driftY}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div
        onWheelCapture={(e) => {
          // Keep orbit zoom, but also allow normal page scroll progression.
          window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
        }}
        style={{ width: "100%", height: "72%" }}
      >
        <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
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
            <group scale={[0.25, 0.25, 0.25]}>
              <ParticleSphere images={unsplashImages} />
            </group>
          </Suspense>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      <div className="about-deepdive__frameWrap" aria-label="Scroll-driven girl animation">
        <canvas ref={canvasRef} className="about-deepdive__frameCanvas" />
      </div>
    </section>
  );
};

export default DeepDiveSection;