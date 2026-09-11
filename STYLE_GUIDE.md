# Garfish Digital — style guide

## Direction

Quiet, distinctive, and spacious. Pure black provides the ground; strong typography
and real project imagery do the work. Cyan is a deliberate accent. Motion should feel
controlled and unhurried, while links and controls respond immediately.

The studio serves independent businesses and community projects. Its own dark visual
identity does not dictate the appearance of client websites.

## Palette

These are the only studio UI colors. They are defined as Tailwind theme tokens in
`src/app/globals.css`; the default Tailwind color palette is disabled.

| CSS token | Value | Role |
| --- | --- | --- |
| `--color-cyan-light` | `#00CCCC` | Brand mark, accents, focus, interaction |
| `--color-cyan-dark` | `#006666` | Form border and button ground |
| `--color-white` | `#FFFFFF` | Primary text |
| `--color-black` | `#000000` | Page ground |
| `--color-gray-light` | `#A1ABA1` | Supporting text and metadata |
| `--color-gray-dark` | `#4E584E` | Decorative borders |
| `--color-gray-faint` | `rgba(161, 171, 161, 0.5)` | Declared, currently unapplied |
| `--color-gray-shadow` | `rgba(78, 88, 78, 0.5)` | Surface depth, separators, shadows |

Use semantic variables or their generated utilities. Do not introduce arbitrary
palette colors. Dark/translucent grays are decorative, not essential small text —
Gray Faint composites to 2.78:1 on black, so it fails WCAG AA for text and 3:1 for
controls. It previously coloured the legal links, social icons, and legal date; all
three now use Gray Light (8.85:1). Do not reintroduce it for anything readable.
Cyan-light hover backgrounds need black text; cyan-dark buttons use white text.
Project screenshots retain their own colors.

## Typography

- **Courier Prime:** Garfish Digital wordmark and copyright only. The wordmark is
  **live Courier Prime 700 text**, not the outlined SVG it used to be — the original
  mark was that same monospace face on a 17-unit grid, so it reproduces exactly.
  Do not substitute another monospace face.
- **Inter:** all other text, including the service statement, headings, labels, form,
  and legal copy.
- Fonts are self-hosted. Available Inter weights: 300, 400, 500, 600; Courier Prime 400
  and 700. Only Courier Prime 700 and Inter 400 are preloaded — both are above the fold.
  The 700 face uses `font-display: block` so the logo cannot flash through a fallback
  partway through its entrance.
- Keep **web design & development** entirely lowercase.
- The wordmark is the dominant element and the service statement sits beneath it. An
  earlier iteration reversed this; that reversal is no longer current.

Large Inter headings use regular weight and tight spacing. Supporting copy is gray
light, with generous line-height. Small section labels use medium weight, uppercase,
and additional letter spacing. Avoid extending the monospace treatment to metadata.

## Composition

Home → Gallery → Contact in normal document flow. No navigation menus, gallery
minimap, hero CTA, scroll hijacking, or perpetual arrow animation. A keyboard-only
skip link provides direct access to the work.

The content container is capped at 1680px with fluid outer gutters (32px on mobile). Home
uses an open composition: wordmark above, service statement below. `.hero-note` is a
reserved but currently empty slot beneath the statement. The Gallery follows with two
columns at 768px and above, one below that width. Project rows have generous separation;
previews use a consistent 1.44 aspect ratio.

Contact retains the existing copy and three-field form. The intro and form stack at
every width — the form sits on its own row beneath the intro, capped at 760px and
centred while the intro stays left-aligned. The fieldset takes 72px inline padding on
desktop; the mobile block resets that to 24px, since 72px would leave ~180px inputs. Legal links, Instagram, LinkedIn, and
email belong to the footer in normal flow. Copyright is centered at the very bottom.
The email address is reachable through the envelope icon and the form; it is
deliberately **not** printed as text.

## Branding

Home renders the wordmark as live type via `HeroWordmark`, not an image file.
`public/garfish-logo-stacked-white.svg` is used only on the 404 route. Reveal
`public/Garfish-circle-logo.svg` gently at the upper left only after Home leaves the
viewport. It is decorative, does not act as navigation, and disappears when Home
returns. Keep its presence small and check it against content at narrow widths.
The line-drawn fish is not used in this composition. Existing source assets remain
available for other brand uses.

## Motion and interaction

- Wordmark: `HeroWordmark` splits both rows into per-character spans sharing one
  continuous stagger across all 14 letters, so the mark arrives as a single sweep.
  Letters scale and rise onto the baseline (`transform-origin: 50% 85%`). Every
  parameter is a custom property on `.hero-wordmark` — `--letter-duration`,
  `--letter-stagger`, `--letter-delay`, `--letter-scale`, `--letter-rise`. Tune the
  entrance there, never in the component.
- Service statement: in-house SplitTextReveal using CSS animation.
  Original 0.8s fade from 50px left, without blur. Word delays: web 0.4s,
  design 1.4s, & 0.7s, development 1.2s. CSS plays this before hydration.
- Easing: `cubic-bezier(.16, 1, .3, 1)` for entrances and settling motion.
- Gallery: scroll-triggered reveal lasting 1.3s; metadata settles over 0.9s. The wipe is
  an opaque black overlay on `.project-image-frame::before` collapsing to `scaleY(0)` from
  its bottom edge — **not** an animated `clip-path`. clip-path is not a compositor
  property, so it repainted the full image area every frame, which was smooth on a phone
  and visibly choppy across two 669px cards on a desktop. The overlay reads identically
  only because the page ground is pure black; do not reintroduce clip-path here, and keep
  every property in this reveal to `transform`, `opacity`, or `translate`.
  The second desktop-column card has a 0.1s offset. A card reveals only once it is both
  in view and its image has loaded, so the reveal never wipes open on an empty frame.
  Previews stay lazy: `priority` or `loading="eager"` makes Next preload a below-the-fold
  image against the hero.
- Entrances play once per mount, never reverse on scroll, and may replay on reload.
- Hover/focus: cyan-dark image tint fades from 0.12 to 0 opacity over 0.8s;
  the cyan rule reveals from right to left over 0.85s. No hover/press image scaling.
- Link activation remains immediate.
- The live-site affordance stays visible on touch devices; no double-tap requirement.
- Circle mark: 0.8s fade and 5px settling movement.

Reduced motion removes spatial/blur effects, image transforms, and smooth scrolling.
Content remains readable without JavaScript. Do not hide information behind animation.

## Forms and accessibility

Keep visible focus indicators and semantic links/buttons. Social controls have 52px targets with 32px, 2px-stroke icons; close controls
have 44px targets. Form fields have programmatic labels and at least 16px input text
on mobile. Preserve native validation, pending state, and persistent submission
feedback. Never clear entered values on failure.

Legal dialogs use the browser's native modal behavior. Keep Escape support, focus
containment/restoration, scroll locking, and readable text. Do not change approved
legal copy as part of visual styling.

## Review checklist

Check 320px mobile through wide desktop, landscape, long text, keyboard use, reduced
motion, actual image loading, and the once-only scroll behavior. Review the title
hierarchy and circle mark in motion, not only in static screenshots.

### Restored footer motion

Socials appear in email, LinkedIn, Instagram order. They are **solid filled marks**,
matching the fin mark — the only other icon in the identity, and deliberately a solid
with no hairlines. Each is one path whose subpaths knock holes through under `evenodd`.
Both brand marks are frames — outer rounded square with the tile interior knocked out —
so they carry matched ink and each keeps its official silhouette. A filled LinkedIn tile
reads far heavier than Instagram's open camera; inverting Instagram balances it but
departs too far from the real mark. The envelope stays a solid, which is correct: it is
a UI icon, not a logo. Do not reintroduce stroked social icons, and do not use the
brands' official colours — the palette is closed, and project screenshots are its only
sanctioned exception.

On entering view they fade and settle once, taking the wordmark's entrance character —
same duration, easing, scale and `50% 85%` pivot — with a wider stagger, since three
icons at the wordmark's rate would land together. The animation is on the glyph, not the
anchor, which leaves the anchor free and avoids an animation's fill mode permanently
overriding any transform placed on it.

Social hover/focus/active brightens the glyph Gray Light → White and draws a cyan-light
rule beneath it. The rule is lifted from the gallery heading — same colour, same
`--ease-reveal`, same right-to-left `transform-origin` — so the two interactive regions
rhyme structurally rather than only chromatically. It runs at 0.4s rather than the
gallery's 0.85s, which is sluggish on a 22px target, and the colour transition matches
it. Rule width tracks the glyph through `--icon-size`, set alongside the icon size in the
`socials` array in `Contact.jsx`; its offset is derived so it clears the 6px focus ring at
any size. There is no hover lift or press scale.

The legal links take the same treatment at the same 0.4s: label Gray Light → White, with
a cyan-light rule wiped in from the right. They need no width token — the buttons are flex
items with no inline padding, so they shrink-wrap their labels and `left/right: 0` gives
each rule its own text's width. Their resting dotted underline fades to transparent as the
rule arrives, so the two never stack; it should read as the dotted line becoming solid.
Keep the dotted underline at rest — without it the buttons read as plain text.
Preserve the legal links’ resting dotted underline; their resting colour is Gray Light. Legal dialogs retain
the original 0.6s blur overlay, 0.5s scale/tilt panel entrance and exit, staggered
text reveals, and rotating/scaling SVG close button. Native modal focus behavior
remains underneath that presentation.

Gallery uses 160–256px top and bottom padding. Contact keeps that at the top but takes
half of it at the bottom (`calc(var(--section-space) / 2)`, 80–128px), because the footer
sits inside the section rather than after it. The root reserves a stable scrollbar gutter
with a transparent track; modal scroll locking preserves that width and focus restoration
prevents scrolling. Social icons rest in Gray Light. Sizes are optical, not equal: the envelope is 26px
while the two tiles are 22px, because the tiles fill their box edge to edge and the
envelope is wide and short. Targets stay 52px, with a 6px gap holding the glyph-to-glyph
spacing near its previous value now that the marks are smaller.
