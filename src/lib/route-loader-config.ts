import { type RouteLoaderConfig } from "@/components/ui/loader-provider";

export function getRouteLoaderConfig(
  pathname: string,
  isDarkTheme = false
): RouteLoaderConfig {
  const normalized = pathname.toLowerCase();

  if (normalized === "/project-2") {
    return {
      loaderMode: "auto",
      loaderTheme: "dark",
      minVisibleMs: 500,
    };
  }

  if (
    normalized === "/" ||
    normalized === "/about" ||
    normalized === "/work"
  ) {
    return {
      loaderMode: "auto",
      loaderTheme: isDarkTheme ? "dark" : "light",
      minVisibleMs: 500,
    };
  }

  return {
    loaderMode: "auto",
    loaderTheme: "light",
    minVisibleMs: 500,
  };
}
