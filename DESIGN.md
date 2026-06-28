---
colors:
  navy: "#012169"          # primary — wordmark, headings, primary buttons
  red: "#e31837"           # accent — flagscape, highlights (used sparingly)
  heroBlue: "#1668c9"      # hero band
  heroBlueDeep: "#0a3bb0"  # hero gradient deep stop
  link: "#1564bf"          # link CTAs
  background: "#ffffff"
  surface: "#f4f6f8"       # alt section band
  surfaceAlt: "#eef1f5"
  text: "#1a1a1a"
  textMuted: "#5a6470"
  border: "#d4dae1"
typography:
  heading: "'Helvetica Neue', Arial, system-ui, sans-serif (grotesk; proxy for BofA proprietary face)"
  body: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
  scaleRatio: 1.25
rounded: "12px cards, 999px pill buttons, 6px inputs"
spacing:
  base: "4pt"
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }  # balanced (multi-audience floor)
components: [button-primary, button-secondary, card, input, badge, link, trust-strip]
---

# DESIGN — Bank of America (target visual system)

## Overview
A modernized, faithful execution of the Bank of America brand. Navy + red + white
flagscape identity. Royal-blue hero bands (white text on a navy→blue gradient),
white content with light-gray section alternation, real photography, and clean
3-up card grids. Pill primary CTAs in navy; secondary CTAs as white outline or
underlined blue link. Persistent FDIC/trust signalling.

## Color
Navy `#012169` is primary (headings, primary fills, wordmark). Red `#e31837` is a
sparing accent (flagscape, occasional highlight rule) — never large fills. Hero
bands use a navy→royal-blue gradient (`#0a3bb0`→`#1668c9`) with white text. Body
text `#1a1a1a` on white; alt sections on `#f4f6f8`.

## Typography
Grotesk sans throughout (proxy for the proprietary BofA typeface). Large, fairly
light display headings; comfortable 16–18px body; 1.25 modular scale. Mixed-case
headlines.

## Spacing & layout
4pt base. 64px desktop section padding (balanced; multi-audience floor). Max
content width ~1200px. 3-up responsive card grids collapsing to 1-up on mobile.

## Components
- **button-primary**: navy pill, white text, hover darken.
- **button-secondary**: white pill, navy border + text; or underlined blue link CTA.
- **card**: white, 12px radius, soft shadow, image top, heading + copy + link.
- **input**: 6px radius, 1px border, navy focus ring.
- **badge**: small pill, used for offers ("NEW OFFER", "No annual fee").
- **trust-strip**: thin gray band with FDIC mark + statement.

## Motion
Arrival register — restrained entrance fades on first viewport, no parallax
excess. Respect `prefers-reduced-motion`.
