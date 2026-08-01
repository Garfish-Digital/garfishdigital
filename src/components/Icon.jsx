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

export default function Icon({
  name,
  size = 24,
  title,
  className = "",
  strokeWidth = 2,
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
