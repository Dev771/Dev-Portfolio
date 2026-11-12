import { useMemo } from "react";
import { seeded } from "../lib/stats";

interface Props {
  bands: string[];
  stars?: number;
  seed?: number;
  /** keep stars above this fraction of the height */
  starsTo?: number;
}

/** Banded night sky with dithered seams and a scatter of stars, as an absolutely placed backdrop. */
export default function NightSky({ bands, stars = 40, seed = 7, starsTo = 1 }: Props) {
  const points = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: stars }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100 * starsTo,
      big: i % 7 === 0,
      twinkle: i % 4 === 0,
      lavender: i % 3 === 0,
      delay: (i * 0.37) % 3.2,
    }));
  }, [stars, seed, starsTo]);

  const band = 100 / bands.length;
  return (
    <div className="sky" aria-hidden="true">
      {bands.map((color, i) => (
        <div key={color + i} className="sky-band" style={{ top: `${i * band}%`, height: `${band + 0.5}%`, background: color }} />
      ))}
      {bands.slice(1).map((color, i) => (
        <div key={`d${i}`} className="sky-dither" style={{ top: `calc(${(i + 1) * band}% - 6px)`, color }} />
      ))}
      {points.map((p, i) => (
        <span
          key={i}
          className={`star${p.big ? " star-big" : ""}${p.twinkle ? " twinkle" : ""}${p.lavender ? " star-lavender" : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}
