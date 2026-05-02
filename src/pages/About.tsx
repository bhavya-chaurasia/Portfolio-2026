import { FC, useState } from "react";
import { THEMES } from "../constants/themes";
import DeepDiveSection from "../sections/about/DeepDiveSection";
import PageParticlesBackground from "../components/ui/page-particles-background";
import { usePageReady } from "@/hooks/use-page-ready";
import Footer from "../components/Footer";

interface AboutProps {
  t?: typeof THEMES.light;
}
const About: FC<AboutProps> = ({ t = THEMES.light }) => {
  const isDarkTheme = t === THEMES.dark;
  const [showFooter, setShowFooter] = useState(false);
  usePageReady({ delayMs: 180 });

  return (
    <div
      style={{
        background: isDarkTheme ? "#000000" : t.bg,
        color: t.ink,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: isDarkTheme ? "#000000" : t.bg,
          color: t.ink,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          transition: "background 0.3s, color 0.3s",
          height: "100vh",
          padding: "0 10vw",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <PageParticlesBackground dark={isDarkTheme} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <DeepDiveSection
            t={t}
            onZoomCompleteChange={setShowFooter}
          />
        </div>
      </div>

      {showFooter && <Footer dark={isDarkTheme} />}
    </div>
  );
};

export default About;
