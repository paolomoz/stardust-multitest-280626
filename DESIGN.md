---
colors:
  background: "#ffffff"
  surface: "#f5f5f5"
  surfaceDeep: "#efefef"
  ink: "#000000"
  inkMuted: "#656565"
  hairline: "#d6d6d6"
  primary: "#000000"
  link: "#0a5eb2"
  chrome: "#000000"
typography:
  headingFamily: "SST, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  bodyFamily: "SST, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  scaleRatio: 1.25
  weights: [400, 700]
rounded: "4px"
spacing:
  base: "4pt"
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }
components: [button-primary, button-secondary, card, badge, link, hero-carousel]
---

# DESIGN — Sony Group Portal (target system)

## Palette
Monochrome by design. White canvas (`#ffffff`), black chrome (`#000000`), true-black
headings (`#000000`), muted-grey supporting text (`#656565`), light-grey section
surfaces (`#f5f5f5` / `#efefef`), thin grey hairlines (`#d6d6d6`). Color enters only
through full-bleed photography. Links use Sony blue (`#0a5eb2`). No gradients, no glass.

## Typography
**SST** — Sony's proprietary corporate typeface (Roman 400 / Bold 700), served as woff2
with a `'Helvetica Neue', Arial` fallback. Modernized scale (1.25 ratio): hero display
40–56px Bold, section heads 30–32px Bold true-black, sub-heads 20px, body 16px Roman
`#656565`, eyebrow/meta 13px uppercase tracked. Headings anchor in black; muted grey is
reserved for meta and supporting copy.

## Spacing & layout
4pt base scale. Section padding 64px desktop / 48px tablet / 32px mobile (balanced tier,
multi-audience hard floor ≤64px). 12-column editorial grid, generous gutters, content
max-width ~1200px. Full-bleed heroes break the grid.

## Components
- **button-primary** — solid black `#000` on white, white label, 4px radius, no shadow.
- **button-secondary** — black 1px outline, black label on white, 4px radius.
- **card** — white surface, 4px radius, thin hairline border, full-bleed top image,
  category badge, title in black, meta in grey. Flat (no drop shadow).
- **badge** — small uppercase category tag (Movies & TV, TV, Audio), grey on light.
- **link** — Sony blue `#0a5eb2`, underline on hover.
- **hero-carousel** — full-bleed rotating photography, left-anchored display headline
  with bottom-up legibility scrim, play-button overlay for video stories, circular dots.

## Motifs
Full-bleed hero carousel; category-tagged news cards; thin grey hairline dividers;
generous whitespace; flat surfaces. 4px radius throughout; circular carousel dots.

## Motion
Editorial register — quiet. Auto-rotating hero (pauses on `prefers-reduced-motion`),
subtle fade/translate reveals on scroll. No parallax theatrics. Durations ~400ms,
ease-out.
