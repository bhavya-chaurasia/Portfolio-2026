import { useEffect, useRef } from "react";
import { useLoader } from "@/components/ui/loader-provider";

interface UsePageReadyOptions {
  delayMs?: number;
  waitFor?: Array<Promise<unknown> | (() => boolean)>;
}

function waitForCondition(predicate: () => boolean) {
  return new Promise<void>((resolve) => {
    const tick = () => {
      if (predicate()) {
        resolve();
        return;
      }

      window.requestAnimationFrame(tick);
    };

    tick();
  });
}

export function usePageReady(options?: UsePageReadyOptions) {
  const { markPageReady } = useLoader();
  const delayMs = options?.delayMs ?? 0;
  const waitForRef = useRef(options?.waitFor ?? []);
  waitForRef.current = options?.waitFor ?? [];

  useEffect(() => {
    let cancelled = false;

    const settle = async () => {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      if (delayMs > 0) {
        await new Promise<void>((resolve) => {
          window.setTimeout(() => resolve(), delayMs);
        });
      }

      for (const item of waitForRef.current) {
        if (cancelled) {
          return;
        }

        if (typeof item === "function") {
          await waitForCondition(item);
        } else {
          await item;
        }
      }

      if (!cancelled) {
        markPageReady();
      }
    };

    void settle();

    return () => {
      cancelled = true;
    };
  }, [delayMs, markPageReady]);
}
