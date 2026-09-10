# Website renovation — shared thinking outline

This is the working brief for the renovation. Confirmed decisions reflect our
conversation; proposals remain open for discussion. README.md and STYLE_GUIDE.md
will be rewritten to describe the implemented site once the design is settled.

## Purpose and audience

Represent Garfish Digital as a small web design and development studio, demonstrate
the quality of its builds, and invite inquiries. Reach businesses dissatisfied with
template services, including tattooists, record stores, bands, and pagan businesses,
while also welcoming community organizations and more straightforward projects.

The studio's own aesthetic can be dark and distinctive without implying that every
client must want a dark website. Portage Place helps demonstrate that range.

## Confirmed visual direction

- Spacious, predominantly black, strong typography, restrained cyan accents.
- Subtle-cool, with luxury expressed through composition, space, and deliberate motion.
- Courier Prime and Inter only. Inter still needs to be added to the site.
- Keep Courier Prime for the Garfish Digital wordmark and copyright only.
  Use Inter everywhere else, including headings, labels, project details, and form UI;
  create hierarchy through size, weight, spacing, and palette colors.
- Slow image reveals, small positional shifts, and carefully timed entrances.
- No perpetually moving arrows.

### Definitive palette

| Token | Value | Proposed role |
| --- | --- | --- |
| Cyan Light | #00CCCC | Select accents, focus and interaction states |
| Cyan Dark | #006666 | Subdued accents and decorative details |
| White | #FFFFFF | Primary text |
| Black | #000000 | Main background |
| Gray Light | #A1ABA1 | Supporting text |
| Gray Dark | #4E584E | Decorative separators and surfaces |
| Gray Faint | rgba(161, 171, 161, 0.5) | Quiet decorative details |
| Gray Shadow | rgba(78, 88, 78, 0.5) | Shadows and depth |

Check contrast in context; dark and translucent grays should not become essential
small text. Project screenshots naturally retain each project's own colors.

## Structure

One continuous page: Home → Gallery → Contact.

- Remove desktop navigation, mobile menus, and the gallery minimap.
- Replace the gallery's sliding viewport with ordinary document flow.
- Move copyright to the very bottom of Contact and center it.
- Remove the separate Contact wordmark.
- Preserve incoming /gallery and /contact URLs with redirects to the respective
  section anchors; update sitemap and route metadata during implementation.
- Keep natural scrolling and support reduced-motion preferences.

## Implementation status

- Implemented: single-page composition, strict palette, self-hosted Inter, in-house
  title motion, client-first grid, circle mark, contact/social footer, legacy redirects.
- Removed: menus, hero CTA, minimap, and line-drawn fish component.
- Rewritten: README.md and STYLE_GUIDE.md to document the implemented system.
- Initial lint and isolated production build pass; browser checks cover responsive
  layouts, legal dialog, reduced motion, redirects, and mocked form success/failure.
- Portage Place screenshot uses the user-provided https://portageplace.netlify.app
  preview. Its live link remains https://portageplacesb.com as requested; that domain
  served the older design during this review.
- Verified: all four preview images load; no browser JavaScript errors; responsive
  checks at 320, 390, 768, and 1440px; reduced motion; legal Escape/focus restoration;
  legacy redirects; simulated form success and failure.
- Final mobile gutter refinement passed the production build. The final preview
  restart was declined, so that small refinement has not had another browser pass.
- Production preview on port 3100 is stopped. Actual Netlify form delivery remains
  a deployment check; no deployment or real test message was sent.

## Home

Confirmed:

- Larger, stronger title.
- Keep “web design & development” entirely lowercase.
- Try the service statement larger than the wordmark in the first visual iteration.
  This hierarchy is provisional: evaluate it against the established branding
  proportions before treating it as final. Preserve the wordmark's Courier Prime identity.
- Remove navigation links.
- Remove copyright from this section.
- Move the line-drawn fish to Contact if retained; it may be removed entirely.
- Replace or remove the current “see the work” treatment.

Accepted and implemented:

- Build a small reusable text reveal with the existing Framer Motion dependency.
  Expose duration, stagger, distance, blur, opacity, delay, and easing.
- Prefer word or line reveals over a long character-by-character sequence.
  Keep an accessible complete text equivalent and a readable reduced-motion state.
- Remove the hero CTA. Let the start of Gallery lead into the next section.

Open for visual review: final title scale/composition and supporting copy.
Font assignment, lowercase service wording, and CTA removal are settled.

## Gallery

Confirmed:

- Two columns on desktop, one on mobile, with generous spacing.
- Large previews, brief descriptions, and live-site links.
- Scroll-triggered entrances that play once and do not reverse when scrolling away.
- Click/tap interactions should feel deliberate and distinctive.
- Project clicks go directly to the live sites. The luxurious feel comes from the
  card interaction itself; do not insert an expanded preview or intermediary modal.

| Project | Type | Live URL |
| --- | --- | --- |
| Portage Place | Client build | https://portageplacesb.com |
| Veilburner | Client build | https://veilburner.band |
| Black Lodge Brews | Demo concept | https://black-lodge-brews.netlify.app |
| The Scrap Pit | Demo concept | https://the-scrap-pit.netlify.app |

Inferno Ink is removed. Confirmed order places client work first, with Portage Place
and Veilburner together to demonstrate range.

Proposed interaction:

- Reveal preview images through a restrained clipping animation with a slight
  image scale settling into place; reveal labels shortly afterward.
- On hover or keyboard focus, gently shift the image crop and introduce a cyan
  rule or live-site affordance. Keep the link visible on touch devices.
- On press, use a small visual compression and immediate link activation.
  Do not delay navigation to finish an animation or require two taps to visit.
- Keep all four projects available without opening a modal or learning a widget.

Open for visual review: preview crops and final descriptions. The accepted client-first
order is implemented. Cards link directly to live sites; technical-detail modals are removed.

## Contact and footer

Confirmed:

- Retain the current form, introductory copy, Privacy Policy, and Terms of Service.
- Preserve Netlify Forms integration and keep public/__forms.html in sync if fields
  change. Preserve the existing email fallback.
- Remove the Contact Logo component and its import.
- Center copyright at the bottom, in normal document flow.

Accepted and implemented:

- Group Instagram, LinkedIn, and email links near the form/footer.
- LinkedIn: https://linkedin.com/in/robertchambers12372
- Email: mailto:contact@garfishdigital.com, matching the existing contact address.
- Give icon links accessible names, generous touch targets, and visible focus states.
  Make the email address discoverable as text as well as through its icon.
- Keep successful submission feedback in Contact rather than navigating back home.

### Branding — confirmed

Accepted: use public/Garfish-circle-logo.svg as a small upper-left brand
mark after Home leaves the viewport, with a gentle fade. Reserve space so it never
covers project content on narrow screens. Omit the line-drawn fish if this is chosen.

The circle mark is implemented; the line-drawn fish is omitted.

The supplied circle SVG uses the exact Cyan Light value, a clipped solid fin shape,
and a circular outline. Its final size and thin outline need visual checks at actual
desktop/mobile display sizes.

## Implementation sequence

1. Settle Home title treatment, CTA direction, and branding placement.
2. Establish palette and font tokens, retaining self-hosted fonts.
3. Build the single-page section structure and remove obsolete navigation mechanics.
4. Add project previews, copy, and reusable motion treatments.
5. Integrate Contact and footer with minimal visual changes.
6. Update README.md and replace the outdated STYLE_GUIDE.md with the actual system.
7. Verify production build, lint, responsive layouts, keyboard use, reduced motion,
   link behavior, and contact feedback. Verify actual form delivery on Netlify.

## Working notes

- Existing uncommitted globals.css edits belong to the user and must be accounted
  for when consolidating the palette.
- The scroll-lab StaggerGroup and StaggerContext were inspected as references.
  SplitTextReveal.tsx was empty at the time of review. No tutorial code has been copied.
- First implementation is complete and ready for visual feedback; see the status above.



## Refinement after first local review

- User maintains the development server on port 3000 and handles visual confirmation.
  Do not start additional preview servers or change commented-out elements.
- Preserve the user's gray-faint, dotted-underlined legal-link styling.
- Both section dividers use Gray Shadow. Gallery and Contact now share 112–192px
  of upper breathing room; Gallery rows and the Contact footer have larger gaps.
  Contact also has 80–128px below the footer.
- Social order: email → LinkedIn → Instagram. Icons are 32px with 2px strokes,
  aligned 20-unit outer geometry, 52px targets, and once-on-entry line drawing.
  Socials and legal links now transition color over 0.55s.
- Restored the original legal overlay/panel/text/close-button motion. Native dialog
  mechanics remain underneath for focus containment and Escape handling; closing
  waits for the exit animation before restoring focus and background scrolling.
- Lint and isolated production build pass. Visual confirmation is left to the user
  on the continuously running port 3000 server.

## Second motion and spacing refinement

- Restored original Home statement timing: 0.8s left-to-right fade, original word
  delays, no blur. Existing layout and commented-out elements remain unchanged.
- Gallery hover/focus removes image zoom, fades a subtle tinted overlay away, and
  draws the cyan heading rule from right to left. Scroll-entry scaling is retained.
- Root scrollbar gutter is stable, with a transparent track and visible thumb.
  Modal scroll locking uses the root; restoring focus does not scroll the page.
- Social icons: Gray Faint, 1.8px strokes, envelope increased to 35px.
- Gallery and Contact top/bottom padding increased to 160–256px.
- Visual confirmation remains on the user's existing port 3000 server.

## Hero hierarchy and social timing refinement

- Enlarged the existing Courier Prime SVG wordmark and reduced the Inter service
  statement, reversing their visual hierarchy on desktop and mobile. Copy, motion,
  and commented-out elements are preserved.
- Social draw start offsets: envelope 0ms, Instagram 300ms, LinkedIn 800ms.
  Visual order stays email, LinkedIn, Instagram; internal stroke staggers remain.
- Social hover/focus lift reduced from 3px to 1.5px.

## Wordmark entrance trial — masked reveal

- The exact original two SVG lettering paths now live in HeroWordmark.jsx.
- Each row has its own clipping reveal and small upward settle over 1.2 seconds;
  Garfish starts at 80ms and Digital at 260ms. No blur or scale effect.
- Existing hero sizing, layout edits, comments, and service-statement animation remain.
- Reduced motion shows the complete mark immediately. Visual review stays on port 3000.

___


