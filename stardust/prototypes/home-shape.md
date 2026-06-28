<!--
_provenance:
  writtenBy: stardust:prototype (Phase 1 shape brief)
  writtenAt: 2026-06-28T09:50:00Z
  readArtifacts: [stardust/current/pages/home.json, stardust/current/_brand-extraction.json, stardust/direction.md, DESIGN.md, DESIGN.json]
  stardustVersion: 0.13.1
  mode: A
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - "header: site-wide system-component (_brand-extraction.json#systemComponents[kind=site-header])"
    - "hero: derived from pages/home.json#landmarks[hero] + image assets/us/06052026/2026-main-kv-feature-kv-pc.jpg"
    - "category-tile-row: derived from home.json internal links (Galaxy Smartphones/Tab/Book/Watch/Buds/Ring/XR/Accessories)"
    - "featured-grid: derived from home.json 560x560 feature product cards (Z Fold7, Z Flip7, Buds4 Pro, Watch Ultra, TVs)"
    - "support-band: derived from home.json CTAs (Order Help, Product Help, Request A Repair, Register A Product)"
    - "footer: site-wide system-component (_brand-extraction.json#systemComponents[kind=site-footer])"
  signatureElements:
    - { kind: hero-imagery, capturedSource: "home KV hero", mechanism: "full-bleed product photo + scrim", fallback: "static image" }
  voiceClassification:
    - { section: hero, classification: captured-verbatim, copy: "Experience a whole new Galaxy", source: "home.json headings[1]" }
    - { section: category, classification: captured-verbatim, source: "home.json internal links" }
  unsourcedContent: []
-->

# Shape brief — home

**Surprise:** low (brand-faithful + improvements). **Fidelity:** refined.

## Sections (in order)
1. **header** — sticky GNB. SAMSUNG wordmark (logo.svg, currentColor) left; primary category nav (Mobile, TV & Audio, Appliances, Computing, Displays, Accessories, Shop, Support); utility (Search, Account, Cart) right. Mobile: hamburger (CSS-only stock pattern). `data-block="header"`.
2. **hero** — full-bleed product KV photo with a real `<h1>`-adjacent `<h2>` "Experience a whole new Galaxy", short deck, one black pill CTA "Shop now" → /samsung/shop, quiet "Learn more →" text link. Legibility scrim. `data-block="hero"`.
3. **category-tile-row** — "Shop by category" — circular/rounded chips: Galaxy Smartphones, Galaxy Tab, Galaxy Book, Galaxy Watch, Galaxy Buds, Galaxy Ring, Galaxy XR, Accessories — each linking its real all-* listing page. `data-block="category-tiles"`.
4. **featured-grid** — responsive product-card grid (2-up mobile → 4-up desktop), 20px radius, f7f7f7 surface: Galaxy Z Fold7, Galaxy Z Flip7, Galaxy Buds4 Pro, Galaxy Watch Ultra, Neo QLED TV, plus 1-2 more from captured 560x560 cards. Each card: product image (real Samsung CDN URL) + name + one line + "Buy"/"Learn more". `data-block="cards"`.
5. **feature-band** — one cta-band: Galaxy AI / AI Living headline + image + primary CTA "Experience AI now" → /samsung/ai-living. `data-block="feature-band"`.
6. **support-band** — quick links row: Order Help, Product Help, Request A Repair, Register A Product (real /us/support/* hrefs, localized to /samsung/support/*). `data-block="support-links"`.
7. **footer** — deep footer: product, support, account, sustainability/about, legal, locale. `data-block="footer"`.

## Layout strategy
Single white substrate (1 transition: f7f7f7 on featured-grid cards). Balanced 64px desktop section rhythm. Hero full-bleed; everything else max-width 1280 centered.

## Anti-template pass
- hero: default reflex = centered-stack + dual CTA. Picked = left-anchored headline overlay + single primary CTA + text link (improvement #3). Rationale: Samsung's KV heroes are image-led, not centered-SaaS.
- category nav: default reflex = 5-up image-card grid. Picked = circular chip row (Samsung's actual shop-by-category shape). Rationale: captured brand signature.
- product display: default reflex = carousel rail. Picked = responsive card grid (improvement #2).

## Key states
Card hover: subtle lift + image scale. Nav hover: blue underline. Reduced-motion: disable entrance/parallax.
