import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import PixelIcon from "./PixelIcon";

export interface Command {
  id: string;
  group: string;
  label: string;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

/** Ctrl+K menu: type to filter, arrows to move, Enter to run. Built on <dialog> for focus and Esc handling. */
export default function CommandPalette({ open, onClose, commands }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      input.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const matches = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands.filter((c) => words.every((w) => `${c.group} ${c.label}`.toLowerCase().includes(w)));
  }, [commands, query]);

  const activeId = matches[active]?.id;
  useEffect(() => {
    if (activeId) document.getElementById(`cmd-${activeId}`)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const close = () => {
    setQuery("");
    setActive(0);
    onClose();
  };

  const run = (c: Command | undefined) => {
    if (!c) return;
    close();
    // let the dialog close and focus return before the command scrolls or opens anything
    requestAnimationFrame(() => c.run());
  };

  const keys = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (matches.length ? (i + step + matches.length) % matches.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(matches[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Command menu"
      onClose={close}
      onClick={(e) => e.target === dialog.current && close()}
    >
      <div className="palette-inner">
        <label className="palette-search">
          <PixelIcon name="arrow" px={3} className="palette-caret" />
          <span className="sr-only">Type a command</span>
          <input
            ref={input}
            value={query}
            placeholder="Type a command or search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={matches[active] ? `cmd-${matches[active].id}` : undefined}
            aria-autocomplete="list"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={keys}
          />
        </label>
        <ul id="palette-list" className="palette-list" role="listbox" aria-label="Commands">
          {matches.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? "is-active" : undefined}
              onMouseMove={() => setActive(i)}
              onClick={() => run(c)}
            >
              <span className="palette-group">{c.group}</span>
              <span>{c.label}</span>
            </li>
          ))}
          {!matches.length && <li className="palette-none">No command matches “{query}”.</li>}
        </ul>
        <p className="palette-keys" aria-hidden="true">
          ↑↓ to move, Enter to run, Esc to close
        </p>
      </div>
    </dialog>
  );
}
