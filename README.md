# Garfish Digital

Portfolio site for a boutique web design and development studio. Three pages — a
typographic landing page, a gallery that showcases four live client demos through a
sliding-grid navigator, and a short contact form.

Live at [garfishdigital.com](https://garfishdigital.com).

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | JavaScript — no TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Type | Courier Prime, self-hosted |
| Icons | Inline SVG — no icon dependency |
| Forms | Netlify Forms |
| Hosting | Netlify |

The site makes **zero third-party requests** at runtime. Fonts are self-hosted, icons
are inline, and there is no analytics or tracking of any kind.

## Requirements

- Node `^18.18.0 || ^19.8.0 || >=20.0.0`
- npm

No environment variables are needed — `npm install` and the build run without secrets.

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |

Don't run `npm run build` while `npm run dev` is running — both write to `.next`, and
the result can be a corrupted build directory. Stop the dev server first.

## Project structure

```
src/
├── app/
│   ├── layout.jsx            Root layout — metadata, fonts, favicons, JSON-LD
│   ├── page.jsx              Home
│   ├── not-found.jsx         404
│   ├── globals.css           Palette, @font-face, shared styles
│   ├── robots.js             /robots.txt
│   ├── sitemap.js            /sitemap.xml
│   ├── gallery/
│   │   ├── layout.jsx        Route metadata
│   │   ├── page.jsx          Sliding-grid demo navigator
│   │   └── gallery.css
│   └── contact/
│       ├── layout.jsx        Route metadata
│       ├── page.jsx          Netlify form + legal modals
│       └── contact.css
├── components/
│   ├── Navigation.jsx        Desktop text nav / mobile hamburger
│   ├── Logo.jsx              Fixed wordmark, top left
│   ├── Header.jsx            Blur strip on non-home routes
│   ├── Minimap.jsx           Gallery navigator widget
│   ├── FishMark.jsx          The gar, inline, for line-draw animation
│   ├── Icon.jsx              Inline SVG icon set
│   └── MotionProvider.jsx    Framer Motion reduced-motion config
└── config/
    └── navigation.js         Nav items and helpers
```

## How it works

A few parts are non-obvious. Read this before editing them.

### The gallery

A `300vw × 300vh` 3×3 CSS grid that translates beneath a fixed-viewport wrapper.
**Only five of the nine cells hold content** — the four corners and the centre. The
four middle-edge cells are deliberately empty; they flash as black space during
diagonal slides, which reads as atmosphere rather than as a gap.

Cell IDs are semantic: `upperLeft`, `upperRight`, `center`, `lowerLeft`, `lowerRight`.
The active cell lives in React state and is applied as a class,
`gallery-grid-${currentPage}`; each class sets a different `transform: translate(...)`.

Navigation is mouse-only, via the minimap — there are no arrow or number key bindings.
`ESC` closes the techniques modal that opens from each card.

The four demos on the wall:

- [Black Lodge Brews](https://black-lodge-brews.netlify.app) — micro brewery taproom
- [Inferno Ink](https://inferno-ink.netlify.app) — tattoo and body modification shop
- [Veilburner](https://veilburner.band) — avant-garde metal band
- [The Scrap Pit](https://the-scrap-pit.netlify.app) — MMA gym

### The minimap

A 150×150 fixed widget: four corner squares split by a thin cross-shaped gap, plus a
circular centre button. A ring overlay in the frame colour carves a quarter-circle out
of each square's inner corner and absorbs clicks in the gap, so visually empty space
can't trigger a corner button.

States: white when active, cyan on hover, dim green once visited, black at rest. The
widget's screen position shifts with `getMinimapPosition` so it never covers the demo
card currently on screen.

### Colour

Around thirty `rgb()` custom properties are defined at the top of `globals.css` and
wired into Tailwind through `@theme inline`. Reference them directly rather than using
Tailwind's palette names, so everything stays on one system:

```jsx
className="text-[color:var(--color-gray-light)] bg-[color:var(--color-black)]"
```

### Typography

Courier Prime, four `woff2` files in `public/fonts/`, declared with `@font-face` in
`globals.css`. The two latin faces are preloaded in `layout.jsx`. Courier New is the
fallback.

### Icons

`src/components/Icon.jsx` holds the whole icon set as inline SVG on a 24×24 grid, drawn
at stroke-width 2. Geometry comes from [Lucide](https://lucide.dev) (MIT), copied in
rather than installed so the build carries no icon dependency.

```jsx
<Icon name="flask" size={32} title="how we built this" className="text-white" />
```

Colour comes from `currentColor`, so style them with ordinary text utilities.

### Line-draw animations

`.line-draw` in `globals.css` animates `stroke-dashoffset` so strokes draw themselves
in. Two requirements:

1. Every shape inside must carry `pathLength="1"`, so one dash length covers it
   regardless of the path's real length.
2. CSS animations run on the document timeline, not on a Framer Motion parent's
   schedule. If the element also fades in on a delay, set `--draw-delay` to match, or
   the shape will draw itself while still invisible.

```jsx
<div style={{ "--draw-delay": "2.2s" }}>
  <FishMark />
</div>
```

`MotionProvider` wraps the app in `<MotionConfig reducedMotion="user">`, which governs
Framer Motion only — the line-draw carries its own `prefers-reduced-motion` guard.

## Contact form

Three fields: `name` and `email` (required) and `business` (optional). `bot-field` is a
honeypot for Netlify's spam filtering.

`public/__forms.html` is a static schema declaring the fields Netlify expects at build
time. **Keep it in sync whenever the form's fields change**, or submissions will be
rejected.

Submission only works on a Netlify deploy. In local development, `POST /__forms.html`
returns 500 — that is expected, not a bug.

## Brand assets

`public/Garfish-Logo-Master.svg` is the full gar — pure stroke paths, no fills, so it
can be recoloured and line-draw animated. It's a fine line drawing at `stroke-width 2`
on a 415×88 canvas, which means it needs room: **don't reproduce it below about 200px
wide.**

Everything small — favicon, app icons, launcher — uses the cyan fin mark instead, a
solid shape that survives down to 16px. The manifest declares it at both `any` and
`maskable` purposes.

## Deployment

Netlify builds from `netlify.toml` using `@netlify/plugin-nextjs`. Pushing to `main`
deploys.

## Conventions

- Page components and anything using hooks need `'use client'`.
- Adding a nav item means editing `src/config/navigation.js` — the `navigationItems`
  array, its sort order, and `pageToNavMap` inside `getActiveNavigationItem`.
- Route-specific styles sit beside their page (`gallery.css`, `contact.css`); anything
  shared belongs in `globals.css`.
- Per-route titles and descriptions live in each route's `layout.jsx`, because the page
  components are client components and can't export metadata themselves.
