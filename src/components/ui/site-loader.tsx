import { lazy, Suspense, useEffect, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import {
  type LoaderMode,
  type LoaderTheme,
} from "@/components/ui/loader-provider";

const SpiralAnimation = lazy(async () => {
  const module = await import("./spiral-animation");
  return { default: module.SpiralAnimation };
});

interface SiteLoaderProps {
  mode: LoaderMode;
  theme: LoaderTheme;
  visible: boolean;
  showEnter?: boolean;
  onEnter?: () => void;
  ready?: boolean;
  className?: string;
}

const THEMES = {
  light: {
    background:
      "radial-gradient(circle at top, rgba(255,255,255,0.96), rgba(244,242,238,0.97) 58%, rgba(233,229,222,0.98))",
    text: "#1C1810",
    muted: "rgba(28,24,16,0.56)",
    border: "rgba(28,24,16,0.1)",
  },
  dark: {
    background:
      "radial-gradient(circle at top, rgba(18,18,18,0.92), rgba(0,0,0,0.97) 58%, rgba(0,0,0,1))",
    text: "#F1EEE8",
    muted: "rgba(241,238,232,0.56)",
    border: "rgba(241,238,232,0.14)",
  },
} as const;

export default function SiteLoader({
  mode,
  theme,
  visible,
  showEnter = false,
  onEnter,
  ready = false,
  className,
}: SiteLoaderProps) {
  const palette = THEMES[theme];
  const [enterScaleUp, setEnterScaleUp] = useState(false);
  const canActivateEnter = mode === "intro" && visible && showEnter && Boolean(onEnter);

  useEffect(() => {
    if (mode !== "intro" || !showEnter || !visible) {
      setEnterScaleUp(false);
      return;
    }

    setEnterScaleUp(false);
    const frame = window.requestAnimationFrame(() => {
      setEnterScaleUp(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [mode, showEnter, visible]);

  const handleActivateEnter = () => {
    if (!canActivateEnter) {
      return;
    }

    onEnter?.();
  };

  const handleLoaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canActivateEnter) {
      return;
    }

    const isEnterKey =
      event.key === "Enter" || event.key === "Return" || event.code === "NumpadEnter";

    if (isEnterKey) {
      event.preventDefault();
      onEnter?.();
    }
  };

  useEffect(() => {
    if (!canActivateEnter) {
      return;
    }

    const handleWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      const isEnterKey =
        event.key === "Enter" || event.key === "Return" || event.code === "NumpadEnter";

      if (isEnterKey) {
        event.preventDefault();
        onEnter?.();
      }
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [canActivateEnter, onEnter]);

  return (
    <div
      aria-hidden={!visible}
      aria-label={canActivateEnter ? "Enter site" : undefined}
      className={cn(
        "fixed inset-0 z-[1000001] transition-opacity duration-700",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      onClick={handleActivateEnter}
      onKeyDown={handleLoaderKeyDown}
      role={canActivateEnter ? "button" : undefined}
      tabIndex={canActivateEnter ? 0 : -1}
      style={{ background: palette.background }}
    >
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div
              className="absolute inset-0"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 58%)"
                    : "radial-gradient(circle at center, rgba(28,24,16,0.06), transparent 58%)",
              }}
            />
          }
        >
          <SpiralAnimation
            mode={mode === "none" ? "auto" : mode}
            theme={theme}
            particleCount={mode === "intro" ? 1600 : 850}
            trailLength={mode === "intro" ? 72 : 46}
          />
        </Suspense>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="mb-8 text-center">
          <div
            className={cn(
              "transition-all duration-[1600ms] ease-out",
              ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-55"
            )}
          >
            {mode === "intro" ? (
              <button
                className={cn(
                  "mt-10 rounded-full px-8 py-3 uppercase tracking-[0.34em] transition-all duration-700",
                  showEnter
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                )}
                style={{
                  color: palette.text,
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.38)",
                  boxShadow:
                    theme === "dark"
                      ? "0 20px 60px rgba(0,0,0,0.35)"
                      : "0 20px 60px rgba(28,24,16,0.08)",
                }}
              >
                <span
                  className={cn(
                    "inline-block origin-center text-3xl font-thin transition-transform duration-[24000ms] ease-out",
                    enterScaleUp ? "scale-150" : "scale-[0.2]"
                  )}
                  style={{
                    fontWeight: 100,
                    fontFamily:
                      '"Helvetica Neue", "Avenir Next", "Segoe UI", Helvetica, Arial, sans-serif',
                    color: palette.muted,
                  }}
                >
                  Enter
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
