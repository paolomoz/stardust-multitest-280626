<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/brand-review.html
    - stardust/current/pages/home.json
-->

# Improvements — home (and template-wide)

1. **[dated-pattern]** Captured home headings include raw animated-counter
   fragments ("0 1 2 3 4 5 6 7 % back", "Pay Monthly / in store5") that leak
   the slot-machine digit markup as heading text. Reads as broken hierarchy.
   *Fix:* Render rewards as a single clean stat ("Up to 7% back") with an
   optional count-up animation; never expose digit-ladder fragments as headings.

2. **[ia-clutter]** Home stacks many near-equal CTAs across sections (Get the
   Debit Card, Apply for the Credit Card, Learn About Pay in 4, Learn About
   Pay Monthly, See How You're Safe...) with no single dominant action.
   *Fix:* One primary pill per section ("Get the app" / section-specific
   primary), demote the rest to secondary text-links.

3. **[hierarchy]** No `<h1>` on the captured home — the page opens at h2.
   *Fix:* Promote the hero statement ("Pay, send, and save smarter") to a
   single real `<h1>`; keep section openers at h2.

4. **[cliché]** Heading copy mixes title-case and ALL-CAPS-feeling marketing
   shouts across sections.
   *Fix:* Mixed-case headlines throughout; reserve tracked uppercase for
   short eyebrow labels and pill CTAs only.

5. **[missed-opportunity]** The captured lifestyle photography (restaurants,
   groceries, rideshare, fuel image grid; layered photo cards) is strong but
   the source crops it into small tiles.
   *Fix:* Give the hero a full-bleed photographic treatment with a legibility
   scrim and left-anchored headline; render feature imagery at generous card
   scale (12px radius), not thumbnails.
