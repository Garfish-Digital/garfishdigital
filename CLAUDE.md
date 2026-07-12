# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garfish Digital is a three-page portfolio site for a boutique web design and development studio. The studio is positioning toward dark-luxury aesthetics for edgier client verticals (heavy metal bands, combat sports, tattoo studios). The visual language is Brutalist with an OKLCH color system, intentionally minimal information density, and a single distinctive UX moment — the Gallery's sliding-grid demo navigator.

## Development Commands

- `npm run dev` — Start development server (defaults to http://localhost:3000)
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS v4 with OKLCH color variables
- **Animations**: Framer Motion
- **Icons**: Font Awesome Pro+ Classic Regular
- **Fonts**: Courier Prime, self-hosted from `public/fonts/` (`@font-face` in globals.css, preloaded in layout.jsx); Courier New fallback
- **Form submission**: Netlify Forms (only works on Netlify-hosted deploys; local dev returns 500 on POST)

### Project Structure
```
src/
├── app/
│   ├── layout.jsx          # Root layout; registers FA icons; mounts Header
│   ├── page.jsx            # Home — landing page with logo + tagline
│   ├── gallery/
│   │   ├── page.jsx        # Sliding-grid demo navigator (see "Gallery Mechanic" below)
│   │   └── gallery.css
│   └── contact/
│       ├── page.jsx        # 3-field Netlify form (name / email / optional business)
│       └── contact.css
├── components/
│   ├── Navigation.jsx      # Top-right nav (Home / Gallery / Contact); desktop + mobile
│   ├── Logo.jsx            # Fixed top-left logo, always linking to /
│   ├── Header.jsx          # 100px transparent backdrop-blur strip on non-home pages
│   └── Minimap.jsx         # 5-position minimap on Gallery (see below)
└── config/
    └── navigation.js       # Navigation items + helpers
```

### Pages
- **Home** (`/`) — Brutalist typographic landing.
- **Gallery** (`/gallery`) — Five-position sliding viewport showcasing 4 demo cards, controlled by a custom remote-style minimap.
- **Contact** (`/contact`) — Three fields (name, email, optional business). Submits via Netlify Forms; success modal auto-dismisses to home after 3s.

### Gallery Mechanic (non-obvious — read this before editing)
The gallery is a `300vw × 300vh` 3×3 CSS grid that translates under a fixed-viewport `gallery-wrapper`. Only **5 of the 9 cells** have content: the four corners and the center. The other four cells (middle-edge positions) intentionally remain empty — they show as black space briefly during diagonal slides, which reads as atmospheric.

Cell IDs are semantic: `upperLeft`, `upperRight`, `center`, `lowerLeft`, `lowerRight`. The current cell is tracked in React state and applied as a CSS class (`gallery-grid-${currentPage}`); each class sets a different `transform: translate(...)` to slide the grid into position.

Navigation is mouse-only via the Minimap (no number/arrow keys). ESC closes the techniques modal that opens from each demo card.

### Minimap Design
A 150×150 fixed widget with five buttons:
- **4 corner squares** (one per quadrant), separated by a thin cross-shaped gap.
- **1 circular center button**, surrounded by a ring overlay (a circle the color of the minimap frame) that visually carves a quarter-circle bite out of each corner square's inner corner. The ring also absorbs clicks in the gap area so users can't accidentally trigger a corner button by clicking visually-empty space.

Active state: white background. Hover: cyan-light background. Resting: black. No icons inside the buttons.

The minimap's screen position shifts dynamically (`getMinimapPosition`) so it doesn't cover the active demo card.

### Navigation System
- All nav items defined in `src/config/navigation.js`.
- Three items: Home, Gallery, Contact.
- Desktop renders a horizontal text nav; mobile renders an animated hamburger that drops a styled menu.
- Active item is auto-detected from `usePathname()` if `currentPage` isn't passed.

### Color System
- OKLCH color variables defined in `src/app/globals.css`: `--color-black`, `--color-white`, `--color-gray-{dark,light,shadow,faint}`, `--color-cyan-{dark,light}`, `--color-green-{dark,light}`, etc.
- Tailwind v4 `@theme inline` syntax wires variables into Tailwind utilities.
- Use `text-[color:var(--color-...)]` / `bg-[color:var(--color-...)]` rather than Tailwind palette names to stay on the OKLCH system.

### Contact Form
- 3 fields: `name`, `email` (both required), `business` (optional).
- Honeypot field `bot-field` for spam protection (Netlify-integrated).
- The static schema at `public/__forms.html` declares the fields Netlify expects — keep it in sync if fields change.
- Validation helper `validateField()` exists in `contact/page.jsx` but is currently not wired into the rendered UI (legacy from when the form had a message textarea); kept for potential future use.

## Development Notes

- All page components and any component using hooks must include `'use client'`.
- Font Awesome icons must be both **imported** and **registered with `library.add(...)`** in `src/app/layout.jsx` to be globally available. Icons used inline (e.g., in Gallery demo cards) are also imported in their components.
- When adding nav items: update `src/config/navigation.js` (the `navigationItems` array, sort order, and the `pageToNavMap` in `getActiveNavigationItem`).
- Component-specific styles live alongside their page (`gallery.css`, `contact.css`); shared styles in `src/app/globals.css`.
- Form submission only works on a Netlify-hosted deploy. Local dev `POST /__forms.html` returns 500 — that's expected, not a bug.
