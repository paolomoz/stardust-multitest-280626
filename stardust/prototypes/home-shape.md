<!--
_provenance:
  writtenBy: stardust:prototype (Phase 1)
  readArtifacts: [stardust/current/pages/home.json, stardust/current/_brand-extraction.json, DESIGN.json, stardust/direction.md]
  mode: A (brand-faithful)
  surprise: low
  capturedSourceLineage:
    - hero: pages/home.json#h1 "New: Blue coconut for a cause" + img 137-108864.jpg
    - promo-grid: pages/home.json h2 promos (summer / cold coffee / energy / Myles Smith) + imgs
    - quick-links: pages/home.json footer-link clusters (About/Careers/Social Impact/Business/Order)
    - header+footer: _brand-extraction.json#systemComponents
  voiceClassification:
    - {section: hero, classification: captured-verbatim, copy: "New: Blue coconut for a cause"}
    - {section: order-band, classification: captured-verbatim, copy: "It's a great day for coffee"}
    - {section: promos, classification: captured-verbatim}
-->

# Shape brief — home

Single substrate: white ground with one cream (#F7F0E4) band. surprise: low (brand-faithful + improvements).

## Sections
1. **header** (system-component) — Siren logo + nav: Menu, Rewards, Gift Cards | Find a store, Sign in, Join now (green pill). Sticky.
2. **hero** — full-bleed photo (137-108864.jpg, iced blue/matcha drinks), left-anchored gradient scrim, eyebrow "NEW", H1 "Blue coconut for a cause", primary CTA "Order now" -> /starbucks/menu/featured. (Improvement #1: one dominant hero, single CTA; #5: legibility scrim.)
3. **order-band** — cream band: "It's a great day for coffee" + "Start an order" pill -> /starbucks/menu. (Improvement #2: one canonical action.)
4. **promo-grid** — 3-up rounded photo cards: "It's Starbucks summer" (137-108640), "Bold, iced and deliciously classic" (137-108405 -> cold-coffee), "Good energy in every sip" (137-108664 -> refreshers). Larger cards, image-top. (Improvement #4.)
5. **feature-split** — "One night with Myles Smith" person photo (137-109052) + short copy, secondary link.
6. **quick-links** — compact link directory: About Us, Careers, Social Impact, For Business Partners, Order and Pick Up.
7. **footer** (system-component) — 5-column directory + legal + © 2026 Starbucks Coffee Company.

## Layout strategy
Hero: full-bleed photo with left-anchored type overlay (not centered-stack). Promos: 3-col grid desktop → 1-col mobile. Mixed-case headlines (improvement #3).

## Anti-template pass
- hero: reject centered-stack-dual-CTA; pick left-anchored photo-overlay single-CTA. Rationale: brand hero is photo-led.
- promo cards: reject 5-up nav grid; pick 3-up editorial cards (photography carries).

## Data attributes
data-section on every section; data-anim fade-up on cards.

## Unsourced content
None — all copy + imagery captured verbatim.
