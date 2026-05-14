import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import {
  LoaderProvider,
  useLoader,
} from "@/components/ui/loader-provider";
import SiteLoader from "@/components/ui/site-loader";
import { THEMES } from "@/constants/themes";
import { PROJECT_2_UNLOCK_KEY } from "@/constants/project2Access";
import { getRouteLoaderConfig } from "@/lib/route-loader-config";
import Home from "@/pages/Home";
import FontLoader from "@/styles/FontLoader";

const Project1 = lazy(() => import("@/pages/project1"));
const Project2 = lazy(() => import("@/pages/Project2"));
const Project2Lock = lazy(() => import("@/pages/Project2Lock"));
const Project3 = lazy<FC<{ dark?: boolean }>>(() => import("@/pages/Project3"));
const Work = lazy(() => import("@/pages/Work"));
const About = lazy(() => import("@/pages/About"));

const ProtectedProject2: FC = () => {
  const isUnlocked =
    typeof window !== "undefined" &&
    sessionStorage.getItem(PROJECT_2_UNLOCK_KEY) === "true";

  if (!isUnlocked) {
    return <Navigate to="/project-2-lock" replace />;
  }

  return <Project2 />;
};

function AppRoutes() {
  const location = useLocation();
  const {
    dismissIntro,
    ensureRouteLoader,
    hasSeenIntro,
    hasSessionStarted,
    markSessionVisited,
    mode,
    preloadSpiral,
    ready,
    showAuto,
    showEnter,
    showIntro,
    theme,
    visible,
  } = useLoader();
  const previousPathRef = useRef<string | null>(null);
  const [dark, setDark] = useState(true);
  const navbarTheme =
    location.pathname === "/project-2" || location.pathname === "/project-2-lock"
      ? THEMES.dark
      : dark
        ? THEMES.dark
        : THEMES.light;

  const withSiteChrome = (
    content: ReactNode,
    backgroundColor?: string,
    showThemeToggle = false,
    themeOverride?: "dark" | "light",
    contentTopPadding = 60,
    showFooter = true
  ) => {
    const isDarkTheme = themeOverride ? themeOverride === "dark" : dark;
    const resolvedBackgroundColor =
      backgroundColor ?? (isDarkTheme ? THEMES.dark.bg : THEMES.light.bg);

    return (
      <div style={{ backgroundColor: resolvedBackgroundColor, minHeight: "100vh" }}>
        <Navbar
          dark={dark}
          setDark={setDark}
          showThemeToggle={showThemeToggle}
          themeOverride={themeOverride}
        />
        <div style={{ paddingTop: contentTopPadding }}>{content}</div>
        {showFooter && <Footer dark={isDarkTheme} />}
      </div>
    );
  };

  useEffect(() => {
    preloadSpiral().catch(() => undefined);
  }, [preloadSpiral]);

  useEffect(() => {
    const path = location.pathname;
    const routeConfig = getRouteLoaderConfig(path, dark);
    const isInitialRoute = previousPathRef.current === null;

    if (isInitialRoute) {
      const introEligible =
        path === "/" &&
        !hasSessionStarted() &&
        !hasSeenIntro();

      if (introEligible) {
        showIntro(path, routeConfig);
      } else {
        if (!hasSessionStarted()) {
          markSessionVisited();
        }
        showAuto(path, routeConfig);
      }
    } else if (previousPathRef.current !== path) {
      ensureRouteLoader(path, routeConfig);
    }

    previousPathRef.current = path;
  }, [
    dark,
    ensureRouteLoader,
    hasSeenIntro,
    hasSessionStarted,
    location.pathname,
    markSessionVisited,
    showAuto,
    showIntro,
  ]);

  return (
    <>
      <FontLoader />
      <style>{`
        :root {
          --c-accent: ${navbarTheme.accent};
          --c-ink: ${navbarTheme.ink};
          --c-ink2: ${navbarTheme.ink2};
          --c-ink3: ${navbarTheme.ink3};
          --c-bg2: ${navbarTheme.bg2};
          --c-btn: ${navbarTheme.btn};
          --c-border: ${navbarTheme.border};
        }
      `}</style>
      <Routes>
        <Route
          path="/"
          element={withSiteChrome(<Home dark={dark} />, undefined, true, undefined, 0)}
        />
        <Route
          path="/project-1"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project1 dark={dark} />, undefined, true)}
            </Suspense>
          }
        />
        <Route
          path="/project-2"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<ProtectedProject2 />, undefined, false, "dark")}
            </Suspense>
          }
        />
        <Route
          path="/project-2-lock"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project2Lock />, undefined, false, "dark", 60, false)}
            </Suspense>
          }
        />
        <Route
          path="/project-3"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project3 dark={dark} />, undefined, true)}
            </Suspense>
          }
        />
        <Route
          path="/Project-3"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project3 dark={dark} />, undefined, true)}
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(
                <About t={dark ? THEMES.dark : THEMES.light} />,
                undefined,
                true,
                undefined,
                0,
                false
              )}
            </Suspense>
          }
        />
        <Route
          path="/work"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Work dark={dark} />, undefined, true)}
            </Suspense>
          }
        />
      </Routes>

      <SiteLoader
        mode={mode}
        theme={theme}
        visible={visible}
        showEnter={showEnter}
        ready={ready}
        onEnter={dismissIntro}
      />
      <Cursor dark={dark} />
    </>
  );
}

const App: FC = () => {
  return (
    <LoaderProvider>
      <AppRoutes />
    </LoaderProvider>
  );
};

export default App;
