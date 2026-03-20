import { EDUCATION } from "../data/constants";
import "./Education.css";

export default function Education() {
  return (
    <section className="education-section">
      <h2 className="education-title">Education</h2>
      <div className="education-list">
        {EDUCATION.map((edu) => (
          <div className="education-item" key={edu.institution}>
            <div className="education-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
            </div>
            <div className="education-details">
              <h3 className="education-name">{edu.institution}</h3>
              <p className="education-meta">
                Full Time · {edu.startDate} – {edu.endDate} · {edu.degree} · GPA: {edu.gpa}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
