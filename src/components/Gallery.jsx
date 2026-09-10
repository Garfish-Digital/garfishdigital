"use client";

import Image from "next/image";
import Icon from "./Icon";
import { useEffect, useRef } from "react";

const projects = [
  { slug: "portage-place", title: "Portage Place", type: "Client build", field: "Community & workspace",
    url: "https://portageplacesb.com", description: "A welcoming village workspace for a South Bend business community." },
  { slug: "veilburner", title: "Veilburner", type: "Client build", field: "Music & culture",
    url: "https://veilburner.band", description: "An atmospheric presence for an avant-garde metal band.." },
  { slug: "black-lodge-brews", title: "Black Lodge Brews", type: "Demo concept", field: "Hospitality",
    url: "https://black-lodge-brews.netlify.app", description: "A brewery and taproom concept with a mystical character." },
  { slug: "the-scrap-pit", title: "The Scrap Pit", type: "Demo concept", field: "Combat sports",
    url: "https://the-scrap-pit.netlify.app", description: "An MMA gym concept built around the intensity of the sport." },
];

function Project({ project, index }) {
  const ref = useRef(null);
  // The clipping reveal is only worth playing over a decoded image — otherwise it
  // wipes open on an empty frame. Both conditions have to land before it runs.
  const inView = useRef(false);
  const imageReady = useRef(false);
  const timer = useRef(null);

  function reveal() {
    if (!inView.current || !imageReady.current) return;
    clearTimeout(timer.current);
    ref.current?.classList.remove("reveal-pending");
    ref.current?.classList.add("revealed");
  }
  function handleImageSettled() {
    imageReady.current = true;
    reveal();
  }

  useEffect(() => {
    const element = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        inView.current = true;
        // Never let a stalled or blocked image keep the copy hidden.
        timer.current = setTimeout(() => { imageReady.current = true; reveal(); }, 3000);
        reveal();
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => { observer.disconnect(); clearTimeout(timer.current); };
  }, []);
  return <article ref={ref} className="project" style={{ "--reveal-delay": `${index % 2 * 100}ms` }}>
    <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer"
      aria-label={`${project.title} — visit live site (opens in a new tab)`}>
      <div className="project-image-frame">
        {/* Stays lazy on purpose: `priority`/`loading="eager"` both make Next emit a
            <link rel="preload"> for a below-the-fold image, competing with the hero.
            The browser's lazy lookahead starts the fetch well before the card lands,
            and the reveal gate below covers the case where it hasn't finished. */}
        <Image src={`/projects/${project.slug}.webp`} alt={`${project.title} website preview`}
          width={1440} height={1000} sizes="(max-width: 767px) 90vw, 41vw" className="project-image"
          onLoad={handleImageSettled} onError={handleImageSettled} />
        <span className="project-visit">Visit live site <Icon name="externalLink" size={16} /></span>
      </div>
      <div className="project-meta"><span>{project.type}</span>
      {/* <span>{project.field}</span> */}
      </div>
      <h3>{project.title}
        {/* <span aria-hidden="true">↗</span> */}
        </h3>
    </a>
    <p className="project-description">{project.description}</p>
  </article>;
}

export default function Gallery() {
  return <section id="gallery" className="gallery-section page-width" aria-labelledby="gallery-title">
    <div className="section-intro"><div><p className="eyebrow">01 / Gallery</p><h2 id="gallery-title">Selected work.</h2></div>
      {/* <p>Different worlds.<br />The same attention to detail.</p> */}
      </div>
    <div className="project-grid">{projects.map((project, index) => <Project key={project.slug} project={project} index={index} />)}</div>
  </section>;
}
