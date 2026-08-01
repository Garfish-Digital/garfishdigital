# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a three-page portfolio site for a boutique web design and development studio. The studio is positioned toward dark-luxury aesthetics for edgier client verticals (heavy metal bands, combat sports, tattoo studios). The visual language is Brutalist — pure black ground, monospace type throughout, intentionally minimal information density, and a single distinctive UX moment: the Gallery's sliding-grid demo navigator.

## Development Commands

- `npm run dev` — Development server (http://localhost:3000)
- `npm run build` — Production build
- `npm run start` — Serve a production build
- `npm run lint` — ESLint

**Never run `npm run build` while `npm run dev` is running.** Both write to `.next` and the result can be a corrupted build directory. Stop the dev server first. When stopping a server, kill it by port (`lsof -ti:3000`), never with a broad `pkill`.

## Architecture

### Tech Stack
- **Framework**: Next.js 15, App Router
- **UI**: React 19
- **Language**: JavaScript — no TypeScript
- **Styling**: Tailwind CSS v4, with an `rgb()` custom-property palette wired in via `@theme inline`
- **Animations**: Framer Motion, plus a CSS line-draw system
- **Icons**: inline SVG in `src/components/Icon.jsx` — **no icon library**
- **Fonts**: Courier Prime, self-hosted from `public/fonts/` (`@font-face` in `globals.css`, two latin faces preloaded in `layout.jsx`); Courier New fallback
- **Forms**: Netlify Forms
- **Hosting**: Netlify (`netlify.toml`, `@netlify/plugin-nextjs`)

The site makes **zero third-party requests** at runtime, and the build requires **no environment variables**. Preserve both properties — they're deliberate, and the privacy policy depends on the first.

### Project Structure
```
src/
├── app/
│   ├── layout.jsx          Root layout — metadata, fonts, favicons, JSON-LD; mounts MotionProvider + Header
│   ├── page.jsx            Home
│   ├── not-found.jsx       404
│   ├── globals.css         Palette, @font-face, line-draw, shared styles
│   ├── robots.js           /robots.txt
│   ├── sitemap.js          /sitemap.xml
│   ├── gallery/
│   │   ├── layout.jsx      Route metadata
│   │   ├── page.jsx        Sliding-grid demo navigator
│   │   └── gallery.css
│   └── contact/
│       ├── layout.jsx      Route metadata
│       ├── page.jsx        Netlify form + legal modals
│       └── contact.css
├── components/
│   ├── Navigation.jsx      Top-right nav; desktop text / mobile hamburger
│   ├── Logo.jsx            Fixed top-left wordmark (mounted per page, not in root layout)
│   ├── Header.jsx          100px transparent backdrop-blur strip on non-home routes
│   ├── Minimap.jsx         Gallery navigator widget
│   ├── FishMark.jsx        The gar as inline stroke paths, for line-draw
│   ├── Icon.jsx            Inline SVG icon set
│   └── MotionProvider.jsx  <MotionConfig reducedMotion="user">
└── config/
    └── navigation.js       Nav items and helpers
```

### Pages
- **Home** (`/`) — Brutalist typographic landing. Wordmark top-left, tagline stack, one CTA (`see the work →`), and the gar line-drawing itself in bottom-right as an inert decorative mark.
- **Gallery** (`/gallery`) — Five-position sliding viewport showing four demo cards, driven by the Minimap.
- **Contact** (`/contact`) — Three fields. Netlify Forms; success modal auto-dismisses to home after 3s. Instagram glyph bottom-right.

### Gallery Mechanic (non-obvious — read before editing)
A `300vw × 300vh` 3×3 CSS grid that translates under a fixed-viewport `gallery-wrapper`. Only **5 of the 9 cells** have content: the four corners and the center. The other four (middle-edge) cells are intentionally empty — they show as black space during diagonal slides, which reads as atmospheric.

Cell IDs are semantic: `upperLeft`, `upperRight`, `center`, `lowerLeft`, `lowerRight`. The current cell is tracked in React state and applied as a CSS class (`gallery-grid-${currentPage}`); each class sets a different `transform: translate(...)`.

Navigation is mouse-only via the Minimap — no number or arrow keys. ESC closes the techniques modal that opens from each demo card.

### Minimap Design
A 150×150 fixed widget with five buttons: four corner squares separated by a thin cross-shaped gap, and one circular center button. A ring overlay (a circle in the minimap frame color) visually carves a quarter-circle out of each corner square's inner corner, and absorbs clicks in the gap so users can't trigger a corner button by clicking visually empty space.

States: white when active, cyan-light on hover, dim green once visited (session-level, resets on reload), black at rest. No icons inside the buttons. The widget's screen position shifts via `getMinimapPosition` so it never covers the active demo card.

### Color System
Roughly thirty `rgb()` custom properties are defined at the top of `src/app/globals.css` and exposed to Tailwind through `@theme inline`. **There is no OKLCH in this codebase** — an earlier version of this file claimed otherwise.

Reference the variables directly rather than using Tailwind palette names, so everything stays on one system:

```jsx
className="text-[color:var(--color-gray-light)] bg-[color:var(--color-black)]"
```

Two conventions worth preserving:
- `--black` is pure `rgb(0, 0, 0)`. This is deliberate — on OLED it switches pixels off, and it matches `theme-color` and the manifest's `background_color`.
- The green cast that gives the palette its character lives in the **greys** (`--gray-light` is `rgb(161, 171, 161)`, `--gray-dark` is `rgb(78, 88, 78)` — both +10 green). Don't move it into the black; at near-zero luminance a hue shift is imperceptible.

`html, body` carry the black background in `globals.css`. Without it, overscroll areas and the strip beneath Android's system nav bar fall back to the browser default. `viewport-fit=cover` in the viewport meta lets the page paint under those bars.

### Icons
`src/components/Icon.jsx` holds every icon as inline SVG on a 24×24 grid at stroke-width 2. Geometry is from [Lucide](https://lucide.dev) (MIT), copied in rather than installed.

```jsx
<Icon name="flask" size={32} title="how we built this" className="text-white" />
```

Color comes from `currentColor`. To add an icon, add an entry to the `paths` object — don't install a package. Font Awesome was removed from this project (the Pro registry token expired and wasn't renewed); do not reintroduce it.

### Line-Draw Animations
`.line-draw` in `globals.css` animates `stroke-dashoffset` so strokes draw themselves in. Two requirements:

1. Every shape inside must carry `pathLength="1"`, so one dash length covers it regardless of the path's true length.
2. CSS animations run on the **document timeline**, not on a Framer Motion parent's schedule. If the element also fades in on a delay, set `--draw-delay` to match — otherwise the shape draws itself while still invisible.

```jsx
<div style={{ "--draw-delay": "2.2s" }}>
  <FishMark />
</div>
```

`MotionProvider` wraps the app in `<MotionConfig reducedMotion="user">`, which governs Framer Motion only. The line-draw carries its own `prefers-reduced-motion` guard, and `gallery.css` has one for the grid slide.

### Navigation System
- All nav items are defined in `src/config/navigation.js`.
- Three items: Home, Gallery, Contact.
- Desktop renders a horizontal text nav; mobile renders an animated hamburger that drops a styled menu. The nav is **text-only** — items carry no icons.
- The active item is auto-detected from `usePathname()` when `currentPage` isn't passed.

### Metadata
Root metadata lives in `src/app/layout.jsx`; per-route titles and descriptions live in `gallery/layout.jsx` and `contact/layout.jsx`. Those thin layouts exist **because the page components are client components and can't export metadata themselves** — don't try to move metadata into the pages.

The title template is `"Garfish Digital | %s"`, brand first, so the brand survives tab truncation.

`layout.jsx` currently renders a manual `<head>` element holding the viewport, theme-color and favicon links. App Router isn't designed for this — those belong in the `metadata.icons` object and the separate `viewport` export. It works today, but it's the first place to look if titles or icons ever go missing.

### Contact Form
- Three fields: `name`, `email` (both required) and `business` (optional, labelled "Your project (optional)" in the UI).
- Honeypot field `bot-field` for Netlify spam filtering.
- `public/__forms.html` is a static schema declaring the fields Netlify expects at build time. **Keep it in sync whenever fields change**, or submissions will be rejected.
- `validateField()` exists in `contact/page.jsx` but is not wired into the rendered UI — a leftover from when the form had a message textarea. Kept for possible future use.
- Submission only works on a Netlify deploy. Local `POST /__forms.html` returns 500 — expected, not a bug.

### Brand Assets
Two-tier identity. Don't collapse them into one asset:

- **The logo** — `public/Garfish-Logo-Master.svg`, the full gar. Pure stroke paths, no fills, so it can be recolored and line-draw animated. Fine linework at `stroke-width 2` on a 415×88 canvas, so it **must not be reproduced below about 200px wide.**
- **The icon** — the solid cyan fin mark, used for `favicon.svg`, `favicon.ico`, the app icons and the launcher. A filled shape with no hairlines, so it survives to 16px. The manifest declares it at both `any` and `maskable` purposes.

`og-image.png` is 1200×630 PNG (not JPG — the art is flat two-color, where PNG is both smaller and lossless).

## Development Notes

- Page components and anything using hooks need `'use client'`.
- Adding a nav item means editing `src/config/navigation.js`: the `navigationItems` array, its sort order, and `pageToNavMap` inside `getActiveNavigationItem`.
- Route-specific styles sit beside their page (`gallery.css`, `contact.css`); shared styles belong in `globals.css`.
- The gallery links to four live external demos. If one is swapped, update the card data in `gallery/page.jsx`, the `techData` entry, the Minimap `aria-label`, and the enumerated verticals in the `gallery/layout.jsx` description.
