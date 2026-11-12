import { PROFILE } from "../data/constants";
import NightSky from "./NightSky";
import PixelIcon from "./PixelIcon";

const MENU = [
  { href: "#projects", label: "See my projects" },
  { href: "#journey", label: "Read my story so far" },
  { href: "#contact", label: "Say hello" },
];

const HERO_SKY = ["#0B0A1C", "#0E0C24", "#110F2B", "#151233", "#1A163E"];

export default function Hero() {
  return (
    <header className="hero" id="top">
      <NightSky bands={HERO_SKY} stars={56} seed={11} />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-role">{PROFILE.role}</p>
          <h1 className="hero-name">{PROFILE.name}</h1>
          <p className="hero-tagline">{PROFILE.tagline}</p>
          <ul className="start-menu" aria-label="Jump to">
            {MENU.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <PixelIcon name="arrow" px={3} className="selector" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <img
          className="hero-sprite"
          src="/sprite.png"
          width={51}
          height={61}
          alt="Pixel-art Dev in a black cap and a yellow T-shirt, holding a laptop"
        />
      </div>
    </header>
  );
}
