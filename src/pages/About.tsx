import { FC } from "react";
import { THEMES } from "../constants/themes";
import DeepDiveSection from "../sections/about/DeepDiveSection";

interface AboutProps {
  t?: typeof THEMES.light;
}
// const About: FC<AboutProps> = ({ dark = false, t = THEMES.light }) => {
const About: FC<AboutProps> = ({ t = THEMES.light }) => {
  return (
    <div
      style={{
        background: t.bg,
        color: t.ink,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        transition: "background 0.3s, color 0.3s",
        minHeight: "100vh",
        padding: "0 10vw 60px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
