import { FC, useState } from "react";
import { THEMES } from "../constants/themes";

interface FooterProps {
  year?: number;
  dark?: boolean;
}

const Footer: FC<FooterProps> = ({ year = new Date().getFullYear(), dark = false }) => {
  const t = dark ? THEMES.dark : THEMES.light;
  const peerEmbedSrc = "https://tenor.com/embed/16493107";
  const [isPyaarHovered, setIsPyaarHovered] = useState(false);
  const [isPanicHovered, setIsPanicHovered] = useState(false);
  const [isPeerHovered, setIsPeerHovered] = useState(false);

  return (
    <>
      <style>{`
        .footer-link-item:hover,
        .footer-email-link:hover {
          color: var(--c-ink) !important;
        }
        @keyframes pyaar-wobble {
          0% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
          100% { transform: rotate(-6deg); }
        }
        @media (max-width: 900px) {
          .site-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

      <footer
        style={{
          ["--c-ink" as string]: t.ink,
          ["--c-ink2" as string]: t.ink2,
          ["--c-ink3" as string]: t.ink3,
          ["--c-border" as string]: t.border,
          ["--c-bg2" as string]: t.bg2,
          width: "100%",
          boxSizing: "border-box",
          borderTop: `1px solid ${t.border}`,
          padding: "72px 10vw 28px",
          background: t.bg,
        }}
      >
        <div
          className="site-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(16px, 1.35vw, 22px)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--c-ink)",
                margin: "0 0 20px",
                lineHeight: 1.2,
              }}
            >
              Bhavya Chaurasia
            </h3>
            <p
              style={{
                margin: 0,
                maxWidth: 260,
                color: "var(--c-ink2)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Product Designer crafting thoughtful AI experiences at the intersection
              of design and code.
            </p>
          </div>

          <div>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-ink3)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="https://in.linkedin.com/in/bhavya-chaurasia"
                target="_blank"
                rel="noreferrer"
                className="footer-link-item"
                style={{
                  color: "var(--c-ink2)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  transition: "color 0.2s",
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/bhavya-chaurasia"
                target="_blank"
                rel="noreferrer"
                className="footer-link-item"
                style={{
                  color: "var(--c-ink2)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  transition: "color 0.2s",
                }}
              >
                Behance
              </a>
              <a
                href="https://github.com/bhavya-chaurasia"
                target="_blank"
                rel="noreferrer"
                className="footer-link-item"
                style={{
                  color: "var(--c-ink2)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  transition: "color 0.2s",
                }}
              >
                GitHub
              </a>
            </div>
          </div>

          <div>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-ink3)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              Get in touch
            </p>
            <a
              href="mailto:contact@bhavyachaurasia.in"
              className="footer-email-link"
              style={{
                color: "var(--c-ink2)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.6,
                fontWeight: 400,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              Email me
            </a>
          </div>

          <div>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--c-ink3)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              Copyright
            </p>
            <p
              style={{
                margin: "0 0 10px",
                color: "var(--c-ink2)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              © {year} Bhavya Chaurasia
            </p>
            <p
              style={{
                margin: 0,
                color: "var(--c-ink3)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              made with{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span
                  onMouseEnter={() => setIsPyaarHovered(true)}
                  onMouseLeave={() => setIsPyaarHovered(false)}
                  style={{
                    cursor: "default",
                    color: t.ink,
                    fontWeight: 500,
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Pyaar
                </span>
                {isPyaarHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 180,
                      overflow: "hidden",
                      background: "transparent",
                      zIndex: 50,
                    }}
                  >
                    <img
                      title="Doodle Man Love Sticker"
                      src="https://media.tenor.com/hCwOyYmsR2kAAAAj/doodle-man-doodle.gif"
                      alt="Doodle Man Love sticker"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        animation: "pyaar-wobble 1.6s ease-in-out infinite",
                        transformOrigin: "50% 90%",
                      }}
                      loading="lazy"
                    />
                  </div>
                )}
              </span>
              ,{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span
                  onMouseEnter={() => setIsPanicHovered(true)}
                  onMouseLeave={() => setIsPanicHovered(false)}
                  style={{
                    cursor: "default",
                    color: t.ink,
                    fontWeight: 500,
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Panic
                </span>
                {isPanicHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-48%)",
                      width: 200,
                      overflow: "hidden",
                      background: "transparent",
                      zIndex: 50,
                    }}
                  >
                    <img
                      title="Panik Stonks Sticker"
                      src="https://media.tenor.com/RnWgI3gouI4AAAAj/panik-stonks.gif"
                      alt="Panik Stonks sticker"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </div>
                )}
              </span>{" "}
              and{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span
                  onMouseEnter={() => setIsPeerHovered(true)}
                  onMouseLeave={() => setIsPeerHovered(false)}
                  style={{
                    cursor: "default",
                    color: t.ink,
                    fontWeight: 500,
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Peer pressure
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translate(-50%, -100%)",
                    width: 220,
                    height: 124,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: t.bg2,
                    border: `1px solid ${t.border}`,
                    zIndex: 50,
                    opacity: isPeerHovered ? 1 : 0,
                    visibility: isPeerHovered ? "visible" : "hidden",
                    pointerEvents: isPeerHovered ? "auto" : "none",
                    transition: "opacity 120ms ease",
                  }}
                >
                  <iframe
                    title="Peer Pressure GIF"
                    src={peerEmbedSrc}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      display: "block",
                    }}
                    loading="eager"
                    allowFullScreen
                  />
                </div>
              </span>
              .
            </p>
          </div>
        </div>
      </footer>
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: dark ? "#ffffff" : "#0a0a0a",
          color: dark ? "#0a0a0a" : "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(8px, 0.8vw, 20px)",
          letterSpacing: "0.01em",
          lineHeight: 1.35,
          textAlign: "center",
          padding: "11px 24px",
        }}
      >
        You could have been anywhere on the internet, yet you're here. Thanks for
        visiting!
      </div>
    </>
  );
};

export default Footer;
