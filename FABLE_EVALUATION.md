# Garfish Digital — Evaluation, Round 3

**Date:** July 12, 2026
Round 1 was the original customer-experience report; Round 2 responded to your answers. This round implements your green-light list. Numbering matches Round 1 throughout.

---

## Status at a Glance

| # | Item | Status |
|---|------|--------|
| 1 | Copyright year | ✅ Done (you fixed it) |
| 2 | Home page hook / CTA | ✅ **Implemented** — `see the work →` on the left rail (`src/app/page.jsx`) |
| 3 | Demo card copy | 🔎 Open — draft copy below, awaiting your reaction |
| 4 | Minimap visited state + aria-labels | ✅ **Implemented** — dim green via `color-mix` (`src/components/Minimap.jsx`) |
| 5 | Contact form | ✅ **Done** — "Try Again" bug fixed (R2), placeholder now "Your project (optional)", fallback email in error modal (⚠️ placeholder address — see below) |
| 6 | Social proof | ❌ Withdrawn |
| 7 | Success modal timing | ❌ Withdrawn — untouched, per your confirmation |
| 8 | Page titles & metadata | ✅ **Implemented** — title template, per-route metadata, sitemap, robots, JSON-LD (verified on all routes) |
| 9 | `theme-color` | ✅ **Implemented** — now `#000000` (`src/app/layout.jsx`) |
| 10 | Mobile overlap / swipe | ❌ Withdrawn; swipe confirmed not pursued |
| 11 | Custom 404 | ✅ Built (R2) — `src/app/not-found.jsx` |
| + | prefers-reduced-motion | ✅ **Implemented** — `MotionProvider` wrapper + gallery CSS block |
| + | Cutive Mono | ✅ Corrected in CLAUDE.md (R2) |
| + | Minimap `:focus-visible` outline | ✅ **Implemented** (R5) |
| + | Demo review / Veilburner swap | ✅ **Swap implemented** (R6) — band blessing confirmed by Rob |
| 3 | Demo card copy | ✅ **Implemented** (R6) — all four cards + flask-icon `title` |

**Implemented this round (all verified via production build + render check):**

- **Home CTA** — single `see the work →` link on the left rail below "development": nav-link styling, lowercase, one-time entrance fade at 1.8s delay, no repeating animation. Links to /gallery.
- **Minimap visited state** — corners a visitor has seen dim toward green: `color-mix(in oklab, var(--color-green-dark) 40%, var(--color-black))`. It's derived from your palette variable, and the single `40%` is the tuning knob — raise it for more green, lower for subtler. Resets on page reload (session-level memory, intentionally). Also added `aria-label`s to all five buttons (demo names + "Gallery home") — invisible to sighted users.
- **Contact placeholder** — "Your business (optional)" → "Your project (optional)". Field name/id unchanged, so the Netlify schema and `public/__forms.html` needed no changes.
- **Fallback email** — the error modal now offers "or email us — hello@garfishdigital.com" beneath "Please try again," dotted-underline style matching the legal links. ⚠️ **`hello@garfishdigital.com` is a placeholder I invented — replace it with the real address before deploying** (it's one string in `src/app/contact/page.jsx`).
- **`theme-color`** — now `#000000`; mobile browser chrome will melt into the site.

**Earlier rounds:** "Try Again" input-wipe bug fixed, custom 404 built, CLAUDE.md font corrected (all Round 2).

---

## 2. Home Page Hook — Recommendation

**Placement:** stay on the left rail. The page already reads as a single left-aligned column — logo, then `web / design & / development` stacked beneath it. That one strong axis is the composition. Put the link in that same column, below "development," after a generous gap (a full "stanza" break, not a tight line). Anywhere else — centered, bottom-right, floating — creates a second focal point, and a second focal point is the first step toward looking composed-for-conversion.

**One link, not two.** Stacked CTAs are a funnel pattern — "primary and secondary CTA" is straight off a marketing-page template, and your audience has seen ten thousand of them. Someone cool offers one door. And of the two, "Send your info →" is the one to cut: *info* is the word forms use when they're harvesting — it reads lead-gen no matter how it's styled. Contact already lives in the nav, and the gallery hands off to contact naturally, so nothing is lost.

**Styling:** identical treatment to what exists — Courier Prime, lowercase to match the tagline, `gray-light` resting, cyan-light on hover, a plain text `→`. No button, no border, no pill, no repeating animation. Entrance: the same one-time fade/slide-in the tagline words use, delayed to ~1.8s so it's the last thing to arrive. It should feel like the sentence finishing, not a banner appearing.

```
web
design &
development

see the work →
```

For calibration, what actually makes a CTA read "corporate": pill buttons, gradient fills, drop shadows, Title Case, exclamation points, "Get Started Today," centered hero composition. A bare lowercase monospace line with an arrow is editorial — it reads like the site talking, not the site selling. This addition is safe.

**Optional second line:** if you ever want a direct-to-contact path here, `start something →` is in-voice where "send your info" isn't. But my recommendation is one link.

---

## 3. Demo Cards & Minimap Presentation

**You were right to roll back the thumbnails.** Imagery at 67px is noise, and the minimap's abstraction is a feature — it reads as an *instrument*, not a menu, and figuring it out takes two seconds and feels good. Your over-the-shoulder observation (people tap it and go) is real data and it beats my Round 1 concern. So, softening my earlier framing: the issue was never *confusion* — it's *completion*. The only real risk is a visitor seeing one corner and never realizing there are four. The visited state (#4) solves that wordlessly, so I'm no longer pushing labels for mobile at all.

One optional desktop-only refinement: while hovering a corner, show the demo's name in small lowercase monospace near the minimap — plain text that appears and vanishes, no tooltip bubble, no chrome. That's an instrument readout, not a label; it rewards the hover without explaining anything. If even that feels like too much, skip it — visited state alone carries the load.

**Card copy drafts.** The current lines are spec sheets ("A demonstration on particle animation, floating navs, and liquid transitions") — they describe the engineering to an audience that's buying the effect. Drafts to react to, one per card, same length discipline as what's there:

- **Black Lodge Brews** — *"Fireflies drift, beer pours, the nav floats. The taproom after dark."*
- **Inferno Ink** — *"The cursor trails fire and every click throws sparks. It burns."*
- **Via Mortis** — *"Glitches, scan lines, dripping blood. Haunted on purpose."*
- **The Scrap Pit** — *"Big type. Hard hits. Monochrome until it swings to color."*

Tune the temperature however you like — the principle is just: name the sensation, not the technique. Keep the subtitles as-is (they're doing the "this is for your vertical" work). And the techniques modal can keep its dev-speak — it's opt-in depth for the technical minority. The only touch I'd add there is `title="how we built this"` on the flask icon: invisible until hover, zero cool-cost, and it invites the click from the people it's for.

---

## 4. The "Smart User" Boundary — a Working Principle

Here's a rule that I think defines the boundary you're feeling for: **explanations dumb a site down; feedback never does.** Labels, tooltips with arrows, "click here," instructional copy — those flatter no one and cost you exactly the eye-roll you're worried about. But hover states, visited states, cursor changes, motion that responds to touch — that's the site respecting the user enough to answer when touched. High-end physical products work the same way: no instructions anywhere, immaculate feedback everywhere. Your instinct to assume smart users is correct; the visited state passes this test and a "how to use the minimap" hint would fail it.

**Visited state:** dim green works. Two candidates from the existing palette: `--color-green-dark` at reduced opacity (green reads as "seen/done" — a distinct meaning from cyan's "interactive," which is arguably an advantage), or a very dark cyan to stay inside the site's existing interactive vocabulary. Try green first; the test is that it should read as *spent*, not as *go*.

**One freebie:** `aria-label`s on the five minimap buttons. They are literally invisible to sighted users — no cool-cost is possible — and they're the same "feedback, not explanation" principle applied to screen readers. Five one-line attributes. Do this regardless of everything else.

---

## 5. Contact Form

**The unused message field was informative, not a failure.** Your audience sends name + email and wants you to call — the minimal form is *correct* for them, and I withdraw the message-field suggestion entirely.

**One refinement worth considering:** the placeholder. "Your business (optional)" asks a biker, a pagan, or a grower to claim an *entity* — which, as you said, is a genuinely hard question for some of them. "Your project (optional)" or "What you're building (optional)" asks what they want *made*, which is the question they showed up with. Same field, same Netlify schema (`business` name can stay internally), one word swapped in the placeholder. This is the cheapest possible change that meets that crowd where they are.

**"Try Again" bug — fixed this round.** Closing the error modal previously called `resetForm()` and wiped everything the visitor had typed; now it just closes the modal and their input survives. (`src/app/contact/page.jsx`)

**Fallback email, explained.** A `mailto:` link (e.g., "or email us — hello@garfishdigital.com" inside the error modal) opens the visitor's *own* mail app with a draft addressed to you. To answer your question directly: **no, the form input does not transfer automatically** — by default they'd write their own message, and you receive whatever they choose to send. It *is* possible to prefill the draft's subject and body with what they typed (`mailto:` supports `?subject=&body=`), but with only three short fields it's not worth the quirks (some mail clients mangle prefilled bodies). Two practical notes: it requires publishing a real address, which will attract some scraper spam (use an alias you can rotate), and I'd put it **only in the error modal** — not on the main contact page — so the form stays the single path when everything works, and the address only appears at the exact moment the visitor would otherwise hit a dead end.

---

## 6 & 7. Withdrawn

- **Social proof:** you're right, and your reasoning is sound — cold, minimal, take-it-or-leave-it *is* the luxury register, and the fixed copyright year already handles the only thing I was actually worried about (looking inactive). Dropped without reservation.
- **Success modal:** untouched, as requested.

---

## 8. Titles & Metadata — Clarified + Plan

To be precise: **your URLs are great and nothing about them changes.** This item is only about three invisible-until-shared surfaces: the browser tab title, the Google search snippet, and the preview card when someone texts or Slacks a link. Right now all three pages present identically ("Garfish Digital" / "Web Design and Development"), so a shared gallery link — the single most valuable share on the site — is indistinguishable from the home page.

The fix (small, all standard Next.js conventions):

1. **Root layout:** title template — `{ default: "Garfish Digital", template: "%s — Garfish Digital" }` — plus `metadataBase` for correct canonical/OG URLs.
2. **Per-route metadata:** tiny `layout.jsx` files in `gallery/` and `contact/` (needed because the pages are client components) exporting a title and description each. Tabs then read *Gallery — Garfish Digital*, *Contact — Garfish Digital*.
3. **Descriptions** — this text only ever appears in Google and link previews, so it can sell slightly harder than the site itself without touching the brand on-site. Drafts to veto or tune:
   - **Home:** "Web design & development. Dark, deliberate sites for brands that don't do beige."
   - **Gallery:** "Four live demos — a brewery, a tattoo shop, a haunted tour, an MMA gym. See what we build."
   - **Contact:** "Tell us how to reach you. We reply within 24 hours."
4. **`app/sitemap.js` and `app/robots.js`** — Next generates both from ~10 lines total; helps Google index the three routes cleanly.
5. **Optional:** a JSON-LD `Organization` snippet (name, URL, logo). Completely invisible to visitors; helps Google display your name and logo correctly in results. Zero brand cost.

Your `og-image.jpg` exists and loads fine — per-page OG images (e.g., a gallery collage) are possible later but not needed now. Say the word and I'll implement the set.

---

## 9. `theme-color` — Clarified

This one got tangled — it has **nothing to do with your CSS palette or the unused color variables** (those are fine to keep as design reminders; they cost visitors nothing and were never the issue).

`theme-color` is a single meta tag in `src/app/layout.jsx` (line 67) that tells a *phone's browser* what color to paint **its own interface** — the address bar / status bar area surrounding your site. Yours is currently set to a near-white OKLCH value, so on Android the browser frames your all-black pages with a whitish bar: a visible seam in an otherwise sealed aesthetic. Changing it to `#000000` makes the browser chrome melt into the page. One line, no design discussion required — this is housekeeping, not palette.

---

## 10. Mobile Overlap & Swipe — Withdrawn

**Overlap:** your Pixel 9 testing settles it — real device beats my geometry math. Dropped.

**Swipe:** to clarify what I meant — swiping the *gallery canvas itself* (the big sliding grid), not the minimap widget and not the three-page site nav. But having thought it through properly: **I now recommend against it.** The five-position corner layout doesn't map onto swipe grammar — from center, "swipe left" is ambiguous (upper-left or lower-left?), and from a corner, most swipe directions dead-end in intentionally empty cells. A gesture that only sometimes works feels *broken*, which is worse than a gesture that's absent. The minimap is genuinely the correct instrument for this space, and your observed users confirm it's understood. Withdrawn.

---

## 11. Custom 404 — Built This Round

`src/app/not-found.jsx` now exists: black page, the new master logo (`/Garfish-Logo-Master.svg`) upper area of a left-aligned column, then in the site's voice:

```
404
nothing here.

go home →
```

Same Courier Prime, same gray-light/cyan hover vocabulary, same one-time entrance fades as the home page, no repeating animation. To see it, run the dev server and hit any bad URL (e.g., `/nope`). The copy and logo sizing are trivially tunable — react to it. (Note: the Header blur strip renders on it since it's not the home route; it's invisible against black and harmless.)

---

## Additional Items

### prefers-reduced-motion — a safe plan

Your caution about Framer Motion finickiness is warranted for *hand-rolled* conditionals — but Framer Motion ships a first-class API built precisely so you don't have to hand-roll anything:

1. **`<MotionConfig reducedMotion="user">`** wrapped around the app (a ~5-line client component mounted in the root layout). When — and only when — a visitor's OS has "reduce motion" enabled, it disables transform/position animations **but keeps opacity fades**. So entrances still fade in and feel designed; they just don't travel. For every other visitor, literally nothing changes. This is the supported, non-finicky path.
2. **One CSS block** in `gallery.css`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .gallery-grid { transition: none !important; }
   }
   ```
   The grid jumps to position instead of sliding, for those users only.

Worth doing because the 300vw gallery slide is exactly the class of full-field motion that triggers vestibular symptoms — it's the one place on the site where this genuinely matters, and both changes are invisible to everyone who hasn't explicitly asked their OS for less motion.

### Cutive Mono — resolved

Grepped the whole source tree: **there was no dead CSS** — `globals.css` loads only Courier Prime. The sole reference was a stale line in `CLAUDE.md`, now corrected to Courier Prime.

---

## Round 4 Additions

**Metadata (#8) — implemented and verified on a production build:**

- Root layout: title template (`%s — Garfish Digital`), `metadataBase`, new site description shared across OG/Twitter tags.
- `src/app/gallery/layout.jsx` and `src/app/contact/layout.jsx` (new, tiny) — per-route titles, descriptions, and full OG objects. Tabs now read *Gallery — Garfish Digital*, *Contact — Garfish Digital*.
- `src/app/sitemap.js` and `src/app/robots.js` (new) — serve `/sitemap.xml` (3 URLs) and `/robots.txt`.
- JSON-LD `Organization` snippet in the root layout (name, URL, master logo). Invisible to visitors.
- ⚠️ **If a demo gets swapped for the hobby project, the gallery description enumerates the four verticals** ("a brewery, a tattoo shop, a haunted tour, an MMA gym") — update it in `gallery/layout.jsx` at the same time.

**Reduced motion — implemented:** `src/components/MotionProvider.jsx` (new) wraps the app in `<MotionConfig reducedMotion="user">` from the root layout — transform animations off, opacity fades kept, only for visitors whose OS requests it. Plus the `prefers-reduced-motion` block in `gallery.css` so the grid jumps instead of sliding for those users. No change for anyone else.

**Minimap — hover readout on hold per your call.** Remaining thoughts, none urgent:

1. **Visible keyboard focus.** The five buttons are tabbable but show nothing when focused via keyboard. A `:focus-visible` outline (cyan, matching hover) appears *only* for keyboard users — mouse users never see it. Same feedback-not-explanation principle as the visited state; the last accessibility gap in the widget.
2. **The geometry is a hard four-slot design.** Four corners + home is the whole visual logic — if the hobby project earns a place, it replaces a demo rather than joining them. Five demos would mean redesigning the minimap, which I wouldn't do; the constraint is a feature (only the four strongest walls get hung).
3. Otherwise: leave it alone. The instrument works, your users prove it, and the visited state closed the one real gap.

## Round 5 — Demo Review & the Via Mortis / Veilburner Question

**Minimap `:focus-visible` outline — implemented.** Cyan 2px outline, keyboard-only (`globals.css` + a `minimap-button` class on the five buttons). Mouse users never see it.

### The five projects, reviewed from source

- **Black Lodge Brews** — the craft showcase: canvas mist/firefly particles, beer glasses that fill on hover, a full pour simulation with foam physics, liquid page transitions, parallax. Warmest of the five.
- **Inferno Ink** — the spectacle piece: fire-trail custom cursor, spark explosions on click, ember buttons, flicker hero. The most immediately "whoa" on first touch.
- **The Scrap Pit** — the brand statement: brutalist type at full volume, chromatic-displacement glitches, duotone filter hits, monochrome-to-color scroll reveal, impact-flash buttons. Closest kin to the portfolio site itself.
- **Via Mortis** — the technical deep end: SVG displacement mapping, ambient glitch system, color-channel separation, blood effects, destruction animation. The most extreme effects work of the five.
- **Veilburner** — a different animal entirely: not an effects showcase but a **real site with real content** — parallax band-photo hero, scroll reveals, an eight-album discography with per-album listening pages, a substantial press/interview archive, PWA manifest. Editorial, restrained, occult. Live at veilburner.band.

### Recommendation on the swap: yes — with one thing to resolve first

**The case for Veilburner in, Via Mortis out:**

1. **It's your first-listed target vertical.** The brand brief says heavy metal bands, combat sports, tattoo studios — and the current wall covers the second two but not the first. Swapping gives you a one-to-one wall: brewery / tattoo shop / **metal band** / MMA gym. A band manager landing on the gallery currently has to translate from a haunted-tour demo; after the swap they see *their* world. Haunted-attraction tourism was always the thinnest vertical of the five in terms of actual buyers.
2. **It's the only project that proves content, not just effects.** Four fictional single-pagers demonstrate that you can make things move; Veilburner demonstrates you can structure a real band's actual world — discography data driving per-album pages, a press archive, streaming links, installable PWA. That's the half of the job the other demos can't show, and it's the half a client is actually buying.
3. **The loss is survivable.** Via Mortis is the deepest effects work, and cutting it hurts a little — but The Scrap Pit keeps glitch/displacement on the wall, and Inferno Ink keeps spectacle. The *categories* stay covered.

**The thing to resolve: it's an unofficial fan site for a real band.** The other four are fictional, which makes them legally and ethically frictionless. Veilburner uses a real band's name, logo, photos, and album art. Two separate concerns:

- A prospect will reasonably assume Veilburner is a *client*. If they later learn it's an unofficial tribute, that reads as a misrepresentation even if never stated.
- The band's IP is in your commercial portfolio without (presumably) their blessing.

Both dissolve with one move: **get the band's blessing before the swap.** They're a two-person underground act, you've clearly built them a better site than most labels would, and "we built this for the love of it; may we show it in our portfolio?" is exactly the kind of story your target clients would respect. With a yes in hand, the card subtitle can even lean into it honestly ("built for the underground, unofficially"). Without it, I'd hold the swap — the demo is too good to taint with an asterisk.

### Card copy drafts (from the real work this time)

Assuming the swap; Via Mortis draft included in case it stays:

| Demo | Subtitle (unchanged) | New description |
|---|---|---|
| Black Lodge Brews | Micro Brewery Taproom | *"Mist drifts, glasses fill, the pour never stops. The taproom after dark."* |
| Inferno Ink | Tattoo & Body Modification Shop | *"The cursor trails fire and every click throws sparks. It burns."* |
| The Scrap Pit | MMA Gym & Fighter Training Program | *"Big type. Hard hits. Monochrome until it swings to color."* |
| Veilburner | Avant-Garde Metal Band | *"Eight albums, a listening room, a press vault. A real band's whole world."* |
| Via Mortis (if kept) | Morbid Tours & Haunted Attractions | *"Glitches, scan lines, dripping blood. Haunted on purpose."* |

Flask-modal techniques list for Veilburner, if swapped: full-bleed parallax hero with layered gradients; scroll-triggered image reveals; data-driven discography with per-album listening pages; press & interview archive; streaming-service integration; installable PWA with web manifest; editorial monospace typography system.

### Swap implementation checklist (when you decide)

All in this repo, ~30 minutes: `demoCards.lowerLeft` in `gallery/page.jsx` (title, subtitle, URL → `https://veilburner.band`, hover colors — their blood-red logo suggests staying near Via Mortis's red family), `techData.lowerLeft`, the minimap `label` in `Minimap.jsx`, the gallery meta description in `gallery/layout.jsx` ("…a metal band…"), and the card descriptions above.

## Round 6 — Swap & Copy Implemented

Band blessing confirmed; everything applied and verified on a clean production build:

- **Veilburner replaces Via Mortis** in the lowerLeft gallery slot: title, subtitle ("Avant-Garde Metal Band"), URL → `https://veilburner.band`, and hover colors drawn from Veilburner's own palette — blood `#8B0000` border/shadow, black→rust→blood gradient, bone `#8b7355` subtitle. Muted next to the other cards' neons, which fits: it's the editorial one on the wall.
- **All four card descriptions** replaced with the Round 5 drafts (sensation, not technique).
- **Techniques modal (lowerLeft)** rewritten for Veilburner — parallax hero, data-driven discography, press archive, PWA, and closing with *"Built for a real band, with their blessing."*
- **Flask icon** now carries `title="how we built this"`.
- **Minimap** `aria-label` and page title updated to Veilburner.
- **Gallery meta description** now reads "…a brewery, a tattoo shop, a metal band, an MMA gym…" (both plain and OG).
- Zero remaining `Via Mortis` / `via-mortis` references in `src/`.

Worth an eyeball in the browser: the Veilburner card's bone-on-dark subtitle contrast, and the gradient against its neighbors.

## Round 7 — Brand Unification & Final Polish

*(Error-modal email confirmed real: contact@garfishdigital.com — placeholder concern closed.)*

### The identity system: the tail is the icon, the fish is the logo

The old package (realfavicongenerator output) used a cropped "G" that matched nothing else. The new set derives everything from `Garfish-Logo-Master.svg`. The full fish is too long and thin to read at tab sizes, so small marks use a **crop of the tail** — forked fins, clearly a fish, legible at 16px — while the full fish appears wherever there's room. Strokes are thickened per size tier so the line art survives rasterization.

**New assets (same filenames — zero markup changes needed):**

- `favicon.svg` — true vector this time (the old one was a base64 screenshot PNG inside an SVG wrapper), tail mark on a rounded black tile, bold strokes.
- `favicon.ico` — regenerated (16/32/48 layers), so even legacy `/favicon.ico` requests get the fish.
- `favicon-96x96.png`, `apple-touch-icon.png` (180) — tail mark, full-bleed black.
- `web-app-manifest-192/512.png` — tail mark padded to ~77% for the maskable safe zone.
- `og-image.jpg` — rebuilt at exactly 1200×630: wordmark upper-left (the actual vector paths from the home page), tagline **now in monospace** (was sans — the one font break in the brand), and the full fish swimming out of the right edge on the tagline's baseline. Keeps the informative text for prospects, per your intent.
- JSON-LD `logo` → the solid-background 512px icon; OG image `alt` synced to the tagline.

### Smaller polish (all implemented)

1. Copyright year is now `new Date().getFullYear()` — it can never go stale again.
2. Legal modal date → July 2026; the privacy "Contact Us" section now also offers contact@garfishdigital.com.
3. Gallery center copy → *"Four live demos. The minimap takes you there."*

### Legal copy review (as requested)

The content is competent boilerplate and — more importantly — **accurate to what the site actually does**: you collect only what the form sends, you don't sell it, there are no analytics or tracking scripts anywhere in the codebase. Nothing needs fixing. One nuance worth knowing: the Google Fonts CDN import (`globals.css`) means visitors' IPs touch Google's servers, which is the only thing stopping a "no third-party anything" claim. Self-hosting Courier Prime (two font files in `/public`) would close that gap *and* shave a network round-trip — optional, noted for whenever.

## Round 8 — Self-Hosted Fonts

Courier Prime is now served from `public/fonts/` — four woff2 files (400/700 × latin/latin-ext, ~37KB total) downloaded from Google's own delivery, with `@font-face` rules in `globals.css` mirroring Google's exact unicode-range subsetting, and the two latin faces preloaded in `layout.jsx`. The CDN `@import` is gone; verified zero references to `fonts.googleapis`/`fonts.gstatic` anywhere in the production build.

What this buys: first paint no longer waits on a DNS lookup + TLS handshake to two Google domains, and **the site now makes zero third-party requests of any kind** — which upgrades the privacy-policy footnote from "accurate with one nuance" to simply accurate. (Courier Prime is OFL-licensed; self-hosting is fully permitted.)

## Round 9 — Demo Sites Performance Audit (read-only, no changes made)

### Shared tax across all four: fonts via CSS `@import`

Every demo loads Google Fonts through `@import url(...)` inside its SCSS — the slowest possible chain (HTML → site CSS → Google CSS → Google font files; two extra origins, each with DNS + TLS, all serialized). Identical fix to the portfolio's Round 8: self-host the woff2 files + preload. This is the single highest-leverage change on all four sites.

### The Scrap Pit (slowest — cause found)

1. **The hero background is a 6K image**: `hero-octagon-scrap.webp` is **5989×3993 (24 megapixels), 559KB**. The ffmpeg pass converted formats but never resized. Resize to ~1920w → ~100–150KB, and the mobile decode cost (which is real at 24MP) collapses too.
2. **Zero `<img>` tags on the whole page** — every image is a CSS `background-image`. Backgrounds can't lazy-load, get low fetch priority, and are only *discovered* after the CSS is parsed. At minimum: `<link rel="preload" as="image">` for the hero; ideally, below-fold section backgrounds become `<img loading="lazy">` or load via IntersectionObserver.
3. Other backgrounds (fighter-striking 2121×1414 etc.) are reasonable but could shrink to display size.

### Inferno Ink (double-load — diagnosed)

**It's the font swap, not the animations.** The animation flash was already fixed (BaseLayout's critical CSS pre-hides hero elements to match GSAP's initial states — that battle was won). What remains: Cinzel — the display font for every heading — arrives via `@import` inside `global.scss`, i.e. as late as physically possible, with `display=swap`. So the page paints in fallback fonts, then Cinzel lands and **every heading on the page re-renders**, often mid-hero-animation (the clip-path reveal starts at 0.3s, so the title can change typeface while animating). That full-page repaint is the "double load."

Fix: self-host Cinzel + Inter with `<link rel="preload">` (portfolio Round 8 pattern) — the fonts then usually beat first paint and the swap becomes invisible. For a guarantee, `font-display: optional` + preload = zero-reflow by spec. Also: Cinzel loads 4 weights (400/600/700/900) — audit; likely two are used.

### Veilburner

1. **`favicon.svg` is 15.4MB** — embedded light/dark base64 rasters inside an SVG wrapper. Every first-time visitor downloads it; it's roughly half the site's first-visit transfer. Replace with a true vector or small PNGs. The 512px manifest icon (535KB) also needs a recompress.
2. **Four separate Google Fonts imports** across components — one pulls *eight* display families (Pirata One, Metal Mania, Creepster, Butcherman, Nosifer, Rubik Mono One…), almost certainly leftover experiments. Audit, consolidate to the used set, self-host.
3. Seven components `@import global.scss` into scoped styles → duplicated CSS in the bundle (68KB total; moderate, worth fixing while in there — use it as a shared layout import instead).
4. `sigil-bg-1.png` is a 392KB PNG photo-texture (→ webp/jpg), `both-members-9.jpg` 396KB at 1155×964 (recompress). Verify the two reels (10MB + 3MB mp4) are `preload="none"` with posters.

### Black Lodge Brews (already fast — one item)

`story-trees.webp` is **872KB at 2000×1499** while its sibling `contact-beer-table.webp` at the *same* dimensions is 240KB — the ffmpeg quality setting was inconsistent (near-lossless vs sane). Recompress to q75–82 → ~200KB. Fonts same as above.

### ffmpeg pass verdict

Format conversion: good. Gaps: (a) no resizing to display dimensions (the 6K hero), (b) inconsistent quality settings (872KB vs 240KB at identical dimensions), (c) photographic PNGs left as PNG. A uniform re-pass with targets — max 1920w full-bleed, ~2× display size for cards, webp q75–82 — is scriptable.

## Round 10 — Demo Performance Fixes (implemented)

All four demo repos patched in place; every site builds clean with **zero** `fonts.googleapis`/`fonts.gstatic` references in its `dist/`. Same pattern as the portfolio: woff2 files in `public/fonts/`, `@font-face` mirroring Google's subsets, three critical faces preloaded per site. Commits/deploys are yours.

- **Inferno Ink** (the double-load fix): Cinzel ×4 weights + Inter ×3 self-hosted (14 files); the `@import` in `global.scss` removed; Cinzel 400/700 + Inter 400 preloaded in `BaseLayout`. The font swap that caused the double-load should now be invisible — fonts beat first paint.
- **The Scrap Pit** (the slow one): Bebas Neue + Space Mono self-hosted (6 files) with preloads; **hero resized 5989×3993 → 1920×1280 (559KB → 148KB)** and given `<link rel="preload" as="image">` so it no longer waits for CSS parsing; Font Awesome kit script got `defer` (was render-blocking in `<head>`).
- **Veilburner**: the four CDN imports removed, including the eight-family display import in `Hero.astro` and the four-mono import in `index.astro` — audit confirmed only **Oswald, Inter, Cormorant Garamond, IBM Plex Mono** are used; those are self-hosted (16 files) via a new `src/styles/fonts.css` imported once in `Layout.astro` (avoiding the global.scss ×7 duplication). **`favicon.svg`: 15.4MB → 30KB** (compact SVG wrapping the existing 96px icon; the fiery VB mark carries its own dark background so one variant works on any tab theme). Manifest icons recompressed (536→432KB, 88→72KB, 76→68KB).
- **Black Lodge Brews**: Playfair Display + Inter self-hosted (12 files) with preloads; `story-trees.webp` resized 2000w→1600w q75 (**872KB → 440KB** — dense forest texture, worst-case for webp, so that's the realistic floor without visible loss).

**Verify after deploy:** hard-refresh each site; on Inferno Ink specifically, watch the first load — the headings should paint in Cinzel immediately with no mid-animation typeface change.

## Round 11 — HellFloor Realism Rework (Inferno Ink, confirmed in browser)

The "cartoonish" look was diagnosed as five compounding tells, none of them fixable by value-tuning alone: metronomic sine wobble, constant rise velocity, zero flicker, a pure `#FFF200` saturated yellow, and a 65% spark ratio. Reworked in `HellFloor.js`:

- **Motion:** two-octave value-noise turbulence replaces the sine wobble (random walk, not pendulum); sparks launch fast and *decelerate* toward a drift; a shared slow wind occasionally leans all embers together.
- **Flicker:** per-ember noise shimmer that deepens with age — dying embers gutter.
- **Color:** blackbody-style ramp (white-hot → amber → orange → deep red → coal) with brightness decaying faster than hue; per-ember hue jitter.
- **Shape:** hybrid by speed — streak amount computed from actual velocity each frame, so sparks stretch and round off as they slow; slow embers are small round motes.
- **Polish:** spark ratio 65%→30%, bloom threshold raised so only white-hot heads halo, 70px fade band before the kill line (embers previously popped out at full alpha), noise shimmer on the glow plane's molten pockets.
- All knobs consolidated into a commented `TUNE` block at the top of the file.

**Lesson encoded in the code:** embers spawn ~25vh *below* the visible section (bleed CSS clipped by `overflow:hidden`), so launch + drift velocities must fund that hidden journey — the first realism pass had embers living and dying entirely inside the hidden band. The `TUNE` block now documents this travel budget, since it's bitten twice across the project's history.

## Still Open / Future
- **Instagram (planned this winter):** when the account exists, add a `sameAs` array to the JSON-LD and decide whether the brand wants a visible link (the cold-and-direct stance may say no — a `sameAs` entry alone helps Google connect the profiles with zero visual cost).
