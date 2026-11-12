import { forwardRef, type ReactNode } from "react";
import { SECRET_CODE, type CodeInput, type Project } from "../data/constants";
import { techName } from "../lib/tech";
import Chips from "./Chips";
import PixelIcon from "./PixelIcon";

interface Props {
  project: Project | null;
  accent: number;
  secret: boolean;
  /** title of the cartridge the reel is pointing at, for the A button's label */
  selected: string;
  /** how many inputs of the cheat code are right so far */
  progress: number;
  /** the locked cartridge was fired: explain how to open it */
  lockedNotice: boolean;
  onInput: (input: CodeInput) => void;
}

const GLYPH: Record<CodeInput, ReactNode> = {
  up: <PixelIcon name="arrow" px={2} className="flip-up" />,
  down: <PixelIcon name="arrow" px={2} className="flip-down" />,
  left: <PixelIcon name="arrow" px={2} className="flip-left" />,
  right: <PixelIcon name="arrow" px={2} />,
  b: "B",
  a: "A",
};

/** A pixel games console. The reel feeds it cartridges; the D-pad and A/B buttons work, and know a cheat code. */
const Console = forwardRef<HTMLDivElement, Props>(function Console(
  { project, accent, secret, selected, progress, lockedNotice, onInput },
  ref,
) {
  return (
    <div ref={ref} className={`frame console${project ? ` is-on accent-${accent}` : ""}${secret ? " is-secret" : ""}`}>
      <div className="console-body">
        <div className="screen" id="console-screen">
          {lockedNotice ? (
            <div className="screen-content screen-locked" key="locked">
              <p className="screen-insert">
                <PixelIcon name="lock" px={3} />
                Locked
              </p>
              <p className="screen-hint">This cartridge needs a cheat code from 1986. Try it on the D-pad and the B and A buttons.</p>
            </div>
          ) : project ? (
            <div className="screen-content" key={project.title}>
              <p className="screen-meta">
                <span>{project.year}</span>
                {secret ? <span>Secret cartridge</span> : !project.github && !project.live && <span>Built at work, code is private</span>}
              </p>
              <h3 className="screen-title">{project.title}</h3>
              <p className="screen-desc">{project.description}</p>
              {project.notes && (
                <ul className="screen-notes">
                  {project.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
              <Chips items={project.techStack.map(techName)} label="Built with" />
              <div className="screen-links">
                {project.github && (
                  <a className="btn btn-small" href={project.github} target="_blank" rel="noreferrer">
                    <PixelIcon name="code" px={2} />
                    {secret ? "Read the source" : "Code"}
                    <span className="sr-only"> for {project.title} on GitHub</span>
                  </a>
                )}
                {project.live && (
                  <a className="btn btn-small btn-live" href={project.live} target="_blank" rel="noreferrer">
                    <PixelIcon name="globe" px={2} />
                    Live site<span className="sr-only"> of {project.title}</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="screen-empty">
              <p className="screen-insert">
                <PixelIcon name="arrow" px={3} className="blinker" />
                Insert a cartridge
              </p>
              <p className="screen-hint">Spin the reel below, then press Fire.</p>
            </div>
          )}

          {progress > 0 && (
            <div className="code-meter" aria-hidden="true">
              <span className="code-label">Code</span>
              {SECRET_CODE.map((input, i) => (
                <span key={i} className={`code-slot${i < progress ? " is-hit" : ""}`}>
                  {i < progress ? GLYPH[input] : null}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="controls">
          <div className="dpad">
            <button type="button" className="d-up" onClick={() => onInput("up")} aria-label="Up" />
            <button type="button" className="d-left" onClick={() => onInput("left")} aria-label="Previous cartridge" />
            <span className="d-mid" aria-hidden="true" />
            <button type="button" className="d-right" onClick={() => onInput("right")} aria-label="Next cartridge" />
            <button type="button" className="d-down" onClick={() => onInput("down")} aria-label="Down" />
          </div>
          <div className="ab-wrap">
            <div className="ab">
              <button type="button" className="ab-b" onClick={() => onInput("b")} aria-label="B: eject">
                B
              </button>
              <button type="button" className="ab-a" onClick={() => onInput("a")} aria-label={`A: fire, loads ${selected}`}>
                A
              </button>
            </div>
            <p className="ab-legend" aria-hidden="true">
              B eject, A fire
            </p>
          </div>
        </div>
      </div>
      <div className="console-slot" aria-hidden="true">
        <span className="console-cart" />
      </div>
      <p className="sr-only" aria-live="polite">
        {lockedNotice
          ? "Locked. This cartridge needs a cheat code from 1986, entered on the D-pad and the B and A buttons."
          : progress > 0
            ? `Cheat code: ${progress} of ${SECRET_CODE.length} right.`
            : project
              ? `${project.title} loaded in the console.`
              : ""}
      </p>
    </div>
  );
});

export default Console;
