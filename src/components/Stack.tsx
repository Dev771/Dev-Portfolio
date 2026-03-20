import { TECH_STACK, DEVICON_BASE } from "../data/constants";
import "./Stack.css";

export default function Stack() {
  return (
    <section className="stack-section">
      <h2 className="stack-title">Stack</h2>
      <div className="stack-icons">
        {TECH_STACK.map((tech) => (
          <div className="stack-item" key={tech.name}>
            <img
              src={`${DEVICON_BASE}${tech.icon}.svg`}
              alt={tech.name}
              width={36}
              height={36}
              loading="lazy"
            />
            <span className="stack-tooltip">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
