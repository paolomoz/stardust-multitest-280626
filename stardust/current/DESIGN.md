<!-- _provenance: stardust:extract — descriptive visual snapshot of samsung.com/us. Tokens aggregated cross-page. -->
---
colors:
  background: "#ffffff"
  surface: "#f7f7f7"
  text: "#000000"
  primary: "#2189ff"
  primaryDark: "#1428a0"
  cta: "#000000"
  border: "#dcdcdc"
typography:
  headingFamily: "SamsungSharpSans"
  bodyFamily: "SamsungOne"
  headingWeights: [500, 700]
  bodyWeights: [400, 700]
  scale: "modular, large display"
rounded: "20px"
spacing: "generous (section padding 64-96px, card gap 16-24px)"
components: [site-header, site-footer, product-card-grid, category-tile-row, cta-band, hero, carousel]
---

# DESIGN — Samsung US (current state)

## Color
White-dominant canvas with a soft `#f7f7f7` secondary surface for cards and alternating sections. Text is near-pure black. Interactive accent is Samsung blue `#2189ff`; the corporate anchor blue is `#1428a0`. Primary CTAs render as **black pills** on white (occasionally white pills on imagery). Color is used sparingly — the product photography supplies the chroma.

## Typography
- **Headings:** SamsungSharpSans (Medium 500 / Bold 700) — geometric, confident, used at large display sizes for hero and section headlines.
- **Body:** SamsungOne (400 / 700) — humanist, highly legible at small sizes for descriptions, specs, and support copy.
- Both are proprietary Samsung brand faces (captured as woff2) and are the most distinctive part of the visual identity.

## Shape & depth
Large rounded geometry: 20px card radius, pill-shaped CTAs (50% radius), circular category chips. Depth comes from surface tinting (`#f7f7f7` over white) rather than drop shadows — the look is flat and clean.

## Layout & rhythm
Full-bleed hero with large product imagery → "shop by category" tile row → product card grids → editorial/feature bands → deep footer. Generous vertical spacing (64–96px section padding). Consistent product-card system across every category page.

## Motion (signature)
Heroes are motion-forward (autoplay product video / animated reveals on the live site). Carousels for product rails. To reproduce faithfully, hero sections should animate (with a static fallback + `prefers-reduced-motion`).
