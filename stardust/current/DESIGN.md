---
colors:
  background: "#ffffff"
  surface: "#efefef"
  text: "#000000"
  textMuted: "#656565"
  primary: "#000000"
  accentLink: "#0a5eb2"
  headerBar: "#000000"
typography:
  headingFamily: "SST, 'Helvetica Neue', Arial, sans-serif"
  bodyFamily: "SST, 'Helvetica Neue', Arial, sans-serif"
  scale: ad-hoc
rounded: "4px"
spacing: "generous (whitespace-led)"
components: [hero-carousel, news-cards, section-landing-grid, social-row, mega-menu-header, minimal-footer]
---

# DESIGN — Sony Group Portal (current state, descriptive)

## Palette
Monochrome by design. White canvas (`#ffffff`), black chrome (`#000000`),
muted grey body text (`#656565`), light-grey surfaces (`#efefef`/`#f5f5f5`),
thin grey borders (`#cccccc`). Color enters only through full-bleed photography.
Links use a Sony blue (~`#0a5eb2`).

## Typography
**SST** — Sony's proprietary corporate typeface (SST W20 Roman / SST W20 Bold),
served as woff2. Headings in Bold, body in Roman. Sizes are ad-hoc rather than a
strict modular scale: card titles ~16px, sub-heads ~20px, section heads ~30px,
hero heads ~40px. FontAwesome supplies utility icons.

## Motifs
- Full-bleed **hero image carousel** (swiper.js), auto-rotating, with play-button
  overlays on video stories — the page signature.
- Category-tagged **news cards** (Movies & TV, TV, Audio).
- 4px border-radius on cards/buttons; 50% circular carousel dots.
- Flat, shadow-light surfaces; thin grey hairline dividers.
- Generous whitespace; editorial alignment.

## Chrome
- **Header:** black bar, white Sony wordmark logo, mega-menu navigation, region/search.
- **Footer:** minimal legal links + social icon row + copyright.

## Motion
Quiet. Auto-rotating hero carousel; subtle fade/reveal on scroll. No heavy parallax.
