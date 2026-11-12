import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { PROJECTS, SECRET_CODE, SECRET_PROJECT, type CodeInput, type Project } from "../data/constants";
import { gem, techName } from "../lib/tech";
import Console from "./Console";
import PixelIcon from "./PixelIcon";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "side", label: "Side projects" },
  { id: "work", label: "At work" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

interface Item {
  p: Project;
  accent: number;
  locked: boolean;
  secret: boolean;
}

const isWork = (p: Project) => !p.github && !p.live;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FIRE_MS = 460;

interface Props {
  loaded: string | null;
  onLoad: (title: string | null) => void;
  unlocked: boolean;
  onUnlock: () => void;
}

/** Projects as cartridges on a spinning reel. Fire the one in front into the console. */
export default function Projects({ loaded, onLoad, unlocked, onUnlock }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  // `prev` lets each cartridge tell a one-step move (animate) from a wrap-around jump (don't).
  const [pos, setPos] = useState({ index: 0, prev: 0 });
  const [firing, setFiring] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lockedNotice, setLockedNotice] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const noticeTimer = useRef<number | undefined>(undefined);
  const swipe = useRef<{ x: number; moved: boolean } | null>(null);

  const list = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...PROJECTS.map((p, i) => ({ p, accent: i % 3, locked: false, secret: false })),
      // last in the reel, so on a wheel it sits right next to the first project
      { p: SECRET_PROJECT, accent: PROJECTS.length % 3, locked: !unlocked, secret: true },
    ];
    return all.filter(({ p, secret }) =>
      filter === "all" ? true : filter === "work" ? !secret && isWork(p) : secret || !isWork(p),
    );
  }, [filter, unlocked]);
  const n = list.length;
  const index = pos.index % n;
  const current = list[index];
  const busy = firing || spinning;

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const go = (next: number) => setPos((p) => ({ index: ((next % n) + n) % n, prev: p.index }));
  const step = (d: number) => setPos((p) => ({ index: (((p.index + d) % n) + n) % n, prev: p.index }));

  const offset = (i: number, from: number) => {
    let o = (((i - from) % n) + n) % n;
    if (o > n / 2) o -= n;
    return o;
  };

  const showConsole = () => consoleRef.current?.scrollIntoView({ block: "nearest" });

  const showLocked = () => {
    setLockedNotice(true);
    showConsole();
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setLockedNotice(false), 6000);
  };

  const fire = () => {
    if (busy || !current) return;
    if (current.locked) return showLocked();
    const title = current.p.title;
    const land = () => {
      setLockedNotice(false);
      onLoad(title);
      showConsole();
    };
    if (reducedMotion()) return land();
    setFiring(true);
    timers.current.push(
      window.setTimeout(() => {
        setFiring(false);
        land();
      }, FIRE_MS),
    );
  };

  /** Console buttons. They do their normal job and also count towards the cheat code. */
  const input = (key: CodeInput) => {
    const hit = SECRET_CODE[progress] === key;
    const next = hit ? progress + 1 : key === SECRET_CODE[0] ? 1 : 0;
    if (next === SECRET_CODE.length) {
      setProgress(0);
      onUnlock();
      return; // the final A unlocks instead of firing
    }
    setProgress(next);
    if (key === "left" && !busy) step(-1);
    if (key === "right" && !busy) step(1);
    if (key === "b") {
      setLockedNotice(false);
      onLoad(null);
    }
    if (key === "a") fire();
  };

  const spin = () => {
    if (busy || n < 2) return;
    const target = Math.floor(Math.random() * n);
    if (reducedMotion()) return go(target);
    // at least one full turn, slowing down like a roulette wheel
    const total = n + ((target - index + n) % n);
    setSpinning(true);
    let t = 0;
    for (let k = 1; k <= total; k++) {
      const done = k / total;
      t += 45 + 240 * done * done;
      timers.current.push(
        window.setTimeout(() => {
          step(1);
          if (k === total) setSpinning(false);
        }, t),
      );
    }
  };

  // Mouse wheel turns the reel. Needs a non-passive listener so the page doesn't scroll at the same time.
  const stepRef = useRef(step);
  const busyRef = useRef(busy);
  useEffect(() => {
    stepRef.current = step;
    busyRef.current = busy;
  });
  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;
    let acc = 0;
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (busyRef.current) return;
      acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const now = performance.now();
      if (Math.abs(acc) >= 40 && now - last > 150) {
        stepRef.current(acc > 0 ? 1 : -1);
        acc = 0;
        last = now;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipe.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    if (!s || busy) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 56) {
      step(dx < 0 ? 1 : -1);
      swipe.current = { x: e.clientX, moved: true };
    }
  };
  const onPointerUp = () => {
    // keep `moved` until the click that follows this pointerup has been handled
    window.setTimeout(() => (swipe.current = null), 0);
  };

  const keys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (busy) return;
    const actions: Record<string, () => void> = {
      ArrowLeft: () => step(-1),
      ArrowRight: () => step(1),
      Home: () => go(0),
      End: () => go(n - 1),
      Enter: fire,
      " ": fire,
    };
    const action = actions[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  };

  const loadedProject = loaded === SECRET_PROJECT.title ? SECRET_PROJECT : (PROJECTS.find((p) => p.title === loaded) ?? null);
  const loadedAccent = loadedProject ? (loadedProject === SECRET_PROJECT ? PROJECTS.length : PROJECTS.indexOf(loadedProject)) % 3 : 0;
  const hideFar = n <= 4 ? 1 : 2; // with few cartridges, only show direct neighbours
  const label = (item: Item) => (item.locked ? "Locked cartridge" : item.p.title);

  return (
    <>
      <Console
        ref={consoleRef}
        project={loadedProject}
        accent={loadedAccent}
        secret={loadedProject === SECRET_PROJECT}
        selected={current ? label(current) : ""}
        progress={progress}
        lockedNotice={lockedNotice}
        onInput={input}
      />

      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="btn btn-small"
            aria-pressed={filter === f.id}
            disabled={busy}
            onClick={() => {
              setFilter(f.id);
              setPos({ index: 0, prev: 0 });
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="reel-wrap">
        <button type="button" className="btn reel-arrow" onClick={() => !busy && step(-1)} aria-label="Previous cartridge">
          <PixelIcon name="arrow" px={3} className="flip-left" />
        </button>
        <div
          ref={reelRef}
          className={`reel${spinning ? " is-spinning" : ""}`}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Project cartridges. Left and right arrow keys turn the reel, Enter fires the cartridge in front into the console."
          aria-describedby="reel-status"
          onKeyDown={keys}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {list.map((item, i) => {
            const { p, accent, locked, secret } = item;
            const o = offset(i, index);
            const before = offset(i, pos.prev % n);
            const center = o === 0;
            return (
              <div
                key={p.title}
                className={[
                  "reel-item",
                  `cart accent-${accent}`,
                  center && "is-center",
                  Math.abs(o) > hideFar && "is-far",
                  Math.abs(o - before) > 2 && "is-jump",
                  center && firing && "is-firing",
                  p.title === loaded && "is-loaded",
                  locked && "is-locked",
                  secret && !locked && "is-secret",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--o": o, "--abs": Math.abs(o) } as CSSProperties}
                aria-hidden={!center}
                onClick={() => {
                  if (swipe.current?.moved || busy) return;
                  if (center) fire();
                  else go(i);
                }}
              >
                <article>
                  <p className="cart-top">
                    <span>{locked ? "????" : p.year}</span>
                    <span className="cart-tag">{secret ? "Secret" : isWork(p) ? "At work" : "Side project"}</span>
                  </p>
                  <h3 className="cart-label">{locked ? "???" : p.title}</h3>
                  {locked ? (
                    <div className="cart-gems cart-lock">
                      <PixelIcon name="lock" px={4} />
                      <span>Needs the 1986 cheat code</span>
                    </div>
                  ) : (
                    <ul className="cart-gems" aria-label="Built with">
                      {p.techStack.map((icon) => {
                        const name = techName(icon);
                        return (
                          <li key={icon}>
                            <span className="gem" style={{ background: gem(name) }} />
                            {name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className="cart-state">
                    {p.title === loaded ? "In the console" : center ? (locked ? "Fire it to find out more" : "Press Fire to load") : ""}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
        <button type="button" className="btn reel-arrow" onClick={() => !busy && step(1)} aria-label="Next cartridge">
          <PixelIcon name="arrow" px={3} />
        </button>
      </div>

      <div className="reel-bar">
        <p id="reel-status" className="reel-count" aria-live="polite">
          <span className="reel-num">
            {index + 1}/{n}
          </span>
          {current ? label(current) : ""}
        </p>
        <div className="reel-actions">
          <button type="button" className="btn" onClick={spin} disabled={busy || n < 2}>
            Spin
          </button>
          <button type="button" className="btn btn-fire" onClick={fire} disabled={busy}>
            <PixelIcon name="arrow" px={2} className="flip-up" />
            Fire
          </button>
        </div>
      </div>
      <p className="reel-hint">Scroll, swipe or use the arrow keys to turn the reel. Fire sends the cartridge in front into the console.</p>
    </>
  );
}
