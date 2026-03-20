import { EXPERIENCES, DEVICON_BASE } from "../data/constants";
import "./Experience.css";

export default function Experience() {
  return (
    <section className="experience-section">
      <h2 className="experience-title">Experience</h2>
      <div className="experience-list">
        {EXPERIENCES.map((exp) => (
          <article className="experience-card" key={`${exp.company}-${exp.startDate}`}>
            <div className="experience-header">
              <div className="experience-company">{exp.company}</div>
              <div className="experience-meta">
                <span className="experience-role">{exp.role}</span>
                {!exp.endDate && <span className="experience-badge">Current</span>}
              </div>
              <div className="experience-details">
                {exp.type} · {exp.startDate} – {exp.endDate ?? "Present"} · {exp.location}
              </div>
            </div>
            <ul className="experience-points">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="experience-stack">
              <span className="experience-stack-label">TECH STACK</span>
              <div className="experience-stack-icons">
                {exp.techStack.map((icon) => (
                  <img
                    key={icon}
                    src={`${DEVICON_BASE}${icon}.svg`}
                    alt={icon.split("/")[0]}
                    title={icon.split("/")[0]}
                    width={22}
                    height={22}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
