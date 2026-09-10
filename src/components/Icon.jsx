/**
 * Inline SVG icons — replaces the Font Awesome dependency.
 *
 * Geometry from Lucide (MIT, lucide.dev), traced on a 24×24 grid at stroke-width 2.
 * Inlined rather than installed so the build carries no icon dependency and no
 * private registry, matching how the fonts are self-hosted.
 *
 * Colour comes from `currentColor`, so callers style these with text utilities
 * exactly as they did the Font Awesome components.
 */

const paths = {
  mail: <><rect pathLength="1" x="2" y="4" width="20" height="16" rx="2" /><path pathLength="1" d="m2 6 10 7 10-7" /></>,
  linkedin: <><rect pathLength="1" x="2" y="2" width="20" height="20" rx="2" /><path pathLength="1" d="M7 10v7M7 7h.01" /><path pathLength="1" d="M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
  // techniques modal trigger — "how we built this"
  flask: (
    <>
      <path pathLength="1" d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path pathLength="1" d="M8.5 2h7" />
      <path pathLength="1" d="M7 16h10" />
    </>
  ),
  // leaves the site for a live demo
  externalLink: (
    <>
      <path pathLength="1" d="M15 3h6v6" />
      <path pathLength="1" d="M10 14 21 3" />
      <path pathLength="1" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
    </>
  ),
  // the demo opens in its own window
  window: (
    <>
      <rect pathLength="1" x="2" y="4" width="20" height="16" rx="2" />
      <path pathLength="1" d="M2 9h20" />
      <path pathLength="1" d="M6 6.5h.01" />
      <path pathLength="1" d="M9.5 6.5h.01" />
    </>
  ),
  instagram: (
    <>
      <rect pathLength="1" x="2" y="2" width="20" height="20" rx="5" />
      <circle pathLength="1" cx="12" cy="12" r="4" />
      <path pathLength="1" d="M17.5 6.5h.01" />
    </>
  ),
};

/**
 * Solid counterparts for the footer marks, on the same 24×24 grid.
 *
 * These are filled shapes, not strokes — matching the fin mark, which is the only
 * other icon in the identity and is deliberately a solid with no hairlines. Each is
 * one path whose subpaths knock holes through under `evenodd`: an outer shape, then
 * the detail. That keeps every mark a single filled silhouette, so the three read as
 * one family rather than a UI icon sitting next to two logos.
 *
 * Both brand marks are frames — an outer rounded square with the tile interior knocked
 * out — so they carry matched ink and each keeps its official silhouette. LinkedIn as a
 * filled tile reads far heavier than Instagram's open camera and unbalances the row; an
 * inverted Instagram balances it but departs too far from the real mark. The envelope
 * stays a solid, which is correct: it is a UI icon, not a logo.
 */
const solidPaths = {
  mail:
    "M4.5 4.5H19.5A2.5 2.5 0 0 1 22 7V17A2.5 2.5 0 0 1 19.5 19.5H4.5A2.5 2.5 0 0 1 2 17V7A2.5 2.5 0 0 1 4.5 4.5Z" +
    "M4.2 7.2L12 12.8L19.8 7.2V9L12 14.6L4.2 9Z",
  linkedin:
    "M6.5 2H17.5A4.5 4.5 0 0 1 22 6.5V17.5A4.5 4.5 0 0 1 17.5 22H6.5A4.5 4.5 0 0 1 2 17.5V6.5A4.5 4.5 0 0 1 6.5 2Z" +
    "M7.3 4.3H16.7A3 3 0 0 1 19.7 7.3V16.7A3 3 0 0 1 16.7 19.7H7.3A3 3 0 0 1 4.3 16.7V7.3A3 3 0 0 1 7.3 4.3Z" +
    "M6.1 9.8H8.4A0.2 0.2 0 0 1 8.6 10V17.2A0.2 0.2 0 0 1 8.4 17.4H6.1A0.2 0.2 0 0 1 5.9 17.2V10A0.2 0.2 0 0 1 6.1 9.8Z" +
    "M5.6 6.9A1.65 1.65 0 1 0 8.9 6.9A1.65 1.65 0 1 0 5.6 6.9Z" +
    "M10.6 17.4V9.8H13.1V10.7C13.6 10 14.6 9.6 15.7 9.6C17.6 9.6 18.1 10.9 18.1 12.9V17.4" +
    "H15.6V13.4C15.6 12.5 15.4 11.8 14.5 11.8C13.7 11.8 13.1 12.4 13.1 13.5V17.4Z",
  instagram:
    "M8 2H16A6 6 0 0 1 22 8V16A6 6 0 0 1 16 22H8A6 6 0 0 1 2 16V8A6 6 0 0 1 8 2Z" +
    "M8.8 4.6H15.2A4.2 4.2 0 0 1 19.4 8.8V15.2A4.2 4.2 0 0 1 15.2 19.4H8.8A4.2 4.2 0 0 1 4.6 15.2V8.8A4.2 4.2 0 0 1 8.8 4.6Z" +
    "M7 12A5 5 0 1 0 17 12A5 5 0 1 0 7 12Z" +
    "M9.4 12A2.6 2.6 0 1 0 14.6 12A2.6 2.6 0 1 0 9.4 12Z" +
    "M16.15 6.6A1.25 1.25 0 1 0 18.65 6.6A1.25 1.25 0 1 0 16.15 6.6Z",
};

export default function Icon({
  name,
  size = 24,
  title,
  className = "",
  strokeWidth = 2,
  solid = false,
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={solid ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {solid ? <path fillRule="evenodd" clipRule="evenodd" d={solidPaths[name]} /> : paths[name]}
    </svg>
  );
}
