<!-- _provenance: writtenBy=stardust:direct; input="faithful redesign, modernized" (hands-off default) -->
# Direction — Xfinity migration

**One canonical direction (no variants, hands-off):** *Faithful Xfinity, modernized.*

## Rationale
Xfinity's brand DNA is unambiguous from extraction: a black + white foundation
with the signature **violet→magenta** accent, bold benefit-led headlines, rounded
image hover-tiles merchandising offers, pill CTAs, and an address-first conversion
path. The migration reproduces this faithfully while normalizing the ad-hoc
heading scale to a clean modular scale and substituting **DM Sans** for the
licensed Xfinity Sans/Brown (closest free geometric-humanist match).

## Pinned tokens
- Palette: bg `#FFF`, surface `#F6F6F9`, ink `#141417`, black `#000`, violet
  `#5A23B9` (primary), magenta `#9013FE` (gradient stop), slate `#5A5E66`.
- Type: DM Sans for both heading + body roles (brand uses a single geometric sans).
- Radius: 16px tiles, pill (full-round) CTAs.
- Motion: subtle tile hover-lift; gradient accents. No captured background
  video/canvas/Lottie in the hero (heroMedium=null) — static brand imagery.

## Axes moved
- Fidelity: high (reproduce, don't reinvent).
- Density: medium-high (offer-grid merchandising).
- Energy: high (promotional, value-forward voice preserved verbatim).

## Content rule
All authored copy is captured verbatim from the live source page JSON under
`stardust/current/pages/`. No fabricated offers, prices, or facts. Where a real
asset/section is missing, render gracefully and log the gap.
