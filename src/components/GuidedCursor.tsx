import { useEffect, useRef, FC } from "react";

const GuidedCursor: FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const entered = useRef(false);
  const isHeroActive = useRef(false);
  const pointerPos = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const tagPos = useRef({ x: 0, y: 0 });
  const tagTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const pointer = pointerRef.current;
    const tag = tagRef.current;
    if (!pointer || !tag) return;
    const pointerEl = pointer;
    const tagEl = tag;
    let rafId = 0;
    let lastFrameTime = 0;
    let activeTimelineMs = 0;
    let lastHoveredEl: Element | null = null;
    let useAutoHeroActivation = false;

    const CYCLE_MS = 20000;

    function getPointFromElement(el: Element | null, yOffset = -4) {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.bottom + yOffset,
      };
    }

    function getElementBySelectors(selectors: string[]) {
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) return el;
      }
      return null;
    }

    function getHiWordByText(match: string[]) {
      const words = Array.from(document.querySelectorAll(".hi-word"));
      return (
        words.find((el) => {
          const text = (el.textContent || "").toLowerCase().replace(/\s+/g, " ").trim();
          return match.some((m) => text.includes(m.toLowerCase()));
        }) || null
      );
    }

    function findHero() {
      return document.querySelector("#hero");
    }

    function moveTo(x: number, y: number) {
      pointerTarget.current = { x, y };
      tagTarget.current = { x: x + 18, y: y + 18 };

      if (!entered.current) {
        pointerPos.current = { x, y };
        tagPos.current = { x: x + 18, y: y + 18 };
        pointerEl.style.opacity = "1";
        tagEl.style.opacity = "1";
        entered.current = true;
      }
    }

    function hideCursor() {
      if (!entered.current) return;
      pointerEl.style.opacity = "0";
      tagEl.style.opacity = "0";
      entered.current = false;
    }

    function dispatchGuidedEvent(target: Element, type: "guidedcursorenter" | "guidedcursorleave", x: number, y: number) {
      target.dispatchEvent(
        new CustomEvent(type, {
          bubbles: true,
          detail: { x, y },
        })
      );
    }

    function clearGuidedInteraction(x: number, y: number) {
      if (!lastHoveredEl) return;
      const prevHoveredEl = lastHoveredEl;
      lastHoveredEl = null;
      dispatchGuidedEvent(prevHoveredEl, "guidedcursorleave", x, y);
    }

    function syncGuidedInteraction(x: number, y: number) {
      const hoveredNow = document.elementFromPoint(x, y);
      const hero = findHero();
      const hoveredInHero = hoveredNow && hero?.contains(hoveredNow) ? hoveredNow : null;

      if (hoveredInHero !== lastHoveredEl) {
        if (lastHoveredEl) {
          dispatchGuidedEvent(lastHoveredEl, "guidedcursorleave", x, y);
        }
        if (hoveredInHero) {
          dispatchGuidedEvent(hoveredInHero, "guidedcursorenter", x, y);
        }
        lastHoveredEl = hoveredInHero;
      }
    }

    function getSequenceTargets() {
      const hero = findHero();
      const foundingByGuide = document.querySelector('[data-guide="founding"]');
      const catmomByGuide = document.querySelector('[data-guide="catmom"]');
      const waveflowByGuide = document.querySelector('[data-guide="waveflow"]');
      const initialByGuide = getElementBySelectors([
        '[data-guide="product-designer"]',
        '[data-guide="product-designer-and-strategist"]',
        '[data-guide="intro"]',
        '[data-guide="founding"]',
      ]);
      const foundingByText = getHiWordByText(["founding designer"]);
      const catmomByText = getHiWordByText(["cat mom"]);
      const waveflowByText = getHiWordByText(["waveflowdb", "waveflow db"]);
      const initialByClass = document.querySelector(".hero-eyebrow");

      const foundingEl = foundingByGuide || foundingByText;
      const catmomEl = catmomByGuide || catmomByText;
      const waveflowEl = waveflowByGuide || waveflowByText;
      const initialEl = initialByGuide || initialByClass || foundingEl;

      const heroRect = hero?.getBoundingClientRect();
      const blankPoint = heroRect
        ? {
            x: heroRect.left + heroRect.width * 0.8,
            y: heroRect.top + heroRect.height * 0.45,
          }
        : { x: window.innerWidth * 0.75, y: window.innerHeight * 0.35 };

      return {
        hero,
        initial: getPointFromElement(initialEl) || blankPoint,
        founding: getPointFromElement(foundingEl) || blankPoint,
        catmom: getPointFromElement(catmomEl) || blankPoint,
        waveflow: getPointFromElement(waveflowEl) || blankPoint,
        blank: blankPoint,
      };
    }

    function frame(now: number) {
      if (!lastFrameTime) lastFrameTime = now;
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      const targets = getSequenceTargets();
      if (isHeroActive.current) {
        activeTimelineMs = (activeTimelineMs + delta) % CYCLE_MS;
        if (activeTimelineMs < 1400) {
          moveTo(targets.initial.x, targets.initial.y);
        } else if (activeTimelineMs < 3400) {
          moveTo(targets.founding.x, targets.founding.y);
        } else if (activeTimelineMs < 5000) {
          moveTo(targets.catmom.x, targets.catmom.y);
        } else if (activeTimelineMs < 6400) {
          moveTo(targets.waveflow.x, targets.waveflow.y);
        } else {
          moveTo(targets.blank.x, targets.blank.y);
        }
      } else {
        hideCursor();
      }

      const pointerEase = 0.11;
      const tagEase = 0.075;
      pointerPos.current.x += (pointerTarget.current.x - pointerPos.current.x) * pointerEase;
      pointerPos.current.y += (pointerTarget.current.y - pointerPos.current.y) * pointerEase;
      tagPos.current.x += (tagTarget.current.x - tagPos.current.x) * tagEase;
      tagPos.current.y += (tagTarget.current.y - tagPos.current.y) * tagEase;
      pointerEl.style.left = `${pointerPos.current.x}px`;
      pointerEl.style.top = `${pointerPos.current.y}px`;
      tagEl.style.left = `${tagPos.current.x}px`;
      tagEl.style.top = `${tagPos.current.y}px`;
      if (isHeroActive.current && entered.current) {
        syncGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
      } else {
        clearGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
      }

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const heroEl = findHero();
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    useAutoHeroActivation = mediaQuery.matches;

    const onHeroEnter = () => {
      activeTimelineMs = 0;
      isHeroActive.current = true;
    };
    const onHeroLeave = () => {
      isHeroActive.current = false;
      hideCursor();
      clearGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
    };
    const onHeroVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const heroEntry = entries[0];
      if (!heroEntry) return;
      if (heroEntry.isIntersecting && heroEntry.intersectionRatio >= 0.35) {
        if (!isHeroActive.current) {
          activeTimelineMs = 0;
        }
        isHeroActive.current = true;
        return;
      }
      isHeroActive.current = false;
      hideCursor();
      clearGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
    };
    const heroObserver = new IntersectionObserver(onHeroVisibilityChange, {
      threshold: [0, 0.35, 0.6],
    });
    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      useAutoHeroActivation = event.matches;
      if (!event.matches) {
        isHeroActive.current = false;
        hideCursor();
        clearGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
      } else if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;
        if (ratio >= 0.35) {
          activeTimelineMs = 0;
          isHeroActive.current = true;
        }
      }
    };

    if (useAutoHeroActivation) {
      if (heroEl) heroObserver.observe(heroEl);
      // Start immediately on mobile if hero is already visible on load.
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;
        if (ratio >= 0.35) {
          activeTimelineMs = 0;
          isHeroActive.current = true;
        }
      }
    } else {
      heroEl?.addEventListener("mouseenter", onHeroEnter);
      heroEl?.addEventListener("mouseleave", onHeroLeave);
    }
    mediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      cancelAnimationFrame(rafId);
      clearGuidedInteraction(pointerPos.current.x, pointerPos.current.y);
      mediaQuery.removeEventListener("change", onMediaQueryChange);
      heroObserver.disconnect();
      heroEl?.removeEventListener("mouseenter", onHeroEnter);
      heroEl?.removeEventListener("mouseleave", onHeroLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={pointerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          pointerEvents: "none",
          zIndex: 1000001,
          opacity: 0,
          transition: "opacity 0.2s ease",
          transform: "translate(-20%, -20%)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        >
          <path
            d="M4.5 4.5 L20 10.5 L12.5 12.5 L10.5 20 L4.5 4.5Z"
            fill="#FF7A00"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        ref={tagRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "#FF7A00",
          color: "#ffffff",
          padding: "6px 14px",
          borderRadius: "20px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          pointerEvents: "none",
          zIndex: 1000000,
          opacity: 0,
          transition: "opacity 0.2s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
      >
        You
      </div>
    </>
  );
};

export default GuidedCursor;
