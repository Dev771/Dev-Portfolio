interface Props {
  id: string;
  title: string;
  note?: string;
}

export default function SectionTitle({ id, title, note }: Props) {
  return (
    <div className="section-title">
      <h2 id={id}>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}
