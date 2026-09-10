import HeroWordmark from "../components/motion/HeroWordmark";
import SplitTextReveal from "../components/motion/SplitTextReveal";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import ScrollBrand from "../components/ScrollBrand";

export default function Home() {
  return <>
    <a className="skip-link" href="#gallery">Skip to selected work</a>
    <main>
      <section id="home" className="hero page-width" aria-label="Garfish Digital — web design and development">
        <HeroWordmark />
        <div className="hero-statement"><SplitTextReveal lines={["web design", "& development"]} />
          <div className="hero-note">
          </div>
        </div>
      </section>
      <Gallery />
      <Contact />
    </main>
    <ScrollBrand />
  </>;
}
