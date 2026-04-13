import { FC } from "react";
import { THEMES } from "../constants/themes";

interface AboutProps {
  dark?: boolean;
  t?: typeof THEMES.light;
}

const About: FC<AboutProps> = ({ dark = false, t = THEMES.light }) => {
  return (
    <div
      style={{
        background: t.bg,
        color: t.ink,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        transition: "background 0.3s, color 0.3s",
        minHeight: "100vh",
        padding: "60px 10vw",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontStyle: "italic",
            fontWeight: 400,
            marginBottom: 40,
            color: t.ink,
          }}
        >
          About Me
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: t.ink2,
            marginBottom: 32,
          }}
        >
          Welcome to my portfolio. I'm a designer and developer passionate about
          creating beautiful and functional digital experiences.
        </p>

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
          What I Do
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: t.ink2,
            marginBottom: 32,
          }}
        >
          I specialize in UX design, AI product design, and design systems.
          I love working on projects that solve real problems and create
          meaningful impact.
        </p>

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
