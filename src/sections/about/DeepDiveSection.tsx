/* eslint-disable react/no-unknown-property */
"use client";

import { FC, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/cosmos-3d-orbit-gallery";
import { THEMES } from "../../constants/themes";
import "./DeepDiveSection.css";

type Theme = typeof THEMES.light;

interface DeepDiveSectionProps {
  t?: Theme;
}

const DeepDiveSection: FC<DeepDiveSectionProps> = ({ t = THEMES.light }) => {
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

  return (
    <section
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
          <ParticleSphere images={unsplashImages} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </section>
  );
};

export default DeepDiveSection;
