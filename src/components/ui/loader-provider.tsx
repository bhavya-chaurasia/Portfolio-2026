import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LoaderMode = "intro" | "auto" | "none";
export type LoaderTheme = "light" | "dark";

export interface RouteLoaderConfig {
  loaderMode?: LoaderMode;
  loaderTheme?: LoaderTheme;
  minVisibleMs?: number;
}

export interface SiteLoaderState {
  visible: boolean;
  mode: LoaderMode;
  theme: LoaderTheme;
  showEnter: boolean;
  ready: boolean;
}

interface LoaderContextValue extends SiteLoaderState {
  activePath: string | null;
  showAuto: (path: string, config?: RouteLoaderConfig) => void;
  showIntro: (path: string, config?: RouteLoaderConfig) => void;
  ensureRouteLoader: (path: string, config?: RouteLoaderConfig) => void;
  prepareRoute: (path: string, config?: RouteLoaderConfig) => void;
  markPageReady: () => void;
  dismissIntro: () => void;
  preloadSpiral: () => Promise<unknown>;
  hasSeenIntro: () => boolean;
  hasSessionStarted: () => boolean;
  markSessionVisited: () => void;
}

const INTRO_SEEN_KEY = "site-loader:intro-seen";
const SESSION_STARTED_KEY = "site-loader:session-started";
const DEFAULT_MIN_VISIBLE_MS = 500;
const INTRO_REVEAL_MS = 1800;

const LoaderContext = createContext<LoaderContextValue | null>(null);

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteLoaderState>({
    visible: false,
    mode: "none",
    theme: "light",
    showEnter: false,
    ready: false,
  });

  const activePathRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);
  const openedAtRef = useRef(0);
  const minVisibleMsRef = useRef(DEFAULT_MIN_VISIBLE_MS);
  const modeRef = useRef<LoaderMode>("none");
  const introUnlockedRef = useRef(false);
  const prewarmPromiseRef = useRef<Promise<unknown> | null>(null);
  const revealTimerRef = useRef<number | null>(null);
  const dismissTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (dismissTimerRef.current !== null) {
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const preloadSpiral = useCallback(() => {
    if (!prewarmPromiseRef.current) {
      prewarmPromiseRef.current = import("./spiral-animation");
    }

    return prewarmPromiseRef.current;
  }, []);

  useEffect(() => {
    void preloadSpiral();
  }, [preloadSpiral]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    if (state.visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state.visible]);

  const hasSeenIntro = useCallback(() => {
    if (!canUseSessionStorage()) {
      return true;
    }

    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  }, []);

  const hasSessionStarted = useCallback(() => {
    if (!canUseSessionStorage()) {
      return true;
    }

    return window.sessionStorage.getItem(SESSION_STARTED_KEY) === "1";
  }, []);

  const markSessionVisited = useCallback(() => {
    if (!canUseSessionStorage()) {
      return;
    }

    window.sessionStorage.setItem(SESSION_STARTED_KEY, "1");
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  }, []);

  const startLoader = useCallback(
    (path: string, nextMode: LoaderMode, config?: RouteLoaderConfig) => {
      requestIdRef.current += 1;
      const requestId = requestIdRef.current;
      clearTimers();
      void preloadSpiral();

      activePathRef.current = path;
      modeRef.current = nextMode;
      introUnlockedRef.current = false;
      minVisibleMsRef.current =
        nextMode === "intro"
          ? Math.max(config?.minVisibleMs ?? DEFAULT_MIN_VISIBLE_MS, INTRO_REVEAL_MS)
          : config?.minVisibleMs ?? DEFAULT_MIN_VISIBLE_MS;
      openedAtRef.current =
        typeof performance !== "undefined" ? performance.now() : Date.now();

      setState({
        visible: true,
        mode: nextMode,
        theme: config?.loaderTheme ?? "light",
        showEnter: false,
        ready: false,
      });

      if (nextMode === "intro") {
        revealTimerRef.current = window.setTimeout(() => {
          if (requestIdRef.current !== requestId) {
            return;
          }

          introUnlockedRef.current = true;
          setState((current) =>
            current.mode === "intro" && current.ready
              ? { ...current, showEnter: true }
              : current
          );
        }, INTRO_REVEAL_MS);
      }
    },
    [clearTimers, preloadSpiral]
  );

  const showAuto = useCallback(
    (path: string, config?: RouteLoaderConfig) => {
      startLoader(path, "auto", config);
    },
    [startLoader]
  );

  const showIntro = useCallback(
    (path: string, config?: RouteLoaderConfig) => {
      startLoader(path, "intro", config);
    },
    [startLoader]
  );

  const ensureRouteLoader = useCallback(
    (path: string, config?: RouteLoaderConfig) => {
      if (state.visible && activePathRef.current === path) {
        setState((current) => ({
          ...current,
          theme: config?.loaderTheme ?? current.theme,
        }));
        return;
      }

      showAuto(path, config);
    },
    [showAuto, state.visible]
  );

  const prepareRoute = useCallback(
    (path: string, config?: RouteLoaderConfig) => {
      if (activePathRef.current === path && state.visible) {
        return;
      }

      showAuto(path, config);
    },
    [showAuto, state.visible]
  );

  const markPageReady = useCallback(() => {
    const currentRequestId = requestIdRef.current;
    const elapsed =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      openedAtRef.current;

    if (modeRef.current === "intro") {
      setState((current) => {
        if (current.mode !== "intro") {
          return current;
        }

        return {
          ...current,
          ready: true,
          showEnter: introUnlockedRef.current,
        };
      });
      return;
    }

    setState((current) => ({ ...current, ready: true }));

    dismissTimerRef.current = window.setTimeout(() => {
      if (requestIdRef.current !== currentRequestId) {
        return;
      }

      activePathRef.current = null;
      modeRef.current = "none";
      setState((current) => ({
        ...current,
        visible: false,
        mode: "none",
        showEnter: false,
      }));
    }, Math.max(0, minVisibleMsRef.current - elapsed));
  }, []);

  const dismissIntro = useCallback(() => {
    requestIdRef.current += 1;
    clearTimers();
    activePathRef.current = null;
    modeRef.current = "none";
    introUnlockedRef.current = false;

    if (canUseSessionStorage()) {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      window.sessionStorage.setItem(SESSION_STARTED_KEY, "1");
    }

    setState((current) => ({
      ...current,
      visible: false,
      mode: "none",
      ready: true,
      showEnter: false,
    }));
  }, [clearTimers]);

  const value = useMemo<LoaderContextValue>(
    () => ({
      ...state,
      activePath: activePathRef.current,
      showAuto,
      showIntro,
      ensureRouteLoader,
      prepareRoute,
      markPageReady,
      dismissIntro,
      preloadSpiral,
      hasSeenIntro,
      hasSessionStarted,
      markSessionVisited,
    }),
    [
      dismissIntro,
      ensureRouteLoader,
      hasSeenIntro,
      hasSessionStarted,
      markPageReady,
      markSessionVisited,
      preloadSpiral,
      prepareRoute,
      showAuto,
      showIntro,
      state,
    ]
  );

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
}
