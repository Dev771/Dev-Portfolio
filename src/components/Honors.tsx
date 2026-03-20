import { HONORS } from "../data/constants";
import "./Honors.css";

export default function Honors() {
  return (
    <section className="honors-section">
      <h2 className="honors-title">Honors, Awards &amp; Certification</h2>
      <div className="honors-list">
        {HONORS.map((honor) => (
          <div className="honors-item" key={honor.title}>
            <div className="honors-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="honors-details">
              <h3 className="honors-name">{honor.title}</h3>
              <p className="honors-meta">{honor.subtitle} · {honor.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
