---
colors:
  background: "#FFFFFF"
  surface: "#F5F7FA"
  surfaceAlt: "#EDF0F2"
  text: "#001435"
  textMuted: "#696969"
  primary: "#003087"
  primaryDeep: "#001C64"
  accent: "#0070E0"
  accentLight: "#60CDFF"
  accentPale: "#B8E9FF"
typography:
  headingFamily: 'PayPal Open, "PayPal Sans", "Helvetica Neue", Arial, sans-serif'
  bodyFamily: '"PayPal Sans", Plain, "Helvetica Neue", Arial, sans-serif'
  scale: ad-hoc
rounded: pill
spacing: generous
components:
  - pill-button
  - rounded-image-card
  - stat-counter
  - logo-strip
  - layered-photo-card
  - feature-trio
---

# PayPal (US) — Visual System (descriptive)

## Color
PayPal's signature blue system: deep navy text (#001435) on white, with a
brand-blue ladder — #001C64 (deep) → #003087 (primary) → #0070E0 (bright
accent) → #60CDFF (light) → #B8E9FF (pale). Neutral surfaces are cool grays
(#F5F7FA, #EDF0F2) and an occasional warm cream (#FAF8F5) on editorial pages.
High contrast: blue-on-white and white-on-navy bands.

## Typography
Brand sans throughout — "PayPal Open" / "PayPal Sans" (rendered as `Plain`
and `PayPalOpen-Bold` in computed styles), with `PayPal Pro` for some display
weights. Large confident display headings; plain readable body. Heading scale
is ad-hoc/expressive (big hero statements, animated numeric counters).

## Shape & motion
- **Radius:** pill (1000px) CTAs and chips; 12px image/content cards; 8px
  controls.
- **Shadow:** soft elevation (0 2px 8px / 0 8px 24px rgba(0,0,0,.08–.12)).
- **Motion:** animated stat counters (rewards %), scroll-reveal sections,
  layered photo cards. Signature motion is the counting-number reward stats
  and photographic hero — reproduce as light reveal/count animation, not flat.

## Imagery
Real lifestyle photography (people shopping, everyday moments), product
screenshots (app, cards, POS hardware), and partner/brand logo strips. Image
register is warm and human. Assets served from `paypalobjects.com` as
`<img>`/`<picture>` webp rasters (no CSS-background heroes).

## Signature components
Pill button, rounded image card, feature trio, animated stat counter, logo
strip, layered photo card, fee table, article card grid.
