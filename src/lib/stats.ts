import type { Day, Languages } from "./live";

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

export function formatDate(iso: string, withYear = true) {
  return parse(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: withYear ? "numeric" : undefined,
    timeZone: "UTC",
  });
}

export function streaks(days: Day[]) {
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i -= 1; // today may simply not have started yet
  let current = 0;
  while (i >= 0 && days[i].count > 0) {
    current += 1;
    i -= 1;
  }
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  return { current, longest };
}

export function summary(days: Day[]) {
  const busiest = days.reduce((best, d) => (d.count > best.count ? d : best), days[0]);
  return {
    ...streaks(days),
    active: days.filter((d) => d.count > 0).length,
    busiest,
    last: days[days.length - 1],
  };
}

/** GitHub-style levels: quartiles of the days that had any contributions. */
export function levelFn(days: Day[]) {
  const nonzero = days.map((d) => d.count).filter(Boolean).sort((a, b) => a - b);
  if (!nonzero.length) return () => 0;
  const q = [0.25, 0.5, 0.75].map((p) => nonzero[Math.floor(nonzero.length * p)]);
  return (count: number) => (count === 0 ? 0 : 1 + q.filter((t) => count > t).length);
}

export interface Week {
  start: string;
  days: (Day & { weekday: number })[];
  total: number;
}

/** Days grouped into Sunday-first weeks. */
export function weeks(days: Day[]): Week[] {
  const first = parse(days[0].date);
  const firstSunday = first.getTime() - first.getUTCDay() * 86_400_000;
  const out: Week[] = [];
  for (const d of days) {
    const t = parse(d.date);
    const index = Math.floor((t.getTime() - firstSunday) / (7 * 86_400_000));
    out[index] ??= { start: d.date, days: [], total: 0 };
    out[index].days.push({ ...d, weekday: t.getUTCDay() });
    out[index].total += d.count;
  }
  return out.filter(Boolean);
}

// Markup and styling would drown out the real languages (CSS from bundled icon sheets, mostly).
const NOT_LANGUAGES = new Set(["CSS", "HTML", "SCSS", "Less", "EJS", "Dockerfile", "Shell", "Batchfile", "Makefile", "Procfile"]);

export function languageShares(languages: Languages, top = 4) {
  const list = Object.entries(languages).filter(([name]) => !NOT_LANGUAGES.has(name));
  const total = list.reduce((sum, [, v]) => sum + v.bytes, 0) || 1;
  return list
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .slice(0, top)
    .map(([name, v]) => ({ name, color: v.color ?? "#8C88B0", share: v.bytes / total, repos: v.repos }));
}

/** Small deterministic PRNG so stars and far towers sit in the same place on every load. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
