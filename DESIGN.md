---
colors:
  background: "#ffffff"
  surface: "#f7f7f7"
  text: "#000000"
  muted: "#6b6b6b"
  primary: "#2189ff"
  primaryDark: "#1428a0"
  cta: "#000000"
  border: "#dcdcdc"
typography:
  headingFamily: "SamsungSharpSans, 'Helvetica Neue', Arial, sans-serif"
  bodyFamily: "SamsungOne, 'Helvetica Neue', Arial, sans-serif"
  headingWeights: [500, 700]
  bodyWeights: [400, 700]
  scaleRatio: 1.333
rounded: "20px"
spacing:
  base: 4
  sectionPadding:
    desktop: 64px
    tablet: 48px
    mobile: 32px
components: [button-primary, button-secondary, card, link, badge, input]
motion:
  register: kinetic-grid
---

# DESIGN — Samsung US (redesign target)

## North star
A faithful, modernized Samsung US: the same confident, product-led identity, executed with real semantic headings, a scannable card-grid catalog, and one decisive CTA system — recognizably Samsung, with the obvious fixes applied.

## Color
White-dominant canvas; `#f7f7f7` secondary surface for cards and alternating bands. Near-pure black text (`#000`) and muted `#6b6b6b` for secondary copy. Single interactive accent: Samsung blue `#2189ff` (corporate anchor `#1428a0`). Primary CTAs are **black pills** on white; product photography supplies the chroma. (Pins inherited from the captured brand surface — Mode A.)

## Typography
- **Headings:** SamsungSharpSans (Medium 500 / Bold 700), geometric and confident, at a 1.333 modular scale — display sizes for heroes (`clamp(2rem, 5vw, 3.25rem)`), bold section headers on inner pages.
- **Body:** SamsungOne (400 / 700), humanist and legible for descriptions, specs, and support copy.
- Both are proprietary Samsung faces, served as captured woff2 with a Helvetica Neue / Arial fallback stack.

## Shape & depth
Large rounded geometry: 20px card radius, pill CTAs (999px), circular category chips. Flat surfaces; depth from `#f7f7f7` tint over white rather than drop shadows.

## Layout & rhythm
Full-bleed hero (real headline + one CTA over photography) → category-tile row → responsive product-card grid (2-up mobile, 3-up tablet, 4-up desktop) → editorial/feature bands → deep footer. Balanced 64px desktop section rhythm (multi-audience hard floor honored: 40–64px).

## Components
- **button-primary** — black pill, white text, 999px radius, SamsungOne 700.
- **button-secondary** — quiet text link in `#2189ff` with "Learn more →" affordance.
- **card** — 20px radius, `#f7f7f7` surface, product image + name + short line + CTA.
- **badge** — small uppercase eyebrow label, SamsungSharpSans Medium.
- **link** — `#2189ff`, underline on hover.

## Motion (kinetic-grid)
Grid/card entrances stagger in on scroll; hero photography may parallax/animate (autoplay video on source) with a static fallback and `prefers-reduced-motion` honored. Carousels become grids; remaining rails get gentle snap. Register selected because brand personality is `product` / `modular-catalogue` / `transactional`.
