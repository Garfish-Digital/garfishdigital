"use client";

import { useEffect, useRef } from "react";

// The hero's word entrance runs from page load, which is fine above the fold. Down
// here it would have finished long before anyone scrolled to it, so the same motion
// waits for the block to enter the viewport — the Gallery cards use the same gate.
//
// Delays are positional (line, word) so the two-line rhythm matches the hero:
// first word leads, second word lands late; the ampersand line comes in tighter.
const delays = [[0.4, 1.4], [0.7, 1.2]];

export default function Statement({ lines }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    element.classList.add("statement-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove("statement-pending");
        element.classList.add("statement-visible");
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} className="statement page-width" aria-label={lines.join(" ")}>
    <p className="statement-text" aria-hidden="true">
      {lines.map((line, lineIndex) => <span className="title-line" key={line}>
        {line.split(" ").map((word, index, words) => <span key={`${word}-${index}`}
          className="title-word" style={{ "--word-delay": `${delays[lineIndex]?.[index] ?? 0.4}s` }}>
          {word}{index < words.length - 1 ? " " : ""}
        </span>)}
      </span>)}
    </p>
  </section>;
}
