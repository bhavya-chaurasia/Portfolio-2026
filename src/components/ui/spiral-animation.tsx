import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

class Vector2D {
  constructor(public x: number, public y: number) {}
}

class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

type LoaderTheme = "light" | "dark";
type LoaderMode = "intro" | "auto";

function createSeededRandom(seed: number) {
  let currentSeed = seed;

  return () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };
}

class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private angle: number;
  private distance: number;
  private rotationDirection: number;
  private expansionRate: number;
  private finalScale: number;

  constructor(
    random: () => number,
    cameraZ: number,
    cameraTravelDistance: number
  ) {
    this.angle = random() * Math.PI * 2;
    this.distance = 28 * random() + 18;
    this.rotationDirection = random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.15 + random() * 0.55;
    this.finalScale = 0.65 + random() * 0.4;

    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);

    this.spiralLocation = (1 - Math.pow(1 - random(), 3)) / 1.35;
    const z = cameraTravelDistance * random() + 0.5 * cameraZ;
    this.z = AnimationController.lerpValue(
      z,
      cameraTravelDistance / 2,
      0.3 * this.spiralLocation
    );
    this.strokeWeightFactor = Math.pow(random(), 2);
  }

  render(progress: number, controller: AnimationController) {
    const spiralPos = controller.spiralPath(this.spiralLocation);
    const q = progress - this.spiralLocation;

    if (q <= 0) {
      return;
    }

    const displacementProgress = controller.constrain(4 * q, 0, 1);
    const linearEasing = displacementProgress;
    const elasticEasing = controller.easeOutElastic(displacementProgress);
    const powerEasing = Math.pow(displacementProgress, 2);

    let easing = elasticEasing;
    if (displacementProgress < 0.3) {
      easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3);
    } else if (displacementProgress < 0.7) {
      const t = (displacementProgress - 0.3) / 0.4;
      easing = controller.lerp(powerEasing, elasticEasing, t);
    }

    let screenX = spiralPos.x;
    let screenY = spiralPos.y;

    if (displacementProgress < 0.3) {
      screenX = controller.lerp(
        spiralPos.x,
        spiralPos.x + this.dx * 0.3,
        easing / 0.3
      );
      screenY = controller.lerp(
        spiralPos.y,
        spiralPos.y + this.dy * 0.3,
        easing / 0.3
      );
    } else if (displacementProgress < 0.7) {
      const midProgress = (displacementProgress - 0.3) / 0.4;
      const curveStrength =
        Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.2;
      const baseX = spiralPos.x + this.dx * 0.3;
      const baseY = spiralPos.y + this.dy * 0.3;
      const targetX = spiralPos.x + this.dx * 0.7;
      const targetY = spiralPos.y + this.dy * 0.7;
      const perpX = -this.dy * 0.32 * curveStrength;
      const perpY = this.dx * 0.32 * curveStrength;

      screenX = controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
      screenY = controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
    } else {
      const finalProgress = (displacementProgress - 0.7) / 0.3;
      const baseX = spiralPos.x + this.dx * 0.7;
      const baseY = spiralPos.y + this.dy * 0.7;
      const targetDistance = this.distance * this.expansionRate * 1.35;
      const spiralTurns = 1.05 * this.rotationDirection;
      const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;
      const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
      const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);

      screenX = controller.lerp(baseX, targetX, finalProgress);
      screenY = controller.lerp(baseY, targetY, finalProgress);
    }

    const vx =
      (this.z - controller.cameraZ) * screenX / controller.viewZoom;
    const vy =
      (this.z - controller.cameraZ) * screenY / controller.viewZoom;
    const position = new Vector3D(vx, vy, this.z);

    let sizeMultiplier = 1;
    if (displacementProgress < 0.6) {
      sizeMultiplier = 1 + displacementProgress * 0.16;
    } else {
      const t = (displacementProgress - 0.6) / 0.4;
      sizeMultiplier = 1.16 * (1 - t) + this.finalScale * t;
    }

    controller.showProjectedDot(position, 7.8 * this.strokeWeightFactor * sizeMultiplier);
  }
}

class AnimationController {
  public readonly cameraZ = -400;
  public readonly viewZoom = 100;

  private readonly cameraTravelDistance = 3400;
  private readonly startDotYOffset = 28;
  private readonly changeEventTime = 0.32;
  private readonly timeline: gsap.core.Timeline;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  private readonly trailLength: number;
  private readonly stars: Star[];
  private readonly backgroundColor: string;
  private readonly dotColor: string;

  private time = 0;

  constructor(params: {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    particleCount: number;
    trailLength: number;
    theme: LoaderTheme;
  }) {
    this.ctx = params.ctx;
    this.width = params.width;
    this.height = params.height;
    this.trailLength = params.trailLength;
    this.backgroundColor =
      params.theme === "dark" ? "rgba(0, 0, 0, 0.42)" : "rgba(253, 252, 251, 0.18)";
    this.dotColor = params.theme === "dark" ? "#F4F2EE" : "#1C1810";

    const random = createSeededRandom(1234);
    this.stars = Array.from(
      { length: params.particleCount },
      () => new Star(random, this.cameraZ, this.cameraTravelDistance)
    );

    this.timeline = gsap.timeline({ repeat: -1, paused: true });
    this.timeline.to(this, {
      time: 1,
      duration: 14,
      ease: "none",
      repeat: -1,
      onUpdate: () => this.render(),
    });
    this.timeline.play();
  }

  static lerpValue(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
  }

  public ease(progress: number, power: number) {
    if (progress < 0.5) {
      return 0.5 * Math.pow(2 * progress, power);
    }

    return 1 - 0.5 * Math.pow(2 * (1 - progress), power);
  }

  public easeOutElastic(value: number) {
    const c4 = (2 * Math.PI) / 4.5;
    if (value <= 0) {
      return 0;
    }
    if (value >= 1) {
      return 1;
    }

    return Math.pow(2, -8 * value) * Math.sin((value * 8 - 0.75) * c4) + 1;
  }

  public map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  public constrain(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  public lerp(start: number, end: number, t: number) {
    return AnimationController.lerpValue(start, end, t);
  }

  public spiralPath(progress: number) {
    const eased = this.ease(this.constrain(1.2 * progress, 0, 1), 1.8);
    const spiralTurns = 6;
    const theta = 2 * Math.PI * spiralTurns * Math.sqrt(eased);
    const radius = 170 * Math.sqrt(eased);

    return new Vector2D(
      radius * Math.cos(theta),
      radius * Math.sin(theta) + this.startDotYOffset
    );
  }

  public rotate(
    start: Vector2D,
    end: Vector2D,
    progress: number,
    inverse: boolean
  ) {
    const middle = new Vector2D((start.x + end.x) / 2, (start.y + end.y) / 2);
    const dx = start.x - middle.x;
    const dy = start.y - middle.y;
    const angle = Math.atan2(dy, dx);
    const orientation = inverse ? -1 : 1;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const bounce = Math.sin(progress * Math.PI) * 0.05 * (1 - progress);

    return new Vector2D(
      middle.x +
        radius * (1 + bounce) * Math.cos(angle + orientation * Math.PI * this.easeOutElastic(progress)),
      middle.y +
        radius * (1 + bounce) * Math.sin(angle + orientation * Math.PI * this.easeOutElastic(progress))
    );
  }

  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const cameraOffset =
      this.cameraZ +
      this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

    if (position.z <= cameraOffset) {
      return;
    }

    const depth = position.z - cameraOffset;
    const x = this.viewZoom * position.x / depth;
    const y = this.viewZoom * position.y / depth;
    const strokeWeight = 400 * sizeFactor / depth;

    this.ctx.lineWidth = strokeWeight;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawStartDot() {
    if (this.time <= this.changeEventTime) {
      return;
    }

    const dy = this.cameraZ * this.startDotYOffset / this.viewZoom;
    this.showProjectedDot(
      new Vector3D(0, dy, this.cameraTravelDistance),
      2.2
    );
  }

  private drawTrail(progress: number) {
    for (let index = 0; index < this.trailLength; index += 1) {
      const factor = this.map(index, 0, this.trailLength, 1.05, 0.15);
      const strokeWeight =
        (1.15 * (1 - progress) + 2.8 * Math.sin(Math.PI * progress)) * factor;
      const pathTime = progress - 0.00018 * index;
      const basePosition = this.spiralPath(pathTime);
      const offset = new Vector2D(basePosition.x + 5, basePosition.y + 5);
      const rotated = this.rotate(
        basePosition,
        offset,
        Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
        index % 2 === 0
      );

      this.ctx.beginPath();
      this.ctx.arc(rotated.x, rotated.y, strokeWeight / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  public render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);

    const t1 = this.constrain(
      this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1),
      0,
      1
    );
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);

    this.ctx.rotate(-Math.PI * this.ease(t2, 2.7));
    this.ctx.fillStyle = this.dotColor;

    this.drawTrail(t1);
    for (const star of this.stars) {
      star.render(t1, this);
    }
    this.drawStartDot();

    this.ctx.restore();
  }

  public destroy() {
    this.timeline.kill();
  }
}

interface SpiralAnimationProps {
  mode: LoaderMode;
  theme: LoaderTheme;
  particleCount?: number;
  trailLength?: number;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

export function SpiralAnimation({
  mode,
  theme,
  particleCount = 1200,
  trailLength = 64,
}: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === "undefined" ? 0 : window.innerWidth,
    height: typeof window === "undefined" ? 0 : window.innerHeight,
  }));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const effectiveParticleCount = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return particleCount;
    }

    const isMobile = viewport.width < 768;
    const baseScale = mode === "intro" ? 1 : 0.72;
    const motionScale = reducedMotion ? 0.32 : 1;
    const mobileScale = isMobile ? 0.58 : 1;

    return Math.max(
      180,
      Math.floor(particleCount * baseScale * motionScale * mobileScale)
    );
  }, [mode, particleCount, reducedMotion, viewport.height, viewport.width]);

  const effectiveTrailLength = useMemo(() => {
    if (reducedMotion) {
      return Math.max(18, Math.floor(trailLength * 0.55));
    }

    return viewport.width < 768 ? Math.max(24, Math.floor(trailLength * 0.72)) : trailLength;
  }, [reducedMotion, trailLength, viewport.width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !viewport.width || !viewport.height) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    controllerRef.current?.destroy();
    controllerRef.current = new AnimationController({
      ctx: context,
      width: viewport.width,
      height: viewport.height,
      particleCount: effectiveParticleCount,
      trailLength: effectiveTrailLength,
      theme,
    });

    return () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [
    effectiveParticleCount,
    effectiveTrailLength,
    theme,
    viewport.height,
    viewport.width,
  ]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
