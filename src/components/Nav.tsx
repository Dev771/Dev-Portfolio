const LINKS = [
  { href: "#activity", label: "Activity" },
  { href: "#journey", label: "Journey" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <nav className="nav" aria-label="Main">
      <div className="container nav-inner">
        <a className="nav-home" href="#top">
          <img src="/favicon.png" alt="" width={28} height={28} />
          <span>Dev Garg</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-small nav-menu" onClick={onOpenMenu} aria-keyshortcuts="Control+K Meta+K">
          Menu
          <kbd className="nav-kbd">Ctrl K</kbd>
        </button>
      </div>
    </nav>
  );
}
