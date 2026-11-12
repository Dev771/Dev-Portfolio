import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { EDUCATION, EXPERIENCES } from "../data/constants";
import { techName } from "../lib/tech";
import Chips from "./Chips";
import PixelIcon from "./PixelIcon";

interface Stage {
  id: string;
  kind: "school" | "job";
  short: string;
  org: string;
  when: string;
  current: boolean;
  heading: string;
  meta: string[];
  points: string[];
  tech: string[];
}

// Oldest first, so the path reads left to right like a level map.
const STAGES: Stage[] = [
  ...[...EDUCATION].reverse().map((e) => ({
    id: e.degree,
    kind: "school" as const,
    short: e.degree.match(/\(([^)]+)\)/)?.[1] ?? e.degree,
    org: e.institution.replace(/ Institute.*$/, ""),
    when: `${e.startDate}–${e.endDate}`,
    current: false,
    heading: e.degree,
    meta: [e.institution, `${e.startDate}–${e.endDate}`, `GPA ${e.gpa}`],
    points: [],
    tech: [],
  })),
  ...[...EXPERIENCES].reverse().map((x) => ({
    id: x.company,
    kind: "job" as const,
    short: x.company,
    org: x.role,
    when: x.endDate ? `${x.startDate}–${x.endDate}` : `Since ${x.startDate}`,
    current: x.endDate === null,
    heading: `${x.role} at ${x.company}`,
    meta: [`${x.startDate}–${x.endDate ?? "now"}`, x.type, x.location],
    points: x.points,
    tech: x.techStack.map(techName),
  })),
];

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export default function Journey() {
  const [selected, setSelected] = useState(STAGES.findIndex((s) => s.current));
  const [mapRef, width] = useWidth();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[selected];

  const n = STAGES.length;
  const pad = 80;
  const xs = STAGES.map((_, i) => pad + (i * (width - 2 * pad)) / (n - 1));
  const ys = STAGES.map((_, i) => (i % 2 ? 44 : 72));

  // dotted path: across, then a step up or down, then across to the next stage
  const dots: { x: number; y: number; current: boolean }[] = [];
  if (width) {
    for (let i = 0; i < n - 1; i++) {
      const mid = (xs[i] + xs[i + 1]) / 2;
      const legs: [number, number, number, number][] = [
        [xs[i], ys[i], mid, ys[i]],
        [mid, ys[i], mid, ys[i + 1]],
        [mid, ys[i + 1], xs[i + 1], ys[i + 1]],
      ];
      for (const [x0, y0, x1, y1] of legs) {
        const len = Math.abs(x1 - x0) + Math.abs(y1 - y0);
        for (let k = 0; k < len; k += 8) {
          const x = x0 + ((x1 - x0) * k) / (len || 1);
          const y = y0 + ((y1 - y0) * k) / (len || 1);
          const near = Math.min(Math.abs(x - xs[i]) + Math.abs(y - ys[i]), Math.abs(x - xs[i + 1]) + Math.abs(y - ys[i + 1]));
          if (near >= 28) dots.push({ x, y, current: i === n - 2 });
        }
      }
    }
  }

  const keys = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = { ArrowLeft: i - 1, ArrowUp: i - 1, ArrowRight: i + 1, ArrowDown: i + 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = (next + n) % n;
    setSelected(target);
    tabs.current[target]?.focus();
  };

  const tab = (s: Stage, i: number, style?: CSSProperties) => (
    <button
      key={s.id}
      ref={(el) => {
        tabs.current[i] = el;
      }}
      type="button"
      role="tab"
      id={`stage-${i}`}
      aria-selected={i === selected}
      aria-controls="stage-panel"
      tabIndex={i === selected ? 0 : -1}
      className={`stage${s.current ? " is-current" : ""}${i === selected ? " is-selected" : ""} stage-${s.kind}`}
      style={style}
      onClick={() => setSelected(i)}
      onKeyDown={(e) => keys(e, i)}
    >
      <span className="stage-node">
        <PixelIcon name={s.kind === "school" ? "cap" : "briefcase"} px={2} />
      </span>
      <span className="stage-text">
        <span className="stage-when">{s.when}</span>
        <span className="stage-short">{s.short}</span>
        <span className="stage-org">{s.org}</span>
      </span>
    </button>
  );

  return (
    <div className="frame journey">
      <div className="journey-map" ref={mapRef} role="tablist" aria-label="Stages of my journey">
        {width > 0 && (
          <svg className="journey-path" width={width} height={210} aria-hidden="true">
            {dots.map((d, i) => (
              <rect key={i} x={d.x - 2} y={d.y - 2} width="4" height="4" fill={d.current ? "var(--violet)" : "var(--lavender)"} />
            ))}
          </svg>
        )}
        {STAGES.map((s, i) =>
          tab(s, i, width ? { left: xs[i], top: ys[i] } : undefined),
        )}
        {width > 0 && (
          <span className="you-are-here" style={{ left: xs[n - 1], top: ys[n - 1] }} aria-hidden="true">
            <PixelIcon name="down" px={3} color="var(--mustard)" />
          </span>
        )}
      </div>

      <section className="quest-log" id="stage-panel" role="tabpanel" aria-labelledby={`stage-${selected}`}>
        <h3>{stage.heading}</h3>
        <p className="quest-meta">{stage.meta.join(", ")}</p>
        {stage.points.length > 0 && (
          <ul className="quest-points">
            {stage.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        <Chips items={stage.tech} label="Tech stack" showLabel />
      </section>
    </div>
  );
}
