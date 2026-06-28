<!--
_provenance:
  writtenBy: stardust:direct
  readArtifacts: [stardust/current/_brand-extraction.json, stardust/current/pages/home.json, stardust/current/pages/rewards.json]
  mode: A (brand-faithful)
-->

# Improvements — Starbucks (site-level, anchors home + templates)

1. **[dated-pattern]** The captured home is a stack of promo "hero cards" with little hierarchy — multiple equally-weighted h2 promos ("It's Starbucks summer", "Bold, iced and deliciously classic", "Good energy in every sip") read as a slideshow of banners.
   *Fix:* One dominant full-bleed hero with a single primary CTA, then a tidy 3-up promo grid below — clear primary/secondary hierarchy.

2. **[ia-clutter]** Header + body surface several competing verbs (Start an order, Join now, Find a store, Sign in). The conversion path fragments.
   *Fix:* Lead with one canonical action per surface (home hero = "Start an order"; Rewards = "Join now"); demote the rest to secondary links.

3. **[cliché]** Heavy uppercase treatment on headings/eyebrows site-wide ("STARBUCKS® REWARDS") reads as shout by the third section.
   *Fix:* Mixed-case headlines; reserve uppercase for short eyebrow labels and CTA pills only.

4. **[missed-opportunity]** Excellent product photography (cloudassets.starbucks.com renditions) is shown at small thumbnail scale in dense category grids.
   *Fix:* Larger rounded product cards (image-top, 16px radius, soft shadow) at a comfortable 3–4 col grid; let the photography carry.

5. **[contrast]** Text-over-photo hero on the live site lacks a consistent legibility scrim.
   *Fix:* Apply a left-anchored gradient scrim under hero copy so headline + CTA always pass AA over imagery.
