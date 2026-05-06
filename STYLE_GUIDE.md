1. The "Vanguard" CSS Variables
Add these to your globals.css or main stylesheet. I’ve tuned the HSL values to ensure they feel "heavy" and expensive.

```CSS
@layer base {
  :root {
    /* --- THE FOUNDATION --- */
    /* Deepest obsidian. Use for main page backgrounds. */
    --void: 220 15% 2%; 
    
    /* Slightly lighter "charcoal." Use for cards, sections, or "inner" containers. */
    --chamber: 220 10% 7%; 
    
    /* A muted gray-black. Use for borders on dark elements or subtle "hidden" text. */
    --cipher: 220 5% 15%;

    /* --- THE LIGHT --- */
    /* Your Bone White. Primary text color. High contrast but soft on the eyes. */
    --relic-bone: 45 15% 89%; 

    /* --- THE METALS --- */
    /* The core "Authority" Gold. Best for primary icons and headers. */
    --altar-gold: 44 50% 52%; 
    
    /* A darker, "weathered" brass. Perfect for secondary accents or shadows. */
    --tarnish: 41 64% 34%; 

    /* --- THE GLOW (Gradients) --- */
    /* The "Liquid Gold" look from your button. */
    --gold-leaf-start: #f9e7b3;
    --gold-leaf-mid: #e6c97a;
    --gold-leaf-end: #bfa14a;
  }
}
```
2. Tailwind Configuration
Copy this into your tailwind.config.js. This maps the "cool" names to usable utility classes.

```JavaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Use: bg-void (Main background)
        void: "hsl(var(--void))",
        // Use: bg-chamber (Card backgrounds, dropdowns)
        chamber: "hsl(var(--chamber))",
        // Use: border-cipher (Subtle dividers between dark sections)
        cipher: "hsl(var(--cipher))",
        // Use: text-relic (All primary body and header text)
        relic: "hsl(var(--relic-bone))",
        // Use: text-altar (Primary calls to action, brand highlights)
        altar: "hsl(var(--altar-gold))",
        // Use: text-tarnish (Muted metadata, secondary icons, breadcrumbs)
        tarnish: "hsl(var(--tarnish))",
      },
      backgroundImage: {
        // The "Hero" Gradient: Use 'bg-gold-leaf' for buttons or pinstripe borders
        'gold-leaf': "linear-gradient(120deg, var(--gold-leaf-start) 0%, var(--gold-leaf-mid) 50%, var(--gold-leaf-end) 100%)",
        // The "Hover" Gradient: A slightly brighter flash for interaction
        'gold-flash': "linear-gradient(120deg, #f7f3e2 0%, #e6c97a 60%, #bfa14a 100%)",
      },
      boxShadow: {
        // A subtle "occult" glow for buttons or active icons
        'altar-glow': '0 0 15px -3px rgba(191, 161, 74, 0.4)',
      }
    },
  },
}
```
3. Deployment Strategy (How to use these)
For "Luxury" Typography: Use text-relic for your body text, but use text-altar specifically for drop-caps or the first word of a luxury service description.

The "Pinstripe" Border: Instead of a thick gold block, use a 1px border with the gold gradient. In Tailwind:
<div class="p-[1px] bg-gold-leaf"> <div class="bg-void p-6"> Content </div> </div>
This creates a razor-thin gold inlay look that feels like a high-end watch box.

The "Hidden" Layer: Use text-cipher for decorative background text (like large, faint Roman numerals or brand mottos). It won't be immediately visible, which adds to the Mystery of the brand.

The Hero Button:

```HTML
<button class="bg-gold-leaf hover:bg-gold-flash text-void font-bold py-3 px-8 rounded-sm shadow-altar-glow transition-all">
  ENTER THE VOID
</button>
```
___


1. Google Font Pairings: "The Alchemist & The Architect"
To achieve "Luxury Edgy," we look for High-Contrast Serifs (The Alchemist) paired with Geometric or Humanist Sans-Serifs (The Architect).

Option A: The "Ancient Power" Duo (Highly Recommended)
Header (Serif): Cinzel

Psychology: Modeled after first-century Roman inscriptions. It feels monumental, pagan, and permanent. It screams "Authority."

Body (Sans): Inter

Psychology: A hyper-modern, clean typeface. The contrast between the "ancient" header and the "digital-precise" body creates a "High-End Agency" vibe.

Tailwind: font-serif for Cinzel, font-sans for Inter.

Option B: The "Noir Editorial" DuoHeader (Serif): Playfair DisplayPsychology: High-contrast strokes (thick and thin) mimic high-fashion magazines and luxury watches. It’s "edgy" because of its sharp, needle-like serifs.Body (Sans): Montserrat (Light weight, e.g., 300)Psychology: Geometric and balanced. Using it in a lighter weight against your void background makes it look sophisticated and airy.

2. Iconography: The Battle of Aesthetic vs. ReliabilityYou mentioned Google Material Icons (Sharp) vs. Lucide vs. Phosphor.The Decision: Use Phosphor IconsWhy? In the psychology of luxury, "Material Icons" are the enemy. They are built for utility and "Googley" friendliness. They feel like a utility bill—not a boutique tattoo studio.

Icon LibraryStyleBest Fit for Garfish Digital?Material (Sharp)Technical, BlockyNo. It feels "Standard Corporate."Lucide ReactConsistent, FriendlyMaybe. It's clean, but can feel a bit "SaaS-y."Phosphor IconsThin/Light/DuotoneYes. It offers a "Thin" weight that looks incredibly premium on dark backgrounds.

The "Luxury" Icon Strategy:Use "Thin" or "Light" Weights: Thick icons feel "loud" and "cheap." Thin icons (1px stroke) feel like jewelry.Phosphor’s "Duotone" Style: You can set the secondary color of the icon to your tarnish (brass) color and the primary to altar (gold). This creates a custom, multi-dimensional look that Google Icons cannot replicate.

3. The "Hidden" Design Secret: Custom SVGs
For your most important brand touchpoints (the "Services" section or "Our Process"), Custom SVGs are non-negotiable.

Insight: Luxury is about Exclusivity. If a user sees the same "Web Development" icon they saw on a $20 template, the luxury illusion breaks.

Strategy: Use Phosphor for UI elements (arrows, close buttons, social links), but use custom-illustrated SVGs (geometric sigils, occult-inspired line art) for your main service offerings.

4. Final Recommendation Summary
Typography: Cinzel (Headings) + Inter (Body). Set your Cinzel headers to tracking-widest in Tailwind to give them that "breathing" luxury feel.

Icons: Phosphor Icons. Specifically use the Thin weight. It will look like a gold needle on your void background.

Borders: Use that Gold Leaf Gradient as a 1px border for your icons. It makes them look "framed."


To integrate Cinzel and Inter into your Tailwind configuration, you’ll want to treat them as distinct "Atmospheres."

In luxury design, letter-spacing (tracking) is just as important as the font itself. Tight text feels crowded and "discount"; wide text feels expensive and "archival."

1. The Tailwind Configuration
Update your tailwind.config.js to include these custom families. I’ve added a specific "Alchemist" heading style that automatically applies the correct luxury spacing.

```JavaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // THE ALCHEMIST: Use for Headers, Titles, and Sigils
        // Best paired with: tracking-widest (Luxury spacing)
        alchemist: ['Cinzel', 'serif'],
        
        // THE ARCHITECT: Use for Body, UI, and Technical details
        // Clean, readable, and precise.
        architect: ['Inter', 'sans-serif'],
      },
    },
  },
}
```
2. Implementation: The "Dark Luxury" Typography Scale
Here is how you actually use these in your components to ensure they project that "Vanguard" authority.

```HTML
<h1 class="font-alchemist text-altar text-4xl uppercase tracking-[0.2em]">
  Garfish Digital
</h1>

<p class="font-architect text-relic font-light leading-relaxed max-w-prose">
  Forging digital experiences for those who dwell in the shadows. 
  We blend ancient aesthetics with modern precision.
</p>

<button class="font-alchemist text-xs tracking-widest text-altar border-b border-tarnish pb-1 hover:text-relic hover:border-altar transition-all">
  VIEW THE GALLERY
</button>
```
3. Psychology of the Typography Layout
When building your "Edgy Luxury" site, keep these two rules in mind to maintain the brand's mystery:

Vertical Rhythm: Luxury sites often use massive white space (or in your case, void space) between sections. It signals that you are not desperate for space—you own it.

The "Whisper" UI: Use very small font sizes (10px–12px) for utility items like navigation or labels, but set them in font-alchemist with tracking-widest. This makes the text look like an intricate engraving rather than a menu.

4. Phosphor Icons Integration
Since you are using Tailwind, you can easily integrate Phosphor Icons. I recommend using the Thin weight to match the sharp lines of Cinzel.

Weight: Thin (1px or 2px stroke).

Color: Use text-tarnish for the icon and text-altar only when the user hovers over the parent element.
