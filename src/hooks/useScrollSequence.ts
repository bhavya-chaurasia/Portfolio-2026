import { useEffect, useRef, useCallback } from "react";

interface ScrollSequenceOptions {
  totalFrames?: number;
  framePath?: (frameNumber: number) => string;
  sectionSelector?: string;
  sectionHeight?: number;
  clampWidth?: string;
  pixelRatio?: number;
  lerpFactor?: number;
}

export const useScrollSequence = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: ScrollSequenceOptions = {}
) => {
  const {
    totalFrames = 91,
    framePath = (n) =>
      `/about-me/ezgif-frame-${String(n).padStart(3, "0")} 2.png`,
    sectionSelector = ".about-deepdive",
    pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1,
  } = options;

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(totalFrames).fill(null)
  );
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);

  // Load image with error handling
  const loadImage = useCallback(
    (frameIndex: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[frameIndex]) {
          resolve(imagesRef.current[frameIndex]!);
          return;
        }

        const img = new Image();
        img.onload = () => {
          imagesRef.current[frameIndex] = img;
          loadedFramesRef.current.add(frameIndex);
          resolve(img);
        };
        img.onerror = reject;
        img.src = framePath(frameIndex + 1);
      });
    },
    [framePath]
  );

  // Load first frame immediately
  useEffect(() => {
    loadImage(0).catch(() => {
      console.error("Failed to load initial frame");
    });
  }, [loadImage]);

  // Lazy load remaining frames in background
  useEffect(() => {
    const loadFramesInBackground = async () => {
      for (let i = 1; i < totalFrames; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Stagger loads
        loadImage(i).catch(() => {
          console.warn(`Failed to load frame ${i + 1}`);
        });
      }
    };

    loadFramesInBackground();
  }, [totalFrames, loadImage]);

  // Get nearest loaded frame
  const getNearestLoadedFrame = useCallback((frameIndex: number) => {
    const targetIndex = Math.round(frameIndex);
    if (loadedFramesRef.current.has(targetIndex)) {
      return targetIndex;
    }

    // Search outward for nearest loaded frame
    for (let distance = 1; distance < totalFrames; distance++) {
      if (loadedFramesRef.current.has(targetIndex - distance)) {
        return targetIndex - distance;
      }
      if (loadedFramesRef.current.has(targetIndex + distance)) {
        return targetIndex + distance;
      }
    }
    return 0; // Fallback to first frame
  }, [totalFrames]);

  // Calculate canvas dimensions matching CSS
  const getCanvasDimensions = useCallback(() => {
    if (!canvasRef.current) return { width: 520, height: 520, displayWidth: 520, displayHeight: 520 };

    const rect = canvasRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return { width: 520, height: 520, displayWidth: 520, displayHeight: 520 };

    // Parse clamp width: clamp(520px, 84vw, 952px)
    const vwValue = window.innerWidth * 0.84;
    const displayWidth = Math.max(520, Math.min(vwValue, 952));

    // Assume square aspect ratio for now (can be adjusted per frame)
    const displayHeight = displayWidth;

    // Scale down for better performance and sizing
    const scale = 0.52; // 52% of calculated size
    const scaledWidth = displayWidth * scale;
    const scaledHeight = displayHeight * scale;

    return {
      width: scaledWidth * pixelRatio,
      height: scaledHeight * pixelRatio,
      displayWidth: scaledWidth,
      displayHeight: scaledHeight,
    };
  }, [pixelRatio]);

  // Render frame to canvas
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height, displayWidth, displayHeight } =
        getCanvasDimensions();

      // Update canvas size if needed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
      }

      const roundedFrameIndex = Math.round(frameIndex);
      const nearestFrameIndex = getNearestLoadedFrame(roundedFrameIndex);
      const image = imagesRef.current[nearestFrameIndex];

      if (image) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate aspect ratio
        const imgAspectRatio = image.width / image.height;
        const canvasAspectRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        // Maintain aspect ratio without stretching
        if (imgAspectRatio > canvasAspectRatio) {
          drawWidth = height * imgAspectRatio;
          offsetX = (width - drawWidth) / 2;
        } else {
          drawHeight = width / imgAspectRatio;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
    },
    [canvasRef, getCanvasDimensions, getNearestLoadedFrame]
  );

  // Calculate scroll progress
  const updateFrame = useCallback(() => {
    sectionRef.current = document.querySelector(sectionSelector) as HTMLElement;
    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.getBoundingClientRect().top;
    const sectionElement = sectionRef.current;
    const sectionHeightPx = sectionElement.offsetHeight;

    // Calculate progress: 0 at section top, 1 at end
    const scrollProgress = Math.max(
      0,
      Math.min(1, -sectionTop / sectionHeightPx)
    );

    // Map to frame index
    targetFrameRef.current = scrollProgress * (totalFrames - 1);
  }, [sectionSelector, totalFrames]);

  // Smooth interpolation loop
  const animate = useCallback(() => {
    // Directly use target frame (no lerp smoothing) - changes only with scroll
    currentFrameRef.current = targetFrameRef.current;

    // Render current frame
    renderFrame(currentFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [renderFrame]);

  // Setup scroll listener
  useEffect(() => {
    const handleScroll = () => {
      updateFrame();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial render
    updateFrame();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateFrame, animate]);

  // Resize handler for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  return {
    imagesLoaded: loadedFramesRef.current.size,
    totalFrames,
    currentFrame: currentFrameRef.current,
  };
};
