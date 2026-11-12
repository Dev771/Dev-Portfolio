import type { Day } from "../lib/live";
import { formatDate, summary } from "../lib/stats";
import PixelIcon, { type IconName } from "./PixelIcon";

export default function Stats({ days, total }: { days: Day[]; total: number }) {
  const s = summary(days);
  const items: { icon: IconName; color: string; value: string; label: string }[] = [
    { icon: "coin", color: "var(--mustard)", value: total.toLocaleString("en-US"), label: "contributions in the last year" },
    {
      icon: "flame",
      color: "var(--orange)",
      value: `${s.current} ${s.current === 1 ? "day" : "days"}`,
      label: `streak right now, best is ${s.longest}`,
    },
    { icon: "calendar", color: "var(--lavender)", value: `${s.active}/${days.length}`, label: "days with a contribution" },
    { icon: "trophy", color: "var(--green)", value: `${s.busiest.count}`, label: `on my busiest day, ${formatDate(s.busiest.date)}` },
  ];

  return (
    <div className="frame stats">
      <ul className="stats-list">
        {items.map((item) => (
          <li key={item.icon} className="stat">
            <PixelIcon name={item.icon} px={3} color={item.color} />
            <span className="stat-value">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
