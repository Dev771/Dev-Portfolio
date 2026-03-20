import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stack from "./components/Stack";
import GitHubActivity from "./components/GitHubActivity";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
// import Honors from "./components/Honors";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "light" : "dark"
    );
  };

  return (
    <div className="portfolio">
      <section className="hero-page">
        <Navbar dark={dark} onToggleTheme={toggleTheme} />
        <Hero />
      </section>
      <Stack />
      <GitHubActivity dark={dark} />
      <Experience />
      <Projects />
      <Education />
      {/* <Honors /> */}
      <Footer />
    </div>
  );
}

export default App;
