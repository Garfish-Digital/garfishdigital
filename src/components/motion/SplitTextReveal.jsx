// Original service-statement entrance: fade from the left with deliberate word timing.
// CSS starts before hydration, avoiding the visible-to-hidden flash of effect-driven motion.
const originalDelays = { web: 0.4, design: 1.4, "&": 0.7, development: 1.2 };

export default function SplitTextReveal({ lines }) {
  return <h1 className="hero-title" aria-label={lines.join(" ")}>
    {lines.map((line) => <span className="title-line" aria-hidden="true" key={line}>
      {line.split(" ").map((word, index, words) => <span key={`${word}-${index}`}
        className="title-word" style={{ "--word-delay": `${originalDelays[word] ?? 0.4}s` }}>
        {word}{index < words.length - 1 ? "\u00a0" : ""}
      </span>)}
    </span>)}
  </h1>;
}
