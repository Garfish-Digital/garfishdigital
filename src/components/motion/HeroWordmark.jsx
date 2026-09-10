// The wordmark was previously two vector outlines of a monospace face, revealed by
// clipping each row. Its glyphs sat on an exact 17-unit grid across a 119-unit
// viewBox — seven characters per row at Courier's 0.6em advance — so the same mark
// renders as live Courier Prime 700 text. Real text keeps it selectable and lets
// every letter carry its own entrance.
//
// Sizing is derived from the old SVG: font-size = 0.2381 × the previous rendered
// width, and the 31-unit row pitch becomes a 1.094 line-height. See globals.css.
const rows = ["Garfish", "Digital"];

// One continuous stagger across both rows, so the mark arrives as a single sweep.
let cursor = 0;
const letters = rows.map((row) => {
  const start = cursor;
  cursor += row.length;
  return { row, start };
});

export default function HeroWordmark() {
  return (
    <div className="hero-wordmark" role="img" aria-label={rows.join(" ")}>
      {letters.map(({ row, start }) => (
        <span className="wordmark-row" key={row} aria-hidden="true">
          {[...row].map((character, index) => (
            <span
              className="wordmark-letter"
              key={`${row}-${index}`}
              style={{ "--letter-index": start + index }}
            >
              {character}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
