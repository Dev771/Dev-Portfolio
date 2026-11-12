import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { Day } from "../lib/live";
import { formatDate, levelFn, seeded, weeks as toWeeks } from "../lib/stats";

const W = 880;
const H = 262;
const GROUND = 226;
const X0 = 14;
const NIGHT = ["#0B0A1C", "#0E0C24", "#110F2B", "#151233", "#1A163E", "#251D55"];
const BUILDINGS = ["#231E4C", "#28225A", "#2E2763"];
const WINDOW_OFF = "#17143A";
const WINDOW_ON = ["", "#7A5E22", "#B8892E", "#F2B83B", "#FFE08A"];

interface Range {
  a: number; // where the drag started
  b: number; // where it is now
}

export default function Skyline({ days }: { days: Day[] }) {
  const weeks = useMemo(() => toWeeks(days), [days]);
  const level = useMemo(() => levelFn(days), [days]);
  const peak = useMemo(() => weeks.reduce((best, w, i) => (w.total > weeks[best].total ? i : best), 0), [weeks]);
  const [hover, setHover] = useState<number | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const dragging = useRef(false);

  // Without IntersectionObserver the windows start lit; otherwise they switch on in view.
  const [lit, setLit] = useState(() => !("IntersectionObserver" in window));
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || lit) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lit]);

  const last = weeks.length - 1;
  const clamp = (i: number) => Math.max(0, Math.min(last, i));
  const pitch = (W - 2 * X0) / weeks.length;
  const bw = Math.min(12, pitch - 3);
  const peakTotal = weeks[peak]?.total || 1;
  const heightOf = (i: number) => 58 + 2 * Math.round((weeks[i].total / peakTotal) * 64);
  const xOf = (i: number) => X0 + i * pitch + (pitch - bw) / 2;

  const lo = range ? Math.min(range.a, range.b) : null;
  const hi = range ? Math.max(range.a, range.b) : null;
  const isSpan = lo !== null && hi !== null && hi > lo;
  const focusWeek = hover ?? (range ? range.b : peak);
  const inSelection = (i: number) => (isSpan ? i >= lo! && i <= hi! : i === focusWeek);

  const scenery = useMemo(() => {
    const rand = seeded(3);
    const far: { x: number; w: number; h: number }[] = [];
    for (let x = 2; x < W; ) {
      const w = 14 + Math.floor(rand() * 10) * 2;
      far.push({ x, w, h: 20 + Math.floor(rand() * 36) * 2 });
      x += w + [0, 0, 2, 6][Math.floor(rand() * 4)];
    }
    const starRand = seeded(5);
    const stars = Array.from({ length: 46 }, (_, i) => ({
      x: Math.floor(starRand() * W),
      y: Math.floor(starRand() * (GROUND - 40)),
      big: i % 7 === 0,
    }));
    return { far, stars };
  }, []);

  const months = weeks
    .map((w, i) => ({ i, first: w.days.find((d) => d.date.endsWith("-01")) }))
    .filter((m) => m.first)
    .filter((m, k, all) => k === 0 || m.i - all[k - 1].i >= 3);

  const indexAt = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    return clamp(Math.floor((x - X0) / pitch));
  };

  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    const i = indexAt(e);
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setRange({ a: i, b: i });
    setHover(null);
  };
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const i = indexAt(e);
    if (dragging.current) setRange((r) => (r && r.b !== i ? { a: r.a, b: i } : r));
    else if (e.pointerType === "mouse") setHover(i);
  };
  const onUp = () => {
    dragging.current = false;
  };

  const keys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setRange(null);
      return;
    }
    const current = range ? range.b : peak;
    const next = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setHover(null);
    setRange(e.shiftKey ? { a: range ? range.a : current, b: clamp(next) } : { a: clamp(next), b: clamp(next) });
  };

  // What the readout reports: a stretch of weeks, or a single week.
  const report = useMemo(() => {
    if (isSpan) {
      const span = weeks.slice(lo!, hi! + 1).flatMap((w) => w.days);
      const busiest = span.reduce((best, d) => (d.count > best.count ? d : best), span[0]);
      return {
        span: true as const,
        from: span[0].date,
        to: span[span.length - 1].date,
        total: span.reduce((sum, d) => sum + d.count, 0),
        active: span.filter((d) => d.count > 0).length,
        days: span.length,
        busiest,
      };
    }
    const w = weeks[focusWeek];
    return { span: false as const, from: w.start, total: w.total, isPeak: focusWeek === peak };
  }, [isSpan, lo, hi, weeks, focusWeek, peak]);

  const marqueeTop = isSpan ? Math.min(...weeks.slice(lo!, hi! + 1).map((_, k) => GROUND - heightOf(lo! + k))) - 22 : 0;

  return (
    <div className="frame skyline-frame">
      <div
        ref={box}
        className={`skyline${lit ? " is-lit" : ""}`}
        tabIndex={0}
        role="group"
        aria-label="Contribution city. Arrow keys move between weeks, Shift and an arrow key selects a stretch of weeks, Escape clears."
        aria-describedby="skyline-readout"
        onKeyDown={keys}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            {NIGHT.slice(1).map((c, i) => (
              <pattern key={c} id={`dither-${i}`} width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="2" height="2" fill={c} />
                <rect x="2" y="2" width="2" height="2" fill={c} />
              </pattern>
            ))}
          </defs>
          {NIGHT.map((c, i) => (
            <rect key={c} x="0" y={(i * GROUND) / NIGHT.length} width={W} height={GROUND / NIGHT.length + 1} fill={c} />
          ))}
          {NIGHT.slice(1).map((c, i) => (
            <rect key={`d-${c}`} x="0" y={((i + 1) * GROUND) / NIGHT.length - 6} width={W} height="6" fill={`url(#dither-${i})`} />
          ))}
          <g fill="#EDEBFF">
            {scenery.stars.map((s, i) =>
              s.big ? (
                <path key={i} d={`M${s.x} ${s.y - 2}h2v2h2v2h-2v2h-2v-2h-2v-2h2z`} fill="#A99BFF" />
              ) : (
                <rect key={i} x={s.x} y={s.y} width="2" height="2" />
              ),
            )}
          </g>
          <g fill="#100E27">
            {scenery.far.map((t) => (
              <rect key={t.x} x={t.x} y={GROUND - t.h} width={t.w} height={t.h} />
            ))}
          </g>

          {isSpan && (
            <rect
              className="marquee"
              x={xOf(lo!) - 5}
              y={marqueeTop}
              width={xOf(hi!) - xOf(lo!) + bw + 10}
              height={GROUND - marqueeTop - 2}
              fill="rgba(242, 184, 59, 0.07)"
              stroke="#F2B83B"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {weeks.map((w, i) => {
            const bh = heightOf(i);
            const bx = xOf(i);
            const by = GROUND - bh;
            const selected = inSelection(i);
            return (
              <g key={w.start}>
                <rect x={bx} y={by} width={bw} height={bh} fill={selected ? "#3B3378" : BUILDINGS[(i * 2 + Math.floor(i / 3)) % 3]} />
                {i % 5 === 2 && <rect x={bx + 3} y={by - 4} width="5" height="4" fill={BUILDINGS[(i + 1) % 3]} />}
                {w.days.map((d) =>
                  d.count ? null : (
                    <rect key={d.date} x={bx + (bw - 5) / 2} y={by + 6 + d.weekday * 7} width="5" height="4" fill={WINDOW_OFF} />
                  ),
                )}
                <g className="lights" style={{ "--d": `${0.1 + i * 0.03}s` } as CSSProperties}>
                  {w.days.map((d) =>
                    d.count ? (
                      <rect key={d.date} x={bx + (bw - 5) / 2} y={by + 6 + d.weekday * 7} width="5" height="4" fill={WINDOW_ON[level(d.count)]} />
                    ) : null,
                  )}
                </g>
                {i === peak && (
                  <>
                    <rect x={bx + bw / 2 - 0.5} y={by - 14} width="1" height="14" fill="#8C88B0" />
                    <rect className="beacon" x={bx + bw / 2 - 1} y={by - 17} width="2" height="3" fill="#FF5A5F" />
                  </>
                )}
                {!isSpan && i === focusWeek && <path d={`M${bx + bw / 2 - 5} ${by - 30}h10v2h-2v2h-2v2h-2v-2h-2v-2h-2z`} fill="#F2B83B" />}
              </g>
            );
          })}

          <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#0D0C1F" />
          <rect x="0" y={GROUND} width={W} height="2" fill="#2E2A5C" />
          <g className="sky-months">
            {months.map((m) => (
              <text key={m.i} x={X0 + m.i * pitch + 2} y={GROUND + 25}>
                {new Date(`${m.first!.date}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="skyline-foot">
        <p id="skyline-readout" className="skyline-readout" aria-live="polite">
          {report.span ? (
            <>
              <span className="readout-label">
                {formatDate(report.from)} to {formatDate(report.to)}
              </span>
              <span className="readout-value">{report.total.toLocaleString("en-US")}</span>
              <span className="readout-label">
                contributions, active on {report.active} of {report.days} days, busiest {formatDate(report.busiest.date, false)} with{" "}
                {report.busiest.count}
              </span>
            </>
          ) : (
            <>
              <span className="readout-label">Week of {formatDate(report.from)}</span>
              <span className="readout-value">{report.total.toLocaleString("en-US")}</span>
              <span className="readout-label">
                contribution{report.total === 1 ? "" : "s"}
                {report.isPeak ? ", my busiest week" : ""}
              </span>
            </>
          )}
        </p>
        {isSpan ? (
          <button type="button" className="btn btn-small" onClick={() => setRange(null)}>
            Clear selection
          </button>
        ) : (
          <p className="skyline-hint">Drag across the city to add up a stretch of weeks.</p>
        )}
      </div>
    </div>
  );
}
