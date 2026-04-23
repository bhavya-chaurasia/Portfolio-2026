import { FC } from "react";
import { THEMES } from "../constants/themes";
import DeepDiveSection from "../sections/about/DeepDiveSection";
import PageParticlesBackground from "../components/ui/page-particles-background";
import { usePageReady } from "@/hooks/use-page-ready";

interface AboutProps {
  t?: typeof THEMES.light;
}
const About: FC<AboutProps> = ({ t = THEMES.light }) => {
  const isDarkTheme = t === THEMES.dark;
  usePageReady({ delayMs: 180 });

  return (
    <div
      style={{
        background: isDarkTheme ? "#000000" : t.bg,
        color: t.ink,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        transition: "background 0.3s, color 0.3s",
        minHeight: "100vh",
        padding: "0 10vw 60px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <PageParticlesBackground dark={isDarkTheme} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <DeepDiveSection t={t} />

        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(24px, 3vw, 32px)",
            fontStyle: "italic",
            fontWeight: 400,
            marginBottom: 20,
            color: t.ink,
          }}
        >
          Experience
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: t.ink2,
            marginBottom: 32,
          }}
        >
          [Add your experience here]
        </p>
      </div>
    </div>
  );
};

export default About;
