<!-- _provenance: stardust:direct — target visual system, Mode A brand-faithful. Tokens pinned to captured brand surface. -->
---
colors:
  background: "#FFFFFF"
  ink: "#000A3C"
  accent: "#0064FF"
  surface: "#F2F4FA"
  invert: "#FFFFFF"
typography:
  display: "'Paramount Vista Sans', 'Arial Narrow', sans-serif"
  body: "'Peak Sans', -apple-system, 'Segoe UI', sans-serif"
  displayTransform: uppercase
  scaleRatio: 1.333
rounded: small
spacing:
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }
components: [button-primary, button-secondary, card, brand-card, badge, link]
---

# Paramount — Target Visual System

## Color
- Ground white `#FFFFFF`.
- Ink deep-navy `#000A3C` — body and display type.
- Accent Paramount-blue `#0064FF` — CTAs, links, focus (white grounds only).
- Surface tint `#F2F4FA` — alternate sections and cards.
- Invert white `#FFFFFF` — text over video/photo heroes.

## Typography
- Display **Paramount Vista Sans**, 700, ALL-CAPS, large (clamp ~2.5rem→6rem on hero).
- Body **Peak Sans**, 300–700.
- Scale ratio 1.333 (perfect fourth).
- Brand fonts are licensed/proprietary; fall back to Arial Narrow (display) and system sans (body) — no webfont CDN dependency.

## Spacing
4pt base; section padding 64/48/32 (balanced, multi-audience hard floor).

## Components
- **button-primary**: blue fill `#0064FF`, white uppercase label, small radius.
- **button-secondary**: navy outline, navy uppercase label, transparent fill.
- **card**: white, small radius, subtle shadow.
- **brand-card**: square (1:1) image + uppercase label, navy ground option.
- **badge**: small uppercase eyebrow, navy or blue.
- **link**: navy → blue on hover, underline on hover.

## Motifs
All-caps oversized display; full-bleed video heroes (reproduced, reduced-motion poster fallback, legibility scrim); square brand cards; navy-on-white with single blue accent.

## Motion
Register: `kinetic-display` (display-typography-signature + signage-led). Gentle entrance fades + parallax on hero; respect `prefers-reduced-motion`.
