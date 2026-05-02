"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ParticleSphereProps {
  images: string[];
  particlePalette?: "warm" | "slate";
  imageLayer?: "all" | "front" | "back";
  showParticles?: boolean;
}

export function ParticleSphere({
  images,
  particlePalette = "warm",
  imageLayer = "all",
  showParticles = true,
}: ParticleSphereProps) {
  const PARTICLE_COUNT = 1500; // Reduced particle count to make images more visible
  const PARTICLE_SIZE_MIN = 0.005;
  const PARTICLE_SIZE_MAX = 0.01;
  const SPHERE_RADIUS = 9;
  const POSITION_RANDOMNESS = 4;
  const ROTATION_SPEED_X = 0.0;
  const ROTATION_SPEED_Y = 0.0005;
  const PARTICLE_OPACITY = 1;

  const IMAGE_COUNT = images.length;
  const IMAGE_SIZE = 1.5; // Increased image size to make them more visible
  const IMAGE_ASPECT = 3 / 2; // width / height for your 3:2 images
  const IMAGE_WIDTH = IMAGE_SIZE * IMAGE_ASPECT;
  const IMAGE_HEIGHT = IMAGE_SIZE;

  const groupRef = useRef<THREE.Group>(null);
  const imageMeshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const centerWorldRef = useRef(new THREE.Vector3());
  const imageWorldRef = useRef(new THREE.Vector3());
  const cameraDirectionRef = useRef(new THREE.Vector3());

  const textures = useTexture(images);

  const particles = useMemo(() => {
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Generate points on sphere surface with some random variation
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;

      // Add random variation to make it more organic
      const radiusVariation =
        SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS;

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi);
      const y = radiusVariation * Math.cos(phi);
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi);

      particles.push({
        position: [x, y, z] as [number, number, number],
        scale:
          Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) +
          PARTICLE_SIZE_MIN,
        color:
          particlePalette === "slate"
            ? new THREE.Color().setHSL(
                0,
                0,
                0.03 + Math.random() * 0.06 // black to charcoal variation
              )
            : new THREE.Color().setHSL(
                Math.random() * 0.1 + 0.05, // Yellow-orange hues
                0.8,
                0.6 + Math.random() * 0.3
              ),
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    return particles;
  }, [
    PARTICLE_COUNT,
    SPHERE_RADIUS,
    POSITION_RANDOMNESS,
    PARTICLE_SIZE_MIN,
    PARTICLE_SIZE_MAX,
    particlePalette,
  ]);

  const orbitingImages = useMemo(() => {
    const images = [];

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2;
      const x = SPHERE_RADIUS * Math.cos(angle);
      const y = 0; // All images aligned on X-axis
      const z = SPHERE_RADIUS * Math.sin(angle);

      const position = new THREE.Vector3(x, y, z);
      const center = new THREE.Vector3(0, 0, 0);
      const outwardDirection = position.clone().sub(center).normalize();

      // Create a rotation that makes the plane face outward
      const euler = new THREE.Euler();
      const matrix = new THREE.Matrix4();
      matrix.lookAt(
        position,
        position.clone().add(outwardDirection),
        new THREE.Vector3(0, 1, 0)
      );
      euler.setFromRotationMatrix(matrix);

      images.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        textureIndex: i % textures.length,
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6), // Added random colors
      });
    }

    return images;
  }, [IMAGE_COUNT, SPHERE_RADIUS, textures.length]);

  useFrame(({ camera }) => {
    const group = groupRef.current;
    if (!group) return;

    // Sync duplicated front/back canvases to the same orbit phase.
    group.rotation.y = performance.now() * ROTATION_SPEED_Y * 0.06;
    group.rotation.x = performance.now() * ROTATION_SPEED_X * 0.06;

    if (imageLayer === "all") return;

    group.updateMatrixWorld(true);
    group.getWorldPosition(centerWorldRef.current);
    camera.getWorldDirection(cameraDirectionRef.current);

    imageMeshRefs.current.forEach((mesh) => {
      if (!mesh) return;

      mesh.getWorldPosition(imageWorldRef.current);
      const depthFromCenter = imageWorldRef.current
        .sub(centerWorldRef.current)
        .dot(cameraDirectionRef.current);

      mesh.visible =
        imageLayer === "front" ? depthFromCenter < 0 : depthFromCenter >= 0;
    });
  });

  return (
    <group ref={groupRef}>
      {showParticles &&
        particles.map((particle, index) => (
          <mesh key={index} position={particle.position} scale={particle.scale}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshBasicMaterial
              color={particle.color}
              transparent
              opacity={PARTICLE_OPACITY}
            />
          </mesh>
        ))}

      {orbitingImages.map((image, index) => (
        <mesh
          key={`image-${index}`}
          ref={(mesh) => {
            imageMeshRefs.current[index] = mesh;
          }}
          position={image.position}
          rotation={image.rotation}
        >
          <planeGeometry args={[IMAGE_WIDTH, IMAGE_HEIGHT]} />
          <meshBasicMaterial
            map={textures[image.textureIndex]}
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
