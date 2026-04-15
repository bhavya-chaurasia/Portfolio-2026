import { useState, FC, useEffect, ReactNode } from "react";
import Lottie from "lottie-react";
import marutiAnimation from "./components/Mobile-app-showcase2.json";
import msmeChatbotAnimation from "./components/Mobile-app-showcase3.json";
import { THEMES } from "./constants/themes";
import FontLoader from "./styles/FontLoader";
import Cursor from "./components/Cursor";
import GuidedCursor from "./components/GuidedCursor";
import Navbar from "./components/navbar";
import Hero from "./components/Hero.tsx";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Project1 from "./pages/project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import Work from "./pages/Work";
import About from "./pages/About";
import { Link } from "react-router-dom";
import { project1Video } from "./constants/project1Images";

/* â”€â”€ Gallery data */


/* â”€â”€ Main App  */
const App: FC = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );
  const t = dark ? THEMES.dark : THEMES.light;

  const withSiteChrome = (
    content: ReactNode,
    backgroundColor?: string,
    showThemeToggle: boolean = false,
    themeOverride?: "dark" | "light",
    contentTopPadding: number = 60
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
      <div style={{ paddingTop: contentTopPadding }}>
        {content}
      </div>
      <Footer dark={isDarkTheme} />
    </div>
  );
  };

  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // const iconLinkStyle: React.CSSProperties = {
  //   display: 'flex', alignItems: 'center', justifyContent: 'center',
  //   width: 36, height: 36, borderRadius: '50%',
  //   color: t.ink2, border: `1px solid ${t.border}`,
  //   transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
  //   textDecoration: 'none',
  // };

  return (
  <Routes>
    <Route
      path="/"
      element={withSiteChrome(
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
            @keyframes card1-swing {
              0%   { left: 25%; top: 35.2%; opacity: 0; transform: scale(1); }
              8%   { left: 25%; top: 35.2%; opacity: 1; transform: scale(1); }
              50%  { left: 30%; top: 37%;   opacity: 1; transform: scale(1.7); }
              82%  { left: 40%; top: 35%;   opacity: 1; transform: scale(2.3);   }
              90%  { left: 40%; top: 35%;   opacity: 0; transform: scale(2.5);   }
              91%  { left: 25%; top: 35.2%; opacity: 0; transform: scale(2.7); }
              100% { left: 25%; top: 35.2%; opacity: 0; transform: scale(3); }
            }
            .card1-float {
              position: absolute;
              width: 13%;
              height: auto;
              pointer-events: none;
              animation: card1-swing 5s ease-in-out infinite;
            }
            @keyframes brushReveal {
              0%   { clip-path: inset(0% 100% 0% 0%); opacity: 0; }
              8%   { clip-path: inset(0% 100% 0% 0%); opacity: 1; }
              55%  { clip-path: inset(0% 0%   0% 0%); opacity: 1; }
              70%  { clip-path: inset(0% 0%   0% 0%); opacity: 0; }
              100% { clip-path: inset(0% 0%   0% 0%); opacity: 0; }
            }
            .card1-brush {
              position: absolute;
              top: 30%;
              left: 30%;
              width: 40%;
              height: auto;
              pointer-events: none;
              animation: brushReveal 5s ease-in-out infinite;
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

          {/* WORKS */}
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

            {/* Project cards */}
            {[
              {
                num: "01",
                tags: "UX DESIGN, AI, PRODUCT DESIGN",
                title: "Workflow Studio",
                desc: "Designing AI experiences that enable anyone to automate workflows.",
                link: "/project-1",
                img: project1Video,
              },
              {
                num: "04",
                tags: "BUSINESS IMPACT, AI, UX DESIGN",
                title: "Maruti –⁠ Service Experience",
                desc: `Reimagining servicing through improving
transparency, cross-selling, and service adoption.`,
                link: "/project-2",
                img: "/src/assets/Frame1-maruti.svg",
              },
              {
                num: "05",
                tags: "UX Design, AI, Government",
                title: "Marga - AI Conversational Chatbot for MSMEs",
                desc: "Dummy subtitle for now.",
                link: "/project-3",
                img: "/src/assets/Frame1-maruti.svg",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="card-wrap project-card"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(card.link)}
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 === 0 ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
                  gap: 100,
                  alignItems: "center",
                  marginBottom: 140,
                  cursor: "pointer",
                }}
              >
                {/* Image */}
                {i % 2 === 0 && (
                  <div
                    className="card-media"
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      background: i === 0 ? "#f5ede4" : t.btn,
                      aspectRatio: "4/3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {i === 0 ? (
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
                    ) : (
                      isMobileView || hoveredCard === i ? (
                        <Lottie
                          animationData={i === 2 ? msmeChatbotAnimation : marutiAnimation}
                          loop
                          autoplay
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <img
                          src={i === 2 ? "/Project3/thumbnail.png" : "/Project2/thumbnail.png"}
                          alt={i === 2 ? "Marga chatbot thumbnail" : "Maruti service thumbnail"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      )
                    )}
                  </div>
                )}

                {/* Text */}
                <div className="card-content" style={{ display: "flex", flexDirection: "column", justifyContent: "center" , ...(i % 2 !== 0 ? { alignItems: "flex-end", textAlign: "right" as const } : {}) }}>
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
                  <Link
                    to={card.link}
                    className="view-link"
                    style={{
                      fontSize: 14,
                      color: t.ink,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      width: "fit-content",
                    }}
                  >
                    View project <span style={{ fontSize: 16 }}>&rarr;</span>
                  </Link>
                </div>

                {/* Image for odd rows (right side) */}
                {i % 2 !== 0 && (
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
                    {isMobileView || hoveredCard === i ? (
                      <Lottie
                        animationData={i === 2 ? msmeChatbotAnimation : marutiAnimation}
                        loop
                        autoplay
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <img
                        src={i === 2 ? "/Project3/thumbnail.png" : "/Project2/thumbnail.png"}
                        alt={i === 2 ? "Marga chatbot thumbnail" : "Maruti service thumbnail"}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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

        </div>,
        undefined,
        true,
        undefined,
        0
      )}
    />

    <Route path="/project-1" element={withSiteChrome(<Project1 />, undefined, false)} />
    <Route path="/project-2" element={withSiteChrome(<Project2 />, undefined, false, "dark")} />
    <Route path="/project-3" element={withSiteChrome(<Project3 />, undefined, false)} />
    <Route path="/Project-3" element={withSiteChrome(<Project3 />, undefined, false)} />
    <Route path="/about" element={withSiteChrome(<About dark={dark} t={t} />, undefined, true)} />
    <Route path="/work" element={withSiteChrome(<Work dark={dark} />, undefined, true)} />
  </Routes>
);
};

export default App;
