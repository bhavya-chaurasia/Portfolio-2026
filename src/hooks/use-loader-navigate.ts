import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
  type NavigateOptions,
  type To,
} from "react-router-dom";
import {
  useLoader,
  type RouteLoaderConfig,
} from "@/components/ui/loader-provider";

type RouteConfigResolver = (to: string) => RouteLoaderConfig;

export function useLoaderNavigate(resolveConfig?: RouteConfigResolver) {
  const location = useLocation();
  const navigate = useNavigate();
  const { prepareRoute } = useLoader();

  return useCallback(
    (to: To, options?: NavigateOptions, configOverride?: RouteLoaderConfig) => {
      const resolvedPath = typeof to === "string" ? to : `${to.pathname ?? ""}`;
      const config = configOverride ?? resolveConfig?.(resolvedPath);

      if (resolvedPath && resolvedPath !== location.pathname) {
        prepareRoute(resolvedPath, config);
      }

      navigate(to, options);
    },
    [location.pathname, navigate, prepareRoute, resolveConfig]
  );
}
