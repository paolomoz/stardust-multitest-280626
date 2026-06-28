<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28T09:40:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/pages/smartphones__all-smartphones.json
  stardustVersion: 0.13.1
  mode: A (brand-faithful)
-->

# Improvements — Samsung US (home + category template)

1. **[ia-clutter]** The home page exposes only 3 real headings to assistive tech/SEO (h1 "Samsung", "Experience a whole new Galaxy", "Recommended for you") because nearly all section copy is baked into hero images. Text-in-image kills accessibility, SEO, and translation.
   *Fix:* Promote each section's message to a real `<h2>`/`<p>` over the image, keeping the photography as background — semantic headings, image stays hero.

2. **[dated-pattern]** Product discovery relies on a horizontally-scrolling carousel rail ("Recommended for you") that hides most inventory below a single visible row.
   *Fix:* Replace the primary rail with a responsive product-card grid (2-up mobile → 4-up desktop) so the full set is scannable without horizontal scroll.

3. **[hierarchy]** CTA verbs fragment across the surface (Buy / Shop now / Learn more / View all / Experience AI now) with inconsistent styling (black pill, white pill, text link) for the same action.
   *Fix:* Standardize a two-tier CTA system — one black primary pill ("Shop now"/"Buy now") + one quiet text link ("Learn more") per section.

4. **[missed-opportunity]** Samsung's signature display face (SamsungSharpSans) is underused at small sizes; section headers don't carry the brand's confident display scale.
   *Fix:* Set section headlines in SamsungSharpSans Bold at a generous modular scale (clamp 2–3.25rem) so the brand voice reads even on inner pages.

5. **[density]** Category landing pages stack full-bleed promo banners with little breathing room, making the page read as one long ad rather than a navigable catalog.
   *Fix:* Apply a balanced 64px section rhythm and a consistent category-tile row above the product grid so users can orient before scrolling.
