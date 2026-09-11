# Garfish Digital

A single-page portfolio for an independent web design and development studio.
Home, Gallery, and Contact form one continuous scroll, with no menus or hero CTA.

## Stack and setup

Next.js 15 App Router, React 19, JavaScript, Tailwind CSS v4, and Framer Motion.
Fonts and project previews are self-hosted; icons are inline SVG. No runtime font
services, analytics, or embedded project sites. Contact submissions use Netlify Forms.
No environment variables or secrets are required.

```sh
npm install
npm run dev
```

Development runs at http://localhost:3000. Use `npm run lint` for ESLint,
`npm run build` for production compilation, and `npm run start` to serve that build.
Use a Node version supported by the installed Next.js release (verification used Node 22).

Do not build into `.next` while a development server is using it. An isolated check:

```sh
GARFISH_BUILD_DIR=.next-verify npm run build
GARFISH_BUILD_DIR=.next-verify npm run start -- --port 3100
```

Use the same build-directory setting for both commands. `.next-verify` is ignored by Git.

## Structure

- `src/app/page.jsx`: Home composition and section assembly.
- `src/components/motion/HeroWordmark.jsx`: split-letter wordmark.
- `src/components/motion/SplitTextReveal.jsx`: configurable service-statement motion.
- `src/components/Gallery.jsx`: ordered project data, preview cards, one-time reveals.
- `src/components/Contact.jsx`: Netlify form, legal dialog, social/email links, copyright.
- `src/components/ScrollBrand.jsx`: circle mark revealed after Home exits the viewport.
- `src/components/Icon.jsx`: local SVG icons — outline set by default, plus a solid
  set (`<Icon solid />`) used for the footer marks.
- `src/components/MotionProvider.jsx`: shared reduced-motion configuration.
- `src/config/legal.js`: existing Privacy Policy and Terms of Service text.
- `src/app/globals.css`: font faces, definitive palette, layout, and interaction styles.
- `src/app/layout.jsx`: metadata exports, the Inter preload, and ProfessionalService JSON-LD.
- `public/projects/`: local WebP screenshots used as project previews.
- `public/__forms.html`: static Netlify form schema.
- `public/sw.js`: service worker, registered by `src/components/RegisterServiceWorker.jsx`.

## Installable app

Chrome on Android offers to install the site. Its criteria are HTTPS, a manifest with
192px and 512px PNG icons, and a service worker with a fetch handler; `site.webmanifest`
already covered the manifest half, so `public/sw.js` is the remaining piece.

The worker is network-first for anything that can change, and only falls back to the
cache when the network fails — serving a stale build during a client demo is worse than
loading slightly slower. The one exception is `/_next/static/`, which is content-hashed,
so a cache hit there cannot be the wrong version. Bump `CACHE` in `sw.js` to evict
everything on the next deploy. `netlify.toml` sends `sw.js` with `max-age=0,
must-revalidate`, or a cached worker would keep applying an old strategy after a deploy.

Registration is production-only: a worker caching in front of the dev server makes local
edits look like they never applied.

Home screen icons come from PNGs, not the SVG. Android uses the manifest's
`web-app-manifest-192/512.png`; iOS uses `apple-touch-icon.png` and ignores the manifest
icons entirely. `favicon.svg` (identical to `fin-logo-svg.svg`) is the browser tab only.
**iOS shows no install prompt at all** — that is a WebKit limitation, not a configuration
gap; Add to Home Screen there is always manual through the Share sheet.

## Spacing

`--section-space` (`clamp(160px, 16vw, 256px)`) is the section rhythm. Gallery uses it top
and bottom. Contact uses it at the top but half of it at the bottom, because the footer sits
*inside* Contact rather than after it — a full measure below the copyright reads as a dead
gap. The mobile hero gap is 48px, matching desktop; it was 96px, which stranded the wordmark
high above the statement at a third the type size.

`/gallery` and `/contact` issue permanent redirects to `/#gallery` and `/#contact`.
The sitemap contains the canonical homepage only and carries a build-time `lastModified`.
The 404 remains a utility route and is `noindex`.

## Typography and motion

Courier Prime sets the wordmark and the copyright line; Inter is used everywhere else.
The service statement is always lowercase: “web design & development”. See STYLE_GUIDE.md
for the full visual system.

The wordmark is **live Courier Prime 700 text**, not the outlined SVG it used to be. The old
mark's glyphs sat on an exact 17-unit monospace grid across a 119-unit viewBox, so the same
face reproduces it as text; `font-size` is derived as 0.2381 × the width the SVG rendered at,
and the 31-unit row pitch became a 1.094 `line-height`. Because it is real text, that weight
is preloaded alongside Inter 400 (`ReactDOM.preload`, root layout) and its `@font-face` uses
`font-display: block` so the logo cannot flash through Courier New mid-entrance. Courier
Prime 400 is not preloaded — it renders only the copyright line at the very bottom.

`HeroWordmark` splits both rows into per-character spans sharing one continuous stagger
across all 14 letters, so the mark arrives as a single sweep. Every parameter — duration,
stagger, initial delay, scale, and rise distance — is a custom property on `.hero-wordmark`
in `globals.css`; tune the entrance there rather than in the component. `transform-origin`
is `50% 85%`, so letters settle down onto the baseline rather than growing from centre.

`SplitTextReveal` takes explicit `lines` and restores the original service-statement
entrance: a 0.8s fade from 50px left, with the original per-word delays. CSS starts
it before hydration, without blur or an effect-driven visibility reset. The heading
has one complete accessible label and respects reduced motion.

Gallery cards use IntersectionObserver to reveal once per mount. They remain revealed
when scrolling back. A card reveals only once it is both in view **and** its image has
loaded **and decoded** (`img.decode()`), so the wipe never opens on an empty frame and never
competes with rasterising a 1440x1000 bitmap; an error handler and a 3s timeout guarantee
the copy appears regardless. The wipe itself is a black overlay scaling away, not an
animated clip-path — see STYLE_GUIDE.md for why. Previews stay lazy on purpose —
`priority` or `loading="eager"` would make Next preload a below-the-fold image against the
hero. CSS controls the image clipping, scale, and metadata entrances.
Hover/focus fades a subtle cyan-dark image tint to transparent and reveals the cyan
heading rule from right to left. Image scaling is reserved for the scroll entrance.
Project links open directly in a new tab with no transition delay or preview modal.
Reduced-motion preferences remove the spatial/blur effects and scroll smoothing.

## Projects

Client work leads: Portage Place, then Veilburner. Black Lodge Brews and The Scrap Pit
follow, explicitly labeled as demo concepts. Change project copy and URLs in Gallery.jsx.
Use 1440 × 1000 screenshots, save as WebP, and keep filenames aligned with each slug.
Portage Place’s screenshot comes from `https://portageplace.netlify.app`; its live
link remains `https://portageplacesb.com` (which served the older site during review).
Screenshots retain the projects' own palettes; studio UI follows the eight brand tokens.

## Contact

The form retains `name` and `email` (required), `business` (optional project text),
`form-name`, and the `bot-field` honeypot. Keep `public/__forms.html` synchronized if
any field names change. Submit URL-encoded data to `/__forms.html`.

While sending, the form is disabled. Success clears the form and reports confirmation
in place. Failure preserves entered values and offers the email alternative. Neither
state changes the visitor's scroll position. Actual delivery requires Netlify; local
browser checks use intercepted responses and do not send messages.

Legal text opens in a native modal dialog with keyboard focus containment, Escape
support, background scroll locking, and focus restoration. Email links use
`mailto:contact@garfishdigital.com`; their behavior follows the visitor's configured
email handler. The address is intentionally **not** printed as text — the envelope icon and
the form both reach the same inbox, and showing it adds nothing for the visitor.

The privacy policy names Netlify as the processor that handles and stores form submissions.
Update the "Last updated" stamp in `Contact.jsx` whenever `src/config/legal.js` changes.

## Deployment and verification

Netlify builds using `netlify.toml`, which also sets security headers for all routes:
`X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security` (one year, no
`preload`), `X-Frame-Options`, and a deny-all `Permissions-Policy`. There is no
Content-Security-Policy yet; the site loads no third-party resources, so the policy would be
simple, but Next's inline bootstrap script needs a nonce or hash first. Pushing to main deploys. No deployment is part of
local verification. Run lint and a production build, then inspect desktop/mobile
layouts, one-time reveals, keyboard focus, reduced motion, legacy redirects, image
loading, and form success/failure states. Verify real form delivery on a Netlify deploy.

ROADMAP.md records the renovation decisions and remaining visual review items. It is a
working guide, not a specification — nothing in it is binding on the build.
