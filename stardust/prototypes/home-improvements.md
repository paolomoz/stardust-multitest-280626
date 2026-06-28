<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
  mode: A (brand-faithful)
-->

# Improvements — home (Sony Group Portal)

1. **[dated-pattern]** The hero carousel renders story headlines at only ~16px white
   text (`h2 16px rgb(255,255,255)`) over 1390×780 photography — the headline is
   visually subordinate to the image and reads as a caption, not a hero statement.
   *Fix:* Promote the active-slide headline to a left-anchored editorial overlay at
   display scale (40–56px) with a legibility scrim; keep the photography full-bleed.

2. **[ia-clutter]** Five carousel slides duplicate three times in the captured DOM
   (swiper clones), and "Latest News" repeats the same five items as the hero — the
   home page says the same thing twice.
   *Fix:* Hero carries the lead stories; the news rail below presents a distinct,
   broader set of category-tagged items, deduped against the hero.

3. **[contrast]** Muted grey body/heading text (`#656565`) on white is fine for body
   but is used even for section headings ("Latest News" at `#656565`), flattening
   hierarchy — headings should anchor in true black.
   *Fix:* Section headings in `#000`; reserve `#656565` for supporting/meta text only.

4. **[missed-opportunity]** Sony's signature SST typeface and monochrome restraint are
   the brand's most distinctive assets, but the current grid is dense and utilitarian.
   *Fix:* Lean into editorial whitespace and SST display weights so the chrome itself
   reads as premium Sony, not a generic CMS template.

5. **[cliché]** The social row ("Follow us on social media") sits as a small grey icon
   strip with little prominence despite six active channels.
   *Fix:* Treat it as an intentional editorial band with proper spacing and label,
   consistent with the modernized monochrome system.
