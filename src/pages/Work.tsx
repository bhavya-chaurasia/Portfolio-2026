import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Work.css";

const workProjects = [
  {
    id: "project3",
    title: "Marga",
    subtitle: "GenAI Chatbot for MSME Government Schemes",
    tags: ["UX Design", "AI", "Product Design"],
    description: "A voice-first chatbot built in 2 weeks for rural MSME owners across Telangana & AP to discover and apply for government schemes - in Telugu or English.",
    stats: [
      { label: "Top 20 of 150+", value: "Teams" },
      { label: "$5K", value: "AWS Credits" },
      { label: "2 Weeks", value: "Build Time" },
    ],
    image: "/Project3/marga-thumb.png",
    link: "#/project3",
  },
  {
    id: "project2",
    title: "Project 2",
    subtitle: "Coming Soon",
    tags: ["Design", "Research"],
    description: "A detailed case study coming soon.",
    stats: [
      { label: "TBD", value: "" },
    ],
    image: "/project-placeholder.png",
    link: "#/project2",
    disabled: true,
  },
  {
    id: "project1",
    title: "Project 1",
    subtitle: "Coming Soon",
    tags: ["Design"],
    description: "A detailed case study coming soon.",
    stats: [
      { label: "TBD", value: "" },
    ],
    image: "/project-placeholder.png",
    link: "#/project1",
    disabled: true,
  },
];

const Work = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProjectClick = (projectId: string, disabled?: boolean) => {
    if (!disabled) {
      navigate(`/project3`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        color: "#131313",
        fontFamily: "'Courier New', monospace",
        lineHeight: 1.8,
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            marginBottom: "120px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#888888",
              letterSpacing: "0.5px",
              marginBottom: "24px",
              fontWeight: 400,
            }}
          >
            Work
          </div>
          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 64px)",
              fontWeight: 700,
              margin: "0 0 24px 0",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#131313",
              fontFamily:
                "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Latest Shenanigans
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#444444",
              fontWeight: 400,
              lineHeight: 1.6,
              margin: 0,
              maxWidth: "700px",
            }}
          >
            A collection of design problems solved. From research to impact, here is how I approach product design and user experience.
          </p>
        </section>

        {/* Projects Grid */}
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: "40px",
            }}
            className="work-projects-grid"
          >
            {workProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id, project.disabled)}
                style={{
                  cursor: project.disabled ? "not-allowed" : "pointer",
                  opacity: project.disabled ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
                className="work-project-card"
                onMouseEnter={(e) => {
                  if (!project.disabled) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Project Image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    overflow: "hidden",
                    border: "1px solid #E5E5E5",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Project Info */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888888",
                      letterSpacing: "0.5px",
                      marginBottom: "12px",
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      margin: "0 0 8px 0",
                      lineHeight: 1.2,
                      color: "#131313",
                      fontFamily:
                        "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    {project.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666666",
                      margin: "0 0 16px 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#999999",
                      margin: "0 0 24px 0",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: project.stats.length > 1 ? "repeat(auto-fit, minmax(100px, 1fr))" : "1fr",
                      gap: "16px",
                      borderTop: "1px solid #E5E5E5",
                      paddingTop: "16px",
                    }}
                  >
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#2B318F",
                            fontFamily:
                              "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#999999",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Arrow */}
                {!project.disabled && (
                  <div
                    style={{
                      marginTop: "24px",
                      fontSize: "20px",
                      color: "#2B318F",
                      fontWeight: "bold",
                      transition: "transform 0.3s ease",
                    }}
                    className="project-cta-arrow"
                  >
                    Read Case Study →
                  </div>
                )}

                {project.disabled && (
                  <div
                    style={{
                      marginTop: "24px",
                      fontSize: "14px",
                      color: "#999999",
                      fontStyle: "italic",
                    }}
                  >
                    Coming soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid #E5E5E5",
            margin: "120px 0 80px 0",
          }}
        />

        {/* CTA Section */}
        <section
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#888888",
              letterSpacing: "0.5px",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Interested?
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 700,
              margin: "0 0 24px 0",
              lineHeight: 1.3,
              color: "#131313",
              fontFamily:
                "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Let's work together on your next problem.
          </h2>
          <button
            style={{
              backgroundColor: "#2B318F",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "14px 40px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily:
                "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginTop: "24px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1F2364";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2B318F";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onClick={() => {
              // Navigate to contact or scroll to contact section
              window.location.href = "#/contact";
            }}
          >
            Get in Touch
          </button>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-projects-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .work-project-card {
            transform: none !important;
          }

          .work-projects-grid {
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Work;
