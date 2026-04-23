import { FC, useEffect, useState } from "react";
import Lottie from "lottie-react";
import marutiAnimation from "@/components/Mobile-app-showcase2.json";
import msmeChatbotAnimation from "@/components/Mobile-app-showcase3.json";
import Cursor from "@/components/Cursor";
import GuidedCursor from "@/components/GuidedCursor";
import Hero from "@/components/Hero";
import FontLoader from "@/styles/FontLoader";
import { THEMES } from "@/constants/themes";
import { project1Video } from "@/constants/project1Images";
import { useLoaderNavigate } from "@/hooks/use-loader-navigate";
import { usePageReady } from "@/hooks/use-page-ready";
import { getRouteLoaderConfig } from "@/lib/route-loader-config";

interface HomeProps {
  dark: boolean;
}

const Home: FC<HomeProps> = ({ dark }) => {
  const t = dark ? THEMES.dark : THEMES.light;
  const navigate = useLoaderNavigate((to) => getRouteLoaderConfig(to, dark));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  usePageReady({ delayMs: 120 });

  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      style={{
        background: t.bg,
        color: t.ink,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        transition: "background 0.3s, color 0.3s",
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <FontLoader />

      <style>{`
        :root {
          --c-accent: ${t.accent};
          --c-ink: ${t.ink};
          --c-ink2: ${t.ink2};
          --c-ink3: ${t.ink3};
          --c-bg2: ${t.bg2};
          --c-btn: ${t.btn};
          --c-border: ${t.border};
        }
        .card-wrap .view-link {
          position: relative;
          padding-bottom: 4px;
        }
        .card-wrap .view-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: ${t.ink};
          transition: width 0.35s ease;
        }
        .card-wrap:hover .view-link::after {
          width: 100%;
        }
        @media (max-width: 900px) {
          .works-section {
            padding: 72px 24px !important;
          }
          .works-heading {
            margin-bottom: 40px !important;
          }
          .project-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 72px !important;
          }
          .project-card .card-media {
            order: 1;
          }
          .project-card .card-content {
            order: 2;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .project-card .card-desc {
            max-width: 100% !important;
            font-size: 16px !important;
          }
        }
      `}</style>

      <Cursor dark={dark} />
      <GuidedCursor />

      <Hero dark={dark} t={t} />

      <section
        id="works"
        className="works-section"
        style={{ padding: "120px 10vw", position: "relative", zIndex: 2 }}
      >
        <h2
          className="works-heading"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: t.ink,
            marginBottom: 72,
          }}
        >
          Latest Shenanigans
        </h2>

        {[
          {
            num: "01",
            tags: "UX DESIGN, AI, PRODUCT DESIGN",
            title: "Workflow Studio",
            desc: "Designing AI experiences that enable anyone to automate workflows",
            link: "/project-1",
            img: project1Video,
          },
          {
            num: "02",
            tags: "BUSINESS IMPACT, Agentic AI, UX DESIGN",
            title: "Maruti –⁠ Service Experience",
            desc: `Reimagining servicing through improving
transparency, cross-selling, and service adoption.`,
            link: "/project-2",
            img: "/src/assets/Frame1-maruti.svg",
          },
          {
            num: "03",
            tags: "UX Design, AI, Government",
            title: "Marga - AI Conversational Chatbot for MSMEs",
            desc: "Bridging the gap between citizens and systems with a seamless, intuitive digital journey",
            link: "/project-3",
            img: "/src/assets/Frame1-maruti.svg",
          },
        ].map((card, index) => (
          <div
            key={card.num}
            className="card-wrap project-card"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(card.link)}
            style={{
              display: "grid",
              gridTemplateColumns: index % 2 === 0 ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
              gap: 100,
              alignItems: "center",
              marginBottom: 140,
              cursor: "pointer",
            }}
          >
            {index % 2 === 0 && (
              <div
                className="card-media"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background: index === 0 ? "#f5ede4" : t.btn,
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {index === 0 ? (
                  <video
                    src={card.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : isMobileView || hoveredCard === index ? (
                  <Lottie
                    animationData={index === 2 ? msmeChatbotAnimation : marutiAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <img
                    src={index === 2 ? "/Project3/thumbnail.png" : "/Project2/thumbnail.png"}
                    alt={
                      index === 2
                        ? "Marga chatbot thumbnail"
                        : "Maruti service thumbnail"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </div>
            )}

            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ...(index % 2 !== 0
                  ? { alignItems: "flex-end", textAlign: "right" as const }
                  : {}),
              }}
            >
              <span
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(42px, 5vw, 64px)",
                  color: t.ink3,
                  fontWeight: 400,
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {card.num}
              </span>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: t.ink3,
                  marginBottom: 12,
                  fontWeight: 500,
                }}
              >
                {card.tags}
              </p>
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 400,
                  color: t.ink,
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </h3>
              <p
                className="card-desc"
                style={{
                  fontSize: 17,
                  color: t.ink2,
                  lineHeight: 1.6,
                  marginBottom: 28,
                  maxWidth: 380,
                  whiteSpace: "pre-line",
                }}
              >
                {card.desc}
              </p>
              <button
                type="button"
                className="view-link"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(card.link);
                }}
                style={{
                  fontSize: 14,
                  color: t.ink,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  width: "fit-content",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                View project <span style={{ fontSize: 16 }}>&rarr;</span>
              </button>
            </div>

            {index % 2 !== 0 && (
              <div
                className="card-media"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background: t.btn,
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isMobileView || hoveredCard === index ? (
                  <Lottie
                    animationData={index === 2 ? msmeChatbotAnimation : marutiAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <img
                    src={index === 2 ? "/Project3/thumbnail.png" : "/Project2/thumbnail.png"}
                    alt={
                      index === 2
                        ? "Marga chatbot thumbnail"
                        : "Maruti service thumbnail"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: 12,
            padding: "56px 0 48px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: "italic",
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 400,
              color: t.ink,
              marginBottom: 14,
              lineHeight: 1.3,
            }}
          >
            Lets talk
          </h3>
          <p
            style={{
              fontSize: 17,
              color: t.ink2,
              lineHeight: 1.6,
              maxWidth: 680,
              margin: "0 auto 28px",
            }}
          >
            Open to conversations about AI, design systems, and the intersection
            of design and code.
          </p>
          <a
            href="mailto:contact@bhavyachaurasia.in"
            style={{
              background: t.ink,
              color: t.bg,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "12px 28px",
              borderRadius: 40,
              border: "none",
              textDecoration: "none",
              display: "inline-block",
              transition: "background 0.2s, transform 0.2s",
              cursor: "pointer",
            }}
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
