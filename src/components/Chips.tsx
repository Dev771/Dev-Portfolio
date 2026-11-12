import { gem } from "../lib/tech";

interface Props {
  items: string[];
  label: string;
  /** show the label above the chips instead of only to screen readers */
  showLabel?: boolean;
}

export default function Chips({ items, label, showLabel = false }: Props) {
  if (!items.length) return null;
  return (
    <div className="chips-block">
      {showLabel && <p className="chips-label">{label}</p>}
      <ul className="chips" aria-label={label}>
        {items.map((name) => (
          <li key={name} className="chip">
            <span className="gem" style={{ background: gem(name) }} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
