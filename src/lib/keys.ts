import { useEffect, useRef } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/** Calls `onUnlock` when someone types the Konami code anywhere on the page. */
export function useKonami(onUnlock: () => void) {
  const latest = useRef(onUnlock);
  useEffect(() => {
    latest.current = onUnlock;
  });
  useEffect(() => {
    let step = 0;
    const onKey = (e: KeyboardEvent) => {
      if (typing(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[step]) {
        step += 1;
        if (step === KONAMI.length) {
          step = 0;
          latest.current();
        }
      } else {
        step = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Ctrl+K / Cmd+K anywhere, or "/" when not typing, opens the command menu. */
export function usePaletteShortcut(open: () => void) {
  const latest = useRef(open);
  useEffect(() => {
    latest.current = open;
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const combo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !typing(e.target);
      if (combo || slash) {
        e.preventDefault();
        latest.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
