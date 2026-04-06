import { useEffect, useState, type MouseEvent } from "react";
import typographyImage from "../../public/Project3/typography.png";
import graphLineImage from "../../public/Project3/graph-line.png";
import colorPaletteImage from "../../public/Project3/color-pallete.png";
import "./Project3.css";

const contributions = [
  "UX Research",
  "User Personas",
  "Wireframes",
  "UI Design",
  "Conversation Design",
  "Accessibility",
  "Testing",
  "Documentation",
  "Demo Videos",
  "Team Management",
];

const roleStats = [
  { icon: "lead", label: "Project Lead" },
  { icon: "team", label: "Team of 6" },
  { icon: "timeline", label: "2 Weeks" },
  { icon: "award", label: "Top 20 Teams" },
  { icon: "credits", label: "$5K AWS Credits" },
];

const metadataItems = [
  { value: "Telangana & AP", label: "Region" },
  { value: "AI Chatbot", label: "Type" },
  { value: "UX + Product Lead", label: "Role" },
  { value: "2 Weeks", label: "Timeline" },
];

const scaleStats = [
  { number: "80+", label: "Central & State MSME Schemes" },
  { number: "63M+", label: "MSMEs Across India" },
  { number: "<20%", label: "Aware of Eligible Schemes" },
];

const painPoints = [
  { title: "Too Many Schemes", description: "Hard to find what applies to you" },
  { title: "Complex Forms", description: "Overwhelming, error-prone process" },
  { title: "No Status Updates", description: "Applications lost in silence" },
  { title: "Digital Barrier", description: "Built for urban, tech-savvy users" },
  { title: "Language Gap", description: "No Telugu or regional support" },
  { title: "Zero Guidance", description: "No step-by-step help anywhere" },
];

const hmwQuestions = [
  "Simplify scheme discovery without needing exact names?",
  "Make form filling feel like a conversation, not a task?",
  "Keep MSMEs informed at every application stage?",
  "Make the platform usable for someone who cannot read or write?",
];

const researchSources = [
  {
    type: "Report",
    title: "ISB × CII Telangana MSME Summit",
    description:
      "Annual report on MSME growth barriers, scheme awareness gaps, and rural adoption challenges across Telangana.",
    tag: "Ground Reality Data",
  },
  {
    type: "Challenge Brief",
    title: "Telangana AI Rising Grand Challenge",
    description:
      "Official problem statement by ITE&C, JICA and T-AIM. Defined the scope, scoring criteria, and expected outcomes for the GenAI chatbot solution.",
    tag: "Government Brief",
  },
  {
    type: "Design System",
    title: "UX4G Government Handbook + Figma Kit",
    description:
      "Official GoI UX guidelines for government apps. Defined color system, typography, walkthrough rules, accessibility standards, and navigation patterns.",
    tag: "Design Compliance",
  },
];

const userPersonas = [
  {
    number: "01",
    name: "Ravi",
    descriptor: "Rural · Telugu only · Limited literacy",
    need: "Needs voice, needs Telugu, needs zero complexity",
  },
  {
    number: "02",
    name: "Lakshmi",
    descriptor: "Semi-literate · Telugu + basic English",
    need: "Can read slowly, needs guided steps",
  },
  {
    number: "03",
    name: "Arjun",
    descriptor: "Visually impaired · Voice dependent",
    need: "Needs full voice I/O, no reliance on reading",
  },
  {
    number: "04",
    name: "Priya",
    descriptor: "Urban · English + Telugu · Tech comfortable",
    need: "Needs speed, personalization, efficiency",
  },
];

const keyInsights = [
  "Most MSMEs learn about schemes through word of mouth - not official channels.",
  "Form abandonment is highest when documents are requested mid-process.",
  "Rural users trust human-like interfaces more than dashboards or portals.",
  "Telugu-speaking users struggle to type in Telugu on digital keyboards.",
  "Application status silence is the biggest reason for distrust in government portals.",
];

// const scoringCriteria = [
//   { percentage: "30%", label: "Technical Execution" },
//   { percentage: "25%", label: "Solution Effectiveness" },
//   { percentage: "15%", label: "Innovation" },
//   { percentage: "15%", label: "User Experience" },
//   { percentage: "15%", label: "Scalability" },
// ];

const processStages = [
  {
    number: "01",
    name: "Empathize",
    position: "top-left",
    bullets: [
      "ISB & CII MSME Research",
      "UX4G Government Handbook",
      "Challenge Brief Analysis",
    ],
  },
  {
    number: "02",
    name: "Define",
    position: "top-right",
    bullets: [
      "User Personas",
      "Pain Point Mapping",
      "HMW Statements",
    ],
  },
  {
    number: "03",
    name: "Ideate",
    position: "right",
    bullets: [
      "Chatbot vs Website Decision",
      "Information Architecture",
      "Conversation Flow Design",
    ],
  },
  {
    number: "04",
    name: "Prototype",
    position: "bottom",
    bullets: [
      "Wireframes",
      "Hi-Fi UI (UX4G compliant)",
      "Marga Mascot & Naming",
    ],
  },
  {
    number: "05",
    name: "Test",
    position: "left",
    bullets: [
      "Continuous Iteration",
      "Team Testing Cycles",
      "Final Submission Polish",
    ],
  },
];

const timelineMilestones = [
  { days: "Day 1–2", label: "Research & Brief Analysis" },
  { days: "Day 3–4", label: "Wireframes & User Flows" },
  { days: "Day 5–8", label: "Hi-Fi UI Design + UX4G Compliance" },
  { days: "Day 9–11", label: "Development + Testing Cycles" },
  { days: "Day 12–14", label: "Final Polish + Submission" },
];

const chatbotDecisions = [
  {
    label: "Familiarity",
    text: "Most rural users have never used a web portal. But conversational interfaces like IRCTC's Disha are increasingly familiar - a chat feels like talking to someone, not navigating a system.",
  },
  {
    label: "Cognitive Load",
    text: "A website shows everything at once. A chatbot shows only what you need, exactly when you need it. For low-literacy users, this is the difference between completing a task and abandoning it.",
  },
  {
    label: "Guided by Default",
    text: "Every interaction in a chatbot is a guided step. Users never feel lost because the chatbot always asks the next question - removing the need to figure out what to do next.",
  },
  {
    label: "Voice-First Ready",
    text: "A chatbot interface naturally supports voice input and output. For users who cannot read or type in Telugu, voice is the only viable path in.",
  },
];

const ux4gCompliance = [
  { label: "Primary Color #3A2095", text: "Exact color from UX4G specification" },
  { label: "Noto Sans Typeface", text: "Official GoI typeface for citizen apps" },
  { label: "Walkthrough ≤ 4 screens", text: "UX4G handbook rule 29 - maintained" },
  { label: "Skip button included", text: "UX4G handbook rule 28 - implemented" },
  { label: "Logo top-left, menu top-right", text: "UX4G homepage layout standard" },
];

const accessibilityFeatures = [
  { label: "Voice to Text", text: "Speak your query, no typing needed" },
  { label: "Text to Voice", text: "Hear responses, no reading needed" },
  { label: "Telugu + English", text: "Switch languages with one tap" },
  { label: "Minimal UI", text: "Max 4–5 actions visible at any time" },
];

const Project3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isWhatIStudiedOpen, setIsWhatIStudiedOpen] = useState(false);
  const [processParallax, setProcessParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".feature-annotation-parallax-card")
    );

    if (!cards.length) return;

    let frame = 0;

    const updateParallax = () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        cards.forEach((card) => {
          card.style.transform = "translateY(0px)";
        });
        return;
      }

      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = cardCenter - viewportCenter;
        const speed = 0.1;
        const maxShift = 66;
        const shiftYRaw = -distanceFromCenter * speed;
        const shiftY = Math.max(-maxShift, Math.min(maxShift, shiftYRaw));
        card.style.transform = `translateY(${shiftY.toFixed(2)}px)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateParallax();
        frame = 0;
      });
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const glassCardBaseStyle = {
    position: "absolute" as const,
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(2px)",
    border: "1px solid rgba(255,255,255,0.85)",
    boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
    borderRadius: "10px",
    padding: "16px 20px",
    maxWidth: "240px",
    fontSize: "13px",
  };
  const glassCardBulletRowStyle = {
    color: "#666666",
    marginBottom: "6px",
    display: "grid",
    gridTemplateColumns: "10px 1fr",
    columnGap: "8px",
    alignItems: "start",
  };
  const glassCardBulletTextStyle = {
    fontSize: "16px",
  };
  const handleProcessParallax = (event: MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 900) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    setProcessParallax({
      x: normalizedX * 16,
      y: normalizedY * 16,
    });
  };
  const resetProcessParallax = () => {
    setProcessParallax({ x: 0, y: 0 });
  };
  const getProcessCardTransform = (baseTransform: string, strength: number) => {
    const parallaxX = processParallax.x * strength;
    const parallaxY = processParallax.y * strength;
    return `${baseTransform}${baseTransform ? " " : ""}translate(${parallaxX}px, ${parallaxY}px)`;
  };

  const renderRoleIcon = (icon: string) => {
    const iconProps = {
      width: 44,
      height: 44,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      "aria-hidden": true,
    };

    switch (icon) {
      case "lead":
        return (
          <svg {...iconProps}>
            <path d="M12 3l2.2 4.45 4.9.7-3.55 3.45.84 4.87L12 14.1l-4.39 2.37.84-4.87L4.9 8.15l4.9-.7L12 3z" />
          </svg>
        );
      case "team":
        return (
          <svg {...iconProps}>
            <circle cx="9" cy="9" r="3" />
            <circle cx="16.5" cy="10" r="2.5" />
            <path d="M3.5 19c.5-2.8 2.8-4.5 5.5-4.5s5 1.7 5.5 4.5" />
            <path d="M14 19c.4-1.9 1.9-3.2 3.8-3.4 1.7-.2 3.2.6 4 1.9" />
          </svg>
        );
      case "timeline":
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3.5 2" />
          </svg>
        );
      case "award":
        return (
          <svg {...iconProps}>
            <path d="M8 4h8v3a4 4 0 01-8 0V4z" />
            <path d="M10 14h4" />
            <path d="M12 7v7" />
            <path d="M8 20h8" />
            <path d="M6 5H4a2 2 0 002 3h2" />
            <path d="M18 5h2a2 2 0 01-2 3h-2" />
          </svg>
        );
      case "credits":
        return (
          <svg {...iconProps}>
            <ellipse cx="12" cy="8" rx="5.5" ry="2.5" />
            <path d="M6.5 8v5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V8" />
            <path d="M10.5 10.5h3" />
            <path d="M12 9v3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        color: "#131313",
        fontFamily: "'Courier New', monospace",
        lineHeight: 1.8,
        overflowX: "hidden",
      }}
    >
      <style>{`[style*="Courier New"] { font-size: 18px !important; }`}</style>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 48px 0",
        }}
      >
        {/* BLOCK 1 - What is Marga */}
        <section
          className="two-column-section two-column-section--hero"
          style={{
            display: "block",
            maxWidth: "900px",
            marginBottom: "100px",
          }}
        >
          <div>
            <div className="project-hero-tags">UX Design · AI · Product Design</div>
            <h1 className="project-hero-title">
              Marga
            </h1>
            <p className="project-hero-subtitle">
              Marga is a GenAI-powered chatbot built for MSME owners across Telangana and
              Andhra Pradesh. It helps them discover relevant government schemes, apply
              through a guided conversation, and track their application status - in Telugu
              or English, by voice or text.
            </p>
          </div>
        </section>

        {/* BLOCK 2 - Project Metadata Bar */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "24px 0",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
          }}
          className="metadata-bar"
        >
          {metadataItems.map((item) => (
            <div key={item.label}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#131313",
                  marginBottom: "4px",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#888888",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </section>

        {/* BLOCK 3 - Challenge */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Challenge
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Built for the ones the system forgot.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Over 80 government schemes exist for MSMEs. Yet most owners - especially in
              rural areas - never benefit. Not because they are ineligible, but because the
              system was never designed for them. No guidance. No language support. No
              transparency.
            </p>
          </div>
        </section>

        {/* BLOCK 4 - My Role */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "48px",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
          }}
          className="role-stats"
        >
          {roleStats.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                paddingRight: index < roleStats.length - 1 ? "24px" : 0,
                borderRight: index < roleStats.length - 1 ? "1px solid #E5E5E5" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: "52px",
                  color: "#2B318F",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {renderRoleIcon(stat.icon)}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#666666",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* BLOCK 5 - Contributions */}
        <section style={{ marginBottom: "100px" }}>
          <div className="section-eyebrow">
            My Contributions
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#666666",
              lineHeight: 1.8,
            }}
          >
            {contributions.map((item, index) => (
              <span key={item}>
                {item}
                {index < contributions.length - 1 && " · "}
              </span>
            ))}
          </div>
        </section>

        {/* PROBLEM STATEMENT SECTION */}

        {/* PROBLEM BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              The Problem
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Millions of
              <br />
              schemes. Almost
              <br />
              no one benefits.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Not because MSMEs are ineligible - but because the system was never built
              for them. No guidance. No language support. No way to know what they even
              qualify for.
            </p>
          </div>
        </section>

        {/* PROBLEM BLOCK 2 - Scale */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "48px 0",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            textAlign: "center",
          }}
          className="scale-stats"
        >
          {scaleStats.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                paddingLeft: index > 0 ? "24px" : 0,
                borderLeft: index > 0 ? "1px solid #E5E5E5" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "72px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "16px",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#666666",
                  maxWidth: "150px",
                  margin: "0 auto",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* PROBLEM BLOCK 3 - Pain Points */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Pain Points
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Why MSMEs fall
              <br />
              through the cracks.
            </h3>
          </div>

          <div className="pain-points-list">
            {painPoints.map((point, index) => (
              <div
                key={point.title}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "24px",
                  alignItems: "baseline",
                  borderBottom: index === painPoints.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#131313",
                  }}
                >
                  {point.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#666666",
                  }}
                >
                  {point.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM BLOCK 4 - HMW */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              How Might We
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              The questions that
              <br />
              drove every decision.
            </h3>
          </div>

          <div className="hmw-list">
            {hmwQuestions.map((question, index) => (
              <div
                key={question}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "16px",
                  alignItems: "baseline",
                  borderBottom: index === hmwQuestions.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#2B318F",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#131313",
                  }}
                >
                  {question}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM BLOCK 5 - Statement Band */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "60px 0",
            marginBottom: "100px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.5,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              MSMEs are not failing to grow because of lack of ambition.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#666666",
              }}
            >
              They are failing because the system built to support them was never
              designed with them in mind.
            </p>
          </div>
        </section>

        {/* RESEARCH & DISCOVERY SECTION */}

        {/* RESEARCH BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Research & Discovery
            </div>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Understanding the
              <br />
              people we were
              <br />
              designing for.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Before designing a single screen, I studied the MSME ecosystem through
              published research, government challenge documents, and a deep understanding
              of who our users actually were - not who we assumed them to be.
            </p>
          </div>
        </section>

        {/* RESEARCH BLOCK 2 - Research Sources */}
        <section
          style={{
            marginBottom: "100px",
            position: "relative",
          }}
        >
          <div className="section-eyebrow">
            <button
              type="button"
              onClick={() => setIsWhatIStudiedOpen((prev) => !prev)}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "inherit",
                font: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
              }}
              aria-expanded={isWhatIStudiedOpen}
              aria-controls="what-i-studied-cards"
            >
              <span>What I Studied</span>
              <span
                style={{
                  display: "inline-block",
                  transform: isWhatIStudiedOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {isWhatIStudiedOpen && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "-40px",
                  fontSize: "200px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  opacity: 0.04,
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  zIndex: 0,
                }}
              >
                RESEARCH
              </div>

              <div
                id="what-i-studied-cards"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  position: "relative",
                  zIndex: 1,
                }}
                className="research-cards"
              >
                {researchSources.map((source) => (
                  <div
                    key={source.title}
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 4px 24px rgba(43,49,143,0.06)",
                      borderRadius: "12px",
                      padding: "24px",
                      display: "grid",
                      gap: "16px",
                      gridTemplateRows: "auto 1fr auto",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#999999",
                        fontWeight: "bold",
                      }}
                    >
                      {source.type}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "0 0 12px 0",
                          color: "#131313",
                          fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        }}
                      >
                        {source.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          lineHeight: 1.6,
                          color: "#4a4a4a",
                        }}
                      >
                        {source.description}
                      </p>
                    </div>
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          background: "#EEEFFA",
                          color: "#2B318F",
                          borderRadius: "999px",
                          padding: "6px 12px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {source.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* RESEARCH BLOCK 3 - User Personas */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              User Personas
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Four real people.
              <br />
              One product for all.
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
            className="persona-grid"
          >
            {userPersonas.map((persona) => (
              <div
                key={persona.name}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 4px 24px rgba(43,49,143,0.06)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "grid",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    lineHeight: 1,
                  }}
                >
                  {persona.number}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0 0 4px 0",
                      color: "#131313",
                      fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    {persona.name}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    {persona.descriptor}
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#131313",
                    lineHeight: 1.5,
                  }}
                >
                  {persona.need}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH BLOCK 4 - Key Insights */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Key Insights
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              What the research
              <br />
              told us.
            </h3>
          </div>

          <div className="insights-list">
            {keyInsights.map((insight, index) => (
              <div
                key={insight}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",
                  gap: "16px",
                  alignItems: "baseline",
                  borderBottom: index === keyInsights.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#2B318F",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#131313",
                  }}
                >
                  {insight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH BLOCK 5 - Scoring Context */}
        {/* <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "60px 0",
            marginBottom: "100px",
            display: "grid",
            gap: "32px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            How We Were Evaluated
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
            }}
            className="scoring-grid"
          >
            {scoringCriteria.map((item, index) => (
              <div
                key={item.label}
                style={{
                  paddingRight: index < scoringCriteria.length - 1 ? "24px" : 0,
                  borderRight: index < scoringCriteria.length - 1 ? "1px solid #E5E5E5" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    marginBottom: "12px",
                  }}
                >
                  {item.percentage}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666666",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* UX PROCESS SECTION */}

        {/* PROCESS BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              UX Process
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              A process borrowed
              <br />
              from the government
              <br />
              itself.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Every design decision followed the UX Design Process outlined in the Government
              of India's UX4G Handbook - the same framework mandated for all citizen-facing
              government applications.
            </p>
          </div>
        </section>

        {/* PROCESS BLOCK 2 - Orbital Diagram */}
        <section
          style={{
            marginBottom: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "700px",
            position: "relative",
          }}
          className="orbital-section"
          onMouseMove={handleProcessParallax}
          onMouseLeave={resetProcessParallax}
        >
          {/* SVG Orbital Rings */}
          <svg
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              maxWidth: "800px",
              maxHeight: "700px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
            viewBox="0 0 800 700"
          >
            {/* Concentric dotted circles */}
            <circle cx="400" cy="350" r="120" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="5,5" opacity="0.6" />
            <circle cx="400" cy="350" r="240" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="5,5" opacity="0.6" />
            <circle cx="400" cy="350" r="380" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="5,5" opacity="0.6" />

            {/* Central gradient sphere */}
            <defs>
              <radialGradient id="sphereGradient">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>
            </defs>
            <circle cx="400" cy="350" r="40" fill="url(#sphereGradient)" opacity="0.9" />
            <circle cx="400" cy="350" r="40" fill="none" stroke="rgba(43,49,143,0.3)" strokeWidth="1" />

            {/* Dotted connector lines to cards */}
            <line x1="400" y1="350" x2="400" y2="50" stroke="#2B318F" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <line x1="400" y1="350" x2="650" y2="180" stroke="#2B318F" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <line x1="400" y1="350" x2="700" y2="420" stroke="#2B318F" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <line x1="400" y1="350" x2="400" y2="680" stroke="#2B318F" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <line x1="400" y1="350" x2="100" y2="420" stroke="#2B318F" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
          </svg>

          {/* Stage Labels (Large Typography) */}
          <div style={{ position: "absolute", width: "100%", height: "100%", maxWidth: "800px" }}>
            <div
              style={{
                position: "absolute",
                top: "-8%",
                left: "5%",
                fontSize: "56px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#2B318F" }}>01</span>{" "}
              <span style={{ color: "#131313" }}>Empathize</span>
            </div>

            <div
              style={{
                position: "absolute",
                top: "4%",
                right: "-4%",
                fontSize: "56px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#2B318F" }}>02</span>{" "}
              <span style={{ color: "#131313" }}>Define</span>
            </div>

            <div
              style={{
                position: "absolute",
                top: "40%",
                right: "-20%",
                fontSize: "56px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#2B318F" }}>03</span>{" "}
              <span style={{ color: "#131313" }}>Ideate</span>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "56px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#2B318F" }}>04</span>{" "}
              <span style={{ color: "#131313" }}>Prototype</span>
            </div>

            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "2%",
                fontSize: "56px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#2B318F" }}>05</span>{" "}
              <span style={{ color: "#131313" }}>Test</span>
            </div>
          </div>

          {/* Glass Cards */}
          <div style={{ position: "absolute", width: "100%", height: "100%", maxWidth: "800px", zIndex: 2 }}>
            {/* Card 1 - Empathize */}
            <div
              style={{
                ...glassCardBaseStyle,
                top: "0%",
                left: "50%",
                transform: getProcessCardTransform("translateX(-50%)", 1.2),
                transition: "transform 0.25s ease-out",
                willChange: "transform",
              }}
            >
              <div style={{ top: "-16%", left: "-8%", fontWeight: "bold", marginBottom: "10px", color: "#131313" }}>
                01 Empathize
              </div>
              {processStages[0].bullets.map((bullet) => (
                <div key={bullet} style={glassCardBulletRowStyle}>
                  <span aria-hidden="true">•</span>
                  <span style={glassCardBulletTextStyle}>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Card 2 - Define */}
            <div
              style={{
                ...glassCardBaseStyle,
                top: "12%",
                right: "-8%",
                transform: getProcessCardTransform("", 0.9),
                transition: "transform 0.25s ease-out",
                willChange: "transform",
              }}
            >
              <div style={{fontWeight: "bold", marginBottom: "10px", color: "#131313"}}>
                02 Define
              </div>
              {processStages[1].bullets.map((bullet) => (
                <div key={bullet} style={glassCardBulletRowStyle}>
                  <span aria-hidden="true">•</span>
                  <span style={glassCardBulletTextStyle}>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Card 3 - Ideate */}
            <div
              style={{
                ...glassCardBaseStyle,
                top: "46%",
                right: "-14%",
                transform: getProcessCardTransform("", 1.05),
                transition: "transform 0.25s ease-out",
                willChange: "transform",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "10px", color: "#131313" }}>
                03 Ideate
              </div>
              {processStages[2].bullets.map((bullet) => (
                <div key={bullet} style={glassCardBulletRowStyle}>
                  <span aria-hidden="true">•</span>
                  <span style={glassCardBulletTextStyle}>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Card 4 - Prototype */}
            <div
              style={{
                ...glassCardBaseStyle,
                bottom: "-12%",
                left: "50%",
                transform: getProcessCardTransform("translateX(-50%)", 1.15),
                transition: "transform 0.25s ease-out",
                willChange: "transform",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "10px", color: "#131313" }}>
                04 Prototype
              </div>
              {processStages[3].bullets.map((bullet) => (
                <div key={bullet} style={glassCardBulletRowStyle}>
                  <span aria-hidden="true">•</span>
                  <span style={glassCardBulletTextStyle}>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Card 5 - Test */}
            <div
              style={{
                ...glassCardBaseStyle,
                top: "44%",
                left: "-12%",
                transform: getProcessCardTransform("", 0.85),
                transition: "transform 0.25s ease-out",
                willChange: "transform",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "10px", color: "#131313" }}>
                05 Test
              </div>
              {processStages[4].bullets.map((bullet) => (
                <div key={bullet} style={glassCardBulletRowStyle}>
                  <span aria-hidden="true">•</span>
                  <span style={glassCardBulletTextStyle}>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS BLOCK 3 - UX4G Compliance */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "60px 0",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
            <div className="section-eyebrow">
              Why This Process
            </div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Designed by the
              <br />
              government. For the
              <br />
              government.
            </h3>
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              The UX4G Design System is the official GoI framework for citizen-facing digital
              products. By following it precisely - color system, typography, walkthrough rules,
              accessibility - we ensured Marga met government UX standards and scored full marks
              on the UX evaluation criteria.
            </p>
          </div>
        </section>

        {/* PROCESS BLOCK 4 - Timeline */}
        <section style={{ marginBottom: "100px" }}>
          <div className="section-eyebrow">
            How 2 Weeks Actually Looked
          </div>

          <div style={{ position: "relative", paddingTop: "20px", paddingBottom: "20px" }}>
            {/* Timeline line */}
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "0",
                right: "0",
                height: "1px",
                backgroundColor: "#131313",
                zIndex: 0,
              }}
            />

            {/* Graph line overlay */}
            <img
              src={graphLineImage}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "110px",
                top: "0px",
                width: "920.5px",
                height: "auto",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />


            {/* Milestone dots and labels */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "0",
                position: "relative",
                zIndex: 1,
              }}
              className="timeline-grid"
            >
              {timelineMilestones.map((milestone, index) => (
                <div key={milestone.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {/* Dot */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#2B318F",
                      marginBottom: index % 2 === 0 ? "40px" : "0",
                      marginTop: index % 2 === 0 ? "0" : "40px",
                    }}
                  />

                  {/* Label */}
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#131313",
                      marginTop: index % 2 === 0 ? "8px" : "0",
                      marginBottom: index % 2 === 0 ? "0" : "8px",
                      textAlign: "center",
                    }}
                  >
                    {milestone.days}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999999",
                      maxWidth: "120px",
                      textAlign: "center",
                      lineHeight: 1.4,
                    }}
                  >
                    {milestone.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN DECISIONS SECTION */}

        {/* DECISIONS BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Design Decisions
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Every decision had
              <br />
              a reason behind it.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Nothing in Marga was designed by default. From the name to the color, from
              the mascot to the mic button - every choice was made deliberately, for a
              specific user need.
            </p>
          </div>
        </section>

        {/* DECISIONS BLOCK 2 - Chatbot vs Website */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "60px",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "48px",
            alignItems: "start",
            position: "relative",
          }}
        >
          {/* Decorative "WHY" text */}
          <div
            style={{
              position: "absolute",
              fontSize: "800px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-150px",
              left: "-100px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
            }}
          >
            WHY
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="section-eyebrow">
              Decision 01
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Why a chatbot
              <br />
              and not a website?
            </h3>
          </div>

          <div style={{ display: "grid", gap: "12px", position: "relative", zIndex: 1 }}>
            {chatbotDecisions.map((decision) => (
              <div
                key={decision.label}
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    marginBottom: "8px",
                  }}
                >
                  {decision.label}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#4a4a4a",
                  }}
                >
                  {decision.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DECISIONS BLOCK 3 - Naming & Mascot */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Decision 02
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Why Marga.
              <br />
              Why a person, not a bot.
            </h3>
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              Marga - मार्ग - means path in Sanskrit and Telugu. A guide who walks with
              you, not a portal that processes you.
            </p>
            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              The mascot was deliberately designed as a relatable human figure - not a
              robot, not an abstract AI icon. Rural users needed to feel like someone was
              helping them, not something.
            </div>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src="/Project3/marga.png"
                alt="Marga Mascot"
                style={{ maxWidth: "48%", height: "auto", display: "block", margin: "0 auto" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="/Project3/onboarding.png"
                alt="Sign-in Screen with Marga"
                style={{ maxWidth: "48%", height: "auto", display: "block", margin: "0 auto" }}
              />
            </div>
          </div>
        </section>

        {/* DECISIONS BLOCK 4 - UX4G Compliance */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Decision 03
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Designed within
              <br />
              the government's
              <br />
              own rules.
            </h3>
          </div>

          <div>
            {ux4gCompliance.map((item, index) => (
              <div
                key={item.label}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "24px",
                  alignItems: "baseline",
                  borderBottom: index === ux4gCompliance.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#131313",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#666666",
                  }}
                >
                  · {item.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DECISIONS BLOCK 5 - Typography & Color */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "60px",
            marginBottom: "100px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "600px",
          }}
          className="design-showcase"
        >
          <img
            src={typographyImage}
            alt="Typography & Color Palette"
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              display: "block",
              zIndex: 1,
            }}
          />
          <img
            src={colorPaletteImage}
            alt="Color Palette"
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              display: "block",
              zIndex: 2,
            }}
          />
        </section>

        {/* DECISIONS BLOCK 6 - Accessibility */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Decision 04
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Accessible by design.
              <br />
              Not as an afterthought.
            </h3>
          </div>

          <div>
            {accessibilityFeatures.map((feature, index) => (
              <div
                key={feature.label}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "24px",
                  alignItems: "baseline",
                  borderBottom: index === accessibilityFeatures.length - 1 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#131313",
                    whiteSpace: "nowrap",
                  }}
                >
                  {feature.label}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#666666",
                  }}
                >
                  · {feature.text}
                </div>
              </div>
            ))}

            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
                marginTop: "24px",
              }}
            >
              Designed for someone who is blind, cannot type in Telugu, or has never used
              a smartphone before - and still able to complete a full scheme application
              end to end.
            </div>
          </div>
        </section>

        {/* KEY FEATURES WALKTHROUGH SECTION */}

        {/* FEATURES BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Features
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Four problems.
              <br />
              Four solutions.
              <br />
              One product.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Marga was built around the four biggest barriers MSMEs face - discovery, application,
              tracking, and access. Each feature was designed to remove one barrier entirely.
            </p>
          </div>
        </section>

        {/* FEATURE 01 - Onboarding Walkthrough */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "80px",
            paddingBottom: "80px",
            marginBottom: "100px",
            minHeight: "500px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="feature-block"
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "700px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-200px",
              left: "-150px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            GUIDE
          </div>

          {/* Left Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "16px",
              }}
            >
              01
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              First time on Marga?
              <br />
              We walk you through everything.
            </h3>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#131313",
                margin: "0 0 24px 0",
              }}
            >
              A 4-step onboarding tour introduces every key feature - recommended queries,
              the menu, notifications, and language toggle. Users can skip anytime. Built
              exactly to UX4G handbook rule 28 and 29.
            </p>
            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              Skip button always visible - respecting user autonomy per UX4G reactance
              principle.
            </div>
          </div>

          {/* Right Video Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "280px",
                height: "fit-content",
                background: "#131313",
                borderRadius: "16px",
                border: "1px solid #E5E5E5",
                overflow: "hidden",
                position: "relative",
                lineHeight: 0,
              }}
            >
              <video
                src="/Project3/Onboarding.mp4"
                style={{
                  width: "360px",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>

            {/* Annotation cards */}
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "10%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Onboarding Steps
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                UX4G rule - short, purposeful, skippable
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                bottom: "15%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Next + Skip
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Always both options visible to user
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 02 - Conversational Form Filling (FLIPPED) */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "80px",
            paddingBottom: "80px",
            marginBottom: "100px",
            minHeight: "500px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="feature-block feature-flipped"
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "700px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-200px",
              right: "-150px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            APPLY
          </div>

          {/* Left Video Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "276px",
                height: "fit-content",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #E5E5E5",
                background: "#131313",
                lineHeight: 0,
              }}
            >
              <video
                src="/Project3/form-filling.mp4"
                style={{
                  width: "280px",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>

            {/* Annotation cards */}
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "20%",
                left: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                One Question at a Time
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Reduces overwhelm, guides step by step
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "60%",
                left: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Auto-format
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Converts input to required format - caps, numbers, dates
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                bottom: "-9%",
                left: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Print & Submit
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Download, print, or submit directly
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "16px",
              }}
            >
              02
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Apply for a scheme
              <br />
              like a conversation.
            </h3>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#131313",
                margin: "0 0 24px 0",
              }}
            >
              No more staring at a blank form. Marga asks one question at a time - your Aadhaar,
              your license number, your photo. It validates, formats, and auto-fills the form
              for you. You just answer. Marga does the rest.
            </p>
            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              Chatbot checks eligibility before form filling begins - so users never waste time
              on a scheme they don't qualify for.
            </div>
          </div>
        </section>

        {/* FEATURE 03 - Application Status */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "80px",
            paddingBottom: "80px",
            marginBottom: "100px",
            minHeight: "500px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="feature-block"
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "700px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-200px",
              left: "-150px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            TRACK
          </div>

          {/* Left Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "16px",
              }}
            >
              03
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Never lose track of
              <br />
              where your application stands.
            </h3>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#131313",
                margin: "0 0 24px 0",
              }}
            >
              Most MSME applications disappear into silence after submission. Marga shows
              real-time status across 4 stages - and notifies users proactively so they
              always know what is happening and why.
            </p>
            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              Applications are categorized as Successful, Incomplete, or Reverted - with a
              reason shown for each.
            </div>
          </div>

          {/* Right Video Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "280px",
                height: "fit-content",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E5E5E5",
                background: "#131313",
                lineHeight: 0,
              }}
            >
              <video
                src="/Project3/Status-Nots.mov"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>

            {/* Annotation cards */}
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "15%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                4-Stage Progress
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Submitted → Verified → Review → Disbursement
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                bottom: "20%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Notification Bell
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Proactive updates so nothing gets forgotten
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 04 - Scheme Discovery (FLIPPED) */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "80px",
            paddingBottom: "80px",
            marginBottom: "100px",
            minHeight: "500px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="feature-block feature-flipped"
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "700px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-200px",
              right: "-150px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            DISCOVER
          </div>

          {/* Left Video Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "3/4",
                borderRadius: "16px",
                border: "1px solid #E5E5E5",
                background: "#131313",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                lineHeight: 0,
              }}
            >
              <video
                src="/Project3/Search.mp4"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>

            {/* Annotation cards */}
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "20%",
                left: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Semantic Search
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Finds schemes by context, not exact name
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                bottom: "20%",
                left: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Ranked Results
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Best match shown first, good match, close match below
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "16px",
              }}
            >
              04
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Find the right scheme.
              <br />
              Without knowing its name.
            </h3>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#131313",
                margin: "0 0 24px 0",
              }}
            >
              Type anything - a category, a need, a single word like 'food' or 'loan' - and
              Marga's vector database retrieves the closest matching schemes using semantic
              search, not keyword matching.
            </p>
            <div
              style={{
                borderLeft: "2px solid #2B318F",
                background: "#EEEFFA",
                padding: "16px 20px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a4a4a",
              }}
            >
              Powered by WaveflowDB - a next-gen vector database built by AgentAnalytics.AI
            </div>
          </div>
        </section>

        {/* FEATURE 05 - Accessibility & Voice */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            paddingTop: "80px",
            paddingBottom: "80px",
            marginBottom: "100px",
            minHeight: "500px",
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            overflow: "hidden",
          }}
          className="feature-block"
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "700px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-200px",
              left: "-150px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            }}
          >
            ACCESS
          </div>

          {/* Left Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "16px",
              }}
            >
              05
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 24px 0",
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Built for the ones
              <br />
              who need it most.
            </h3>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#131313",
                margin: "0 0 24px 0",
              }}
            >
              Marga works for users who are blind, deaf, unable to read Telugu, or who have
              never used a smartphone. Voice input, voice output, bilingual toggle - accessibility
              is not a feature. It is the foundation.
            </p>
          </div>

          {/* Right Video Card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "3/4",
                borderRadius: "16px",
                border: "1px solid #E5E5E5",
                background: "#131313",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                lineHeight: 0,
              }}
            >
              <video
                src="/Project3/v2t.mp4"
                style={{
                  width: "340px",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>

            {/* Annotation cards */}
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "5%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Voice to Text
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Speak your query - no typing needed
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                top: "40%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Text to Voice
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Hear responses - no reading needed
              </div>
            </div>
            <div
              className="feature-annotation-parallax-card"
              style={{
                position: "absolute",
                bottom: "10%",
                right: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#2B318F", marginBottom: "4px" }}>
                Language Toggle
              </div>
              <div style={{ color: "#666666", lineHeight: 1.4 }}>
                Switch between Telugu and English instantly
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES END - Summary Strip */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
            marginBottom: "100px",
          }}
          className="features-summary"
        >
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              borderRight: "1px solid #E5E5E5",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "8px",
              }}
            >
              5
            </div>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Core Features
            </div>
          </div>

          <div
            style={{
              padding: "32px",
              textAlign: "center",
              borderRight: "1px solid #E5E5E5",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "8px",
              }}
            >
              4
            </div>
            <div
              style={{
                fontSize: "12px",
                fontFamily: "'Courier New', monospace",
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              User Personas
            </div>
          </div>

          <div
            style={{
              padding: "32px",
              textAlign: "center",
              borderRight: "1px solid #E5E5E5",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "8px",
              }}
            >
              2
            </div>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Languages
            </div>
          </div>

          <div
            style={{
              padding: "32px",
              textAlign: "center",
              borderRight: "1px solid #E5E5E5",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "8px",
              }}
            >
              Voice + Text
            </div>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Input Modes
            </div>
          </div>

          <div
            style={{
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2B318F",
                marginBottom: "8px",
              }}
            >
              Web + Mobile
            </div>
            <div
              style={{
                fontSize: "20px",
                fontFamily: "'Courier New', monospace",
                color: "#999999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Platforms
            </div>
          </div>
        </section>
      </div>

      {/* ACCESSIBILITY & INCLUSION SECTION */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* ACCESSIBILITY BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Accessibility & Inclusion
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Designed for the
              <br />
              person who needs it
              <br />
              most. Not the average.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              The easiest user to design for is someone like the designer. We deliberately
              chose the hardest user - someone who is rural, low-literacy, possibly disabled,
              and has never used a smartphone - and made sure Marga worked for them first.
            </p>
          </div>
        </section>

        {/* ACCESSIBILITY BLOCK 2 - The accessibility spectrum */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            backgroundColor: "#FFFFFF",
            padding: "60px",
            marginBottom: "100px",
            position: "relative",
          }}
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "800px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-150px",
              left: "-100px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
            }}
          >
            INCLUSIVE
          </div>

          <h3
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "0 0 48px 0",
              color: "#131313",
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              position: "relative",
              zIndex: 1,
            }}
          >
            One product. Every kind of user.
          </h3>

          {/* Accessibility persona cards */}
          <div
            className="accessibility-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Card 1 - Cannot Read or Write */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                }}
              >
                01
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#131313",
                  marginBottom: "12px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                Voice-Only User
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Speaks Telugu fluently. Cannot read or type on a digital device.
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "8px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                How Marga Helps
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                Voice to text input. Text to voice responses. Full journey via audio only.
              </div>
            </div>

            {/* Card 2 - Visually Impaired */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                }}
              >
                02
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#131313",
                  marginBottom: "12px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                Visually Impaired User
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Cannot see the screen. Relies entirely on audio feedback.
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "8px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                How Marga Helps
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                Voice output for all responses. Voice input for all queries. No visual
                dependency required.
              </div>
            </div>

            {/* Card 3 - Language Barrier */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                }}
              >
                03
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#131313",
                  marginBottom: "12px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                Telugu-Only User
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Understands Telugu only. Cannot read English interface labels.
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "8px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                How Marga Helps
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                One-tap language toggle. Full UI and responses switch to Telugu instantly.
              </div>
            </div>

            {/* Card 4 - Low Tech Literacy */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                }}
              >
                04
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#131313",
                  marginBottom: "12px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                First-Time Smartphone User
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Has never navigated a digital app before. Any complexity causes dropout.
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "8px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                How Marga Helps
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                }}
              >
                4-step onboarding walkthrough. Max 5 actions visible at once. Chatbot guides
                every next step.
              </div>
            </div>
          </div>
        </section>

        {/* ACCESSIBILITY BLOCK 3 - Accessibility features list */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              What We Built
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Accessibility is not
              <br />
              a checklist. It is
              <br />
              a design principle.
            </h3>
          </div>

          <div style={{ display: "grid", gap: "0" }}>
            {[
              {
                label: "Voice to Text Input",
                description: "Speak queries in Telugu or English",
              },
              {
                label: "Text to Voice Output",
                description: "Hear all chatbot responses aloud",
              },
              {
                label: "Bilingual Toggle",
                description: "Switch Telugu ↔ English in one tap",
              },
              {
                label: "4-Step Onboarding",
                description: "Guided intro for first-time users",
              },
              {
                label: "Minimal Landing Screen",
                description: "Max 5 actions to avoid overwhelm",
              },
              {
                label: "Skip Button Always Visible",
                description: "User always in control per UX4G",
              },
            ].map((item, index) => (
              <div
                key={item.label}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.5fr",
                  gap: "24px",
                  borderBottom:
                    index === 5 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#131313",
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Courier New', monospace",
                    color: "#999999",
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACCESSIBILITY BLOCK 4 - The hardest user test */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "72px",
            marginBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
            <div className="section-eyebrow">
              Our Design Test
            </div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.4,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Could someone who is blind, illiterate, and rural complete a full scheme
              application?
            </h3>
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
              fontFamily: "'Courier New', monospace",
            }}
          >
            <p style={{ margin: "0 0 16px 0" }}>
              This was the question we kept asking throughout the design process. Not 'is
              this usable?' but 'is this usable for the hardest case?'
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              Voice input handles the query. Voice output handles the response. The chatbot
              handles the form.
            </p>
            <p style={{ margin: 0 }}>The answer was yes.</p>
          </div>
        </section>

        {/* Callout box below the section */}
        <div
          style={{
            borderLeft: "3px solid #2B318F",
            background: "#EEEFFA",
            padding: "20px 24px",
            borderRadius: "0 8px 8px 0",
            marginBottom: "100px",
            fontSize: "14px",
            fontFamily: "'Courier New', monospace",
            color: "#2B318F",
            fontStyle: "italic",
            lineHeight: 1.8,
          }}
        >
          A person who speaks Telugu, cannot read, cannot type, and has never used a
          smartphone - can open Marga, speak their business type, and receive a personalized
          scheme recommendation. End to end. By voice.
        </div>

        {/* ACCESSIBILITY BLOCK 5 - UX4G Accessibility compliance */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "48px 0",
            marginBottom: "100px",
            display: "grid",
            gap: "32px",
          }}
        >
          <div className="section-eyebrow">
            UX4G Accessibility Compliance
          </div>

          <div
            className="accessibility-compliance"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
            }}
          >
            {[
              "Voiceover Support",
              "Skip Button Included",
              "Walkthrough ≤ 4 Screens",
              "Color Contrast Maintained",
              "Noto Sans - Legible at All Sizes",
            ].map((label, index) => (
              <div
                key={label}
                style={{
                  paddingLeft: index > 0 ? "24px" : 0,
                  borderLeft: index > 0 ? "1px solid #E5E5E5" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    color: "#2B318F",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "'Courier New', monospace",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* IMPACT SECTION */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* IMPACT BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Impact
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              We didn't win.
              <br />
              But Marga made
              <br />
              it to the top.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
            }}
          >
            <p style={{ margin: 0 }}>
              Out of 150+ teams competing in the Telangana AI Rising Grand Challenge,
              Marga reached the final round of 20. We earned $5,000 in AWS credits. And
              our platform was presented by the Chief Minister of Goa at a national MSME
              event. In two weeks.
            </p>
          </div>
        </section>

        {/* IMPACT BLOCK 2 - Competition outcomes */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            backgroundColor: "#FFFFFF",
            padding: "80px",
            marginBottom: "100px",
            position: "relative",
          }}
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "800px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-150px",
              left: "-100px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
            }}
          >
            IMPACT
          </div>

          {/* Achievement cards */}
          <div
            className="achievement-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Card 1 - Top 20 */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "'Courier New', monospace",
                  color: "#999999",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Competition
              </div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                  lineHeight: 0.9,
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                Top 20
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Out of 150+ teams across Telangana, Marga was selected as one of 20
                finalists in the AI Rising Grand Challenge.
              </div>
              <div
                style={{
                  borderLeft: "3px solid #2B318F",
                  paddingLeft: "12px",
                  fontSize: "11px",
                  fontFamily: "'Courier New', monospace",
                  color: "#2B318F",
                }}
              >
                Organized by ITE&C · JICA · T-AIM
              </div>
            </div>

            {/* Card 2 - $5K */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#999999",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Recognition
              </div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                  lineHeight: 0.9,
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                $5K
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Awarded $5,000 in AWS credits for the strength of our GenAI use case and
                technical execution.
              </div>
              <div
                style={{
                  borderLeft: "3px solid #2B318F",
                  paddingLeft: "12px",
                  fontSize: "11px",
                  fontFamily: "'Courier New', monospace",
                  color: "#2B318F",
                }}
              >
                Amazon Web Services · Cloud Credits
              </div>
            </div>

            {/* Card 3 - Featured by CM */}
            <div
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 4px 24px rgba(43,49,143,0.07)",
                borderRadius: "10px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "'Courier New', monospace",
                  color: "#999999",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                National Showcase
              </div>
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "bold",
                  color: "#2B318F",
                  marginBottom: "12px",
                  fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                Featured by CM
              </div>
              <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "12px", marginBottom: "12px" }} />
              <div
                style={{
                  fontSize: "13px",
                  fontFamily: "'Courier New', monospace",
                  color: "#666666",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Marga was showcased by Shri Pramod Sawant, Chief Minister of Goa, at a
                national MSME event - validating our solution at the highest level.
              </div>
              <div
                style={{
                  borderLeft: "3px solid #2B318F",
                  paddingLeft: "12px",
                  fontSize: "11px",
                  fontFamily: "'Courier New', monospace",
                  color: "#2B318F",
                }}
              >
                Shri Pramod Sawant · CM of Goa
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT BLOCK 3 - Evaluation criteria */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "48px 0",
            marginBottom: "100px",
            display: "grid",
            gap: "32px",
          }}
        >
          <div className="section-eyebrow">
            We Were Evaluated On
          </div>

          <div
            className="scoring-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
            }}
          >
            {[
              { percent: "30%", label: "Technical Execution" },
              { percent: "25%", label: "Solution Effectiveness" },
              { percent: "15%", label: "Innovation & Differentiation" },
              { percent: "15%", label: "User Experience & Usability" },
              { percent: "15%", label: "Scalability" },
            ].map((item, index) => (
              <div
                key={item.label}
                style={{
                  paddingLeft: index > 0 ? "24px" : 0,
                  borderLeft: index > 0 ? "1px solid #E5E5E5" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    marginBottom: "8px",
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.percent}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "'Courier New', monospace",
                    color: "#999999",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "12px",
              fontFamily: "'Courier New', monospace",
              color: "#999999",
            }}
          >
            Source: Telangana AI Rising Grand Challenge official scoring rubric
          </div>
        </section>

        {/* IMPACT BLOCK 4 - Projected impact */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              If Deployed at Scale
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              What Marga could
              <br />
              mean for 63 million
              <br />
              MSMEs.
            </h3>
          </div>

          <div style={{ display: "grid", gap: "0" }}>
            {[
              {
                number: "01",
                impact: "Increased Scheme Awareness",
                description: "MSMEs discover schemes they never knew existed - matched to their exact business profile.",
              },
              {
                number: "02",
                impact: "Higher Application Completion",
                description: "Conversational form filling removes the biggest drop-off point in the entire application journey.",
              },
              {
                number: "03",
                impact: "Reduced Application Errors",
                description: "Chatbot validates and formats every input - fewer rejections, faster approvals.",
              },
              {
                number: "04",
                impact: "Accessible to Rural India",
                description: "Voice input and Telugu support means geography and literacy are no longer barriers.",
              },
              {
                number: "05",
                impact: "Proactive Scheme Recommendations",
                description: "Users don't need to search - Marga tells them what they qualify for before they even ask.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "24px",
                  borderBottom: index === 4 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  {item.number}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#131313",
                      marginBottom: "6px",
                      fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    {item.impact}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontFamily: "'Courier New', monospace",
                      color: "#999999",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* IMPACT BLOCK 5 - The moment that mattered most (DARK BAND) */}
      <div
        style={{
          backgroundColor: "#2B318F",
          padding: "100px 80px",
          marginTop: "100px",
          marginBottom: "0",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#EEEFFA",
              marginBottom: "24px",
              fontFamily: "'Courier New', monospace",
            }}
          >
            The Highlight
          </div>

          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              lineHeight: 1.3,
              color: "#FFFFFF",
              margin: "0 0 32px 0",
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Seeing Marga presented by a Chief Minister at a national stage - that made two
            weeks of weekends worth it.
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.2)",
              margin: "32px 0",
            }}
          />

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#C8CAF0",
              fontFamily: "'Courier New', monospace",
              margin: "0 0 24px 0",
            }}
          >
            Marga was built in 14 days by a team of 6 at a startup, following government
            design standards, solving a real problem for 63 million people. It was never
            just a hackathon entry. It was a proof of what is possible.
          </p>

          <div
            style={{
              fontSize: "12px",
              fontFamily: "'Courier New', monospace",
              color: "#8890D4",
            }}
          >
            Telangana AI Rising Grand Challenge · 2024
          </div>
        </div>
      </div>

      {/* IMPACT BLOCK 6 - Built in two weeks */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            borderBottom: "1px solid #E5E5E5",
            padding: "48px 0",
            marginTop: "0",
            display: "grid",
            gap: "32px",
          }}
        >
          <div style={{ display: "grid", gap: "0" }}>
            <div
              className="built-in-weeks"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0",
              }}
            >
              {[
                { number: "14", label: "Days of Build" },
                { number: "6", label: "Team Members" },
                { number: "150+", label: "Teams Competed" },
                { number: "1", label: "Platform Shown Nationally" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    paddingLeft: index > 0 ? "24px" : 0,
                    borderLeft: index > 0 ? "1px solid #E5E5E5" : "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#2B318F",
                      marginBottom: "8px",
                      fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    {item.number}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontFamily: "'Courier New', monospace",
                      color: "#999999",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* LEARNINGS & REFLECTION SECTION */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* LEARNINGS BLOCK 1 - Opening */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Learnings & Reflection
            </div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.2,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              What two weeks,
              <br />
              a government brief,
              <br />
              and 63M people taught me.
            </h2>
          </div>

          <div
            style={{
              borderLeft: "1px solid #E5E5E5",
              paddingLeft: "48px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#131313",
              fontFamily: "'Courier New', monospace",
            }}
          >
            <p style={{ margin: 0 }}>
              Leading Marga was the most compressed, high-stakes design experience of my
              career. A government problem, a rural user base, a six-person team, no CEO in
              office, and fourteen days to build something real. Here is what I took away.
            </p>
          </div>
        </section>

        {/* LEARNINGS BLOCK 2 - Key learnings */}
        <section
          style={{
            borderTop: "1px solid #E5E5E5",
            padding: "80px 0",
            marginBottom: "120px",
            position: "relative",
          }}
        >
          {/* Decorative background word */}
          <div
            style={{
              position: "absolute",
              fontSize: "800px",
              fontWeight: "bold",
              color: "#2B318F",
              opacity: 0.03,
              top: "-150px",
              left: "-100px",
              pointerEvents: "none",
              zIndex: 0,
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              lineHeight: 0.8,
            }}
          >
            LEARNED
          </div>

          {/* Learning items */}
          <div style={{ position: "relative", zIndex: 1 }} className="learning-items">
            {[
              {
                number: "01",
                heading: "Design for your hardest user first.",
                body: "When you solve for someone who is rural, low-literacy, and possibly disabled - you automatically solve for everyone else. The easiest user is never the right starting point.",
              },
              {
                number: "02",
                heading: "Speed and quality are not opposites.",
                body: "We designed, built, and shipped Marga in two weeks including weekends. Speed forced clarity - every decision had to be intentional because there was no time to be indecisive.",
              },
              {
                number: "03",
                heading: "A design system is not a constraint. It is a superpower.",
                body: "Following UX4G meant we never debated colors, fonts, or layout patterns. The handbook made every decision faster and every output more credible.",
              },
              {
                number: "04",
                heading: "Leading without authority is a real skill.",
                body: "With our CEO absent, I had to earn the team's direction - not demand it. Clear documentation, a shared vision, and daily communication kept six people moving as one.",
              },
              {
                number: "05",
                heading: "The name and the mascot are part of the UX.",
                body: "Marga was not a branding decision. It was a trust decision. Rural users needed to feel guided by a person - not processed by a machine.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1.2fr",
                  gap: "40px",
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  alignItems: "start",
                  borderBottom: index === 4 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#2B318F",
                    lineHeight: 0.9,
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.number}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#131313",
                    lineHeight: 1.3,
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.heading}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "'Courier New', monospace",
                    color: "#666666",
                    lineHeight: 1.8,
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEARNINGS BLOCK 3 - What I would do differently */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              If We Had More Time
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              What Marga V2
              <br />
              would look like.
            </h3>
          </div>

          <div style={{ display: "grid", gap: "0" }}>
            {[
              {
                label: "Direct Application Submission",
                description: "Submit schemes to government portals from inside Marga without leaving the app",
              },
              {
                label: "SMS Re-engagement",
                description: "Notify users about application status via SMS for users with no smartphone access",
              },
              {
                label: "TS-iPASS Integration",
                description: "Pull live MSME registration data to auto-personalize recommendations from day one",
              },
              {
                label: "Vernacular Expansion",
                description: "Extend beyond Telugu - Hindi, Kannada, Marathi for national deployment",
              },
            ].map((item, index) => (
              <div
                key={item.label}
                style={{
                  borderTop: "1px solid #E5E5E5",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderBottom: index === 3 ? "1px solid #E5E5E5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#131313",
                    marginBottom: "8px",
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Courier New', monospace",
                    color: "#999999",
                  }}
                >
                  · {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEARNINGS BLOCK 4 - Telangana to AP */}
        <section
          className="two-column-section"
        >
          <div>
            <div className="section-eyebrow">
              Iteration
            </div>
            <h3
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.3,
                color: "#131313",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              From Telangana
              <br />
              to Andhra Pradesh.
            </h3>
          </div>

          <div>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.8,
                color: "#131313",
                fontFamily: "'Courier New', monospace",
                margin: "0 0 40px 0",
              }}
            >
              The AP MSME challenge followed Telangana with a near-identical problem
              statement. Rather than start from scratch, we treated it as V2 - applying
              everything we had learned from the first submission. Same core product.
              Sharper execution. More confident decisions.
            </p>

            {/* Comparison row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* Telangana V1 */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#999999",
                    marginBottom: "8px",
                  }}
                >
                  Telangana V1
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#131313",
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Pilot · First Build · Learning
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#2B318F",
                }}
              >
                →
              </div>

              {/* Andhra Pradesh V2 */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#999999",
                    marginBottom: "8px",
                  }}
                >
                  Andhra Pradesh V2
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#131313",
                    fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Refined · Faster · More Confident
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* LEARNINGS BLOCK 5 - Closing statement */}
      <div
        style={{
          borderTop: "1px solid #E5E5E5",
          borderBottom: "1px solid #E5E5E5",
          padding: "100px 80px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div className="section-eyebrow">
            Final Thought
          </div>

          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              lineHeight: 1.4,
              color: "#131313",
              margin: "0 0 40px 0",
              fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Marga taught me that the best design is not the most beautiful one. It is the
            one that works for the person who needs it most.
          </h2>

          <div
            style={{
              borderTop: "1px solid #E5E5E5",
              margin: "40px 0",
            }}
          />

          <div
            style={{
              fontSize: "20px",
              fontFamily: "'Courier New', monospace",
              color: "#666666",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            Project Lead · UX Research · UI Design · Conversation Design · Accessibility ·
            Team Management · 2 Weeks · Top 20 of 150+
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
            className="cta-buttons"
          >
            <button
              style={{
                backgroundColor: "#2B318F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              ← Back to Portfolio
            </button>

            <button
              style={{
                backgroundColor: "#FFFFFF",
                color: "#2B318F",
                border: "1px solid #2B318F",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              View Next Case Study →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;800&display=swap');

        .two-column-section--hero .project-hero-tags {
          font-size: 13px;
          color: #888888;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
          font-weight: 400;
        }

        .two-column-section--hero .project-hero-title {
          font-size: clamp(42px, 6vw, 64px);
          font-weight: 700;
          margin: 0 0 24px 0;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: #131313;
          font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .two-column-section--hero .project-hero-subtitle {
          font-size: 20px;
          color: #444444;
          font-weight: 400;
          line-height: 1.6;
          margin: 0;
          max-width: 100%;
        }

        @media (max-width: 900px) {
          .two-column-section--hero .project-hero-subtitle {
            font-size: 18px;
          }

          .role-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .role-stats > div {
            padding-bottom: 24px;
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-right: 24px !important;
          }

          .role-stats > div:last-child {
            border-bottom: none !important;
          }

          .metadata-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .scale-stats {
            grid-template-columns: 1fr !important;
          }

          .scale-stats > div {
            padding-left: 0 !important;
            border-left: none !important;
            padding-bottom: 24px;
            border-bottom: 1px solid #E5E5E5;
          }

          .scale-stats > div:last-child {
            border-bottom: none !important;
          }

          .pain-points-list > div {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          .hmw-list > div {
            grid-template-columns: 40px 1fr !important;
          }

          .research-cards {
            grid-template-columns: 1fr !important;
          }

          .persona-grid {
            grid-template-columns: 1fr !important;
          }

          .insights-list > div {
            grid-template-columns: 40px 1fr !important;
          }

          .scoring-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .scoring-grid > div {
            padding-right: 24px !important;
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 24px;
          }

          .scoring-grid > div:nth-child(4),
          .scoring-grid > div:nth-child(5) {
            border-bottom: none !important;
          }

          .orbital-section {
            min-height: 500px !important;
          }

          .timeline-grid {
            grid-template-columns: 1fr !important;
          }

          .timeline-grid > div {
            margin-bottom: 32px;
          }

          .design-showcase {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          .feature-block {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          .feature-block.feature-flipped {
            gridTemplateColumns: 1fr !important;
          }

          .features-summary {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .features-summary > div {
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 32px !important;
            margin-bottom: 32px !important;
          }

          .features-summary > div:nth-child(odd):nth-last-child(-n + 2),
          .features-summary > div:last-child {
            border-bottom: none !important;
          }

          .accessibility-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .accessibility-compliance {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .accessibility-compliance > div {
            padding-left: 12px !important;
            border-left: 1px solid #E5E5E5 !important;
          }

          .achievement-cards {
            grid-template-columns: 1fr !important;
          }

          .scoring-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .scoring-strip > div {
            padding-left: 12px !important;
            border-left: 1px solid #E5E5E5 !important;
            padding-bottom: 24px;
            margin-bottom: 24px;
            border-bottom: 1px solid #E5E5E5;
          }

          .built-in-weeks {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .learning-items {
            grid-template-columns: 1fr !important;
          }

          .learning-items > div {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 32px !important;
          }

          .cta-buttons {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .two-column-section--hero .project-hero-tags {
            font-size: 12px;
          }

          .two-column-section--hero .project-hero-title {
            letter-spacing: -1px;
          }

          .two-column-section--hero .project-hero-subtitle {
            font-size: 17px;
            line-height: 1.65;
          }

          body {
            padding: 0 20px;
          }

          .role-stats {
            grid-template-columns: 1fr !important;
          }

          .role-stats > div {
            padding-bottom: 24px;
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-right: 0 !important;
          }

          .metadata-bar {
            grid-template-columns: 1fr !important;
          }

          .scale-stats {
            grid-template-columns: 1fr !important;
          }

          .scale-stats > div {
            padding-left: 0 !important;
            border-left: none !important;
          }

          h1 {
            font-size: 40px !important;
          }

          h2 {
            font-size: 32px !important;
          }

          h3 {
            font-size: 28px !important;
          }

          .research-cards {
            grid-template-columns: 1fr !important;
          }

          .persona-grid {
            grid-template-columns: 1fr !important;
          }

          .insights-list > div {
            grid-template-columns: 40px 1fr !important;
          }

          .scoring-grid {
            grid-template-columns: 1fr !important;
          }

          .scoring-grid > div {
            padding-right: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 24px;
            margin-bottom: 24px;
          }

          .scoring-grid > div:last-child {
            border-bottom: none !important;
          }

          .feature-block {
            grid-template-columns: 1fr !important;
          }

          .feature-block.feature-flipped {
            grid-template-columns: 1fr !important;
          }

          .features-summary {
            grid-template-columns: 1fr !important;
          }

          .features-summary > div {
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding: 24px !important;
            margin: 0 !important;
          }

          .features-summary > div:last-child {
            border-bottom: none !important;
          }

          .accessibility-cards {
            grid-template-columns: 1fr !important;
          }

          .accessibility-compliance {
            grid-template-columns: 1fr !important;
          }

          .accessibility-compliance > div {
            padding-left: 0 !important;
            border-left: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 24px;
            margin-bottom: 24px;
          }

          .accessibility-compliance > div:last-child {
            border-bottom: none !important;
          }

          .achievement-cards {
            grid-template-columns: 1fr !important;
          }

          .scoring-strip {
            grid-template-columns: 1fr !important;
          }

          .scoring-strip > div {
            padding-left: 0 !important;
            border-left: none !important;
            padding-bottom: 24px;
            margin-bottom: 24px;
            border-bottom: 1px solid #E5E5E5;
          }

          .scoring-strip > div:last-child {
            border-bottom: none !important;
          }

          .built-in-weeks {
            grid-template-columns: 1fr !important;
          }

          .built-in-weeks > div {
            padding-left: 0 !important;
            border-left: none !important;
            padding-bottom: 24px;
            margin-bottom: 24px;
            border-bottom: 1px solid #E5E5E5;
          }

          .built-in-weeks > div:last-child {
            border-bottom: none !important;
          }

          .learning-items {
            grid-template-columns: 1fr !important;
          }

          .cta-buttons {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Project3;
