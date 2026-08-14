# GreenLead Solutions — Website Source

## Structure
```
greenlead-website/
├── index.html          → Page structure & content (all sections)
├── css/
│   └── styles.css      → All styling (colors, layout, typography)
├── js/
│   └── main.js         → Hero canvas animation (power grid ↔ network morph)
├── assets/
│   ├── logo-icon.png   → Icon-only mark (transparent background)
│   └── logo-full.png   → Full lockup: icon + "GreenLead SOLUTIONS" wordmark
└── README.md            → This file
```

## How to preview
Just open `index.html` in any browser — no build step, no server needed
(everything is plain HTML/CSS/JS). Double-click the file, or drag it into a
browser window.

## How to edit

**Brand colors** — all defined once at the top of `css/styles.css`:
```css
:root{
  --green-deep:#163F37;   /* primary dark green */
  --green-mid:#1F5748;    /* lighter green, used for hover states */
  --gold:#0AF4AF;         /* mint/spring green accent — despite the
                              variable name "gold" (left over from an
                              earlier draft), this is your accent color */
  --cream:#F4F2EA;        /* light background */
  --ink:#12201B;          /* body text on light backgrounds */
  --grey:#5A6B64;         /* secondary/muted text */
}
```
Change a value here and it updates everywhere that color is used.

**Text content** — edit directly in `index.html`. Sections are commented
with their purpose (hero, thesis, services, segments, case study, CTA,
footer) and roughly follow this order top to bottom on the page.

**Fonts** — Poppins (brand font) + IBM Plex Mono (small labels/eyebrows
only, e.g. "COREN-CERTIFIED · NIGERIA"). Loaded via Google Fonts link tags
at the top of `index.html`. To change, edit the `<link href="...fonts...">`
tag and the `font-family` values in `css/styles.css`.

**Logo** — swap `assets/logo-icon.png` or `assets/logo-full.png` with a
new export (keep transparent PNG background) and the file names the same,
and it'll update everywhere automatically.

**Case study numbers** — currently placeholder/illustrative
(food processing SME example). Find the `<section class="section case">`
block in `index.html` and replace with your first real client's numbers
once you have one.

**Contact details** — search `index.html` for `[phone]` and
`hello@greenleadsolutions.ng` and replace with your real contact info
(footer and the "Book a Free Energy Audit" mailto link in the CTA section).

## Deploying it live
This is a static site — no backend required. You can host it for free on:
- **Netlify** or **Vercel** — drag-and-drop the whole folder
- **GitHub Pages** — push the folder to a repo, enable Pages in settings
- Any standard web host — upload the folder via FTP

## Notes
- The hero background animation is pure Canvas + JS (`js/main.js`), no
  external libraries — it respects `prefers-reduced-motion` for
  accessibility.
- Fully responsive down to mobile (single breakpoint at 860px).
- No frameworks, no build tools — safe to hand to any web developer to
  extend without onboarding.
