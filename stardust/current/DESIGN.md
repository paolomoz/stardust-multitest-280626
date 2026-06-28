<!-- _provenance: writtenBy=stardust:extract; descriptive visual system of www.xfinity.com -->
---
colors:
  background: "#FFFFFF"
  surface: "#F6F6F9"
  ink: "#141417"
  black: "#000000"
  slate: "#4C4E54"
  primary: "#5A23B9"
  primary2: "#9013FE"
typography:
  heading: "Xfinity Sans (fallback DM Sans)"
  body: "Xfinity Brown (fallback DM Sans)"
rounded: "16px tiles; pill CTAs"
spacing: "generous; 80-120px section rhythm"
components: ["mega-nav header", "multi-column footer", "offer hover-tiles", "pill CTA", "price-callout headline", "compare table", "editorial article"]
---

# DESIGN — Xfinity (current state)

## Palette
Black + white foundation with a soft off-white surface (`#F6F6F9`) for sectioning.
The brand accent is the **Xfinity violet** `#5A23B9`, often run into a
violet→magenta gradient (`#5A23B9 → #9013FE`) — the signature of the current
Xfinity identity. Text is near-black `#141417` with a `#4C4E54` slate for
secondary copy.

## Typography
Headings in **Xfinity Sans** (observed as `XSans`), body in **Xfinity Brown**
(`XfinityBrown`), with `DM Sans` as the loaded fallback. The brand fonts are
licensed and not served to third parties; the migration substitutes **DM Sans**
for both roles (closest free geometric-humanist match). Heading scale is ad-hoc
(24/20/36/32px observed) — the redesign normalizes it to a clean modular scale.

## Motifs
- **Rounded image hover-tiles** (~16px radius) for offer merchandising.
- **Pill-shaped CTAs** (full-round), filled black or violet.
- **Price-callout headlines:** bold claim + concrete `$/mo` number.
- **Black full-bleed hero** with light overlay text.
- Soft shadows (`0 8px 24px rgba(0,0,0,.10)`) on tiles.

## Chrome
Persistent **mega-nav** (Internet, Mobile, TV & Streaming, Home Security, Build
your plan) and a **deep multi-column footer** (Company / Quick links / NOW
products / Legal). On the live site these are `xc-header` / `xc-footer` web
components; the migration rebuilds them as static EDS header/footer fragments.
