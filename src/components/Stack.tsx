import { TECH_STACK } from "../data/constants";
import type { Languages } from "../lib/live";
import { languageShares } from "../lib/stats";
import { gem } from "../lib/tech";
import PixelIcon from "./PixelIcon";

const SEGMENTS = 20;

export default function Stack({ languages }: { languages: Languages }) {
  const shares = languageShares(languages, 4);
  return (
    <div className="stack-grid">
      <div className="frame stack-langs">
        <h3 className="panel-title" style={{ color: "var(--mustard)" }}>
          <PixelIcon name="code" px={3} />
          Languages I write
        </h3>
        <p className="panel-note">Share of code across my public GitHub repos. Updates daily.</p>
        <ul className="lang-list">
          {shares.map((l) => {
            const pct = l.share < 0.01 ? "<1%" : `${Math.round(l.share * 100)}%`;
            const filled = Math.max(1, Math.round(l.share * SEGMENTS));
            return (
              <li key={l.name} className="lang">
                <span className="lang-name">
                  <span className="gem" style={{ background: l.color }} />
                  {l.name}
                </span>
                <span className="lang-repos">
                  {l.repos} repo{l.repos === 1 ? "" : "s"}
                </span>
                <span className="lang-pct">{pct}</span>
                <span className="lang-bar" aria-hidden="true">
                  {Array.from({ length: SEGMENTS }, (_, s) => (
                    <span key={s} style={s < filled ? { background: l.color } : undefined} />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="frame stack-inventory">
        <h3 className="panel-title" style={{ color: "var(--green)" }}>
          <PixelIcon name="stack" px={3} />
          Inventory
        </h3>
        <p className="panel-note">Languages, frameworks, databases and cloud tools I work with.</p>
        <ul className="inventory">
          {TECH_STACK.map((t) => (
            <li key={t.name} className="slot">
              <span className="gem" style={{ background: gem(t.name) }} />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
