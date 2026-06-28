<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-28
  mode: A (brand-faithful)
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - header: _brand-extraction.json#systemComponents.header
    - hero-carousel: pages/home.json#landmarks[hero] (13 story slides)
    - news-rail: pages/home.json Latest News landmark
    - vision-band: pages/home.json Creative Entertainment Vision
    - social-row: pages/home.json#systemComponents.socialRow
    - footer: _brand-extraction.json#systemComponents.footer
  signatureElements:
    - kind: image-carousel
      capturedSource: pages/home.json#landmarks[hero]
      mechanism: auto-rotating full-bleed photography w/ left-anchored display headline + scrim
      fallback: first slide static, prefers-reduced-motion pauses autoplay
  voiceClassification:
    - section: hero, classification: captured-verbatim
    - section: news, classification: captured-verbatim
    - section: vision, classification: captured-verbatim
-->

# Shape brief — home (Sony Group Portal)

## Surprise budget: low (Mode A, brand-faithful + improvements)

## Sections
1. **header** (system-component) — black bar, white Sony wordmark logo, mega-menu nav
   (Businesses & Products, About Sony Group, Technology, Sustainability, Design,
   Employees/Careers, Investor Relations, Contact Us), search + region. Sticky top.
2. **hero-carousel** (signature, captured) — full-bleed rotating photography. Active slide:
   left-anchored display headline (40-56px SST Bold, white) + one-line deck over a
   bottom-up legibility scrim; category eyebrow; play-button for video stories.
   13 real slides (Spider-Man Brand New Day, Spidey Tracker, BRAVIA short film,
   Legacy of Sound, 1000X Series, Creative Entertainment Vision, etc.). Circular dots.
   *Improvement #1:* headline promoted from 16px caption to display scale.
3. **vision-band** (captured) — "Creative Entertainment Vision" — full-bleed editorial
   band linking to CEV portal.
4. **news-rail** (captured) — "Latest News" — heading in TRUE BLACK (improvement #3).
   3-col grid of category-tagged story cards (badge + title + deck), deduped against hero
   (improvement #2). Movies & TV / TV / Audio tags.
5. **social-row** (captured, improvement #5) — "Follow us on social media" intentional band
   with 6 channels (Instagram, Facebook, X, YouTube, LinkedIn, TikTok).
6. **footer** (system-component) — light surface; legal links (Terms, Privacy, Cookie,
   Accessibility, About this Site, Site Map) + social + copyright.

## Layout strategy
Full-bleed hero breaks the 1200px content grid. News rail on a 12-col editorial grid,
3 cards desktop / 1 mobile. Monochrome chrome; color only from photography. Flat surfaces.

## Anti-template pass
- hero: chose full-bleed-photo-carousel with left-anchored overlay over centered-stack
  dual-CTA (rejected — anti-ref). Preserved because the carousel IS Sony's signature.
- news cards: 3-up editorial cards over 5-up category nav grid.

## Key states
- carousel: autoplay, pause on hover + prefers-reduced-motion; dots + arrows; keyboard nav.
- cards: hover lifts image slightly (no shadow), title underline.

## Unsourced content
- none (all copy + imagery captured verbatim from pages/home.json).
