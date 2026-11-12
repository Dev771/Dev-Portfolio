import { useState } from "react";
import { PROFILE, SOCIAL_LINKS } from "../data/constants";
import PixelIcon from "./PixelIcon";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = SOCIAL_LINKS.email;
    }
  };

  return (
    <div className="frame contact">
      <p className="contact-text">
        The quickest way to reach me is email. I'm on LinkedIn and GitHub too.
      </p>
      <div className="contact-buttons">
        <a className="btn" href={SOCIAL_LINKS.email}>
          <PixelIcon name="mail" px={2} />
          {PROFILE.email}
        </a>
        <button type="button" className="btn" onClick={copy}>
          {copied ? "Copied" : "Copy email"}
        </button>
        <a className="btn" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
          <PixelIcon name="card" px={2} />
          LinkedIn
        </a>
        <a className="btn" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
          <PixelIcon name="code" px={2} />
          GitHub
        </a>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </p>
    </div>
  );
}
