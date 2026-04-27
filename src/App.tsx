import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import {
  LoaderProvider,
  useLoader,
} from "@/components/ui/loader-provider";
import SiteLoader from "@/components/ui/site-loader";
import { THEMES } from "@/constants/themes";
import { getRouteLoaderConfig } from "@/lib/route-loader-config";
import Home from "@/pages/Home";

const Project1 = lazy(() => import("@/pages/project1"));
const Project2 = lazy(() => import("@/pages/Project2"));
const Project3 = lazy(() => import("@/pages/Project3"));
const Work = lazy(() => import("@/pages/Work"));
const About = lazy(() => import("@/pages/About"));

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

  const withSiteChrome = (
    content: ReactNode,
    backgroundColor?: string,
    showThemeToggle = false,
    themeOverride?: "dark" | "light",
    contentTopPadding = 60
  ) => {
    const isDarkTheme = themeOverride ? themeOverride === "dark" : dark;

    return (
      <div style={backgroundColor ? { backgroundColor, minHeight: "100vh" } : undefined}>
        <Navbar
          dark={dark}
          setDark={setDark}
          showThemeToggle={showThemeToggle}
          themeOverride={themeOverride}
        />
        <div style={{ paddingTop: contentTopPadding }}>{content}</div>
        <Footer dark={isDarkTheme} />
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
              {withSiteChrome(<Project2 />, undefined, false, "dark")}
            </Suspense>
          }
        />
        <Route
          path="/project-3"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project3 />, undefined, false)}
            </Suspense>
          }
        />
        <Route
          path="/Project-3"
          element={
            <Suspense fallback={null}>
              {withSiteChrome(<Project3 />, undefined, false)}
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
                0
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
