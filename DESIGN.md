---
colors:
  background: "#FFFFFF"
  surface: "#F5F7FA"
  surfaceAlt: "#EDF0F2"
  ink: "#001435"
  inkMuted: "#5A6B82"
  brandDeep: "#001C64"
  brand: "#003087"
  brandBright: "#0070E0"
  brandLight: "#60CDFF"
  brandPale: "#B8E9FF"
typography:
  headingFamily: 'PayPalOpen, "PayPal Open", "Helvetica Neue", Arial, sans-serif'
  bodyFamily: 'PayPalSans, "Helvetica Neue", Arial, sans-serif'
  scaleRatio: 1.333
rounded: pill
spacing:
  base: 4pt
  sectionPadding:
    desktop: 64px
    tablet: 48px
    mobile: 32px
components:
  - button-primary
  - button-secondary
  - card
  - input
  - badge
  - link
---

# PayPal (US) — Target Visual System

## North Star
Faithful PayPal, executed at a 2026 standard: photographic, confident,
trustworthy. Recognizably PayPal — same blue ladder, same brand sans, same
pill CTAs — with cleaner hierarchy, bigger imagery, and calmer density.

## Color
PayPal's blue system, pinned from the captured brand surface:
- **Ink** `#001435` (text) and muted `#5A6B82`.
- **Brand ladder:** `#001C64` deep → `#003087` primary → `#0070E0` bright
  accent → `#60CDFF` light → `#B8E9FF` pale.
- **Grounds:** white `#FFFFFF`, cool surfaces `#F5F7FA` / `#EDF0F2`.
- High-contrast bands: white-on-navy heroes, blue-on-white sections.
Reserve `#0070E0` for accents/CTAs on white; never as small text on grey.

## Typography
PayPal Open for display/headings, PayPal Sans for body (captured brand
families; web-safe fallback Helvetica Neue/Arial). Modular scale ratio 1.333
for confident display headings. Mixed-case headlines (not all-caps);
short eyebrow labels and CTAs may use tracked uppercase.

## Shape & Density
- **Radius:** pill (`999px`) for buttons/chips; `12px` for image and content
  cards; `8px` for inputs/controls.
- **Shadow:** soft elevation — `0 2px 8px rgba(0,20,53,.08)`,
  `0 8px 24px rgba(0,20,53,.12)`.
- **Density:** balanced — 64px desktop section padding (multi-audience hard
  floor), 48px tablet, 32px mobile.

## Motion
Register `kinetic-grid`: restrained, grid-aware reveals; signature motion is
the **animated stat counter** (rewards %, send stats) — reproduce as a count
animation, not a static number. Gentle fade-up on section entrance. All motion
respects `prefers-reduced-motion`.

## Imagery
Real lifestyle and product photography (people shopping, app/card/POS
screenshots), partner/brand logo strips. Warm, human register. `<img>`/
`<picture>` webp from paypalobjects.com; legibility scrim under text-over-photo.

## Components
- **button-primary** — pill, `#0070E0` on white (or white on `#003087`),
  no gradient.
- **button-secondary** — pill outline / text-link, brand ink.
- **card** — 12px radius, soft shadow, photo-led or content.
- **input** — 8px radius, 1px `#EDF0F2` border, navy focus ring.
- **badge** — pill, pale blue `#B8E9FF` ground, deep brand text.
- **link** — brand bright `#0070E0`, underline on hover.
