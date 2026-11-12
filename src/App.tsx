import { useCallback, useMemo, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SectionTitle from "./components/SectionTitle";
import Stats from "./components/Stats";
import Skyline from "./components/Skyline";
import Journey from "./components/Journey";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CommandPalette, { type Command } from "./components/CommandPalette";
import { PROFILE, PROJECTS, SECRET_PROJECT, SOCIAL_LINKS } from "./data/constants";
import { useKonami, usePaletteShortcut } from "./lib/keys";
import { useLiveData } from "./lib/live";
import { formatDate } from "./lib/stats";

const SECTIONS = [
  { id: "activity", label: "A year of commits" },
  { id: "journey", label: "The road so far" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Things I've built" },
  { id: "contact", label: "Say hello" },
];

// Unlocking the secret cartridge is remembered per browser. Storage can be blocked, so never rely on it.
const UNLOCK_KEY = "dev-portfolio:secret-cartridge";
const wasUnlocked = () => {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
};

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView();
  const heading = document.getElementById(`${id}-title`);
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
};

export default function App() {
  const { contributions, languages, live } = useLiveData();
  const updated = formatDate(contributions.days[contributions.days.length - 1].date);
  const [loaded, setLoaded] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(wasUnlocked);
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  const say = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    // longer messages stay up longer
    toastTimer.current = window.setTimeout(() => setToast(""), Math.max(2800, message.length * 70));
  }, []);

  const showConsole = () => document.querySelector(".console")?.scrollIntoView({ block: "center" });

  // The Konami code, entered on the console's D-pad or typed anywhere, opens the secret cartridge.
  const unlock = useCallback(() => {
    setUnlocked(true);
    try {
      localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      // private window or blocked storage: it stays unlocked for this visit only
    }
    setLoaded(SECRET_PROJECT.title);
    say(unlocked ? "Cheat code accepted. Loading the secret cartridge." : "Cheat code accepted. Secret cartridge unlocked.");
    showConsole();
  }, [say, unlocked]);

  useKonami(unlock);
  usePaletteShortcut(() => setPalette(true));

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      say("Email address copied.");
    } catch {
      window.location.href = SOCIAL_LINKS.email;
    }
  }, [say]);

  const commands = useMemo<Command[]>(
    () => [
      ...SECTIONS.map((s) => ({ id: `go-${s.id}`, group: "Go to", label: s.label, run: () => goTo(s.id) })),
      ...[...PROJECTS, ...(unlocked ? [SECRET_PROJECT] : [])].map((p, i) => ({
        id: `load-${i}`,
        group: "Load",
        label: p.title,
        run: () => {
          setLoaded(p.title);
          goTo("projects");
          showConsole();
        },
      })),
      { id: "copy-email", group: "Contact", label: "Copy my email address", run: copyEmail },
      { id: "write-email", group: "Contact", label: "Write me an email", run: () => (window.location.href = SOCIAL_LINKS.email) },
      { id: "linkedin", group: "Contact", label: "Open LinkedIn", run: () => window.open(SOCIAL_LINKS.linkedin, "_blank", "noreferrer") },
      { id: "github", group: "Contact", label: "Open GitHub", run: () => window.open(SOCIAL_LINKS.github, "_blank", "noreferrer") },
      {
        id: "secret",
        group: "Secret",
        label: unlocked ? "Load the secret cartridge (cheat code)" : "How do I open the locked cartridge? (cheat code)",
        run: () =>
          unlocked
            ? unlock()
            : (say("Enter the Konami code on the console: up, up, down, down, left, right, left, right, B, A."), goTo("projects"), showConsole()),
      },
    ],
    [copyEmail, say, unlock, unlocked],
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onOpenMenu={() => setPalette(true)} />
      <Hero />
      <main id="main">
        <section className="section container" id="activity" aria-labelledby="activity-title">
          <SectionTitle
            id="activity-title"
            title="A year of commits"
            note={`One building for each week, one lit window for each day I contributed. ${live ? "Live from GitHub" : "From a recent snapshot"}, updated ${updated}.`}
          />
          <Stats days={contributions.days} total={contributions.total} />
          <Skyline days={contributions.days} />
        </section>

        <section className="section container" id="journey" aria-labelledby="journey-title">
          <SectionTitle id="journey-title" title="The road so far" note="Pick a stage to read what I did there." />
          <Journey />
        </section>

        <section className="section container" id="stack" aria-labelledby="stack-title">
          <SectionTitle id="stack-title" title="Stack" />
          <Stack languages={languages} />
        </section>

        <section className="section container" id="projects" aria-labelledby="projects-title">
          <SectionTitle id="projects-title" title="Things I've built" note="Spin the reel, then fire a cartridge into the console." />
          <Projects loaded={loaded} onLoad={setLoaded} unlocked={unlocked} onUnlock={unlock} />
        </section>

        <section className="section container" id="contact" aria-labelledby="contact-title">
          <SectionTitle id="contact-title" title="Say hello" />
          <Contact />
        </section>
      </main>

      <footer className="footer container">
        <p>
          {PROFILE.name}, {new Date().getFullYear()}. {PROFILE.location}.
        </p>
        <p>
          Press <kbd>Ctrl</kbd> <kbd>K</kbd> for the menu.
        </p>
      </footer>

      <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} />
      <p className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </p>
    </>
  );
}
