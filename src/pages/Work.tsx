import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import marutiAnimation from "../components/Mobile-app-showcase2.json";
import msmeChatbotAnimation from "../components/Mobile-app-showcase3.json";
import { THEMES } from "../constants/themes";
import { project1Video } from "../constants/project1Images";

interface WorkPageProps {
  dark?: boolean;
}

const Work: FC<WorkPageProps> = ({ dark = false }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  const t = dark ? THEMES.dark : THEMES.light;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const projectCards = [
    {
      num: "01",
      tags: "UX DESIGN, AI, PRODUCT DESIGN",
      title: "Workflow Studio",
      desc: "Designing AI experiences that enable anyone to automate workflows.",
      link: "/project-1",
      img: project1Video,
      isVideo: true,
    },
    {
      num: "02",
      tags: "BUSINESS IMPACT, AI, UX DESIGN",
      title: "Maruti –⁠ Service Experience",
      desc: `Reimagining servicing through improving
transparency, cross-selling, and service adoption.`,
      link: "/project-2",
      img: "/src/assets/Frame1-maruti.svg",
      isVideo: false,
    },
    {
      num: "03",
      tags: "UX Design, AI, Government",
      title: "Marga - AI Conversational Chatbot for MSMEs",
      desc: "Dummy subtitle for now.",
      link: "/project-3",
      img: "/src/assets/Frame1-maruti.svg",
      isVideo: false,
    },
  ];

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
      <style>{`
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

      <section
        id="works"
        className="works-section"
        style={{ padding: "120px 10vw", position: "relative", zIndex: 2 }}
      >
        {/* NEW: Hero heading with subtext */}
        <div style={{ marginBottom: "100px" }}>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: t.ink,
              margin: "0 0 24px 0",
              lineHeight: 1.1,
            }}
          >
            Latest Shenanigans
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 300,
              color: t.ink2,
              margin: 0,
              maxWidth: "700px",
              lineHeight: 1.6,
            }}
          >
            A selection of design problems solved. From research to real-world impact, here's how I approach product design, accessibility, and user experience.
          </p>
        </div>

        {/* Project cards */}
        {projectCards.map((card, i) => (
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
              <a
                href={card.link}
                className="view-link"
                onClick={(e) => {
                  e.preventDefault();
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
                }}
              >
                View project <span style={{ fontSize: 16 }}>&rarr;</span>
              </a>
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

        {/* CTA Section */}
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

export default Work;
